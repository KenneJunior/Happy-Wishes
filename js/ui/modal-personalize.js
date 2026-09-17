/**
 * Personalization Modal Component
 * Manages celebration occasion selection, custom event date & title inputs,
 * recipient naming, keepsake note defaults, and shareable URL generation.
 */

import { sound } from '../core/sound.js';
import { showToast } from './toast.js';
import { appState } from '../core/state.js';
import { OCCASIONS } from '../config/occasions.js';
import { OccasionManager, getPersonalizedHeading } from '../core/occasion-service.js';
import { ROMANTIC_VISUAL_THEMES, ROMANTIC_VISUAL_MAP } from '../config/visual-themes.js';
import { previewVisualAsset, updateBearAsset } from './bear.js';
import { generateKeepsakeLetter } from '../services/letter-api.js';
import { getLanguage, setLanguage, getLanguageName, t } from '../i18n/index.js';
import { DeviceManager } from '../core/device.js';

let personalizeModal = null;
let isPersonalizeModalClosing = false;
let isModalSaved = false;
let closePersonalizeBtn = null;
let savePersonalizeBtn = null;
let copyCustomLinkBtn = null;
let languageSelect = null;
let currentLangBadge = null;
let recipientNameInput = null;
let customNoteInput = null;
let celebrationDateInput = null;
let customEventTitleInput = null;
let customEventPreviewBanner = null;
let customEventPreviewText = null;
let easterCalculatedSub = null;
let fixedOccasionInfo = null;
let fixedInfoIcon = null;
let fixedInfoText = null;
let customDateGroup = null;
let customEventTypeSection = null;
let occasionOptionCards = [];
let eventTypeChips = [];

let generateAiLetterBtn = null;
let aiLetterSpark = null;
let aiLetterBtnText = null;
let isGeneratingLetter = false;

let modalCurrentEventType = 'other';
let modalCurrentEventTitle = '';
let modalSelectedOccasion = 'christmas';

// Romantic Theme & GIF Library Controls
let romanticThemeBadge = null;
let romanticThemeCards = [];
let themeCategoryBtns = [];
let activeThemeCategory = 'all';
let themeLivePreviewImg = null;
let themePreviewName = null;
let themePreviewDesc = null;
let customVisualUrlInput = null;
let clearCustomVisualBtn = null;
let resetThemeVisualBtn = null;

let modalSelectedVisualTheme = 'default';
let modalCustomVisualUrl = '';

// Celebration Song Controls
let customSongUrlInput = null;
let customSongFileInput = null;
let songUploadLabel = null;
let uploadBtnText = null;
let clearSongBtn = null;
let previewSongBtn = null;
let previewBtnIcon = null;
let previewBtnText = null;
let songStatusBadge = null;
let songTitleDisplay = null;
let songActiveIndicator = null;
let songPresetChips = [];

let modalCustomSongUrl = '';
let modalCustomSongName = '';
let modalIsUploadedFile = false;

function updateSongDisplayUI() {
    const hasCustom = !!modalCustomSongUrl;
    if (clearSongBtn) clearSongBtn.hidden = !hasCustom;

    if (songStatusBadge) {
        if (modalIsUploadedFile) {
            songStatusBadge.textContent = 'Custom Device Audio 📁';
            songStatusBadge.classList.add('is-custom');
        } else if (hasCustom) {
            songStatusBadge.textContent = 'Custom Audio URL 🌐';
            songStatusBadge.classList.add('is-custom');
        } else {
            songStatusBadge.textContent = 'Default Festive Anthem 🎶';
            songStatusBadge.classList.remove('is-custom');
        }
    }

    if (songTitleDisplay) {
        if (hasCustom) {
            songTitleDisplay.textContent = modalCustomSongName || modalCustomSongUrl;
        } else {
            songTitleDisplay.textContent = 'Default: Simi & Adekunle Gold - Celebration';
        }
    }

    if (uploadBtnText) {
        uploadBtnText.textContent = modalIsUploadedFile ? 'Change File' : 'Upload File';
    }
}

