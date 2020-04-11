/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Simple page switcher.
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

import { customElement, html, property, PropertyValues, css, query } from 'lit-element';

import { VideuElement } from './videu-element';
import { SharedStyles } from '../../style/shared-styles';

/**
 * A simple page selector based on string labels.
 *
 * Elements inside this switch must have a `page-name` property with their
 * respective name.  When the router's `page` property is updated, the
 * element with the corresponding name is made visible.
 *
 * This element is intended to be embedded in a page view component that
 * extends the `PageRouter` class, which can inject its `page` property
 * directly into this one.
 */
@customElement('page-switch')
export class PageSwitch extends VideuElement {

    /**
     * The name of the page that is currently being displayed.
     * Changing this property causes the element whose `page-name` attribute
     * matches this value to become visible, the rest is hidden.
     */
    @property({type: String})
    public page?: string;

    @query('#pages')
    private pagesSlot?: HTMLSlotElement;

    /**
     * @inheritdoc
     * @override
     */
    public static get styles() {
        return [
            SharedStyles,
            css`
            ::slotted(*) {
                display: none;
            }

            ::slotted([active]) {
                display: block;
            }
            `
        ];
    }

    /**
     * @inheritdoc
     * @override
     */
    protected render() {
        return html`<slot id="pages"></slot>`;
    }

    /**
     * @inheritdoc
     * @override
     */
    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (!changedProps.has('page')) {
            return;
        }

        const slot = this.pagesSlot;
        if (slot === undefined) {
            return;
        }

        const pageElems = slot.assignedElements();
        if (!pageElems) {
            return;
        }

        for (const elem of pageElems) {
            if (elem.getAttribute('page-name') === this.page) {
                elem.setAttribute('active', '');
            } else {
                elem.removeAttribute('active');
            }
        }
    }

}
