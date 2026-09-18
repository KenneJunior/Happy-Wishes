import { JSDOM } from 'jsdom';
import { OCCASION_PARTICLES, SVG_REGISTRY, getOccasionParticleSvg, resolveOccasionKey, getOccasionVariantCount, listSupportedOccasions } from '../js/ui/effects/svg-particles.js';
import { 
    spawnFloatingParticle, 
    startEmojiSpawner, 
    stopEmojiSpawner, 
    initParticles, 
    clearFloatingParticles,
    updateParticlePerformance,
    PARTICLE_PERFORMANCE_MODES,
    SPAWN_JITTER_RATIO,
    OCCASION_SVG_COLLECTIONS,
    THEME_SVG_COLLECTIONS,
    resolveActiveOccasion,
    getActiveOccasion,
    getActiveThemeAttribute,
    getOccasionParticleCollection,
    getThemeParticleCollection,
    getThemeParticleSvg,
    normalizeOccasionKey,
    normalizeThemeName,
    getDeviceParticleConfig,
    spawnOccasionParticleBurst
} from '../js/ui/effects/particles.js';
import { DeviceManager } from '../js/core/device.js';
import { appState } from '../js/core/state.js';

console.log("=== Premium Atmospheric Particle System — Verification Suite ===");

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="floating-hearts-container"></div></body></html>', {
    url: 'http://localhost:3000/'
});

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(dom.window.document, 'hidden', { value: false, configurable: true });
try {
    Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true, writable: true });
} catch {
    // navigator already present in Node 22
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`❌ FAIL: ${message}`);
        failed++;
    }
}

// 1. Supported Occasions & Particle Diversity
const supportedOccasions = ['valentine', 'birthday', 'anniversary', 'graduation', 'christmas', 'newyear', 'easter', 'custom'];
const listed = listSupportedOccasions();
assert(supportedOccasions.every(occ => listed.includes(occ)), "All 8 celebration occasions are registered");

// 2. Validate every particle definition and SVG XML parsing
const parser = new dom.window.DOMParser();
let totalParticlesCount = 0;
let validSvgCount = 0;
let hasAllTiers = true;
let allIdsUnique = true;
const seenParticleIds = new Set();

for (const occasion of supportedOccasions) {
    const particles = OCCASION_PARTICLES[occasion];
    assert(Array.isArray(particles) && particles.length >= 7, `${occasion} has at least 7 distinct particle variants (actual: ${particles.length})`);
    totalParticlesCount += particles.length;

    const tiers = new Set(particles.map(p => p.tier));
    if (!tiers.has('far') || !tiers.has('mid') || !tiers.has('near')) {
        hasAllTiers = false;
    }

    particles.forEach(p => {
        if (seenParticleIds.has(p.id)) {
            allIdsUnique = false;
        }
        seenParticleIds.add(p.id);

        const svgString = p.svg(12345);
        const parsedDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const parseError = parsedDoc.querySelector('parsererror');
        if (!parseError && parsedDoc.querySelector('svg')) {
            validSvgCount++;
        } else {
            console.error(`SVG parse error in ${p.id}:`, parseError ? parseError.textContent : 'No SVG element found');
        }
    });
}

assert(hasAllTiers, "Every occasion contains all 3 depth tiers ('far', 'mid', 'near')");
assert(allIdsUnique, `All ${seenParticleIds.size} particle definitions have unique global IDs`);
assert(validSvgCount === totalParticlesCount, `All ${totalParticlesCount} SVG variants parse cleanly as valid SVG XML`);

// 3. Test Christmas Multiple Snowflake Silhouettes
const xmasFlakes = OCCASION_PARTICLES.christmas.filter(p => p.material === 'snow');
assert(xmasFlakes.length >= 4, `Christmas contains multiple distinct snowflake/snow silhouettes (found: ${xmasFlakes.length})`);

// 4. Test Collision-Free Defs IDs
const testVal = getOccasionParticleSvg('valentine');
const testVal2 = getOccasionParticleSvg('valentine');
assert(testVal.svg.length > 0 && testVal2.svg.length > 0, "Generates populated SVG strings");

// 5. Test DOM Spawner Lifecycle
initParticles({ autoStart: false });
const container = document.getElementById('floating-hearts-container');

appState.updateState({ occasion: 'valentine' });
DeviceManager.detect();
DeviceManager.maxParticles = 6;

spawnFloatingParticle();
assert(container.childElementCount === 1, "Spawned particle inserted into floating-hearts-container");

