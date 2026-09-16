/**
 * Occasion & Date Computation Service
 * Pure business logic for holiday occurrences, Butcher's Easter algorithm,
 * countdown offsets, and personalized text formatting.
 */

import { OCCASIONS, CELEBRATION_EVENT_TYPES } from '../config/occasions.js';

/**
 * Calculates Easter Sunday for a given year using the Anonymous Gregorian algorithm (Meeus/Jones/Butcher).
 * @param {number} year - The 4-digit calendar year
 * @returns {Date} Date object for Easter Sunday at midnight local time
 */
export function calculateEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed: 2 = March, 3 = April
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day, 0, 0, 0);
}

/**
 * Calculates the next occurrence of a fixed annual date (month & day).
 * If the date has already passed by more than 24 hours this year, shifts to next year.
 * @param {number} month - 0-indexed month (0 = Jan, 1 = Feb, etc.)
 * @param {number} day - Day of the month (1-31)
 * @param {Date} [now=new Date()]
 * @returns {Date}
 */
export function getNextOccurrence(month, day, now = new Date()) {
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, month, day, 0, 0, 0);
    if (now.getTime() - target.getTime() > 86400000) {
        target = new Date(currentYear + 1, month, day, 0, 0, 0);
    }
    return target;
}

/**
 * Resolves the target Date for any occasion or custom milestone.
 * @param {string} occasionKey - e.g. 'valentine', 'christmas', 'newyear', 'easter', 'custom', 'birthday'
 * @param {string|null} customDateStr - ISO date string or YYYY-MM-DD
 * @param {Date} [now=new Date()]
 * @returns {Date}
 */
export function getTargetDate(occasionKey, customDateStr = null, now = new Date()) {
    const currentYear = now.getFullYear();

    if (occasionKey === 'christmas') {
        let xmas = new Date(currentYear, 11, 25, 0, 0, 0);
        if (now.getTime() - xmas.getTime() > 86400000) {
            xmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
        }
        return xmas;
    }

    if (occasionKey === 'newyear') {
        let ny = new Date(currentYear, 0, 1, 0, 0, 0);
        if (now.getTime() - ny.getTime() > 86400000) {
            ny = new Date(currentYear + 1, 0, 1, 0, 0, 0);
        }
        return ny;
    }

    if (occasionKey === 'easter') {
        let easter = calculateEasterDate(currentYear);
        if (now.getTime() - easter.getTime() > 86400000) {
            easter = calculateEasterDate(currentYear + 1);
        }
        return easter;
    }

    if (occasionKey === 'valentine') {
        let val = new Date(currentYear, 1, 14, 0, 0, 0);
        if (now.getTime() - val.getTime() > 86400000) {
            val = new Date(currentYear + 1, 1, 14, 0, 0, 0);
        }
        return val;
    }

    // Custom Date or Birthday
    if (customDateStr) {
        if (typeof customDateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(customDateStr)) {
            const [y, m, d] = customDateStr.split('-').map(Number);
            return new Date(y, m - 1, d, 0, 0, 0);
        }
        const parsed = new Date(customDateStr);
        if (!isNaN(parsed.getTime())) {
            return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0);
        }
    }

    // Check localStorage fallback if running in browser
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('celebration_custom_date');
        if (saved) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(saved)) {
                const [y, m, d] = saved.split('-').map(Number);
                return new Date(y, m - 1, d, 0, 0, 0);
            }
            const parsed = new Date(saved);
            if (!isNaN(parsed.getTime())) {
                return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0);
            }
        }
    }

    // Fallback target: 30 days from now
    const defaultDate = new Date(now.getTime() + 30 * 86400000);
    return new Date(defaultDate.getFullYear(), defaultDate.getMonth(), defaultDate.getDate(), 0, 0, 0);
}

/**
 * Calculates remaining countdown values and day-of status.
 */
