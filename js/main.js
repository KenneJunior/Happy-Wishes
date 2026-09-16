/**
 * Main Application Bootstrap & Composition Root
 * Initializes centralized state, services, UI components, modals, and effects.
 */

import { appState } from './core/state.js';
import { DeviceManager } from './core/device.js';
import { sound } from './core/sound.js';
import { OCCASIONS, CELEBRATION_EVENT_TYPES } from './config/occasions.js';
import { WISH_DATA } from './config/wishes.js';
import { getPersonalizedHeading, getPersonalizedSubMessage } from './core/occasion-service.js';

// UI Modules
import { initTheme, applyOccasionTheme } from './ui/theme.js';
import { initToast } from './ui/toast.js';
import { initCountdown, updateCountdownDisplay } from './ui/countdown.js';
import { initBear, updateVisualAspectRatio, updateBearAsset, updateBearEmotion } from './ui/bear.js';
import { initDodge, resetDodge } from './ui/dodge.js';
import { initKeepsake, updateKeepsakeContent } from './ui/keepsake.js';
import { initPersonalizeModal, openPersonalizeModal } from './ui/modal-personalize.js';
import { initWishJarModal, updateWishJarPill } from './ui/modal-wishjar.js';
import { initSuccess } from './ui/success.js';

// Effects
import { initConfetti } from './ui/effects/confetti.js';
import { initParticles, spawnFloatingParticle } from './ui/effects/particles.js';
import { initPreloader } from './ui/effects/preloader.js';

function applyOccasionUI() {
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    // 1. Theme class on body
    applyOccasionTheme(state.occasion);

    // 2. Heading and Sub-message
    const questionText = document.getElementById('question-text');
    const subMessage = document.getElementById('sub-message');

    const personalizedHeading = getPersonalizedHeading(
        state.occasion,
        state.recipient,
        state.customEvent,
        state.customTitle
    );
    const personalizedSubMessage = getPersonalizedSubMessage(
        state.occasion,
        state.recipient,
        state.customEvent,
        state.customTitle
    );

    if (questionText) questionText.textContent = personalizedHeading;
    if (subMessage) subMessage.textContent = personalizedSubMessage;

    // 3. Document Title and Open Graph tag
    if (state.recipient) {
        document.title = `${personalizedHeading} | Special Message`;
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', personalizedHeading);
    }

    // 4. Control Pills
    const recipientPillText = document.getElementById('recipient-pill-text');
    if (recipientPillText) {
        recipientPillText.textContent = state.recipient ? `For: ${state.recipient}` : "For: Someone Special";
    }

    updateWishJarPill();

    // 5. Card Badge
    const badgeText = document.getElementById('badge-text');
    if (badgeText) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            badgeText.textContent = state.customTitle ? `✨ ${state.customTitle}` : eventCfg.badge;
        } else {
            badgeText.textContent = occ.badge;
        }
    }

    // 6. Buttons Copy
    const acceptTextSpan = document.getElementById('accept-text');
    const acceptEmojiSpan = document.getElementById('accept-emoji');
    const denyTextSpan = document.getElementById('deny-text');
    const denyEmojiSpan = document.getElementById('deny-emoji');

    if (acceptTextSpan) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            acceptTextSpan.textContent = eventCfg.acceptText || occ.acceptText;
        } else {
            acceptTextSpan.textContent = occ.acceptText;
        }
    }
    if (acceptEmojiSpan) {
        if (state.occasion === 'custom') {
            const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
            acceptEmojiSpan.textContent = eventCfg.acceptEmoji || occ.acceptEmoji;
        } else {
            acceptEmojiSpan.textContent = occ.acceptEmoji;
        }
    }
    if (denyTextSpan) denyTextSpan.textContent = occ.denyText;
    if (denyEmojiSpan) denyEmojiSpan.textContent = occ.denyEmoji;

    // 7. Update components
    updateBearAsset(state.isAccepted);
    updateBearEmotion(state.denyCount);
    updateKeepsakeContent();
    updateCountdownDisplay();
}

function initApp() {
    // Detect hardware & capabilities
    DeviceManager.detect();

    // Load state from URL params and localStorage
    appState.loadInitialState();

    // Initialize services
    sound.initAudioElements();

    // Initialize UI components
    initToast();
    initTheme();
    initCountdown({ onEditDate: openPersonalizeModal });
    initBear();
    initDodge({
        onDodgeBurst: () => {
            if (!DeviceManager.isMobile) {
                for (let i = 0; i < 3; i++) {
                    setTimeout(spawnFloatingParticle, i * 80);
                }
            }
        }
    });
    initKeepsake();
    initPersonalizeModal();
    initWishJarModal();
    initSuccess({
        onReplayOccasionApply: () => {
            applyOccasionUI();
        }
    });

    // Initialize visual effects
    initConfetti();
    initParticles();
    initPreloader();

    // Bind top navigation pills to personalize modal
    const occasionPillBtn = document.getElementById('occasion-pill-btn');
    const personalizePillBtn = document.getElementById('personalize-pill-btn');

    if (occasionPillBtn) {
        occasionPillBtn.addEventListener('click', openPersonalizeModal);
    }
    if (personalizePillBtn) {
        personalizePillBtn.addEventListener('click', openPersonalizeModal);
    }

    // Apply initial occasion UI
    applyOccasionUI();

    // Listen for state changes
    appState.subscribe((newState, oldState, changedKeys) => {
        if (changedKeys.some(k => ['occasion', 'recipient', 'customEvent', 'customTitle'].includes(k))) {
            applyOccasionUI();
        }
    });

    // Viewport resize & orientation handling
    const handleViewportChange = () => {
        const fallbackCanvas = document.getElementById('fallback-confetti-canvas');
        if (fallbackCanvas) {
            fallbackCanvas.width = window.innerWidth;
            fallbackCanvas.height = window.innerHeight;
        }
        updateVisualAspectRatio();
        if (typeof window.AOS !== 'undefined') {
            window.AOS.refresh();
        }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 120);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
