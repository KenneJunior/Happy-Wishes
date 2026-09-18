/**
 * Theme & Mode Manager
 * Handles dark mode / night-time viewing toggling,
 * system color scheme listeners, and occasion CSS classes on <body>.
 */

import { sound } from '../core/sound.js';
import { showToast } from './toast.js';
import { appState } from '../core/state.js';
import { OCCASIONS } from '../config/occasions.js';

let themeToggleBtn = null;
let themeToggleIcon = null;
let themeToggleText = null;

export function isDarkModeActive() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
           document.body.classList.contains('dark-mode');
}

export function updateThemeToggleUI(isDark) {
    if (!themeToggleBtn) return;
    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode for Night-Time Viewing');
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode for night-time viewing');

    if (themeToggleIcon) {
        themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
    }
    if (themeToggleText) {
        themeToggleText.textContent = isDark ? 'Light' : 'Dark';
    }
}

export function setThemeMode(isDark, saveToStorage = true) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-mode');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-mode');
    }

    if (saveToStorage) {
        appState.updateState({ theme: isDark ? 'dark' : 'light' });
    }

    updateThemeToggleUI(isDark);
}

export function toggleThemeMode() {
    const currentlyDark = isDarkModeActive();
    const nextDark = !currentlyDark;
    setThemeMode(nextDark, true);
    sound.playThemeToggleSound(nextDark);
    showToast(nextDark ? "Night-Time Dark Mode enabled 🌙✨" : "Daylight Mode enabled ☀️💖", nextDark ? "🌙" : "☀️");
}

/**
 * Applies the occasion theme class (e.g. 'theme-valentine', 'theme-christmas') to <body>.
 */
export function applyOccasionTheme(occasionKey) {
    const occ = OCCASIONS[occasionKey] || OCCASIONS.christmas;
    Object.values(OCCASIONS).forEach(o => {
        if (o.themeClass) document.body.classList.remove(o.themeClass);
    });
    if (occ.themeClass) {
        document.body.classList.add(occ.themeClass);
    }

    if (typeof document !== 'undefined') {
        if (document.body) {
            document.body.setAttribute('theme', occasionKey);
        }
        const container = document.getElementById('floating-hearts-container');
        if (container) {
            container.setAttribute('theme', occasionKey);
        }
    }
}

export function initTheme() {
    themeToggleBtn = document.getElementById('theme-toggle-btn');
    themeToggleIcon = document.getElementById('theme-toggle-icon');
    themeToggleText = document.getElementById('theme-toggle-text');

    const state = appState.getState();
    const savedTheme = state.theme;
    let isDark = savedTheme === 'dark';

    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark = true;
    }

    setThemeMode(isDark, false);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleThemeMode);
    }

    if (window.matchMedia) {
        try {
            const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
            darkMedia.addEventListener('change', (e) => {
                const currentState = appState.getState();
                // Only adapt automatically if user hasn't explicitly set a preference
                const hasExplicitPref = localStorage.getItem('valentine_theme_mode');
                if (!hasExplicitPref) {
                    setThemeMode(e.matches, false);
                }
            });
        } catch (e) {}
    }
}
