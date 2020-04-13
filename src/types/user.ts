/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * User data interface definitions.
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

/**
 * Stores general information on a user.
 */
export interface IUser {
    /** This user's unique id. */
    id: string;
    /** The usesr (at-) name */
    userName: string;
    /** The display name. */
    displayName: string;
    /** The date this user signed up. */
    joined: Date;
    /** The amount of subscribers. */
    subCount: number;
}

/**
 * Like {@linkcode IUser}, but includes private user information.
 * There should only ever be one instance of this type
 * (which is the currently logged-in user).
 */
export interface IAuthUser extends IUser {
    /** The user's email address. */
    email: string;
    /** Various settings. */
    settings: {
        /** Whether this user likes to receive the newsletter. */
        newsletter: boolean;
        /** Whether this user's profile picture is visible publicly. */
        showPP: boolean;
    };
}
