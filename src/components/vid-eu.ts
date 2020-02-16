/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file The root application component.
 *
 * @license
 * Copyright (c) 2020 Felix Kopp <sandtler@santler.club>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY of FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { html, css, property, PropertyValues, customElement } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store, RootState } from '../store';
import { navigate, updateOffline } from '../actions/app';
import { SharedStyles } from '../style/shared-styles';
import { PathRouter } from './core/path-router';

import './core/page-switch';
import './videu-header';

/**
 * The application's root shell containing all other components.
 */
@customElement('vid-eu')
export class VidEu extends connect(store)(PathRouter) {

    /**
     * The app title.
     * Defaults to `'videu'`.
     */
    @property({type: String})
    public appTitle: string = 'videu';

    /**
     * Whether we are currently connected to the Internet.
     */
    @property({type: Boolean})
    private _offline: boolean = false;

    /**
     * @inheritdoc
     * @override
     */
    static get styles() {
        return [
            SharedStyles,
            css`
            :host {
                --color-primary: #A82CFF;
                --color-primary-dark: #995789;
                --color-primary-light: #CC1BA2;

                --color-secondary-light: #FFF56B;
                --color-secondary-dark: #CCAC0E;

                --color-bg: #272429;
                --color-text: rgba(216, 219, 214, 0.9); /* color-bg inverted */
                --color-text-on-primary: var(--color-bg);

                display: block;
                width: 100%;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                background-color: var(--color-bg);
            }
            `
        ];
    }

    /**
     * @inheritdoc
     * @override
     */
    protected render() {
        return html`
        <div id="mainContainer">
            <videu-header appTitle="${this.appTitle}"></videu-header>
            <main role="main" class="main-content">
                <page-switch page="${this._page}">
                    <view-index page-name="index"></view-index>
                </page-switch>
            </main>
        </div>
        <footer>Connection: ${this._offline ? 'offline' : 'online'}</footer>
        `;
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    /**
     * @inheritdoc
     * @override
     */
    protected firstUpdated() {
        installRouter(location => {
            store.dispatch(navigate(decodeURIComponent(location.pathname)))
        });

        installOfflineWatcher(offline => {
            store.dispatch(updateOffline(offline));
        });
    }

    /**
     * @inheritdoc
     * @override
     */
    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has('_page')) {
            console.log(this._page);
            const pageTitle = this.appTitle + ' – ' + this._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle,
                /* TODO: Add thumbnail image here */
            });
        }
    }

    /**
     * @inheritdoc
     * @override
     */
    public stateChanged(state: RootState) {
        super.stateChanged(state);

        this.path = state.app!.path;
        this._offline = state.app!.offline ? true : false;
    }

}
