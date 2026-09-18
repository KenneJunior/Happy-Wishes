/**
 * Acceptance & Success State Coordinator
 * Handles user acceptance event, reveals celebratory victory content,
 * triggers confetti, plays sound and music, and provides replay resets.
 */

import { sound } from '../core/sound.js';
import { launchCelebrationConfetti, triggerHeartExplosion, cancelHeartExplosion } from './effects/index.js';
import { spawnFloatingParticle, spawnOccasionParticleBurst } from './effects/particles.js';
import { DeviceManager } from '../core/device.js';
import { OCCASIONS, CELEBRATION_EVENT_TYPES, getBearAssetsForState } from '../config/occasions.js';
import { resolveVisualAssetsForState } from '../config/visual-themes.js';
import { getPersonalizedSuccessHeading } from '../core/occasion-service.js';
import { appState } from '../core/state.js';
import { applyTranslations } from '../i18n/index.js';
import { updateVisualAspectRatio } from './bear.js';
import { resetCardFlip, updateKeepsakeContent } from './keepsake.js';
import { resetDodge } from './dodge.js';
import { showToast } from './toast.js';

let acceptBtn = null;
let replayBtn = null;
let shareLinkBtn = null;
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

    // Trigger Premium Explode Celebration Animation originating at Accept button
    triggerHeartExplosion(acceptBtn);

    appState.updateState({ isAccepted: true }, false);
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    sound.playCelebrationChime();

    // 1. Hide question content-header and buttons with unified transition
    if (contentHeader) {
        contentHeader.classList.add('is-hiding');
        setTimeout(() => {
            if (contentHeader) {
                contentHeader.style.display = 'none';
                contentHeader.setAttribute('hidden', 'true');
            }
        }, 180);
    }
    if (buttonGroup) {
        buttonGroup.classList.add('is-hiding');
        setTimeout(() => {
            if (buttonGroup) {
                buttonGroup.style.display = 'none';
                buttonGroup.setAttribute('hidden', 'true');
            }
        }, 180);
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

    // 2. Victory Bear / Romantic Visual
    if (mainGif) {
        const visualAssets = resolveVisualAssetsForState(state, getBearAssetsForState);
        mainGif.src = visualAssets.success || occ.bearSuccess;
        mainGif.alt = `Celebratory ${visualAssets.theme?.name || occ.name} animation`;
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

    // 5.1 Ensure success screen labels match current language
    applyTranslations();

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

    // 8. Launch Confetti (automatically respects reduced motion)
    launchCelebrationConfetti();

    // 9. Adaptive celebratory particle burst
    if (DeviceManager.prefersReducedMotion) {
        // Controlled reduced-motion celebration: static positions, gentle fade (max 5 mobile, 8 desktop)
        spawnOccasionParticleBurst(50, 50, state.occasion);
    } else {
        const burstCount = DeviceManager.isMobile ? 2 : 10;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(spawnFloatingParticle, i * 140);
        }
    }

    // 10. Play celebration music
    sound.playCelebrationMusic(occ.name);
}

export function resetSuccessState(onReplayOccasionApply) {
    sound.stopCelebrationMusic();
    cancelHeartExplosion();

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
        contentHeader.classList.remove('is-hiding');
        contentHeader.style.display = '';
        contentHeader.removeAttribute('hidden');
    }
    if (buttonGroup) {
        buttonGroup.classList.remove('is-hiding');
        buttonGroup.style.display = 'flex';
        buttonGroup.removeAttribute('hidden');
    }
    if (acceptBtn) {
        acceptBtn.style.display = '';
        acceptBtn.style.transform = 'scale(1)';
        acceptBtn.removeAttribute('hidden');
    }
    const denyBtn = document.getElementById('deny-btn') || document.getElementById('no-btn');
    if (denyBtn) {
        denyBtn.style.display = '';
        denyBtn.removeAttribute('hidden');
    }
    if (successContainer) {
        successContainer.hidden = true;
        successContainer.setAttribute('aria-hidden', 'true');
        successContainer.style.display = 'none';
    }

    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;
    const visualAssets = resolveVisualAssetsForState(state, getBearAssetsForState);

    if (mainGif) {
        mainGif.src = visualAssets.normal || occ.bearNormal;
        mainGif.alt = `${visualAssets.theme?.name || occ.name} animation`;
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
    shareLinkBtn = document.getElementById('share-link-btn');
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

    if (shareLinkBtn) {
        shareLinkBtn.addEventListener('click', async () => {
            sound.playSparklePop();
            const shareUrl = appState.getShareUrl();
            const state = appState.getState();
            const title = state.recipient ? `${state.recipient}'s Celebration Card` : "Celebration Card";

            if (navigator.share && typeof navigator.canShare === 'function') {
                try {
                    if (navigator.canShare({ url: shareUrl })) {
                        await navigator.share({
                            title,
                            text: "Open this celebration card! 💌✨",
                            url: shareUrl,
                        });
                        showToast("Celebration link shared! 💖", "🔗");
                        return;
                    }
                } catch (err) {
                    if (err.name === 'AbortError') return;
                }
            }

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(shareUrl);
                    showToast("Celebration link copied! Ready to share 🔗✨", "📋");
                } else {
                    window.prompt("Copy your celebration link:", shareUrl);
                }
            } catch (_) {
                window.prompt("Copy your celebration link:", shareUrl);
            }
        });
    }
}
