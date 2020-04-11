/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file redux store stuff.
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

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Reducer,
    StoreEnhancer
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { AppAction } from './actions/app';
import { VideoAction } from './actions/video';

import appReducer, { AppState } from './reducers/app';
import videoReducer, { VideoState } from './reducers/video';

/**
 * The top-level state of the application.
 */
export interface RootState {
    app?: AppState;
    video?: VideoState;
}

/** Any action supported by the application. */
export type RootAction =
    AppAction
    | VideoAction;

/**
 * This is just for the Redux DevTools Chrome/Firefox extension,
 * see <https://github.com/zalmoxisus/redux-devtools-extension>
 */
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
    f1: StoreEnhancer<Ext0, StateExt0>,
    f2: StoreEnhancer<Ext1, StateExt1>
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** The app's redux store. */
export const store = createStore(
    state => state as Reducer<RootState, RootAction>,
    devCompose(
        /* support for dynamically added reducers w/ lazyReducerEnhancer */
        lazyReducerEnhancer(combineReducers),
        /* support for async/promisified reducers w/ ThunkMiddleware */
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>)
    )
);

store.addReducers({
    app: appReducer,
    video: videoReducer,
});
