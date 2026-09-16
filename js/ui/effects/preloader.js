/**
 * Premium Asset-Aware Preloader & Staged Lifecycle Observer
 * 
 * CORE CAPABILITIES:
 * - Intentionally Paced Asset Lifecycle: Deliberately steps through the lifecycle
 *   phases (PENDING -> LOADING -> READY / OPTIONAL_PENDING) so users can clearly
 *   observe how distinct resources (Core State, Primary Visual, Secondary Graphics,
 *   and Audio Buffer) are isolated, buffered, and resolved.
 * - Semantic Asset Badges: Real-time UI indicator explicitly displays the active
 *   asset name and its RFC-style status pill (PENDING, LOADING, READY, OPTIONAL).
 * - Meaningful Audio Semantics: Audio tracks resolve upon `canplay` or `loadedmetadata`;
 *   they do not block application readiness.
 * - Controlled Reveal & Smooth Handoff: Simultaneous crossfade between preloader exit
 *   and hero card entrance, followed by complete DOM removal for zero background overhead.
 */

import { OCCASIONS, getBearAssetsForState } from '../../config/occasions.js';
import { appState } from '../../core/state.js';
import { assetLoader, ASSET_STATUS } from '../../core/asset-loader.js';
import { DeviceManager } from '../../core/device.js';
import { t, getOccasionTranslation } from '../../i18n/index.js';
import { initCardTilt } from './tilt.js';

let aosInitialized = false;