export function getCountdownData(occasionKey, customDateStr = null, now = new Date()) {
    const occasion = OCCASIONS[occasionKey] || OCCASIONS.christmas;
    const targetDate = getTargetDate(occasionKey, customDateStr, now);
    const diffMs = targetDate.getTime() - now.getTime();
    const isToday = diffMs <= 0 && diffMs > -86400000;
    const isPast = diffMs <= -86400000;

    const elapsedOrRemaining = isToday ? Math.abs(diffMs) : Math.max(0, diffMs);
    const totalSeconds = Math.floor(elapsedOrRemaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        occasion,
        targetDate,
        diffMs,
        isToday,
        isPast,
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}

/**
 * Returns default occasion key according to current time of year.
 */
export function getDefaultOccasionKey(today = new Date()) {
    const month = today.getMonth();
    const day = today.getDate();
    // Late Dec -> New Year
    if (month === 11 && day >= 26) return 'newyear';
    // Jan 1 -> New Year
    if (month === 0 && day <= 1) return 'newyear';
    // Spring (Feb-Apr) -> Easter
    if (month >= 1 && month <= 3) return 'easter';
    // Fall/Winter (Sep-Dec) -> Christmas
    if (month >= 8 && month <= 11) return 'christmas';
    // Summer/Mid-year default -> Christmas
    return 'christmas';
}

/**
 * Formats a Date object into human-readable date string.
 */
export function formatDisplayDate(date) {
    if (!date || isNaN(date.getTime())) return '';
    return date.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Formats personalized card question heading.
 */
export function getPersonalizedHeading(occasionKey, name, eventType = null, eventTitle = '') {
    if (occasionKey === 'custom') {
        const typeKey = eventType && CELEBRATION_EVENT_TYPES[eventType] ? eventType : 'other';
        const typeCfg = CELEBRATION_EVENT_TYPES[typeKey];
        if (typeCfg && typeof typeCfg.getHeading === 'function') {
            return typeCfg.getHeading(name, eventTitle);
        }
    }
    const occ = OCCASIONS[occasionKey] || OCCASIONS.christmas;
    if (occ && typeof occ.getHeading === 'function') {
        return occ.getHeading(name);
    }
    return occ?.question || 'Will you celebrate with me?';
}

/**
 * Formats personalized card subtext.
 */
export function getPersonalizedSubMessage(occasionKey, name, eventType = null, eventTitle = '') {
    if (occasionKey === 'custom') {
        const typeKey = eventType && CELEBRATION_EVENT_TYPES[eventType] ? eventType : 'other';
        const typeCfg = CELEBRATION_EVENT_TYPES[typeKey];
        if (typeCfg && typeof typeCfg.getSubMessage === 'function') {
            return typeCfg.getSubMessage(name, eventTitle);
        }
    }
    const occ = OCCASIONS[occasionKey] || OCCASIONS.christmas;
    if (occ && typeof occ.getSubMessage === 'function') {
        return occ.getSubMessage(name);
    }
    return occ?.subtext || 'A little question straight from the heart...';
}

/**
 * Formats personalized success heading upon accepting.
 */
export function getPersonalizedSuccessHeading(occasionKey, name, eventType = null, eventTitle = '') {
    if (occasionKey === 'custom') {
        const typeKey = eventType && CELEBRATION_EVENT_TYPES[eventType] ? eventType : 'other';
        const typeCfg = CELEBRATION_EVENT_TYPES[typeKey];
        if (typeCfg && typeof typeCfg.getSuccessHeading === 'function') {
            return typeCfg.getSuccessHeading(name, eventTitle);
        }
    }
    const occ = OCCASIONS[occasionKey] || OCCASIONS.christmas;
    if (occ && typeof occ.getSuccessHeading === 'function') {
        return occ.getSuccessHeading(name);
    }
    return name ? `Yaaay, ${name}! You said YES! 💖` : `You said YES! 💖`;
}

/**
 * Returns heading string for any given Date.
 */
export function determineHeadingByDate(date = new Date()) {
    const seasonKey = getDefaultOccasionKey(date);
    const occ = OCCASIONS[seasonKey] || OCCASIONS.christmas;
    return typeof occ.getHeading === 'function' ? occ.getHeading('') : occ.question;
}

export const OccasionManager = {
    calculateEasterDate,
    getNextOccurrence,
    getTargetDate,
    getCountdownData,
    getDefaultOccasionKey,
    formatDisplayDate,
    getPersonalizedHeading,
    getPersonalizedSubMessage,
    getPersonalizedSuccessHeading,
    determineHeadingByDate
};
