
interface Window {
    /**
     * The videu namespace for global configuration parameters.
     * Gets loaded by `env.js` (wwhich is generated at runtime).
     */
    readonly _videu: {
        /**
         * The environment.
         * Should be equal to the `NODE_ENV` environment variable.
         */
        readonly env: 'development' | 'production',

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
         */
        readonly backendRoot: string;
    };
}
