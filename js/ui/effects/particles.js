/**
 * Premium Atmospheric Particle Engine
 *
 * Spawns occasion-specific multi-tiered SVG particles across the background.
 * Features:
 * - 3 Visual Tiers: Far (background/bokeh), Mid (atmosphere), Near (rare hero accents).
 * - Physical Materials: Petals (swaying), Confetti (3D tumbling), Snow (serene float),
 *   Sparkles (twinkling), Hearts (buoyant drift), Bubbles (rising).
 * - Anti-clustering spawn distribution framing the central proposal card.
 * - Staggered initial field generation on launch so the background is immediately alive.
 * - Hardware throttling via DeviceManager and graceful reduced-motion accessibility.
 */

import {DeviceManager} from '../../core/device.js';
import {OCCASIONS} from '../../config/occasions.js';
import {appState} from '../../core/state.js';
import {
    getOccasionParticleSvg as getRawOccasionParticleSvg,
    registerParticleSvg,
    SVG_REGISTRY,
    resolveOccasionKey,
    OCCASION_PARTICLES,
    getNextSvgId
} from './svg-particles.js';

// Re-export registry methods and collections for external extensibility
export {registerParticleSvg, SVG_REGISTRY, resolveOccasionKey, OCCASION_PARTICLES};

/**
 * Curated mapping of active occasion identifiers to their dedicated SVG asset collections.
 * Ensures each celebration occasion (Birthday, Anniversary, Graduation, Valentine, Christmas, etc.)
 * displays an exclusive, visually rich, and themed set of atmospheric floating particles.
 */
export const OCCASION_SVG_COLLECTIONS = {
    birthday: OCCASION_PARTICLES.birthday,
    anniversary: OCCASION_PARTICLES.anniversary,
    graduation: OCCASION_PARTICLES.graduation,
    valentine: OCCASION_PARTICLES.valentine,
    christmas: OCCASION_PARTICLES.christmas,
    newyear: OCCASION_PARTICLES.newyear,
    easter: OCCASION_PARTICLES.easter,
    custom: OCCASION_PARTICLES.custom
};

// Aliased for theme-based legacy and attribute compatibility
export const THEME_SVG_COLLECTIONS = OCCASION_SVG_COLLECTIONS;

/**
 * Normalizes any occasion or theme identifier, stripping prefixes and matching semantic aliases.
 * @param {string|null|undefined} raw
 * @returns {string|null}
 */
export function normalizeOccasionKey(raw) {
    if (!raw || typeof raw !== 'string') return null;
    const str = raw.toLowerCase().trim();
    if (!str || str === 'dark' || str === 'light' || str === 'null' || str === 'undefined') {
        return null; // Ignore pure dark/light mode toggles unless combined
    }

    // Direct match against registered occasion collections
    if (OCCASION_SVG_COLLECTIONS[str]) return str;

    // Stripped prefix match (e.g. 'occasion-birthday' or 'theme-anniversary')
    const stripped = str.replace(/^(occasion-|theme-)/, '');
    if (OCCASION_SVG_COLLECTIONS[stripped]) return stripped;

    // Semantic keyword mapping
    if (str.includes('birth') || str.includes('bday') || str.includes('party') || str.includes('cake') || str.includes('balloon')) return 'birthday';
    if (str.includes('anniv') || str.includes('wedding') || str.includes('golden-anniversary') || str.includes('ring')) return 'anniversary';
    if (str.includes('grad') || str.includes('diploma') || str.includes('mortarboard') || str.includes('commence')) return 'graduation';
    if (str.includes('valen') || str.includes('heart') || str.includes('rose') || str.includes('cupid') || str.includes('sweetheart')) return 'valentine';
    if (str.includes('xmas') || str.includes('christ') || str.includes('snow') || str.includes('winter') || str.includes('holiday')) return 'christmas';
    if (str.includes('year') || str.includes('nye') || str.includes('midnight') || str.includes('firework') || str.includes('countdown')) return 'newyear';
    if (str.includes('east') || str.includes('spring') || str.includes('bloom') || str.includes('bunny') || str.includes('egg')) return 'easter';
    if (str.includes('custom')) return 'custom';

    const resolved = resolveOccasionKey(str);
    return OCCASION_SVG_COLLECTIONS[resolved] ? resolved : 'custom';
}

// Alias for theme-based consumers
export const normalizeThemeName = normalizeOccasionKey;

/**
 * Exact Particle Performance Profiles & Tuning Targets.
 * Centralized configuration controlling spawn intervals, active capacities,
 * tier distribution, rarity weights, and burst budgets.
 */
