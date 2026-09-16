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
    THEME_MODE: 'valentine_theme_mode'
};

const DEFAULT_STATE = {
    recipient: '',
    occasion: getDefaultOccasionKey(),
    customDate: '',
    customEvent: '',
    customTitle: '',
    customMsg: '',
    customFrom: '',
    denyCount: 0,
    acceptScale: 1.0,
    cardFlipped: false,
    isAccepted: false,
    theme: 'light'
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
                if (storedOccasion && (OCCASIONS[storedOccasion] || storedOccasion === 'anniversary')) {
                    if (storedOccasion === 'anniversary') {
                        loaded.occasion = 'custom';
                        loaded.customEvent = 'anniversary';
                        if (!loaded.customTitle) loaded.customTitle = 'Anniversary';
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
            }
        } catch (e) {
            console.warn('LocalStorage unavailable or restricted:', e);
        }

        // 2. URL Parameters (Explicitly override saved state)
        if (typeof window !== 'undefined' && window.location) {
            const params = new URLSearchParams(window.location.search);

            const urlTo = params.get('to') || params.get('name') || params.get('recipient');
            if (urlTo && urlTo.trim()) loaded.recipient = urlTo.trim().slice(0, 36);

            const urlOccasion = params.get('occasion');
            if (urlOccasion && (OCCASIONS[urlOccasion] || urlOccasion === 'anniversary')) {
                if (urlOccasion === 'anniversary') {
                    loaded.occasion = 'custom';
                    loaded.customEvent = 'anniversary';
                    if (!loaded.customTitle) loaded.customTitle = 'Anniversary';
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
        if (this._state.customDate) url.searchParams.set('date', this._state.customDate);
        if (this._state.customEvent) url.searchParams.set('event', this._state.customEvent);
        if (this._state.customTitle) url.searchParams.set('title', this._state.customTitle);
        if (this._state.customMsg) url.searchParams.set('msg', this._state.customMsg);
        if (this._state.customFrom) url.searchParams.set('from', this._state.customFrom);
        return url.toString();
    }
}

export const appState = new StateStore();
export { STORAGE_KEYS };
