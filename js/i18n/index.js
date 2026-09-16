/**
 * Internationalization (i18n) Engine
 * Manages language selection, string resolution with multi-layer fallback,
 * and real-time DOM UI translation.
 * 
 * STRICT RULES:
 * - Only application/UI-generated interface text is translated automatically.
 * - Recipient names, sender names, user-entered custom messages, AI-generated love letters,
 *   and custom event titles are NEVER automatically translated.
 * - Multi-layer fallback: requested language -> English -> safe caller fallback -> path string.
 *   Missing translation keys will NEVER return undefined, null, [missing], or blank strings.
 */

import { TRANSLATIONS, LANGUAGE_NAMES } from './translations.js';
import { appState } from '../core/state.js';
import { updateKeepsakeContent } from '../ui/keepsake.js';

export { LANGUAGE_NAMES };

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'pt', 'de'];

let currentLang = 'en';

/**
 * Retrieve translation by dot-path (e.g. 'accept', 'occasions.valentine.question')
 * Follows strict fallback chain:
 * 1. Target language value
 * 2. English value
 * 3. Caller fallback argument
 * 4. Safe key / path string
 * 
 * @param {string} path - Dot-separated translation key path
 * @param {string} [fallback=''] - Optional fallback string if key is completely missing
 * @param {string} [lang=currentLang] - Specific language to resolve (defaults to current active)
 * @returns {string} Guaranteed non-null, non-undefined string
 */
export function t(path, fallback = '', lang = currentLang) {
    if (!path || typeof path !== 'string') {
        return (fallback && typeof fallback === 'string') ? fallback : '';
    }

    const activeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
    const keys = path.split('.');

    // Safe nested object navigator
    const resolveFromObj = (obj) => {
        let current = obj;
        for (const k of keys) {
            if (current && typeof current === 'object' && k in current) {
                current = current[k];
            } else {
                return null;
            }
        }
        if (current !== null && current !== undefined && typeof current === 'string' && current.trim().length > 0) {
            return current;
        }
        return null;
    };

    // 1. Check target language
    const val = resolveFromObj(TRANSLATIONS[activeLang]);
    if (val !== null) {
        return val;
    }

    // 2. Safe Fallback to English
    if (activeLang !== 'en') {
        const enVal = resolveFromObj(TRANSLATIONS.en);
        if (enVal !== null) {
            return enVal;
        }
    }

    // 3. Fallback to provided fallback parameter
    if (fallback && typeof fallback === 'string' && fallback.trim().length > 0) {
        return fallback;
    }

    // 4. Guaranteed last-resort fallback: last path segment or raw path
    const lastKey = keys[keys.length - 1];
    return lastKey || path;
}

/**
 * Helper to get occasion-specific UI texts with guaranteed fallbacks
 * @param {string} occKey - Occasion key (e.g. 'valentine', 'birthday')
 * @param {string} [lang=currentLang] - Language code
 * @returns {object} Object with all occasion strings guaranteed non-null
 */
export function getOccasionTranslation(occKey, lang = currentLang) {
    const activeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
    const targetOcc = TRANSLATIONS[activeLang]?.occasions?.[occKey] || {};
    const enOcc = TRANSLATIONS.en?.occasions?.[occKey] || TRANSLATIONS.en?.occasions?.valentine || {};

    const resolveField = (field, fallback) => {
        if (typeof targetOcc[field] === 'string' && targetOcc[field].trim().length > 0) {
            return targetOcc[field];
        }
        if (typeof enOcc[field] === 'string' && enOcc[field].trim().length > 0) {
            return enOcc[field];
        }
        return fallback;
    };

    return {
        label: resolveField('label', occKey),
        sub: resolveField('sub', ''),
        badge: resolveField('badge', '✨ CELEBRATION ✨'),
        question: resolveField('question', 'Celebrate together?'),
        headingWithName: resolveField('headingWithName', '{name}, celebrate together?'),
        subtext: resolveField('subtext', ''),
        subtextWithName: resolveField('subtextWithName', ''),
        acceptText: resolveField('acceptText', 'Yes'),
        acceptEmoji: resolveField('acceptEmoji', '💖'),
        denyText: resolveField('denyText', 'No'),
        denyEmoji: resolveField('denyEmoji', '💔'),
        celebrationBadge: resolveField('celebrationBadge', '🎉 CELEBRATION! 🎉'),
        successHeading: resolveField('successHeading', 'Yaaay, {name}! 🎉'),
        successHeadingGeneral: resolveField('successHeadingGeneral', 'You said YES! 💖'),
        successSubtext: resolveField('successSubtext', 'Wishing you joy and happiness!')
    };
}

