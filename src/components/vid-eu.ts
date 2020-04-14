/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * The root application component.
 * @packageDocumentation
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

import {
    html,
    css,
    property,
    internalProperty,
    PropertyValues,
    customElement,
} from 'lit-element';
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
    @property({type: String, attribute: 'app-name'})
    public appName: string = window._videu.appName;

    /**
     * Whether we are currently connected to the Internet.
     */
    @internalProperty()
    private offline: boolean = false;

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
            <videu-header app-name="${this.appName}"></videu-header>
            <main role="main" class="main-content">
                <page-switch page="${this.page}">
                    <view-index page-name="index"></view-index>
                    <http-404-page narrow fallback></http-404-page>
                </page-switch>
            </main>
        </div>
        <footer>Connection: ${this.offline ? 'offline' : 'online'}</footer>
        `;
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

        if (changedProps.has('page')) {
            const pageTitle = this.appName + ' – ' + this.page;
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
        if (!state.app) {
            return;
        }

        this.offline = state.app.offline;

        /* make a copy to ensure we aren't accidentally mutating the state */
        this.path = state.app.path.slice();
    }

}