export const PARTICLE_PERFORMANCE_MODES = {
    light: {
        mobile: {
            spawnIntervalMs: 1200,
            maxActiveParticles: 18,
            initialParticleCount: 5,
            rareParticleChance: 0.04,
            uncommonParticleChance: 0.18,
            burstCount: 5,
            burstCooldownMs: 1800,
            tierDistribution: {
                far: 0.55,
                mid: 0.35,
                near: 0.10
            }
        },
        desktop: {
            spawnIntervalMs: 800,
            maxActiveParticles: 28,
            initialParticleCount: 8,
            rareParticleChance: 0.07,
            uncommonParticleChance: 0.24,
            burstCount: 8,
            burstCooldownMs: 1400,
            tierDistribution: {
                far: 0.45,
                mid: 0.40,
                near: 0.15
            }
        }
    },
    heavy: {
        mobile: {
            spawnIntervalMs: 450,
            maxActiveParticles: 38,
            initialParticleCount: 10,
            rareParticleChance: 0.10,
            uncommonParticleChance: 0.30,
            burstCount: 10,
            burstCooldownMs: 900,
            tierDistribution: {
                far: 0.40,
                mid: 0.42,
                near: 0.18
            }
        },
        desktop: {
            spawnIntervalMs: 300,
            maxActiveParticles: 55,
            initialParticleCount: 14,
            rareParticleChance: 0.14,
            uncommonParticleChance: 0.34,
            burstCount: 14,
            burstCooldownMs: 700,
            tierDistribution: {
                far: 0.35,
                mid: 0.45,
                near: 0.20
            }
        }
    }
};

/** Timing jitter ratio around the configured interval (±20%) */
export const SPAWN_JITTER_RATIO = 0.20;

/**
 * Retrieves the active particle configuration based on device capabilities,
 * user-selected performance mode, and accessibility overrides.
 *
 * Priority order:
 * 1. Accessibility: prefers-reduced-motion STRICTLY limits capacity & disables motion
 * 2. User selection: Light vs Heavy mode from appState or explicit override
 * 3. Hardware defaults: Intelligent defaults from DeviceManager
 *
 * @param {string} [performanceModeOverride] Optional explicit 'light' or 'heavy'
 * @returns {{
 *   mode: string,
 *   prefersReducedMotion: boolean,
 *   isLowPower: boolean,
 *   isMobile: boolean,
 *   isCoarse: boolean,
 *   maxActiveParticles: number,
 *   spawnIntervalMs: number,
 *   initialFieldCount: number,
 *   burstCount: number,
 *   burstCooldownMs: number,
 *   rareParticleChance: number,
 *   uncommonParticleChance: number,
 *   tierDistribution: { far: number, mid: number, near: number },
 *   allowNearTier: boolean,
 *   enable3DTransforms: boolean,
 *   spawnJitterRatio: number
 * }}
 */
export function getDeviceParticleConfig(performanceModeOverride = null) {
    const prefersReducedMotion = Boolean(
        DeviceManager.prefersReducedMotion ||
        (typeof document !== 'undefined' && document.body && document.body.classList.contains('reduced-motion-mode'))
    );
    const isLowPower = Boolean(DeviceManager.isLowPower);
    const isMobile = Boolean(DeviceManager.isMobile);
    const isCoarse = Boolean(DeviceManager.isCoarsePointer);

    // 1. Resolve performance mode: override -> appState -> intelligent hardware default
    let mode = 'heavy';
    if (performanceModeOverride && (performanceModeOverride === 'light' || performanceModeOverride === 'heavy')) {
        mode = performanceModeOverride;
    } else {
        try {
            if (typeof appState !== 'undefined' && appState.getState) {
                const st = appState.getState();
                if (st && (st.particlePerformance === 'light' || st.particlePerformance === 'heavy')) {
                    mode = st.particlePerformance;
                } else if (isMobile) {
                    mode = isLowPower ? 'light' : 'heavy';
                } else {
                    mode = isLowPower ? 'light' : 'heavy';
                }
            } else if (isMobile) {
                mode = isLowPower ? 'light' : 'heavy';
            }
        } catch (_) {
            mode = isMobile && isLowPower ? 'light' : 'heavy';
        }
    }

    const modeConfig = PARTICLE_PERFORMANCE_MODES[mode] || PARTICLE_PERFORMANCE_MODES.heavy;
    const deviceMode = isMobile ? modeConfig.mobile : modeConfig.desktop;

    let maxActiveParticles = deviceMode.maxActiveParticles;
    let spawnIntervalMs = deviceMode.spawnIntervalMs;
    let initialFieldCount = deviceMode.initialParticleCount;
    let burstCount = deviceMode.burstCount;
    let burstCooldownMs = deviceMode.burstCooldownMs;
    let rareParticleChance = deviceMode.rareParticleChance;
    let uncommonParticleChance = deviceMode.uncommonParticleChance;
    let tierDistribution = { ...deviceMode.tierDistribution };

    // 2. Strict Accessibility Priority: prefers-reduced-motion
    // Heavy mode or user preference MUST NEVER ignore reduced-motion accessibility
    if (prefersReducedMotion) {
        maxActiveParticles = 2;
        spawnIntervalMs = Math.max(spawnIntervalMs, 4000);
        initialFieldCount = 2;
        burstCount = 0;
        burstCooldownMs = 5000;
        rareParticleChance = 0;
        uncommonParticleChance = 0;
        tierDistribution = { far: 1.0, mid: 0, near: 0 };
    }

    // Near tier availability (prohibited under reduced motion, controlled by tier distribution in light/heavy)
    const allowNearTier = !prefersReducedMotion && (tierDistribution.near > 0);

    // 3D transforms: disabled on mobile or low power or reduced motion
    const enable3DTransforms = !isMobile && !isLowPower && !prefersReducedMotion;

    return {
        mode,
        prefersReducedMotion,
        isLowPower,
        isMobile,
        isCoarse,
        maxActiveParticles,
        spawnIntervalMs,
        initialFieldCount,
        burstCount,
        burstCooldownMs,
        rareParticleChance,
        uncommonParticleChance,
        tierDistribution,
        allowNearTier,
        enable3DTransforms,
        spawnJitterRatio: SPAWN_JITTER_RATIO
    };
}