/**
 * Gets currently active language code
 * @returns {string}
 */
export function getLanguage() {
    return currentLang;
}

/**
 * Returns localized name of language (e.g. 'Français')
 * @param {string} [lang=currentLang]
 * @returns {string}
 */
export function getLanguageName(lang = currentLang) {
    return LANGUAGE_NAMES[lang] || LANGUAGE_NAMES.en;
}

/**
 * Sets current language, applies DOM updates, and optionally persists preference
 * @param {string} langCode 
 * @param {boolean} [persist=true]
 */
export function setLanguage(langCode, persist = true) {
    const validatedLang = SUPPORTED_LANGUAGES.includes(langCode) ? langCode : 'en';
    currentLang = validatedLang;

    if (typeof document !== 'undefined') {
        document.documentElement.lang = validatedLang;
    }

    if (persist && appState) {
        appState.updateState({ language: validatedLang });
    }

    applyTranslations();

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('celebration:language-changed', {
            detail: { language: validatedLang, name: LANGUAGE_NAMES[validatedLang] }
        }));
    }
}

/**
 * Detects browser / device language safely.
 * Matches against supported languages ['en', 'fr', 'es', 'pt', 'de']
 * @returns {string|null} Supported language code or null
 */
export function detectBrowserLanguage() {
    if (typeof navigator === 'undefined') return null;

    const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || ''];

    for (const cand of candidates) {
        if (!cand || typeof cand !== 'string') continue;
        const code = cand.split('-')[0].toLowerCase();
        if (SUPPORTED_LANGUAGES.includes(code)) {
            return code;
        }
    }
    return null;
}

/**
 * Updates all DOM elements with dynamic translations.
 * STRICT SCOPE ENFORCEMENT:
 * - Only application/UI-generated interface labels and placeholders are translated.
 * - Recipient names, custom titles, user-entered messages, and AI letters are NEVER translated.
 */
