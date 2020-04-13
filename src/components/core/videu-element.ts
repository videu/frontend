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

import i18next, {
    StringMap,
    TFunctionKeys,
    TFunctionResult,
    TOptions,
} from 'i18next';
import backend from 'i18next-xhr-backend';
import { LitElement } from 'lit-element';

/**
 * Get the currently active locale.
 */
export function getLocale(): string {
    const locale = window.localStorage.getItem('locale') || navigator.language;

    /* TODO: Add region-specific translations */
    switch (locale.substr(0, 2)) {
        case 'de': return 'de';
        case 'en': return 'en';
        default: return locale;
    }
}

/**
 * Base class for all elements used in videu.
 *
 * This class provides a simple I18n API w/ dynamic locale switching.
 */
export class VideuElement extends LitElement {

    /**
     * The number formatter for the currently active locale.
     * This gets updated automatically when the static `locale` property
     * is set.
     */
    private static numberFormat: Intl.NumberFormat =
        new Intl.NumberFormat(getLocale());

    /**
     * The date/time formatter for the currently active locale.
     * This gets updated automatically when the static `locale` propery
     * is set.
     */
    private static dateTimeFormat: Intl.DateTimeFormat =
        new Intl.DateTimeFormat(getLocale());

    /**
     * Set the current locale for string translations.
     *
     * @param locale The new locale.
     */
    public static async setLocale(locale: string): Promise<void> {
        window.localStorage.setItem('locale', locale);
        this.numberFormat = new Intl.NumberFormat(locale);
        this.dateTimeFormat = new Intl.DateTimeFormat(locale);
        await i18next.changeLanguage(locale);
    }

    public constructor() {
        super();

        this.onI18nextEvent = this.onI18nextEvent.bind(this);
    }

    /**
     * Called when the element is inserted into the DOM.
     *
     * @override
     */
    public connectedCallback() {
        super.connectedCallback();

        i18next.on('initialized', this.onI18nextEvent);
        i18next.on('languageChanged', this.onI18nextEvent);
    }

    /**
     * Called when the element is removed from the DOM.
     *
     * @override
     */
    public disconnectedCallback() {
        super.disconnectedCallback();

        i18next.off('initialized', this.onI18nextEvent);
        i18next.off('languageChanged', this.onI18nextEvent);
    }

    /**
     * Get an internationalized string in the currently active language by
     * its id.
     *
     * @param key The string resource key.
     * @param opts Additional parameters passed to `i18next` (optional).
     * @return The localized string, or an empty string if it does not exist.
     */
    protected t<
        TResult extends TFunctionResult = string,
        TKeys extends TFunctionKeys = string,
        TInterpolationMap extends object = StringMap
    >(key: TKeys | TKeys[], opts?: TOptions<TInterpolationMap> | string): TResult {
        if (i18next.isInitialized) {
            return i18next.t<TResult, TKeys, TInterpolationMap>(key, '', opts);
        } else {
            return '' as TResult;
        }
    }

    /**
     * Get a stringified number in local format.
     * This includes the decimal comma/point or the point/comma for every
     * third order of magnitude.
     *
     * @param num The number.
     * @return The string representation of `n`, in localized format.
     */
    protected n(num: number): string {
        return VideuElement.numberFormat.format(num);
    }

    /**
     * Get a date and time string in the current locale format.
     *
     * @param date The date, or its UNIX timestamp representation in msecs.
     * @return The localized date string.
     */
    protected dt(date: Date | number): string {
        /*
         * TODO: Add support for completely customized date formats
         *       in printf-style (somewhere in settings)
         */
        if (typeof date === 'number') {
            return VideuElement.dateTimeFormat.format(new Date(date));
        } else {
            return VideuElement.dateTimeFormat.format(date);
        }
    }

    /**
     * Callback for events emitted from `i18next`.
     */
    private onI18nextEvent() {
        this.requestUpdate();
    }

}

i18next.use(backend);
i18next.init({
    debug: window._videu.env === 'development',
    lng: getLocale(),
    defaultNS: 'core',
    ns: ['core'],
    fallbackLng: 'en',
    backend: {
        loadPath: '/intl/{{lng}}/{{ns}}.json',
    },
});
