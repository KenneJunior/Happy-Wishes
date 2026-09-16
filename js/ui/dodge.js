/**
 * Deny Button Dodge & Accept Button Dynamic Scaling
 * Manages the playful dodge physics of the Deny button across viewport bounds
 * and the gradual scale growth of the Accept button.
 */

import { sound } from '../core/sound.js';
import { OCCASIONS } from '../config/occasions.js';
import { appState } from '../core/state.js';

let denyBtn = null;
let acceptBtn = null;
let buttonGroup = null;
let denyTextSpan = null;
let denyEmojiSpan = null;
let onDodgeBurstCallback = null;

export function resetDodge() {
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    if (acceptBtn) {
        acceptBtn.style.transform = 'scale(1)';
        acceptBtn.style.boxShadow = '';
    }

    if (denyBtn) {
        if (buttonGroup && denyBtn.parentElement !== buttonGroup) {
            buttonGroup.appendChild(denyBtn);
        }
        denyBtn.classList.remove('dodging');
        denyBtn.style.position = '';
        denyBtn.style.left = '';
        denyBtn.style.top = '';
        denyBtn.style.margin = '';
        denyBtn.style.display = '';

        if (denyTextSpan) denyTextSpan.textContent = occ.denyText || 'Deny';
        if (denyEmojiSpan) denyEmojiSpan.textContent = occ.denyEmoji || '🥺';
    }

    appState.updateState({
        denyCount: 0,
        acceptScale: 1.0
    }, false);
}

export function dodgeDenyButton(event) {
    const state = appState.getState();
    if (state.isAccepted) return;

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    sound.playDodgePop();
    const newDodgeCount = state.denyCount + 1;

    // Attach to body to escape clipping from card borders or backdrop filters
    if (denyBtn) {
        if (denyBtn.parentElement !== document.body) {
            const initialRect = denyBtn.getBoundingClientRect();
            document.body.appendChild(denyBtn);
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.left = `${initialRect.left}px`;
            denyBtn.style.top = `${initialRect.top}px`;
            denyBtn.style.margin = '0';
        } else {
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.margin = '0';
        }

        const btnWidth = denyBtn.offsetWidth || 110;
        const btnHeight = denyBtn.offsetHeight || 44;

        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight;

        const isMobileScreen = viewportWidth <= 640 || ('ontouchstart' in window);
        const safeMargin = isMobileScreen ? 16 : 36;

        const minX = safeMargin;
        const maxX = Math.max(safeMargin, viewportWidth - btnWidth - safeMargin);
        const minY = safeMargin;
        const maxY = Math.max(safeMargin, viewportHeight - btnHeight - safeMargin);

        let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        // On mobile touch, avoid landing right underneath user's fingertip
        if (event && (event.touches || event.changedTouches)) {
            const touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0]);
            if (touch) {
                const touchX = touch.clientX;
                const touchY = touch.clientY;
                if (Math.hypot(randomX - touchX, randomY - touchY) < 85) {
                    randomY = touchY < viewportHeight / 2 
                        ? Math.min(maxY, Math.max(minY, Math.floor(viewportHeight * 0.65)))
                        : Math.min(maxY, Math.max(minY, Math.floor(viewportHeight * 0.2)));
                }
            }
        }

        denyBtn.style.left = `${randomX}px`;
        denyBtn.style.top = `${randomY}px`;

        // Update playful phrase
        const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;
        const phrases = occ.denyPhrases || ["Deny", "Are you sure? 👀", "Think again!"];
        const phrase = phrases[newDodgeCount % phrases.length];
        if (denyTextSpan) denyTextSpan.textContent = phrase;
    }

    // Dynamic scale growth for Accept button
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const isMobileScreen = viewportWidth <= 640 || ('ontouchstart' in window);
    const maxScale = isMobileScreen ? 1.35 : 1.65;
    const scaleStep = isMobileScreen ? 0.03 : 0.04;
    const currentScale = Math.min(1.0 + (newDodgeCount * scaleStep), maxScale);
    const newAcceptScale = parseFloat(currentScale.toFixed(3));

    if (acceptBtn) {
        acceptBtn.style.transform = `scale(${newAcceptScale})`;
        if (newDodgeCount >= 2) {
            const glowIntensity = Math.min(0.35 + (newDodgeCount * 0.025), 0.7);
            acceptBtn.style.boxShadow = `0 14px 28px -4px rgba(255, 46, 99, ${glowIntensity}), 0 0 18px 3px rgba(255, 117, 140, 0.45)`;
        }
    }

    appState.updateState({
        denyCount: newDodgeCount,
        acceptScale: newAcceptScale
    }, false);

    if (typeof onDodgeBurstCallback === 'function') {
        onDodgeBurstCallback();
    }
}

export function initDodge({ onDodgeBurst } = {}) {
    denyBtn = document.getElementById('deny-btn') || document.getElementById('no-btn');
    acceptBtn = document.getElementById('accept-btn') || document.getElementById('yes-btn');
    buttonGroup = document.getElementById('button-group');
    denyTextSpan = document.getElementById('deny-text');
    denyEmojiSpan = document.getElementById('deny-emoji');
    onDodgeBurstCallback = onDodgeBurst;

    if (denyBtn) {
        denyBtn.addEventListener('mouseenter', dodgeDenyButton);
        denyBtn.addEventListener('mouseover', dodgeDenyButton);
        denyBtn.addEventListener('pointerdown', dodgeDenyButton);
        denyBtn.addEventListener('touchstart', dodgeDenyButton, { passive: false });
        denyBtn.addEventListener('click', dodgeDenyButton);
    }
}
