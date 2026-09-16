/**
 * Keepsake 3D Flip-Card & Scratchpad Editor Component
 * Manages the interactive 3D envelope flip animation, touch swipe / mouse glide gestures,
 * scratchpad note editing, and clipboard export.
 */

import { sound } from '../core/sound.js';
import { showToast } from './toast.js';
import { appState } from '../core/state.js';
import { OCCASIONS, CELEBRATION_EVENT_TYPES } from '../config/occasions.js';
import { OccasionManager } from '../core/occasion-service.js';
import { generateKeepsakeLetter } from '../services/letter-api.js';
import { t } from '../i18n/index.js';

let virtualCardWrapper = null;
let virtualCardInner = null;
let virtualCardFront = null;
let flipBackBtn = null;
let waxSealBtn = null;
let envelopeRecipientText = null;
let keepsakeGreeting = null;
let keepsakeBody = null;
let keepsakeSignature = null;
let parchmentContentView = null;
let parchmentScratchpadEditor = null;
let scratchpadTextarea = null;
let editScratchpadBtn = null;
let scratchpadBtnIcon = null;
let scratchpadBtnText = null;
let copyScratchpadBtn = null;
let aiParchmentBtn = null;
let parchmentAiSpark = null;
let parchmentAiText = null;
let isParchmentAiLoading = false;

let isCardFlipped = false;
let isScratchpadEditing = false;
let hasSwipedDuringTouch = false;

export function updateEditNoteVisibility() {
    const state = appState.getState();
    const hasRecipient = Boolean(state.recipient && state.recipient.trim().length > 0);
    if (editScratchpadBtn) {
        if (hasRecipient) {
            editScratchpadBtn.style.display = 'none';
            editScratchpadBtn.setAttribute('hidden', 'true');
            if (isScratchpadEditing) {
                isScratchpadEditing = false;
                if (parchmentContentView) parchmentContentView.hidden = false;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = true;
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '✍️';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Edit Note';
            }
        } else {
            editScratchpadBtn.style.display = 'inline-flex';
            editScratchpadBtn.removeAttribute('hidden');
        }
    }
}

export function updateKeepsakeContent() {
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    if (envelopeRecipientText) {
        const toPrefix = t('envelopeToPrefix', 'To: ');
        envelopeRecipientText.textContent = state.recipient
            ? `${toPrefix}${state.recipient} ❤️`
            : `${t('envelopeToDefault', 'To: Someone Special')} ❤️`;
    }

    const customText = state.customMsg ? state.customMsg.trim() : '';
    const hasCustomGreeting = customText && /^(dearest|dear|to:?|happy\s+\w+)/i.test(customText);
    const hasCustomClosing = customText && /(with\s+all\s+my|love\s*,|yours\s*,|warmest\s+|cheers\s*,|forever\s+and)/i.test(customText);

    if (keepsakeGreeting) {
        if (hasCustomGreeting) {
            keepsakeGreeting.style.display = 'none';
        } else {
            keepsakeGreeting.style.display = 'block';
            const dearPrefix = t('parchmentGreetingPrefix', 'Dearest');
            keepsakeGreeting.textContent = state.recipient
                ? `${dearPrefix} ${state.recipient},`
                : t('parchmentGreetingDefault', 'Dearest One,');
        }
    }

    if (keepsakeSignature) {
        if (hasCustomClosing) {
            keepsakeSignature.style.display = 'none';
        } else {
            keepsakeSignature.style.display = 'block';
            keepsakeSignature.textContent = t('parchmentSignatureDefault', 'With all my love & heart ❤️');
        }
    }

    if (keepsakeBody) {
        if (customText) {
            // User-authored note or AI-generated letter: PRESERVE EXACTLY AS ENTERED!
            keepsakeBody.textContent = customText;
        } else if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            keepsakeBody.textContent = eventCfg.successSubtext || occ.successSubtext;
        } else {
            keepsakeBody.textContent = occ.successSubtext || occ.defaultMessage || "Wishing you infinite joy!";
        }
    }
    if (scratchpadTextarea && keepsakeBody) {
        scratchpadTextarea.value = keepsakeBody.textContent.trim();
    }
    updateEditNoteVisibility();
}

export function flipCardToBack() {
    if (!virtualCardInner) return;
    virtualCardInner.classList.add('is-flipped');
    isCardFlipped = true;
    appState.updateState({ cardFlipped: true }, false);
    sound.playDodgePop();
}

export function flipCardToFront() {
    if (!virtualCardInner) return;
    virtualCardInner.classList.remove('is-flipped');
    isCardFlipped = false;
    appState.updateState({ cardFlipped: false }, false);
    sound.playDodgePop();
}