/**
 * Resolves the currently active celebration occasion from explicit options, DOM attributes, or state.
 * Evaluates in prioritized order:
 * 1. Explicit options passed into spawner: options.occasion or options.activeOccasion or options.theme
 * 2. Floating container attributes: [data-occasion], [occasion], [theme], [data-theme]
 * 3. Document body attributes or datasets
 * 4. Document root element attributes
 * 5. Celebration card element attributes
 * 6. Any element with [occasion] or [theme] attribute
 * 7. Active theme class on body (e.g. 'occasion-birthday' or 'theme-anniversary')
 * 8. Central appState fallback: state.occasion or state.visualTheme
 *
 * @param {object} [options]
 * @returns {string} The active occasion key (e.g. 'birthday', 'anniversary', 'graduation', etc.)
 */
export function resolveActiveOccasion(options = {}) {
    if (typeof document === 'undefined') {
        const state = appState.getState();
        return normalizeOccasionKey(state.occasion) || 'valentine';
    }

    // 1. Explicit options argument
    if (options && typeof options.occasion === 'string') {
        const normalized = normalizeOccasionKey(options.occasion);
        if (normalized) return normalized;
    }
    if (options && typeof options.activeOccasion === 'string') {
        const normalized = normalizeOccasionKey(options.activeOccasion);
        if (normalized) return normalized;
    }
    if (options && typeof options.theme === 'string') {
        const normalized = normalizeOccasionKey(options.theme);
        if (normalized) return normalized;
    }
    if (options && typeof options.activeTheme === 'string') {
        const normalized = normalizeOccasionKey(options.activeTheme);
        if (normalized) return normalized;
    }

    // 2. Floating container attributes
    if (floatingContainer) {
        const containerOcc = floatingContainer.getAttribute('data-occasion') ||
            floatingContainer.getAttribute('occasion') ||
            floatingContainer.getAttribute('theme') ||
            floatingContainer.getAttribute('data-theme');
        const normalized = normalizeOccasionKey(containerOcc);
        if (normalized) return normalized;
    }

    // 3. Document body attributes or dataset
    if (document.body) {
        const bodyOcc = document.body.getAttribute('data-occasion') ||
            document.body.getAttribute('occasion') ||
            document.body.getAttribute('theme') ||
            document.body.getAttribute('data-theme') ||
            (document.body.dataset && (
                document.body.dataset.occasion ||
                document.body.dataset.occasionTheme ||
                document.body.dataset.theme
            ));
        const normalized = normalizeOccasionKey(bodyOcc);
        if (normalized) return normalized;
    }

    // 4. Application State (primary source of truth when no explicit DOM attribute overrides)
    if (typeof appState !== 'undefined' && appState.getState) {
        const state = appState.getState();
        const stateOcc = normalizeOccasionKey(state.occasion);
        if (stateOcc) return stateOcc;
    }

    // 5. Document element attributes
    if (document.documentElement) {
        const rootOcc = document.documentElement.getAttribute('data-occasion') ||
            document.documentElement.getAttribute('occasion') ||
            document.documentElement.getAttribute('theme');
        const normalized = normalizeOccasionKey(rootOcc);
        if (normalized) return normalized;
    }

    // 6. Main celebration card attribute
    const cardEl = document.getElementById('valentine-card');
    if (cardEl) {
        const cardOcc = cardEl.getAttribute('data-occasion') ||
            cardEl.getAttribute('occasion') ||
            cardEl.getAttribute('theme') ||
            cardEl.getAttribute('data-theme');
        const normalized = normalizeOccasionKey(cardOcc);
        if (normalized) return normalized;
    }

    // 7. Generic query for [occasion] or [theme] attribute (excluding background particles)
    const anyOccEl = document.querySelector('[data-occasion]:not(.floating-particle):not(#floating-hearts-container *), [occasion]:not(.floating-particle):not(#floating-hearts-container *), [theme]:not(.floating-particle):not(#floating-hearts-container *)');
    if (anyOccEl) {
        const attr = anyOccEl.getAttribute('data-occasion') ||
            anyOccEl.getAttribute('occasion') ||
            anyOccEl.getAttribute('theme');
        const normalized = normalizeOccasionKey(attr);
        if (normalized) return normalized;
    }

    // 8. Active occasion or theme class on body (e.g. 'occasion-birthday' or 'theme-graduation')
    if (document.body && document.body.classList) {
        for (const cls of document.body.classList) {
            if (cls.startsWith('occasion-') || cls.startsWith('theme-')) {
                const sub = cls.replace(/^(occasion-|theme-)/, '');
                const normalized = normalizeOccasionKey(sub);
                if (normalized) return normalized;
            }
        }
    }

    // 9. Visual theme fallback from state
    if (typeof appState !== 'undefined' && appState.getState) {
        const state = appState.getState();
        const stateVisual = normalizeOccasionKey(state.visualTheme);
        if (stateVisual) return stateVisual;
    }

    return 'valentine';
}

