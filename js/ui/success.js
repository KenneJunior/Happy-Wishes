/**
 * Acceptance & Success State Coordinator
 * Handles user acceptance event, reveals celebratory victory content,
 * triggers confetti, plays sound and music, and provides replay resets.
 */

import { sound } from '../core/sound.js';
import { launchCelebrationConfetti } from './effects/confetti.js';
import { spawnFloatingParticle } from './effects/particles.js';
import { DeviceManager } from '../core/device.js';
import { OCCASIONS, CELEBRATION_EVENT_TYPES } from '../config/occasions.js';
import { getPersonalizedSuccessHeading } from '../core/occasion-service.js';
import { appState } from '../core/state.js';
import { updateVisualAspectRatio } from './bear.js';
import { resetCardFlip, updateKeepsakeContent } from './keepsake.js';
import { resetDodge } from './dodge.js';

let acceptBtn = null;
let replayBtn = null;
let contentHeader = null;
let buttonGroup = null;
let occasionPillBtn = null;
let personalizePillBtn = null;
let wishJarPillBtn = null;
let mainGif = null;
let cardBadge = null;
let badgeText = null;
let successContainer = null;
let valentineCard = null;

export function triggerAcceptSuccess() {
    const state = appState.getState();
    if (state.isAccepted) return;

    appState.updateState({ isAccepted: true }, false);
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    sound.playCelebrationChime();

    // 1. Hide question content-header and buttons
    if (contentHeader) {
        contentHeader.style.display = 'none';
        contentHeader.setAttribute('hidden', 'true');
    }
    if (buttonGroup) {
        buttonGroup.style.display = 'none';
        buttonGroup.setAttribute('hidden', 'true');
    }
    if (occasionPillBtn) {
        occasionPillBtn.classList.add('d-none');
    }
    if (personalizePillBtn) {
        personalizePillBtn.classList.add('d-none');
    }
    if (wishJarPillBtn) {
        wishJarPillBtn.classList.add('d-none');
    }

    const denyBtn = document.getElementById('deny-btn') || document.getElementById('no-btn');
    if (denyBtn) {
        denyBtn.style.display = 'none';
    }

    // 2. Victory Bear
    if (mainGif) {
        mainGif.src = occ.bearSuccess;
        mainGif.alt = `Celebratory ${occ.name} animation`;
        mainGif.style.transform = 'scale(1.08)';
        if (mainGif.complete) {
            updateVisualAspectRatio();
        }
    }

    // 3. Card Badge
    if (cardBadge && badgeText) {
        badgeText.textContent = occ.celebrationBadge;
    }

    // 4. Update Success Container copy
    const successHeading = document.getElementById('success-heading');
    const successSubtext = document.getElementById('success-subtext');
    const celebrationBadge = document.getElementById('celebration-badge');

    const personalizedSuccessHeading = getPersonalizedSuccessHeading(
        state.occasion,
        state.recipient,
        state.customEvent,
        state.customTitle
    );

    if (successHeading) successHeading.textContent = personalizedSuccessHeading;
    if (successSubtext) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            successSubtext.textContent = eventCfg.successSubtext;
        } else {
            successSubtext.textContent = occ.successSubtext;
        }
    }
    if (celebrationBadge) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            celebrationBadge.innerHTML = `<span>${eventCfg.badge || '✨ CELEBRATION DAY!'}</span>`;
        } else {
            celebrationBadge.innerHTML = `<span>${occ.celebrationBadge}</span>`;
        }
    }

    // 5. Keepsake Card
    updateKeepsakeContent();

    // 6. Reveal celebratory container
    if (successContainer) {
        successContainer.hidden = false;
        successContainer.removeAttribute('aria-hidden');
        successContainer.style.display = 'flex';
    }

    // 7. Zoom-out card layout
    if (valentineCard) {
        valentineCard.classList.add('card-accepted');
        if (valentineCard.vanillaTilt) {
            valentineCard.vanillaTilt.destroy();
        }
        valentineCard.scrollTop = 0;
    }
    document.body.classList.add('state-accepted');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    // 8. Launch Confetti
    launchCelebrationConfetti();

    // 9. Extra particle burst
    const burstCount = DeviceManager.isMobile ? 2 : 10;
    for (let i = 0; i < burstCount; i++) {
        setTimeout(spawnFloatingParticle, i * 140);
    }

    // 10. Play celebration music
    sound.playCelebrationMusic(occ.name);
}

export function resetSuccessState(onReplayOccasionApply) {
    sound.stopCelebrationMusic();

    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicLabel = document.getElementById('music-label');
    if (musicToggleBtn) {
        musicToggleBtn.classList.remove('is-paused');
    }
    if (musicLabel) {
        musicLabel.textContent = 'Music: Playing 🎶';
    }

    if (occasionPillBtn) {
        occasionPillBtn.classList.remove('d-none');
    }
    if (personalizePillBtn) {
        personalizePillBtn.classList.remove('d-none');
    }
    if (wishJarPillBtn) {
        wishJarPillBtn.classList.remove('d-none');
    }

    resetCardFlip();
    resetDodge();

    if (contentHeader) {
        contentHeader.style.display = '';
        contentHeader.removeAttribute('hidden');
    }
    if (buttonGroup) {
        buttonGroup.style.display = 'flex';
        buttonGroup.removeAttribute('hidden');
    }
    if (successContainer) {
        successContainer.hidden = true;
        successContainer.setAttribute('aria-hidden', 'true');
        successContainer.style.display = 'none';
    }

    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    if (mainGif) {
        mainGif.src = occ.bearNormal;
        mainGif.style.transform = '';
    }

    if (valentineCard) {
        valentineCard.classList.remove('card-accepted');
    }
    document.body.classList.remove('state-accepted');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    appState.resetInteractionState();

    if (typeof onReplayOccasionApply === 'function') {
        onReplayOccasionApply();
    }

    if (typeof window.AOS !== 'undefined') {
        window.AOS.refresh();
    }
}

export function initSuccess({ onReplayOccasionApply } = {}) {
    acceptBtn = document.getElementById('accept-btn') || document.getElementById('yes-btn');
    replayBtn = document.getElementById('replay-btn');
    contentHeader = document.getElementById('content-header');
    buttonGroup = document.getElementById('button-group');
    occasionPillBtn = document.getElementById('occasion-pill-btn');
    personalizePillBtn = document.getElementById('personalize-pill-btn');
    wishJarPillBtn = document.getElementById('wish-jar-pill-btn');
    mainGif = document.getElementById('main-gif');
    cardBadge = document.getElementById('celebration-badge') || document.getElementById('card-badge');
    badgeText = document.getElementById('badge-text');
    successContainer = document.getElementById('success-container');
    valentineCard = document.getElementById('valentine-card');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', triggerAcceptSuccess);
    }

    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            resetSuccessState(onReplayOccasionApply);
        });
    }
}