const spawnedEl = container.firstElementChild;
assert(spawnedEl.classList.contains('floating-particle'), "Particle has .floating-particle class");
assert(spawnedEl.classList.contains('particle-svg-icon'), "Particle has .particle-svg-icon class");
assert(spawnedEl.classList.contains('particle-valentine'), "Particle has occasion class .particle-valentine");
assert(/particle-tier-(far|mid|near)/.test(spawnedEl.className), "Particle has depth tier class");
assert(/material-(petal|confetti|snow|sparkle|heart|star|bubble)/.test(spawnedEl.className), "Particle has material motion class");

// 6. Test Occasion Switching
appState.updateState({ occasion: 'christmas' });
spawnFloatingParticle();
const secondEl = container.children[1];
assert(secondEl.classList.contains('particle-christmas'), "Switching occasion immediately spawns occasion-specific particle");

// 7. Test Device Performance Budget Cap
const activeMax = getDeviceParticleConfig().maxActiveParticles;
for (let i = 0; i < activeMax + 10; i++) {
    spawnFloatingParticle();
}
assert(container.childElementCount <= activeMax, `Container respects active particle throttle limit (${container.childElementCount} <= ${activeMax})`);

// 8. Test Reduced Motion Mode
container.innerHTML = '';
DeviceManager.prefersReducedMotion = true;
spawnFloatingParticle();
const reducedEl = container.firstElementChild;
assert(reducedEl && reducedEl.classList.contains('reduced-motion-particle'), "Reduced motion mode sets .reduced-motion-particle class");
assert(reducedEl.style.top.length > 0, "Reduced motion particle has stationary vertical position");
DeviceManager.prefersReducedMotion = false;

// 9. Test Clear & Stop Spawner
startEmojiSpawner();
assert(container.childElementCount > 0, "startEmojiSpawner seeds initial staggered field");
stopEmojiSpawner();
clearFloatingParticles();
assert(container.childElementCount === 0, "clearFloatingParticles resets container cleanly");

// 10. Dynamic SVG Asset Collection Mapping Based on Active [theme] Attribute
console.log("\n--- Suite 10: Dynamic [theme] Attribute SVG Collection Mapping ---");

// Test collection mapping integrity
const testOccasions = ['birthday', 'anniversary', 'valentine', 'graduation', 'christmas', 'newyear', 'easter', 'custom'];
for (const occ of testOccasions) {
    const collection = getThemeParticleCollection(occ);
    assert(Array.isArray(collection) && collection.length >= 7, `Theme '${occ}' maps directly to curated SVG collection (${collection.length} items)`);
    assert(THEME_SVG_COLLECTIONS[occ] === collection, `THEME_SVG_COLLECTIONS['${occ}'] holds reference to curated asset list`);
}

// Test DOM attribute resolution: body[theme]
container.innerHTML = '';
document.body.setAttribute('theme', 'birthday');
assert(getActiveThemeAttribute() === 'birthday', "getActiveThemeAttribute resolves 'birthday' from document.body[theme]");
spawnFloatingParticle();
const bdayEl = container.firstElementChild;
assert(bdayEl && bdayEl.classList.contains('particle-birthday'), "Spawning with body[theme='birthday'] creates .particle-birthday element");
assert(bdayEl.getAttribute('data-particle-theme') === 'birthday', "Particle element has data-particle-theme='birthday'");

// Test DOM attribute resolution: container[theme] overriding body
container.innerHTML = '';
document.body.setAttribute('theme', 'valentine');
container.setAttribute('theme', 'anniversary');
assert(getActiveThemeAttribute() === 'anniversary', "container[theme] takes precedence or resolves 'anniversary'");
spawnFloatingParticle();
const annivEl = container.firstElementChild;
assert(annivEl && annivEl.classList.contains('particle-anniversary'), "Spawning with container[theme='anniversary'] creates .particle-anniversary element");
assert(annivEl.getAttribute('data-particle-theme') === 'anniversary', "Particle element has data-particle-theme='anniversary'");
container.removeAttribute('theme');

// Test explicit options.theme override
container.innerHTML = '';
document.body.setAttribute('theme', 'easter');
spawnFloatingParticle({ theme: 'graduation' });
const gradEl = container.firstElementChild;
assert(gradEl && gradEl.classList.contains('particle-graduation'), "Options theme: 'graduation' overrides active DOM theme");
assert(gradEl.getAttribute('data-particle-theme') === 'graduation', "Particle element has data-particle-theme='graduation'");

