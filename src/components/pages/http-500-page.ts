/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * Component for the 500 page.
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

import { html, customElement } from 'lit-element';

import { PageViewElement } from '../core/page-view-element';
import { SharedStyles } from '../../style/shared-styles';

/**
 * The 500 internal server error page.
 */
@customElement('http-500-page')
export class Http500Page extends PageViewElement {

    /**
     * @inheritdoc
     * @override
     */
    static get styles() {
        return [
            SharedStyles,
        ];
    }

    /**
     * @inheritdoc
     * @override
     */
    protected render() {
        return html`
        <h1>${this.t('500_title')}</h1>
        <p>${this.t('500_body')}</p>
        `;
    }

}
