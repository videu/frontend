/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Abstract base class for all elements that display an entire page.
 *
 * @license
 * Copyright (c) 2020 Felix Kopp <sandtler@sandtler.club>
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

import { css, CSSResult, property, PropertyValues, CSSResultArray } from 'lit-element';

import { VideuElement } from './videu-element';

export abstract class PageViewElement extends VideuElement {

    public static get styles(): CSSResult | CSSResultArray {
        return [
            css`
            :host {
                margin: auto;
                padding: 24px;
            }
            `
        ];
    }

    /**
     * Determines whether this element is currently being displayed.
     */
    @property({type: Boolean})
    public active: boolean = false;

    /**
     * If `true`, this is the fallback page if the current page was not found.
     */
    @property({type: Boolean})
    public fallback: boolean = false;

    /** If `true`, the page is limited to a maximum width of 640px. */
    @property({type: Boolean})
    public narrow: boolean = false;

    /**
     * @inheritdoc
     * @override
     */
    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has('narrow')) {
            if (this.narrow) {
                this.style.maxWidth = '640px';
            } else {
                this.style.maxWidth = '';
            }
        }
    }

    /**
     * @inheritdoc
     * @override
     */
    protected shouldUpdate() {
        return this.active;
    }

}
