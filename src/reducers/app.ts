/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * The main application reducer.
 * @packageDocumentation
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

import {
    APP_UPDATE_PATH,
    APP_UPDATE_OFFLINE,
} from '../actions/app';
import {
    APP_LOGIN_SEND,
    APP_LOGIN_RECV,
    APP_LOGIN_POPUP,
    APP_LOGOUT,
} from '../actions/app-auth';
import appAuthReducer, {
    AppAuthState,
    INITIAL_AUTH_STATE,
} from './app-auth';
import { RootAction } from '../store';

/**
 * Contains all attributes of the main application.
 */
export interface AppState {
    /** The current routing path. */
    path: string[];
    /** Whether we are currently offline. */
    offline: boolean;
    /** Information about the current login session, if any. */
    auth: AppAuthState;
}

/** The `app` part of the initial redux state. */
const INITIAL_STATE: AppState = {
    path: [''],
    offline: false,
    auth: INITIAL_AUTH_STATE,
};

/**
 * The main application reducer.
 *
 * @param state The current state.
 * @param action The action to be performed on the state.
 * @returns The new state.
 */
const appReducer: Reducer<AppState, RootAction> =
(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_LOGIN_SEND:
        case APP_LOGIN_RECV:
        case APP_LOGIN_POPUP:
        case APP_LOGOUT:
            /* TODO: Check if we need to redirect when logging out */
            return {
                ...state,
                auth: appAuthReducer(state.auth, action),
            };

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