// Aliases for compatibility
export const getActiveThemeAttribute = resolveActiveOccasion;
export const resolveActiveTheme = resolveActiveOccasion;
export const getActiveTheme = resolveActiveOccasion;
export const getActiveOccasion = resolveActiveOccasion;

/**
 * Retrieves the curated SVG asset collection for an active celebration occasion.
 * Optionally filters by device capability restrictions.
 *
 * @param {string} [occasionKey]
 * @param {object} [deviceConfig]
 * @returns {Array<object>} Array of SVG particle definitions
 */
export function getOccasionParticleCollection(occasionKey, deviceConfig = null) {
    const key = normalizeOccasionKey(occasionKey) || 'valentine';
    const baseCollection = OCCASION_SVG_COLLECTIONS[key] || OCCASION_SVG_COLLECTIONS.valentine;

    // If device indicates near-tier suppression (e.g., low-power mobile), filter accordingly
    if (deviceConfig && deviceConfig.allowNearTier === false) {
        const filtered = baseCollection.filter(p => p.tier !== 'near');
        if (filtered.length > 0) return filtered;
    }

    return baseCollection;
}

// Alias for theme-based collection access
export const getThemeParticleCollection = getOccasionParticleCollection;

/**
 * Retrieves an atmospheric particle SVG from the specific curated asset collection
 * mapped to the active occasion, leveraging device capabilities for variant distribution.
 *
 * @param {string|object} [occasionOrState]
 * @param {number} [forcedVariantIndex]
 * @param {object} [deviceConfig]
 * @returns {{ svg: string, occasionKey: string, themeKey: string, variantIndex: number, definition: object }}
 */
export function getOccasionParticleSvg(occasionOrState, forcedVariantIndex, deviceConfig = null) {
    let key = 'valentine';
    if (typeof occasionOrState === 'string') {
        key = normalizeOccasionKey(occasionOrState) || 'valentine';
    } else if (occasionOrState && typeof occasionOrState === 'object') {
        const candidate = occasionOrState.occasion || occasionOrState.activeOccasion || occasionOrState.theme || occasionOrState.visualTheme;
        key = normalizeOccasionKey(candidate) || 'valentine';
    }

    const effectiveDeviceConfig = deviceConfig || getDeviceParticleConfig();
    const collection = getOccasionParticleCollection(key, effectiveDeviceConfig);
    const count = collection.length;

    let variantIndex = 0;
    if (typeof forcedVariantIndex === 'number' && forcedVariantIndex >= 0 && forcedVariantIndex < count) {
        variantIndex = forcedVariantIndex;
    } else {
        // 1. Target Tier selection based on calibrated tier distribution:
        const tDist = effectiveDeviceConfig.tierDistribution || { far: 0.40, mid: 0.42, near: 0.18 };
        const tierRoll = Math.random();
        let targetTier = 'mid';
        if (tierRoll < tDist.far) {
            targetTier = 'far';
        } else if (tierRoll < tDist.far + tDist.mid) {
            targetTier = 'mid';
        } else {
            targetTier = effectiveDeviceConfig.allowNearTier ? 'near' : 'mid';
        }

        // 2. Controlled Rarity distribution tuned with exact performance targets:
        const rareChance = typeof effectiveDeviceConfig.rareParticleChance === 'number'
            ? effectiveDeviceConfig.rareParticleChance
            : 0.10;
        const uncommonChance = typeof effectiveDeviceConfig.uncommonParticleChance === 'number'
            ? effectiveDeviceConfig.uncommonParticleChance
            : 0.30;
        const rarityRoll = Math.random();
        let targetRarity = 'common';
        if (rarityRoll < rareChance) {
            targetRarity = 'rare';
        } else if (rarityRoll < (rareChance + uncommonChance)) {
            targetRarity = 'uncommon';
        }

        // Match both tier and rarity if available, then tier alone, then rarity alone
        let candidates = collection.map((p, idx) => ({p, idx})).filter(item => item.p.tier === targetTier && item.p.rarity === targetRarity);
        if (candidates.length === 0) {
            candidates = collection.map((p, idx) => ({p, idx})).filter(item => item.p.tier === targetTier);
        }
        if (candidates.length === 0) {
            candidates = collection.map((p, idx) => ({p, idx})).filter(item => item.p.rarity === targetRarity);
        }

        if (candidates.length > 0) {
            const chosen = candidates[Math.floor(Math.random() * candidates.length)];
            variantIndex = chosen.idx;
        } else {
            variantIndex = Math.floor(Math.random() * count);
        }
    }

    const definition = collection[variantIndex] || collection[0];
    const id = getNextSvgId();
    const svg = definition.svg(id);

    return {
        svg,
        occasionKey: key,
        themeKey: key,
        variantIndex,
        definition
    };
}

