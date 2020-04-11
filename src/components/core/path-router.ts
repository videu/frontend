/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Abstract base class for routing elements.
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

import { internalProperty, property, PropertyValues } from 'lit-element';

import { PageViewElement } from './page-view-element';

/**
 * Abstract base class for all routing elements.
 *
 * Elements containing children that are also inheriting from this class
 * MUST inject their `path` property
 */
export class PathRouter extends PageViewElement {

    /**
     * The current path, split into the individual segments.
     * Updating this property will also update `page` and `childPath`.
     */
    @property({
        type: [String],
        converter: {
            toAttribute: val => JSON.stringify(val),
            fromAttribute: str => str ? JSON.parse(str) : [''],
        }
    })
    public path: string[] = [''];

    /**
     * The path without the top-level element.
     * Pass this to all child elements that are also extending the `PathRouter`
     * class.  **NEVER** set this property directly, it gets updated
     * automatically when {@linkcode .path} changes.
     */
    @internalProperty()
    protected childPath: string[] = [''];

    /**
     * The page that is currently being displayed in this element, i.e. the
     * first element of the `path` array.  Pass this to the `page-switch` if the
     * element has one.  **NEVER** set this property directly, it gets updated
     * automatically when {@linkcode .path} changes.
     */
    @internalProperty()
    protected page: string = '';

    /**
     * @inheritdoc
     * @override
     */
    protected updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has('path')) {
            if (this.path.length === 0) {
                this.page = '';
                this.childPath = [''];
            } else {
                this.page = this.path[0];

                if (this.path.length === 1) {
                    this.childPath = [''];
                } else {
                    this.childPath = this.path.slice(1);
                }
            }
        }
    }

}
