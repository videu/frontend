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

import { html, property, PropertyValues, customElement } from 'lit-element';
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

/**
 * The aplication's root shell containing all other components.
 */
@customElement('vid-eu')
export class VidEu extends connect(store)(PathRouter) {

    /**
     * The app title.
     * Defaults to `'videu'`.
     */
    @property({type: String})
    public appTitle: string = '';

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
            SharedStyles
        ];
    }

    /**
     * @inheritdoc
     * @override
     */
    protected render() {
        return html`
        <main role="main" class="main-content">
            <page-switch page="${this._page}">
                <view-index page-name="index"></view-index>
            </page-switch>
        </main>
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
        this._offline = state.app!.offline? true : false;
    }

}
