/**
 * 3D Tilt Hover Effect
 * Integrates VanillaTilt on desktop pointers for subtle interactive depth.
 */

import { DeviceManager } from '../../core/device.js';

let tiltInitialized = false;

export function initCardTilt() {
    if (tiltInitialized) return;
    const valentineCard = document.getElementById('valentine-card');

    if (DeviceManager.canTilt && valentineCard && typeof window.VanillaTilt !== 'undefined') {
        tiltInitialized = true;
        window.VanillaTilt.init(valentineCard, {
            max: 18,
            speed: 650,
            perspective: 850,
            scale: 1.035,
            glare: true,
            "max-glare": 0.28,
            gyroscope: false,
            reset: true,
            easing: "cubic-bezier(.03,.98,.52,.99)"
        });
    }
}