function setPreviewPlayingState(isPlaying) {
    if (previewBtnIcon) previewBtnIcon.textContent = isPlaying ? '⏸️' : '▶️';
    if (previewBtnText) previewBtnText.textContent = isPlaying ? 'Pause Test' : 'Test Song';
    if (previewSongBtn) previewSongBtn.classList.toggle('is-playing', isPlaying);
    if (songActiveIndicator) songActiveIndicator.classList.toggle('is-playing', isPlaying);
}

function updateVisualThemeDisplayUI(themeId, customUrl = '') {
    const hasCustomUrl = !!(customUrl && customUrl.trim());

    if (clearCustomVisualBtn) {
        clearCustomVisualBtn.hidden = !hasCustomUrl;
    }

    // Immediately update the large preview image in 'visual-container' before saving
    previewVisualAsset(hasCustomUrl ? 'custom-url' : themeId, customUrl);

    if (hasCustomUrl) {
        if (romanticThemeBadge) {
            romanticThemeBadge.textContent = 'Custom Visual 🖼️';
        }
        if (themeLivePreviewImg) {
            themeLivePreviewImg.src = customUrl.trim();
        }
        if (themePreviewName) {
            themePreviewName.textContent = 'Custom Visual Image / GIF';
        }
        if (themePreviewDesc) {
            themePreviewDesc.textContent = customUrl.trim();
        }
        romanticThemeCards.forEach(card => {
            card.classList.remove('active');
            card.setAttribute('aria-checked', 'false');
        });
        return;
    }

    const theme = ROMANTIC_VISUAL_MAP[themeId] || ROMANTIC_VISUAL_MAP.default;

    if (romanticThemeBadge) {
        romanticThemeBadge.textContent = `${theme.name} ${theme.icon || ''}`;
    }

    romanticThemeCards.forEach(card => {
        const cardTheme = card.getAttribute('data-theme');
        const isActive = cardTheme === themeId;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    if (themeLivePreviewImg) {
        if (themeId === 'default') {
            const currentOcc = OCCASIONS[modalSelectedOccasion] || OCCASIONS.valentine;
            themeLivePreviewImg.src = currentOcc.bearNormal || './assets/bear-valentine.svg';
        } else {
            themeLivePreviewImg.src = theme.normal || theme.thumbnail;
        }
    }

    if (themePreviewName) {
        themePreviewName.textContent = themeId === 'default' 
            ? 'Default Occasion Mascot'
            : `${theme.name} (${theme.badge || 'Romantic'})`;
    }

    if (themePreviewDesc) {
        themePreviewDesc.textContent = theme.description;
    }
}

function filterThemeCards(category) {
    activeThemeCategory = category;
    themeCategoryBtns.forEach(btn => {
        const isMatch = btn.getAttribute('data-category') === category;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    romanticThemeCards.forEach(card => {
        const cats = (card.getAttribute('data-categories') || 'all')
            .split(',')
            .map(s => s.trim().toLowerCase());
        const matches = category === 'all' || cats.includes(category.toLowerCase());
        card.classList.toggle('is-filtered-out', !matches);
        card.setAttribute('aria-hidden', matches ? 'false' : 'true');
    });
}

function updateCategoryCounts() {
    let all = romanticThemeCards.length;
    let romantic = 0;
    let floral = 0;
    let animated = 0;

    romanticThemeCards.forEach(card => {
        const cats = (card.getAttribute('data-categories') || 'all')
            .split(',')
            .map(s => s.trim().toLowerCase());
        if (cats.includes('romantic')) romantic++;
        if (cats.includes('floral')) floral++;
        if (cats.includes('animated')) animated++;
    });

    const countAllEl = document.getElementById('count-all');
    const countRomEl = document.getElementById('count-romantic');
    const countFloEl = document.getElementById('count-floral');
    const countAniEl = document.getElementById('count-animated');

    if (countAllEl) countAllEl.textContent = all;
    if (countRomEl) countRomEl.textContent = romantic;
    if (countFloEl) countFloEl.textContent = floral;
    if (countAniEl) countAniEl.textContent = animated;
}

function updateCustomCelebrationPreview() {
    if (!customEventPreviewBanner || !customEventPreviewText) return;
    const currentName = recipientNameInput ? recipientNameInput.value.trim().slice(0, 36) : '';
    const heading = getPersonalizedHeading('custom', currentName, modalCurrentEventType, modalCurrentEventTitle);
    customEventPreviewText.textContent = `"${heading}"`;
}

function updateModalOccasionUI(selectedKey) {
    modalSelectedOccasion = selectedKey;
    const occ = OCCASIONS[selectedKey] || OCCASIONS.christmas;

    if (occasionOptionCards && occasionOptionCards.length > 0) {
        occasionOptionCards.forEach(card => {
            const val = card.getAttribute('data-occasion');
            const radio = card.querySelector('input[type="radio"]');
            const isMatch = val === selectedKey;
            if (radio) radio.checked = isMatch;
            card.classList.toggle('active', isMatch);
        });
    }

    if (easterCalculatedSub) {
        const now = new Date();
        const easterDate = OccasionManager.calculateEasterDate(now.getFullYear());
        const targetEaster = (now.getTime() - easterDate.getTime() > 86400000)
            ? OccasionManager.calculateEasterDate(now.getFullYear() + 1)
            : easterDate;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        easterCalculatedSub.textContent = `${monthNames[targetEaster.getMonth()]} ${targetEaster.getDate()}`;
    }

    if (selectedKey === 'custom' || selectedKey === 'birthday' || selectedKey === 'anniversary' || selectedKey === 'graduation') {
        if (fixedOccasionInfo) {
            fixedOccasionInfo.hidden = true;
            fixedOccasionInfo.style.display = 'none';
        }
        if (customDateGroup) {
            customDateGroup.hidden = false;
            customDateGroup.style.display = 'block';
            const dateLabel = customDateGroup.querySelector('label');
            if (dateLabel) {
                if (selectedKey === 'birthday') {
                    dateLabel.textContent = 'Birthday Date (Month & Day)';
                } else if (selectedKey === 'anniversary') {
                    dateLabel.textContent = 'Anniversary Date (Month & Day)';
                } else if (selectedKey === 'graduation') {
                    dateLabel.textContent = 'Graduation Date (Month & Day)';
                } else {
                    dateLabel.textContent = 'Celebration Date (Month & Day)';
                }
            }
        }
        if (customEventTypeSection) {
            if (selectedKey === 'custom') {
                customEventTypeSection.hidden = false;
                customEventTypeSection.style.display = 'block';
                updateCustomCelebrationPreview();
            } else {
                customEventTypeSection.hidden = true;
                customEventTypeSection.style.display = 'none';
            }
        }
    } else {
        if (customDateGroup) {
            customDateGroup.hidden = true;
            customDateGroup.style.display = 'none';
        }
        if (customEventTypeSection) {
            customEventTypeSection.hidden = true;
            customEventTypeSection.style.display = 'none';
        }
        if (fixedOccasionInfo) {
            fixedOccasionInfo.hidden = false;
            fixedOccasionInfo.style.display = 'flex';
            if (fixedInfoIcon) fixedInfoIcon.textContent = occ.emoji || '🎉';
            if (fixedInfoText) {
                const target = OccasionManager.getTargetDate(selectedKey, null);
                const dateStr = target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                fixedInfoText.textContent = `Targeting ${occ.name}: ${dateStr}`;
            }
        }
    }
}

export function openPersonalizeModal(focusLanguage = false) {
    if (!personalizeModal) return;
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    let activeOccasionKey = state.occasion;
    if (state.occasion === 'custom' && state.customEvent === 'anniversary') {
        activeOccasionKey = 'anniversary';
    } else if (state.occasion === 'custom' && state.customEvent === 'graduation') {
        activeOccasionKey = 'graduation';
    }

    modalCurrentEventType = state.customEvent || 'other';
    modalCurrentEventTitle = state.customTitle || '';
    modalSelectedOccasion = activeOccasionKey;

    if (recipientNameInput) recipientNameInput.value = state.recipient;
    if (customNoteInput) customNoteInput.value = state.customMsg || occ.successSubtext;
    if (celebrationDateInput) celebrationDateInput.value = state.customDate;

    if (languageSelect) {
        languageSelect.value = getLanguage();
    }
    if (currentLangBadge) {
        currentLangBadge.textContent = getLanguageName(getLanguage());
    }

    if (eventTypeChips && eventTypeChips.length > 0) {
        eventTypeChips.forEach(chip => {
            const ev = chip.getAttribute('data-event');
            chip.classList.toggle('active', ev === modalCurrentEventType);
        });
    }
    if (customEventTitleInput) {
        customEventTitleInput.value = modalCurrentEventTitle;
    }

    // Populate Celebration Song fields
    modalCustomSongUrl = state.customSongUrl || '';
    modalCustomSongName = state.customSongName || '';
    modalIsUploadedFile = !!(modalCustomSongUrl && modalCustomSongUrl.startsWith('blob:'));

    if (customSongUrlInput) {
        customSongUrlInput.value = modalIsUploadedFile ? '' : modalCustomSongUrl;
    }
    setPreviewPlayingState(false);
    updateSongDisplayUI();

    // Populate Romantic Visual Theme fields
    modalSelectedVisualTheme = state.visualTheme || 'default';
    modalCustomVisualUrl = state.customVisualUrl || '';

    if (customVisualUrlInput) {
        customVisualUrlInput.value = modalCustomVisualUrl;
    }
    updateVisualThemeDisplayUI(modalSelectedVisualTheme, modalCustomVisualUrl);
    filterThemeCards(activeThemeCategory || 'all');
    updateCategoryCounts();

    updateModalOccasionUI(activeOccasionKey);
    updateCustomCelebrationPreview();

    isModalSaved = false;

    personalizeModal.hidden = false;
    personalizeModal.style.display = 'flex';
    personalizeModal.removeAttribute('aria-hidden');
    personalizeModal.classList.remove('is-closing');

    // Trigger browser reflow so entrance animation plays smoothly
    void personalizeModal.offsetHeight;
    personalizeModal.classList.add('is-open');

    if (focusLanguage && languageSelect) {
        languageSelect.focus();
        try {
            languageSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (_) {}
    } else if (recipientNameInput) {
        recipientNameInput.focus();
    }
}

export function closePersonalizeModal() {
    if (!personalizeModal || personalizeModal.hidden || isPersonalizeModalClosing) return;
    sound.stopPreview();
    setPreviewPlayingState(false);

    if (!isModalSaved) {
        updateBearAsset(appState.getState().isAccepted);
    }

    const isReduced = DeviceManager.prefersReducedMotion || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const finalizeClose = () => {
        isPersonalizeModalClosing = false;
        personalizeModal.hidden = true;
        personalizeModal.style.display = 'none';
        personalizeModal.setAttribute('aria-hidden', 'true');
        personalizeModal.classList.remove('is-closing', 'is-open');

        const triggerBtn = document.getElementById('personalize-pill-btn');
        if (triggerBtn) {
            triggerBtn.focus();
        }
    };

    if (isReduced) {
        finalizeClose();
        return;
    }

    isPersonalizeModalClosing = true;
    personalizeModal.classList.remove('is-open');
    personalizeModal.classList.add('is-closing');

    setTimeout(finalizeClose, 210);
}

async function handleGenerateAiLetter() {
    if (isGeneratingLetter) return;
    isGeneratingLetter = true;

    if (generateAiLetterBtn) {
        generateAiLetterBtn.disabled = true;
        generateAiLetterBtn.classList.add('is-loading');
    }
    if (aiLetterBtnText) {
        aiLetterBtnText.textContent = 'Crafting Letter...';
    }

    const currentName = recipientNameInput ? recipientNameInput.value.trim().slice(0, 36) : '';
    const selectedRadio = document.querySelector('input[name="selected-occasion"]:checked');
    const chosenOccasion = (selectedRadio && (OCCASIONS[selectedRadio.value] || selectedRadio.value === 'anniversary')) 
        ? selectedRadio.value 
        : modalSelectedOccasion;

    const effOccasion = chosenOccasion === 'anniversary' ? 'custom' : chosenOccasion;
    const effEventType = chosenOccasion === 'anniversary' ? 'anniversary' : modalCurrentEventType;
    const effEventTitle = chosenOccasion === 'anniversary' ? 'Anniversary' : (customEventTitleInput ? customEventTitleInput.value.trim() : '');
    const userDate = celebrationDateInput ? celebrationDateInput.value.trim() : '';

    // Calculate effective date representation
    let dateStr = userDate;
    if (!dateStr || (effOccasion !== 'custom' && effOccasion !== 'birthday')) {
        try {
            const target = OccasionManager.getTargetDate(effOccasion, userDate);
            if (target && !isNaN(target.getTime())) {
                dateStr = target.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }
        } catch (_) {}
    } else if (userDate) {
        try {
            const parts = userDate.split('-');
            if (parts.length === 3) {
                const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }
        } catch (_) {}
    }

    try {
        const result = await generateKeepsakeLetter({
            recipientName: currentName,
            occasion: effOccasion,
            eventType: effEventType,
            eventTitle: effEventTitle,
            selectedDate: dateStr,
            customNote: customNoteInput ? customNoteInput.value.trim() : '',
            vibe: 'heartfelt'
        });

        if (result && result.letter) {
            if (customNoteInput) {
                customNoteInput.value = result.letter;
                customNoteInput.classList.remove('ai-flash-highlight');
                void customNoteInput.offsetWidth; // trigger reflow
                customNoteInput.classList.add('ai-flash-highlight');
                setTimeout(() => {
                    if (customNoteInput) customNoteInput.classList.remove('ai-flash-highlight');
                }, 1300);
            }
            sound.playCelebrationChime();
            showToast("Gemini AI crafted a personal keepsake letter! 💌✨", "✨");
        }
    } catch (err) {
        console.error('Error generating keepsake letter:', err);
    } finally {
        isGeneratingLetter = false;
        if (generateAiLetterBtn) {
            generateAiLetterBtn.disabled = false;
            generateAiLetterBtn.classList.remove('is-loading');
        }
        if (aiLetterBtnText) {
            aiLetterBtnText.textContent = 'Generate with Gemini AI';
        }
    }
}

export function initPersonalizeModal() {
    personalizeModal = document.getElementById('personalize-modal');
    closePersonalizeBtn = document.getElementById('close-personalize-btn');
    savePersonalizeBtn = document.getElementById('save-personalize-btn');
    copyCustomLinkBtn = document.getElementById('copy-custom-link-btn');
    recipientNameInput = document.getElementById('recipient-name-input');
    customNoteInput = document.getElementById('custom-note-input');
    celebrationDateInput = document.getElementById('celebration-date-input');
    customEventTitleInput = document.getElementById('custom-event-title-input');
    customEventPreviewBanner = document.getElementById('custom-event-preview-banner');
    customEventPreviewText = document.getElementById('custom-event-preview-text');
    easterCalculatedSub = document.getElementById('easter-calculated-sub');
    fixedOccasionInfo = document.getElementById('fixed-occasion-info');
    fixedInfoIcon = document.getElementById('fixed-info-icon');
    fixedInfoText = document.getElementById('fixed-info-text');
    customDateGroup = document.getElementById('custom-date-group');
    customEventTypeSection = document.getElementById('custom-event-type-section');
    occasionOptionCards = Array.from(document.querySelectorAll('.occasion-option-card'));
    eventTypeChips = Array.from(document.querySelectorAll('.event-type-chip'));

    generateAiLetterBtn = document.getElementById('generate-ai-letter-btn');
    aiLetterSpark = document.getElementById('ai-letter-spark');
    aiLetterBtnText = document.getElementById('ai-letter-btn-text');

    // Language & Settings Controls
    languageSelect = document.getElementById('language-select');
    currentLangBadge = document.getElementById('current-lang-badge');

    if (languageSelect) {
        languageSelect.value = getLanguage();
        languageSelect.addEventListener('change', (e) => {
            const chosenLang = e.target.value;
            setLanguage(chosenLang, true);
            if (currentLangBadge) {
                currentLangBadge.textContent = getLanguageName(chosenLang);
            }
            const langName = getLanguageName(chosenLang);
            const template = t('langChangedToast', 'Language set to {lang} 🌐');
            const toastMsg = template.replace('{lang}', langName);
            showToast(toastMsg, "🌐");
            sound.playDodgePop();
        });
    }

    // Query Celebration Song Controls
    customSongUrlInput = document.getElementById('custom-song-url-input');
    customSongFileInput = document.getElementById('custom-song-file-input');
    songUploadLabel = document.getElementById('song-upload-label');
    uploadBtnText = document.getElementById('upload-btn-text');
    clearSongBtn = document.getElementById('clear-song-btn');
    previewSongBtn = document.getElementById('preview-song-btn');
    previewBtnIcon = document.getElementById('preview-btn-icon');
    previewBtnText = document.getElementById('preview-btn-text');
    songStatusBadge = document.getElementById('song-status-badge');
    songTitleDisplay = document.getElementById('song-title-display');
    songActiveIndicator = document.getElementById('song-active-indicator');
    songPresetChips = Array.from(document.querySelectorAll('.song-preset-chip'));

    // Query Romantic Theme Controls
    romanticThemeBadge = document.getElementById('romantic-theme-badge');
    romanticThemeCards = Array.from(document.querySelectorAll('.romantic-theme-card'));
    themeCategoryBtns = Array.from(document.querySelectorAll('.theme-category-btn'));
    themeLivePreviewImg = document.getElementById('theme-live-preview-img');
    themePreviewName = document.getElementById('theme-preview-name');
    themePreviewDesc = document.getElementById('theme-preview-desc');
    customVisualUrlInput = document.getElementById('custom-visual-url-input');
    clearCustomVisualBtn = document.getElementById('clear-custom-visual-btn');
    resetThemeVisualBtn = document.getElementById('reset-theme-visual-btn');

    // Attach listeners to category filter buttons
    if (themeCategoryBtns.length > 0) {
        themeCategoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-category') || 'all';
                filterThemeCards(cat);
                sound.playDodgePop();
            });
        });
    }

    // Attach listeners to romantic theme cards
    if (romanticThemeCards.length > 0) {
        romanticThemeCards.forEach(card => {
            const handleSelect = () => {
                const themeId = card.getAttribute('data-theme') || 'default';
                modalSelectedVisualTheme = themeId;
                modalCustomVisualUrl = '';
                if (customVisualUrlInput) customVisualUrlInput.value = '';
                updateVisualThemeDisplayUI(themeId, '');
                sound.playDodgePop();
            };

            card.addEventListener('click', handleSelect);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect();
                }
            });
        });
    }

    if (customVisualUrlInput) {
        customVisualUrlInput.addEventListener('input', () => {
            const val = customVisualUrlInput.value.trim();
            modalCustomVisualUrl = val;
            if (val) {
                modalSelectedVisualTheme = 'custom-url';
            } else {
                modalSelectedVisualTheme = 'default';
            }
            updateVisualThemeDisplayUI(modalSelectedVisualTheme, modalCustomVisualUrl);
        });
    }

    if (clearCustomVisualBtn) {
        clearCustomVisualBtn.addEventListener('click', () => {
            modalCustomVisualUrl = '';
            modalSelectedVisualTheme = 'default';
            if (customVisualUrlInput) customVisualUrlInput.value = '';
            updateVisualThemeDisplayUI('default', '');
            sound.playDodgePop();
        });
    }

    if (resetThemeVisualBtn) {
        resetThemeVisualBtn.addEventListener('click', () => {
            modalSelectedVisualTheme = 'default';
            modalCustomVisualUrl = '';
            if (customVisualUrlInput) customVisualUrlInput.value = '';
            updateVisualThemeDisplayUI('default', '');
            sound.playDodgePop();
            showToast("Visual reset to default occasion mascot 🐻", "↺");
        });
    }

    if (customSongUrlInput) {
        customSongUrlInput.addEventListener('input', () => {
            const urlVal = customSongUrlInput.value.trim();
            modalCustomSongUrl = urlVal;
            modalCustomSongName = urlVal ? 'Custom Audio URL' : '';
            modalIsUploadedFile = false;
            updateSongDisplayUI();
        });
    }

    if (customSongFileInput) {
        customSongFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                if (modalCustomSongUrl && modalCustomSongUrl.startsWith('blob:')) {
                    try { URL.revokeObjectURL(modalCustomSongUrl); } catch {}
                }
                const objUrl = URL.createObjectURL(file);
                modalCustomSongUrl = objUrl;
                modalCustomSongName = file.name.replace(/\.[^/.]+$/, "");
                modalIsUploadedFile = true;
                if (customSongUrlInput) customSongUrlInput.value = '';
                updateSongDisplayUI();
                showToast(`Loaded audio file: ${file.name} 🎵`, "🎶");
            }
        });
    }

    if (clearSongBtn) {
        clearSongBtn.addEventListener('click', () => {
            sound.stopPreview();
            setPreviewPlayingState(false);
            if (modalCustomSongUrl && modalCustomSongUrl.startsWith('blob:')) {
                try { URL.revokeObjectURL(modalCustomSongUrl); } catch {}
            }
            modalCustomSongUrl = '';
            modalCustomSongName = '';
            modalIsUploadedFile = false;
            if (customSongUrlInput) customSongUrlInput.value = '';
            if (customSongFileInput) customSongFileInput.value = '';
            updateSongDisplayUI();
            showToast("Celebration song reset to default anthem 🎶", "🎵");
        });
    }

    if (previewSongBtn) {
        previewSongBtn.addEventListener('click', () => {
            if (sound.isPlayingPreview()) {
                sound.stopPreview();
                setPreviewPlayingState(false);
            } else {
                const targetUrl = modalCustomSongUrl || (customSongUrlInput ? customSongUrlInput.value.trim() : '') || sound.defaultSongUrl;
                setPreviewPlayingState(true);
                sound.previewSong(
                    targetUrl,
                    () => setPreviewPlayingState(true),
                    () => setPreviewPlayingState(false),
                    (err) => {
                        setPreviewPlayingState(false);
                        showToast("Could not preview audio. Check direct URL or file format.", "⚠️");
                    }
                );
            }
        });
    }

    if (songPresetChips.length > 0) {
        songPresetChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const url = chip.getAttribute('data-url');
                const name = chip.getAttribute('data-name');
                if (url) {
                    modalCustomSongUrl = url;
                    modalCustomSongName = name || 'Preset Celebration Track';
                    modalIsUploadedFile = false;
                    if (customSongUrlInput) customSongUrlInput.value = url;
                    updateSongDisplayUI();
                    sound.playDodgePop();
                    showToast(`Selected: ${name || 'Preset Song'} 🎶`, "🎵");
                }
            });
        });
    }

    if (generateAiLetterBtn) {
        generateAiLetterBtn.addEventListener('click', handleGenerateAiLetter);
    }

    // Attach listeners to occasion cards in modal
    if (occasionOptionCards.length > 0) {
        occasionOptionCards.forEach(card => {
            card.addEventListener('click', () => {
                const occasionVal = card.getAttribute('data-occasion');
                if (occasionVal && (OCCASIONS[occasionVal] || occasionVal === 'anniversary' || occasionVal === 'graduation')) {
                    updateModalOccasionUI(occasionVal);
                    if (modalSelectedVisualTheme === 'default' && !modalCustomVisualUrl) {
                        updateVisualThemeDisplayUI('default', '');
                    }
                }
            });
        });
    }

    // Attach listeners to custom event type chips
    if (eventTypeChips.length > 0) {
        eventTypeChips.forEach(chip => {
            chip.addEventListener('click', () => {
                eventTypeChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const eventVal = chip.getAttribute('data-event') || 'other';
                const defaultTitle = chip.getAttribute('data-title') || '';
                modalCurrentEventType = eventVal;

                if (customEventTitleInput) {
                    if (eventVal === 'other') {
                        if (customEventTitleInput.value === defaultTitle || !customEventTitleInput.value) {
                            customEventTitleInput.value = '';
                            modalCurrentEventTitle = '';
                        }
                        customEventTitleInput.focus();
                    } else {
                        modalCurrentEventTitle = defaultTitle;
                        customEventTitleInput.value = defaultTitle;
                    }
                }
                updateCustomCelebrationPreview();
                sound.playDodgePop();
            });
        });
    }

    if (customEventTitleInput) {
        customEventTitleInput.addEventListener('input', () => {
            modalCurrentEventTitle = customEventTitleInput.value.trim().slice(0, 48);
            updateCustomCelebrationPreview();
        });
    }

    if (recipientNameInput) {
        recipientNameInput.addEventListener('input', () => {
            updateCustomCelebrationPreview();
        });
    }

    if (closePersonalizeBtn) {
        closePersonalizeBtn.addEventListener('click', closePersonalizeModal);
    }

    if (personalizeModal) {
        personalizeModal.addEventListener('click', (e) => {
            if (e.target === personalizeModal) closePersonalizeModal();
        });
    }

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && personalizeModal && !personalizeModal.hidden) {
            closePersonalizeModal();
        }
    });

    if (savePersonalizeBtn) {
        savePersonalizeBtn.addEventListener('click', () => {
            const newName = recipientNameInput ? recipientNameInput.value.trim().slice(0, 36) : '';
            const newNote = customNoteInput ? customNoteInput.value.trim().slice(0, 500) : '';
            const newDate = celebrationDateInput ? celebrationDateInput.value.trim() : '';

            const selectedRadio = document.querySelector('input[name="selected-occasion"]:checked');
            const chosenOccasion = (selectedRadio && (OCCASIONS[selectedRadio.value] || selectedRadio.value === 'anniversary' || selectedRadio.value === 'graduation')) 
                ? selectedRadio.value 
                : modalSelectedOccasion;

            const chosenLang = languageSelect ? languageSelect.value : getLanguage();

            const updatePayload = {
                recipient: newName,
                occasion: chosenOccasion,
                language: chosenLang,
                customMsg: newNote,
                customSongUrl: modalCustomSongUrl || '',
                customSongName: modalCustomSongName || '',
                visualTheme: modalSelectedVisualTheme || 'default',
                customVisualUrl: modalCustomVisualUrl || ''
            };

            if (chosenOccasion === 'anniversary') {
                updatePayload.occasion = 'anniversary';
                updatePayload.customEvent = 'anniversary';
                updatePayload.customTitle = 'Anniversary';
                updatePayload.customDate = newDate;
            } else if (chosenOccasion === 'graduation') {
                updatePayload.occasion = 'graduation';
                updatePayload.customEvent = 'graduation';
                updatePayload.customTitle = 'Graduation';
                updatePayload.customDate = newDate;
            } else if (chosenOccasion === 'custom') {
                updatePayload.customEvent = modalCurrentEventType || 'other';
                updatePayload.customTitle = customEventTitleInput ? customEventTitleInput.value.trim().slice(0, 48) : '';
                updatePayload.customDate = newDate;
            } else if (chosenOccasion === 'birthday') {
                updatePayload.customEvent = '';
                updatePayload.customTitle = '';
                updatePayload.customDate = newDate;
            } else {
                updatePayload.customEvent = '';
                updatePayload.customTitle = '';
                updatePayload.customDate = '';
            }

            sound.setCelebrationSong(modalCustomSongUrl, modalCustomSongName);
            sound.stopPreview();

            isModalSaved = true;
            appState.updateState(updatePayload);
            closePersonalizeModal();
            showToast(newName ? `Card personalized for ${newName}! 💖` : "Card personalized! 💖", "✨");
        });
    }

    if (copyCustomLinkBtn) {
        copyCustomLinkBtn.addEventListener('click', () => {
            const link = appState.getShareUrl();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(link).then(() => {
                    showToast("Personalized link copied! Ready to share 🔗✨", "📋");
                }).catch(() => {
                    showToast("Link created! Ready to share", "🔗");
                });
            } else {
                showToast("Link created! Ready to share", "🔗");
            }
        });
    }
}