// Alias for theme-based invocation
export const getThemeParticleSvg = getOccasionParticleSvg;

let floatingContainer = null;
let spawnerTimeoutId = null;
let isSpawningActive = false;
let lastBurstTimestamp = 0;
let visibilityListenerBound = false;

/**
 * Calculates a balanced horizontal spawn position that frames the central card
 * rather than clustering heavily over the central proposal card and mascot.
 * @returns {number} Viewport width percentage (vw)
 */
function getDistributedSpawnX() {
    const roll = Math.random();
    if (roll < 0.40) {
        // Left flank (3vw - 32vw)
        return parseFloat((Math.random() * 29 + 3).toFixed(1));
    } else if (roll < 0.80) {
        // Right flank (68vw - 97vw)
        return parseFloat((Math.random() * 29 + 68).toFixed(1));
    } else {
        // Subtle central depth (32vw - 68vw)
        return parseFloat((Math.random() * 36 + 32).toFixed(1));
    }
}

/**
 * Spawns a single floating particle using rich, scalable SVG vector artwork mapped
 * specifically to the active occasion (Birthday, Anniversary, Graduation, etc.)
 * while strictly respecting the device capability system and performance modes.
 *
 * @param {object} [options]
 * @param {string} [options.occasion] Optional explicit occasion override
 * @param {string} [options.theme] Optional explicit theme override
 * @param {number} [options.initialYPercent] Optional initial vertical percentage (for field seeding)
 * @param {number} [options.maxAllowedParticles] Optional dynamic cap override (e.g. for burst overshoots)
 */
