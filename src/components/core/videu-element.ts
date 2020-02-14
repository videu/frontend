/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Abstract base class for all videu elements.
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

import { LitElement, property } from 'lit-element';

/**
 * Abstract base class for all elements used in videu.
 */
export class VideuElement extends LitElement {

    /** The current locale as an ISO 639-1 code. */
    @property({type: String})
    protected locale: string = 'de';

}
