/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * All app actions.
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

import { Action } from 'redux';

import { FActionCreator, FThunkActionCreator } from '../types/action-creator';
import { IAuthUser } from '../types/user';
import { postJSON } from '../util/xhr';

/** App action id for setting the open state of the login popup. */
export const APP_LOGIN_POPUP = 'APP_LOGIN_POPUP';
/** App action id for requesting login credentials to be sent to the backend. */
export const APP_LOGIN_SEND = 'APP_LOGIN_SEND';
/** App action id for announcing the result of a login attempt once received. */
export const APP_LOGIN_RECV = 'APP_LOGIN_RECV';
/** App action id for logging out. */
export const APP_LOGOUT = 'APP_LOGOUT';

/** Action for requesting login credentials to be sent to the backend. */
export interface AppActionLoginSend extends Action<'APP_LOGIN_SEND'> { }

/** Partial action type for announcing a failed login attempt. */
interface AppActionLoginRecvError extends Action<'APP_LOGIN_RECV'> {
    /** The error flag. */
    err: true;
    /** The error message to be displayed on the UI. */
    msg: string;
}

/** Partial action type for announcing a successful login attempt. */
interface AppActionLoginRecvSuccess extends Action<'APP_LOGIN_RECV'> {
    /** The error flag. */
    err: false;
    /** The JSON Web Token. */
    token: string;
    /** The authenticated user data. */
    user: IAuthUser;
}

/** Action type for announcing the result of a login request. */
export type AppActionLoginRecv =
    AppActionLoginRecvError | AppActionLoginRecvSuccess;

/** Action type for logging out. */
export interface AppActionLogout extends Action<'APP_LOGOUT'> {}

/** Action type for setting the open status of the login popup. */
export interface AppActionLoginPopup extends Action<'APP_LOGIN_POPUP'> {
    /** Whether the login popup is currently open. */
    isPopupOpen: boolean;
}

/**
 * Action creator for requesting login credentials to be sent to the backend.
 *
 * @param userName The user name to authenticate with.
 * @param passwd The password to authenticate with.
 * @returns The action.
 */
const loginSend: FActionCreator<AppActionLoginSend> =
() => ({ type: APP_LOGIN_SEND });

/**
 * Action creator for announcing a failed login response.
 *
 * @param msg The human-readable error messge.
 * @returns The action.
 */
const loginRecvError: FActionCreator<AppActionLoginRecvError, [string]> =
(msg: string) => ({
    type: APP_LOGIN_RECV,
    err: true,
    msg: msg,
});

/**
 * Action creator for announcing a successful login response.
 *
 * @param token The JSON Web Token.
 * @param user The authenticated user data.
 * @returns The action.
 */
const loginRecvSuccess: FActionCreator<AppActionLoginRecvSuccess, [string, IAuthUser]> =
(token: string, user: IAuthUser) => ({
    type: APP_LOGIN_RECV,
    err: false,
    token: token,
    user: user,
});

/**
 * A successful auth response from the backend.
 */
interface IUserAuthResponse {
    /** The JWT. */
    token: string;
    /** The user object. */
    user: IAuthUser;
}

/**
 * Action creator for sending a login request to the backend.
 * Will instantly dispatch a {@linkcode APP_LOGIN_SEND}, and a
 * {@linkcode APP_LOGIN_RECV} after the ressponse from the backend has been
 * received.
 *
 * @param userName The user name.
 * @param passwd The password.
 */
export const login: FThunkActionCreator<AppActionLoginSend | AppActionLoginRecv, [string, string]> =
(userName: string, passwd: string) => async (dispatch) => {
    dispatch(loginSend());

    try {
        const response = await postJSON<IUserAuthResponse>(
            window._videu.backendRoot + '/user/auth',
            {
                userName: userName,
                passwd: passwd,
            },
        );
        dispatch(loginRecvSuccess(response.token, response.user));
    } catch (err) {
        dispatch(loginRecvError(err.message));
    }
};

/**
 * Action creator for setting the open state of the login popup.
 *
 * @param isPopupOpen Whether the login popup is currently open.
 * @returns The action.
 */
export const loginPopup: FActionCreator<AppActionLoginPopup, [boolean]> =
(isPopupOpen: boolean) => ({
    type: APP_LOGIN_POPUP,
    isPopupOpen: isPopupOpen,
});