export function spawnFloatingParticle(options = {}) {
    if (typeof document === 'undefined' || document.hidden || !floatingContainer) return;

    // Leverage Device Capability Engine & Performance Mode
    const deviceConfig = getDeviceParticleConfig();

    // Respect device performance budget and max concurrent particle cap
    const maxCap = typeof options.maxAllowedParticles === 'number'
        ? options.maxAllowedParticles
        : deviceConfig.maxActiveParticles;

    if (floatingContainer.childElementCount >= maxCap) return;

    // Dynamically resolve active occasion and map to curated SVG asset collection
    const activeOccasion = resolveActiveOccasion(options);
    const occConfig = OCCASIONS[activeOccasion] || OCCASIONS.valentine;

    // Retrieve curated particle SVG and definition based on active occasion & device profile
    const {svg, occasionKey, definition} = getOccasionParticleSvg(activeOccasion, undefined, deviceConfig);
    if (!svg) return;

    const particleEl = document.createElement('span');
    const tier = definition.tier || 'mid';
    const material = definition.material || 'sparkle';

    particleEl.className = `floating-particle particle-svg-icon particle-${occasionKey} particle-tier-${tier} particle-${tier} material-${material} particle-${material} ${material === 'sparkle' ? 'particle-spark particle-sparkle material-spark' : ''} ${material === 'bubble' ? 'particle-up' : ''}`;
    particleEl.setAttribute('data-particle-occasion', occasionKey);
    particleEl.setAttribute('data-particle-theme', occasionKey);
    particleEl.setAttribute('data-occasion', occasionKey);
    particleEl.setAttribute('data-theme', occasionKey);
    particleEl.setAttribute('data-tier', tier);
    particleEl.setAttribute('data-material', material);

    // Visible, atmospheric dimensions based on tier, definition scale, and device profile
    // Far tier: 1.35rem - 1.85rem (~22px - 30px) - clearly visible background celebratory motifs
    // Mid tier: 2.30rem - 3.40rem (~37px - 55px) - prominent crisp celebration motifs
    // Near tier: 3.60rem - 5.40rem (~58px - 86px) - hero celebration accents
    const baseRem = tier === 'far' ? 1.35 : (tier === 'mid' ? 1.85 : 2.5);
    const tierMultiplier = deviceConfig.isMobile ? 0.9 : 1.0;
    const randScale = (Math.random() * (definition.maxScale - definition.minScale) + definition.minScale);
    const finalDimensionRem = (Math.max(1.1, baseRem * randScale * tierMultiplier)).toFixed(2);

    // Opacity based on tier & definition, calibrated to guarantee visibility against ambient background
    const minOp = Math.max(0.55, definition.minOpacity);
    const maxOp = Math.max(minOp + 0.15, Math.min(1.0, definition.maxOpacity * 1.1));
    const randOpacity = (Math.random() * (maxOp - minOp) + minOp).toFixed(2);

    // Physical motion parameters calibrated to material and device tier
    let baseDuration = 7.0;
    if (material === 'petal') {
        baseDuration = deviceConfig.isMobile ? 8.0 : 9.0;
    } else if (material === 'confetti') {
        baseDuration = deviceConfig.isMobile ? 4.8 : 5.6;
    } else if (material === 'snow') {
        baseDuration = deviceConfig.isMobile ? 8.5 : 10.0;
    } else if (material === 'sparkle') {
        baseDuration = deviceConfig.isMobile ? 6.5 : 7.8;
    } else if (material === 'bubble') {
        baseDuration = deviceConfig.isMobile ? 6.0 : 7.2;
    }

    // Far particles move slightly slower for optical parallax depth
    if (tier === 'far') baseDuration *= 1.25;
    if (tier === 'near') baseDuration *= 1.1;

    // Low power devices receive longer durations (smoother, lower frequency position changes)
    if (deviceConfig.isLowPower) baseDuration *= 1.15;

    const duration = (Math.random() * 2.0 + baseDuration).toFixed(2);

    // Calculate sway and spin according to device 3D transform capability
    let swayX = '0px';
    let spin = '0deg';
    if (!deviceConfig.prefersReducedMotion) {
        if (deviceConfig.isLowPower || deviceConfig.isMobile) {
            // Clamped 2D transforms for battery saving
            swayX = (Math.random() * 36 - 18).toFixed(0) + 'px';
            spin = (Math.random() * 50 - 25).toFixed(0) + 'deg';
        } else {
            // Full desktop physical dynamics
            swayX = (Math.random() * 60 - 30).toFixed(0) + 'px';
            spin = (Math.random() * 80 - 40).toFixed(0) + 'deg';
        }
    }

    const startX = getDistributedSpawnX();

    particleEl.style.left = `${startX}vw`;
    particleEl.style.width = `${finalDimensionRem}rem`;
    particleEl.style.height = `${finalDimensionRem}rem`;
    particleEl.style.setProperty('--target-opacity', randOpacity);
    particleEl.style.setProperty('--sway-x', swayX);
    particleEl.style.setProperty('--spin', spin);
    particleEl.style.setProperty('--duration', `${duration}s`);
    particleEl.style.animationDuration = `${duration}s`;

    if (deviceConfig.prefersReducedMotion) {
        particleEl.classList.add('reduced-motion-particle');
        const stationaryY = (Math.random() * 65 + 15).toFixed(1);
        particleEl.style.top = `${stationaryY}vh`;
        particleEl.style.setProperty('--reduced-top', `${stationaryY}vh`);
    } else if (typeof options.initialYPercent === 'number') {
        // Initial field seeding: start midway with negative animation delay calibrated to initial position
        const progress = Math.min(Math.max(options.initialYPercent / 100, 0.05), 0.85);
        const elapsed = (progress * parseFloat(duration)).toFixed(2);
        particleEl.style.animationDelay = `-${elapsed}s`;
    }

    particleEl.innerHTML = svg;
    floatingContainer.appendChild(particleEl);

    // Diagnostic logging of computed styles to browser console to inspect rendering
    logParticleDiagnostics(floatingContainer, particleEl);

    // Controlled cleanup
    let cleanedUp = false;
    const cleanup = () => {
        if (!cleanedUp && particleEl.parentNode) {
            cleanedUp = true;
            particleEl.remove();
        }
    };

    // Ensure animationend only fires when the particle element completes its own animation
    particleEl.addEventListener('animationend', (event) => {
        if (event && event.target !== particleEl) return;
        cleanup();
    }, {once: true});

    // In reduced-motion mode, particles breathe in place infinitely and are not removed by timer
    if (!deviceConfig.prefersReducedMotion) {
        const safeDuration = parseFloat(duration) || 8.0;
        // Generous buffer (+3500ms) guarantees the particle completely finishes animation and moves off-screen
        setTimeout(cleanup, safeDuration * 1000 + 3500);
    }
}

