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
import { DeviceManager } from '../core/device.js';

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

// Natural Keepsake Typing Engine State
let currentNoteFullText = '';
let isTypingActive = false;
let typingTimeoutId = null;
let hasTypedCurrentNote = false;
let typingCursorEl = null;
let typingSkipHintEl = null;

function cancelTyping() {
    if (typingTimeoutId) {
        clearTimeout(typingTimeoutId);
        typingTimeoutId = null;
    }
    isTypingActive = false;
}

export function skipTyping() {
    if (!isTypingActive) return;
    cancelTyping();

    if (keepsakeBody) {
        keepsakeBody.textContent = currentNoteFullText;
    }
    if (typingCursorEl && typingCursorEl.parentNode) {
        typingCursorEl.remove();
    }
    if (typingSkipHintEl && typingSkipHintEl.parentNode) {
        typingSkipHintEl.remove();
    }
    if (keepsakeSignature) {
        keepsakeSignature.classList.remove('is-hidden');
        keepsakeSignature.classList.add('is-revealed');
    }
    hasTypedCurrentNote = true;
}

export function startNaturalKeepsakeTyping(targetText, forceRestart = false) {
    if (!keepsakeBody) return;
    const textToType = (typeof targetText === 'string' && targetText.length > 0)
        ? targetText
        : (currentNoteFullText || keepsakeBody.textContent || '').trim();

    if (!textToType) return;
    currentNoteFullText = textToType;

    const isReduced = DeviceManager.prefersReducedMotion || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (isReduced) {
        cancelTyping();
        keepsakeBody.textContent = textToType;
        if (typingCursorEl && typingCursorEl.parentNode) typingCursorEl.remove();
        if (typingSkipHintEl && typingSkipHintEl.parentNode) typingSkipHintEl.remove();
        if (keepsakeSignature) {
            keepsakeSignature.classList.remove('is-hidden');
            keepsakeSignature.classList.add('is-revealed');
        }
        hasTypedCurrentNote = true;
        return;
    }

    if (!forceRestart && hasTypedCurrentNote && keepsakeBody.textContent.trim() === textToType.trim()) {
        if (keepsakeSignature) {
            keepsakeSignature.classList.remove('is-hidden');
            keepsakeSignature.classList.add('is-revealed');
        }
        return;
    }

    cancelTyping();
    isTypingActive = true;
    hasTypedCurrentNote = false;

    // Reset body content and insert cursor
    keepsakeBody.textContent = '';
    if (!typingCursorEl) {
        typingCursorEl = document.createElement('span');
        typingCursorEl.className = 'keepsake-typing-cursor';
        typingCursorEl.setAttribute('aria-hidden', 'true');
    }
    keepsakeBody.appendChild(typingCursorEl);

    // Conceal signature during active typing
    if (keepsakeSignature) {
        keepsakeSignature.classList.remove('is-revealed');
        keepsakeSignature.classList.add('is-hidden');
    }

    // Attach skip hint indicator promptly
    if (!typingSkipHintEl) {
        typingSkipHintEl = document.createElement('span');
        typingSkipHintEl.className = 'typing-skip-hint';
        typingSkipHintEl.setAttribute('role', 'button');
        typingSkipHintEl.setAttribute('tabindex', '0');
        typingSkipHintEl.setAttribute('title', 'Click or tap anywhere on note to reveal full message');
        typingSkipHintEl.innerHTML = '<span aria-hidden="true">⚡</span> Skip typing';
        typingSkipHintEl.addEventListener('click', (e) => {
            e.stopPropagation();
            skipTyping();
        });
        typingSkipHintEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                skipTyping();
            }
        });
    }

    if (parchmentContentView) {
        if (typingSkipHintEl.parentNode) {
            typingSkipHintEl.remove();
        }
        typingSkipHintEl.classList.remove('is-visible');
        parchmentContentView.appendChild(typingSkipHintEl);

        setTimeout(() => {
            if (isTypingActive && typingSkipHintEl) {
                typingSkipHintEl.classList.add('is-visible');
            }
        }, 600);
    }

    let charIndex = 0;
    let burstRemaining = 4 + Math.floor(Math.random() * 4); // cluster of 4-7 characters for human rhythm

    function typeNextChar() {
        if (!isTypingActive) return;

        if (charIndex < textToType.length) {
            const char = textToType[charIndex];
            const textNode = document.createTextNode(char);
            keepsakeBody.insertBefore(textNode, typingCursorEl);
            charIndex++;

            // 1. Natural Base Cadence with Organic Human Micro-Fluctuation
            let delay = 24 + Math.floor(Math.random() * 12); // 24ms - 36ms base speed

            // 2. Character & Letter Rhythm (Capitals, Symbols, Digraphs)
            const isCapital = /[A-Z]/.test(char);
            const isSymbol = /[0-9@#$%&*]/.test(char);
            if (isCapital) {
                delay += 24 + Math.floor(Math.random() * 16); // Capital letter coordination
            } else if (isSymbol) {
                delay += 30 + Math.floor(Math.random() * 20); // Symbol micro-pause
            }

            // 3. Human Typing Rhythm Clusters (Micro-bursts followed by subtle breath pauses)
            burstRemaining--;
            if (burstRemaining <= 0) {
                delay += 22 + Math.floor(Math.random() * 26);
                burstRemaining = 4 + Math.floor(Math.random() * 4);
            }

            // 4. Structural Delays & Punctuation
            const nextChar = textToType[charIndex];
            const prevChar = charIndex >= 2 ? textToType[charIndex - 2] : '';

            if (char === '\n') {
                // Paragraph break vs single line break
                if (nextChar === '\n' || prevChar === '\n') {
                    delay = 450 + Math.floor(Math.random() * 80); // Paragraph transition breath
                } else {
                    delay = 280 + Math.floor(Math.random() * 60); // Line break pause
                }
            } else if (char === '.' || char === '!' || char === '?' || char === '…') {
                // Thoughtful sentence pause when closing a statement
                if (!nextChar || nextChar === ' ' || nextChar === '\n' || nextChar === '"' || nextChar === "'") {
                    delay = 380 + Math.floor(Math.random() * 100);
                } else {
                    delay = 180 + Math.floor(Math.random() * 40);
                }
            } else if (char === ',' || char === ';' || char === ':' || char === '—' || char === '-') {
                // Natural clause breathing pause
                delay = 180 + Math.floor(Math.random() * 40);
            } else if (char === '"' || char === "'" || char === '(' || char === ')') {
                // Micro-hesitation around quotes/parentheses
                delay = 90 + Math.floor(Math.random() * 30);
            } else if (char === ' ') {
                // Natural inter-word spacing breath
                delay = 48 + Math.floor(Math.random() * 18);
            }

            typingTimeoutId = setTimeout(typeNextChar, delay);
        } else {
            finishTyping();
        }
    }

    function finishTyping() {
        isTypingActive = false;
        hasTypedCurrentNote = true;
        typingTimeoutId = null;

        if (typingSkipHintEl && typingSkipHintEl.parentNode) {
            typingSkipHintEl.classList.remove('is-visible');
            setTimeout(() => {
                if (typingSkipHintEl && typingSkipHintEl.parentNode) {
                    typingSkipHintEl.remove();
                }
            }, 200);
        }

        // Allow cursor to linger and blink gently with a soft fade before clean removal
        if (typingCursorEl) {
            typingCursorEl.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                if (typingCursorEl) {
                    typingCursorEl.style.opacity = '0';
                    setTimeout(() => {
                        if (typingCursorEl && typingCursorEl.parentNode) {
                            typingCursorEl.remove();
                        }
                    }, 400);
                }
            }, 450);
        }

        // Smoothly reveal signature with physics curve
        if (keepsakeSignature) {
            keepsakeSignature.classList.remove('is-hidden');
            keepsakeSignature.classList.add('is-revealed');
        }
    }

    // Brief settling pause after card flip completes before typing begins
    typingTimeoutId = setTimeout(typeNextChar, 260);
}

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

    let noteText = '';
    if (customText) {
        // User-authored note or AI-generated letter: PRESERVE EXACTLY AS ENTERED!
        noteText = customText;
    } else if (state.occasion === 'custom') {
        const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
        noteText = eventCfg.successSubtext || occ.successSubtext;
    } else {
        noteText = occ.successSubtext || occ.defaultMessage || "Wishing you infinite joy!";
    }

    const textChanged = (currentNoteFullText !== noteText);
    currentNoteFullText = noteText;

    if (textChanged) {
        hasTypedCurrentNote = false;
    }

    if (scratchpadTextarea) {
        scratchpadTextarea.value = noteText.trim();
    }

    if (isCardFlipped && !isScratchpadEditing && textChanged) {
        startNaturalKeepsakeTyping(noteText, true);
    } else if (!isTypingActive && keepsakeBody) {
        keepsakeBody.textContent = noteText;
        if (keepsakeSignature) {
            keepsakeSignature.classList.remove('is-hidden');
            keepsakeSignature.classList.add('is-revealed');
        }
    }

    updateEditNoteVisibility();
}

