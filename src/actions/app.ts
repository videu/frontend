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
import { ThunkAction } from 'redux-thunk';

import { FActionCreator, FThunkActionCreator } from '../types/action-creator';
import { RootState } from '../store';
import {
    AppActionLoginSend,
    AppActionLoginRecv,
    AppActionLoginPopup,
    AppActionLogout,
} from './app-auth';

/** App aciton id for updating the path that is currently displayed. */
export const APP_UPDATE_PATH = 'APP_UPDATE_PATH';
/** App action id for updating the offline state. */
export const APP_UPDATE_OFFLINE = 'APP_UPDATE_OFFLINE';

/** Action type for updating the page that is currently being displayed. */
export interface AppActionUpdatePath extends Action<'APP_UPDATE_PATH'> {
    /** The new path. */
    path: string[];
}

/** Action type for updating the offline state. */
export interface AppActionUpdateOffline extends Action<'APP_UPDATE_OFFLINE'> {
    /** If `true`, we are currently offline. */
    offline: boolean;
}

/** General type for any app-related action. */
export type AppAction =
    AppActionLoginSend
    | AppActionLoginRecv
    | AppActionLogout
    | AppActionLoginPopup
    | AppActionUpdatePath
    | AppActionUpdateOffline;

/**
 * Any app action using `redux-thunk`, i.e. an async action.
 *
 * @typeParam R The return value (if this emits another async action).
 * @typeParam A The action.
 */
export type ThunkAppAction<
    R extends AppAction | void = void,
    A extends AppAction = AppAction
> = ThunkAction<R, RootState, undefined, A>;

/**
 * Action creator for updating the current path.
 * This gets called when the URL changes.  {@linkcode navigate} splits the URL
 * up into individual components and passes it to this action.
 *
 * @param path The new path, split up into individual components.
 * @returns The action.
 */
const updatePath: FActionCreator<AppActionUpdatePath, [string[]]> =
(path: string[]) => ({
    type: APP_UPDATE_PATH,
    path: path,
});

/**
 * Action creator for asynchronously loading the specified top-level page.
 *
 * @param page The name of the top-level page.
 * @returns The action.
 */
const loadPage: FThunkActionCreator<AppAction, [string]> =
(page: string) => () => {
    switch (page) {
        case '':
        case 'index':
            import('../components/pages/view-index');
            break;
        default:
            import('../components/pages/http-404-page');
            break;
    }
};

/**
 * Action creator for navigating to the specified path.
 *
 * @param path The path to navigate to.
 */
export const navigate: FThunkActionCreator<AppAction, [string]> =
(path: string) => (dispatch) => {
    let splittedPath: string[];

    if (path === '/') {
        splittedPath = ['index'];
    } else {
        splittedPath = path.slice(1).split('/');
    }

    dispatch(updatePath(splittedPath));
    dispatch(loadPage(splittedPath[0]));
};

/**
 * Action creator for updating the app's offline state.
 *
 * @param offline Whether the app is currently offline.
 */
export const updateOffline: FActionCreator<AppActionUpdateOffline, [boolean]> =
(offline: boolean) => ({
    type: APP_UPDATE_OFFLINE,
    offline: offline,
});
