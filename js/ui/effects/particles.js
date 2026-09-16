/**
 * Floating Emoji Particles Engine
 * Spawns season-specific floating particles across the background.
 * Throttled dynamically by DeviceManager to prevent mobile heating and battery drain.
 */

import { DeviceManager } from '../../core/device.js';
import { OCCASIONS } from '../../config/occasions.js';
import { appState } from '../../core/state.js';

let floatingContainer = null;
let floatingInterval = null;

export function spawnFloatingParticle() {
    if (typeof document === 'undefined' || document.hidden || !floatingContainer) return;
    if (floatingContainer.childElementCount >= DeviceManager.maxParticles) return;

    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;

    const particleType = occ.particleType || 'up';
    const particleEl = document.createElement('span');
    particleEl.className = `floating-particle particle-${particleType}`;

    const glyphList = occ.floatingEmojis || ['❤️', '✨', '🎉'];
    const randomGlyph = glyphList[Math.floor(Math.random() * glyphList.length)];
    particleEl.textContent = randomGlyph;

    const startX = (Math.random() * 92 + 4).toFixed(1);
    const duration = (Math.random() * 3 + (DeviceManager.isMobile ? 5 : 4)).toFixed(2);
    const size = (Math.random() * (particleType === 'snow' ? 0.8 : 0.7) + (DeviceManager.isMobile ? 0.95 : 1.1)).toFixed(2);
    const drift = (Math.random() * 80 - 40).toFixed(0) + 'px';
    const spin = (Math.random() * 60 - 30).toFixed(0) + 'deg';

    particleEl.style.left = `${startX}vw`;
    particleEl.style.fontSize = `${size}rem`;
    particleEl.style.animationDuration = `${duration}s`;
    particleEl.style.setProperty('--drift', drift);
    particleEl.style.setProperty('--spin', spin);

    floatingContainer.appendChild(particleEl);

    let cleanedUp = false;
    const cleanup = () => {
        if (!cleanedUp && particleEl.parentNode) {
            cleanedUp = true;
            particleEl.remove();
        }
    };

    particleEl.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, parseFloat(duration) * 1000 + 400);
}

export function startEmojiSpawner() {
    if (!floatingInterval) {
        const initialCount = DeviceManager.isMobile ? 2 : 4;
        for (let i = 0; i < initialCount; i++) {
            setTimeout(spawnFloatingParticle, i * 250);
        }
        floatingInterval = setInterval(spawnFloatingParticle, DeviceManager.spawnIntervalMs);
    }
}

export function stopEmojiSpawner() {
    if (floatingInterval) {
        clearInterval(floatingInterval);
        floatingInterval = null;
    }
}

export function initParticles() {
    floatingContainer = document.getElementById('floating-hearts-container');
    startEmojiSpawner();
}
