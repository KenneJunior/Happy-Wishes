/**
 * Floating Particles Engine
 * Spawns occasion-specific vector SVG particles across the background.
 * Uses scalable SVG particle registry from svg-particles.js for all occasions:
 * Valentine, Birthday, Christmas, New Year, Easter, Graduation, Anniversary, Custom.
 * Throttled dynamically by DeviceManager to prevent mobile heating and battery drain.
 */

import { DeviceManager } from '../../core/device.js';
import { OCCASIONS } from '../../config/occasions.js';
import { appState } from '../../core/state.js';
import { getOccasionParticleSvg, registerParticleSvg, SVG_REGISTRY, resolveOccasionKey } from './svg-particles.js';

// Re-export registry methods for external extensibility
export { registerParticleSvg, SVG_REGISTRY, resolveOccasionKey };

let floatingContainer = null;
let floatingInterval = null;

/**
 * Spawns a single floating particle using rich, scalable SVG vector artwork.
 */
export function spawnFloatingParticle() {
    if (typeof document === 'undefined' || document.hidden || !floatingContainer) return;
    if (floatingContainer.childElementCount >= DeviceManager.maxParticles) return;

    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;
    const particleType = occ.particleType || 'up';

    const particleEl = document.createElement('span');
    particleEl.className = `floating-particle particle-${particleType}`;

    const startX = (Math.random() * 90 + 5).toFixed(1);
    const duration = (Math.random() * 3.5 + (DeviceManager.isMobile ? 5.2 : 4.2)).toFixed(2);
    // Base scale tuned for crisp vector balance across mobile and desktop
    const baseSize = (Math.random() * (particleType === 'snow' ? 0.75 : 0.7) + (DeviceManager.isMobile ? 0.9 : 1.1)).toFixed(2);
    const drift = (Math.random() * 80 - 40).toFixed(0) + 'px';
    const spin = (Math.random() * 60 - 30).toFixed(0) + 'deg';

    particleEl.style.left = `${startX}vw`;
    particleEl.style.animationDuration = `${duration}s`;
    particleEl.style.setProperty('--drift', drift);
    particleEl.style.setProperty('--spin', spin);

    try {
        // Resolve and render dynamic SVG for the current celebration occasion
        const { svg, occasionKey } = getOccasionParticleSvg(state);
        if (svg) {
            particleEl.classList.add('particle-svg-icon', `particle-${occasionKey}`);
            particleEl.innerHTML = svg;
            const dimensionRem = (parseFloat(baseSize) * 2.0).toFixed(2);
            particleEl.style.width = `${dimensionRem}rem`;
            particleEl.style.height = `${dimensionRem}rem`;
        } else {
            // Graceful fallback to emoji if SVG generation fails
            const glyphList = occ.floatingEmojis || ['❤️', '✨', '🎉'];
            const randomGlyph = glyphList[Math.floor(Math.random() * glyphList.length)];
            particleEl.textContent = randomGlyph;
            particleEl.style.fontSize = `${baseSize}rem`;
        }
    } catch {
        const glyphList = occ.floatingEmojis || ['❤️', '✨', '🎉'];
        const randomGlyph = glyphList[Math.floor(Math.random() * glyphList.length)];
        particleEl.textContent = randomGlyph;
        particleEl.style.fontSize = `${baseSize}rem`;
    }

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
