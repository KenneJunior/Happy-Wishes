/**
 * Scalable SVG Particle Registry & Generator Library
 * 
 * Provides vector-crisp, multi-layered SVG particles for all celebration occasions.
 * Designed to be modular and scalable:
 * - Each occasion maps to an array of SVG generator functions.
 * - To add or edit SVGs, simply edit the generator functions or call `registerParticleSvg()`.
 * - All SVGs share a standard 36x36 coordinate space and use unique IDs for gradient defs.
 */

let svgIdCounter = 0;

/**
 * Generates a unique integer ID to prevent gradient defs collisions across particles.
 * @returns {number}
 */
export function getNextSvgId() {
    return ++svgIdCounter;
}

/* ==========================================================================
   1. VALENTINE SVGS
   ========================================================================== */

/** Ruby Faceted Gemstone Heart with specular highlights */
function createValentineFacetedHeart(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Faceted Heart">
            <defs>
                <linearGradient id="vValGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff758c"/>
                    <stop offset="50%" stop-color="#ff2e63"/>
                    <stop offset="100%" stop-color="#880e4f"/>
                </linearGradient>
            </defs>
            <path d="M18,31 C18,31 4,21.5 4,11.5 C4,5.5 8.5,2 14,3.5 C16,4 17.5,5.5 18,7 C18.5,5.5 20,4 22,3.5 C27.5,2 32,5.5 32,11.5 C32,21.5 18,31 18,31 Z" fill="url(#vValGrad_${id})" stroke="#ffe4e6" stroke-width="0.8"/>
            <polygon points="18,7 22,12 18,17 14,12" fill="#ffffff" fill-opacity="0.38"/>
            <polygon points="14,12 18,17 18,30 8,16" fill="#ffffff" fill-opacity="0.16"/>
            <polygon points="22,12 18,17 18,30 28,16" fill="#ffffff" fill-opacity="0.08"/>
            <polygon points="22,3.5 28,6 28,16 22,12" fill="#ffffff" fill-opacity="0.25"/>
            <polygon points="14,3.5 8,6 8,16 14,12" fill="#ffffff" fill-opacity="0.45"/>
            <!-- Radiant Sparkle -->
            <polygon points="9,7 10,9 12,10 10,11 9,13 8,11 6,10 8,9" fill="#ffffff"/>
        </svg>
    `.trim();
}

/** Cupid Winged Golden Heart */
function createValentineWingedHeart(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Winged Heart">
            <defs>
                <linearGradient id="vWingGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
                <linearGradient id="vHeartGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff758c"/>
                    <stop offset="100%" stop-color="#e11d48"/>
                </linearGradient>
            </defs>
            <!-- Left Wing -->
            <path d="M14,16 C9,13 2,13 1,18 C0,22 8,22 13,20" fill="url(#vWingGrad_${id})" stroke="#fbbf24" stroke-width="0.7"/>
            <path d="M14,18 C10,16 4,17 3,21 C2,24 8,24 13,22" fill="url(#vWingGrad_${id})"/>
            <!-- Right Wing -->
            <path d="M22,16 C27,13 34,13 35,18 C36,22 28,22 23,20" fill="url(#vWingGrad_${id})" stroke="#fbbf24" stroke-width="0.7"/>
            <path d="M22,18 C26,16 32,17 33,21 C34,24 28,24 23,22" fill="url(#vWingGrad_${id})"/>
            <!-- Center Heart -->
            <path d="M18,27 C18,27 10,21 10,14.5 C10,10.5 13,8 16,9.5 C17,10 17.5,10.8 18,11.5 C18.5,10.8 19,10 20,9.5 C23,8 26,10.5 26,14.5 C26,21 18,27 18,27 Z" fill="url(#vHeartGrad_${id})" stroke="#ffffff" stroke-width="0.9"/>
            <circle cx="15" cy="13" r="1.3" fill="#ffffff" fill-opacity="0.8"/>
            <polygon points="27,6 28,8 30,9 28,10 27,12 26,10 24,9 26,8" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Intertwined Romance Twin Hearts */
function createValentineTwinHearts(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Twin Hearts">
            <defs>
                <linearGradient id="vTwinA_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fda4af"/>
                    <stop offset="100%" stop-color="#e11d48"/>
                </linearGradient>
                <linearGradient id="vTwinB_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f43f5e"/>
                    <stop offset="100%" stop-color="#9f1239"/>
                </linearGradient>
            </defs>
            <!-- Back Heart -->
            <path d="M23,28 C23,28 14,21 14,14 C14,9.5 17.5,7 21,8.5 C22,9 22.5,9.8 23,10.5 C23.5,9.8 24,9 25,8.5 C28.5,7 32,9.5 32,14 C32,21 23,28 23,28 Z" fill="url(#vTwinB_${id})" stroke="#ffe4e6" stroke-width="0.8"/>
            <!-- Front Heart Overlapping -->
            <path d="M14,25 C14,25 5,18 5,11 C5,6.5 8.5,4 12,5.5 C13,6 13.5,6.8 14,7.5 C14.5,6.8 15,6 16,5.5 C19.5,4 23,6.5 23,11 C23,18 14,25 14,25 Z" fill="url(#vTwinA_${id})" stroke="#ffffff" stroke-width="1"/>
            <circle cx="10" cy="9" r="1.3" fill="#ffffff" fill-opacity="0.85"/>
            <polygon points="28,4 29,6 31,7 29,8 28,10 27,8 25,7 27,6" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Blooming Crimson Velvet Rose */
function createValentineVelvetRose(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Velvet Rose">
            <defs>
                <linearGradient id="vRosePetal_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fb7185"/>
                    <stop offset="50%" stop-color="#e11d48"/>
                    <stop offset="100%" stop-color="#881337"/>
                </linearGradient>
                <linearGradient id="vLeafGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4ade80"/>
                    <stop offset="100%" stop-color="#15803d"/>
                </linearGradient>
            </defs>
            <!-- Green Leaves -->
            <path d="M18,22 C13,24 8,30 9,33 C13,34 17,28 18,22 Z" fill="url(#vLeafGrad_${id})"/>
            <path d="M18,22 C23,24 28,30 27,33 C23,34 19,28 18,22 Z" fill="url(#vLeafGrad_${id})"/>
            <!-- Outer Petals -->
            <circle cx="18" cy="15" r="11" fill="url(#vRosePetal_${id})" stroke="#fda4af" stroke-width="0.8"/>
            <!-- Petal Layers -->
            <path d="M10,13 C12,7 24,7 26,13 C24,20 12,20 10,13 Z" fill="#be123c"/>
            <path d="M13,11 C15,8 21,8 23,11 C22,16 14,16 13,11 Z" fill="#9f1239"/>
            <ellipse cx="18" cy="12" rx="3.5" ry="2.5" fill="#ffe4e6" fill-opacity="0.85"/>
            <!-- Sparkle -->
            <polygon points="30,8 31,10 33,11 31,12 30,14 29,12 27,11 29,10" fill="#fef08a"/>
        </svg>
    `.trim();
}

