/**
 * Personalization Modal Component
 * Manages celebration occasion selection, custom event date & title inputs,
 * recipient naming, keepsake note defaults, audio customization, visual themes,
 * and shareable URL generation.
 *
 * Implements a strict "Draft State vs. Committed State" model:
 * - Opening clones committed state into an editable draft
 * - Editing & previewing changes only the draft and live preview
 * - Cancel / Close discards draft and restores the committed configuration
 * - Save commits draft atomically to appState, localStorage, and main UI
 */

import { sound } from '../core/sound.js';
import { showToast } from './toast.js';
import { appState } from '../core/state.js';
import { OCCASIONS, resolveOccasionDefaultVisual, isOccasionDefaultVisual } from '../config/occasions.js';
import { OccasionManager, getPersonalizedHeading } from '../core/occasion-service.js';
import { ROMANTIC_VISUAL_THEMES, ROMANTIC_VISUAL_MAP } from '../config/visual-themes.js';
import { previewVisualAsset, updateBearAsset, restoreCommittedVisualAsset } from './bear.js';
import { generateKeepsakeLetter } from '../services/letter-api.js';
import { getLanguage, setLanguage, getLanguageName, t, applyTranslations } from '../i18n/index.js';
import { DeviceManager } from '../core/device.js';
import { updateParticlePerformance, handleReducedMotionToggle } from './effects/particles.js';

// DOM Element References
let personalizeModal = null;
let isPersonalizeModalOpen = false;
let isPersonalizeModalClosing = false;
let modalCloseTimer = null;
let isSaving = false;
let isModalSaved = false;
let modalTriggerElement = null;

let closePersonalizeBtn = null;
let cancelPersonalizeBtn = null;
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
let themeEmptyCategoryMsg = null;

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

// Particle Performance Controls
let particlePerfRadios = [];
let particlePerfLight = null;
let particlePerfHeavy = null;
let particlePerfBadge = null;
let particlePerfCardLight = null;
let particlePerfCardHeavy = null;
let toggleReducedMotionBtn = null;
let reducedMotionBtnText = null;

// State Management: Committed vs Draft
let committedState = null;
let draftState = null;

// Async Request Safety & Lifecycle Tracking
let visualLoadToken = 0;
let customUrlDebounceTimer = null;
const sessionObjectUrls = new Set();

/**
 * Updates the small toggle button state and text for reduced motion.
 */
function updateReducedMotionButtonUI() {
    const isReduced = Boolean(
        DeviceManager.prefersReducedMotion ||
        (typeof document !== 'undefined' && document.body && document.body.classList.contains('reduced-motion-mode'))
    );

    if (!toggleReducedMotionBtn) {
        toggleReducedMotionBtn = document.getElementById('toggle-reduced-motion-btn');
    }
    if (!reducedMotionBtnText) {
        reducedMotionBtnText = document.getElementById('reduced-motion-btn-text');
    }

    if (toggleReducedMotionBtn) {
        toggleReducedMotionBtn.setAttribute('aria-pressed', isReduced ? 'true' : 'false');
        toggleReducedMotionBtn.classList.toggle('is-active', isReduced);
        toggleReducedMotionBtn.title = isReduced
            ? 'Reduced Motion is ON (gentle stationary particles). Click to turn OFF.'
            : 'Reduced Motion is OFF. Click to turn ON.';
    }

    if (reducedMotionBtnText) {
        reducedMotionBtnText.textContent = isReduced ? 'Reduce Motion: On' : 'Reduce Motion: Off';
    }
}

/**
 * Updates the Particle Performance UI options and status badge.
 * Respects user selection for saving, while providing clear helper context when Reduced Motion is active.
 * @param {string} mode 'light' | 'heavy'
 */
function updateParticlePerfUI(mode = 'heavy') {
    const isLight = mode === 'light';
    if (particlePerfLight) particlePerfLight.checked = isLight;
    if (particlePerfHeavy) particlePerfHeavy.checked = !isLight;
    if (particlePerfCardLight) particlePerfCardLight.classList.toggle('is-active', isLight);
    if (particlePerfCardHeavy) particlePerfCardHeavy.classList.toggle('is-active', !isLight);

    const isReduced = Boolean(
        DeviceManager.prefersReducedMotion ||
        (typeof document !== 'undefined' && document.body && document.body.classList.contains('reduced-motion-mode'))
    );

    updateReducedMotionButtonUI();

    if (particlePerfBadge) {
        if (isReduced) {
            particlePerfBadge.textContent = 'Reduced Motion Active';
        } else {
            particlePerfBadge.textContent = isLight ? 'Gentle Atmosphere' : 'Rich Atmosphere';
        }
    }

    const motionHint = document.getElementById('particle-motion-hint');
    if (motionHint) {
        if (isReduced) {
            motionHint.innerHTML = '<span class="hint-icon" aria-hidden="true">♿</span> <strong>Reduced Motion is enabled</strong>, so particle movement is limited. Your Light/Heavy preference is saved and will apply whenever motion is re-enabled.';
            motionHint.classList.add('is-reduced-active');
        } else {
            motionHint.innerHTML = '<span class="hint-icon" aria-hidden="true">♿</span> System reduced-motion preferences always take highest priority.';
            motionHint.classList.remove('is-reduced-active');
        }
    }
}

/**
 * Calculates and updates the category count pills dynamically from ROMANTIC_VISUAL_THEMES.
 */
