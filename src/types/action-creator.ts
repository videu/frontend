/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * Action creator typedef.
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

/**
 * Redux compatible action creator w/ strong parameter types.
 *
 * @param params The parameters required to create the action.
 * @typeParam A The returned action type.
 * @typePatam P The parameter list.
 * @returns The action.
 */
export type FActionCreator<A extends Action, P extends any[] = []> =
    (...params: P) => A;

/**
 * Redux-Thunk compatible action creator w/ strong parameter types.
 *
 * @param params The parameters required to create the action.
 * @typeParam A The actual action type.
 * @typeParam P The parameter list.
 * @typeParam R The return value of the thunk action creator.
 * @typeParam S The type of the state.
 * @typeParam E An optional extra argument passed to the thunk action.
 * @returns The thunk action.
 */
export type FThunkActionCreator<
    A extends Action,
    P extends any[] = [],
    R = void,
    S = any,
    E = undefined
> = (...params: P) => ThunkAction<R, S, E, A>;
