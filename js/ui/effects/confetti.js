/**
 * Confetti System
 * Wraps canvas-confetti with responsive desktop multi-angle bursts,
 * lightweight mobile battery-saving bursts, and HTML5 2D canvas fallback.
 */

import { DeviceManager } from '../../core/device.js';
import { OCCASIONS } from '../../config/occasions.js';
import { appState } from '../../core/state.js';

let fallbackCanvas = null;

export function initConfetti() {
    fallbackCanvas = document.getElementById('fallback-confetti-canvas');
}

export function launchCelebrationConfetti(customColors) {
    const state = appState.getState();
    const occ = OCCASIONS[state.occasion] || OCCASIONS.christmas;
    const colors = customColors || occ.confettiColors || ['#ff2e63', '#ffd166', '#06d6a0', '#ffffff'];

    if (typeof window !== 'undefined' && typeof window.confetti === 'function') {
        if (DeviceManager.isMobile) {
            window.confetti({
                particleCount: 35,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors,
                startVelocity: 32
            });
            return;
        }

        window.confetti({
            particleCount: 90,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            startVelocity: 45
        });

        setTimeout(() => {
            window.confetti({
                particleCount: 60,
                angle: 60,
                spread: 75,
                origin: { x: 0.1, y: 0.7 },
                colors: colors
            });
        }, 250);

        setTimeout(() => {
            window.confetti({
                particleCount: 60,
                angle: 120,
                spread: 75,
                origin: { x: 0.9, y: 0.7 },
                colors: colors
            });
        }, 450);

        const duration = 2.5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            window.confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            window.confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    } else {
        runFallbackConfetti(colors);
    }
}

function runFallbackConfetti(colors) {
    if (!fallbackCanvas) return;
    const ctx = fallbackCanvas.getContext('2d');
    if (!ctx) return;

    fallbackCanvas.width = window.innerWidth;
    fallbackCanvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.8) * 20,
            size: Math.random() * 8 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let animationFrameId;
    const render = () => {
        ctx.clearRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
        let activeCount = 0;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35;
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.007;

            if (p.opacity > 0) {
                activeCount++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (activeCount > 0) {
            animationFrameId = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, fallbackCanvas.width, fallbackCanvas.height);
            cancelAnimationFrame(animationFrameId);
        }
    };

    render();
}