// Test Christmas theme attribute
container.innerHTML = '';
document.body.setAttribute('theme', 'christmas');
spawnFloatingParticle();
const xmasEl = container.firstElementChild;
assert(xmasEl && xmasEl.classList.contains('particle-christmas'), "Spawning with body[theme='christmas'] creates .particle-christmas element");

// Test New Year theme attribute
container.innerHTML = '';
document.body.setAttribute('theme', 'newyear');
spawnFloatingParticle();
const nyeEl = container.firstElementChild;
assert(nyeEl && nyeEl.classList.contains('particle-newyear'), "Spawning with body[theme='newyear'] creates .particle-newyear element");

// Test Easter theme attribute
container.innerHTML = '';
document.body.setAttribute('theme', 'easter');
spawnFloatingParticle();
const easterEl = container.firstElementChild;
assert(easterEl && easterEl.classList.contains('particle-easter'), "Spawning with body[theme='easter'] creates .particle-easter element");

// Cleanup test attributes
document.body.removeAttribute('theme');
container.removeAttribute('theme');
clearFloatingParticles();

// 11. Specific Occasion Asset Mapping & Device Capability System Integration
console.log("\n--- Suite 11: Occasion Asset Mapping & Device Capability System ---");

// Test explicit OCCASION_SVG_COLLECTIONS keys
const requiredOccasions = ['birthday', 'anniversary', 'graduation', 'valentine', 'christmas', 'newyear', 'easter', 'custom'];
for (const occKey of requiredOccasions) {
    assert(OCCASION_SVG_COLLECTIONS[occKey] !== undefined, `OCCASION_SVG_COLLECTIONS contains '${occKey}'`);
    assert(Array.isArray(OCCASION_SVG_COLLECTIONS[occKey]), `'${occKey}' collection is an array of particle definitions`);
    assert(OCCASION_SVG_COLLECTIONS[occKey].length >= 7, `'${occKey}' has >= 7 curated SVG vector variants`);
}

// Test resolveActiveOccasion resolution
assert(resolveActiveOccasion({ occasion: 'birthday' }) === 'birthday', "resolveActiveOccasion resolves options.occasion: birthday");
assert(resolveActiveOccasion({ occasion: 'anniversary' }) === 'anniversary', "resolveActiveOccasion resolves options.occasion: anniversary");
assert(resolveActiveOccasion({ occasion: 'graduation' }) === 'graduation', "resolveActiveOccasion resolves options.occasion: graduation");
assert(resolveActiveOccasion({ theme: 'occasion-graduation' }) === 'graduation', "resolveActiveOccasion normalizes 'occasion-graduation'");
assert(resolveActiveOccasion({ activeOccasion: 'bday' }) === 'birthday', "resolveActiveOccasion normalizes alias 'bday' -> 'birthday'");
assert(resolveActiveOccasion({ occasion: 'wedding' }) === 'anniversary', "resolveActiveOccasion normalizes alias 'wedding' -> 'anniversary'");
assert(resolveActiveOccasion({ occasion: 'diploma' }) === 'graduation', "resolveActiveOccasion normalizes alias 'diploma' -> 'graduation'");

// Test Device Capability Config - Desktop profile (Heavy & Light)
DeviceManager.isMobile = false;
DeviceManager.isLowPower = false;
DeviceManager.prefersReducedMotion = false;

// Desktop Heavy
let configHeavy = getDeviceParticleConfig('heavy');
assert(!configHeavy.isMobile && !configHeavy.prefersReducedMotion, "Desktop heavy profile detected accurately");
assert(configHeavy.maxActiveParticles === 55, "Desktop heavy particle capacity is 55");
assert(configHeavy.spawnIntervalMs === 300, "Desktop heavy spawn interval is 300ms");
assert(configHeavy.initialFieldCount === 14, "Desktop heavy initial field count is 14");
assert(configHeavy.burstCount === 14, "Desktop heavy burst count is 14");
assert(configHeavy.allowNearTier === true, "Desktop heavy allows near-tier particles");
assert(configHeavy.enable3DTransforms === true, "Desktop heavy enables 3D transforms");
assert(configHeavy.spawnJitterRatio === 0.20, "Desktop heavy has 20% timing jitter");

// Desktop Light
let configLight = getDeviceParticleConfig('light');
assert(configLight.maxActiveParticles === 28, "Desktop light particle capacity is 28");
assert(configLight.spawnIntervalMs === 800, "Desktop light spawn interval is 800ms");
assert(configLight.initialFieldCount === 8, "Desktop light initial field count is 8");
assert(configLight.burstCount === 8, "Desktop light burst count is 8");
assert(configLight.burstCooldownMs === 1400, "Desktop light burst cooldown is 1400ms");