/** Sweet Ribbon Wrapped Heart Gift */
function createValentineRibbonHeart(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ribbon Heart">
            <defs>
                <linearGradient id="vRibbonHeart_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f43f5e"/>
                    <stop offset="100%" stop-color="#be123c"/>
                </linearGradient>
                <linearGradient id="vGoldRibbon_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="45%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
            </defs>
            <path d="M18,30 C18,30 5,20.5 5,11.5 C5,6.5 9,3 14,4.5 C16,5 17.5,6.2 18,7.5 C18.5,6.2 20,5 22,4.5 C27,3 31,6.5 31,11.5 C31,20.5 18,30 18,30 Z" fill="url(#vRibbonHeart_${id})" stroke="#fda4af" stroke-width="0.8"/>
            <!-- Vertical Ribbon -->
            <rect x="16.5" y="4.5" width="3" height="24" rx="1.5" fill="url(#vGoldRibbon_${id})"/>
            <!-- Horizontal Ribbon -->
            <rect x="6.5" y="13.5" width="23" height="3" rx="1.5" fill="url(#vGoldRibbon_${id})"/>
            <!-- Ribbon Bow -->
            <circle cx="18" cy="15" r="2.2" fill="#fffbeb"/>
            <polygon points="18,15 14,12 14,18" fill="url(#vGoldRibbon_${id})"/>
            <polygon points="18,15 22,12 22,18" fill="url(#vGoldRibbon_${id})"/>
            <polygon points="29,5 30,7 32,8 30,9 29,11 28,9 26,8 28,7" fill="#ffffff"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   2. BIRTHDAY SVGS
   ========================================================================== */

/** Multi-tier Frosted Birthday Cake with lit candle */
function createBirthdayLayerCake(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Birthday Cake">
            <defs>
                <linearGradient id="bCakeGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffedd5"/>
                    <stop offset="40%" stop-color="#fed7aa"/>
                    <stop offset="100%" stop-color="#fb923c"/>
                </linearGradient>
                <linearGradient id="bFrostGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fdf2f8"/>
                    <stop offset="50%" stop-color="#f472b6"/>
                    <stop offset="100%" stop-color="#db2777"/>
                </linearGradient>
                <linearGradient id="bFlameGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#fef08a"/>
                    <stop offset="70%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#ef4444"/>
                </linearGradient>
            </defs>
            <!-- Cake Base -->
            <rect x="5" y="19" width="26" height="13" rx="3.5" fill="url(#bCakeGrad_${id})" stroke="#fb923c" stroke-width="0.8"/>
            <path d="M5,19 C7,22 10,22 12,19 C14,22 17,22 19,19 C21,22 24,22 26,19 C28,22 31,22 31,19 L31,22 C31,22 28,24 26,22 C24,24 21,24 19,22 C17,24 14,24 12,22 C10,24 7,24 5,22 Z" fill="url(#bFrostGrad_${id})"/>
            <!-- Cake Top Tier -->
            <rect x="9" y="12" width="18" height="8" rx="2.5" fill="url(#bCakeGrad_${id})"/>
            <path d="M9,12 C11,14 13,14 15,12 C17,14 19,14 21,12 C23,14 25,14 27,12 L27,14 C27,14 25,16 23,14 C21,16 19,16 17,14 C15,16 13,16 11,14 C9,16 9,14 9,14 Z" fill="url(#bFrostGrad_${id})"/>
            <!-- Candle -->
            <rect x="17" y="6" width="2" height="6.5" rx="1" fill="#38bdf8"/>
            <!-- Candle Flame & Halo -->
            <circle cx="18" cy="4" r="3.2" fill="#ffd166" fill-opacity="0.35"/>
            <path d="M18,1 C16.5,3.5 16.5,5 18,6 C19.5,5 19.5,3.5 18,1 Z" fill="url(#bFlameGrad_${id})"/>
            <!-- Sprinkle Accents -->
            <circle cx="13" cy="25" r="1.1" fill="#ec4899"/>
            <circle cx="18" cy="26" r="1.1" fill="#3b82f6"/>
            <circle cx="23" cy="25" r="1.1" fill="#10b981"/>
        </svg>
    `.trim();
}

/** Wrapped Birthday Gift Box with glossy ribbon & bow */
function createBirthdayGiftBox(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Gift Box">
            <defs>
                <linearGradient id="bGiftGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#a78bfa"/>
                    <stop offset="50%" stop-color="#8b5cf6"/>
                    <stop offset="100%" stop-color="#6d28d9"/>
                </linearGradient>
                <linearGradient id="bGoldBow_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Box Body -->
            <rect x="6" y="14" width="24" height="18" rx="2.5" fill="url(#bGiftGrad_${id})" stroke="#c4b5fd" stroke-width="0.8"/>
            <!-- Box Lid -->
            <rect x="4.5" y="11" width="27" height="5" rx="1.8" fill="#7c3aed" stroke="#ddd6fe" stroke-width="0.8"/>
            <!-- Vertical Ribbon -->
            <rect x="16" y="11" width="4" height="21" fill="url(#bGoldBow_${id})"/>
            <!-- Horizontal Ribbon -->
            <rect x="6" y="21" width="24" height="3.5" fill="url(#bGoldBow_${id})"/>
            <!-- Top Bow Loops -->
            <path d="M18,11 C15,6 10,7 12,11 Z" fill="url(#bGoldBow_${id})"/>
            <path d="M18,11 C21,6 26,7 24,11 Z" fill="url(#bGoldBow_${id})"/>
            <circle cx="18" cy="11" r="1.8" fill="#fffbeb"/>
            <!-- Starburst -->
            <polygon points="30,7 31,9 33,10 31,11 30,13 29,11 27,10 29,9" fill="#fde047"/>
        </svg>
    `.trim();
}

/** Floating Helium Balloon with shiny highlight & curling string */
function createBirthdayBalloon(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Balloon">
            <defs>
                <linearGradient id="bBalloonGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff758c"/>
                    <stop offset="40%" stop-color="#ff2e63"/>
                    <stop offset="100%" stop-color="#9f1239"/>
                </linearGradient>
            </defs>
            <!-- Balloon Body -->
            <ellipse cx="18" cy="15" rx="12" ry="14" fill="url(#bBalloonGrad_${id})" stroke="#fda4af" stroke-width="0.8"/>
            <!-- Specular Highlight -->
            <ellipse cx="13.5" cy="10" rx="3.5" ry="5.5" transform="rotate(-25 13.5 10)" fill="#ffffff" fill-opacity="0.55"/>
            <!-- Balloon Tie Knot -->
            <polygon points="16.5,29 19.5,29 18,27.5" fill="#be123c"/>
            <!-- Curly Ribbon String -->
            <path d="M18,29 C17,31 21,32 18,34 C16,35 19,36 17,37" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <!-- Sparkle -->
            <polygon points="28,5 29,7 31,8 29,9 28,11 27,9 25,8 27,7" fill="#fef08a"/>
        </svg>
    `.trim();
}

/** Party Popper Confetti Cannon exploding with starbursts */
function createBirthdayPartyPopper(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Party Popper">
            <defs>
                <linearGradient id="bConeGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffd166"/>
                    <stop offset="50%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Popper Cone -->
            <polygon points="5,31 20,20 13,13" fill="url(#bConeGrad_${id})" stroke="#fbbf24" stroke-width="0.9"/>
            <ellipse cx="16.5" cy="16.5" rx="5" ry="2.5" transform="rotate(-45 16.5 16.5)" fill="#ef4444"/>
            <!-- Cone Stripes -->
            <path d="M8,28 L17,19" stroke="#3b82f6" stroke-width="1.8"/>
            <path d="M11,25 L18,18" stroke="#10b981" stroke-width="1.8"/>
            <!-- Exploding Confetti Elements -->
            <circle cx="27" cy="9" r="2" fill="#ec4899"/>
            <circle cx="22" cy="5" r="1.6" fill="#3b82f6"/>
            <circle cx="31" cy="17" r="1.8" fill="#10b981"/>
            <polygon points="27,12 28,14 30,15 28,16 27,18 26,16 24,15 26,14" fill="#ffd166"/>
            <polygon points="19,8 20,9.5 21.5,10 20,10.5 19,12 18,10.5 16.5,10 18,9.5" fill="#a855f7"/>
            <!-- Streamers -->
            <path d="M19,15 C23,13 25,17 30,13" stroke="#f43f5e" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        </svg>
    `.trim();
}

/** Sweet Frosted Cupcake with glowing cherry */
function createBirthdayCupcake(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cupcake">
            <defs>
                <linearGradient id="bCupWrap_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fed7aa"/>
                    <stop offset="100%" stop-color="#ea580c"/>
                </linearGradient>
                <linearGradient id="bFrostSwirl_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fdf2f8"/>
                    <stop offset="50%" stop-color="#f472b6"/>
                    <stop offset="100%" stop-color="#ec4899"/>
                </linearGradient>
            </defs>
            <!-- Wrapper -->
            <polygon points="8,19 28,19 25,32 11,32" fill="url(#bCupWrap_${id})" stroke="#c2410c" stroke-width="0.8"/>
            <line x1="12" y1="19" x2="14" y2="32" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.4"/>
            <line x1="18" y1="19" x2="18" y2="32" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.4"/>
            <line x1="24" y1="19" x2="22" y2="32" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.4"/>
            <!-- Frosting Swirls -->
            <circle cx="12" cy="18" r="5" fill="url(#bFrostSwirl_${id})"/>
            <circle cx="24" cy="18" r="5" fill="url(#bFrostSwirl_${id})"/>
            <circle cx="18" cy="16" r="6" fill="url(#bFrostSwirl_${id})"/>
            <path d="M14,14 C16,9 20,9 22,14 Z" fill="#fdf2f8"/>
            <!-- Cherry on Top -->
            <circle cx="18" cy="8.5" r="3.2" fill="#dc2626"/>
            <circle cx="17" cy="7.5" r="1" fill="#ffffff"/>
            <path d="M18,6 C20,3 23,4 23,2" stroke="#15803d" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <!-- Sprinkles -->
            <circle cx="14" cy="16" r="0.9" fill="#3b82f6"/>
            <circle cx="21" cy="16" r="0.9" fill="#eab308"/>
            <circle cx="18" cy="13" r="0.9" fill="#10b981"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   3. CHRISTMAS SVGS
   ========================================================================== */

/** Decorated Holiday Pine Tree with star & colorful baubles */
function createChristmasEvergreenTree(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Christmas Tree">
            <defs>
                <linearGradient id="cTreeGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#22c55e"/>
                    <stop offset="50%" stop-color="#15803d"/>
                    <stop offset="100%" stop-color="#052e16"/>
                </linearGradient>
            </defs>
            <!-- Trunk -->
            <rect x="15" y="28" width="6" height="6" rx="1.5" fill="#78350f"/>
            <!-- Bottom Boughs -->
            <polygon points="18,17 31,28 5,28" fill="url(#cTreeGrad_${id})" stroke="#86efac" stroke-width="0.8"/>
            <!-- Middle Boughs -->
            <polygon points="18,11 28,21 8,21" fill="url(#cTreeGrad_${id})" stroke="#86efac" stroke-width="0.8"/>
            <!-- Top Boughs -->
            <polygon points="18,5 24,14 12,14" fill="url(#cTreeGrad_${id})" stroke="#86efac" stroke-width="0.8"/>
            <!-- Golden Star on Top -->
            <polygon points="18,2 19.5,5.5 23,6 20.5,8.5 21,12 18,10 15,12 15.5,8.5 13,6 16.5,5.5" fill="#ffd166" stroke="#f59e0b" stroke-width="0.5"/>
            <!-- Colorful Baubles -->
            <circle cx="13" cy="24" r="1.6" fill="#ef4444"/>
            <circle cx="23" cy="24" r="1.6" fill="#3b82f6"/>
            <circle cx="18" cy="18" r="1.6" fill="#fbbf24"/>
            <circle cx="14" cy="13" r="1.4" fill="#ec4899"/>
            <circle cx="22" cy="13" r="1.4" fill="#e0e7ff"/>
            <circle cx="18" cy="25" r="1.5" fill="#ffffff"/>
        </svg>
    `.trim();
}

/** Intricate Geometric Ice Crystal Snowflake (6-fold symmetry) */
function createChristmasSnowflake(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Snowflake">
            <defs>
                <linearGradient id="cSnowGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="60%" stop-color="#bae6fd"/>
                    <stop offset="100%" stop-color="#38bdf8"/>
                </linearGradient>
            </defs>
            <g stroke="url(#cSnowGrad_${id})" stroke-width="1.6" stroke-linecap="round">
                <!-- 3 main axes -->
                <line x1="18" y1="3" x2="18" y2="33"/>
                <line x1="5" y1="10.5" x2="31" y2="25.5"/>
                <line x1="5" y1="25.5" x2="31" y2="10.5"/>
                <!-- Top / Bottom Chevrons -->
                <polyline points="14,8 18,5 22,8"/>
                <polyline points="14,28 18,31 22,28"/>
                <polyline points="15,12 18,9 21,12"/>
                <polyline points="15,24 18,27 21,24"/>
                <!-- Left Upper / Right Lower Chevrons -->
                <polyline points="9,8 7,12 11,13"/>
                <polyline points="25,23 29,24 27,28"/>
                <!-- Left Lower / Right Upper Chevrons -->
                <polyline points="9,28 7,24 11,23"/>
                <polyline points="25,13 29,12 27,8"/>
            </g>
            <!-- Center Core Crystal -->
            <circle cx="18" cy="18" r="3.2" fill="#ffffff" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="18" cy="18" r="1.3" fill="#0284c7"/>
        </svg>
    `.trim();
}

/** Golden Holiday Jingle Bell with velvet crimson ribbon */
function createChristmasJingleBell(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Jingle Bell">
            <defs>
                <linearGradient id="cBellGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="80%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Bell Dome -->
            <path d="M18,7 C12,7 8,14 8,24 L28,24 C28,14 24,7 18,7 Z" fill="url(#cBellGrad_${id})" stroke="#d97706" stroke-width="0.8"/>
            <!-- Bottom Rim -->
            <rect x="6" y="24" width="24" height="3.5" rx="1.8" fill="url(#cBellGrad_${id})" stroke="#b45309" stroke-width="0.8"/>
            <!-- Bell Clapper Base -->
            <circle cx="18" cy="27.5" r="2.8" fill="#b45309"/>
            <circle cx="18" cy="28.5" r="1.2" fill="#ffd166"/>
            <!-- Specular Flare -->
            <ellipse cx="14" cy="14" rx="2.5" ry="5" transform="rotate(-20 14 14)" fill="#ffffff" fill-opacity="0.45"/>
            <!-- Red Holiday Bow on Top -->
            <circle cx="18" cy="7" r="2" fill="#dc2626"/>
            <path d="M18,7 C14,3 10,5 12,8 Z" fill="#ef4444"/>
            <path d="M18,7 C22,3 26,5 24,8 Z" fill="#ef4444"/>
            <!-- Holly Leaf -->
            <circle cx="23" cy="5" r="1.5" fill="#15803d"/>
        </svg>
    `.trim();
}

/** Glass Christmas Bauble with frosted snowflake motif */
function createChristmasBauble(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Christmas Bauble">
            <defs>
                <linearGradient id="cBaubleGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ef4444"/>
                    <stop offset="45%" stop-color="#dc2626"/>
                    <stop offset="100%" stop-color="#7f1d1d"/>
                </linearGradient>
                <linearGradient id="cGoldCap_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Hanging Ring -->
            <circle cx="18" cy="4" r="2.5" stroke="url(#cGoldCap_${id})" stroke-width="1.5" fill="none"/>
            <!-- Ornament Cap -->
            <rect x="15" y="6" width="6" height="3" rx="1" fill="url(#cGoldCap_${id})"/>
            <!-- Spherical Ornament Body -->
            <circle cx="18" cy="20" r="13" fill="url(#cBaubleGrad_${id})" stroke="#fca5a5" stroke-width="0.8"/>
            <!-- Specular Highlight Curve -->
            <ellipse cx="14" cy="15" rx="3.5" ry="6.5" transform="rotate(-30 14 15)" fill="#ffffff" fill-opacity="0.4"/>
            <!-- Frosted Star Motif -->
            <polygon points="18,16 19.5,19 22.5,20 19.5,21 18,24 16.5,21 13.5,20 16.5,19" fill="#ffffff" fill-opacity="0.8"/>
            <!-- Gold Band Pattern -->
            <path d="M6,22 Q18,26 30,22" stroke="#ffd166" stroke-width="1.2" stroke-dasharray="2 2" fill="none"/>
        </svg>
    `.trim();
}

/** Peppermint Candy Cane with green holly sprig */
function createChristmasCandyCane(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Candy Cane">
            <defs>
                <linearGradient id="cRedStripe_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ef4444"/>
                    <stop offset="100%" stop-color="#b91c1c"/>
                </linearGradient>
            </defs>
            <!-- Cane Curve -->
            <path d="M12,32 L12,14 C12,7 24,7 24,14 L24,17" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none"/>
            <!-- Red Stripes Overlay -->
            <path d="M12,32 L12,14 C12,7 24,7 24,14 L24,17" stroke="url(#cRedStripe_${id})" stroke-width="5" stroke-linecap="round" stroke-dasharray="3.5 3.5" fill="none"/>
            <!-- Holly Leaves & Berries -->
            <circle cx="12" cy="18" r="2.2" fill="#15803d"/>
            <circle cx="15" cy="19" r="2.2" fill="#16a34a"/>
            <circle cx="13" cy="16.5" r="1.5" fill="#dc2626"/>
            <circle cx="15" cy="16" r="1.5" fill="#ef4444"/>
            <!-- Sparkle -->
            <polygon points="26,6 27,8 29,9 27,10 26,12 25,10 23,9 25,8" fill="#ffd166"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   4. NEW YEAR SVGS
   ========================================================================== */

/** Toasting Champagne Flutes with rising golden bubbles */
function createNewYearChampagneFlutes(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Champagne Toast">
            <defs>
                <linearGradient id="nyBubbly_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="50%" stop-color="#fde047"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Left Glass -->
            <g transform="rotate(15 13 22)">
                <path d="M11,6 L15,6 L14,17 C14,19 12,19 12,17 Z" fill="url(#nyBubbly_${id})" stroke="#e2e8f0" stroke-width="0.8"/>
                <line x1="13" y1="18" x2="13" y2="28" stroke="#cbd5e1" stroke-width="1.2"/>
                <ellipse cx="13" cy="28" rx="3.5" ry="1.2" fill="#e2e8f0"/>
            </g>
            <!-- Right Glass -->
            <g transform="rotate(-15 23 22)">
                <path d="M21,6 L25,6 L24,17 C24,19 22,19 22,17 Z" fill="url(#nyBubbly_${id})" stroke="#e2e8f0" stroke-width="0.8"/>
                <line x1="23" y1="18" x2="23" y2="28" stroke="#cbd5e1" stroke-width="1.2"/>
                <ellipse cx="23" cy="28" rx="3.5" ry="1.2" fill="#e2e8f0"/>
            </g>
            <!-- Clinking Starburst & Bubbles -->
            <polygon points="18,3 19,6.5 22.5,7.5 19,8.5 18,12 17,8.5 13.5,7.5 17,6.5" fill="#ffd166"/>
            <circle cx="18" cy="7.5" r="1.5" fill="#ffffff"/>
            <circle cx="15" cy="4" r="0.9" fill="#fef08a"/>
            <circle cx="21" cy="4" r="0.9" fill="#fef08a"/>
            <circle cx="18" cy="15" r="1.1" fill="#fef08a"/>
        </svg>
    `.trim();
}

/** Dazzling Golden Midnight Starburst / Firework */
function createNewYearFireworkStarburst(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Celebration Starburst">
            <defs>
                <linearGradient id="nyStarGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="80%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
            </defs>
            <!-- Major 8-Point Diamond Star -->
            <polygon points="18,1 21,12 32,12 23,19 27,30 18,23 9,30 13,19 4,12 15,12" fill="url(#nyStarGrad_${id})" stroke="#fffbeb" stroke-width="0.7"/>
            <!-- Secondary Starburst Core -->
            <polygon points="18,8 20,15 27,18 20,21 18,28 16,21 9,18 16,15" fill="#ffffff"/>
            <circle cx="18" cy="18" r="2.8" fill="#ffd166"/>
            <!-- Outer Spark Dots -->
            <circle cx="18" cy="2" r="1" fill="#ffffff"/>
            <circle cx="34" cy="18" r="1" fill="#fde047"/>
            <circle cx="18" cy="34" r="1" fill="#ffd166"/>
            <circle cx="2" cy="18" r="1" fill="#fde047"/>
        </svg>
    `.trim();
}

/** Midnight Countdown Pocket Watch ticking at 12:00 */
function createNewYearMidnightClock(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Midnight Clock">
            <defs>
                <linearGradient id="nyGoldCase_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Top Crown Loop -->
            <circle cx="18" cy="4" r="2.8" stroke="url(#nyGoldCase_${id})" stroke-width="1.4" fill="none"/>
            <rect x="16.5" y="6" width="3" height="2" fill="url(#nyGoldCase_${id})"/>
            <!-- Outer Bezel -->
            <circle cx="18" cy="20" r="14" fill="url(#nyGoldCase_${id})" stroke="#d97706" stroke-width="0.8"/>
            <!-- Dial Face -->
            <circle cx="18" cy="20" r="11.5" fill="#0f172a"/>
            <!-- Hour Markers -->
            <circle cx="18" cy="11" r="0.9" fill="#fde047"/>
            <circle cx="27" cy="20" r="0.9" fill="#fde047"/>
            <circle cx="18" cy="29" r="0.9" fill="#fde047"/>
            <circle cx="9" cy="20" r="0.9" fill="#fde047"/>
            <!-- Clock Hands at Midnight (12:00) -->
            <line x1="18" y1="20" x2="18" y2="12" stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round"/>
            <line x1="18" y1="20" x2="18" y2="14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            <circle cx="18" cy="20" r="1.5" fill="#ffd166"/>
            <!-- Sparkles -->
            <polygon points="30,7 31,9 33,10 31,11 30,13 29,11 27,10 29,9" fill="#ffffff"/>
        </svg>
    `.trim();
}

/** Popping Champagne Bottle with explosive effervescence */
function createNewYearChampagneBottle(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Champagne Bottle">
            <defs>
                <linearGradient id="nyBottleGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#15803d"/>
                    <stop offset="50%" stop-color="#064e3b"/>
                    <stop offset="100%" stop-color="#022c22"/>
                </linearGradient>
                <linearGradient id="nyFoilGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#ca8a04"/>
                </linearGradient>
            </defs>
            <g transform="rotate(-35 18 18)">
                <!-- Bottle Body -->
                <path d="M14,14 L22,14 L23,32 L13,32 Z" fill="url(#nyBottleGrad_${id})" stroke="#34d399" stroke-width="0.8"/>
                <!-- Bottle Neck -->
                <path d="M16,5 L20,5 L22,14 L14,14 Z" fill="url(#nyBottleGrad_${id})"/>
                <!-- Gold Foil Neck Wrap -->
                <rect x="15.5" y="7" width="5" height="6" fill="url(#nyFoilGrad_${id})"/>
                <!-- Label -->
                <rect x="14.5" y="19" width="7" height="9" rx="1" fill="#fffbeb" stroke="#d97706" stroke-width="0.6"/>
            </g>
            <!-- Exploding Cork & Bubbles -->
            <rect x="25" y="4" width="3.5" height="3" rx="1" fill="#ca8a04" transform="rotate(20 25 4)"/>
            <circle cx="28" cy="2" r="1.4" fill="#fde047"/>
            <circle cx="32" cy="6" r="1.8" fill="#ffd166"/>
            <circle cx="26" cy="11" r="1.2" fill="#ffffff"/>
            <circle cx="33" cy="13" r="1.5" fill="#fde047"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   5. EASTER SVGS
   ========================================================================== */

/** Decorated Pastel Easter Egg with zig-zag & dot motifs */
function createEasterDecoratedEgg(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Easter Egg">
            <defs>
                <linearGradient id="eEggGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fdf4ff"/>
                    <stop offset="35%" stop-color="#f0abfc"/>
                    <stop offset="100%" stop-color="#c084fc"/>
                </linearGradient>
            </defs>
            <!-- Egg Silhouette -->
            <path d="M18,3 C11,3 7,13 7,22 C7,29 11.5,33 18,33 C24.5,33 29,29 29,22 C29,13 25,3 18,3 Z" fill="url(#eEggGrad_${id})" stroke="#e879f9" stroke-width="0.9"/>
            <!-- Zig-zag Ribbon Accent -->
            <polyline points="8,19 11,16 14,19 17,16 20,19 23,16 26,19 28,17" stroke="#fef08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Polka Dots -->
            <circle cx="13" cy="10" r="1.6" fill="#38bdf8"/>
            <circle cx="23" cy="10" r="1.6" fill="#4ade80"/>
            <circle cx="18" cy="12" r="1.8" fill="#fb7185"/>
            <circle cx="12" cy="26" r="1.8" fill="#fbbf24"/>
            <circle cx="18" cy="27" r="1.8" fill="#38bdf8"/>
            <circle cx="24" cy="26" r="1.8" fill="#4ade80"/>
            <!-- Sparkle -->
            <polygon points="28,4 29,6 31,7 29,8 28,10 27,8 25,7 27,6" fill="#ffffff"/>
        </svg>
    `.trim();
}

/** Cute Bunny Silhouette with soft pink inner ears */
function createEasterBunny(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Easter Bunny">
            <defs>
                <linearGradient id="eBunnyGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="70%" stop-color="#f1f5f9"/>
                    <stop offset="100%" stop-color="#cbd5e1"/>
                </linearGradient>
            </defs>
            <!-- Left Ear -->
            <ellipse cx="13" cy="9" rx="3.5" ry="8" transform="rotate(-12 13 9)" fill="url(#eBunnyGrad_${id})" stroke="#e2e8f0" stroke-width="0.8"/>
            <ellipse cx="13" cy="9" rx="1.8" ry="5.5" transform="rotate(-12 13 9)" fill="#f472b6"/>
            <!-- Right Ear -->
            <ellipse cx="23" cy="9" rx="3.5" ry="8" transform="rotate(12 23 9)" fill="url(#eBunnyGrad_${id})" stroke="#e2e8f0" stroke-width="0.8"/>
            <ellipse cx="23" cy="9" rx="1.8" ry="5.5" transform="rotate(12 23 9)" fill="#f472b6"/>
            <!-- Bunny Head -->
            <circle cx="18" cy="22" r="10" fill="url(#eBunnyGrad_${id})" stroke="#e2e8f0" stroke-width="0.8"/>
            <!-- Cute Face -->
            <circle cx="14" cy="20" r="1.4" fill="#1e293b"/>
            <circle cx="22" cy="20" r="1.4" fill="#1e293b"/>
            <polygon points="18,22.5 16.8,24 19.2,24" fill="#fb7185"/>
            <!-- Cheeks -->
            <circle cx="11.5" cy="23" r="2" fill="#fbcfe8"/>
            <circle cx="24.5" cy="23" r="2" fill="#fbcfe8"/>
            <!-- Whiskers -->
            <line x1="9" y1="23" x2="5" y2="22" stroke="#94a3b8" stroke-width="0.8"/>
            <line x1="9" y1="25" x2="5" y2="26" stroke="#94a3b8" stroke-width="0.8"/>
            <line x1="27" y1="23" x2="31" y2="22" stroke="#94a3b8" stroke-width="0.8"/>
            <line x1="27" y1="25" x2="31" y2="26" stroke="#94a3b8" stroke-width="0.8"/>
        </svg>
    `.trim();
}

/** Blooming Spring Pastel Tulip Flower */
function createEasterSpringTulip(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Spring Tulip">
            <defs>
                <linearGradient id="eTulipGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f472b6"/>
                    <stop offset="60%" stop-color="#db2777"/>
                    <stop offset="100%" stop-color="#9d174d"/>
                </linearGradient>
                <linearGradient id="eStemGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4ade80"/>
                    <stop offset="100%" stop-color="#15803d"/>
                </linearGradient>
            </defs>
            <!-- Stem -->
            <path d="M18,18 Q18,26 18,34" stroke="url(#eStemGrad_${id})" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Leaves -->
            <path d="M18,28 C13,26 9,21 11,18 C14,21 17,24 18,28 Z" fill="url(#eStemGrad_${id})"/>
            <path d="M18,25 C23,23 27,18 25,15 C22,18 19,21 18,25 Z" fill="url(#eStemGrad_${id})"/>
            <!-- Tulip Petals -->
            <path d="M12,10 C12,18 18,20 18,20 C18,20 12,17 12,10 Z" fill="#ec4899"/>
            <path d="M24,10 C24,18 18,20 18,20 C18,20 24,17 24,10 Z" fill="#be123c"/>
            <path d="M18,5 C13,5 10,13 10,18 C10,21 14,22 18,22 C22,22 26,21 26,18 C26,13 23,5 18,5 Z" fill="url(#eTulipGrad_${id})" stroke="#fbcfe8" stroke-width="0.8"/>
            <circle cx="16" cy="12" r="1.2" fill="#ffffff" fill-opacity="0.6"/>
        </svg>
    `.trim();
}

/** Cheerful Hatching Baby Chick with cracked eggshell */
function createEasterBabyChick(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Baby Chick">
            <defs>
                <linearGradient id="eChickGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Chick Head & Body -->
            <circle cx="18" cy="15" r="9" fill="url(#eChickGrad_${id})" stroke="#fbbf24" stroke-width="0.8"/>
            <!-- Eyes & Beak -->
            <circle cx="14" cy="14" r="1.3" fill="#1e293b"/>
            <circle cx="22" cy="14" r="1.3" fill="#1e293b"/>
            <polygon points="18,15 16,18 20,18" fill="#ea580c"/>
            <circle cx="11.5" cy="16" r="1.5" fill="#fda4af"/>
            <circle cx="24.5" cy="16" r="1.5" fill="#fda4af"/>
            <!-- Cracked Egg Shell Bottom -->
            <path d="M9,22 L12,18 L15,22 L18,18 L21,22 L24,18 L27,22 C27,29 23,33 18,33 C13,33 9,29 9,22 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.9"/>
            <!-- Top Tuft Feather -->
            <path d="M18,6 C17,3 19,3 18,6 Z" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Fluttering Spring Monarch / Pastel Butterfly */
function createEasterButterfly(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Butterfly">
            <defs>
                <linearGradient id="eWingLeft_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#a5b4fc"/>
                    <stop offset="60%" stop-color="#6366f1"/>
                    <stop offset="100%" stop-color="#4338ca"/>
                </linearGradient>
                <linearGradient id="eWingRight_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fbcfe8"/>
                    <stop offset="60%" stop-color="#ec4899"/>
                    <stop offset="100%" stop-color="#be123c"/>
                </linearGradient>
            </defs>
            <!-- Left Wings -->
            <ellipse cx="11" cy="12" rx="7" ry="6" transform="rotate(-15 11 12)" fill="url(#eWingLeft_${id})" stroke="#e0e7ff" stroke-width="0.8"/>
            <ellipse cx="12" cy="23" rx="5" ry="4" transform="rotate(15 12 23)" fill="url(#eWingLeft_${id})"/>
            <!-- Right Wings -->
            <ellipse cx="25" cy="12" rx="7" ry="6" transform="rotate(15 25 12)" fill="url(#eWingRight_${id})" stroke="#fce7f3" stroke-width="0.8"/>
            <ellipse cx="24" cy="23" rx="5" ry="4" transform="rotate(-15 24 23)" fill="url(#eWingRight_${id})"/>
            <!-- Body & Head -->
            <rect x="16.5" y="10" width="3" height="16" rx="1.5" fill="#1e1b4b"/>
            <circle cx="18" cy="9" r="1.8" fill="#1e1b4b"/>
            <!-- Antennae -->
            <path d="M17,8 Q14,3 12,4" stroke="#475569" stroke-width="0.9" fill="none"/>
            <path d="M19,8 Q22,3 24,4" stroke="#475569" stroke-width="0.9" fill="none"/>
            <!-- Wing Accents -->
            <circle cx="10" cy="12" r="1.8" fill="#ffffff" fill-opacity="0.7"/>
            <circle cx="26" cy="12" r="1.8" fill="#ffffff" fill-opacity="0.7"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   6. GRADUATION SVGS
   ========================================================================== */

/** Classic Collegiate Mortarboard Cap with Golden Tassel */
function createGraduationCapClassic(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Graduation Cap">
            <defs>
                <linearGradient id="gCapGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3b82f6"/>
                    <stop offset="45%" stop-color="#1d4ed8"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
                <linearGradient id="gGoldGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="30%" stop-color="#ffd166"/>
                    <stop offset="75%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <path d="M9.5,13.5 V19.5 C9.5,23.5 13.5,26 18,26 C22.5,26 26.5,23.5 26.5,19.5 V13.5" fill="url(#gCapGrad_${id})" stroke="#1e293b" stroke-width="0.8"/>
            <polygon points="18,3.5 33.5,10.5 18,17.5 2.5,10.5" fill="url(#gCapGrad_${id})" stroke="#60a5fa" stroke-width="1.2"/>
            <polygon points="18,5 30,10.5 18,16 6,10.5" fill="#ffffff" fill-opacity="0.16"/>
            <polyline points="2.5,10.5 18,17.5 33.5,10.5" stroke="#ffffff" stroke-width="0.9" stroke-opacity="0.6"/>
            <circle cx="18" cy="10.5" r="2.2" fill="url(#gGoldGrad_${id})"/>
            <path d="M18,10.5 C24,10.5 28.5,14 28.5,20.5" stroke="url(#gGoldGrad_${id})" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            <polygon points="27,20.5 30,20.5 29.5,28 27.5,28" fill="url(#gGoldGrad_${id})"/>
            <circle cx="28.5" cy="20.5" r="1.6" fill="#fffbeb"/>
            <polygon points="31.5,4 32.5,6.5 35,7.5 32.5,8.5 31.5,11 30.5,8.5 28,7.5 30.5,6.5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Triumphant Tossed Cap at celebratory angle */
function createGraduationCapTossed(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Celebration Cap">
            <defs>
                <linearGradient id="gTossGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1"/>
                    <stop offset="50%" stop-color="#312e81"/>
                    <stop offset="100%" stop-color="#09090b"/>
                </linearGradient>
                <linearGradient id="gGoldToss_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fef08a"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
            </defs>
            <g transform="rotate(-15 18 18)">
                <path d="M10,13.5 V18 C10,21.5 13.5,23.5 18,23.5 C22.5,23.5 26,21.5 26,18 V13.5" fill="url(#gTossGrad_${id})"/>
                <polygon points="18,4 32.5,10 18,16 3.5,10" fill="url(#gTossGrad_${id})" stroke="#a5b4fc" stroke-width="1.1"/>
                <circle cx="18" cy="10" r="2" fill="url(#gGoldToss_${id})"/>
                <path d="M18,10 C24.5,10 28,14.5 28,21" stroke="url(#gGoldToss_${id})" stroke-width="2" stroke-linecap="round" fill="none"/>
                <polygon points="26.5,21 29.5,21 29,27 27,27" fill="url(#gGoldToss_${id})"/>
            </g>
            <polygon points="31,3 32,5.5 34.5,6.5 32,7.5 31,10 30,7.5 27.5,6.5 30,5.5" fill="#fde047"/>
            <polygon points="5,23 6,24.5 7.5,25.5 6,26.5 5,28 4,26.5 2.5,25.5 4,24.5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Cap paired with tied parchment diploma scroll */
function createGraduationCapAndDiploma(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Graduation Cap and Diploma">
            <defs>
                <linearGradient id="gCapDip_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1e3a8a"/>
                    <stop offset="60%" stop-color="#172554"/>
                    <stop offset="100%" stop-color="#020617"/>
                </linearGradient>
                <linearGradient id="gGoldDip_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fef9c3"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#ca8a04"/>
                </linearGradient>
            </defs>
            <polygon points="18,3 32,8.5 18,14 4,8.5" fill="url(#gCapDip_${id})" stroke="#93c5fd" stroke-width="1"/>
            <path d="M9.5,11.5 V15.5 C9.5,18.5 13.5,20.5 18,20.5 C22.5,20.5 26.5,18.5 26.5,15.5 V11.5" fill="url(#gCapDip_${id})"/>
            <circle cx="18" cy="8.5" r="1.8" fill="url(#gGoldDip_${id})"/>
            <path d="M18,8.5 C23,8.5 26.5,12 26.5,17" stroke="url(#gGoldDip_${id})" stroke-width="1.8" fill="none"/>
            <!-- Tied Diploma Scroll -->
            <g transform="translate(6, 22) rotate(-8)">
                <rect x="0" y="0" width="22" height="6.5" rx="3.25" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
                <rect x="9.5" y="-0.5" width="4" height="7.5" rx="1" fill="#dc2626"/>
                <polygon points="13.5,4 16.5,8 14,9" fill="#b91c1c"/>
            </g>
            <polygon points="32,20 33,22 35,23 33,24 32,26 31,24 29,23 31,22" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Golden Achievement Medal with Star */
function createGraduationHonorMedal(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Honor Medal">
            <defs>
                <linearGradient id="gMedalGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="80%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Striped Ribbon -->
            <polygon points="12,2 18,14 15,14 9,2" fill="#2563eb"/>
            <polygon points="24,2 18,14 21,14 27,2" fill="#dc2626"/>
            <polygon points="15,2 18,14 21,2" fill="#ffffff"/>
            <!-- Golden Medal Disc -->
            <circle cx="18" cy="22" r="11" fill="url(#gMedalGrad_${id})" stroke="#b45309" stroke-width="0.9"/>
            <circle cx="18" cy="22" r="9" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2 2" fill="none"/>
            <!-- Star Emboss -->
            <polygon points="18,16 19.5,20.5 24,21 20.5,23.5 21.5,28 18,25.5 14.5,28 15.5,23.5 12,21 16.5,20.5" fill="#ffffff"/>
            <polygon points="30,12 31,14 33,15 31,16 30,18 29,16 27,15 29,14" fill="#fde047"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   7. ANNIVERSARY SVGS
   ========================================================================== */

/** Solitaire Diamond Engagement Ring */
function createAnniversarySolitaireRing(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diamond Ring">
            <defs>
                <linearGradient id="rGoldGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="35%" stop-color="#ffd166"/>
                    <stop offset="70%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#fff3b0"/>
                </linearGradient>
                <linearGradient id="rDiaGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#e0f2fe"/>
                    <stop offset="70%" stop-color="#7dd3fc"/>
                    <stop offset="100%" stop-color="#38bdf8"/>
                </linearGradient>
            </defs>
            <ellipse cx="18" cy="21.5" rx="11.5" ry="10.5" fill="none" stroke="url(#rGoldGrad_${id})" stroke-width="3.4"/>
            <ellipse cx="18" cy="21.5" rx="11.5" ry="10.5" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="8 26" stroke-opacity="0.8"/>
            <polygon points="13.5,12 22.5,12 20.5,7.5 15.5,7.5" fill="url(#rGoldGrad_${id})"/>
            <polygon points="12.5,7.5 18,1.5 23.5,7.5 18,13" fill="url(#rDiaGrad_${id})" stroke="#ffffff" stroke-width="0.8"/>
            <polygon points="12.5,7.5 18,7.5 18,13" fill="#ffffff" fill-opacity="0.38"/>
            <polygon points="18,1.5 20.5,7.5 18,7.5" fill="#ffffff" fill-opacity="0.55"/>
            <!-- Glints -->
            <polygon points="23.5,0.5 24.5,4 27.5,5 24.5,6 23.5,9.5 22.5,6 19.5,5 22.5,4" fill="#ffffff"/>
            <circle cx="23.5" cy="5" r="1.4" fill="#fef08a"/>
            <polygon points="7.5,18 8.5,19.5 10.5,20.5 8.5,21.5 7.5,23 6.5,21.5 4.5,20.5 6.5,19.5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Interlocking Twin Wedding Bands (Rose Gold & Warm Gold) */
function createAnniversaryTwinBands(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Twin Rings">
            <defs>
                <linearGradient id="rTwinGold_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fff7ed"/>
                    <stop offset="40%" stop-color="#fbbf24"/>
                    <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
                <linearGradient id="rTwinRose_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fff1f2"/>
                    <stop offset="45%" stop-color="#fb7185"/>
                    <stop offset="100%" stop-color="#be123c"/>
                </linearGradient>
            </defs>
            <ellipse cx="13.5" cy="18" rx="8.5" ry="9" fill="none" stroke="url(#rTwinRose_${id})" stroke-width="3"/>
            <ellipse cx="22.5" cy="18" rx="8.5" ry="9" fill="none" stroke="url(#rTwinGold_${id})" stroke-width="3"/>
            <path d="M 13.5 9 A 8.5 9 0 0 1 22 18" fill="none" stroke="url(#rTwinRose_${id})" stroke-width="3"/>
            <polygon points="18,5.5 19,8 21.5,9 19,10 18,12.5 17,10 14.5,9 17,8" fill="#ffffff"/>
            <circle cx="18" cy="9" r="1.3" fill="#fde047"/>
            <polygon points="29,11 30,13 32,14 30,15 29,17 28,15 26,14 28,13" fill="#fecdd3"/>
        </svg>
    `.trim();
}

/** Ruby Heart-Cut Eternity Gem Ring */
function createAnniversaryRubyHeartRing(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Heart Gemstone Ring">
            <defs>
                <linearGradient id="rHeartGold_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="50%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
                <linearGradient id="rRubyGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fb7185"/>
                    <stop offset="45%" stop-color="#e11d48"/>
                    <stop offset="100%" stop-color="#881337"/>
                </linearGradient>
            </defs>
            <ellipse cx="18" cy="21" rx="11" ry="10" fill="none" stroke="url(#rHeartGold_${id})" stroke-width="3.2"/>
            <path d="M 18 10.5 C 18 6.5 11.5 4.5 11.5 9.5 C 11.5 13.5 18 18 18 18 C 18 18 24.5 13.5 24.5 9.5 C 24.5 4.5 18 6.5 18 10.5 Z" fill="url(#rRubyGrad_${id})" stroke="#fef08a" stroke-width="1"/>
            <circle cx="15" cy="8.5" r="1.5" fill="#ffffff" fill-opacity="0.8"/>
            <polygon points="24.5,3.5 25.5,6 28,7 25.5,8 24.5,10.5 23.5,8 21,7 23.5,6" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Golden Eternity Infinity Ribbon with sparkling diamond */
function createAnniversaryInfinitySparkle(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Eternity Infinity">
            <defs>
                <linearGradient id="rInfGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="35%" stop-color="#f472b6"/>
                    <stop offset="70%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Infinity Figure-8 Loop -->
            <path d="M18,18 C13,11 6,11 6,18 C6,25 13,25 18,18 C23,11 30,11 30,18 C30,25 23,25 18,18 Z" stroke="url(#rInfGrad_${id})" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <!-- Center Diamond Accent -->
            <polygon points="18,14 20.5,18 18,22 15.5,18" fill="#38bdf8" stroke="#ffffff" stroke-width="0.8"/>
            <circle cx="18" cy="18" r="1" fill="#ffffff"/>
            <!-- Sparkles -->
            <polygon points="30,8 31,10 33,11 31,12 30,14 29,12 27,11 29,10" fill="#fde047"/>
            <polygon points="6,24 7,25.5 9,26 7,26.5 6,28 5,26.5 3,26 5,25.5" fill="#fbcfe8"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   8. CUSTOM / GENERAL CELEBRATION SVGS
   ========================================================================== */

/** Golden Champion Trophy Cup with embossed star */
function createCustomTrophyCup(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Champion Trophy">
            <defs>
                <linearGradient id="cTrophyGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="40%" stop-color="#ffd166"/>
                    <stop offset="80%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
            <!-- Handles -->
            <path d="M10,8 C5,8 5,19 11,20" stroke="url(#cTrophyGrad_${id})" stroke-width="2.5" fill="none"/>
            <path d="M26,8 C31,8 31,19 25,20" stroke="url(#cTrophyGrad_${id})" stroke-width="2.5" fill="none"/>
            <!-- Cup Body -->
            <path d="M10,6 L26,6 L25,18 C25,23 20,25 18,25 C16,25 11,23 11,18 Z" fill="url(#cTrophyGrad_${id})" stroke="#b45309" stroke-width="0.8"/>
            <!-- Stem & Base -->
            <rect x="16.5" y="24" width="3" height="5" fill="url(#cTrophyGrad_${id})"/>
            <rect x="11" y="29" width="14" height="4" rx="1.5" fill="#1e293b" stroke="#ffd166" stroke-width="0.8"/>
            <!-- Star Emboss -->
            <polygon points="18,11 19,13.5 21.5,14 19.5,15.5 20,18 18,16.5 16,18 16.5,15.5 14.5,14 17,13.5" fill="#ffffff"/>
            <polygon points="30,3 31,5 33,6 31,7 30,9 29,7 27,6 29,5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Celestial Diamond Star with prismatic sheen */
function createCustomCelestialStar(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Celestial Star">
            <defs>
                <linearGradient id="cStarGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="35%" stop-color="#fbcfe8"/>
                    <stop offset="70%" stop-color="#a78bfa"/>
                    <stop offset="100%" stop-color="#6366f1"/>
                </linearGradient>
            </defs>
            <polygon points="18,1 21.5,12.5 33,14 24,21 27,33 18,25 9,33 12,21 3,14 14.5,12.5" fill="url(#cStarGrad_${id})" stroke="#ffffff" stroke-width="0.9"/>
            <circle cx="18" cy="18" r="3" fill="#ffffff"/>
            <polygon points="31,7 32,9 34,10 32,11 31,13 30,11 28,10 30,9" fill="#fde047"/>
            <polygon points="5,23 6,24.5 7.5,25.5 6,26.5 5,28 4,26.5 2.5,25.5 4,24.5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Magic Celebration Wand with shooting golden sparkles */
function createCustomMagicWand(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Magic Wand">
            <defs>
                <linearGradient id="cWandGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ec4899"/>
                    <stop offset="100%" stop-color="#8b5cf6"/>
                </linearGradient>
                <linearGradient id="cStarTip_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="50%" stop-color="#ffd166"/>
                    <stop offset="100%" stop-color="#f59e0b"/>
                </linearGradient>
            </defs>
            <!-- Wand Shaft -->
            <line x1="7" y1="29" x2="21" y2="15" stroke="url(#cWandGrad_${id})" stroke-width="3" stroke-linecap="round"/>
            <line x1="7" y1="29" x2="11" y2="25" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
            <!-- Star Topper -->
            <polygon points="23,5 25,10 30,10.5 26,14 27.5,19 23,16 18.5,19 20,14 16,10.5 21,10" fill="url(#cStarTip_${id})" stroke="#ffffff" stroke-width="0.8"/>
            <!-- Sparkles -->
            <circle cx="28" cy="4" r="1.3" fill="#fde047"/>
            <circle cx="33" cy="11" r="1" fill="#ffffff"/>
            <polygon points="12,7 13,8.5 15,9 13,9.5 12,11 11,9.5 9,9 11,8.5" fill="#ffd166"/>
        </svg>
    `.trim();
}

/** Golden Musical Melody Note */
function createCustomMusicalNote(id) {
    return `
        <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Musical Note">
            <defs>
                <linearGradient id="cNoteGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fffbeb"/>
                    <stop offset="35%" stop-color="#f472b6"/>
                    <stop offset="70%" stop-color="#a855f7"/>
                    <stop offset="100%" stop-color="#4f46e5"/>
                </linearGradient>
            </defs>
            <!-- Beamed Double Notes -->
            <ellipse cx="10" cy="27" rx="4.5" ry="3.5" transform="rotate(-25 10 27)" fill="url(#cNoteGrad_${id})"/>
            <ellipse cx="24" cy="23" rx="4.5" ry="3.5" transform="rotate(-25 24 23)" fill="url(#cNoteGrad_${id})"/>
            <line x1="13" y1="25" x2="13" y2="8" stroke="url(#cNoteGrad_${id})" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="27" y1="21" x2="27" y2="4" stroke="url(#cNoteGrad_${id})" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Connecting Beam -->
            <polygon points="13,8 27,4 27,8.5 13,12.5" fill="url(#cNoteGrad_${id})"/>
            <!-- Sparkles -->
            <polygon points="30,3 31,5 33,6 31,7 30,9 29,7 27,6 29,5" fill="#fde047"/>
            <polygon points="5,15 6,16.5 7.5,17 6,17.5 5,19 4,17.5 2.5,17 4,16.5" fill="#fbcfe8"/>
        </svg>
    `.trim();
}

/* ==========================================================================
   SCALABLE REGISTRY ARCHITECTURE
   ========================================================================== */

/**
 * Registry mapping each occasion key to an array of SVG generator functions.
 * Easily extensible at runtime by pushing new generator functions!
 */
export const SVG_REGISTRY = {
    valentine: [
        createValentineFacetedHeart,
        createValentineWingedHeart,
        createValentineTwinHearts,
        createValentineVelvetRose,
        createValentineRibbonHeart
    ],
    birthday: [
        createBirthdayLayerCake,
        createBirthdayGiftBox,
        createBirthdayBalloon,
        createBirthdayPartyPopper,
        createBirthdayCupcake
    ],
    christmas: [
        createChristmasEvergreenTree,
        createChristmasSnowflake,
        createChristmasJingleBell,
        createChristmasBauble,
        createChristmasCandyCane
    ],
    newyear: [
        createNewYearChampagneFlutes,
        createNewYearFireworkStarburst,
        createNewYearMidnightClock,
        createNewYearChampagneBottle
    ],
    easter: [
        createEasterDecoratedEgg,
        createEasterBunny,
        createEasterSpringTulip,
        createEasterBabyChick,
        createEasterButterfly
    ],
    graduation: [
        createGraduationCapClassic,
        createGraduationCapTossed,
        createGraduationCapAndDiploma,
        createGraduationHonorMedal
    ],
    anniversary: [
        createAnniversarySolitaireRing,
        createAnniversaryTwinBands,
        createAnniversaryRubyHeartRing,
        createAnniversaryInfinitySparkle
    ],
    custom: [
        createCustomTrophyCup,
        createCustomCelestialStar,
        createCustomMagicWand,
        createCustomMusicalNote
    ]
};

/**
 * Registers a new SVG generator function for an occasion or creates a new occasion key.
 * Allows easy future additions and extensibility without modifying this core file.
 * 
 * @param {string} occasion - Occasion key (e.g. 'birthday', 'proposal', 'halloween')
 * @param {Function} generatorFn - Function(id: number) => SVG markup string
 */
export function registerParticleSvg(occasion, generatorFn) {
    if (typeof generatorFn !== 'function') {
        console.warn('registerParticleSvg: generatorFn must be a function returning SVG markup string');
        return;
    }
    const key = (occasion || 'custom').toLowerCase().trim();
    if (!SVG_REGISTRY[key]) {
        SVG_REGISTRY[key] = [];
    }
    SVG_REGISTRY[key].push(generatorFn);
}

/**
 * Resolves the appropriate occasion key based on state attributes.
 * @param {Object|string} stateOrOccasion
 * @returns {string} normalized occasion key
 */
export function resolveOccasionKey(stateOrOccasion) {
    if (!stateOrOccasion) return 'valentine';
    if (typeof stateOrOccasion === 'string') {
        const key = stateOrOccasion.toLowerCase().trim();
        return SVG_REGISTRY[key] ? key : 'custom';
    }

    const occKey = (stateOrOccasion.occasion || '').toLowerCase().trim();
    const eventKey = (stateOrOccasion.customEvent || '').toLowerCase().trim();
    const titleStr = (stateOrOccasion.customTitle || '').toLowerCase().trim();

    // Check specific custom keywords first
    if (occKey === 'graduation' || eventKey === 'graduation' || /graduat|diploma|commence/i.test(titleStr)) {
        return 'graduation';
    }
    if (occKey === 'anniversary' || eventKey === 'anniversary' || /anniversar|wedding|propos/i.test(titleStr)) {
        return 'anniversary';
    }
    if (occKey === 'birthday' || eventKey === 'birthday' || /birthday|bday/i.test(titleStr)) {
        return 'birthday';
    }
    if (occKey === 'christmas' || eventKey === 'christmas' || /xmas|christmas|holiday/i.test(titleStr)) {
        return 'christmas';
    }
    if (occKey === 'newyear' || eventKey === 'newyear' || /new\s*year/i.test(titleStr)) {
        return 'newyear';
    }
    if (occKey === 'easter' || eventKey === 'easter' || /easter/i.test(titleStr)) {
        return 'easter';
    }
    if (occKey === 'valentine' || eventKey === 'valentine' || /valentine/i.test(titleStr)) {
        return 'valentine';
    }

    if (SVG_REGISTRY[occKey]) return occKey;
    return 'custom';
}

/**
 * Generates an SVG particle string for an occasion.
 * Picks a random variant from the registered SVG list for that occasion.
 * 
 * @param {Object|string} stateOrOccasion - AppState or occasion string
 * @param {number} [forcedVariantIndex] - Optional explicit index for testing
 * @returns {{ svg: string, occasionKey: string, variantIndex: number }}
 */
export function getOccasionParticleSvg(stateOrOccasion, forcedVariantIndex = null) {
    const occasionKey = resolveOccasionKey(stateOrOccasion);
    const generators = SVG_REGISTRY[occasionKey] || SVG_REGISTRY.custom || SVG_REGISTRY.valentine;

    const count = generators.length;
    const variantIndex = (typeof forcedVariantIndex === 'number' && forcedVariantIndex >= 0 && forcedVariantIndex < count)
        ? forcedVariantIndex
        : Math.floor(Math.random() * count);

    const generator = generators[variantIndex] || generators[0];
    const id = getNextSvgId();
    const svg = generator(id);

    return {
        svg,
        occasionKey,
        variantIndex
    };
}

/**
 * Returns total number of registered SVG variants for an occasion.
 * @param {string} occasion
 * @returns {number}
 */
export function getOccasionVariantCount(occasion) {
    const key = resolveOccasionKey(occasion);
    return (SVG_REGISTRY[key] || []).length;
}

/**
 * Returns list of all registered occasion keys.
 * @returns {string[]}
 */
export function listSupportedOccasions() {
    return Object.keys(SVG_REGISTRY);
}
