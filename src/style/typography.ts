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

export const TypographyStyles = css`
* {
    font-family: Roboto, sans-serif;
    font-size: 1rem;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Fira Sans';
}

h1 {
    font-size: 3rem;
    margin: 24px 0;
}

h2 {
    color: var(--color-primary-dark);
}

a, a:visited, a:active, a:focus, a:hover {
    font-weight: 700;
    text-decoration: underline;
}
`;
