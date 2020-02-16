/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file General shared styles.
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

import { css } from 'lit-element';

export const ColorStyles = css`
* {
    color: var(--color-text);
}

h1, a {
    color: var(--color-primary);
}

h2 {
    color: var(--color-primary-dark);
}

:host {
    --box-shadow-1: 0  1px  3px rgba(0, 0, 0, .12), 0  1px  2px rgba(0, 0, 0, .24);
    --box-shadow-2: 0  3px  6px rgba(0, 0, 0, .16), 0  3px  6px rgba(0, 0, 0, .23);
    --box-shadow-3: 0 10px 20px rgba(0, 0, 0, .19), 0  6px  6px rgba(0, 0, 0, .23);
    --box-shadow-4: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    --box-shadow-5: 0 19px 38px rgba(0, 0, 0, .30), 0 15px 12px rgba(0, 0, 0, .22);
}
`;
