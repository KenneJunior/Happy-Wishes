/**
 * Centralized Application State Manager
 * Single source of truth for occasion, personalization, keepsake, and runtime interaction state.
 * Encapsulates URL search parameter parsing, localStorage persistence, and reactive updates.
 */

import { getDefaultOccasionKey } from './occasion-service.js';
import { OCCASIONS } from '../config/occasions.js';

const STORAGE_KEYS = {
    RECIPIENT: 'celebration_recipient',
    OCCASION: 'celebration_occasion',
    CUSTOM_DATE: 'celebration_custom_date',
    CUSTOM_TITLE: 'celebration_custom_event_title',
    CUSTOM_EVENT: 'celebration_custom_event_type',
    KEEPSAKE_MSG: 'custom_keepsake_msg',
    KEEPSAKE_FROM: 'custom_keepsake_from',
    THEME_MODE: 'valentine_theme_mode',
    CUSTOM_SONG_URL: 'celebration_custom_song_url',
    CUSTOM_SONG_NAME: 'celebration_custom_song_name',
    LANGUAGE: 'celebration_language',
    VISUAL_THEME: 'celebration_visual_theme',
    CUSTOM_VISUAL_URL: 'celebration_custom_visual_url'
};

const DEFAULT_STATE = {
    recipient: '',
    occasion: getDefaultOccasionKey(),
    customDate: '',
    customEvent: '',
    customTitle: '',
    customMsg: '',
    customFrom: '',
    customSongUrl: '',
    customSongName: '',
    visualTheme: 'default',
    customVisualUrl: '',
    denyCount: 0,
    acceptScale: 1.0,
    cardFlipped: false,
    isAccepted: false,
    theme: 'light',
    language: 'en'
};

class StateStore {
    constructor() {
        this._state = { ...DEFAULT_STATE };
        this._subscribers = new Set();
    }

    /**
     * Returns a frozen copy of the current state.
     */
    getState() {
        return { ...this._state };
    }

    /**
     * Subscribes a listener function to state changes.
     * @param {Function} listener - Called with (newState, oldState, changedKeys)
     * @returns {Function} Unsubscribe function
     */
    subscribe(listener) {
        this._subscribers.add(listener);
        return () => this._subscribers.delete(listener);
    }

    /**
     * Updates one or more state properties and notifies subscribers.
     * @param {Object} partialUpdate - Object with state properties to update
     * @param {boolean} [persist=true] - Whether to persist relevant keys to localStorage
     */
    updateState(partialUpdate, persist = true) {
        const oldState = { ...this._state };
        const changedKeys = [];

        for (const [key, value] of Object.entries(partialUpdate)) {
            if (this._state[key] !== value) {
                this._state[key] = value;
                changedKeys.push(key);
            }
        }

        if (changedKeys.length === 0) return;

        if (persist) {
            this.persistState();
        }

        for (const listener of this._subscribers) {
            try {
                listener(this.getState(), oldState, changedKeys);
            } catch (err) {
                console.error('State subscriber error:', err);
            }
        }
    }

    /**
     * Replaces the entire state or updates provided keys.
     */
    setState(newState, persist = true) {
        this.updateState(newState, persist);
    }

    /**
     * Resets interaction runtime state (for replay / restart).
     */
    resetInteractionState() {
        this.updateState({
            denyCount: 0,
            acceptScale: 1.0,
            isAccepted: false
        }, false);
    }