function updateCategoryCounts() {
    const counts = {
        all: ROMANTIC_VISUAL_THEMES.length,
        occasion: 0,
        romantic: 0,
        floral: 0,
        animated: 0
    };

    ROMANTIC_VISUAL_THEMES.forEach(theme => {
        const cats = theme.categories || [];
        if (cats.includes('occasion')) counts.occasion++;
        if (cats.includes('romantic')) counts.romantic++;
        if (cats.includes('floral')) counts.floral++;
        if (cats.includes('animated')) counts.animated++;
    });

    const countAllEl = document.getElementById('count-all');
    const countOccEl = document.getElementById('count-occasion');
    const countRomEl = document.getElementById('count-romantic');
    const countFloEl = document.getElementById('count-floral');
    const countAniEl = document.getElementById('count-animated');

    if (countAllEl) countAllEl.textContent = counts.all;
    if (countOccEl) countOccEl.textContent = counts.occasion;
    if (countRomEl) countRomEl.textContent = counts.romantic;
    if (countFloEl) countFloEl.textContent = counts.floral;
    if (countAniEl) countAniEl.textContent = counts.animated;
}

/**
 * Updates the UI status display for celebration song based on draft state.
 */
function updateSongDisplayUI() {
    if (!draftState) return;
    const songUrl = draftState.customSongUrl || '';
    const hasCustom = !!songUrl;
    const isBlob = songUrl.startsWith('blob:');

    if (clearSongBtn) clearSongBtn.hidden = !hasCustom;

    if (songStatusBadge) {
        if (isBlob) {
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
            songTitleDisplay.textContent = draftState.customSongName || songUrl;
        } else {
            songTitleDisplay.textContent = 'Default: Simi & Adekunle Gold - Celebration';
        }
    }

    if (uploadBtnText) {
        uploadBtnText.textContent = isBlob ? 'Change File' : 'Upload File';
    }
}

/**
 * Sets the visual playing/paused indicator on the preview test button.
 */
function setPreviewPlayingState(isPlaying) {
    if (previewBtnIcon) previewBtnIcon.textContent = isPlaying ? '⏸️' : '▶️';
    if (previewBtnText) previewBtnText.textContent = isPlaying ? 'Pause Test' : 'Test Song';
    if (previewSongBtn) previewSongBtn.classList.toggle('is-playing', isPlaying);
    if (songActiveIndicator) songActiveIndicator.classList.toggle('is-playing', isPlaying);
}

/**
 * Updates the theme preview strip and main card visual based on draft state.
 * @param {string} themeId
 * @param {string} customUrl
 */