let diagnosticsLogged = false;

/**
 * Diagnostic logger for verifying computed styles and rendering in real browser sessions.
 */
function logParticleDiagnostics(container, sampleParticle = null) {
    if (diagnosticsLogged || typeof window === 'undefined' || !window.getComputedStyle) return;
    diagnosticsLogged = true;
    try {
        const cStyle = container ? window.getComputedStyle(container) : null;
        const pStyle = sampleParticle ? window.getComputedStyle(sampleParticle) : null;
        const svgEl = sampleParticle ? sampleParticle.querySelector('svg') : null;
        const svgStyle = svgEl ? window.getComputedStyle(svgEl) : null;

        console.group?.('🌸 [Particle Diagnostics] Computed Styles & Visibility Audit');
        console.log('Container (#floating-hearts-container):', {
            exists: Boolean(container),
            childCount: container ? container.childElementCount : 0,
            display: cStyle ? cStyle.display : 'N/A',
            visibility: cStyle ? cStyle.visibility : 'N/A',
            opacity: cStyle ? cStyle.opacity : 'N/A',
            zIndex: cStyle ? cStyle.zIndex : 'N/A',
            position: cStyle ? cStyle.position : 'N/A',
            overflow: cStyle ? cStyle.overflow : 'N/A',
            dimensions: cStyle ? `${cStyle.width} x ${cStyle.height}` : 'N/A'
        });

        if (sampleParticle && pStyle) {
            console.log('Active Spawned Particle:', {
                classes: sampleParticle.className,
                occasion: sampleParticle.getAttribute('data-particle-occasion'),
                tier: sampleParticle.getAttribute('data-tier'),
                material: sampleParticle.getAttribute('data-material'),
                display: pStyle.display,
                visibility: pStyle.visibility,
                opacity: pStyle.opacity,
                position: pStyle.position,
                top: pStyle.top,
                left: pStyle.left,
                dimensions: `${pStyle.width} x ${pStyle.height}`,
                zIndex: pStyle.zIndex,
                animationName: pStyle.animationName,
                animationDuration: pStyle.animationDuration,
                animationPlayState: pStyle.animationPlayState,
                transform: pStyle.transform,
                hasSvg: Boolean(svgEl),
                svgDimensions: svgStyle ? `${svgStyle.width} x ${svgStyle.height}` : 'N/A',
                svgDisplay: svgStyle ? svgStyle.display : 'N/A',
                svgVisibility: svgStyle ? svgStyle.visibility : 'N/A'
            });
        }
        console.groupEnd?.();
    } catch (e) {
        // Silently catch logging errors in test environments
    }
}

/**
 * Spawns a coordinated burst of celebratory occasion particles (e.g., on card acceptance or dodge),
 * respecting burst counts, burst cooldowns, and a strict +20% overshoot limit.
 *
 * @param {number} [originXPercent=50]
 * @param {number} [originYPercent=50]
 * @param {string} [occasionKey]
 */
export function spawnOccasionParticleBurst(originXPercent = 50, originYPercent = 50, occasionKey = null) {
    if (typeof document === 'undefined' || !floatingContainer) return;

    const deviceConfig = getDeviceParticleConfig();

    // 1. Check reduced motion
    if (deviceConfig.prefersReducedMotion || deviceConfig.burstCount <= 0) return;

    // 2. Cooldown check to prevent rapid spamming from mechanical pulses
    const now = Date.now();
    if (now - lastBurstTimestamp < deviceConfig.burstCooldownMs) {
        return;
    }
    lastBurstTimestamp = now;

    // 3. Max allowable particles during burst (maximum ~20% above maxActiveParticles)
    const maxBurstCapacity = Math.round(deviceConfig.maxActiveParticles * 1.20);
    const availableSlots = Math.max(0, maxBurstCapacity - floatingContainer.childElementCount);
    if (availableSlots <= 0) return;

    const occ = occasionKey || resolveActiveOccasion();
    const burstCount = Math.min(deviceConfig.burstCount, availableSlots);

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            spawnFloatingParticle({
                occasion: occ,
                initialYPercent: originYPercent + (Math.random() * 10 - 5),
                maxAllowedParticles: maxBurstCapacity
            });
        }, i * 90);
    }
}

/**
 * Clears all currently floating particles (used on occasion reset or modal switch).
 */
