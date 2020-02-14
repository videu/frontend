/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file The video player reducer.
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
import { VIDEO_PLAY, VIDEO_PAUSE } from '../actions/video';
import { RootAction } from '../store';

export interface VideoState {
    playing: boolean;
}

const INITIAL_STATE: VideoState = {
    playing: false,
};

const videoReducer: Reducer<VideoState, RootAction> =
    (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case VIDEO_PLAY:
                return {
                    ...state,
                    playing: true,
                };

            case VIDEO_PAUSE:
                return {
                    ...state,
                    playing: false,
                };

            default:
                return state;
        }
    };
export default videoReducer;