export function applyTranslations() {
    if (typeof document === 'undefined') return;

    const lang = currentLang;
    const state = appState ? appState.getState() : {};
    const occKey = state.occasion || 'valentine';
    const recipient = (state.recipient || '').trim();
    const customTitle = (state.customTitle || '').trim();
    const hasCustomTitle = customTitle.length > 0;
    const occTrans = getOccasionTranslation(occKey, lang);

    // 1. Navigation & Control Pills
    const recipientPill = document.getElementById('recipient-pill-text');
    if (recipientPill) {
        recipientPill.textContent = recipient ? `${t('personalizeEdit')} ✏️` : `${t('personalize')} 💌`;
    }

    const wishJarPill = document.getElementById('wish-jar-pill-text');
    if (wishJarPill) {
        wishJarPill.textContent = `${t('holidayWishes')} 🎁`;
    }

    const themeToggleText = document.getElementById('theme-toggle-text');
    if (themeToggleText) {
        const isDark = document.body.classList.contains('dark-mode') || document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggleText.textContent = isDark ? t('themeLight') : t('themeDark');
    }

    // Preloader Elements (if visible)
    const preloaderTitle = document.getElementById('preloader-title');
    if (preloaderTitle) {
        preloaderTitle.textContent = t('preloaderTitle');
    }
    const preloaderBadgeText = document.getElementById('preloader-badge-text');
    if (preloaderBadgeText) {
        const occName = occTrans.label || occ.name;
        preloaderBadgeText.textContent = t('preloaderCrafting').replace('{occasion}', occName);
    }

    // 2. Countdown Widget Labels (Static UI text only)
    const cdTitle = document.getElementById('countdown-title');
    if (cdTitle) {
        cdTitle.textContent = t('countdownTitle');
    }

    const labelDays = document.getElementById('countdown-label-days');
    if (labelDays) labelDays.textContent = t('days');

    const labelHours = document.getElementById('countdown-label-hours');
    if (labelHours) labelHours.textContent = t('hours');

    const labelMins = document.getElementById('countdown-label-mins');
    if (labelMins) labelMins.textContent = t('mins');

    const labelSecs = document.getElementById('countdown-label-secs');
    if (labelSecs) labelSecs.textContent = t('secs');

    const cdTodayBanner = document.getElementById('countdown-today-banner');
    if (cdTodayBanner) {
        cdTodayBanner.textContent = t('countdownToday');
    }

    // 3. Card Badge (If not in accepted celebration state)
    const isAccepted = !!state.isAccepted;
    const badgeTextEl = document.getElementById('badge-text');
    if (badgeTextEl && !isAccepted) {
        if (occKey === 'custom' && hasCustomTitle) {
            badgeTextEl.textContent = `✨ ${customTitle}`;
        } else {
            badgeTextEl.textContent = occTrans.badge || t('celebrationBadge');
        }
    }

    // 4. Main Question & Subtext (When in question state)
    const mainQuestion = document.getElementById('question-text') || document.getElementById('main-question');
    const subMessage = document.getElementById('sub-message');

    if (!isAccepted) {
        if (mainQuestion) {
            if (occKey === 'custom' && hasCustomTitle) {
                mainQuestion.textContent = recipient ? `${recipient}, ${customTitle}!` : `${customTitle}!`;
            } else if (recipient) {
                const headingTemplate = occTrans.headingWithName || `{name}, ${occTrans.question}`;
                mainQuestion.textContent = headingTemplate.replace('{name}', recipient);
            } else {
                mainQuestion.textContent = occTrans.question;
            }
        }

        if (subMessage) {
            if (recipient && occTrans.subtextWithName) {
                subMessage.textContent = occTrans.subtextWithName.replace('{name}', recipient);
            } else {
                subMessage.textContent = occTrans.subtext;
            }
        }
    }

    // 5. Action Buttons (Accept / Deny)
    const acceptTextEl = document.getElementById('accept-text');
    const acceptEmojiEl = document.getElementById('accept-emoji');
    if (acceptTextEl) {
        acceptTextEl.textContent = occTrans.acceptText || t('accept');
    }
    if (acceptEmojiEl && occTrans.acceptEmoji) {
        acceptEmojiEl.textContent = occTrans.acceptEmoji;
    }

    const denyTextEl = document.getElementById('deny-text');
    const denyEmojiEl = document.getElementById('deny-emoji');
    if (denyTextEl) {
        denyTextEl.textContent = occTrans.denyText || t('deny');
    }
    if (denyEmojiEl && occTrans.denyEmoji) {
        denyEmojiEl.textContent = occTrans.denyEmoji;
    }

    // 6. Success Screen UI Labels (When accepted)
    if (isAccepted) {
        const celebrationBadge = document.getElementById('celebration-badge');
        if (celebrationBadge) {
            const badgeSpan = celebrationBadge.querySelector('span') || celebrationBadge;
            badgeSpan.textContent = occTrans.celebrationBadge || t('celebrationBadge');
        }

        const successHeading = document.getElementById('success-heading');
        if (successHeading) {
            if (recipient) {
                const tmpl = occTrans.successHeading || `Yaaay, {name}! 🎉`;
                successHeading.textContent = tmpl.replace('{name}', recipient);
            } else {
                successHeading.textContent = occTrans.successHeadingGeneral || `You said YES! 💖`;
            }
        }

        const successSubtext = document.getElementById('success-subtext');
        if (successSubtext) {
            successSubtext.textContent = occTrans.successSubtext;
        }

        const musicPlayerLabel = document.getElementById('music-label') || document.getElementById('music-player-status');
        if (musicPlayerLabel) {
            const isPlaying = !document.getElementById('music-toggle-btn')?.classList.contains('is-paused');
            musicPlayerLabel.textContent = isPlaying ? `Music: ${t('musicPlaying')} 🎶` : `Music: ${t('musicPaused')} ⏸️`;
        }
    }

    // 7. Envelope UI & Keepsake Card Framing
    // (Note: letter body and scratchpad are user-authored and handled exclusively by updateKeepsakeContent)
    const envelopeBadge = document.getElementById('envelope-badge-text') || document.querySelector('.envelope-badge');
    if (envelopeBadge) {
        envelopeBadge.textContent = t('envelopeBadge');
    }

    const envelopePrompt = document.getElementById('envelope-prompt') || document.getElementById('envelope-prompt-text');
    if (envelopePrompt) {
        envelopePrompt.textContent = t('envelopePrompt');
    }

    const parchmentTitle = document.getElementById('parchment-title') || document.getElementById('parchment-title-text');
    if (parchmentTitle) {
        parchmentTitle.textContent = t('parchmentTitle');
    }

    const parchmentFlipBtn = document.getElementById('flip-back-btn');
    if (parchmentFlipBtn) {
        parchmentFlipBtn.textContent = t('parchmentFlip');
    }

    const scratchpadLabel = document.querySelector('.scratchpad-label') || document.getElementById('scratchpad-label-text');
    if (scratchpadLabel) {
        scratchpadLabel.textContent = t('scratchpadLabel');
    }

    const editNoteBtn = document.getElementById('edit-scratchpad-btn');
    if (editNoteBtn) {
        editNoteBtn.textContent = t('editNote');
    }

    const doneNoteBtn = document.getElementById('done-scratchpad-btn');
    if (doneNoteBtn) {
        doneNoteBtn.textContent = t('doneEditing');
    }

    const aiParchmentBtn = document.getElementById('ai-parchment-btn');
    if (aiParchmentBtn) {
        aiParchmentBtn.textContent = `✨ ${t('aiLetter')}`;
    }

    const copyParchmentBtn = document.getElementById('copy-scratchpad-btn');
    if (copyParchmentBtn) {
        copyParchmentBtn.textContent = `📋 ${t('copyNote')}`;
    }

    const shareBtnText = document.getElementById('share-btn-text');
    if (shareBtnText) {
        shareBtnText.textContent = t('shareCelebration');
    }

    const replayBtnText = document.getElementById('replay-btn-text');
    if (replayBtnText) {
        replayBtnText.textContent = t('celebrateAgain');
    }

    // Safely update keepsake envelope prefix and recipient framing
    try {
        updateKeepsakeContent();
    } catch (_) {}

    // 8. Personalize & Settings Modal Labels & Placeholders
    const modalTitle = document.getElementById('modal-personalize-title') || document.getElementById('personalize-title');
    if (modalTitle) modalTitle.textContent = t('modalPersonalizeTitle');

    const modalDesc = document.getElementById('modal-personalize-desc');
    if (modalDesc) modalDesc.textContent = t('modalPersonalizeDesc');

    const langLabelText = document.getElementById('language-label-text');
    if (langLabelText) langLabelText.textContent = t('language');

    const currentLangBadge = document.getElementById('current-lang-badge');
    if (currentLangBadge) currentLangBadge.textContent = LANGUAGE_NAMES[lang];

    const langSelect = document.getElementById('language-select');
    if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
    }

    const recipientLabel = document.getElementById('recipient-name-label');
    if (recipientLabel) recipientLabel.textContent = t('recipientLabel');

    const recipientInput = document.getElementById('recipient-name-input');
    if (recipientInput) recipientInput.placeholder = t('recipientPlaceholder');

    const selectOccasionTitle = document.getElementById('modal-select-occasion-title') || document.getElementById('select-occasion-title');
    if (selectOccasionTitle) selectOccasionTitle.textContent = t('selectOccasion');

    // Update occasion cards in settings modal
    SUPPORTED_OCCASIONS.forEach(k => {
        const titleEl = document.getElementById(`occ-title-${k}`);
        const subEl = document.getElementById(`occ-sub-${k}`);
        const occT = TRANSLATIONS[lang]?.occasions?.[k] || TRANSLATIONS.en?.occasions?.[k];
        if (titleEl && occT) titleEl.textContent = occT.label;
        if (subEl && occT) subEl.textContent = occT.sub;
    });

    const celebrationDateLabel = document.getElementById('celebration-date-label');
    if (celebrationDateLabel) celebrationDateLabel.textContent = t('celebrationDateLabel');

    const celebrationDateHint = document.getElementById('celebration-date-hint');
    if (celebrationDateHint) celebrationDateHint.textContent = t('celebrationDateHint');

    const whatAreYouCelebrating = document.getElementById('what-are-you-celebrating');
    if (whatAreYouCelebrating) whatAreYouCelebrating.textContent = t('whatAreYouCelebrating');

    const eventTitleLabel = document.getElementById('event-title-label');
    if (eventTitleLabel) eventTitleLabel.textContent = t('eventTitleLabel');

    const eventTitleInput = document.getElementById('custom-event-title-input');
    if (eventTitleInput) eventTitleInput.placeholder = t('eventTitlePlaceholder');

    const cardHeadingPreview = document.getElementById('card-heading-preview-title');
    if (cardHeadingPreview) cardHeadingPreview.textContent = t('cardHeadingPreview');

    const songTitle = document.getElementById('celebration-song-title');
    if (songTitle) songTitle.textContent = t('celebrationSongTitle');

    const songHint = document.getElementById('celebration-song-hint');
    if (songHint) songHint.textContent = t('celebrationSongHint');

    const uploadBtnText = document.getElementById('upload-btn-text');
    if (uploadBtnText) uploadBtnText.textContent = t('uploadFile');

    const previewBtnText = document.getElementById('preview-btn-text') || document.getElementById('test-song-btn');
    if (previewBtnText) {
        previewBtnText.textContent = t('testSong');
    }

    const quickPresetsLabel = document.getElementById('quick-presets-label');
    if (quickPresetsLabel) quickPresetsLabel.textContent = t('quickPresets');

    const sweetNoteLabel = document.getElementById('sweet-note-label');
    if (sweetNoteLabel) sweetNoteLabel.textContent = t('sweetNoteLabel');

    const customMsgInput = document.getElementById('custom-note-input') || document.getElementById('custom-msg-scratchpad');
    if (customMsgInput) customMsgInput.placeholder = t('sweetNotePlaceholder');

    const scratchpadTextarea = document.getElementById('scratchpad-textarea');
    if (scratchpadTextarea) scratchpadTextarea.placeholder = t('scratchpadPlaceholder');

    const aiLetterBtnText = document.getElementById('ai-letter-btn-text');
    if (aiLetterBtnText) aiLetterBtnText.textContent = t('generateAiLetter');

    const aiLetterHint = document.getElementById('ai-letter-hint');
    if (aiLetterHint) aiLetterHint.textContent = t('aiLetterHint');

    const savePersonalizeText = document.getElementById('save-personalize-text');
    if (savePersonalizeText) savePersonalizeText.textContent = t('saveAndApply');

    const copyCustomLinkText = document.getElementById('copy-custom-link-text');
    if (copyCustomLinkText) copyCustomLinkText.textContent = t('copyLink');

    // 9. Wish Jar Modal
    const wishJarTitle = document.getElementById('wish-jar-title');
    if (wishJarTitle) wishJarTitle.textContent = t('wishJarTitle');

    const wishJarDesc = document.getElementById('wish-jar-desc');
    if (wishJarDesc) wishJarDesc.textContent = t('wishJarDesc');

    const drawAnotherBtn = document.getElementById('draw-another-btn');
    if (drawAnotherBtn) drawAnotherBtn.textContent = t('drawAnother');

    const freshWishesBtn = document.getElementById('fresh-wishes-btn');
    if (freshWishesBtn) freshWishesBtn.textContent = t('freshWishes');

    const copyWishBtn = document.getElementById('copy-wish-btn');
    if (copyWishBtn) copyWishBtn.textContent = t('copyWish');
}