    /**
     * Reads initial values from URL query parameters (highest priority)
     * and localStorage (secondary priority).
     */
    loadInitialState() {
        const loaded = { ...DEFAULT_STATE };

        // 1. Check LocalStorage
        try {
            if (typeof localStorage !== 'undefined') {
                const storedRecipient = localStorage.getItem(STORAGE_KEYS.RECIPIENT);
                if (storedRecipient) loaded.recipient = storedRecipient.trim();

                const storedOccasion = localStorage.getItem(STORAGE_KEYS.OCCASION);
                if (storedOccasion && (OCCASIONS[storedOccasion] || storedOccasion === 'anniversary' || storedOccasion === 'graduation')) {
                    if (storedOccasion === 'anniversary') {
                        loaded.occasion = 'anniversary';
                        loaded.customEvent = 'anniversary';
                        if (!loaded.customTitle) loaded.customTitle = 'Anniversary';
                    } else if (storedOccasion === 'graduation') {
                        loaded.occasion = 'graduation';
                        loaded.customEvent = 'graduation';
                        if (!loaded.customTitle) loaded.customTitle = 'Graduation';
                    } else {
                        loaded.occasion = storedOccasion;
                    }
                }

                const storedDate = localStorage.getItem(STORAGE_KEYS.CUSTOM_DATE);
                if (storedDate) loaded.customDate = storedDate;

                const storedTitle = localStorage.getItem(STORAGE_KEYS.CUSTOM_TITLE);
                if (storedTitle) loaded.customTitle = storedTitle;

                const storedEvent = localStorage.getItem(STORAGE_KEYS.CUSTOM_EVENT);
                if (storedEvent) loaded.customEvent = storedEvent;

                const storedMsg = localStorage.getItem(STORAGE_KEYS.KEEPSAKE_MSG);
                if (storedMsg) loaded.customMsg = storedMsg;

                const storedFrom = localStorage.getItem(STORAGE_KEYS.KEEPSAKE_FROM);
                if (storedFrom) loaded.customFrom = storedFrom;

                const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
                if (storedTheme) loaded.theme = storedTheme;

                const storedSongUrl = localStorage.getItem(STORAGE_KEYS.CUSTOM_SONG_URL);
                if (storedSongUrl) loaded.customSongUrl = storedSongUrl;

                const storedSongName = localStorage.getItem(STORAGE_KEYS.CUSTOM_SONG_NAME);
                if (storedSongName) loaded.customSongName = storedSongName;

                const storedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
                if (storedLang && ['en', 'fr', 'es', 'pt', 'de'].includes(storedLang.toLowerCase())) {
                    loaded.language = storedLang.toLowerCase();
                }

                const storedVisualTheme = localStorage.getItem(STORAGE_KEYS.VISUAL_THEME);
                if (storedVisualTheme) loaded.visualTheme = storedVisualTheme;

                const storedVisualUrl = localStorage.getItem(STORAGE_KEYS.CUSTOM_VISUAL_URL);
                if (storedVisualUrl) loaded.customVisualUrl = storedVisualUrl;
            }
        } catch (e) {
            console.warn('LocalStorage unavailable or restricted:', e);
        }

        // 2. URL Parameters (Explicitly override saved state)
        if (typeof window !== 'undefined' && window.location) {
            const params = new URLSearchParams(window.location.search);

            const urlLang = params.get('lang') || params.get('language');
            if (urlLang && ['en', 'fr', 'es', 'pt', 'de'].includes(urlLang.toLowerCase())) {
                loaded.language = urlLang.toLowerCase();
            }

            const urlVisual = params.get('visual') || params.get('theme_visual') || params.get('gif');
            if (urlVisual && urlVisual.trim()) loaded.visualTheme = urlVisual.trim();

            const urlVisualUrl = params.get('visual_url') || params.get('custom_gif');
            if (urlVisualUrl && urlVisualUrl.trim()) loaded.customVisualUrl = urlVisualUrl.trim();

            const urlTo = params.get('to') || params.get('name') || params.get('recipient');
            if (urlTo && urlTo.trim()) loaded.recipient = urlTo.trim().slice(0, 36);

            const urlOccasion = params.get('occasion');
            if (urlOccasion && (OCCASIONS[urlOccasion] || urlOccasion === 'anniversary' || urlOccasion === 'graduation')) {
                if (urlOccasion === 'anniversary') {
                    loaded.occasion = 'anniversary';
                    loaded.customEvent = 'anniversary';
                    if (!loaded.customTitle) loaded.customTitle = 'Anniversary';
                } else if (urlOccasion === 'graduation') {
                    loaded.occasion = 'graduation';
                    loaded.customEvent = 'graduation';
                    if (!loaded.customTitle) loaded.customTitle = 'Graduation';
                } else {
                    loaded.occasion = urlOccasion;
                }
            }

            const urlDate = params.get('date');
            if (urlDate) loaded.customDate = urlDate.trim();

            const urlEvent = params.get('event');
            if (urlEvent) loaded.customEvent = urlEvent.trim();

            const urlTitle = params.get('title');
            if (urlTitle) loaded.customTitle = urlTitle.trim().slice(0, 48);

            const urlMsg = params.get('msg') || params.get('message');
            if (urlMsg) loaded.customMsg = urlMsg.trim().slice(0, 500);

            const urlFrom = params.get('from');
            if (urlFrom) loaded.customFrom = urlFrom.trim().slice(0, 36);

            const urlSong = params.get('song');
            if (urlSong && urlSong.trim()) loaded.customSongUrl = urlSong.trim();

            const urlSongName = params.get('songname');
            if (urlSongName && urlSongName.trim()) loaded.customSongName = urlSongName.trim().slice(0, 60);
        }

        // 3. Browser / Device language fallback (if not explicitly set by URL or saved in localStorage)
        let hasExplicitLang = false;
        try {
            if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEYS.LANGUAGE)) {
                hasExplicitLang = true;
            }
        } catch (_) {}

        if (!hasExplicitLang && loaded.language === 'en' && typeof navigator !== 'undefined') {
            const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
                ? navigator.languages
                : [navigator.language || navigator.userLanguage || ''];
            for (const cand of candidates) {
                if (!cand || typeof cand !== 'string') continue;
                const code = cand.split('-')[0].toLowerCase();
                if (['en', 'fr', 'es', 'pt', 'de'].includes(code)) {
                    loaded.language = code;
                    break;
                }
            }
        }

        // Apply loaded state without notifying subscribers during bootstrap
        this._state = loaded;
        return this.getState();
    }

    /**
     * Persists relevant state keys to localStorage.
     */
    persistState() {
        try {
            if (typeof localStorage === 'undefined') return;

            if (this._state.recipient) {
                localStorage.setItem(STORAGE_KEYS.RECIPIENT, this._state.recipient);
            } else {
                localStorage.removeItem(STORAGE_KEYS.RECIPIENT);
            }

            if (this._state.occasion) {
                localStorage.setItem(STORAGE_KEYS.OCCASION, this._state.occasion);
            }

            if (this._state.customDate) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_DATE, this._state.customDate);
            } else {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_DATE);
            }

            if (this._state.customTitle) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_TITLE, this._state.customTitle);
            } else {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_TITLE);
            }

            if (this._state.customEvent) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_EVENT, this._state.customEvent);
            } else {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_EVENT);
            }

            if (this._state.customMsg) {
                localStorage.setItem(STORAGE_KEYS.KEEPSAKE_MSG, this._state.customMsg);
            }

            if (this._state.customFrom) {
                localStorage.setItem(STORAGE_KEYS.KEEPSAKE_FROM, this._state.customFrom);
            }

            if (this._state.theme) {
                localStorage.setItem(STORAGE_KEYS.THEME_MODE, this._state.theme);
            }

            if (this._state.customSongUrl && !this._state.customSongUrl.startsWith('blob:')) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_SONG_URL, this._state.customSongUrl);
            } else if (!this._state.customSongUrl) {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_SONG_URL);
            }

            if (this._state.customSongName) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_SONG_NAME, this._state.customSongName);
            } else {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_SONG_NAME);
            }

            if (this._state.language) {
                localStorage.setItem(STORAGE_KEYS.LANGUAGE, this._state.language);
            }

            if (this._state.visualTheme && this._state.visualTheme !== 'default') {
                localStorage.setItem(STORAGE_KEYS.VISUAL_THEME, this._state.visualTheme);
            } else {
                localStorage.removeItem(STORAGE_KEYS.VISUAL_THEME);
            }

            if (this._state.customVisualUrl && !this._state.customVisualUrl.startsWith('blob:')) {
                localStorage.setItem(STORAGE_KEYS.CUSTOM_VISUAL_URL, this._state.customVisualUrl);
            } else {
                localStorage.removeItem(STORAGE_KEYS.CUSTOM_VISUAL_URL);
            }
        } catch (e) {
            console.warn('Failed to persist state to localStorage:', e);
        }
    }

    /**
     * Generates a shareable URL reflecting the current state.
     */
    getShareUrl() {
        if (typeof window === 'undefined') return '';
        const url = new URL(window.location.origin + window.location.pathname);
        if (this._state.recipient) url.searchParams.set('to', this._state.recipient);
        if (this._state.occasion) url.searchParams.set('occasion', this._state.occasion);
        if (this._state.language && this._state.language !== 'en') url.searchParams.set('lang', this._state.language);
        if (this._state.visualTheme && this._state.visualTheme !== 'default') {
            url.searchParams.set('visual', this._state.visualTheme);
        }
        if (this._state.customVisualUrl && !this._state.customVisualUrl.startsWith('blob:')) {
            url.searchParams.set('visual_url', this._state.customVisualUrl);
        }
        if (this._state.customDate) url.searchParams.set('date', this._state.customDate);
        if (this._state.customEvent) url.searchParams.set('event', this._state.customEvent);
        if (this._state.customTitle) url.searchParams.set('title', this._state.customTitle);
        if (this._state.customMsg) url.searchParams.set('msg', this._state.customMsg);
        if (this._state.customFrom) url.searchParams.set('from', this._state.customFrom);
        if (this._state.customSongUrl && !this._state.customSongUrl.startsWith('blob:')) {
            url.searchParams.set('song', this._state.customSongUrl);
        }
        if (this._state.customSongName && (!this._state.customSongUrl || !this._state.customSongUrl.startsWith('blob:'))) {
            url.searchParams.set('songname', this._state.customSongName);
        }
        return url.toString();
    }
}

export const appState = new StateStore();
export { STORAGE_KEYS };
