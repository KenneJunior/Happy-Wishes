/**
 * Device & Adaptive Performance Engine
 * Hardware detection, coarse pointer sensing, battery-saving throttles,
 * and device-appropriate particle/tilt budgets.
 */

export const DeviceManager = {
    isMobile: false,
    isCoarsePointer: false,
    isLowPower: false,
    canTilt: false,
    prefersReducedMotion: false,
    maxParticles: 2,
    spawnIntervalMs: 3200,

    detect() {
        if (typeof window === 'undefined') return;

        const ua = navigator.userAgent || '';
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Silk/i.test(ua);
        const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        const isSmallScreen = window.innerWidth <= 768;
        const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
        const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

        // Explicit OS Reduced Motion check
        if (window.matchMedia) {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            this.prefersReducedMotion = Boolean(motionQuery && motionQuery.matches);

            // Dynamic listener for changes while app is running
            try {
                motionQuery.addEventListener('change', (e) => {
                    this.prefersReducedMotion = Boolean(e.matches);
                    if (document.body) {
                        if (this.prefersReducedMotion) {
                            document.body.classList.add('reduced-motion-mode');
                        } else {
                            document.body.classList.remove('reduced-motion-mode');
                        }
                    }
                });
            } catch (_) {
                if (typeof motionQuery.addListener === 'function') {
                    motionQuery.addListener((e) => {
                        this.prefersReducedMotion = Boolean(e.matches);
                    });
                }
            }
        }

        this.isMobile = isMobileUA || isSmallScreen || (hasTouch && isCoarse);
        this.isCoarsePointer = isCoarse || !canHover;
        this.isLowPower = this.isMobile || lowCpu || lowMemory;
        this.canTilt = !this.isMobile && canHover && !hasTouch;

        if (document.body) {
            if (this.prefersReducedMotion) {
                document.body.classList.add('reduced-motion-mode');
            }
            if (this.isMobile) {
                document.body.classList.add('is-mobile', 'mobile-throttled');
                this.maxParticles = 2; // Strict mobile throttle: max 2 active floating particles
                this.spawnIntervalMs = 3200; // Low-frequency spawn to preserve mobile battery
            } else {
                document.body.classList.add('is-desktop');
                this.maxParticles = 8;
                this.spawnIntervalMs = 850;
            }
        }
    },

    /**
     * Coordinated Explode Particle Budget based on Device Tier + Motion Preference.
     * Priority order: prefersReducedMotion (priority 1) > isLowPower > isMobile > Desktop
     * Structure: 3-5 large hero hearts + controlled medium hearts + limited accents.
     */
    getExplodeBudget() {
        if (this.prefersReducedMotion) {
            return {
                isReducedMotion: true,
                heroCount: 0,
                mediumCount: 0,
                accentCount: 0,
                total: 0,
                maxDistMultiplier: 0,
                animDuration: 250
            };
        }

        if (this.isLowPower) {
            return {
                isReducedMotion: false,
                heroCount: 3,
                mediumCount: 3,
                accentCount: 2,
                total: 8,
                maxDistMultiplier: 0.65,
                animDuration: 1200
            };
        }

        if (this.isMobile) {
            return {
                isReducedMotion: false,
                heroCount: 3,
                mediumCount: 5,
                accentCount: 3,
                total: 11,
                maxDistMultiplier: 0.8,
                animDuration: 1350
            };
        }

        // Desktop / Flagship
        return {
            isReducedMotion: false,
            heroCount: 4,
            mediumCount: 6,
            accentCount: 4,
            total: 14,
            maxDistMultiplier: 0.95,
            animDuration: 1500
        };
    }
};
