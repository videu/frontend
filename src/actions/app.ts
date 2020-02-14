/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file All root-level actions.
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

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

/** App aciton id for updating the path that is currently displayed. */
export const APP_UPDATE_PATH = 'APP_UPDATE_PATH';
/** App action id for updating the offline state. */
export const APP_UPDATE_OFFLINE = 'APP_UPDATE_OFFLINE';

/** An app action for updating the page that is currently displayed. */
export interface AppActionUpdatePath extends Action<'APP_UPDATE_PATH'> {
    /** The new path. */
    path: string[];
}
/** An app action for updating the offline state. */
export interface AppActionUpdateOffline extends Action<'APP_UPDATE_OFFLINE'> {
    /** If `true`, we are currently offline. */
    offline: boolean;
}

/** General type for any app-related action. */
export type AppAction =
    AppActionUpdatePath
    | AppActionUpdateOffline;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

/**
 * Update the current path.
 * This gets called when the URL changes.  `navigate` splits the URL up
 * into individual components and passes it to this action.
 *
 * @param path The new path, split up into individual components.
 */
const updatePath: ActionCreator<AppActionUpdatePath> = (path: string[]) => {
    return {
        type: APP_UPDATE_PATH,
        path: path,
    };
};

/**
 *
 * @param page
 */
const loadPage: ActionCreator<ThunkResult> = (page: string) => () => {
    switch (page) {
        case '':
        case 'index':
            import('../components/pages/view-index');
            break;
        default:
            /* TODO: Create 404 page */
            console.error('404 Not Found');
    }
};

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
    let splittedPath: string[];

    if (path === '/') {
        splittedPath = ['index'];
    } else {
        splittedPath = path.slice(1).split('/');
    }

    dispatch(updatePath(splittedPath));
    dispatch(loadPage(splittedPath[0]));
}

export const updateOffline: ActionCreator<ThunkResult> =
    (offline: boolean) => (dispatch) => {
        dispatch({
            type: APP_UPDATE_OFFLINE,
            offline: offline,
        });
    };
