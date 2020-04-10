/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * Simple utility for performing asynchronous HTTP requests.
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

/** Base interface for all successful responses from the backend. */
export interface IBackendSuccessResponse {
    /** The error flag. */
    err: false;
}

/** An error response from the backend. */
export interface IBackendErrorResponse {
    /** The error flag. */
    err: true;
    /** The error message. */
    msg: string;
}

/**
 * Represents any response from the videu backend server.
 */
export type BackendResponse = IBackendErrorResponse | IBackendSuccessResponse;

/**
 * Perform a raw HTTP request.
 * Used internally only.
 *
 * @param method The HTTP request method (in capital letters)
 * @param url The HTTP request url.
 * @param body The request body as a JSON object, if applicable.
 * @typeParam T The type of the response body.
 * @returns The response, parsed as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
function requestJSON<T extends object>(method: string, url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return new Promise((resolve, reject) => {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open(method, url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            let data: BackendResponse;
            try {
                data = JSON.parse(xhr.responseText);
            } catch (err) {
                reject(err);
                return;
            }

            if (data.err) {
                reject(new Error(data.msg));
            } else {
                resolve(data as T & IBackendSuccessResponse);
            }
        };

        if (typeof body === 'object' && body !== null) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    });
}

/**
 * Perform an HTTP GET request to the specified URL.
 *
 * @param url The URL to fetch.
 * @param body The requeest body.
 * @typeParam T The type of the response body.
 * @returns The response, decoded as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
export function getJSON<T extends object>(url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return requestJSON('GET', url, body);
}

/**
 * Perform an HTTP POST request to the specified URL.
 *
 * @param url The URL to fetch.
 * @param body The requeest body.
 * @typeParam T The type of the response body.
 * @returns The response, decoded as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
export function postJSON<T extends object>(url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return requestJSON('POST', url, body);
}

/**
 * Perform an HTTP PUT request to the specified URL.
 *
 * @param url The URL to fetch.
 * @param body The requeest body.
 * @typeParam T The type of the response body.
 * @returns The response, decoded as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
export function putJSON<T extends object>(url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return requestJSON('PUT', url, body);
}

/**
 * Perform an HTTP DELETE request to the specified URL.
 *
 * @param url The URL to fetch.
 * @param body The requeest body.
 * @typeParam T The type of the response body.
 * @returns The response, decoded as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
export function deleteJSON<T extends object>(url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return requestJSON('DELETE', url, body);
}

/**
 * Perform an HTTP PATCH request to the specified URL.
 *
 * @param url The URL to fetch.
 * @param body The requeest body.
 * @typeParam T The type of the response body.
 * @returns The response, decoded as JSON.
 * @throws An Error if the response has its `err` flag set to `true`.
 *     The error's message will be equal to the `msg` field of the response.
 */
export function patchJSON<T extends object>(url: string, body?: object):
Promise<T & IBackendSuccessResponse> {
    return requestJSON('PATCH', url, body);
}
