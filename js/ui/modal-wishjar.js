/**
 * Wish Jar Minigame Modal Component
 * Displays seasonal compliment capsules, random wish drawing,
 * and AI wish generation via the wish-api service.
 */

import { sound } from '../core/sound.js';
import { showToast } from './toast.js';
import { appState } from '../core/state.js';
import { WISH_DATA } from '../config/wishes.js';
import { CELEBRATION_EVENT_TYPES } from '../config/occasions.js';
import { generateWishes } from '../services/wish-api.js';

let wishJarModal = null;
let wishJarTitle = null;
let wishContentText = null;
let wishCapsuleTag = null;
let wishSourcePill = null;
let wishCounterPill = null;
let wishCapsuleDisplay = null;
let nextWishBtn = null;
let fetchFreshWishesBtn = null;
let copyWishBtn = null;
let closeWishModalBtn = null;
let aiBtnText = null;
let aiBtnSpark = null;
let wishJarPillBtn = null;
let wishJarPillText = null;

let activeWishesPool = [];
let currentWishIndex = 0;
let currentWishSource = 'curated';
let isFetchingWishes = false;

export function getEffectiveWishJarConfig() {
    const state = appState.getState();
    if (state.occasion === 'custom') {
        const eventCfg = CELEBRATION_EVENT_TYPES[state.customEvent] || CELEBRATION_EVENT_TYPES.other;
        const displayTitle = state.customTitle || eventCfg.label || 'Celebration';
        const items = (WISH_DATA[state.customEvent] && WISH_DATA[state.customEvent].items)
            ? WISH_DATA[state.customEvent].items
            : WISH_DATA.custom.items;
        return {
            title: `${displayTitle} Wishes & Notes ${eventCfg.emoji || '✨'}`,
            tagPrefix: `${eventCfg.label || 'Celebration'} Wish`,
            pillLabel: (state.customTitle && state.customTitle.trim())
                ? `${state.customTitle.trim()} Wishes 🎁`
                : `${eventCfg.label || 'Celebration'} Wishes 🎁`,
            items: items
        };
    }
    return WISH_DATA[state.occasion] || WISH_DATA.valentine;
}

export function initWishPool(forceReset = false) {
    if (activeWishesPool.length === 0 || forceReset) {
        const config = getEffectiveWishJarConfig();
        activeWishesPool = [...config.items];
        currentWishIndex = 0;
        currentWishSource = 'curated';
    }
}

export function updateWishJarPill() {
    if (!wishJarPillText) return;
    const config = getEffectiveWishJarConfig();
    wishJarPillText.textContent = config.pillLabel || "Wish Jar 💌";
}

export function updateWishJarUI() {
    const config = getEffectiveWishJarConfig();
    if (wishJarTitle) wishJarTitle.textContent = config.title;

    if (activeWishesPool.length === 0) {
        initWishPool();
    }

    const wishRaw = activeWishesPool[currentWishIndex] || "Wishing you boundless love and joy today and always! ✨";
    const wishText = (typeof wishRaw === 'object' && wishRaw !== null && wishRaw.text) ? wishRaw.text : String(wishRaw);

    if (wishContentText) {
        wishContentText.textContent = `"${wishText}"`;
    }

    if (wishCapsuleTag) {
        wishCapsuleTag.textContent = `✨ ${config.tagPrefix} #${currentWishIndex + 1} of ${activeWishesPool.length}`;
    }

    if (wishSourcePill) {
        if (currentWishSource === 'ai') {
            wishSourcePill.textContent = '✨ Fresh AI Wishes';
            wishSourcePill.classList.add('is-ai-active');
        } else {
            wishSourcePill.textContent = '✨ Fresh Curated Wishes';
            wishSourcePill.classList.remove('is-ai-active');
        }
    }

    if (wishCounterPill) {
        wishCounterPill.textContent = `Wish ${currentWishIndex + 1} of ${activeWishesPool.length}`;
    }

    updateWishJarPill();
}

export function drawRandomWish() {
    if (activeWishesPool.length === 0) {
        initWishPool();
    }
    if (activeWishesPool.length === 0) return;

    let nextIdx = Math.floor(Math.random() * activeWishesPool.length);
    if (activeWishesPool.length > 1 && nextIdx === currentWishIndex) {
        nextIdx = (nextIdx + 1) % activeWishesPool.length;
    }
    currentWishIndex = nextIdx;

    if (wishCapsuleDisplay) {
        wishCapsuleDisplay.classList.add('wish-animating');
        setTimeout(() => {
            if (wishCapsuleDisplay) wishCapsuleDisplay.classList.remove('wish-animating');
        }, 240);
    }

    updateWishJarUI();
    sound.playCelebrationChime();
}

