/**
 * Premium "Explode" Celebration Animation
 * Produces a dramatic, performance-optimized burst of large luminous hearts
 * originating from the Accept button when clicked.
 * Fully adapts to DeviceManager constraints, respects prefers-reduced-motion,
 * and harmonizes with the active celebration occasion.
 */

import { DeviceManager } from '../../core/device.js';
import { appState } from '../../core/state.js';

let activeOverlay = null;
let cleanupTimeout = null;
let currentAnchorEl = null;

// Occasion Color Palettes for Heart Explosion
const OCCASION_PALETTES = {
    valentine: {
        gradients: [
            ['#ff2e63', '#ff0055', '#ff758c'],
            ['#e11d48', '#be123c', '#fda4af'],
            ['#ff477e', '#ff0a54', '#ffd166'],
            ['#ff1744', '#d50000', '#ff80ab']
        ],
        glow: 'rgba(255, 46, 99, 0.4)'
    },
    anniversary: {
        gradients: [
            ['#ff4e79', '#e11d48', '#ffd166'],
            ['#ffd166', '#f59e0b', '#fff1f2'],
            ['#fb7185', '#be123c', '#fde68a'],
            ['#ff2e63', '#d97706', '#fecdd3']
        ],
        glow: 'rgba(255, 209, 102, 0.45)'
    },
    birthday: {
        gradients: [
            ['#ff758c', '#ff2e63', '#ffd166'],
            ['#a855f7', '#7c3aed', '#f472b6'],
            ['#38bdf8', '#0284c7', '#ffd166'],
            ['#ffd166', '#f59e0b', '#06d6a0']
        ],
        glow: 'rgba(255, 117, 140, 0.4)'
    },
    christmas: {
        gradients: [
            ['#ef4444', '#dc2626', '#ffd166'],
            ['#10b981', '#059669', '#a7f3d0'],
            ['#f87171', '#b91c1c', '#fef08a'],
            ['#ffd166', '#d97706', '#ef4444']
        ],
        glow: 'rgba(239, 68, 68, 0.4)'
    },
    newyear: {
        gradients: [
            ['#ffd166', '#f59e0b', '#ffffff'],
            ['#c084fc', '#9333ea', '#ffd166'],
            ['#f43f5e', '#e11d48', '#fed7aa'],
            ['#38bdf8', '#0284c7', '#fde047']
        ],
        glow: 'rgba(255, 209, 102, 0.45)'
    },
    easter: {
        gradients: [
            ['#f472b6', '#db2777', '#fde047'],
            ['#c084fc', '#a855f7', '#a7f3d0'],
            ['#4ade80', '#22c55e', '#fed7aa'],
            ['#fde047', '#eab308', '#f472b6']
        ],
        glow: 'rgba(244, 114, 182, 0.4)'
    },
    graduation: {
        gradients: [
            ['#2563eb', '#1d4ed8', '#ffd166'],
            ['#3b82f6', '#1e40af', '#93c5fd'],
            ['#ffd166', '#f59e0b', '#60a5fa'],
            ['#1d4ed8', '#1e3a8a', '#fde047']
        ],
        glow: 'rgba(37, 99, 235, 0.4)'
    },
    custom: {
        gradients: [
            ['#ff2e63', '#e11d48', '#ffd166'],
            ['#ffd166', '#f59e0b', '#ff758c'],
            ['#a855f7', '#ec4899', '#fde047']
        ],
        glow: 'rgba(255, 78, 121, 0.4)'
    }
};

/**
 * Returns an inline SVG string of a 3D luminous heart with specular highlight.
 * Designed without heavy SVG feDropShadow filters to maximize GPU performance.
 * @param {string} id - Unique gradient ID
 * @param {string[]} colors - Gradient stop colors [start, mid, end]
 * @returns {string} SVG markup
 */
