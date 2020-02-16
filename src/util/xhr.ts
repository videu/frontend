/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Simple utilityfor performing asynchronous HTTP requests.
 *
 * @license
 * Copyright (c) 2020 Felix Kopp <sandtler@santler.club>
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
 * Perform a raw HTTP request.
 * Used internally only.
 *
 * @param method The HTTP request method (in capital letters)
 * @param url The HTTP request url.
 * @param body The request body as a JSON object, if applicable.
 * @return The response, parsed as JSON
 */
function requestJSON(method: string, url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open(method, url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(xhr.status);
            }
        };

        if (typeof body === 'object' && body !== null) {
            xhr.send(body);
        } else {
            xhr.send();
        }
    });
}

/**
 * Perform an HTTP GET request against the specified URL.
 *
 * @param url The URL to fetch.
 * @return The response, decoded as JSON.
 */
export function getJSON(url: string): Promise<any> {
    return requestJSON('GET', url);
}

export function postJSON(url: string, body: any): Promise<any> {
    return requestJSON('POST', url, body);
}

export function putJSON(url: string, body: any): Promise<any> {
    return requestJSON('PUT', url, body);
}