export function flipCardToBack() {
    if (!virtualCardInner) return;
    virtualCardInner.classList.add('is-flipped');
    isCardFlipped = true;
    appState.updateState({ cardFlipped: true }, false);
    sound.playDodgePop();

    if (!isScratchpadEditing && !hasTypedCurrentNote) {
        startNaturalKeepsakeTyping(currentNoteFullText);
    }
}

export function flipCardToFront() {
    if (!virtualCardInner) return;
    virtualCardInner.classList.remove('is-flipped');
    isCardFlipped = false;
    appState.updateState({ cardFlipped: false }, false);
    sound.playDodgePop();

    // Skip active typing so text is instantly complete if flipped back later
    skipTyping();
}

export function resetCardFlip() {
    cancelTyping();
    hasTypedCurrentNote = false;
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
                skipTyping();
                if (parchmentContentView) parchmentContentView.hidden = true;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = false;
                if (scratchpadTextarea && keepsakeBody) {
                    scratchpadTextarea.value = (currentNoteFullText || keepsakeBody.textContent).trim();
                    scratchpadTextarea.focus();
                }
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '💾';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Save Note';
                isScratchpadEditing = true;
            } else {
                const newText = scratchpadTextarea ? scratchpadTextarea.value.trim() : '';
                if (newText) {
                    currentNoteFullText = newText;
                    hasTypedCurrentNote = true;
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
                currentNoteFullText = result.letter;
                hasTypedCurrentNote = false;
                appState.updateState({ customMsg: result.letter });
                if (scratchpadTextarea) scratchpadTextarea.value = result.letter;
                sound.playCelebrationChime();
                showToast("Gemini AI crafted a heartfelt keepsake letter! 💌✨", "✨");
                if (isCardFlipped && !isScratchpadEditing) {
                    startNaturalKeepsakeTyping(result.letter, true);
                }
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

    // Tap/click on parchment view or press Space/Enter/Escape to skip typing
    if (parchmentContentView) {
        parchmentContentView.addEventListener('click', (e) => {
            if (e.target.closest('button, .parchment-tool-btn, .scratchpad-tool-btn')) return;
            if (isTypingActive) {
                skipTyping();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (isTypingActive && isCardFlipped && !isScratchpadEditing) {
            if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
                skipTyping();
            }
        }
    });

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