export async function fetchFreshWishes() {
    if (isFetchingWishes) return;
    isFetchingWishes = true;

    if (fetchFreshWishesBtn) {
        fetchFreshWishesBtn.disabled = true;
        fetchFreshWishesBtn.classList.add('is-loading');
    }
    if (aiBtnText) {
        aiBtnText.textContent = 'Crafting...';
    }
    if (aiBtnSpark) {
        aiBtnSpark.classList.add('sparkle-spin');
    }

    const state = appState.getState();

    try {
        const result = await generateWishes({
            occasion: state.occasion,
            eventType: state.customEvent,
            eventTitle: state.customTitle,
            recipientName: state.recipient,
            customNote: state.customMsg,
            vibe: 'heartfelt'
        });

        if (result && Array.isArray(result.wishes) && result.wishes.length > 0) {
            const freshItems = result.wishes.filter(w => !activeWishesPool.includes(w));
            const wishesToAdd = freshItems.length > 0 ? freshItems : result.wishes;

            activeWishesPool = [...wishesToAdd, ...activeWishesPool];
            currentWishIndex = 0;
            currentWishSource = result.source || 'ai';

            updateWishJarUI();
            sound.playCelebrationChime();

            const toastMsg = (result.source === 'ai')
                ? "Fresh AI wishes crafted for your celebration! ✨💌"
                : "Fresh seasonal wishes unlocked! 💌✨";
            showToast(toastMsg, "✨");
        }
    } catch (err) {
        console.error('Error in wish jar generation:', err);
    } finally {
        isFetchingWishes = false;
        if (fetchFreshWishesBtn) {
            fetchFreshWishesBtn.disabled = false;
            fetchFreshWishesBtn.classList.remove('is-loading');
        }
        if (aiBtnText) {
            aiBtnText.textContent = 'Fresh Wishes';
        }
        if (aiBtnSpark) {
            aiBtnSpark.classList.remove('sparkle-spin');
        }
    }
}

export function openWishJarModal() {
    if (!wishJarModal) return;
    initWishPool();
    updateWishJarUI();

    wishJarModal.hidden = false;
    wishJarModal.style.display = 'flex';
    wishJarModal.removeAttribute('aria-hidden');

    if (nextWishBtn) {
        nextWishBtn.focus();
    }
}

export function closeWishJarModal() {
    if (!wishJarModal) return;
    wishJarModal.hidden = true;
    wishJarModal.style.display = 'none';
    wishJarModal.setAttribute('aria-hidden', 'true');

    if (wishJarPillBtn) {
        wishJarPillBtn.focus();
    }
}

export function initWishJarModal() {
    wishJarModal = document.getElementById('wish-jar-modal');
    wishJarTitle = document.getElementById('wish-jar-title');
    wishContentText = document.getElementById('wish-content-text');
    wishCapsuleTag = document.getElementById('wish-capsule-tag');
    wishSourcePill = document.getElementById('wish-source-pill');
    wishCounterPill = document.getElementById('wish-counter-pill');
    wishCapsuleDisplay = document.getElementById('wish-capsule-display');
    nextWishBtn = document.getElementById('next-wish-btn');
    fetchFreshWishesBtn = document.getElementById('fetch-fresh-wishes-btn');
    copyWishBtn = document.getElementById('copy-wish-btn');
    closeWishModalBtn = document.getElementById('close-wish-modal-btn');
    aiBtnText = document.getElementById('ai-btn-text');
    aiBtnSpark = document.getElementById('ai-btn-spark');
    wishJarPillBtn = document.getElementById('wish-jar-pill-btn');
    wishJarPillText = document.getElementById('wish-jar-pill-text');

    initWishPool();
    updateWishJarPill();

    if (wishJarPillBtn) {
        wishJarPillBtn.addEventListener('click', openWishJarModal);
    }
    if (closeWishModalBtn) {
        closeWishModalBtn.addEventListener('click', closeWishJarModal);
    }
    if (wishJarModal) {
        wishJarModal.addEventListener('click', (e) => {
            if (e.target === wishJarModal) closeWishJarModal();
        });
    }
    if (nextWishBtn) {
        nextWishBtn.addEventListener('click', drawRandomWish);
    }
    if (fetchFreshWishesBtn) {
        fetchFreshWishesBtn.addEventListener('click', fetchFreshWishes);
    }
    if (copyWishBtn) {
        copyWishBtn.addEventListener('click', () => {
            const text = wishContentText ? wishContentText.textContent : '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast("Wish copied to clipboard! 📋✨", "💌");
                }).catch(() => {
                    showToast("Wish copied! 💌", "📋");
                });
            } else {
                showToast("Wish copied! 💌", "📋");
            }
        });
    }

    // React to state changes (e.g. occasion change resets wish pool)
    appState.subscribe((newState, oldState, changedKeys) => {
        if (changedKeys.includes('occasion') || changedKeys.includes('customEvent')) {
            initWishPool(true);
            updateWishJarPill();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wishJarModal && !wishJarModal.hidden) {
            closeWishJarModal();
        }
    });
}