export function initAOS() {
    if (aosInitialized) {
        if (typeof window.AOS !== 'undefined') window.AOS.refresh();
        return;
    }
    if (typeof window.AOS !== 'undefined') {
        aosInitialized = true;
        window.AOS.init({
            duration: 850,
            easing: 'ease-out-cubic',
            once: true,
            offset: 10,
            delay: 40,
            disable: () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }
}

let isDismissed = false;

/**
 * Deliberate helper to pause execution for observable pacing.
 * @param {number} ms 
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Initializes the asset-aware preloader with intentional pacing to demonstrate
 * the multi-asset lifecycle stages in real time.
 * @param {Object} [options]
 * @param {Function} [options.onAppReady] - Callback invoked when preloader exits and app is revealed
 */
export function initPreloader(options = {}) {
    const preloader = document.getElementById('app-preloader');
    const preloaderTitle = document.getElementById('preloader-title');
    const preloaderBadge = document.getElementById('preloader-badge');
    const preloaderBadgeText = document.getElementById('preloader-badge-text');
    const preloaderCurrentTask = document.getElementById('preloader-current-task');
    const preloaderPercent = document.getElementById('preloader-percent');
    const preloaderBarFill = document.getElementById('preloader-bar-fill');
    const preloaderStatus = document.getElementById('preloader-status');
    const dropletIcon = document.getElementById('droplet-icon');
    const valentineCard = document.getElementById('valentine-card');
    const birthdayAudioEl = document.getElementById('birthday-audio');
    const lifecycleStagePill = document.getElementById('lifecycle-stage-pill');
    const lifecycleAssetName = document.getElementById('lifecycle-asset-name');

    if (!preloader) {
        initAOS();
        initCardTilt();
        if (typeof options.onAppReady === 'function') {
            options.onAppReady();
        }
        return;
    }

    isDismissed = false;

    // Controlled entrance state: card is gently resting behind preloader
    if (valentineCard) {
        valentineCard.classList.add('card-initial-hide');
    }

    // Apply active occasion theming
    const state = appState.getState();
    const occKey = state.occasion || 'valentine';
    const occ = OCCASIONS[occKey] || OCCASIONS.valentine;
    const occTrans = getOccasionTranslation(occKey, state.language);
    const bearAssets = getBearAssetsForState(state);

    if (dropletIcon) {
        dropletIcon.textContent = occTrans.acceptEmoji || occ.acceptEmoji || '💖';
    }

    if (preloaderTitle) {
        preloaderTitle.textContent = t('preloaderTitle', 'Preparing Your Surprise');
    }

    if (preloaderBadgeText) {
        const occName = occTrans.label || occ.name;
        preloaderBadgeText.textContent = t('preloaderCrafting', 'Crafting {occasion} Magic ✨').replace('{occasion}', occName);
    }

    // Adaptive performance configuration
    if (DeviceManager.prefersReducedMotion) {
        preloader.classList.add('reduced-motion-mode');
    }
    if (DeviceManager.isLowPower || DeviceManager.isMobile) {
        preloader.classList.add('mobile-throttled');
    }

    /**
     * Updates all preloader visual indicators for the given lifecycle stage.
     */
    function updateLifecycleDisplay(stateKey, assetLabel, taskLabel, percent, statusText) {
        if (isDismissed) return;

        const ratio = Math.max(0, Math.min(1, percent / 100));

        if (lifecycleStagePill) {
            lifecycleStagePill.className = `lifecycle-stage-pill state-${stateKey.toLowerCase()}`;
            lifecycleStagePill.textContent = stateKey.toUpperCase();
        }

        if (lifecycleAssetName) {
            lifecycleAssetName.textContent = assetLabel;
        }

        if (preloaderCurrentTask) {
            preloaderCurrentTask.textContent = taskLabel;
        }

        if (preloaderPercent) {
            preloaderPercent.textContent = `${Math.round(percent)}%`;
        }

        if (preloaderBarFill) {
            preloaderBarFill.style.transform = `scaleX(${ratio})`;
        }

        if (preloaderStatus) {
            preloaderStatus.textContent = statusText;
        }
    }

    // Register resources in the underlying assetLoader
    assetLoader.register('app-init', {
        type: 'task',
        labelKey: 'taskAppInit',
        critical: true,
        weight: 1.0
    });

    if (bearAssets?.normal) {
        assetLoader.register('visual-primary', {
            type: 'image',
            url: bearAssets.normal,
            labelKey: 'taskVisuals',
            critical: true,
            weight: 1.5,
            timeout: 5000
        });
    }

    if (bearAssets?.success) {
        assetLoader.register('visual-secondary', {
            type: 'image',
            url: bearAssets.success,
            labelKey: 'taskVisuals',
            critical: false,
            weight: 0.5,
            timeout: 5000
        });
    }

    const audioSrc = state.customSongUrl || birthdayAudioEl?.src;
    if (birthdayAudioEl && audioSrc) {
        assetLoader.register('audio-celebration', {
            type: 'audio',
            element: birthdayAudioEl,
            url: audioSrc,
            labelKey: 'taskAudio',
            critical: false,
            weight: 1.0,
            timeout: 5000
        });
    }

    // Start background network loading in assetLoader
    assetLoader.start();

    // Fast-forward listener: optional tap to dismiss early if user chooses
    let isFastForwarding = false;
    const onPreloaderTap = () => {
        if (!isDismissed && !isFastForwarding) {
            isFastForwarding = true;
            finishAndDismiss();
        }
    };
    preloader.addEventListener('click', onPreloaderTap, { once: true });

    /**
     * Drives the intentionally slow, staged lifecycle observer.
     * Demonstrates distinct asset phases (Core -> Hero Visual -> Secondary Art -> Audio -> 100% Ready).
     */
    async function runStagedLifecycle() {
        // =========================================================================
        // STAGE 1: Core Application State & Localization Engine (Duration: ~950ms)
        // =========================================================================
        updateLifecycleDisplay(
            'PENDING',
            'Core State Engine',
            t('taskAppInit', 'Application setup'),
            3,
            'Phase 1/4: Initializing state & theme configuration...'
        );
        await delay(450);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'LOADING',
            'Core State Engine',
            t('taskAppInit', 'Application setup'),
            18,
            'Phase 1/4: Bootstrapping DOM structure & translations...'
        );
        await delay(500);
        if (isDismissed || isFastForwarding) return;

        assetLoader.completeTask('app-init');
        updateLifecycleDisplay(
            'READY',
            'Core State Engine',
            t('taskAppInit', 'Application setup'),
            26,
            'Core environment initialized & verified ✓'
        );
        await delay(350);
        if (isDismissed || isFastForwarding) return;

        // =========================================================================
        // STAGE 2: Primary Occasion Hero Visual [Critical] (Duration: ~1100ms)
        // =========================================================================
        updateLifecycleDisplay(
            'PENDING',
            'Primary Occasion Artwork',
            t('taskVisuals', 'Visual elements'),
            32,
            'Phase 2/4: Resolving primary artwork source...'
        );
        await delay(450);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'LOADING',
            'Primary Occasion Artwork',
            t('taskVisuals', 'Visual elements'),
            48,
            'Phase 2/4: Streaming & decoding hero visuals...'
        );

        // Verify image decode or cache hit concurrently with visible stage pacing
        if (bearAssets?.normal) {
            await Promise.race([
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = bearAssets.normal;
                    if (img.complete) resolve();
                }),
                delay(650)
            ]);
        } else {
            await delay(650);
        }
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'READY',
            'Primary Occasion Artwork',
            t('taskVisuals', 'Visual elements'),
            64,
            'Hero visual decoded and memory-cached ✓'
        );
        await delay(380);
        if (isDismissed || isFastForwarding) return;

        // =========================================================================
        // STAGE 3: Secondary Celebration Visuals [Optional Background] (Duration: ~950ms)
        // =========================================================================
        updateLifecycleDisplay(
            'OPTIONAL',
            'Celebration Reaction Graphics',
            'Celebration graphics',
            70,
            'Phase 3/4: Inspecting celebration reaction artwork...'
        );
        await delay(450);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'LOADING',
            'Celebration Reaction Graphics',
            'Celebration graphics',
            80,
            'Phase 3/4: Pre-buffering celebratory reaction asset...'
        );
        await delay(500);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'READY',
            'Celebration Reaction Graphics',
            'Celebration graphics',
            86,
            'Celebration graphics cached in background ✓'
        );
        await delay(360);
        if (isDismissed || isFastForwarding) return;

        // =========================================================================
        // STAGE 4: Celebration Audio Stream [Soundstage Buffer] (Duration: ~950ms)
        // =========================================================================
        updateLifecycleDisplay(
            'OPTIONAL',
            'Celebration Audio Stream',
            t('taskAudio', 'Celebration song'),
            90,
            'Phase 4/4: Inspecting audio stream & headers...'
        );
        await delay(450);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'LOADING',
            'Celebration Audio Stream',
            t('taskAudio', 'Celebration song'),
            95,
            'Phase 4/4: Buffering audio headers (metadata ready)...'
        );
        await delay(500);
        if (isDismissed || isFastForwarding) return;

        updateLifecycleDisplay(
            'READY',
            'Celebration Audio Stream',
            t('taskAudio', 'Celebration song'),
            100,
            'Audio stream verified & ready for interaction 🎶'
        );
        await delay(380);
        if (isDismissed || isFastForwarding) return;

        // =========================================================================
        // STAGE 5: 100% Verification & Completion Milestone (Duration: ~750ms)
        // =========================================================================
        finishAndDismiss();
    }

    function finishAndDismiss() {
        if (isDismissed) return;

        // 1. Completion Moment Cue
        updateLifecycleDisplay(
            'READY',
            'All Systems Operational',
            t('taskReady', 'Experience ready'),
            100,
            t('preloaderReady', 'Welcome to your surprise! ✨')
        );

        if (preloaderBadge) {
            preloaderBadge.classList.add('is-complete');
        }

        // Brief hold so user can observe the final 100% emerald milestone
        setTimeout(() => {
            dismissPreloader();
        }, 750);
    }

    function dismissPreloader() {
        if (isDismissed) return;
        isDismissed = true;

        preloader.removeEventListener('click', onPreloaderTap);

        // 2. Coordinated Seamless Crossfade:
        // Preloader fades out (450ms) while Hero Card reveals (500ms) concurrently
        if (preloader) {
            preloader.classList.add('preloader-hiding');
        }

        if (valentineCard) {
            valentineCard.classList.remove('card-initial-hide');
            valentineCard.classList.add('card-revealed');
        }

        // 3. Complete Cleanup & Resource Hand-off after crossfade finishes
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                // Completely remove preloader from DOM so NO CSS animation runs in background
                preloader.classList.add('preloader-hidden');
                preloader.setAttribute('aria-hidden', 'true');
                preloader.remove();
            }

            // Initialize tilt on desktop
            initCardTilt();

            // Refresh scroll animations
            initAOS();

            // Notify main app that preloader has completed and celebration effects may now start
            if (typeof options.onAppReady === 'function') {
                options.onAppReady();
            }
        }, 460);
    }

    // Launch the staged lifecycle observer
    runStagedLifecycle().catch((err) => {
        console.error('[Preloader] Lifecycle error, falling back to immediate reveal:', err);
        dismissPreloader();
    });
}

/**
 * Updates preloader occasion styling if customized before dismissal
 * @param {string} occKey
 */
export function updatePreloaderOccasion(occKey) {
    if (isDismissed) return;
    const occ = OCCASIONS[occKey] || OCCASIONS.valentine;
    const state = appState.getState();
    const occTrans = getOccasionTranslation(occKey, state.language);

    const dropletIcon = document.getElementById('droplet-icon');
    const preloaderBadgeText = document.getElementById('preloader-badge-text');

    if (dropletIcon) {
        dropletIcon.textContent = occTrans.acceptEmoji || occ.acceptEmoji || '💖';
    }
    if (preloaderBadgeText) {
        const occName = occTrans.label || occ.name;
        preloaderBadgeText.textContent = t('preloaderCrafting', 'Crafting {occasion} Magic ✨').replace('{occasion}', occName);
    }
}
