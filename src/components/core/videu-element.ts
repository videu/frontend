/* SPDX-License-Identifier: AGPL-3.0-or-later */
/**
 * @file Base class for all elements.
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

import { LitElement } from 'lit-element';

interface LanguageMap {
    [propName: string]: string;
}

/**
 * Any currently supported locale as an ISO 639-1 (2-letter) code.
 */
export type LocaleLike =
    'de'
    | 'en';

export function getDefaultLocale(): LocaleLike {
    let locale: string = navigator.language.substr(0, 2);

    switch (locale) {
        case 'de':
        case 'en':
            return locale;
        default:
            return 'en';
    }
}

/**
 * Base class for all elements used in videu.
 *
 * This class provides a simple I18n API w/ dynamic locale switching.
 */
export class VideuElement extends LitElement {

    /**
     * An associative array of all localized strings in the current locale.
     * The array key is the string id.  This get updated automatically when
     * the static `locale` property is set.
     */
    private static _langMap: LanguageMap = {};

    /**
     * The number formatter for the currently active locale.
     * This gets updated automatically when the static `locale` property
     * is set.
     */
    private static _numberFormat: Intl.NumberFormat =
        new Intl.NumberFormat(getDefaultLocale());

    /**
     * The date/time formatter for the currently active locale.
     * This gets updated automatically when the static `locale` propery
     * is set.
     */
    private static _dateTimeFormat: Intl.DateTimeFormat =
        new Intl.DateTimeFormat(getDefaultLocale());

    /** The current locale as an ISO 639-1 code. */
    private static _locale: LocaleLike = getDefaultLocale();

    /** Internal callback for locale change events. */
    private _localeChangeCb: () => void;

    public constructor() {
        super();

        this._localeChangeCb = () => {
            if (this.parentNode === null) {
                /* Cleanup if we've become an orphan */
                window.removeEventListener(
                    'videu-locale-change',
                    this._localeChangeCb
                );
            } else {
                this.requestUpdate();
            }
        };
        window.addEventListener(
            'videu-locale-change',
            this._localeChangeCb
        );
    }

    /**
     * The current locale as an ISO 639-1 (2-letter) code.
     * To change this property, use the static setter.  This will update
     * all elements globally.
     */
    public get locale(): LocaleLike {
        return VideuElement._locale;
    }

    /** The current locale as an ISO 639-1 (2-letter) code */
    public static get locale(): LocaleLike {
        return this._locale;
    }

    public static set locale(locale: LocaleLike) {
        this._locale = locale;


        this._numberFormat = new Intl.NumberFormat(this._locale);
        this._dateTimeFormat = new Intl.DateTimeFormat(this._locale);
        throw new Error('Not implemented yet');
    }

    /**
     * Get an internationalized string in the currently active language by
     * its id.
     *
     * @param stringId The string id.
     * @return The localized string, or an empty string if it does not exist.
     */
    protected _(stringId: string): string {
        if (VideuElement._langMap[stringId] === undefined) {
            return '';
        } else {
            return VideuElement._langMap[stringId];
        }
    }

    /**
     * Get a stringified number in local format.
     * This includes the decimal comma/point or the point/comma for every
     * third order of magnitude.
     *
     * @param n The number.
     * @return The string representation of `n`, in localized format.
     */
    protected _n(n: number): string {
        return VideuElement._numberFormat.format(n);
    }

    /**
     * Get a date string in the current locale format.
     *
     * @param date The date, or its UNIX timestamp representation in msecs.
     * @return The localized date string.
     */
    protected _dt(date: Date | number): string {
        /*
         * TODO: Add support for completely customized date formats
         *       in printf-style (somewhere in settings)
         */
        if (typeof date === 'number') {
            return VideuElement._dateTimeFormat.format(new Date(date));
        } else {
            return VideuElement._dateTimeFormat.format(date);
        }
    }

}