// Test Device Capability Config - Mobile profile (Heavy & Light)
DeviceManager.isMobile = true;
DeviceManager.isLowPower = false;

// Mobile Heavy (Active, responsive, alive on mobile)
let mobHeavy = getDeviceParticleConfig('heavy');
assert(mobHeavy.isMobile === true, "Mobile heavy profile detected accurately");
assert(mobHeavy.maxActiveParticles === 38, "Mobile heavy max active particles is 38");
assert(mobHeavy.spawnIntervalMs === 450, "Mobile heavy spawn interval is 450ms");
assert(mobHeavy.initialFieldCount === 10, "Mobile heavy initial field count is 10");
assert(mobHeavy.burstCount === 10, "Mobile heavy burst count is 10");
assert(mobHeavy.burstCooldownMs === 900, "Mobile heavy burst cooldown is 900ms");
assert(mobHeavy.allowNearTier === true, "Mobile heavy allows near tier");
assert(mobHeavy.enable3DTransforms === false, "Mobile disables heavy 3D matrix transforms");
assert(mobHeavy.spawnJitterRatio === 0.20, "Mobile heavy has 20% timing jitter");

// Mobile Light (Battery-saver / constrained mode)
let mobLight = getDeviceParticleConfig('light');
assert(mobLight.maxActiveParticles === 18, "Mobile light max active particles is 18");
assert(mobLight.spawnIntervalMs === 1200, "Mobile light spawn interval is 1200ms");
assert(mobLight.initialFieldCount === 5, "Mobile light initial field count is 5");
assert(mobLight.burstCount === 5, "Mobile light burst count is 5");
assert(mobLight.burstCooldownMs === 1800, "Mobile light burst cooldown is 1800ms");
assert(mobLight.tierDistribution.near === 0.10, "Mobile light restricts near-tier particles to 10%");

// Test live performance switching and pruning
container.innerHTML = '';
// Populate container with 25 particles
for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'floating-particle particle-valentine';
    container.appendChild(el);
}
assert(container.childElementCount === 25, "Container seeded with 25 particles");
// Switch to mobile light mode (capacity: 18)
updateParticlePerformance('light', { immediate: true });
assert(container.childElementCount <= 18, `updateParticlePerformance('light') pruned excess particles to capacity (${container.childElementCount} <= 18)`);

// Test Device Capability Config - Reduced Motion Override
DeviceManager.prefersReducedMotion = true;
// Even if 'heavy' mode is requested, reduced motion strictly takes highest priority
let configRM = getDeviceParticleConfig('heavy');
assert(configRM.prefersReducedMotion === true, "Reduced motion preference detected");
assert(configRM.maxActiveParticles === 2, "Reduced motion strictly overrides heavy mode and limits to 2 stationary particles");
assert(configRM.spawnIntervalMs >= 4000, "Reduced motion enforces slow spawn interval >= 4000ms");
assert(configRM.burstCount === 0, "Reduced motion disables bursts completely");
assert(configRM.enable3DTransforms === false, "Reduced motion disables 3D transforms");

// Spawning with reduced motion
container.innerHTML = '';
spawnFloatingParticle({ occasion: 'graduation' });
const gradParticle = container.firstElementChild;
assert(gradParticle && gradParticle.classList.contains('reduced-motion-particle'), "Spawned particle in reduced motion receives .reduced-motion-particle");
assert(gradParticle.classList.contains('particle-graduation'), "Particle has .particle-graduation class");
assert(gradParticle.getAttribute('data-particle-occasion') === 'graduation', "Particle has data-particle-occasion='graduation'");
assert(gradParticle.style.getPropertyValue('--sway-x') === '0px', "Reduced motion sway is 0px");
assert(gradParticle.style.getPropertyValue('--spin') === '0deg', "Reduced motion spin is 0deg");

// Test spawnOccasionParticleBurst under reduced motion (should not spawn burst)
clearFloatingParticles();
spawnOccasionParticleBurst(50, 50, 'birthday');
assert(container.childElementCount === 0, "spawnOccasionParticleBurst safely suppresses burst under reduced motion");

// Reset device manager to standard desktop
DeviceManager.isMobile = false;
DeviceManager.isLowPower = false;
DeviceManager.prefersReducedMotion = false;
updateParticlePerformance('heavy');

clearFloatingParticles();

console.log(`\n=== Verification Complete: ${passed} passed, ${failed} failed ===`);
process.exit(failed > 0 ? 1 : 0);