function createHeartSvg(id, colors) {
    const c0 = colors[0] || '#ff2e63';
    const c1 = colors[1] || '#e11d48';
    const c2 = colors[2] || '#fda4af';

    return `
    <svg viewBox="0 0 100 92" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="display:block; overflow:visible;">
        <defs>
            <linearGradient id="g_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${c0}" />
                <stop offset="55%" stop-color="${c1}" />
                <stop offset="100%" stop-color="${c2}" />
            </linearGradient>
            <radialGradient id="r_${id}" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
                <stop offset="45%" stop-color="#ffffff" stop-opacity="0.08" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </radialGradient>
        </defs>
        <!-- Heart Base Shape -->
        <path d="M 50,88 C 18,62 0,44 0,26 C 0,11.5 11.5,0 26,0 C 35.5,0 44.5,5.5 50,14 C 55.5,5.5 64.5,0 74,0 C 88.5,0 100,11.5 100,26 C 100,44 82,62 50,88 Z"
              fill="url(#g_${id})" />
        <!-- Specular Highlight Overlay -->
        <path d="M 50,88 C 18,62 0,44 0,26 C 0,11.5 11.5,0 26,0 C 35.5,0 44.5,5.5 50,14 C 55.5,5.5 64.5,0 74,0 C 88.5,0 100,11.5 100,26 C 100,44 82,62 50,88 Z"
              fill="url(#r_${id})" />
        <!-- Glossy Rim Reflection -->
        <path d="M 14,24 C 14,14 20,8 28,6 C 21,9 17,16 17,25 C 17,37 28,49 46,67 C 32,53 14,39 14,24 Z"
              fill="#ffffff"
              opacity="0.36" />
    </svg>`;
}

/**
 * Triggers the premium heart explosion
 * @param {HTMLElement} [anchorEl=null] - The clicked Accept button to calculate center
 */
