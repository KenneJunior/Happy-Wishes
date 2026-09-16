/**
 * Preloader & Fluid Card Entrance
 * Controls liquid glass preloader animation, progress simulation,
 * seasonal droplet badge updates, and the smooth unmasking entrance transition.
 */

import { OCCASIONS } from '../../config/occasions.js';
import { appState } from '../../core/state.js';
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

export function initPreloader() {
    const preloader = document.getElementById('app-preloader');
    const preloaderBarFill = document.getElementById('preloader-bar-fill');
    const preloaderStatus = document.getElementById('preloader-status');
    const preloaderBadgeText = document.getElementById('preloader-badge-text');
    const dropletIcon = document.getElementById('droplet-icon');
    const valentineCard = document.getElementById('valentine-card');

    if (valentineCard && preloader) {
        valentineCard.classList.add('card-initial-hide');
    }

    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    if (dropletIcon && occ) {
        dropletIcon.textContent = occ.btnAcceptEmoji || '💖';
    }
    if (preloaderBadgeText && occ) {
        preloaderBadgeText.textContent = occ.name === 'Birthday' ? 'Crafting Birthday Joy 🎂' : `Crafting ${occ.name} Magic ✨`;
    }

    const MIN_PRELOADER_TIME = 2500;
    const preloaderStartTime = performance.now();
    let isPreloaderDismissed = false;
    let windowLoadFired = (document.readyState === 'complete');

    const preloaderPhrases = [
        "Infusing sweetness... 🍯",
        "Polishing frosted glass... ✨",
        "Preparing celebratory magic... 🎁",
        "Almost ready! 💖"
    ];

    const progressInterval = setInterval(() => {
        if (isPreloaderDismissed) {
            clearInterval(progressInterval);
            return;
        }

        const elapsed = performance.now() - preloaderStartTime;
        const ratio = Math.min(elapsed / MIN_PRELOADER_TIME, 0.96);
        const percent = Math.round(ratio * 100);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = `${percent}%`;
        }

        if (preloaderStatus) {
            const phraseIdx = Math.min(Math.floor(ratio * preloaderPhrases.length), preloaderPhrases.length - 1);
            preloaderStatus.textContent = preloaderPhrases[phraseIdx];
        }
    }, 60);

    function dismissPreloader() {
        if (isPreloaderDismissed) return;
        isPreloaderDismissed = true;
        clearInterval(progressInterval);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = '100%';
        }
        if (preloaderStatus) {
            preloaderStatus.textContent = 'Welcome! ✨';
        }

        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('preloader-hiding');
            }

            if (valentineCard) {
                valentineCard.classList.remove('card-initial-hide');
                valentineCard.classList.add('card-revealed');
            }

            initAOS();

            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('preloader-hidden');
                    preloader.setAttribute('aria-hidden', 'true');
                }
                initCardTilt();
            }, 850);
        }, 180);
    }

    function checkReadyToDismiss() {
        const elapsed = performance.now() - preloaderStartTime;
        if (elapsed >= MIN_PRELOADER_TIME && windowLoadFired) {
            dismissPreloader();
        }
    }

    window.addEventListener('load', () => {
        windowLoadFired = true;
        checkReadyToDismiss();
    });

    if (preloader) {
        setTimeout(() => {
            if (windowLoadFired || document.readyState === 'complete') {
                dismissPreloader();
            } else {
                const fallbackSafetyTimer = setTimeout(dismissPreloader, 1800);
                window.addEventListener('load', () => {
                    clearTimeout(fallbackSafetyTimer);
                    dismissPreloader();
                }, { once: true });
            }
        }, MIN_PRELOADER_TIME);
    } else {
        initAOS();
        initCardTilt();
    }

    if (valentineCard) {
        valentineCard.addEventListener('mouseenter', initCardTilt, { once: true });
    }
}
