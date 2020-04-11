/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * videu-specific extension of the global `Window` interface.
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
 * @inheritdoc
 */
interface Window {
    /**
     * The videu namespace for global configuration parameters.
     * Gets loaded by `env.js` (which is generated at runtime).
     */
    readonly _videu: {
        /**
         * The environment.
         * Can be configured over the `NODE_ENV` environment variable.
         */
        readonly env: 'development' | 'production',

        /**
         * The application name.  Defaults to `'videu'`.
         * Can be configured over the `VIDEU_APP_NAME` environment variable.
         */
        readonly appName: string;

        /**
         * The root URL of the backend server.  Request URLs to the backend are
         * prefixed with this string in order to override the target host they
         * are sent to.  Example: Obtaining an authentication token is done with
         * the `/user/auth` endpoint.  To get the request URL, the literal
         * string `'/user/auth'` is prefixed by the value in this field.
         * So, if `backendRoot` was set to, say, `'https://localhost:4201'`,
         * the authentication request will be sent to
         * `'https://localhost:4201/user/auth'`.
         *
         * This MUST NOT end with a trailing `/`.
         * Can be configured over the `VIDEU_BACKEND_ROOT` environment variable.
         */
        readonly backendRoot: string;

        /**
         * The SHA-1 hash of the git commit this particular build resulted from.
         */
        readonly commit: string;
    };

    process: {
        env: {
            /** Don't use this, see {@linkcode Window._videu.env} instead */
            NODE_ENV: 'development' | 'production';
            [key: string]: string | undefined;
        };
        [key: string]: any;
    };

    /** The Redux DevTools enhancer for debugging. */
    __REDUX_DEVTOOLS_EXTENSION__?: import('redux').StoreEnhancer;

    /** The Redux DevTools composer for debugging. */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof import('redux').compose;
}
