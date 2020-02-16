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

import { html, css, property, customElement } from 'lit-element';

import { SharedStyles } from '../style/shared-styles';
import { VideuElement } from './core/videu-element';

/**
 * The app header.
 */
@customElement('videu-header')
export class VideuHeader extends VideuElement {

    /**
     * The app title.
     * Defaults to `'videu'`.
     */
    @property({type: String})
    public appTitle: string = 'videu';

    /**
     * @inheritdoc
     * @override
     */
    static get styles() {
        return [
            SharedStyles,
            css`
            :host {
                --header-font-size: 1.5rem;
                background-color: var(--color-primary);
                color: var(--color-text-on-primary);
                box-shadow:var(--box-shadow-3);
                display: flex;
                width: 100%;
                padding: 16px;
                margin: 0;
                height: calc(var(--header-font-size) + 32px);
                font-size: var(--header-font-size);
            }

            #content-left,
            #spacer,
            #content-right {
                display: inline-block;
            }

            #spacer {
                flex: 1;
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
            <div id="content-left">
                <!-- TODO: Add search bar to header bar -->
                [search bar goes here]
            </div>
            <div id="spacer"></div>
            <div id="content-right">
                <!-- TODO: Add menu icons to header bar -->
                [menu icons go here]
            </div>
        `;
    }

}
