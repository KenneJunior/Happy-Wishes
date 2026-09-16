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

let personalizeModal = null;
let closePersonalizeBtn = null;
let savePersonalizeBtn = null;
let copyCustomLinkBtn = null;
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

let modalCurrentEventType = 'other';
let modalCurrentEventTitle = '';
let modalSelectedOccasion = 'christmas';

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

    if (selectedKey === 'custom' || selectedKey === 'birthday' || selectedKey === 'anniversary') {
        if (fixedOccasionInfo) {
            fixedOccasionInfo.hidden = true;
            fixedOccasionInfo.style.display = 'none';
        }
        if (customDateGroup) {
            customDateGroup.hidden = false;
            customDateGroup.style.display = 'block';
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

export function openPersonalizeModal() {
    if (!personalizeModal) return;
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    modalCurrentEventType = state.customEvent || 'other';
    modalCurrentEventTitle = state.customTitle || '';
    modalSelectedOccasion = state.occasion;

    if (recipientNameInput) recipientNameInput.value = state.recipient;
    if (customNoteInput) customNoteInput.value = state.customMsg || occ.successSubtext;
    if (celebrationDateInput) celebrationDateInput.value = state.customDate;

    if (eventTypeChips && eventTypeChips.length > 0) {
        eventTypeChips.forEach(chip => {
            const ev = chip.getAttribute('data-event');
            chip.classList.toggle('active', ev === modalCurrentEventType);
        });
    }
    if (customEventTitleInput) {
        customEventTitleInput.value = modalCurrentEventTitle;
    }

    updateModalOccasionUI(state.occasion);
    updateCustomCelebrationPreview();

    personalizeModal.hidden = false;
    personalizeModal.style.display = 'flex';
    personalizeModal.removeAttribute('aria-hidden');
}

export function closePersonalizeModal() {
    if (!personalizeModal) return;
    personalizeModal.hidden = true;
    personalizeModal.style.display = 'none';
    personalizeModal.setAttribute('aria-hidden', 'true');
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

    // Attach listeners to occasion cards in modal
    if (occasionOptionCards.length > 0) {
        occasionOptionCards.forEach(card => {
            card.addEventListener('click', () => {
                const occasionVal = card.getAttribute('data-occasion');
                if (occasionVal && OCCASIONS[occasionVal]) {
                    updateModalOccasionUI(occasionVal);
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
            const chosenOccasion = (selectedRadio && OCCASIONS[selectedRadio.value]) 
                ? selectedRadio.value 
                : modalSelectedOccasion;

            const updatePayload = {
                recipient: newName,
                occasion: chosenOccasion,
                customMsg: newNote
            };

            if (chosenOccasion === 'custom') {
                updatePayload.customEvent = modalCurrentEventType || 'other';
                updatePayload.customTitle = customEventTitleInput ? customEventTitleInput.value.trim().slice(0, 48) : '';
                updatePayload.customDate = newDate;
            } else if (chosenOccasion === 'birthday' || chosenOccasion === 'anniversary') {
                updatePayload.customEvent = '';
                updatePayload.customTitle = '';
                updatePayload.customDate = newDate;
            } else {
                updatePayload.customEvent = '';
                updatePayload.customTitle = '';
                updatePayload.customDate = '';
            }

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
