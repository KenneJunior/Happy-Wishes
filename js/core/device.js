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

        this.isMobile = isMobileUA || isSmallScreen || (hasTouch && isCoarse);
        this.isCoarsePointer = isCoarse || !canHover;
        this.isLowPower = this.isMobile || lowCpu || lowMemory;
        this.canTilt = !this.isMobile && canHover && !hasTouch;

        if (document.body) {
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
    }
};