function updateVisualThemeDisplayUI(themeId, customUrl = '') {
    const hasCustomUrl = !!(customUrl && customUrl.trim());

    if (clearCustomVisualBtn) {
        clearCustomVisualBtn.hidden = !hasCustomUrl;
    }

    const currentOcc = (draftState && draftState.occasion) || 'valentine';
    const currentCustomEvent = (draftState && draftState.customEvent) || '';

    // If themeId is 'default' or not provided, resolve to the occasion-specific default
    let effectiveThemeId = themeId;
    if (!effectiveThemeId || effectiveThemeId === 'default') {
        effectiveThemeId = resolveOccasionDefaultVisual(currentOcc, currentCustomEvent);
    }

    // Update main card visual preview safely
    previewVisualAsset(hasCustomUrl ? 'custom-url' : effectiveThemeId, customUrl, currentOcc);

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

    const theme = ROMANTIC_VISUAL_MAP[effectiveThemeId] || ROMANTIC_VISUAL_MAP.default;

    if (romanticThemeBadge) {
        romanticThemeBadge.textContent = `${theme.name} ${theme.icon || ''}`;
    }

    const occDefaultThemeId = resolveOccasionDefaultVisual(currentOcc, currentCustomEvent);

    romanticThemeCards.forEach(card => {
        const cardTheme = card.getAttribute('data-theme');
        const isActive = (cardTheme === effectiveThemeId) ||
            (cardTheme === 'default' && effectiveThemeId === occDefaultThemeId);
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    if (themeLivePreviewImg) {
        themeLivePreviewImg.src = theme.normal || theme.thumbnail;
    }

    if (themePreviewName) {
        themePreviewName.textContent = `${theme.name} (${theme.badge || 'Occasion'})`;
    }

    if (themePreviewDesc) {
        themePreviewDesc.textContent = theme.description;
    }
}

/**
 * Filters the visual cards grid by category without mutating selection state.
 * @param {string} category
 */
function filterThemeCards(category) {
    activeThemeCategory = category;
    themeCategoryBtns.forEach(btn => {
        const isMatch = btn.getAttribute('data-category') === category;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    let visibleCount = 0;
    romanticThemeCards.forEach(card => {
        const cats = (card.getAttribute('data-categories') || 'all')
            .split(',')
            .map(s => s.trim().toLowerCase());
        const matches = category === 'all' || cats.includes(category.toLowerCase());
        card.classList.toggle('is-filtered-out', !matches);
        card.setAttribute('aria-hidden', matches ? 'false' : 'true');
        if (matches) visibleCount++;
    });

    if (themeEmptyCategoryMsg) {
        themeEmptyCategoryMsg.style.display = visibleCount === 0 ? 'flex' : 'none';
    }
}

/**
 * Updates the custom celebration heading preview based on current draft inputs.
 */
function updateCustomCelebrationPreview() {
    if (!customEventPreviewBanner || !customEventPreviewText || !draftState) return;
    const currentName = (recipientNameInput ? recipientNameInput.value : draftState.recipient || '').trim().slice(0, 36);
    const heading = getPersonalizedHeading(
        draftState.occasion || 'custom',
        currentName,
        draftState.customEvent || 'other',
        draftState.customTitle || ''
    );
    customEventPreviewText.textContent = `"${heading}"`;
}

/**
 * Updates occasion selection UI in the modal and recalculates dependent displays.
 * @param {string} selectedKey
 */
function updateModalOccasionUI(selectedKey) {
    if (!draftState) return;
    draftState.occasion = selectedKey;

    const occ = OCCASIONS[selectedKey] || OCCASIONS.christmas;

    if (occasionOptionCards && occasionOptionCards.length > 0) {
        occasionOptionCards.forEach(card => {
            const val = card.getAttribute('data-occasion');
            const radio = card.querySelector('input[type="radio"]');
            const isMatch = val === selectedKey;
            if (radio) radio.checked = isMatch;
            card.classList.toggle('active', isMatch);
            card.setAttribute('aria-checked', isMatch ? 'true' : 'false');
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

    const isCustomDateOccasion = ['custom', 'birthday', 'anniversary', 'graduation'].includes(selectedKey);

    if (isCustomDateOccasion) {
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

    // Synchronize visual library and live preview for occasion default
    const hasCustomVisual = !!(draftState.customVisualUrl && draftState.customVisualUrl.trim());
    const isDefaultSelection = !draftState.visualSelectionMode ||
                               draftState.visualSelectionMode === 'occasion-default' ||
                               !draftState.visualTheme ||
                               draftState.visualTheme === 'default' ||
                               isOccasionDefaultVisual(draftState.visualTheme, draftState.occasion, draftState.customEvent);

    if (!hasCustomVisual && isDefaultSelection) {
        const newDefaultVisual = resolveOccasionDefaultVisual(selectedKey, draftState.customEvent);
        draftState.visualTheme = newDefaultVisual;
        draftState.visualSelectionMode = 'occasion-default';
        updateVisualThemeDisplayUI(newDefaultVisual, '');
    } else if (hasCustomVisual) {
        updateVisualThemeDisplayUI('custom-url', draftState.customVisualUrl);
    } else {
        updateVisualThemeDisplayUI(draftState.visualTheme, '');
    }
}

/**
 * Traps keyboard focus within the open modal dialog.
 */
function handleModalFocusTrap(e) {
    if (!isPersonalizeModalOpen || !personalizeModal || e.key !== 'Tab') return;

    const focusableElements = Array.from(
        personalizeModal.querySelectorAll(
            'button:not([disabled]):not([hidden]), [href], input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter(el => {
        return el.offsetParent !== null && !el.closest('[hidden]');
    });

    if (focusableElements.length === 0) {
        e.preventDefault();
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstElement || !personalizeModal.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
        }
    } else {
        if (document.activeElement === lastElement || !personalizeModal.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

/**
 * Opens the Personalize Modal, cloning the committed state into a temporary draft.
 * @param {boolean} [focusLanguage=false] - Whether to immediately focus the language dropdown
 */
export function openPersonalizeModal(focusLanguage = false) {
    if (!personalizeModal) return;

    if (isPersonalizeModalClosing) {
        if (modalCloseTimer) {
            clearTimeout(modalCloseTimer);
            modalCloseTimer = null;
        }
        isPersonalizeModalClosing = false;
        personalizeModal.classList.remove('is-closing');
    }

    modalTriggerElement = document.activeElement;

    // Snapshot committed state & initialize independent draft state
    committedState = { ...appState.getState() };
    draftState = { ...appState.getState() };

    let activeOccasionKey = draftState.occasion || 'valentine';
    if (draftState.occasion === 'custom' && draftState.customEvent === 'anniversary') {
        activeOccasionKey = 'anniversary';
    } else if (draftState.occasion === 'custom' && draftState.customEvent === 'graduation') {
        activeOccasionKey = 'graduation';
    }

    draftState.occasion = activeOccasionKey;

    // Populate Input Fields from Draft
    if (recipientNameInput) recipientNameInput.value = draftState.recipient || '';
    if (customNoteInput) {
        const occ = OCCASIONS[draftState.occasion] || OCCASIONS.valentine;
        customNoteInput.value = draftState.customMsg || occ.successSubtext || '';
    }
    if (celebrationDateInput) celebrationDateInput.value = draftState.customDate || '';

    if (languageSelect) {
        languageSelect.value = draftState.language || getLanguage();
    }
    if (currentLangBadge) {
        currentLangBadge.textContent = getLanguageName(draftState.language || getLanguage());
    }

    if (eventTypeChips && eventTypeChips.length > 0) {
        const currentEvent = draftState.customEvent || 'other';
        eventTypeChips.forEach(chip => {
            const ev = chip.getAttribute('data-event');
            chip.classList.toggle('active', ev === currentEvent);
        });
    }
    if (customEventTitleInput) {
        customEventTitleInput.value = draftState.customTitle || '';
    }

    // Populate Celebration Song Controls
    if (customSongUrlInput) {
        const isBlob = (draftState.customSongUrl || '').startsWith('blob:');
        customSongUrlInput.value = isBlob ? '' : (draftState.customSongUrl || '');
    }
    if (customSongFileInput) {
        customSongFileInput.value = '';
    }
    setPreviewPlayingState(false);
    updateSongDisplayUI();

    // Populate Romantic Visual Theme Controls
    if (customVisualUrlInput) {
        customVisualUrlInput.value = draftState.customVisualUrl || '';
    }
    updateVisualThemeDisplayUI(draftState.visualTheme || 'default', draftState.customVisualUrl || '');
    filterThemeCards(activeThemeCategory || 'all');
    updateCategoryCounts();

    updateModalOccasionUI(activeOccasionKey);
    updateCustomCelebrationPreview();

    // Populate Particle Performance Controls
    const currentPerf = (draftState && draftState.particlePerformance) || (appState.getState && appState.getState().particlePerformance) || 'heavy';
    if (draftState) {
        draftState.particlePerformance = currentPerf;
    }
    updateParticlePerfUI(currentPerf);

    isModalSaved = false;
    isPersonalizeModalOpen = true;

    personalizeModal.hidden = false;
    personalizeModal.style.display = 'flex';
    personalizeModal.removeAttribute('aria-hidden');
    personalizeModal.classList.remove('is-closing');

    // Force browser reflow for entrance animation
    void personalizeModal.offsetHeight;
    personalizeModal.classList.add('is-open');

    // Add focus trap listener
    window.addEventListener('keydown', handleModalFocusTrap);

    if (focusLanguage && languageSelect) {
        languageSelect.focus();
        try {
            languageSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (_) {}
    } else if (recipientNameInput) {
        recipientNameInput.focus();
    }
}

/**
 * Cancels personalization, discarding all uncommitted draft changes and restoring committed state.
 */
export function cancelPersonalizeModal() {
    if (!isPersonalizeModalOpen || isPersonalizeModalClosing) return;

    // Stop and reset audio preview
    sound.stopPreview();
    setPreviewPlayingState(false);

    // Cancel any pending visual URL debounce or load
    clearTimeout(customUrlDebounceTimer);
    visualLoadToken++;

    // Revoke any temporary uncommitted object URLs
    sessionObjectUrls.forEach(url => {
        try { URL.revokeObjectURL(url); } catch (_) {}
    });
    sessionObjectUrls.clear();

    // Revert celebration song in sound service to committed state
    if (committedState) {
        sound.setCelebrationSong(committedState.customSongUrl || '', committedState.customSongName || '');
    }

    // Revert language if previewed
    if (committedState && committedState.language && committedState.language !== getLanguage()) {
        setLanguage(committedState.language, false);
    }

    // Restore committed visual mascot on main card
    restoreCommittedVisualAsset();

    // Revert particle performance if previewed
    if (committedState && committedState.particlePerformance) {
        updateParticlePerformance(committedState.particlePerformance);
    }

    // Discard draft
    draftState = null;
    isModalSaved = false;

    closePersonalizeModal();
}

/**
 * Closes the modal with smooth transitions and cleans up focus.
 */
export function closePersonalizeModal() {
    if (!personalizeModal || personalizeModal.hidden || isPersonalizeModalClosing) return;

    window.removeEventListener('keydown', handleModalFocusTrap);

    sound.stopPreview();
    setPreviewPlayingState(false);

    const isReduced = DeviceManager.prefersReducedMotion || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const finalizeClose = () => {
        isPersonalizeModalClosing = false;
        isPersonalizeModalOpen = false;
        personalizeModal.hidden = true;
        personalizeModal.style.display = 'none';
        personalizeModal.setAttribute('aria-hidden', 'true');
        personalizeModal.classList.remove('is-closing', 'is-open');

        if (modalTriggerElement && typeof modalTriggerElement.focus === 'function') {
            modalTriggerElement.focus();
        } else {
            const fallbackTrigger = document.getElementById('personalize-pill-btn') || document.getElementById('occasion-pill-btn');
            if (fallbackTrigger) fallbackTrigger.focus();
        }
    };

    if (isReduced) {
        finalizeClose();
        return;
    }

    if (modalCloseTimer) {
        clearTimeout(modalCloseTimer);
        modalCloseTimer = null;
    }

    isPersonalizeModalClosing = true;
    personalizeModal.classList.remove('is-open');
    personalizeModal.classList.add('is-closing');

    modalCloseTimer = setTimeout(finalizeClose, 210);
}

/**
 * Validates and preloads custom visual URL asynchronously with stale request token protection.
 * @param {string} rawUrl
 */
function handleCustomVisualUrlInput(rawUrl) {
    clearTimeout(customUrlDebounceTimer);

    const cleanUrl = (rawUrl || '').trim();

    if (!cleanUrl) {
        visualLoadToken++;
        if (draftState) {
            draftState.customVisualUrl = '';
            if (draftState.visualTheme === 'custom-url') {
                draftState.visualTheme = 'default';
            }
            updateVisualThemeDisplayUI(draftState.visualTheme, '');
        }
        return;
    }

    // Allow https, http, data:image, or relative paths
    const isValidScheme = /^https?:\/\//i.test(cleanUrl) ||
        cleanUrl.startsWith('data:image/') ||
        cleanUrl.startsWith('./') ||
        cleanUrl.startsWith('/');

    if (!isValidScheme) {
        if (cleanUrl.length > 5) {
            clearTimeout(customUrlDebounceTimer);
            customUrlDebounceTimer = setTimeout(() => {
                showToast("Please enter a valid image URL starting with https:// or http://", "⚠️");
            }, 600);
        }
        return;
    }

    customUrlDebounceTimer = setTimeout(() => {
        const thisToken = ++visualLoadToken;
        const testImg = new Image();

        testImg.onload = () => {
            if (thisToken !== visualLoadToken || !draftState) return;
            draftState.customVisualUrl = cleanUrl;
            draftState.visualTheme = 'custom-url';
            updateVisualThemeDisplayUI('custom-url', cleanUrl);
        };

        testImg.onerror = () => {
            if (thisToken !== visualLoadToken) return;
            // Non-destructive: do NOT destroy the previously working visual!
            showToast("Could not load image from this URL. Please verify the link.", "⚠️");
        };

        testImg.src = cleanUrl;
    }, 320);
}

/**
 * Handles Gemini AI letter generation within the draft state.
 */
async function handleGenerateAiLetter() {
    if (isGeneratingLetter || !draftState) return;
    isGeneratingLetter = true;

    if (generateAiLetterBtn) {
        generateAiLetterBtn.disabled = true;
        generateAiLetterBtn.classList.add('is-loading');
    }
    if (aiLetterBtnText) {
        aiLetterBtnText.textContent = 'Crafting Letter...';
    }

    const currentName = (recipientNameInput ? recipientNameInput.value : draftState.recipient || '').trim().slice(0, 36);
    const chosenOccasion = draftState.occasion || 'valentine';

    const effOccasion = chosenOccasion === 'anniversary' ? 'custom' : chosenOccasion;
    const effEventType = chosenOccasion === 'anniversary' ? 'anniversary' : (draftState.customEvent || 'other');
    const effEventTitle = chosenOccasion === 'anniversary' ? 'Anniversary' : (customEventTitleInput ? customEventTitleInput.value.trim() : (draftState.customTitle || ''));
    const userDate = celebrationDateInput ? celebrationDateInput.value.trim() : (draftState.customDate || '');

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
            customNote: customNoteInput ? customNoteInput.value.trim() : (draftState.customMsg || ''),
            vibe: 'heartfelt'
        });

        if (result && result.letter) {
            draftState.customMsg = result.letter;
            if (customNoteInput) {
                customNoteInput.value = result.letter;
                customNoteInput.classList.remove('ai-flash-highlight');
                void customNoteInput.offsetWidth;
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
        showToast("Unable to generate AI letter. Please try again.", "⚠️");
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

/**
 * Robust clipboard copy with automatic multi-strategy fallback.
 * Works across modern browsers, iframes, mobile devices, and restricted contexts.
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if copied successfully
 */
export async function copyTextToClipboard(text) {
    if (!text) return false;

    // Strategy 1: Modern asynchronous Clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('[Clipboard] navigator.clipboard.writeText failed, trying execCommand fallback:', err);
        }
    }

    // Strategy 2: Synchronous execCommand fallback using a temporary hidden textarea
    if (typeof document !== 'undefined') {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.top = '0';
            textarea.style.left = '0';
            textarea.style.width = '2em';
            textarea.style.height = '2em';
            textarea.style.padding = '0';
            textarea.style.border = 'none';
            textarea.style.outline = 'none';
            textarea.style.boxShadow = 'none';
            textarea.style.background = 'transparent';
            textarea.style.opacity = '0';
            textarea.style.pointerEvents = 'none';
            textarea.style.zIndex = '-9999';

            document.body.appendChild(textarea);
            textarea.focus({ preventScroll: true });
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);

            if (successful) {
                return true;
            }
        } catch (execErr) {
            console.warn('[Clipboard] execCommand fallback failed:', execErr);
        }
    }

    return false;
}

/**
 * Commits the current draft configuration atomically to state, storage, and audio.
 * @param {Object} [options]
 * @param {boolean} [options.closeModal=true]
 * @param {boolean} [options.showToastNotice=true]
 */
export function commitDraftChanges(options = {}) {
    const { closeModal = true, showToastNotice = true } = (typeof options === 'object' && options !== null) ? options : {};
    if (isSaving || !draftState) return;
    isSaving = true;

    if (savePersonalizeBtn) {
        savePersonalizeBtn.disabled = true;
    }

    try {
        // Collect latest values from form inputs
        const newName = recipientNameInput ? recipientNameInput.value.trim().slice(0, 36) : (draftState.recipient || '');
        const newNote = customNoteInput ? customNoteInput.value.trim().slice(0, 1000) : (draftState.customMsg || '');
        const newDate = celebrationDateInput ? celebrationDateInput.value.trim() : (draftState.customDate || '');
        const chosenOccasion = draftState.occasion || 'valentine';
        const chosenLang = languageSelect ? languageSelect.value : (draftState.language || getLanguage());

        const chosenVisual = draftState.visualTheme || resolveOccasionDefaultVisual(chosenOccasion, draftState.customEvent);
        const chosenPerf = (draftState && (draftState.particlePerformance === 'light' || draftState.particlePerformance === 'heavy'))
            ? draftState.particlePerformance
            : 'heavy';

        const updatePayload = {
            recipient: newName,
            occasion: chosenOccasion,
            language: chosenLang,
            customMsg: newNote,
            customSongUrl: draftState.customSongUrl || '',
            customSongName: draftState.customSongName || '',
            visualTheme: chosenVisual,
            visualSelectionMode: draftState.visualSelectionMode || 'occasion-default',
            customVisualUrl: draftState.customVisualUrl || '',
            particlePerformance: chosenPerf
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
            updatePayload.customEvent = draftState.customEvent || 'other';
            updatePayload.customTitle = customEventTitleInput ? customEventTitleInput.value.trim().slice(0, 48) : (draftState.customTitle || '');
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

        // Apply persistent language if changed
        if (chosenLang !== getLanguage()) {
            setLanguage(chosenLang, true);
        }

        // Apply celebration audio
        sound.setCelebrationSong(draftState.customSongUrl || '', draftState.customSongName || '');
        sound.stopPreview();

        // Clear session tracking of object URLs that are now committed
        sessionObjectUrls.clear();

        isModalSaved = true;

        // Atomically commit into central application state
        appState.updateState(updatePayload);

        // Instantly synchronize the particle engine with the new performance mode
        updateParticlePerformance(chosenPerf);

        // Keep local committedState snapshot synchronized
        committedState = { ...appState.getState() };

        if (closeModal) {
            closePersonalizeModal();
        }

        if (showToastNotice) {
            showToast(newName ? `Card personalized for ${newName}! 💖` : "Card personalized! 💖", "✨");
        }
    } finally {
        isSaving = false;
        if (savePersonalizeBtn) {
            savePersonalizeBtn.disabled = false;
        }
    }
}

/**
 * Initializes the Personalization Modal event listeners and DOM references.
 */
export function initPersonalizeModal() {
    personalizeModal = document.getElementById('personalize-modal');
    closePersonalizeBtn = document.getElementById('close-personalize-btn');
    cancelPersonalizeBtn = document.getElementById('cancel-personalize-btn');
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

    // Language Controls
    languageSelect = document.getElementById('language-select');
    currentLangBadge = document.getElementById('current-lang-badge');

    if (languageSelect) {
        languageSelect.value = getLanguage();
        languageSelect.addEventListener('change', (e) => {
            const chosenLang = e.target.value;
            if (draftState) {
                draftState.language = chosenLang;
            }
            if (currentLangBadge) {
                currentLangBadge.textContent = getLanguageName(chosenLang);
            }
            applyTranslations(chosenLang);
            if (draftState) {
                updateModalOccasionUI(draftState.occasion);
            }
            sound.playDodgePop();
        });
    }

    // Celebration Song Controls
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

    // Romantic Theme Controls
    romanticThemeBadge = document.getElementById('romantic-theme-badge');
    romanticThemeCards = Array.from(document.querySelectorAll('.romantic-theme-card'));
    themeCategoryBtns = Array.from(document.querySelectorAll('.theme-category-btn'));
    themeLivePreviewImg = document.getElementById('theme-live-preview-img');
    themePreviewName = document.getElementById('theme-preview-name');
    themePreviewDesc = document.getElementById('theme-preview-desc');
    customVisualUrlInput = document.getElementById('custom-visual-url-input');
    clearCustomVisualBtn = document.getElementById('clear-custom-visual-btn');
    resetThemeVisualBtn = document.getElementById('reset-theme-visual-btn');
    themeEmptyCategoryMsg = document.getElementById('theme-empty-category-msg');

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
                visualLoadToken++;
                const curOcc = draftState ? draftState.occasion : 'valentine';
                const curEvent = draftState ? draftState.customEvent : '';
                const isDefault = isOccasionDefaultVisual(themeId, curOcc, curEvent);
                if (draftState) {
                    draftState.visualTheme = themeId;
                    draftState.visualSelectionMode = isDefault ? 'occasion-default' : 'explicit';
                    draftState.customVisualUrl = '';
                }
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

    // Custom Visual URL Input
    if (customVisualUrlInput) {
        customVisualUrlInput.addEventListener('input', () => {
            handleCustomVisualUrlInput(customVisualUrlInput.value);
        });
        customVisualUrlInput.addEventListener('change', () => {
            const val = customVisualUrlInput.value.trim();
            if (val && !/^https?:\/\//i.test(val) && !val.startsWith('data:image/') && !val.startsWith('./') && !val.startsWith('/')) {
                showToast("Please enter a valid image URL starting with https:// or http://", "⚠️");
            }
        });
    }

    if (clearCustomVisualBtn) {
        clearCustomVisualBtn.addEventListener('click', () => {
            visualLoadToken++;
            clearTimeout(customUrlDebounceTimer);
            const curOcc = draftState ? draftState.occasion : 'valentine';
            const curEvent = draftState ? draftState.customEvent : '';
            const defaultVisual = resolveOccasionDefaultVisual(curOcc, curEvent);
            if (draftState) {
                draftState.customVisualUrl = '';
                draftState.visualTheme = defaultVisual;
                draftState.visualSelectionMode = 'occasion-default';
            }
            if (customVisualUrlInput) customVisualUrlInput.value = '';
            updateVisualThemeDisplayUI(defaultVisual, '');
            sound.playDodgePop();
        });
    }

    if (resetThemeVisualBtn) {
        resetThemeVisualBtn.addEventListener('click', () => {
            visualLoadToken++;
            clearTimeout(customUrlDebounceTimer);
            const curOcc = draftState ? draftState.occasion : 'valentine';
            const curEvent = draftState ? draftState.customEvent : '';
            const defaultVisual = resolveOccasionDefaultVisual(curOcc, curEvent);
            if (draftState) {
                draftState.visualTheme = defaultVisual;
                draftState.visualSelectionMode = 'occasion-default';
                draftState.customVisualUrl = '';
            }
            if (customVisualUrlInput) customVisualUrlInput.value = '';
            updateVisualThemeDisplayUI(defaultVisual, '');
            sound.playDodgePop();
            showToast("Visual reset to default occasion mascot 🐻", "↺");
        });
    }

    // Audio Input Handlers
    if (customSongUrlInput) {
        customSongUrlInput.addEventListener('input', () => {
            const urlVal = customSongUrlInput.value.trim();
            if (draftState) {
                draftState.customSongUrl = urlVal;
                draftState.customSongName = urlVal ? 'Custom Audio URL' : '';
            }
            if (sound.isPlayingPreview()) {
                sound.stopPreview();
                setPreviewPlayingState(false);
            }
            updateSongDisplayUI();
        });
    }

    if (customSongFileInput) {
        customSongFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const objUrl = URL.createObjectURL(file);
                sessionObjectUrls.add(objUrl);
                if (draftState) {
                    draftState.customSongUrl = objUrl;
                    draftState.customSongName = file.name.replace(/\.[^/.]+$/, "");
                }
                if (customSongUrlInput) customSongUrlInput.value = '';
                updateSongDisplayUI();
                showToast(`Loaded audio file: ${file.name} 🎵 (device local only)`, "🎶");
            }
        });
    }

    if (clearSongBtn) {
        clearSongBtn.addEventListener('click', () => {
            sound.stopPreview();
            setPreviewPlayingState(false);
            if (draftState) {
                draftState.customSongUrl = '';
                draftState.customSongName = '';
            }
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
                const targetUrl = (draftState && draftState.customSongUrl) ||
                    (customSongUrlInput ? customSongUrlInput.value.trim() : '') ||
                    sound.defaultSongUrl;

                setPreviewPlayingState(true);
                sound.previewSong(
                    targetUrl,
                    () => setPreviewPlayingState(true),
                    () => setPreviewPlayingState(false),
                    () => {
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
                if (url && draftState) {
                    draftState.customSongUrl = url;
                    draftState.customSongName = name || 'Preset Celebration Track';
                    if (customSongUrlInput) customSongUrlInput.value = url;
                    if (customSongFileInput) customSongFileInput.value = '';
                    updateSongDisplayUI();
                    sound.playDodgePop();
                    showToast(`Selected: ${name || 'Preset Song'} 🎶`, "🎵");

                    // If a preview was already actively playing, seamlessly switch to the new preset
                    if (sound.isPlayingPreview()) {
                        sound.previewSong(
                            url,
                            () => setPreviewPlayingState(true),
                            () => setPreviewPlayingState(false),
                            () => {
                                setPreviewPlayingState(false);
                                showToast("Could not preview audio. Check direct URL or file format.", "⚠️");
                            }
                        );
                    }
                }
            });
        });
    }

    if (generateAiLetterBtn) {
        generateAiLetterBtn.addEventListener('click', handleGenerateAiLetter);
    }

    // Occasion Selection Cards
    if (occasionOptionCards.length > 0) {
        occasionOptionCards.forEach(card => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                radio.addEventListener('change', () => {
                    if (radio.checked) {
                        const occasionVal = card.getAttribute('data-occasion');
                        if (occasionVal && (OCCASIONS[occasionVal] || occasionVal === 'anniversary' || occasionVal === 'graduation')) {
                            updateModalOccasionUI(occasionVal);
                            sound.playDodgePop();
                        }
                    }
                });
            }
            card.addEventListener('click', () => {
                const occasionVal = card.getAttribute('data-occasion');
                if (occasionVal && (OCCASIONS[occasionVal] || occasionVal === 'anniversary' || occasionVal === 'graduation')) {
                    updateModalOccasionUI(occasionVal);
                    sound.playDodgePop();
                }
            });
        });
    }

    // Event Type Chips
    if (eventTypeChips.length > 0) {
        eventTypeChips.forEach(chip => {
            chip.addEventListener('click', () => {
                eventTypeChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const eventVal = chip.getAttribute('data-event') || 'other';
                const defaultTitle = chip.getAttribute('data-title') || '';

                if (draftState) {
                    draftState.customEvent = eventVal;
                    if (draftState.occasion === 'custom' && !draftState.customVisualUrl) {
                        const isDef = !draftState.visualSelectionMode ||
                            draftState.visualSelectionMode === 'occasion-default' ||
                            isOccasionDefaultVisual(draftState.visualTheme, 'custom', eventVal);
                        if (isDef) {
                            const newDef = resolveOccasionDefaultVisual('custom', eventVal);
                            draftState.visualTheme = newDef;
                            draftState.visualSelectionMode = 'occasion-default';
                            updateVisualThemeDisplayUI(newDef, '');
                        }
                    }
                }

                if (customEventTitleInput) {
                    if (eventVal === 'other') {
                        if (customEventTitleInput.value === defaultTitle || !customEventTitleInput.value) {
                            customEventTitleInput.value = '';
                            if (draftState) draftState.customTitle = '';
                        }
                        customEventTitleInput.focus();
                    } else {
                        if (draftState) draftState.customTitle = defaultTitle;
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
            if (draftState) {
                draftState.customTitle = customEventTitleInput.value.trim().slice(0, 48);
            }
            updateCustomCelebrationPreview();
        });
    }

    if (recipientNameInput) {
        recipientNameInput.addEventListener('input', () => {
            if (draftState) {
                draftState.recipient = recipientNameInput.value.trim().slice(0, 36);
            }
            updateCustomCelebrationPreview();
        });
    }

    if (celebrationDateInput) {
        celebrationDateInput.addEventListener('change', () => {
            if (draftState) {
                draftState.customDate = celebrationDateInput.value.trim();
            }
        });
    }

    if (customNoteInput) {
        customNoteInput.addEventListener('input', () => {
            if (draftState) {
                draftState.customMsg = customNoteInput.value;
            }
        });
    }

    // Particle Performance Mode Controls
    particlePerfLight = document.getElementById('particle-perf-light');
    particlePerfHeavy = document.getElementById('particle-perf-heavy');
    particlePerfBadge = document.getElementById('particle-perf-badge');
    particlePerfCardLight = document.getElementById('particle-perf-card-light');
    particlePerfCardHeavy = document.getElementById('particle-perf-card-heavy');
    particlePerfRadios = [particlePerfLight, particlePerfHeavy].filter(Boolean);

    if (particlePerfRadios.length > 0) {
        particlePerfRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (!radio.checked) return;
                const chosenPerf = radio.value;
                if (draftState) {
                    draftState.particlePerformance = chosenPerf;
                }
                updateParticlePerfUI(chosenPerf);
                updateParticlePerformance(chosenPerf);
                sound.playDodgePop();
            });
        });
    }

    // Toggle Reduced Motion on/off button
    toggleReducedMotionBtn = document.getElementById('toggle-reduced-motion-btn');
    reducedMotionBtnText = document.getElementById('reduced-motion-btn-text');
    if (toggleReducedMotionBtn) {
        toggleReducedMotionBtn.addEventListener('click', () => {
            const isCurrentlyReduced = Boolean(
                DeviceManager.prefersReducedMotion ||
                (typeof document !== 'undefined' && document.body && document.body.classList.contains('reduced-motion-mode'))
            );
            const nextReduced = !isCurrentlyReduced;
            if (typeof DeviceManager.setReducedMotion === 'function') {
                DeviceManager.setReducedMotion(nextReduced);
            } else {
                DeviceManager.prefersReducedMotion = nextReduced;
                if (document.body) {
                    document.body.classList.toggle('reduced-motion-mode', nextReduced);
                }
            }
            handleReducedMotionToggle(nextReduced);
            const currentPerf = (draftState && draftState.particlePerformance) || (appState.getState && appState.getState().particlePerformance) || 'heavy';
            updateParticlePerfUI(currentPerf);
            sound.playDodgePop();
            showToast(nextReduced ? 'Reduced motion enabled' : 'Reduced motion disabled', '♿');
        });
    }

    // Dynamically react if the user updates system settings while the modal is open or app is running
    if (typeof window !== 'undefined' && window.matchMedia) {
        try {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            const handleSystemMotionUpdate = (e) => {
                const matches = Boolean(e && e.matches);
                DeviceManager.prefersReducedMotion = matches;
                if (typeof document !== 'undefined' && document.body) {
                    document.body.classList.toggle('reduced-motion-mode', matches);
                }
                handleReducedMotionToggle(matches);
                updateReducedMotionButtonUI();
                const activePerf = (draftState && draftState.particlePerformance) || (appState.getState && appState.getState().particlePerformance) || 'heavy';
                updateParticlePerfUI(activePerf);
            };

            if (typeof motionQuery.addEventListener === 'function') {
                motionQuery.addEventListener('change', handleSystemMotionUpdate);
            } else if (typeof motionQuery.addListener === 'function') {
                motionQuery.addListener(handleSystemMotionUpdate);
            }
        } catch (_) {}
    }

    // Reflect current state of window.matchMedia('(prefers-reduced-motion: reduce)') on load immediately
    updateReducedMotionButtonUI();
    const initialPerf = (appState.getState && appState.getState().particlePerformance) || 'heavy';
    updateParticlePerfUI(initialPerf);

    // Modal Close Controls
    if (closePersonalizeBtn) {
        closePersonalizeBtn.addEventListener('click', cancelPersonalizeModal);
    }

    if (cancelPersonalizeBtn) {
        cancelPersonalizeBtn.addEventListener('click', cancelPersonalizeModal);
    }

    if (personalizeModal) {
        personalizeModal.addEventListener('click', (e) => {
            if (e.target === personalizeModal) cancelPersonalizeModal();
        });
    }

    // Keyboard Escape Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPersonalizeModalOpen) {
            cancelPersonalizeModal();
        }
    });

    // Save & Apply Button
    if (savePersonalizeBtn) {
        savePersonalizeBtn.addEventListener('click', commitDraftChanges);
    }

    // Copy Link Button (Commits current draft and copies shareable URL)
    if (copyCustomLinkBtn) {
        copyCustomLinkBtn.addEventListener('click', async () => {
            // Commit all current form inputs atomically into appState without prematurely closing modal
            commitDraftChanges({ closeModal: false, showToastNotice: false });
            const shareUrl = appState.getShareUrl();

            // Populate fallback link container if present
            const shareInput = document.getElementById('personalize-share-link-input');
            const shareContainer = document.getElementById('personalize-share-link-container');
            if (shareInput) {
                shareInput.value = shareUrl;
            }

            const copyBtnText = document.getElementById('copy-custom-link-text');
            const originalText = copyBtnText ? copyBtnText.textContent : 'Copy Link 🔗';

            // Multi-strategy clipboard copy
            const copySuccess = await copyTextToClipboard(shareUrl);

            if (copySuccess) {
                if (copyBtnText) copyBtnText.textContent = 'Copied! 📋✨';
                copyCustomLinkBtn.classList.add('is-copied');
                showToast("Personalized link copied! Ready to share 🔗✨", "📋");
            } else {
                if (copyBtnText) copyBtnText.textContent = 'Link Ready! 🔗';
                if (shareContainer) {
                    shareContainer.hidden = false;
                    shareContainer.classList.add('is-active');
                    if (shareInput) {
                        shareInput.focus();
                        shareInput.select();
                    }
                }
                showToast("Personalized link generated! Ready to share 🔗", "✨");
            }

            setTimeout(() => {
                if (copyBtnText) copyBtnText.textContent = originalText;
                copyCustomLinkBtn.classList.remove('is-copied');
            }, 2500);
        });
    }

    // Inline fallback share link "Copy" button listener
    const inlineShareCopyBtn = document.getElementById('personalize-share-link-copy-btn');
    if (inlineShareCopyBtn) {
        inlineShareCopyBtn.addEventListener('click', async () => {
            const shareInput = document.getElementById('personalize-share-link-input');
            const textToCopy = shareInput ? shareInput.value : appState.getShareUrl();
            const copied = await copyTextToClipboard(textToCopy);
            if (copied) {
                inlineShareCopyBtn.textContent = 'Copied! ✨';
                showToast("Link copied to clipboard! 📋✨", "📋");
                setTimeout(() => {
                    inlineShareCopyBtn.textContent = 'Copy';
                }, 2000);
            }
        });
    }
}
