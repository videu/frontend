/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file All actions for the video player.
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

export const VIDEO_PLAY = 'VIDEO_PLAY';
export const VIDEO_PAUSE = 'VIDEO_PAUSE';

export interface VideoActionPlay extends Action<'VIDEO_PLAY'> {};
export interface VideoActionPause extends Action<'VIDEO_PAUSE'> {};

export type VideoAction =
    VideoActionPlay
    | VideoActionPause;

export const play: ActionCreator<VideoActionPlay> = () => {
    return {
        type: VIDEO_PLAY,
    };
};

export const pause: ActionCreator<VideoActionPause> = () => {
    return {
        type: VIDEO_PAUSE,
    };
};
