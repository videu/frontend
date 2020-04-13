/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * Partial reducer for the {@link AppState.auth} field.
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

import { AppAction } from '../actions/app';
import {
    APP_LOGIN_SEND,
    APP_LOGIN_RECV,
    APP_LOGIN_POPUP,
    APP_LOGOUT,
} from '../actions/app-auth';
import { IAuthUser } from '../types/user';

/** Base interface for specific states of {@linkcode AppState.auth}. */
interface AppAuthStateBase {
    /** Whether there is a running login-related network request */
    isFetching: boolean;
    /** Whether a user is currently logged in. */
    isLoggedIn: boolean;
    /** Whether the login popup is currently being displayed. */
    isPopupOpen: boolean;
    /** Whether the login request failed. */
    err: boolean;
}

/** Generic state when we are not doing anything. */
interface AppAuthStateIdle extends AppAuthStateBase {
    isFetching: false;
    err: false;
}

/** The auth state when there is a network operation going on. */
interface AppAuthStateFetching extends AppAuthStateBase {
    isFetching: true;
    err: false;
}

/** The auth state when an error occurred while attempting to log in. */
interface AppAuthStateError extends AppAuthStateBase {
    err: true;
    /** The error message id sent from the backend. */
    msg: string;
}

/** The auth state when authentication was successful. */
interface AppAuthStateSuccess extends AppAuthStateBase {
    isLoggedIn: true;
    err: false;
    /** The authentication token. */
    token: string;
    user: IAuthUser;
}

/** The {@linkcode AppState.auth} field. */
export type AppAuthState =
    AppAuthStateIdle
    | AppAuthStateFetching
    | AppAuthStateError
    | AppAuthStateSuccess;

/** The initial state of {@link AppState.auth}. */
export const INITIAL_AUTH_STATE: AppAuthState = {
    isFetching: false,
    isLoggedIn: false,
    isPopupOpen: false,
    err: false,
};

/**
 * Reducer handling any state changes to the {@linkcode AppState.auth} field.
 * This should ONLY be called from {@linkcode appReducer}.
 *
 * @param authState The current state.
 * @param action The action to be performed on the state.
 * @returns The new state.
 */
const appAuthReducer: Reducer<AppAuthState, AppAction> =
(authState = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case APP_LOGIN_POPUP:
            return {
                ...authState,
                isPopupOpen: action.isPopupOpen,
            };

        case APP_LOGIN_SEND:
            return {
                ...authState,
                isFetching: true,
            };

        case APP_LOGIN_RECV:
            if (action.err) {
                return {
                    ...authState,
                    err: true,
                    isFetching: false,
                    msg: action.msg,
                };
            } else {
                return {
                    ...authState,
                    err: false,
                    isFetching: false,
                    token: action.token,
                    user: action.user,
                };
            }

        case APP_LOGOUT:
            return {
                ...authState,
                isLoggedIn: false,
                token: undefined,
                user: undefined,
            };

        default:
            return authState;
    }
};
export default appAuthReducer;