export function clearFloatingParticles() {
    if (floatingContainer) {
        floatingContainer.innerHTML = '';
    }
}

/**
 * Single scheduler tick with ±20% jitter.
 * Guarantees exactly ONE active scheduler loop at all times.
 */
function scheduleNextTick() {
    if (!isSpawningActive) return;
    if (spawnerTimeoutId) {
        clearTimeout(spawnerTimeoutId);
        spawnerTimeoutId = null;
    }

    const config = getDeviceParticleConfig();
    const baseInterval = config.spawnIntervalMs;
    const jitterRatio = config.spawnJitterRatio || SPAWN_JITTER_RATIO;
    const jitter = (Math.random() * 2 - 1) * jitterRatio * baseInterval;
    const delay = Math.max(80, Math.round(baseInterval + jitter));

    spawnerTimeoutId = setTimeout(() => {
        spawnerTimeoutId = null;
        if (isSpawningActive && typeof document !== 'undefined' && !document.hidden) {
            spawnFloatingParticle();
        }
        scheduleNextTick();
    }, delay);
}

/**
 * Starts the single particle spawner, seeding an initial field of staggered particles
 * based on the active performance profile.
 */
export function startEmojiSpawner() {
    if (isSpawningActive) return; // Single spawner guarantee!
    isSpawningActive = true;

    const deviceConfig = getDeviceParticleConfig();

    // Seed initial field so screen is immediately atmospheric
    const initialCount = deviceConfig.initialFieldCount;
    for (let i = 0; i < initialCount; i++) {
        const initialY = 15 + i * (65 / Math.max(1, initialCount));
        spawnFloatingParticle({ initialYPercent: initialY });
    }

    scheduleNextTick();

    // Bind visibility listener once to conserve battery when tab is hidden
    if (typeof document !== 'undefined' && !visibilityListenerBound) {
        visibilityListenerBound = true;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (spawnerTimeoutId) {
                    clearTimeout(spawnerTimeoutId);
                    spawnerTimeoutId = null;
                }
            } else if (isSpawningActive && !spawnerTimeoutId) {
                scheduleNextTick();
            }
        });
    }
}

/**
 * Stops the floating particle spawner.
 */
export function stopEmojiSpawner() {
    isSpawningActive = false;
    if (spawnerTimeoutId) {
        clearTimeout(spawnerTimeoutId);
        spawnerTimeoutId = null;
    }
}

/**
 * Dynamically updates particle performance mode without requiring page reload.
 * Adjusts spawner cadence, tier distribution, and smoothly prunes excess particles.
 *
 * @param {string} [newMode] 'light' | 'heavy'
 * @param {object} [options]
 * @param {boolean} [options.immediate=false]
 */
export function updateParticlePerformance(newMode = null, options = {}) {
    const config = getDeviceParticleConfig(newMode);

    if (!floatingContainer && typeof document !== 'undefined') {
        floatingContainer = document.getElementById('floating-hearts-container');
    }

    // If changing from Heavy to Light and active count exceeds limit, smoothly prune excess particles
    if (floatingContainer && floatingContainer.childElementCount > config.maxActiveParticles) {
        const excess = floatingContainer.childElementCount - config.maxActiveParticles;
        const children = Array.from(floatingContainer.children);
        // Prune far tier or oldest particles first for visual grace
        const farTier = children.filter(c => c.getAttribute('data-tier') === 'far');
        const others = children.filter(c => c.getAttribute('data-tier') !== 'far');
        const toPrune = [...farTier, ...others].slice(0, excess);
        toPrune.forEach(el => {
            el.classList.add('particle-pruning');
            if (options && options.immediate) {
                if (el.parentNode) el.parentNode.removeChild(el);
            } else {
                el.style.transition = 'opacity 0.35s ease-out';
                el.style.opacity = '0';
                setTimeout(() => {
                    if (el.parentNode) el.parentNode.removeChild(el);
                }, 350);
            }
        });
    }

    // Immediately reschedule next tick with the new cadence and budget
    if (isSpawningActive) {
        if (spawnerTimeoutId) {
            clearTimeout(spawnerTimeoutId);
            spawnerTimeoutId = null;
        }
        scheduleNextTick();
    }
}

/**
 * Initializes the particle system, binds to the container element,
 * and sets up reactive state synchronization.
 * @param {object} [options]
 */
export function initParticles(options = {}) {
    floatingContainer = document.getElementById('floating-hearts-container');
    if (options.autoStart !== false) {
        startEmojiSpawner();
    }

    // Reactively adjust particle performance when appState changes
    if (typeof appState !== 'undefined' && appState.subscribe) {
        appState.subscribe((newState, oldState, changedKeys) => {
            if (changedKeys && changedKeys.includes('particlePerformance')) {
                updateParticlePerformance(newState.particlePerformance);
            }
        });
    }
}