export function resetCardFlip() {
    if (virtualCardInner) {
        virtualCardInner.classList.remove('is-flipped');
        isCardFlipped = false;
    }
    if (isScratchpadEditing) {
        isScratchpadEditing = false;
        if (parchmentContentView) parchmentContentView.hidden = false;
        if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = true;
        if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '✍️';
        if (scratchpadBtnText) scratchpadBtnText.textContent = 'Edit Note';
    }
}

export function initKeepsake() {
    virtualCardWrapper = document.getElementById('virtual-card-wrapper');
    virtualCardInner = document.getElementById('virtual-card-inner');
    virtualCardFront = document.getElementById('virtual-card-front');
    flipBackBtn = document.getElementById('flip-back-btn');
    waxSealBtn = document.getElementById('wax-seal-btn');
    envelopeRecipientText = document.getElementById('envelope-recipient-text');
    keepsakeGreeting = document.getElementById('keepsake-greeting');
    keepsakeBody = document.getElementById('keepsake-body');
    keepsakeSignature = document.getElementById('keepsake-signature');
    parchmentContentView = document.getElementById('parchment-content-view');
    parchmentScratchpadEditor = document.getElementById('parchment-scratchpad-editor');
    scratchpadTextarea = document.getElementById('scratchpad-textarea');
    editScratchpadBtn = document.getElementById('edit-scratchpad-btn');
    scratchpadBtnIcon = document.getElementById('scratchpad-btn-icon');
    scratchpadBtnText = document.getElementById('scratchpad-btn-text');
    copyScratchpadBtn = document.getElementById('copy-scratchpad-btn');
    aiParchmentBtn = document.getElementById('ai-parchment-btn');
    parchmentAiSpark = document.getElementById('parchment-ai-spark');
    parchmentAiText = document.getElementById('parchment-ai-text');

    updateKeepsakeContent();

    // Subscribe to state updates
    appState.subscribe((newState, oldState, changedKeys) => {
        if (changedKeys.some(k => ['recipient', 'occasion', 'customMsg', 'customEvent'].includes(k))) {
            updateKeepsakeContent();
        }
    });

    if (virtualCardFront) {
        virtualCardFront.addEventListener('click', () => {
            if (hasSwipedDuringTouch) return;
            flipCardToBack();
        });
        virtualCardFront.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCardToBack();
            }
        });
    }

    if (waxSealBtn) {
        waxSealBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCardToBack();
        });
    }

    if (flipBackBtn) {
        flipBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCardToFront();
        });
    }

    // Touch and Gesture Handlers (Swipe Left / Right to Flip)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchActive = false;

    if (virtualCardWrapper) {
        virtualCardWrapper.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            if (e.target.closest('button, textarea, input, a, .wax-seal')) return;
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchStartTime = Date.now();
            isTouchActive = true;
            hasSwipedDuringTouch = false;
        }, { passive: true });

        virtualCardWrapper.addEventListener('touchmove', (e) => {
            if (!isTouchActive || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const diffX = touch.clientX - touchStartX;
            const diffY = touch.clientY - touchStartY;

            if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
                hasSwipedDuringTouch = true;
                if (virtualCardInner) {
                    const currentRot = isCardFlipped ? 180 : 0;
                    const previewTilt = Math.max(-24, Math.min(24, diffX * 0.18));
                    virtualCardInner.style.transition = 'none';
                    virtualCardInner.style.transform = `rotateY(${currentRot + previewTilt}deg)`;
                }
            }
        }, { passive: true });

        const endTouchGlide = (e) => {
            if (!isTouchActive) return;
            isTouchActive = false;

            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }

            const touch = e.changedTouches ? e.changedTouches[0] : e;
            const diffX = touch.clientX - touchStartX;
            const diffY = touch.clientY - touchStartY;
            const elapsed = Date.now() - touchStartTime;

            if (Math.abs(diffX) >= 30 && Math.abs(diffX) > Math.abs(diffY) * 1.1 && elapsed < 850) {
                hasSwipedDuringTouch = true;
                if (!isCardFlipped) {
                    flipCardToBack();
                } else {
                    flipCardToFront();
                }
                if (navigator.vibrate) {
                    try { navigator.vibrate(25); } catch (_) {}
                }
            }

            setTimeout(() => {
                hasSwipedDuringTouch = false;
            }, 120);
        };

        virtualCardWrapper.addEventListener('touchend', endTouchGlide, { passive: true });
        virtualCardWrapper.addEventListener('touchcancel', () => {
            isTouchActive = false;
            hasSwipedDuringTouch = false;
            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }
        }, { passive: true });

        // Mouse Drag / Glide for Desktop
        let mouseStartX = 0;
        let mouseStartY = 0;
        let mouseStartTime = 0;
        let isMouseDown = false;

        virtualCardWrapper.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            if (e.target.closest('button, textarea, input, a, .wax-seal')) return;
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            mouseStartTime = Date.now();
            isMouseDown = true;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;
            if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
                if (virtualCardInner) {
                    const currentRot = isCardFlipped ? 180 : 0;
                    const previewTilt = Math.max(-20, Math.min(20, diffX * 0.15));
                    virtualCardInner.style.transition = 'none';
                    virtualCardInner.style.transform = `rotateY(${currentRot + previewTilt}deg)`;
                }
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }
            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;
            const elapsed = Date.now() - mouseStartTime;

            if (Math.abs(diffX) >= 35 && Math.abs(diffX) > Math.abs(diffY) && elapsed < 850) {
                hasSwipedDuringTouch = true;
                if (!isCardFlipped) {
                    flipCardToBack();
                } else {
                    flipCardToFront();
                }
                setTimeout(() => { hasSwipedDuringTouch = false; }, 120);
            }
        });
    }

    // Scratchpad Editing Toggle
    if (editScratchpadBtn) {
        editScratchpadBtn.addEventListener('click', () => {
            if (!isScratchpadEditing) {
                if (parchmentContentView) parchmentContentView.hidden = true;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = false;
                if (scratchpadTextarea && keepsakeBody) {
                    scratchpadTextarea.value = keepsakeBody.textContent.trim();
                    scratchpadTextarea.focus();
                }
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '💾';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Save Note';
                isScratchpadEditing = true;
            } else {
                const newText = scratchpadTextarea ? scratchpadTextarea.value.trim() : '';
                if (newText) {
                    if (keepsakeBody) keepsakeBody.textContent = newText;
                    appState.updateState({ customMsg: newText });
                }
                if (parchmentContentView) parchmentContentView.hidden = false;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = true;
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '✍️';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Edit Note';
                isScratchpadEditing = false;
                showToast("Personal message saved to card! 💌", "💾");
            }
        });
    }

    // AI Keepsake Letter Generation directly on Parchment Card
    async function handleGenerateParchmentAiLetter() {
        if (isParchmentAiLoading) return;
        isParchmentAiLoading = true;

        if (aiParchmentBtn) {
            aiParchmentBtn.disabled = true;
            aiParchmentBtn.classList.add('is-loading');
        }
        if (parchmentAiText) {
            parchmentAiText.textContent = 'Writing...';
        }

        const state = appState.getState();
        const currentName = state.recipient || '';
        const effOccasion = state.occasion;
        const effEventType = state.customEvent || '';
        const effEventTitle = state.customTitle || '';
        const userDate = state.customDate || '';

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
                customNote: state.customMsg || '',
                vibe: 'heartfelt'
            });

            if (result && result.letter) {
                appState.updateState({ customMsg: result.letter });
                if (scratchpadTextarea) scratchpadTextarea.value = result.letter;
                sound.playCelebrationChime();
                showToast("Gemini AI crafted a heartfelt keepsake letter! 💌✨", "✨");
            }
        } catch (err) {
            console.error('Error generating keepsake parchment letter:', err);
        } finally {
            isParchmentAiLoading = false;
            if (aiParchmentBtn) {
                aiParchmentBtn.disabled = false;
                aiParchmentBtn.classList.remove('is-loading');
            }
            if (parchmentAiText) {
                parchmentAiText.textContent = 'AI Letter';
            }
        }
    }

    if (aiParchmentBtn) {
        aiParchmentBtn.addEventListener('click', handleGenerateParchmentAiLetter);
    }

    // Copy Scratchpad Note to Clipboard
    if (copyScratchpadBtn) {
        copyScratchpadBtn.addEventListener('click', () => {
            const body = keepsakeBody ? keepsakeBody.textContent.trim() : '';
            const hasGreeting = /^(dearest|dear|to:?|happy\s+\w+)/i.test(body);
            const hasClosing = /(with\s+all\s+my|love\s*,|yours\s*,|warmest\s+|cheers\s*,|forever\s+and)/i.test(body);

            const greeting = (!hasGreeting && keepsakeGreeting && keepsakeGreeting.style.display !== 'none')
                ? keepsakeGreeting.textContent.trim() 
                : '';
            const sig = (!hasClosing && keepsakeSignature && keepsakeSignature.style.display !== 'none')
                ? keepsakeSignature.textContent.trim() 
                : '';

            const parts = [greeting, body, sig].filter(Boolean);
            const fullLetter = parts.join('\n\n');

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullLetter).then(() => {
                    showToast("Keepsake letter copied to clipboard! 💌", "📋");
                }).catch(() => {
                    showToast("Note ready! Press Ctrl+C to copy", "✍️");
                });
            } else {
                showToast("Note ready! Press Ctrl+C to copy", "✍️");
            }
        });
    }
}