const SUPPORTED_OCCASIONS = [
    'valentine', 'christmas', 'newyear', 'easter', 'birthday', 'anniversary', 'graduation', 'custom'
];

/**
 * Initializes the i18n system with the strict resolution order:
 * 1. Explicit URL language parameter (?lang= or ?language=)
 * 2. Saved user preference (localStorage or appState)
 * 3. Browser/device language (navigator.languages / navigator.language)
 * 4. Default: English ('en')
 */
export function initI18n() {
    let resolvedLang = null;

    // 1. Explicit URL language parameter
    if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang') || params.get('language');
        if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang.toLowerCase())) {
            resolvedLang = urlLang.toLowerCase();
        }
    }

    // 2. Saved user preference in localStorage
    if (!resolvedLang) {
        try {
            if (typeof localStorage !== 'undefined') {
                const stored = localStorage.getItem('celebration_lang');
                if (stored && SUPPORTED_LANGUAGES.includes(stored.toLowerCase())) {
                    resolvedLang = stored.toLowerCase();
                }
            }
        } catch (_) {}
    }

    // Fallback to appState if available
    if (!resolvedLang && appState) {
        const stateLang = appState.getState().language;
        if (stateLang && SUPPORTED_LANGUAGES.includes(stateLang.toLowerCase())) {
            resolvedLang = stateLang.toLowerCase();
        }
    }

    // 3. Browser / Device language
    if (!resolvedLang) {
        resolvedLang = detectBrowserLanguage();
    }

    // 4. Default: English
    const finalLang = resolvedLang || 'en';
    setLanguage(finalLang, true);
}
