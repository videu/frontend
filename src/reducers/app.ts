/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file The main application reducer.
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

import { Reducer } from 'redux';

import { APP_UPDATE_PATH, APP_UPDATE_OFFLINE } from '../actions/app';
import { RootAction } from '../store';

/**
 * Contains all attributes of the main application.
 */
export interface AppState {
    /** The current routing path. */
    path: string[];
    /** Whether we are currently offline. */
    offline: boolean;
}

/** The main app's initial redux state. */
const INITIAL_STATE: AppState = {
    path: [''],
    offline: false,
};

/** The main application reducer. */
const appReducer: Reducer<AppState, RootAction> =
    (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case APP_UPDATE_PATH:
                return {
                    ...state,
                    path: action.path,
                };

            case APP_UPDATE_OFFLINE:
                return {
                    ...state,
                    offline: action.offline,
                };

            default:
                return state;
        }
    };
export default appReducer;