export function triggerHeartExplosion(anchorEl = null) {
    // 1. Cancel any active explosion / clear timers
    cancelHeartExplosion();

    currentAnchorEl = anchorEl;

    // 2. Coordinated Adaptive Particle Budget (Motion Preference > Device Tier)
    const budget = DeviceManager.getExplodeBudget();

    // 3. Handle Reduced Motion: Strictly restrained, elegant transition without burst particles
    if (budget.isReducedMotion) {
        if (anchorEl) {
            anchorEl.classList.add('reduced-motion-accept-transition');
            cleanupTimeout = setTimeout(() => {
                if (anchorEl) anchorEl.classList.remove('reduced-motion-accept-transition');
                cleanupTimeout = null;
            }, 250);
        }
        return;
    }

    // 4. Determine Origin Coordinates
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight * 0.6;

    if (anchorEl && typeof anchorEl.getBoundingClientRect === 'function') {
        const rect = anchorEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            originX = rect.left + rect.width / 2;
            originY = rect.top + rect.height / 2;
        }
    }

    // Clamp coordinates safely within viewport
    originX = Math.max(25, Math.min(window.innerWidth - 25, originX));
    originY = Math.max(25, Math.min(window.innerHeight - 25, originY));

    // 5. Resolve Occasion & Colors
    const state = appState ? appState.getState() : {};
    const occKey = state.occasion || 'valentine';
    const palette = OCCASION_PALETTES[occKey] || OCCASION_PALETTES.valentine;

    // 6. Anchor Button Impact
    if (anchorEl) {
        anchorEl.classList.add('explode-button-impact');
    }

    // 7. Create Fixed Overlay Container
    const overlay = document.createElement('div');
    overlay.id = 'explode-hearts-overlay';
    overlay.className = 'explode-hearts-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        overflow: hidden;
        z-index: 99999;
    `;

    // Impact radial shockwave ring
    const shockwave = document.createElement('div');
    shockwave.className = 'explode-shockwave-ring';
    shockwave.style.cssText = `
        position: absolute;
        left: ${originX}px;
        top: ${originY}px;
        transform: translate(-50%, -50%) scale(0.1);
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background: radial-gradient(circle, ${palette.glow} 0%, rgba(255,255,255,0) 70%);
        opacity: 0.9;
        animation: explodeShockwave 600ms cubic-bezier(0.1, 0.8, 0.25, 1) forwards;
    `;
    overlay.appendChild(shockwave);

    // 8. Batch Create Hearts in DocumentFragment
    // Structure: Few large hero hearts (3-5) + controlled medium hearts + limited accents
    const fragment = document.createDocumentFragment();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxViewportRadius = Math.sqrt((vw * vw) + (vh * vh)) * 0.46 * budget.maxDistMultiplier;

    const total = budget.total;
    const heroCount = budget.heroCount;
    const mediumCount = budget.mediumCount;

    for (let i = 0; i < total; i++) {
        const heartEl = document.createElement('div');
        heartEl.className = 'explode-heart-item';

        let sizePx = 50;
        let scalePeak = 1.3;
        let layerZ = 100001;

        if (i < heroCount) {
            // Hero Large Heart (3-5 hearts)
            sizePx = DeviceManager.isMobile ? 80 : 110;
            scalePeak = DeviceManager.isMobile ? 1.45 : 1.7;
            layerZ = 100003;
        } else if (i < heroCount + mediumCount) {
            // Medium Heart (controlled count)
            sizePx = DeviceManager.isMobile ? 50 : 68;
            scalePeak = 1.25;
            layerZ = 100002;
        } else {
            // Secondary Accent Heart (very limited)
            sizePx = DeviceManager.isMobile ? 32 : 42;
            scalePeak = 1.05;
            layerZ = 100001;
        }

        // Distribute angles evenly around circle with natural organic variation
        const baseAngle = (i / total) * (Math.PI * 2);
        const jitter = (Math.random() - 0.5) * (Math.PI / total * 1.4);
        const angle = baseAngle + jitter;

        // Calculate travel distance
        const distRatio = 0.45 + (Math.random() * 0.55);
        const travelDist = maxViewportRadius * distRatio;

        // Target delta X & Y
        let tx = Math.cos(angle) * travelDist;
        let ty = Math.sin(angle) * travelDist;

        // Gentle upward bias for celebratory loft
        ty -= travelDist * 0.15;

        // Rotation & Stagger
        const rot = (Math.random() - 0.5) * 60; // -30deg to +30deg
        const delay = Math.round(i * (DeviceManager.isLowPower ? 20 : 14));
        const heartDuration = budget.animDuration - (Math.random() * 180);

        // Palette gradient
        const gradPair = palette.gradients[i % palette.gradients.length];
        const uniqueId = `eh_${Date.now()}_${i}`;

        // Inline CSS with hardware-accelerated transform only
        heartEl.style.cssText = `
            position: absolute;
            left: ${originX}px;
            top: ${originY}px;
            width: ${sizePx}px;
            height: ${Math.round(sizePx * 0.92)}px;
            margin-left: -${Math.round(sizePx / 2)}px;
            margin-top: -${Math.round((sizePx * 0.92) / 2)}px;
            pointer-events: none;
            will-change: transform, opacity;
            z-index: ${layerZ};
            --tx: ${Math.round(tx)}px;
            --ty: ${Math.round(ty)}px;
            --rot: ${Math.round(rot)}deg;
            --scale-peak: ${scalePeak};
            animation: explodeHeartAnim ${Math.round(heartDuration)}ms cubic-bezier(0.14, 0.96, 0.28, 1) ${delay}ms forwards;
        `;

        heartEl.innerHTML = createHeartSvg(uniqueId, gradPair);
        fragment.appendChild(heartEl);
    }

    overlay.appendChild(fragment);
    document.body.appendChild(overlay);
    activeOverlay = overlay;

    // 9. Single Coordinated Animation Lifecycle Cleanup
    cleanupTimeout = setTimeout(() => {
        cancelHeartExplosion();
    }, budget.animDuration + 250);
}

/**
 * Safely removes explosion DOM elements, temporary classes, and cancels timers.
 * Ensures zero DOM accumulation on repeated triggers.
 */
export function cancelHeartExplosion() {
    if (cleanupTimeout) {
        clearTimeout(cleanupTimeout);
        cleanupTimeout = null;
    }

    if (currentAnchorEl) {
        currentAnchorEl.classList.remove('explode-button-impact', 'reduced-motion-accept-transition');
        currentAnchorEl = null;
    }

    if (activeOverlay) {
        try {
            activeOverlay.remove();
        } catch (_) {}
        activeOverlay = null;
    }

    const lingering = document.querySelectorAll('.explode-hearts-overlay, #explode-hearts-overlay');
    lingering.forEach(el => {
        try { el.remove(); } catch (_) {}
    });
}
