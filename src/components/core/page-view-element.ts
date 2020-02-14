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

import { property } from 'lit-element';

import { VideuElement } from './videu-element';

export abstract class PageViewElement extends VideuElement {

    /**
     * Determines whether this element is currently being displayed.
     */
    @property({type: Boolean})
    protected active: boolean = false;

    /**
     * @inheritdoc
     * @override
     */
    protected shouldUpdate() {
        return this.active;
    }

}
