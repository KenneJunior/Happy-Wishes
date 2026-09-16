/**
 * Countdown Widget Component
 * Manages the live count-up / count-down timer, title updates,
 * and day-of celebration banner displays.
 */

import { OccasionManager } from '../core/occasion-service.js';
import { CELEBRATION_EVENT_TYPES } from '../config/occasions.js';
import { appState } from '../core/state.js';

let countdownTitle = null;
let countdownTodayBanner = null;
let countdownEditBtn = null;
let timerDays = null;
let timerHours = null;
let timerMinutes = null;
let timerSeconds = null;
let countdownTimerInterval = null;

export function updateCountdownDisplay() {
    if (!timerDays || !timerHours || !timerMinutes || !timerSeconds) return;

    const state = appState.getState();
    const data = OccasionManager.getCountdownData(state.occasion, state.customDate);
    const occ = data.occasion;

    // Set title based on occasion / event
    if (countdownTitle) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            if (eventCfg && typeof eventCfg.countdownTitle === 'function') {
                countdownTitle.textContent = eventCfg.countdownTitle(state.recipient, state.customTitle);
            } else {
                countdownTitle.textContent = state.recipient ? `🗓️ ${state.recipient}'s Celebration Countdown` : "🗓️ Celebration Day Countdown";
            }
        } else if (typeof occ.countdownTitle === 'function') {
            countdownTitle.textContent = occ.countdownTitle(state.recipient);
        } else if (occ.countdownTitle) {
            countdownTitle.textContent = occ.countdownTitle;
        } else {
            countdownTitle.textContent = state.recipient ? `🗓️ ${state.recipient}'s Celebration Countdown` : "🗓️ Celebration Day Countdown";
        }
    }

    // If today is the celebration date (within the active day)
    if (data.isToday) {
        if (countdownTodayBanner) {
            countdownTodayBanner.hidden = false;
            countdownTodayBanner.style.display = 'block';
            if (state.occasion === 'custom') {
                const displayTitle = (state.customTitle && state.customTitle.trim()) || 
                    (CELEBRATION_EVENT_TYPES[state.customEvent] ? CELEBRATION_EVENT_TYPES[state.customEvent].label : 'Celebration');
                countdownTodayBanner.textContent = `🎉 TODAY IS ${state.recipient ? state.recipient.toUpperCase() + "'S " : ""}${displayTitle.toUpperCase()}! WISHING YOU INFINITE JOY! ✨🥂`;
            } else if (typeof occ.todayMessage === 'function') {
                countdownTodayBanner.textContent = occ.todayMessage(state.recipient);
            } else {
                countdownTodayBanner.textContent = `🎉 TODAY IS THE CELEBRATION! WISHING YOU INFINITE JOY! ✨🥂`;
            }
        }
    } else {
        if (countdownTodayBanner) {
            countdownTodayBanner.hidden = true;
            countdownTodayBanner.style.display = 'none';
        }
    }

    timerDays.textContent = data.days;
    timerHours.textContent = data.hours;
    timerMinutes.textContent = data.minutes;
    timerSeconds.textContent = data.seconds;
}

export function startCountdownTimer() {
    if (countdownTimerInterval) clearInterval(countdownTimerInterval);
    updateCountdownDisplay();
    countdownTimerInterval = setInterval(updateCountdownDisplay, 1000);
}

export function stopCountdownTimer() {
    if (countdownTimerInterval) {
        clearInterval(countdownTimerInterval);
        countdownTimerInterval = null;
    }
}

export function initCountdown({ onEditDate } = {}) {
    countdownTitle = document.getElementById('countdown-title');
    countdownTodayBanner = document.getElementById('countdown-today-banner');
    countdownEditBtn = document.getElementById('countdown-edit-btn');
    timerDays = document.getElementById('timer-days');
    timerHours = document.getElementById('timer-hours');
    timerMinutes = document.getElementById('timer-minutes');
    timerSeconds = document.getElementById('timer-seconds');

    if (countdownEditBtn && onEditDate) {
        countdownEditBtn.addEventListener('click', onEditDate);
    }

    // React to state changes
    appState.subscribe((newState, oldState, changedKeys) => {
        if (changedKeys.some(k => ['occasion', 'customDate', 'customEvent', 'customTitle', 'recipient'].includes(k))) {
            updateCountdownDisplay();
        }
    });

    // Immediate refresh on tab focus / visibility
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateCountdownDisplay();
        }
    });

    startCountdownTimer();
}
