/**
 * Premium Atmospheric SVG Particle Registry & Generator Library
 *
 * Handcrafted, vector-crisp particle artwork for the celebration background layer.
 *
 * Design goals:
 * - Elegant editorial silhouettes rather than emoji-like icons.
 * - Strong shape variety inside every occasion.
 * - Subtle gradients, highlights, facets, and line work.
 * - 3 visual tiers: far / mid / near.
 * - Physical materials: petal, confetti, snow, sparkle, heart, star, bubble.
 * - Controlled rarity: common (~65%), uncommon (~25%), rare (~10%).
 * - Collision-safe IDs for every SVG <defs> reference.
 * - Lightweight SVG geometry suitable for continuous background animation.
 */

let svgIdCounter = 0;

export function getNextSvgId() {
    svgIdCounter = (svgIdCounter + 1) % 1000000;
    return svgIdCounter;
}

export const PARTICLE_TIERS = {
    FAR: 'far',
    MID: 'mid',
    NEAR: 'near'
};

export const PARTICLE_MATERIALS = {
    PETAL: 'petal',
    CONFETTI: 'confetti',
    SNOW: 'snow',
    SPARKLE: 'sparkle',
    HEART: 'heart',
    STAR: 'star',
    BUBBLE: 'bubble'
};


export const OCCASION_PARTICLES = {
    "valentine": [
        {
            "id": "val-heart-ruby",
            "name": "Ruby Love Heart",
            "tier": "mid",
            "material": "heart",
            "rarity": "common",
            "minScale": 0.6,
            "maxScale": 0.96,
            "minOpacity": 0.5,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vh1_${id}" x1="16" y1="4" x2="16" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/>
                        <stop offset="0.45" stop-color="#e11d48"/>
                        <stop offset="1" stop-color="#7f1d3a"/>
                    </linearGradient>
                </defs>
                <path d="M16 28.5C15.6 28.5 4 20.6 4 11.6 4 6.7 8.2 4 11.9 4c2 0 3.4.9 4.1 1.9C16.7 4.9 18.1 4 20.1 4 23.8 4 28 6.7 28 11.6c0 9-11.6 16.9-12 16.9Z" fill="url(#vh1_${id})"/>
                <path d="M8.6 10.4c0-2.6 2-4.1 4.3-4.1 1.2 0 2.2.5 2.9 1.3" stroke="#ffe4e6" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.75"/>
                <ellipse cx="21.6" cy="9.4" rx="1.5" ry="2.2" fill="#ffffff" opacity="0.35" transform="rotate(-24 21.6 9.4)"/>
                <path d="M24.5 6.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4Z" fill="#fecdd3" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "val-double-hearts",
            "name": "Double Heart Promise",
            "tier": "near",
            "material": "heart",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vdh_a_${id}" x1="13" y1="10" x2="13" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                    <linearGradient id="vdh_b_${id}" x1="20" y1="9" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fecdd3"/><stop offset="1" stop-color="#be123c"/>
                    </linearGradient>
                </defs>
                <path d="M13 25c-.3 0-7.5-5-7.5-9.7 0-2.7 2.2-4.1 4.3-4.1 1.1 0 2 .5 2.7 1.2.7-.7 1.6-1.2 2.7-1.2 2.1 0 4.3 1.4 4.3 4.1 0 4.7-7.2 9.7-7.5 9.7Z" fill="url(#vdh_a_${id})" opacity="0.95"/>
                <path d="M20 24c-.3 0-7.5-5-7.5-9.7 0-2.7 2.2-4.1 4.3-4.1 1.1 0 2 .5 2.7 1.2.7-.7 1.6-1.2 2.7-1.2 2.1 0 4.3 1.4 4.3 4.1 0 4.7-7.2 9.7-7.5 9.7Z" fill="url(#vdh_b_${id})"/>
                <path d="M15.2 12.6c0-1.9 1.5-2.9 3-2.9.9 0 1.6.4 2.1.9" stroke="#fff1f2" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>
                <circle cx="24.6" cy="10.2" r="1.2" fill="#ffffff" opacity="0.5"/>
            </svg>
        `
        },
        {
            "id": "val-ring-love",
            "name": "Love Ring",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vrl_band_${id}" x1="6" y1="14" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.35" stop-color="#fbbf24"/><stop offset="0.7" stop-color="#d97706"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                    <linearGradient id="vrl_gem_${id}" x1="13" y1="4" x2="19" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#e0f2fe"/><stop offset="1" stop-color="#7dd3fc"/>
                    </linearGradient>
                    <linearGradient id="vrl_gem2_${id}" x1="16" y1="7" x2="16" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#bae6fd"/><stop offset="1" stop-color="#38bdf8"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="19.5" rx="9.4" ry="6.4" stroke="url(#vrl_band_${id})" stroke-width="2.6" fill="none"/>
                <ellipse cx="16" cy="19.5" rx="9.4" ry="6.4" stroke="#fffbeb" stroke-width="0.7" fill="none" opacity="0.5"/>
                <path d="M13 11.6 12.2 14.6M19 11.6l0.8 3" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M16 3.2 20.6 7 19 11.6h-6L11.4 7 16 3.2Z" fill="url(#vrl_gem_${id})"/>
                <path d="M16 3.2 20.6 7 16 8.2 11.4 7 16 3.2Z" fill="#ffffff" opacity="0.8"/>
                <path d="M16 8.2 19 11.6h-6L16 8.2Z" fill="url(#vrl_gem2_${id})" opacity="0.85"/>
                <path d="M16 3.2 16 8.2M11.4 7 16 8.2 20.6 7" stroke="#0ea5e9" stroke-width="0.45" opacity="0.55"/>
                <circle cx="14.6" cy="5.6" r="0.9" fill="#ffffff"/>
                <path d="M24.6 5.2l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.2Z" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "val-double-ring",
            "name": "Twin Promise Rings",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vdr_s_${id}" x1="8" y1="8" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f8fafc"/><stop offset="0.45" stop-color="#cbd5e1"/><stop offset="1" stop-color="#64748b"/>
                    </linearGradient>
                    <linearGradient id="vdr_g_${id}" x1="16" y1="8" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.4" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <ellipse cx="20" cy="16" rx="6.5" ry="8" stroke="url(#vdr_g_${id})" stroke-width="2.4" fill="none"/>
                <ellipse cx="12" cy="16" rx="6.5" ry="8" stroke="url(#vdr_s_${id})" stroke-width="2.4" fill="none"/>
                <path d="M19.43 23.97 A 6.5 8 0 0 1 13.89 18.74" stroke="url(#vdr_g_${id})" stroke-width="2.4" fill="none" stroke-linecap="round"/>
                <path d="M8.4 12.2c0.6-1.8 2-2.9 3.5-3.1" stroke="#ffffff" stroke-width="0.95" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M16.6 12.2c0.6-1.8 2-2.9 3.5-3.1" stroke="#ffffff" stroke-width="0.95" stroke-linecap="round" fill="none" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "val-rings-heart",
            "name": "Rings with Love Heart",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vrh_g1_${id}" x1="2" y1="10" x2="14" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.45" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                    <linearGradient id="vrh_g2_${id}" x1="18" y1="10" x2="30" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.45" stop-color="#fcd34d"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                    <linearGradient id="vrh_h_${id}" x1="16" y1="14" x2="16" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <ellipse cx="8" cy="16" rx="5.8" ry="7" stroke="url(#vrh_g1_${id})" stroke-width="2.2" fill="none"/>
                <ellipse cx="24" cy="16" rx="5.8" ry="7" stroke="url(#vrh_g2_${id})" stroke-width="2.2" fill="none"/>
                <path d="M16 20.5c-0.2 0-2.5-1.7-2.5-3.4 0-1 0.8-1.5 1.5-1.5 0.4 0 0.8 0.2 1 0.4 0.2-0.2 0.6-0.4 1-0.4 0.7 0 1.5 0.5 1.5 1.5 0 1.7-2.3 3.4-2.5 3.4Z" fill="url(#vrh_h_${id})"/>
                <circle cx="5.4" cy="12.6" r="0.9" fill="#ffffff" opacity="0.75"/>
                <circle cx="26.6" cy="12.6" r="0.9" fill="#ffffff" opacity="0.75"/>
            </svg>
        `
        },
        {
            "id": "val-cupid-arrow",
            "name": "Cupid Love Arrow",
            "tier": "mid",
            "material": "heart",
            "rarity": "uncommon",
            "minScale": 0.52,
            "maxScale": 0.86,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vca_h_${id}" x1="16" y1="8" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                    <linearGradient id="vca_a_${id}" x1="2" y1="29" x2="28" y2="4" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fcd34d"/><stop offset="0.5" stop-color="#f59e0b"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="M16 26c-0.4 0-9-6.1-9-12.6 0-3.5 2.6-5.2 5.2-5.2 1.3 0 2.4 0.6 3.2 1.5 0.8-0.9 1.9-1.5 3.2-1.5 2.6 0 5.2 1.7 5.2 5.2 0 6.5-8.6 12.6-9 12.6Z" fill="url(#vca_h_${id})"/>
                <path d="M2.5 29 28 4" stroke="url(#vca_a_${id})" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M30 2.2 27.6 7.4 23.4 4.2Z" fill="#fbbf24"/>
                <path d="M4.2 26.6 7.2 29.6M3.2 27.8 6.2 30.8M6.2 25.4 9.2 28.4" stroke="#fde68a" stroke-width="1.1" stroke-linecap="round"/>
                <path d="M11.2 10.4c0-1.6 1.3-2.6 2.7-2.6" stroke="#ffe4e6" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.75"/>
            </svg>
        `
        },
        {
            "id": "val-rose-bloom",
            "name": "Floating Rose Bloom",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.84,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="vrb_${id}" cx="44%" cy="40%" r="66%">
                        <stop stop-color="#fecdd3"/><stop offset="0.45" stop-color="#e11d48"/><stop offset="1" stop-color="#7f1d3a"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="13.5" fill="url(#vrb_${id})"/>
                <path d="M16 4.5c5 0 9 3.2 10.6 7.6M27 18.6C25.6 23.2 21.4 26.6 16 26.6 10.2 26.6 5.8 22.6 5 17.4" stroke="#9f1239" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.5"/>
                <path d="M16 8.2c3.6 0 6.6 2.4 7.6 5.6 0.9 3-0.5 6-3.2 7.2M11.6 22.4C8.6 20.6 7 17.2 7.6 13.8 8.2 10.8 10.6 8.6 13.4 8.2" stroke="#fda4af" stroke-width="1.3" stroke-linecap="round" fill="none"/>
                <path d="M16 11.4c2.6 0 4.6 2 4.6 4.4 0 2.2-1.7 4-3.8 4-1.6 0-2.9-1.2-2.9-2.8 0-1.2 1-2.2 2.2-2.2 0.8 0 1.5 0.6 1.5 1.4" stroke="#fff1f2" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.9"/>
                <ellipse cx="11" cy="11" rx="2.6" ry="1.6" fill="#ffffff" opacity="0.28" transform="rotate(-32 11 11)"/>
            </svg>
        `
        },
        {
            "id": "val-heart-lock",
            "name": "Heart Lock",
            "tier": "near",
            "material": "heart",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.68,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vhl_${id}" x1="5" y1="12" x2="27" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.4" stop-color="#fbbf24"/><stop offset="0.8" stop-color="#d97706"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M10 16v-5.4C10 7.4 12.6 5 16 5s6 2.4 6 5.6V16" stroke="#cbd5e1" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M10 16v-5.4C10 7.4 12.6 5 16 5" stroke="#f8fafc" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.8"/>
                <path d="M16 29.5c-0.4 0-11.5-7.4-11.5-14.6 0-4 3.4-6 6.3-6 1.6 0 2.8 0.7 3.7 1.6 0.9-0.9 2.1-1.6 3.7-1.6 2.9 0 6.3 2 6.3 6 0 7.2-11.1 14.6-11.5 14.6Z" fill="url(#vhl_${id})"/>
                <circle cx="16" cy="17.4" r="2.6" fill="#7c2d12"/>
                <path d="M14.6 18.6 15.4 23.4 16.6 23.4 17.4 18.6Z" fill="#7c2d12"/>
                <path d="M8.4 14.6c0-2.4 1.9-3.6 3.8-3.6 0.9 0 1.6 0.3 2.2 0.8" stroke="#fef9c3" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "val-love-letter",
            "name": "Love Letter with Heart Seal",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vll_env_${id}" x1="2" y1="7" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff1f2"/><stop offset="1" stop-color="#fecdd3"/>
                    </linearGradient>
                    <linearGradient id="vll_seal_${id}" x1="16" y1="18" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <rect x="2" y="7" width="28" height="18.5" rx="1.8" fill="url(#vll_env_${id})" stroke="#fda4af" stroke-width="0.8"/>
                <path d="M2 7.6 16 18.2 30 7.6 30 8.9 16 19.4 2 8.9Z" fill="#fb7185" opacity="0.4"/>
                <path d="M2 25.3 11.8 15.6M30 25.3 20.2 15.6" stroke="#fda4af" stroke-width="1" opacity="0.85"/>
                <path d="M16 25.2c-0.2 0-4.6-3.1-4.6-6 0-1.6 1.4-2.4 2.6-2.4 0.7 0 1.3 0.3 1.8 0.7 0.5-0.4 1.1-0.7 1.8-0.7 1.2 0 2.6 0.8 2.6 2.4 0 2.9-4.4 6-4.6 6Z" fill="url(#vll_seal_${id})"/>
                <path d="M13.4 20.4c0-0.7 0.6-1 1.2-1" stroke="#fff1f2" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "val-petal-pair",
            "name": "Drifting Rose Petals",
            "tier": "far",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.3,
            "maxOpacity": 0.54,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vpp_a_${id}" x1="4" y1="6" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="1" stop-color="#be123c"/>
                    </linearGradient>
                    <linearGradient id="vpp_b_${id}" x1="14" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fecdd3"/><stop offset="1" stop-color="#e11d48"/>
                    </linearGradient>
                </defs>
                <path d="M16.6 4.6c3.6 3.4 3.2 10.2-1.6 14.2-3.2 2.6-8.2 3.2-10.4 0.6-2.2-2.6-0.4-7 3-10.4 3-3 6.6-5.6 9-4.4Z" fill="url(#vpp_a_${id})"/>
                <path d="M24.4 13.6c3 2.6 3.8 8.2 1 12-2 2.6-6 3.6-8.2 1.6-2.2-2-1.6-6 1-9.2 2.4-3 4.6-5.2 6.2-4.4Z" fill="url(#vpp_b_${id})"/>
                <path d="M8.6 8.4c1.6-1.6 3.6-2.6 5.2-2.4" stroke="#ffe4e6" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "val-heart-cluster",
            "name": "Heart Cluster",
            "tier": "far",
            "material": "heart",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vhc_${id}" x1="16" y1="12" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <path d="M16 26.5c-0.3 0-7.6-5.2-7.6-10.8 0-3 2.4-4.4 4.6-4.4 1.2 0 2.2 0.5 3 1.3 0.8-0.8 1.8-1.3 3-1.3 2.2 0 4.6 1.4 4.6 4.4 0 5.6-7.3 10.8-7.6 10.8Z" fill="url(#vhc_${id})"/>
                <path d="M7 13.6c-0.2 0-4.6-3.2-4.6-6.1 0-1.6 1.4-2.4 2.6-2.4 0.7 0 1.3 0.3 1.8 0.7 0.5-0.4 1.1-0.7 1.8-0.7 1.2 0 2.6 0.8 2.6 2.4 0 2.9-4.4 6.1-4.6 6.1Z" fill="#fb7185" opacity="0.9"/>
                <path d="M25.4 11.6c-0.2 0-4.4-3-4.4-5.8 0-1.5 1.3-2.2 2.4-2.2 0.6 0 1.2 0.2 1.6 0.6 0.4-0.4 1-0.6 1.6-0.6 1.1 0 2.4 0.7 2.4 2.2 0 2.8-4.2 5.8-4.4 5.8Z" fill="#e11d48" opacity="0.8"/>
                <circle cx="26.6" cy="8.6" r="0.7" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "val-sparkle-diamond",
            "name": "Romance Diamond Spark",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.58,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="vsd_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/>
                        <stop offset="0.35" stop-color="#ffe4e6"/>
                        <stop offset="1" stop-color="#f43f5e" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 1.5C16.4 11.4 20.6 15.6 30.5 16 20.6 16.4 16.4 20.6 16 30.5 15.6 20.6 11.4 16.4 1.5 16 11.4 15.6 15.6 11.4 16 1.5Z" fill="url(#vsd_${id})"/>
                <path d="M16 6.4c0.3 5.6 3 8.3 8.6 8.6-5.6 0.3-8.3 3-8.6 8.6-0.3-5.6-3-8.3-8.6-8.6 5.6-0.3 8.3-3 8.6-8.6Z" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "val-love-orbit",
            "name": "Love Orbit",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.72,
            "minOpacity": 0.4,
            "maxOpacity": 0.64,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vlo_${id}" x1="16" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="16" rx="13.5" ry="6" transform="rotate(-22 16 16)" stroke="#f9a8d4" stroke-width="1" stroke-dasharray="2.6 2.4" opacity="0.8" fill="none"/>
                <path d="M16 25.5c-0.4 0-9-6.1-9-12.9 0-3.5 3-5.3 5.7-5.3 1.4 0 2.5 0.7 3.3 1.5 0.8-0.8 1.9-1.5 3.3-1.5 2.7 0 5.7 1.8 5.7 5.3 0 6.8-8.6 12.9-9 12.9Z" fill="url(#vlo_${id})"/>
                <circle cx="28.6" cy="10.2" r="2.4" fill="#f472b6"/>
                <circle cx="3.6" cy="21.8" r="1.5" fill="#fb7185"/>
                <circle cx="4.4" cy="21" r="0.5" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "val-blush-drop",
            "name": "Blush Love Drop",
            "tier": "far",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.28,
            "maxScale": 0.5,
            "minOpacity": 0.3,
            "maxOpacity": 0.52,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vbd_${id}" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fecdd3"/><stop offset="0.55" stop-color="#f43f5e"/><stop offset="1" stop-color="#881337"/>
                    </linearGradient>
                </defs>
                <path d="M16 2.5c7.4 9.4 11 17 0 27.2C5 19.5 8.6 11.9 16 2.5Z" fill="url(#vbd_${id})"/>
                <path d="M11.4 18.2c0.2 3 1.8 5.2 4.4 6.6" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "val-ruby-heart",
            "name": "Faceted Ruby Heart",
            "tier": "mid",
            "material": "heart",
            "rarity": "uncommon",
            "minScale": 0.58,
            "maxScale": 0.94,
            "minOpacity": 0.52,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vrh_${id}" x1="16" y1="5" x2="16" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="0.5" stop-color="#e11d48"/><stop offset="1" stop-color="#7f1d3a"/>
                    </linearGradient>
                </defs>
                <path d="M16 29c-0.4 0-12-8-12-16.2 0-4.4 3.6-6.6 6.8-6.6 1.8 0 3.1 0.8 4.1 1.8 1-1 2.3-1.8 4.1-1.8 3.2 0 6.8 2.2 6.8 6.6C28 21 16.4 29 16 29Z" fill="url(#vrh_${id})"/>
                <path d="M16 7.4 16 29M16 12.4 7 12.9M16 12.4 25 12.9M16 17.4 6 19M16 17.4 26 19" stroke="#ffffff" stroke-width="0.6" opacity="0.45"/>
                <path d="M16 7.4 25 12.9 16 17.4 7 12.9Z" fill="#fb7185" opacity="0.35"/>
                <path d="M16 29 6 19 7 12.9 16 12.4Z" fill="#9f1239" opacity="0.35"/>
                <path d="M16 29 26 19 25 12.9 16 12.4Z" fill="#be123c" opacity="0.4"/>
                <path d="M9.6 10.2c1-1.6 2.6-2.2 4-1.8" stroke="#ffe4e6" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8"/>
                <circle cx="22" cy="9.8" r="1" fill="#ffffff" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "val-rose-outline",
            "name": "Rose Gold Contour",
            "tier": "mid",
            "material": "heart",
            "rarity": "common",
            "minScale": 0.54,
            "maxScale": 0.86,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vro_${id}" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbcfe8"/><stop offset="0.5" stop-color="#f43f5e"/><stop offset="1" stop-color="#7f1d3a"/>
                    </linearGradient>
                </defs>
                <path d="M16 27.5c-0.4 0-11.5-7.6-11.5-15.2 0-4.1 3.4-6.1 6.3-6.1 1.6 0 2.8 0.7 3.7 1.6 0.9-0.9 2.1-1.6 3.7-1.6 2.9 0 6.3 2 6.3 6.1 0 7.6-11.1 15.2-11.5 15.2Z" stroke="url(#vro_${id})" stroke-width="2.6" stroke-linejoin="round" fill="none"/>
                <path d="M16 24c-0.3 0-8.6-5.6-8.6-11.3 0-3 2.5-4.5 4.7-4.5 1.2 0 2.1 0.5 2.8 1.2 0.7-0.7 1.6-1.2 2.8-1.2 2.2 0 4.7 1.5 4.7 4.5C24.4 18.4 16.3 24 16 24Z" stroke="#ffffff" stroke-width="0.9" opacity="0.65" fill="none"/>
            </svg>
        `
        },
        {
            "id": "val-petal-heart",
            "name": "Petal Heart",
            "tier": "far",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.58,
            "minOpacity": 0.3,
            "maxOpacity": 0.5,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vph_${id}" x1="8" y1="8" x2="24" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="1" stop-color="#be123c"/>
                    </linearGradient>
                </defs>
                <path d="M16 28.5C10 24.6 4.4 17.6 6.4 11.6 8 6.8 12.4 6 16 10.4 19.6 6 24 6.8 25.6 11.6c2 6-3.6 13-9.6 16.9Z" fill="url(#vph_${id})"/>
                <path d="M10 12.4c1-2.2 3-3.4 4.8-2.6" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.6"/>
            </svg>
        `
        },
        {
            "id": "val-crimson-petal",
            "name": "Velvet Rose Petal",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.84,
            "maxScale": 1.24,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vcp_${id}" x1="5" y1="4" x2="27" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="0.45" stop-color="#e11d48"/><stop offset="1" stop-color="#7f1d3a"/>
                    </linearGradient>
                </defs>
                <path d="M26.6 5.6c1.4 7.6-3.2 20.8-13.4 22.6C5.4 29.6 2 20.4 6.4 12.4 10.8 4.4 25.2 1 26.6 5.6Z" fill="url(#vcp_${id})"/>
                <path d="M23.4 7.4C22 13.6 17.4 23 11.4 25" stroke="#ffe4e6" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.55"/>
                <path d="M9.4 6.8C13.8 4.6 21.4 4 24.4 6.4" stroke="#fecdd3" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.6"/>
            </svg>
        `
        },
        {
            "id": "val-four-glint",
            "name": "Diamond Love Glint",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.58,
            "minOpacity": 0.32,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="vfg_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#ffe4e6" stop-opacity="0.7"/><stop offset="1" stop-color="#f43f5e" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.5C16.4 11.6 20.4 15.6 29.5 16 20.4 16.4 16.4 20.4 16 29.5 15.6 20.4 11.6 16.4 2.5 16 11.6 15.6 15.6 11.6 16 2.5Z" fill="url(#vfg_${id})"/>
                <circle cx="16" cy="16" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "val-eight-glint",
            "name": "Eight Point Romance",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.4,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="veg_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.55" stop-color="#fce7f3"/><stop offset="1" stop-color="#f472b6" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 1.5 18.4 11.2 26.6 5.4 20.8 13.6 30.5 16 20.8 18.4 26.6 26.6 18.4 20.8 16 30.5 13.6 20.8 5.4 26.6 11.2 18.4 1.5 16 11.2 13.6 5.4 5.4 13.6 11.2Z" fill="url(#veg_${id})"/>
                <path d="M16 7 16 25M7 16 25 16" stroke="#f9a8d4" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <circle cx="16" cy="16" r="3" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1.4" fill="#fbcfe8"/>
            </svg>
        `
        },
        {
            "id": "val-solitaire",
            "name": "Solitaire Glimmer",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.4,
            "maxScale": 0.7,
            "minOpacity": 0.38,
            "maxOpacity": 0.64,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vso_a_${id}" x1="8" y1="6" x2="24" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#e0f2fe"/>
                    </linearGradient>
                    <linearGradient id="vso_b_${id}" x1="8" y1="16" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#bae6fd"/><stop offset="1" stop-color="#0ea5e9"/>
                    </linearGradient>
                </defs>
                <path d="M10 6.5 22 6.5 26 12.4 16 16.4 6 12.4Z" fill="url(#vso_a_${id})"/>
                <path d="M6 12.4 16 16.4 26 12.4 16 29Z" fill="url(#vso_b_${id})"/>
                <path d="M12.6 8 19.4 8 21 10.4 10.6 10.4Z" fill="#ffffff" opacity="0.92"/>
                <path d="M10 6.5 16 16.4 22 6.5M6 12.4 16 16.4 26 12.4M16 16.4 16 29M12.6 8 10.6 10.4M19.4 8 21 10.4" stroke="#ffffff" stroke-width="0.5" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "val-rose-dot",
            "name": "Rose Aura Dot",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.22,
            "maxScale": 0.42,
            "minOpacity": 0.25,
            "maxOpacity": 0.45,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="vrd_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.35" stop-color="#fb7185"/><stop offset="1" stop-color="#be123c" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="13" fill="url(#vrd_${id})"/>
                <circle cx="16" cy="16" r="4" fill="#ffffff" opacity="0.9"/>
                <circle cx="14" cy="14" r="1.2" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "val-gem-heart",
            "name": "Garnet Gem Heart",
            "tier": "near",
            "material": "heart",
            "rarity": "rare",
            "minScale": 0.84,
            "maxScale": 1.24,
            "minOpacity": 0.7,
            "maxOpacity": 0.92,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vgh_a_${id}" x1="16" y1="5" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="0.5" stop-color="#e11d48"/><stop offset="1" stop-color="#7f1d3a"/>
                    </linearGradient>
                </defs>
                <path d="M16 28.5 5.6 16.2 11 8.2 16 12.2 21 8.2 26.4 16.2Z" fill="url(#vgh_a_${id})"/>
                <path d="M11 8.2 16 12.2 16 5.6Z" fill="#fecdd3" opacity="0.7"/>
                <path d="M21 8.2 16 12.2 16 5.6Z" fill="#fda4af" opacity="0.55"/>
                <path d="M11 8.2 5.6 16.2 16 17.6Z" fill="#fb7185" opacity="0.55"/>
                <path d="M21 8.2 26.4 16.2 16 17.6Z" fill="#be123c" opacity="0.6"/>
                <path d="M16 17.6 5.6 16.2 16 28.5Z" fill="#e11d48" opacity="0.75"/>
                <path d="M16 17.6 26.4 16.2 16 28.5Z" fill="#9f1239" opacity="0.85"/>
                <path d="M16 5.6 16 12.2 16 17.6 16 28.5M11 8.2 5.6 16.2 26.4 16.2 21 8.2M5.6 16.2 16 17.6 26.4 16.2M16 12.2 11 8.2M16 12.2 21 8.2" stroke="#ffffff" stroke-width="0.5" opacity="0.55"/>
                <path d="M12.4 9.2 15 11.2" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
                <path d="M12 9.2 10 12.2" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
            </svg>
        `
        },
        {
            "id": "val-rosebud",
            "name": "Mini Rosebud",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.54,
            "maxScale": 0.86,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vrb2_${id}" x1="16" y1="6" x2="16" y2="23" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="0.55" stop-color="#e11d48"/><stop offset="1" stop-color="#881337"/>
                    </linearGradient>
                </defs>
                <path d="M16 22c1 3 2.4 5.6 4.6 8" stroke="#4d7c0f" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M16 23.5c-3.2-0.4-5.2 1.4-5.8 3.6 2.6 1 5 0.2 6.2-1.6Z" fill="#65a30d"/>
                <path d="M18.6 25.6c2.4-1.6 4.8-1.4 6.2 0.2-1.4 2-4 2.4-5.8 1.2Z" fill="#4d7c0f"/>
                <path d="M16 22c5 0 7.4-4.6 6.8-9.4-0.6-4.4-4.4-6.6-6.8-6.6s-6.2 2.2-6.8 6.6C8.6 17.4 11 22 16 22Z" fill="url(#vrb2_${id})"/>
                <path d="M12.4 10.6c1.6 2.4 4.4 3.6 7.2 2.6M11.2 13.6c1.8 2 4.2 3 6.6 2.4" stroke="#fda4af" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7"/>
                <path d="M16 6c2 0 3.6 1 4.4 2.6" stroke="#ffe4e6" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "val-love-diamond",
            "name": "Love Diamond",
            "tier": "near",
            "material": "star",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vld_a_${id}" x1="16" y1="4" x2="16" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#fce7f3"/>
                    </linearGradient>
                    <linearGradient id="vld_b_${id}" x1="16" y1="15" x2="16" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f9a8d4"/><stop offset="1" stop-color="#9d174d"/>
                    </linearGradient>
                </defs>
                <path d="M9.6 5.5 22.4 5.5 27.6 12.2 16 16.4 4.4 12.2Z" fill="url(#vld_a_${id})"/>
                <path d="M4.4 12.2 16 16.4 27.6 12.2 16 29Z" fill="url(#vld_b_${id})"/>
                <path d="M9.6 5.5 16 16.4 22.4 5.5M4.4 12.2 16 16.4 27.6 12.2M16 16.4 16 29" stroke="#ffffff" stroke-width="0.5" opacity="0.6"/>
                <path d="M16 13.6c-0.2 0-3-2-3-4 0-1.1 0.9-1.7 1.7-1.7 0.5 0 0.9 0.2 1.3 0.6 0.4-0.4 0.8-0.6 1.3-0.6 0.8 0 1.7 0.6 1.7 1.7 0 2-2.8 4-3 4Z" fill="#be185d" opacity="0.55"/>
                <path d="M13 8.4 19 8.4" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.8"/>
            </svg>
        `
        }
    ],
    "birthday": [
        {
            "id": "bday-cake",
            "name": "Birthday Cake",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bc_cake_${id}" x1="5" y1="17" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbcfe8"/><stop offset="1" stop-color="#db2777"/>
                    </linearGradient>
                    <linearGradient id="bc_icing_${id}" x1="4" y1="14" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7f8"/><stop offset="1" stop-color="#fda4af"/>
                    </linearGradient>
                    <linearGradient id="bc_plate_${id}" x1="2" y1="27" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f1f5f9"/><stop offset="1" stop-color="#cbd5e1"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="28.4" rx="14" ry="1.8" fill="url(#bc_plate_${id})"/>
                <rect x="4.6" y="17.2" width="22.8" height="10.6" rx="2.2" fill="url(#bc_cake_${id})"/>
                <path d="M9.6 18v9.4M16 18v9.4M22.4 18v9.4" stroke="#ffffff" stroke-width="0.8" opacity="0.45"/>
                <rect x="3.6" y="14.8" width="24.8" height="4.4" rx="2.2" fill="url(#bc_icing_${id})"/>
                <circle cx="7.4" cy="19.2" r="1.5" fill="#fda4af"/>
                <circle cx="12.8" cy="19.6" r="1.15" fill="#fda4af"/>
                <circle cx="19.2" cy="19.6" r="1.15" fill="#fda4af"/>
                <circle cx="24.6" cy="19.2" r="1.5" fill="#fda4af"/>
                <rect x="9.6" y="9.2" width="2.2" height="6" rx="1.1" fill="#fbcfe8"/>
                <rect x="14.9" y="7.4" width="2.2" height="7.8" rx="1.1" fill="#a5b4fc"/>
                <rect x="20.2" y="9.2" width="2.2" height="6" rx="1.1" fill="#fcd34d"/>
                <path d="M10.7 9v-1.4M16 7.2V6M21.3 9v-1.4" stroke="#7c2d12" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M10.7 4.8c1.2 1 1.2 2.4 0 3.4-1.2-1-1.2-2.4 0-3.4Z" fill="#fbbf24"/>
                <path d="M16 2.6c1.4 1.2 1.4 2.8 0 4-1.4-1.2-1.4-2.8 0-4Z" fill="#fbbf24"/>
                <path d="M21.3 4.8c1.2 1 1.2 2.4 0 3.4-1.2-1-1.2-2.4 0-3.4Z" fill="#fbbf24"/>
                <circle cx="10.7" cy="6.4" r="0.8" fill="#fff8e1"/>
                <circle cx="16" cy="4.6" r="0.8" fill="#fff8e1"/>
                <circle cx="21.3" cy="6.4" r="0.8" fill="#fff8e1"/>
            </svg>
        `
        },
        {
            "id": "bday-double-cake",
            "name": "Double Star Cake",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bdc_bot_${id}" x1="4" y1="19" x2="28" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbcfe8"/><stop offset="1" stop-color="#db2777"/>
                    </linearGradient>
                    <linearGradient id="bdc_top_${id}" x1="8" y1="10" x2="24" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff1f2"/><stop offset="1" stop-color="#f9a8d4"/>
                    </linearGradient>
                    <linearGradient id="bdc_plate_${id}" x1="2" y1="28" x2="30" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f1f5f9"/><stop offset="1" stop-color="#cbd5e1"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="29.4" rx="14.5" ry="1.8" fill="url(#bdc_plate_${id})"/>
                <rect x="3" y="19" width="26" height="10.4" rx="2.2" fill="url(#bdc_bot_${id})"/>
                <rect x="2" y="16.8" width="28" height="4.2" rx="2.1" fill="#fff1f2"/>
                <circle cx="6" cy="21.2" r="1.5" fill="#f9a8d4"/>
                <circle cx="12" cy="21.6" r="1.15" fill="#f9a8d4"/>
                <circle cx="20" cy="21.6" r="1.15" fill="#f9a8d4"/>
                <circle cx="26" cy="21.2" r="1.5" fill="#f9a8d4"/>
                <rect x="8.4" y="10.6" width="15.2" height="7" rx="1.6" fill="url(#bdc_top_${id})"/>
                <rect x="7.6" y="8.8" width="16.8" height="3.4" rx="1.6" fill="#fff1f2"/>
                <circle cx="11.4" cy="12.6" r="1" fill="#fbcfe8"/>
                <circle cx="16" cy="13" r="0.9" fill="#fbcfe8"/>
                <circle cx="20.6" cy="12.6" r="1" fill="#fbcfe8"/>
                <path d="M12.5 6 12.5 9.4M19.5 6 19.5 9.4" stroke="#fbbf24" stroke-width="0.9" stroke-linecap="round"/>
                <path d="M12.5 1.3 13.22 3.51 15.54 3.51 13.66 4.88 14.38 7.09 12.5 5.72 10.62 7.09 11.34 4.88 9.46 3.51 11.78 3.51Z" fill="#fcd34d"/>
                <path d="M19.5 1.3 20.22 3.51 22.54 3.51 20.66 4.88 21.38 7.09 19.5 5.72 17.62 7.09 18.34 4.88 16.46 3.51 18.78 3.51Z" fill="#fbbf24"/>
            </svg>
        `
        },
        {
            "id": "bday-present-pink",
            "name": "Pink Gift Box",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.58,
            "maxScale": 0.94,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpp_box_${id}" x1="6" y1="13" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbcfe8"/><stop offset="0.5" stop-color="#f472b6"/><stop offset="1" stop-color="#be185d"/>
                    </linearGradient>
                    <linearGradient id="bpp_lid_${id}" x1="4" y1="10" x2="32" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fb7185"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <rect x="6" y="13" width="24" height="19" rx="1.8" fill="url(#bpp_box_${id})"/>
                <rect x="4.5" y="10.5" width="27" height="5" rx="1.6" fill="url(#bpp_lid_${id})"/>
                <rect x="16" y="10.5" width="4" height="21.5" fill="#fde68a"/>
                <rect x="16" y="10.5" width="4" height="21.5" fill="#ffffff" opacity="0.25"/>
                <path d="M4.5 13h27" stroke="#ffffff" stroke-width="0.7" opacity="0.4"/>
                <path d="M18 10.5c-3.6-3-6.4-3-6.6-0.8-0.2 1.8 2.6 2.2 6.6 0.8Z" fill="#fde68a"/>
                <path d="M18 10.5c3.6-3 6.4-3 6.6-0.8 0.2 1.8-2.6 2.2-6.6 0.8Z" fill="#fde68a"/>
                <path d="M18 10.5c-1.8-2.6-4-3.4-4.4-1.6-0.4 1.6 2 2 4.4 1.6Z" fill="#fbbf24"/>
                <path d="M18 10.5c1.8-2.6 4-3.4 4.4-1.6 0.4 1.6-2 2-4.4 1.6Z" fill="#fbbf24"/>
                <circle cx="18" cy="10.4" r="1.4" fill="#f59e0b"/>
            </svg>
        `
        },
        {
            "id": "bday-present-blue",
            "name": "Blue Gift Box",
            "tier": "mid",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.54,
            "maxScale": 0.86,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpb_box_${id}" x1="4" y1="16" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#93c5fd"/><stop offset="0.5" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e40af"/>
                    </linearGradient>
                    <linearGradient id="bpb_lid_${id}" x1="2" y1="12" x2="34" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                </defs>
                <rect x="4" y="17" width="28" height="14" rx="1.6" fill="url(#bpb_box_${id})"/>
                <rect x="2.5" y="13" width="31" height="5" rx="1.4" fill="url(#bpb_lid_${id})"/>
                <rect x="4" y="23.4" width="28" height="3.6" fill="#fef3c7"/>
                <path d="M4 24.2h28M4 25.8h28" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>
                <path d="M18 13c-3.4-3.4-6-4-6.6-1.8-0.6 2 2.4 2.6 6.6 1.8Z" fill="#fef3c7"/>
                <path d="M18 13c3.4-3.4 6-4 6.6-1.8 0.6 2-2.4 2.6-6.6 1.8Z" fill="#fef3c7"/>
                <circle cx="18" cy="12.6" r="1.6" fill="#fbbf24"/>
            </svg>
        `
        },
        {
            "id": "bday-present-green",
            "name": "Emerald Gift Box",
            "tier": "mid",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.52,
            "maxScale": 0.84,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpg_box_${id}" x1="5" y1="12" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#6ee7b7"/><stop offset="0.5" stop-color="#10b981"/><stop offset="1" stop-color="#065f46"/>
                    </linearGradient>
                </defs>
                <rect x="5" y="12" width="26" height="19" rx="2" fill="url(#bpg_box_${id})"/>
                <rect x="17" y="12" width="2.2" height="19" fill="#fef3c7"/>
                <rect x="5" y="20.4" width="26" height="2.2" fill="#fef3c7"/>
                <path d="M5 12h26" stroke="#ffffff" stroke-width="0.6" opacity="0.4"/>
                <path d="M18 12c-3-3.2-5.6-3.8-6.2-1.6-0.6 2 2.4 2.4 6.2 1.6Z" fill="#fef3c7"/>
                <path d="M18 12c3-3.2 5.6-3.8 6.2-1.6 0.6 2-2.4 2.4-6.2 1.6Z" fill="#fef3c7"/>
                <circle cx="18" cy="11.6" r="1.4" fill="#fbbf24"/>
            </svg>
        `
        },
        {
            "id": "bday-balloon-pair",
            "name": "Twin Party Balloons",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bbp_a_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fbcfe8"/><stop offset="0.55" stop-color="#f472b6"/><stop offset="1" stop-color="#be185d"/>
                    </radialGradient>
                    <radialGradient id="bbp_b_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#bfdbfe"/><stop offset="0.55" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e40af"/>
                    </radialGradient>
                </defs>
                <ellipse cx="12" cy="12" rx="6.5" ry="8" fill="url(#bbp_a_${id})"/>
                <ellipse cx="21" cy="11" rx="6" ry="7.5" fill="url(#bbp_b_${id})"/>
                <path d="M9.2 6.8c-1.2 1.4-1.6 3-1.4 4.4" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                <path d="M18.6 5.8c-1.1 1.2-1.5 2.7-1.3 3.9" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" opacity="0.65"/>
                <path d="M10.2 20 12 21.6 13.8 20Z" fill="#be185d"/>
                <path d="M19.4 18.6 21 20 22.6 18.6Z" fill="#1e40af"/>
                <path d="M12 21.6c-1 3-0.4 5.6 2 8.4" stroke="#cbd5e1" stroke-width="0.85" stroke-linecap="round" fill="none"/>
                <path d="M21 20c-0.4 3 0.6 5.6 3 8.4" stroke="#cbd5e1" stroke-width="0.85" stroke-linecap="round" fill="none"/>
            </svg>
        `
        },
        {
            "id": "bday-candle",
            "name": "Golden Birthday Candle",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.46,
            "maxScale": 0.76,
            "minOpacity": 0.46,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 24 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bca_${id}" x1="8" y1="10" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#fcd34d"/><stop offset="1" stop-color="#d97706"/>
                    </linearGradient>
                </defs>
                <rect x="8" y="10" width="8" height="22" rx="2" fill="url(#bca_${id})"/>
                <path d="M8 14.4 16 16.4M8 19.4 16 21.4M8 24.4 16 26.4" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.55"/>
                <path d="M12 10V8" stroke="#7c2d12" stroke-width="0.9" stroke-linecap="round"/>
                <path d="M12 2.4c2 2 2.4 4 0.8 5.6-1.2-0.4-1.6-1-1.6-1.8-1 0.8-1.2 2.2-0.2 3.4-1.8-0.6-2.4-2.6-1.6-4.4 0.6-1.2 1.6-2 2.6-2.8Z" fill="#fbbf24"/>
                <path d="M12 4.4c0.9 0.9 1.1 1.9 0.4 2.7-0.6-0.3-0.8-0.9-0.6-1.4-0.5 0.5-0.5 1.3 0 1.9-0.9-0.5-1-1.5-0.4-2.4 0.2-0.3 0.4-0.5 0.6-0.8Z" fill="#fff8e1"/>
            </svg>
        `
        },
        {
            "id": "bday-candle-colorful",
            "name": "Rainbow Party Candle",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.46,
            "maxScale": 0.76,
            "minOpacity": 0.46,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 24 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bcc_${id}" x1="8" y1="10" x2="16" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fca5a5"/><stop offset="0.25" stop-color="#fcd34d"/><stop offset="0.5" stop-color="#86efac"/><stop offset="0.75" stop-color="#93c5fd"/><stop offset="1" stop-color="#c4b5fd"/>
                    </linearGradient>
                </defs>
                <rect x="8" y="10" width="8" height="22" rx="2" fill="url(#bcc_${id})"/>
                <path d="M8 15 16 15M8 20 16 20M8 25 16 25M8 30 16 30" stroke="#ffffff" stroke-width="0.8" opacity="0.45"/>
                <path d="M12 10V7.6" stroke="#7c2d12" stroke-width="0.9" stroke-linecap="round"/>
                <path d="M12 2c2 2 2.4 4 0.8 5.6-1.2-0.4-1.6-1-1.6-1.8-1 0.8-1.2 2.2-0.2 3.4-1.8-0.6-2.4-2.6-1.6-4.4 0.6-1.2 1.6-2 2.6-2.8Z" fill="#fbbf24"/>
                <path d="M12 4c0.9 0.9 1.1 1.9 0.4 2.7-0.6-0.3-0.8-0.9-0.6-1.4-0.5 0.5-0.5 1.3 0 1.9-0.9-0.5-1-1.5-0.4-2.4 0.2-0.3 0.4-0.5 0.6-0.8Z" fill="#fff8e1"/>
            </svg>
        `
        },
        {
            "id": "bday-confetti-burst",
            "name": "Party Confetti Burst",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14.4 9.2 5.6M16.2 13.6 17 3.2M17 14.4 23.4 5.2M18.4 15.4 27.4 11M17.4 16.4 23 25.2M16.4 16.6 13 27M14.8 16.6 6.6 24.6M14 15.6 4.6 12.4M14.6 14.6 9 9" stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
                <circle cx="16" cy="15.4" r="3" fill="#ffffff"/>
                <circle cx="16" cy="15.4" r="1.6" fill="#fbbf24"/>
            </svg>
        `
        },
        {
            "id": "bday-party-popper",
            "name": "Mini Party Popper",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.5,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpo_${id}" x1="8" y1="22" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#dc2626"/><stop offset="0.5" stop-color="#f59e0b"/><stop offset="1" stop-color="#fcd34d"/>
                    </linearGradient>
                </defs>
                <path d="M8 25 12.6 14.6 22 19 11.4 25Z" fill="url(#bpo_${id})"/>
                <path d="M8 25 12.6 14.6 22 19 11.4 25Z" stroke="#ffffff" stroke-width="0.6" opacity="0.35" fill="none"/>
                <circle cx="11.4" cy="21.6" r="1" fill="#ffffff" opacity="0.9"/>
                <path d="M13.4 13.2 13 8M16.4 14 19 9.6M19 16 24 14.6M18 19.2 23 21.6M14 19 11 24" stroke="#f43f5e" stroke-width="1.3" stroke-linecap="round"/>
                <circle cx="13" cy="7.2" r="1.1" fill="#fcd34d"/>
                <circle cx="19.6" cy="8.8" r="1" fill="#a5b4fc"/>
                <circle cx="24.6" cy="14.4" r="1" fill="#f472b6"/>
                <circle cx="23.6" cy="22.4" r="1" fill="#34d399"/>
            </svg>
        `
        },
        {
            "id": "bday-party-hat",
            "name": "Party Hat",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.54,
            "maxScale": 0.88,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bph_${id}" x1="6" y1="6" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#a5f3fc"/><stop offset="0.5" stop-color="#06b6d4"/><stop offset="1" stop-color="#0e7490"/>
                    </linearGradient>
                </defs>
                <path d="M16 3 4.4 27.4h23.2Z" fill="url(#bph_${id})"/>
                <path d="M11 12.4 21 15.4M8.4 18.4 23.4 22.6M6 24.4 26 24.4" stroke="#fef3c7" stroke-width="1.4" stroke-linecap="round" opacity="0.9"/>
                <ellipse cx="16" cy="27.4" rx="12" ry="1.8" fill="#0e7490" opacity="0.7"/>
                <circle cx="16" cy="3" r="2.4" fill="#fb7185"/>
                <circle cx="15.2" cy="2.2" r="1" fill="#fecdd3" opacity="0.8"/>
                <path d="M25 8.6 25.4 10 26.8 10.4 25.4 10.8 25 12.2 24.6 10.8 23.2 10.4 24.6 10Z" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "bday-cupcake",
            "name": "Birthday Cupcake",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.54,
            "maxScale": 0.88,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bcu_wrap_${id}" x1="8" y1="16" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="0.5" stop-color="#f43f5e"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                    <radialGradient id="bcu_frost_${id}" cx="35%" cy="25%" r="80%">
                        <stop stop-color="#fff7ed"/><stop offset="0.5" stop-color="#fdba74"/><stop offset="1" stop-color="#ea580c"/>
                    </radialGradient>
                </defs>
                <path d="M8.4 16.6h15.2l-1.4 12c-0.1 1-1 1.8-2 1.8h-8.4c-1 0-1.9-0.8-2-1.8Z" fill="url(#bcu_wrap_${id})"/>
                <path d="M11.4 17.4v12.6M16 17.4v12.6M20.6 17.4v12.6" stroke="#ffffff" stroke-width="0.7" opacity="0.45"/>
                <circle cx="10.6" cy="11.4" r="4.4" fill="url(#bcu_frost_${id})"/>
                <circle cx="21.4" cy="11.4" r="4.4" fill="url(#bcu_frost_${id})"/>
                <circle cx="16" cy="10.4" r="4.4" fill="url(#bcu_frost_${id})"/>
                <rect x="6.4" y="12" width="19.2" height="4.9" rx="1.6" fill="url(#bcu_frost_${id})"/>
                <path d="M12 13.6 13.6 12M20 13.6 18.4 12M16 12.6 16 10.6" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
                <circle cx="16" cy="4" r="2.4" fill="#dc2626"/>
                <circle cx="15.2" cy="3.2" r="0.9" fill="#fca5a5" opacity="0.9"/>
                <path d="M16.2 2.4c1-1.6 2.4-2.2 3.4-2" stroke="#4d7c0f" stroke-width="0.9" stroke-linecap="round" fill="none"/>
            </svg>
        `
        },
        {
            "id": "bday-prism-star",
            "name": "Prismatic Birthday Star",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.58,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bps_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#fff8e1"/><stop offset="0.6" stop-color="#fcd34d"/><stop offset="1" stop-color="#f59e0b"/>
                    </radialGradient>
                </defs>
                <path d="m16 2.4 2.6 8 8.4 1.4-6.2 5.6 1.8 8.4L16 21.4l-6.6 4.4 1.8-8.4-6.2-5.6 8.4-1.4Z" fill="url(#bps_${id})"/>
                <path d="m16 5.6 1.8 5.6 5.8 1-4.4 3.8 1.4 5.8L16 18.8l-4.6 3 1.4-5.8-4.4-3.8 5.8-1Z" fill="#ffffff" opacity="0.55"/>
                <circle cx="16" cy="15.4" r="1.6" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "bday-metallic-strip",
            "name": "Metallic Confetti Strip",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.34,
            "maxScale": 0.62,
            "minOpacity": 0.38,
            "maxOpacity": 0.62,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bms_${id}" x1="6" y1="7" x2="26" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.45" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="13" width="18" height="5.4" rx="1.4" transform="rotate(-30 16 16)" fill="url(#bms_${id})"/>
                <path d="M10 12.6 21.4 17.4" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "bday-turquoise-strip",
            "name": "Aqua Celebration Streamer",
            "tier": "mid",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.47,
            "maxScale": 0.8,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bts_${id}" x1="4" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#67e8f9"/><stop offset="0.5" stop-color="#06b6d4"/><stop offset="1" stop-color="#0e7490"/>
                    </linearGradient>
                </defs>
                <path d="M4 14c4-6 8 6 12 0s8 6 12 0" stroke="url(#bts_${id})" stroke-width="3.4" stroke-linecap="round" fill="none"/>
                <path d="M4 14c4-6 8 6 12 0s8 6 12 0" stroke="#ecfeff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "bday-party-star",
            "name": "Party Star",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpst_${id}" x1="16" y1="3" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef08a"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#d97706"/>
                    </linearGradient>
                </defs>
                <path d="m16 2.6 3.6 8.4 9.2 0.8-7 6 2.1 9-7.9-4.6-7.9 4.6 2.1-9-7-6 9.2-0.8Z" fill="url(#bpst_${id})"/>
                <path d="m16 6.6 2.4 5.6 6.1 0.5-4.6 4 1.4 6-5.3-3-5.3 3 1.4-6-4.6-4 6.1-0.5Z" fill="#ffffff" opacity="0.5"/>
                <circle cx="16" cy="15.4" r="2" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "bday-spark-burst",
            "name": "Confetti Spark Burst",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.46,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bsb_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fce7f3"/><stop offset="1" stop-color="#f472b6" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.6v9.4M16 20v9.4M2.6 16h9.4M20 16h9.4M6.6 6.6l6.6 6.6M18.8 18.8l6.6 6.6M25.4 6.6l-6.6 6.6M13.2 18.8 6.6 25.4" stroke="#f43f5e" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
                <circle cx="16" cy="16" r="6" fill="url(#bsb_${id})"/>
                <circle cx="16" cy="16" r="3" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1.4" fill="#f43f5e"/>
            </svg>
        `
        },
        {
            "id": "bday-paper-shard",
            "name": "Confetti Paper Shard",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.54,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bks_${id}" x1="8" y1="6" x2="24" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#6ee7b7"/><stop offset="1" stop-color="#047857"/>
                    </linearGradient>
                </defs>
                <path d="M7.6 8.6C14 5.6 22 7 26.4 14c-3.6 6.6-10.6 10.2-17.6 9.6-2-4.6-2.2-10.2-1.2-15Z" fill="url(#bks_${id})"/>
                <path d="M10.4 9.8c4.6-2 10.6-1 14 3.6" stroke="#dcfce7" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "bday-balloon",
            "name": "Pearl Balloon",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.82,
            "maxScale": 1.22,
            "minOpacity": 0.7,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bbl_${id}" cx="36%" cy="30%" r="76%">
                        <stop stop-color="#fce7f3"/><stop offset="0.4" stop-color="#f472b6"/><stop offset="0.85" stop-color="#be185d"/><stop offset="1" stop-color="#831843"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.6c-4.8 0-8.6 3.8-8.6 9.2 0 5.2 3.4 10 8.6 12.4 5.2-2.4 8.6-7.2 8.6-12.4 0-5.4-3.8-9.2-8.6-9.2Z" fill="url(#bbl_${id})"/>
                <ellipse cx="11.6" cy="9.6" rx="2.2" ry="3.4" fill="#ffffff" opacity="0.55" transform="rotate(-22 11.6 9.6)"/>
                <path d="M14 25 16 27.6 18 25Z" fill="#831843"/>
                <path d="M16 27.6c1.4 1.6 1.4 3 0 4.4" stroke="#cbd5e1" stroke-width="0.85" stroke-linecap="round" fill="none"/>
            </svg>
        `
        },
        {
            "id": "bday-ribbon",
            "name": "Pastel Ribbon Curl",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.84,
            "maxScale": 1.22,
            "minOpacity": 0.62,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="brb_${id}" x1="4" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f0abfc"/><stop offset="0.5" stop-color="#a855f7"/><stop offset="1" stop-color="#6b21a8"/>
                    </linearGradient>
                </defs>
                <path d="M6 7c9 0 14 4 12 9-1.4 3.6-9 2.4-9.4 6.4-0.4 3.6 4.6 5.8 17.4 5.2" stroke="url(#brb_${id})" stroke-width="2.4" stroke-linecap="round" fill="none"/>
                <path d="M6 7c6 0 10 1.6 11.6 4.6" stroke="#f5d0fe" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "bday-confetti-dot",
            "name": "Prism Confetti Dot",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.22,
            "maxScale": 0.42,
            "minOpacity": 0.3,
            "maxOpacity": 0.52,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bcd_${id}" cx="35%" cy="35%" r="70%">
                        <stop stop-color="#e0f2fe"/><stop offset="0.5" stop-color="#38bdf8"/><stop offset="1" stop-color="#0369a1"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="7" fill="url(#bcd_${id})"/>
                <circle cx="13.6" cy="13.4" r="1.8" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "bday-prism",
            "name": "Birthday Prism",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bpr_a_${id}" x1="6" y1="6" x2="26" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef08a"/><stop offset="1" stop-color="#fb923c"/>
                    </linearGradient>
                    <linearGradient id="bpr_b_${id}" x1="6" y1="16" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f472b6"/><stop offset="1" stop-color="#7c3aed"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.4 26.4 11 22 28.6 10 28.6 5.6 11Z" fill="url(#bpr_a_${id})"/>
                <path d="M5.6 11 26.4 11 16 16.4Z" fill="#ffffff" opacity="0.45"/>
                <path d="M5.6 11 10 28.6 16 16.4Z" fill="url(#bpr_b_${id})" opacity="0.75"/>
                <path d="M26.4 11 22 28.6 16 16.4Z" fill="#c026d3" opacity="0.55"/>
                <path d="M10 28.6 16 16.4 22 28.6M5.6 11 16 16.4 26.4 11M16 3.4 16 16.4" stroke="#ffffff" stroke-width="0.55" opacity="0.75"/>
            </svg>
        `
        },
        {
            "id": "bday-mini-lantern",
            "name": "Mini Party Lantern",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.65,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bml_${id}" x1="8" y1="10" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="0.5" stop-color="#f43f5e"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                    <linearGradient id="bml_g_${id}" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="1" stop-color="#d97706"/>
                    </linearGradient>
                </defs>
                <path d="M10.6 9.6h10.8l1 2.4H9.6Z" fill="url(#bml_g_${id})"/>
                <path d="M9.6 12h12.8v10.4H9.6Z" fill="url(#bml_${id})"/>
                <path d="M13 12v10.4M16 12v10.4M19 12v10.4" stroke="#fef3c7" stroke-width="0.7" opacity="0.55"/>
                <path d="M9.6 22.4h12.8l-1 2.4H10.6Z" fill="url(#bml_g_${id})"/>
                <path d="M16 24.8v4" stroke="#fcd34d" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M15 28.8 16 29.4 17 28.8" stroke="#fcd34d" stroke-width="0.9" stroke-linecap="round" fill="none"/>
                <path d="M16 9.6V6.4" stroke="#fcd34d" stroke-width="1" stroke-linecap="round"/>
            </svg>
        `
        },
        {
            "id": "bday-gift-sparkle",
            "name": "Gift and Sparkle",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.5,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bgs_${id}" x1="4" y1="14" x2="22" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#c4b5fd"/><stop offset="0.5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#5b21b6"/>
                    </linearGradient>
                </defs>
                <rect x="4" y="15" width="16" height="13" rx="1.4" fill="url(#bgs_${id})"/>
                <rect x="3" y="12.8" width="18" height="3.4" rx="1.2" fill="#a78bfa"/>
                <rect x="10.8" y="12.8" width="2.4" height="15.2" fill="#fde68a"/>
                <path d="M12 12.8c-2.2-2.2-4-2.6-4.2-1-0.2 1.4 1.6 1.8 4.2 1Z" fill="#fde68a"/>
                <path d="M12 12.8c2.2-2.2 4-2.6 4.2-1 0.2 1.4-1.6 1.8-4.2 1Z" fill="#fde68a"/>
                <path d="M25 4.6 26 8.4 29.8 9.4 26 10.4 25 14.2 24 10.4 20.2 9.4 24 8.4Z" fill="#fef08a"/>
                <circle cx="25" cy="9.4" r="1.4" fill="#ffffff"/>
                <path d="M22 21.4 22.6 23.4 24.6 24 22.6 24.6 22 26.6 21.4 24.6 19.4 24 21.4 23.4Z" fill="#fcd34d" opacity="0.9"/>
            </svg>
        `
        }
    ],
    "christmas": [
        {
            "id": "xmas-pine-tree",
            "name": "Falling Christmas Tree",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.2,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xt_t_${id}" x1="16" y1="5" x2="16" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22c55e"/><stop offset="0.5" stop-color="#15803d"/><stop offset="1" stop-color="#052e16"/>
                    </linearGradient>
                    <linearGradient id="xt_s_${id}" x1="16" y1="1" x2="16" y2="9" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="m16 1.2 1.5 2.7 3 .4-2.2 2 .6 3L16 7.9l-2.9 1.4.6-3-2.2-2 3-.4Z" fill="url(#xt_s_${id})"/>
                <path d="M16 6 9.6 15h3.4L7 23h4.4L5.6 31h8.4v5.6h4V31h8.4L20.6 23H25l-6-8h3.4L16 6Z" fill="url(#xt_t_${id})"/>
                <rect x="14.6" y="34" width="2.8" height="4.6" rx="0.6" fill="#78350f"/>
                <path d="M10 18c2 2 4 3 6 3s4-1 6-3" stroke="#fbbf24" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.9"/>
                <path d="M8.4 25c2.6 2.6 5 3.6 7.6 3.6s5-1 7.6-3.6" stroke="#fbbf24" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.9"/>
                <circle cx="11.4" cy="17.4" r="1.2" fill="#ef4444"/>
                <circle cx="20.6" cy="17.4" r="1.2" fill="#60a5fa"/>
                <circle cx="16" cy="21.6" r="1.3" fill="#fbbf24"/>
                <circle cx="9.8" cy="26.4" r="1.2" fill="#ef4444"/>
                <circle cx="22.2" cy="26.4" r="1.2" fill="#a78bfa"/>
                <circle cx="16" cy="30" r="1.3" fill="#f97316"/>
                <circle cx="11" cy="17" r="0.4" fill="#ffffff" opacity="0.9"/>
                <circle cx="20.2" cy="17" r="0.4" fill="#ffffff" opacity="0.9"/>
                <circle cx="15.6" cy="21.2" r="0.4" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "xmas-bell-gold",
            "name": "Golden Christmas Bell",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xb_g_${id}" x1="6" y1="10" x2="26" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.4" stop-color="#facc15"/><stop offset="0.85" stop-color="#b45309"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                    <linearGradient id="xb_r_${id}" x1="16" y1="4" x2="16" y2="9" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="1" stop-color="#991b1b"/>
                    </linearGradient>
                </defs>
                <path d="M16 5.4c-2.4-2-4.8-2.2-5.2-0.4-0.4 1.6 2 2.2 5.2 0.4Z" fill="url(#xb_r_${id})"/>
                <path d="M16 5.4c2.4-2 4.8-2.2 5.2-0.4 0.4 1.6-2 2.2-5.2 0.4Z" fill="url(#xb_r_${id})"/>
                <circle cx="16" cy="5.6" r="1" fill="#7f1d1d"/>
                <path d="M6.6 24.6h18.8c-1-1.8-2.6-2.6-2.8-4.6v-5.4c0-3.4-2.8-6.2-6.6-6.2s-6.6 2.8-6.6 6.2V20c-0.2 2-1.8 2.8-2.8 4.6Z" fill="url(#xb_g_${id})"/>
                <rect x="6.2" y="23.2" width="19.6" height="1.6" rx="0.8" fill="#92400e"/>
                <circle cx="16" cy="27.6" r="2" fill="#facc15" stroke="#92400e" stroke-width="0.6"/>
                <circle cx="15.4" cy="27" r="0.6" fill="#ffffff"/>
                <path d="M11 12.4c1-1.8 2.4-2.8 4-3.2" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.8"/>
                <path d="M9.4 20.4c0.6-1 1.4-1.6 2.2-1.8" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "xmas-bell-pair",
            "name": "Twin Christmas Bells",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 40 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xbp_g1_${id}" x1="4" y1="8" x2="20" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                    <linearGradient id="xbp_g2_${id}" x1="20" y1="8" x2="36" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="0.5" stop-color="#f59e0b"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                    <linearGradient id="xbp_r_${id}" x1="20" y1="2" x2="20" y2="10" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>
                <path d="M2.4 24.6h17c-1-1.8-2.4-2.6-2.6-4.6v-4.6c0-3.2-2.6-5.6-6-5.6s-6 2.4-6 5.6V20c-0.2 2-1.6 2.8-2.4 4.6Z" fill="url(#xbp_g1_${id})"/>
                <rect x="2" y="23.4" width="17.8" height="1.4" rx="0.7" fill="#92400e"/>
                <circle cx="10.6" cy="27" r="1.7" fill="#facc15" stroke="#92400e" stroke-width="0.5"/>
                <path d="M5 12c0.8-1.6 2-2.6 3.4-3" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.8"/>
                <path d="M20.6 24.6h17c-1-1.8-2.4-2.6-2.6-4.6v-4.6c0-3.2-2.6-5.6-6-5.6s-6 2.4-6 5.6V20c-0.2 2-1.6 2.8-2.4 4.6Z" fill="url(#xbp_g2_${id})"/>
                <rect x="20.2" y="23.4" width="17.8" height="1.4" rx="0.7" fill="#7c2d12"/>
                <circle cx="28.8" cy="27" r="1.7" fill="#fbbf24" stroke="#7c2d12" stroke-width="0.5"/>
                <path d="M23.2 12c0.8-1.6 2-2.6 3.4-3" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M20 5.6c-2.6-2-5-2.2-5.4-0.4-0.4 1.6 2 2.2 5.4 0.4Z" fill="url(#xbp_r_${id})"/>
                <path d="M20 5.6c2.6-2 5-2.2 5.4-0.4 0.4 1.6-2 2.2-5.4 0.4Z" fill="url(#xbp_r_${id})"/>
                <circle cx="20" cy="5.8" r="1.1" fill="#7f1d1d"/>
            </svg>
        `
        },
        {
            "id": "xmas-double-trees",
            "name": "Twin Holiday Trees",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.14,
            "minOpacity": 0.65,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 42 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xdt_t1_${id}" x1="12" y1="6" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#22c55e"/><stop offset="0.5" stop-color="#15803d"/><stop offset="1" stop-color="#052e16"/>
                    </linearGradient>
                    <linearGradient id="xdt_t2_${id}" x1="30" y1="10" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ade80"/><stop offset="0.5" stop-color="#16a34a"/><stop offset="1" stop-color="#065f46"/>
                    </linearGradient>
                </defs>
                <path d="M12 4 7 13h2.6L5.6 20h3L4 27h7v4h2v-4h7l-4.6-7h3l-4-7h2.6L12 4Z" fill="url(#xdt_t1_${id})"/>
                <rect x="11" y="30" width="2" height="4" rx="0.4" fill="#78350f"/>
                <path d="m12 2.4 1 1.9 2.1.3-1.5 1.5.4 2.1-2-1.1-2 1.1.4-2.1-1.5-1.5 2.1-.3Z" fill="#fbbf24"/>
                <circle cx="9" cy="16" r="0.9" fill="#ef4444"/>
                <circle cx="14.6" cy="20" r="0.9" fill="#60a5fa"/>
                <path d="M30 8 23.4 20h3.2L22 26h4L20 33h8v3h4v-3h8l-6-7h4l-4.6-6h3.2L30 8Z" fill="url(#xdt_t2_${id})"/>
                <circle cx="27" cy="18" r="0.9" fill="#fbbf24"/>
                <circle cx="33" cy="22" r="0.9" fill="#ef4444"/>
                <circle cx="30" cy="28" r="0.9" fill="#a78bfa"/>
                <circle cx="26.8" cy="27.4" r="0.6" fill="#ffffff" opacity="0.75"/>
            </svg>
        `
        },
        {
            "id": "xmas-gift-wrapped",
            "name": "Wrapped Christmas Gift",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xgw_b_${id}" x1="4" y1="14" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fca5a5"/><stop offset="0.5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                    <linearGradient id="xgw_l_${id}" x1="2" y1="10" x2="30" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#991b1b"/><stop offset="1" stop-color="#450a0a"/>
                    </linearGradient>
                </defs>
                <rect x="4" y="14" width="24" height="16" rx="1.6" fill="url(#xgw_b_${id})"/>
                <rect x="2.6" y="11" width="26.8" height="4.4" rx="1.4" fill="url(#xgw_l_${id})"/>
                <rect x="14.6" y="11" width="2.8" height="19" fill="#fbbf24"/>
                <rect x="14.6" y="11" width="2.8" height="19" fill="#ffffff" opacity="0.2"/>
                <path d="M16 11c-2.6-2.6-5-3-5.4-1.2-0.4 1.6 2.2 2 5.4 1.2Z" fill="#fbbf24"/>
                <path d="M16 11c2.6-2.6 5-3 5.4-1.2 0.4 1.6-2.2 2-5.4 1.2Z" fill="#fbbf24"/>
                <circle cx="16" cy="10.8" r="1.3" fill="#d97706"/>
                <circle cx="9" cy="19" r="0.8" fill="#fef3c7" opacity="0.9"/>
                <circle cx="23" cy="19" r="0.8" fill="#fef3c7" opacity="0.9"/>
                <circle cx="9" cy="25" r="0.8" fill="#fef3c7" opacity="0.9"/>
                <circle cx="23" cy="25" r="0.8" fill="#fef3c7" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "xmas-snowflake-large",
            "name": "Crystal Snowflake",
            "tier": "mid",
            "material": "snow",
            "rarity": "uncommon",
            "minScale": 0.55,
            "maxScale": 0.9,
            "minOpacity": 0.5,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xsf_${id}" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#bfdbfe"/>
                    </linearGradient>
                </defs>
                <g stroke="url(#xsf_${id})" stroke-width="1.2" stroke-linecap="round" fill="none">
                    <path d="M16 3v26"/>
                    <path d="M16 16 4.7 9.5M16 16 27.3 22.5"/>
                    <path d="M16 16 4.7 22.5M16 16 27.3 9.5"/>
                    <path d="M16 6 12.6 8M16 6 19.4 8" stroke-width="0.9"/>
                    <path d="M16 26 12.6 24M16 26 19.4 24" stroke-width="0.9"/>
                    <path d="M9.6 11 12 12.4M12 12.4 12.4 9.6" stroke-width="0.85"/>
                    <path d="M22.4 21 20 19.6M20 19.6 19.6 22.4" stroke-width="0.85"/>
                    <path d="M22.4 11 20 12.4M20 12.4 19.6 9.6" stroke-width="0.85"/>
                    <path d="M9.6 21 12 19.6M12 19.6 12.4 22.4" stroke-width="0.85"/>
                </g>
                <circle cx="16" cy="16" r="1.9" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1" fill="#bfdbfe" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-snow-orb",
            "name": "Snow Globe Spark",
            "tier": "mid",
            "material": "bubble",
            "rarity": "common",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.46,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 34" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xso_${id}" cx="38%" cy="30%" r="72%">
                        <stop stop-color="#ffffff" stop-opacity="0.6"/>
                        <stop offset="0.6" stop-color="#dbeafe" stop-opacity="0.3"/>
                        <stop offset="1" stop-color="#93c5fd" stop-opacity="0.15"/>
                    </radialGradient>
                    <linearGradient id="xso_b_${id}" x1="6" y1="27" x2="26" y2="33" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#a16207"/><stop offset="1" stop-color="#451a03"/>
                    </linearGradient>
                </defs>
                <circle cx="16" cy="15" r="12" fill="url(#xso_${id})" stroke="#ffffff" stroke-width="1.1"/>
                <circle cx="16" cy="15" r="12" fill="none" stroke="#bfdbfe" stroke-width="0.5" opacity="0.8"/>
                <path d="M16 8 13 14h2l-2.4 4h3v3h2.8v-3h3L19 14h2L18 8Z" fill="#16a34a" opacity="0.9"/>
                <circle cx="16" cy="14" r="0.6" fill="#fbbf24"/>
                <circle cx="14" cy="17.4" r="0.5" fill="#ef4444"/>
                <circle cx="11" cy="11" r="0.8" fill="#ffffff" opacity="0.95"/>
                <circle cx="21" cy="13" r="0.7" fill="#ffffff" opacity="0.85"/>
                <circle cx="13" cy="21" r="0.6" fill="#ffffff" opacity="0.75"/>
                <rect x="5" y="26" width="22" height="5" rx="1.6" fill="url(#xso_b_${id})"/>
                <path d="M7 27.4h18" stroke="#fbbf24" stroke-width="0.6" opacity="0.7"/>
                <path d="M9 9c1-1.6 2.4-2.6 4-3" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-holly-berry",
            "name": "Holly Berry",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.46,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xhb_l_${id}" x1="4" y1="8" x2="28" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ade80"/><stop offset="0.5" stop-color="#16a34a"/><stop offset="1" stop-color="#14532d"/>
                    </linearGradient>
                    <radialGradient id="xhb_b_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fca5a5"/><stop offset="0.5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </radialGradient>
                </defs>
                <path d="M15.6 17c1.2-6.4 5.4-9.8 12-9.4-1.2 6.2-5.4 9.6-12 9.4Z" fill="url(#xhb_l_${id})"/>
                <path d="M16.4 17c-1.2-6.4-5.4-9.8-12-9.4 1.2 6.2 5.4 9.6 12 9.4Z" fill="url(#xhb_l_${id})"/>
                <circle cx="22" cy="12" r="0.6" fill="#bbf7d0" opacity="0.7"/>
                <circle cx="10" cy="12" r="0.6" fill="#bbf7d0" opacity="0.7"/>
                <path d="M16 17v11" stroke="#166534" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="13" cy="24" r="2.6" fill="url(#xhb_b_${id})"/>
                <circle cx="19" cy="24" r="2.6" fill="url(#xhb_b_${id})"/>
                <circle cx="16" cy="27.4" r="2.2" fill="url(#xhb_b_${id})"/>
                <circle cx="12.2" cy="23.2" r="0.7" fill="#ffffff" opacity="0.85"/>
                <circle cx="18.2" cy="23.2" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-candy-cane",
            "name": "Candy Cane Flicker",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xcc_w_${id}" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8f0"/>
                    </linearGradient>
                </defs>
                <path d="M20 28V11.5c0-3.6-2.9-6.5-6.5-6.5S7 7.9 7 11.5" stroke="url(#xcc_w_${id})" stroke-width="5.4" stroke-linecap="round" fill="none"/>
                <path d="M20 28V11.5c0-3.6-2.9-6.5-6.5-6.5S7 7.9 7 11.5" stroke="#dc2626" stroke-width="5.4" stroke-linecap="round" fill="none" stroke-dasharray="2.4 4.2"/>
                <path d="M20 28V11.5c0-3.6-2.9-6.5-6.5-6.5S7 7.9 7 11.5" stroke="#000000" stroke-width="5.4" stroke-linecap="round" fill="none" opacity="0.06"/>
                <path d="M18.4 26V11.5" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "xmas-star",
            "name": "Winter Star",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.3,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xst_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.55" stop-color="#e0f2fe"/><stop offset="1" stop-color="#bfdbfe" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 1.5C16.5 11.4 20.6 15.5 30.5 16 20.6 16.5 16.5 20.6 16 30.5 15.5 20.6 11.4 16.5 1.5 16 11.4 15.5 15.5 11.4 16 1.5Z" fill="url(#xst_${id})"/>
                <circle cx="16" cy="16" r="2" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "xmas-red-ornament",
            "name": "Red Glass Ornament",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.14,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xro_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fca5a5"/><stop offset="0.5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </radialGradient>
                    <linearGradient id="xro_c_${id}" x1="12" y1="8" x2="20" y2="14" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="M16 1.6v4" stroke="#fbbf24" stroke-width="1" stroke-linecap="round"/>
                <path d="M13.4 5.6c0-1.6 5.2-1.6 5.2 0" stroke="#fbbf24" stroke-width="1" fill="none"/>
                <rect x="12.8" y="6.4" width="6.4" height="3.4" rx="1" fill="url(#xro_c_${id})"/>
                <path d="M13.6 7.6h4.8" stroke="#7c2d12" stroke-width="0.5" opacity="0.7"/>
                <circle cx="16" cy="22" r="11.6" fill="url(#xro_${id})"/>
                <circle cx="16" cy="22" r="11.6" fill="none" stroke="#7f1d1d" stroke-width="0.5" opacity="0.5"/>
                <ellipse cx="11" cy="17" rx="2.4" ry="3.6" fill="#ffffff" opacity="0.55" transform="rotate(-30 11 17)"/>
                <circle cx="21.4" cy="15.6" r="1" fill="#ffffff" opacity="0.7"/>
                <path d="M6 24c6 2 14 2 20 0" stroke="#fef3c7" stroke-width="0.8" fill="none" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "xmas-holiday-wreath",
            "name": "Mini Holiday Wreath",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.55,
            "maxScale": 0.88,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 34 34" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xhw_${id}" x1="4" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ade80"/><stop offset="0.5" stop-color="#16a34a"/><stop offset="1" stop-color="#14532d"/>
                    </linearGradient>
                    <linearGradient id="xhw_b_${id}" x1="17" y1="22" x2="17" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="1" stop-color="#991b1b"/>
                    </linearGradient>
                </defs>
                <circle cx="17" cy="17" r="10.4" stroke="url(#xhw_${id})" stroke-width="4.4" fill="none"/>
                <path d="M11 6.4 8.6 8.6M23.4 6.4l2.4 2.2M11 27.6 8.6 25.4M23.4 27.6l2.4-2.2" stroke="#22c55e" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="11" cy="8" r="1.6" fill="#dc2626"/>
                <circle cx="23" cy="8" r="1.6" fill="#dc2626"/>
                <circle cx="11" cy="26" r="1.6" fill="#dc2626"/>
                <circle cx="23" cy="26" r="1.6" fill="#dc2626"/>
                <circle cx="17" cy="5.4" r="1.4" fill="#ef4444"/>
                <circle cx="17" cy="28.6" r="1.4" fill="#ef4444"/>
                <circle cx="10.4" cy="7.6" r="0.5" fill="#ffffff" opacity="0.9"/>
                <circle cx="22.4" cy="7.6" r="0.5" fill="#ffffff" opacity="0.9"/>
                <path d="M17 25.6c-2.8-1.8-5.2-1.6-5.2 0.4 0 1.4 3 1.6 5.2-0.4Z" fill="url(#xhw_b_${id})"/>
                <path d="M17 25.6c2.8-1.8 5.2-1.6 5.2 0.4 0 1.4-3 1.6-5.2-0.4Z" fill="url(#xhw_b_${id})"/>
                <circle cx="17" cy="26" r="1.2" fill="#7f1d1d"/>
                <path d="M17 3v2.4" stroke="#fbbf24" stroke-width="0.9" stroke-linecap="round"/>
            </svg>
        `
        },
        {
            "id": "xmas-stellar-snow",
            "name": "Stellar Branch Snowflake",
            "tier": "near",
            "material": "snow",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.2,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xss_${id}" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#c7d2fe"/>
                    </linearGradient>
                </defs>
                <g stroke="url(#xss_${id})" stroke-linecap="round" fill="none">
                    <path d="M16 2.6v26.8" stroke-width="1.3"/>
                    <path d="M4.5 9.3 27.5 22.7M4.5 22.7 27.5 9.3" stroke-width="1.3"/>
                    <path d="m11 6.4 5 3 5-3M11 25.6l5-3 5 3" stroke-width="1"/>
                    <path d="M7.6 13.6 13.4 14.4 15.2 9.4M24.4 18.4 18.6 17.6 16.8 22.6" stroke-width="0.9"/>
                    <path d="M7.6 18.4 13.4 17.6 15.2 22.6M24.4 13.6 18.6 14.4 16.8 9.4" stroke-width="0.9"/>
                </g>
                <circle cx="16" cy="16" r="2" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1" fill="#c7d2fe" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-feathered-flake",
            "name": "Feathered Dendrite",
            "tier": "mid",
            "material": "snow",
            "rarity": "uncommon",
            "minScale": 0.55,
            "maxScale": 0.9,
            "minOpacity": 0.5,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xff_${id}" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#bae6fd"/>
                    </linearGradient>
                </defs>
                <g stroke="url(#xff_${id})" stroke-linecap="round" fill="none">
                    <path d="M16 3v26" stroke-width="1.1"/>
                    <path d="M5 10 27 22M5 22 27 10" stroke-width="1.1"/>
                    <path d="M11 8 16 11 21 8M11 24 16 21 21 24" stroke-width="0.85"/>
                    <path d="M8.5 13.5 14.5 14.6M23.5 18.5 17.5 17.4" stroke-width="0.75"/>
                    <path d="M8.5 18.5 14.5 17.4M23.5 13.5 17.5 14.6" stroke-width="0.75"/>
                </g>
                <circle cx="16" cy="16" r="1.7" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "xmas-hex-crystal",
            "name": "Hex Crystal Flake",
            "tier": "mid",
            "material": "snow",
            "rarity": "common",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xhc_${id}" x1="16" y1="4" x2="16" y2="29" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#dbeafe"/>
                    </linearGradient>
                </defs>
                <path d="m16 3.6 9 5.2v10.4L16 24.4l-9-5.2V8.8Z" stroke="url(#xhc_${id})" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                <path d="M16 3.6v20.8M7 8.8l18 10.4M7 19.2l18-10.4" stroke="url(#xhc_${id})" stroke-width="0.8" opacity="0.9"/>
                <path d="m16 27.4 6-3.4v-3.6l-6 3.4-6-3.4v3.6Z" stroke="url(#xhc_${id})" stroke-width="1" stroke-linejoin="round" fill="none" opacity="0.75"/>
                <circle cx="16" cy="13.8" r="2.2" fill="#ffffff"/>
                <circle cx="16" cy="13.8" r="1" fill="#dbeafe" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-needle-star",
            "name": "Needle Star Flake",
            "tier": "far",
            "material": "snow",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.5,
            "minOpacity": 0.35,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xns_${id}" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#dbeafe"/>
                    </linearGradient>
                </defs>
                <path d="M16 4v24M5.6 10l20.8 12M5.6 22 26.4 10" stroke="url(#xns_${id})" stroke-width="1" stroke-linecap="round" fill="none"/>
                <path d="M16 8v16M9 12l14 8M9 20l14-8" stroke="#dbeafe" stroke-width="0.7" stroke-linecap="round" fill="none"/>
                <circle cx="16" cy="16" r="1.4" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "xmas-soft-flurry",
            "name": "Soft Snow Pearl",
            "tier": "far",
            "material": "snow",
            "rarity": "common",
            "minScale": 0.18,
            "maxScale": 0.38,
            "minOpacity": 0.28,
            "maxOpacity": 0.5,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xsfp_${id}" cx="38%" cy="35%" r="60%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#eff6ff"/><stop offset="1" stop-color="#dbeafe" stop-opacity="0.75"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="7" fill="url(#xsfp_${id})"/>
                <circle cx="13.8" cy="13.4" r="1.4" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "xmas-pine-sprig",
            "name": "Winter Pine Sprig",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.46,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xps_${id}" x1="16" y1="6" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ade80"/><stop offset="1" stop-color="#14532d"/>
                    </linearGradient>
                </defs>
                <path d="M16 28V7" stroke="#0f766e" stroke-width="1.4" stroke-linecap="round"/>
                <g stroke="url(#xps_${id})" stroke-width="1.3" stroke-linecap="round" fill="none">
                    <path d="m16 11-5.4-4M16 11l5.4-4"/>
                    <path d="m16 15-7-4M16 15l7-4"/>
                    <path d="m16 19-7.6-4M16 19l7.6-4"/>
                    <path d="m16 23-6.2-3.2M16 23l6.2-3.2"/>
                </g>
                <circle cx="16" cy="7.6" r="1.2" fill="#dcfce7"/>
                <circle cx="10.6" cy="7" r="0.6" fill="#ffffff" opacity="0.85"/>
                <circle cx="21.4" cy="7" r="0.6" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-winter-star",
            "name": "Winter Diamond",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.54,
            "minOpacity": 0.32,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xws_${id}" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#bae6fd"/>
                    </linearGradient>
                </defs>
                <path d="M16 2.4 16 29.6" stroke="url(#xws_${id})" stroke-width="0.6" opacity="0.55"/>
                <path d="M16 3c1.2 8.8 4.2 11.8 13 13-8.8 1.2-11.8 4.2-13 13-1.2-8.8-4.2-11.8-13-13 8.8-1.2 11.8-4.2 13-13Z" fill="url(#xws_${id})"/>
                <circle cx="16" cy="16" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "xmas-glass-bauble",
            "name": "Mini Glass Bauble",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="xBa_${id}" cx="32%" cy="28%" r="76%">
                        <stop stop-color="#fbcfe8"/><stop offset="0.45" stop-color="#f472b6"/><stop offset="0.85" stop-color="#be185d"/><stop offset="1" stop-color="#831843"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.4v3" stroke="#f6c453" stroke-width="0.9" stroke-linecap="round"/>
                <path d="M14.4 5.4c0-1.2 3.2-1.2 3.2 0" stroke="#f6c453" stroke-width="0.9" fill="none"/>
                <rect x="13.6" y="5.8" width="4.8" height="2.4" rx="0.8" fill="#facc15"/>
                <circle cx="16" cy="18.4" r="10" fill="url(#xBa_${id})"/>
                <circle cx="16" cy="18.4" r="10" fill="none" stroke="#831843" stroke-width="0.4" opacity="0.5"/>
                <ellipse cx="11.8" cy="14" rx="2" ry="3" fill="#ffffff" opacity="0.55" transform="rotate(-30 11.8 14)"/>
                <circle cx="21.2" cy="12.4" r="0.9" fill="#ffffff" opacity="0.75"/>
                <path d="M8 20.4c5 2 11 2 16 0" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "xmas-holly",
            "name": "Holly Accent",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.8,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xh_l_${id}" x1="4" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ade80"/><stop offset="0.5" stop-color="#16a34a"/><stop offset="1" stop-color="#14532d"/>
                    </linearGradient>
                </defs>
                <path d="M10 20c1-6 4-9 7-9 1 4-1 8-7 9Z" fill="url(#xh_l_${id})"/>
                <path d="M22 20c-1-6-4-9-7-9-1 4 1 8 7 9Z" fill="url(#xh_l_${id})"/>
                <path d="M16 11v11" stroke="#166534" stroke-width="1"/>
                <circle cx="13.5" cy="22.5" r="2.2" fill="#ef4444"/>
                <circle cx="18.5" cy="22.5" r="2.2" fill="#dc2626"/>
                <circle cx="12.8" cy="21.8" r="0.6" fill="#ffffff" opacity="0.85"/>
                <circle cx="17.8" cy="21.8" r="0.6" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "xmas-bell",
            "name": "Winter Bell",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.72,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="xbw_${id}" x1="6" y1="10" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M16 5.4v2.4" stroke="#fde68a" stroke-width="1" stroke-linecap="round"/>
                <path d="M9 21h14c-0.8-1.4-2-2-2.2-3.6v-4.4c0-2.8-2.2-5-4.8-5s-4.8 2.2-4.8 5V17.4C11 19 9.8 19.6 9 21Z" fill="url(#xbw_${id})"/>
                <rect x="8.6" y="20" width="14.8" height="1.4" rx="0.7" fill="#92400e"/>
                <circle cx="16" cy="23.6" r="1.6" fill="#facc15" stroke="#92400e" stroke-width="0.5"/>
                <path d="M11.4 15c0.8-1.4 1.8-2.2 3-2.6" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.8"/>
            </svg>
        `
        }
    ],
    "newyear": [
        {
            "id": "ny-bright-star",
            "name": "Midnight Bright Star",
            "tier": "near",
            "material": "star",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.18,
            "minOpacity": 0.7,
            "maxOpacity": 0.92,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nbs_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fff7cc"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M18 2c1.7 10.3 5.7 14.3 16 16-10.3 1.7-14.3 5.7-16 16-1.7-10.3-5.7-14.3-16-16C12.3 16.3 16.3 12.3 18 2Z" fill="url(#nbs_${id})"/>
                <path d="M18 6.4c1.1 7.1 4 10 11.1 11.1-7.1 1.1-10 4-11.1 11.1-1.1-7.1-4-10-11.1-11.1C13.9 16.4 16.8 13.5 18 6.4Z" fill="#ffffff" opacity="0.85"/>
                <circle cx="18" cy="18" r="2.6" fill="#fde68a"/>
                <circle cx="18" cy="18" r="1" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-champagne-flute",
            "name": "Champagne Flute",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 28 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ncf_g_${id}" x1="6" y1="4" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc" stop-opacity="0.5"/>
                        <stop offset="0.5" stop-color="#fde68a" stop-opacity="0.4"/>
                        <stop offset="1" stop-color="#f59e0b" stop-opacity="0.35"/>
                    </linearGradient>
                    <linearGradient id="ncf_s_${id}" x1="14" y1="20" x2="14" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="M5.4 4h17.2l-1.4 12c-0.4 3.6-2.8 5.6-5 5.6h-4.4c-2.2 0-4.6-2-5-5.6Z" fill="url(#ncf_g_${id})" stroke="#fcd34d" stroke-width="1"/>
                <path d="M6.4 6h15.2l-0.7 6.6c-0.3 2.6-2.2 4-4.3 4h-5.2c-2.1 0-4-1.4-4.3-4Z" fill="#fde68a" opacity="0.55"/>
                <circle cx="10" cy="10" r="0.9" fill="#ffffff" opacity="0.9"/>
                <circle cx="17.6" cy="12" r="0.7" fill="#ffffff" opacity="0.85"/>
                <circle cx="13.6" cy="14" r="0.6" fill="#ffffff" opacity="0.8"/>
                <circle cx="15.6" cy="8.4" r="0.5" fill="#ffffff" opacity="0.85"/>
                <path d="M14 22v12" stroke="url(#ncf_s_${id})" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M8.4 36h11.2" stroke="url(#ncf_s_${id})" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M5.4 4h17.2" stroke="#fef3c7" stroke-width="0.9"/>
                <path d="M8 8c0.4-1.6 1-2.4 1.8-3" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "ny-champagne-pair",
            "name": "Champagne Toast Pair",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ncp_g_${id}" x1="4" y1="4" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc" stop-opacity="0.5"/>
                        <stop offset="1" stop-color="#f59e0b" stop-opacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="ncp_g2_${id}" x1="20" y1="4" x2="36" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc" stop-opacity="0.5"/>
                        <stop offset="1" stop-color="#f59e0b" stop-opacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="ncp_s_${id}" x1="20" y1="20" x2="20" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="M4 4h14l-1.1 10c-0.3 2.8-2.2 4.4-3.9 4.4h-4c-1.7 0-3.6-1.6-3.9-4.4Z" fill="url(#ncp_g_${id})" stroke="#fcd34d" stroke-width="0.9"/>
                <path d="M5 6h12l-0.5 5.4c-0.3 2-1.7 3-3.3 3h-4.4c-1.6 0-3-1-3.3-3Z" fill="#fde68a" opacity="0.55"/>
                <circle cx="9" cy="9" r="0.7" fill="#ffffff" opacity="0.9"/>
                <circle cx="13" cy="11" r="0.5" fill="#ffffff" opacity="0.8"/>
                <path d="M11 18.4v12" stroke="url(#ncp_s_${id})" stroke-width="1.1" stroke-linecap="round"/>
                <path d="M6.4 30.4h9.2" stroke="url(#ncp_s_${id})" stroke-width="1.3" stroke-linecap="round"/>
                <path d="M22 4h14l-1.1 10c-0.3 2.8-2.2 4.4-3.9 4.4h-4c-1.7 0-3.6-1.6-3.9-4.4Z" fill="url(#ncp_g2_${id})" stroke="#fcd34d" stroke-width="0.9"/>
                <path d="M23 6h12l-0.5 5.4c-0.3 2-1.7 3-3.3 3h-4.4c-1.6 0-3-1-3.3-3Z" fill="#fde68a" opacity="0.55"/>
                <circle cx="27" cy="9" r="0.7" fill="#ffffff" opacity="0.9"/>
                <circle cx="31" cy="11" r="0.5" fill="#ffffff" opacity="0.8"/>
                <path d="M29 18.4v12" stroke="url(#ncp_s_${id})" stroke-width="1.1" stroke-linecap="round"/>
                <path d="M24.4 30.4h9.2" stroke="url(#ncp_s_${id})" stroke-width="1.3" stroke-linecap="round"/>
                <path d="M20 2.4 20.4 4 22 4.4 20.4 4.8 20 6.4 19.6 4.8 18 4.4 19.6 4Z" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-clock-midnight",
            "name": "Midnight Clock",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncm_${id}" cx="35%" cy="30%" r="80%">
                        <stop stop-color="#1e293b"/><stop offset="0.7" stop-color="#0f172a"/><stop offset="1" stop-color="#020617"/>
                    </radialGradient>
                    <linearGradient id="ncm_r_${id}" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="14" fill="url(#ncm_${id})" stroke="url(#ncm_r_${id})" stroke-width="1.8"/>
                <circle cx="18" cy="18" r="11.6" fill="none" stroke="#fde68a" stroke-width="0.4" opacity="0.55"/>
                <g stroke="#fde68a" stroke-width="1" stroke-linecap="round">
                    <path d="M18 5.4v2M18 28.6v2M5.4 18h2M28.6 18h2"/>
                </g>
                <g stroke="#fef3c7" stroke-width="0.6" opacity="0.55">
                    <path d="M27.4 9.6l-1 1M8.6 26.4l1-1M26.4 26.4l-1-1M9.6 9.6l1 1"/>
                </g>
                <path d="M18 18 12.4 11.4" stroke="#fef9c3" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M18 18 18 8.4" stroke="#ffffff" stroke-width="2" stroke-linecap="round" transform="rotate(6 18 18)"/>
                <circle cx="18" cy="18" r="1.8" fill="#facc15" stroke="#7c2d12" stroke-width="0.5"/>
                <circle cx="12.4" cy="10.6" r="1.4" fill="#ffffff" opacity="0.9"/>
                <path d="M30 5 30.4 6.4 31.8 6.8 30.4 7.2 30 8.6 29.6 7.2 28.2 6.8 29.6 6.4Z" fill="#fde68a"/>
            </svg>
        `
        },
        {
            "id": "ny-firework",
            "name": "Golden Firework",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.55,
            "maxScale": 0.9,
            "minOpacity": 0.5,
            "maxOpacity": 0.78,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nfw_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <g stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round" fill="none">
                    <path d="M18 2v11M18 23v11M2 18h11M23 18h11"/>
                    <path d="M6.6 6.6 14.4 14.4M21.6 21.6 29.4 29.4M29.4 6.6 21.6 14.4M14.4 21.6 6.6 29.4"/>
                </g>
                <g fill="#fde68a">
                    <circle cx="18" cy="2.6" r="1"/>
                    <circle cx="18" cy="33.4" r="1"/>
                    <circle cx="2.6" cy="18" r="1"/>
                    <circle cx="33.4" cy="18" r="1"/>
                    <circle cx="7" cy="7" r="0.9"/>
                    <circle cx="29" cy="29" r="0.9"/>
                    <circle cx="29" cy="7" r="0.9"/>
                    <circle cx="7" cy="29" r="0.9"/>
                </g>
                <circle cx="18" cy="18" r="4.4" fill="url(#nfw_${id})"/>
                <circle cx="18" cy="18" r="2.4" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-silver-confetti",
            "name": "Silver Midnight Foil",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nsc_${id}" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#cbd5e1"/><stop offset="1" stop-color="#64748b"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12" width="18" height="7" rx="1.2" transform="rotate(26 16 16)" fill="url(#nsc_${id})"/>
                <path d="M11 13.4h10" transform="rotate(26 16 16)" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "ny-gold-confetti",
            "name": "Gold Midnight Foil",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ngc_${id}" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12" width="18" height="7" rx="1.2" transform="rotate(-28 16 16)" fill="url(#ngc_${id})"/>
                <path d="M11 13.4h10" transform="rotate(-28 16 16)" stroke="#fff7cc" stroke-width="0.9" stroke-linecap="round" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "ny-champagne-bubble",
            "name": "Champagne Bubble",
            "tier": "mid",
            "material": "bubble",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.72,
            "minOpacity": 0.4,
            "maxOpacity": 0.66,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncb_${id}" cx="38%" cy="30%" r="72%">
                        <stop stop-color="#fff7cc" stop-opacity="0.55"/>
                        <stop offset="0.7" stop-color="#fde68a" stop-opacity="0.3"/>
                        <stop offset="1" stop-color="#f59e0b" stop-opacity="0.2"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="17" r="8" fill="url(#ncb_${id})" stroke="#facc15" stroke-width="1"/>
                <circle cx="13" cy="13.5" r="2.2" fill="#ffffff" opacity="0.75"/>
                <circle cx="20" cy="11" r="1" fill="#ffffff" opacity="0.9"/>
                <circle cx="21.6" cy="20" r="0.7" fill="#ffffff" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "ny-confetti-burst",
            "name": "Midnight Confetti Burst",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.12,
            "minOpacity": 0.66,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncb2_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 15 8 4M16 15l3-12M16 15l10-8M16 15l11 4M16 15l-2 13M16 15 5 23M16 15 4 14M16 15l7 13" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round"/>
                <g fill="#fde68a">
                    <circle cx="8" cy="4" r="1"/>
                    <circle cx="19" cy="3" r="1"/>
                    <circle cx="26" cy="7" r="1"/>
                    <circle cx="27" cy="19" r="1"/>
                    <circle cx="14" cy="28" r="1"/>
                    <circle cx="5" cy="23" r="1"/>
                    <circle cx="4" cy="14" r="1"/>
                    <circle cx="23" cy="28" r="1"/>
                </g>
                <circle cx="16" cy="15" r="5" fill="url(#ncb2_${id})"/>
                <circle cx="16" cy="15" r="2.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-celestial-cluster",
            "name": "Celestial Countdown",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 40 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncc_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M6 22 13 11l7 7 8-11" stroke="#fde68a" stroke-width="0.9" stroke-dasharray="2 2" fill="none"/>
                <circle cx="6" cy="22" r="2.2" fill="url(#ncc_${id})"/>
                <circle cx="6" cy="22" r="1.2" fill="#ffffff"/>
                <circle cx="13" cy="11" r="2.4" fill="url(#ncc_${id})"/>
                <circle cx="13" cy="11" r="1.4" fill="#facc15"/>
                <circle cx="20" cy="18" r="2.2" fill="url(#ncc_${id})"/>
                <circle cx="20" cy="18" r="1.2" fill="#ffffff"/>
                <circle cx="28" cy="7" r="2.6" fill="url(#ncc_${id})"/>
                <circle cx="28" cy="7" r="1.6" fill="#f59e0b"/>
                <circle cx="27.6" cy="6.6" r="0.6" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-hourglass",
            "name": "Midnight Hourglass",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nhg_${id}" x1="9" y1="6" x2="23" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <path d="M9 6h14M9 26h14" stroke="url(#nhg_${id})" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M11 7c0 4 5 5 5 9s-5 5-5 9M21 7c0 4-5 5-5 9s5 5 5 9" stroke="url(#nhg_${id})" stroke-width="1.4" stroke-linecap="round" fill="none"/>
                <path d="M12.4 21h7.2l-3.6-5-3.6 5Z" fill="#fde68a" opacity="0.9"/>
                <path d="M13.4 9.6c1-0.6 2-0.9 3.2-0.6" stroke="#fff7cc" stroke-width="0.6" fill="none" opacity="0.75"/>
                <circle cx="16" cy="5" r="1.4" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "ny-midnight-star",
            "name": "Midnight Celestial Star",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.46,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nms2_${id}" x1="16" y1="3" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="m16 3 2.2 9 8.4-4-5.6 7.2 8 4.8-9.2-.7L18 28l-3-8-8 3.5 4.8-7.2-7-5.2 8.8.7L16 3Z" fill="url(#nms2_${id})"/>
                <path d="m16 6.6 1.5 6 5.6-2.6-3.7 4.8 5.3 3.2-6.1-.5-1.6 5.3-2-5.3-5.3 2.3 3.2-4.8-4.7-3.5 5.9.5Z" fill="#ffffff" opacity="0.55"/>
                <circle cx="16" cy="15.5" r="2" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-champagne-burst",
            "name": "Champagne Burst",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.44,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncbw_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fff7cc"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2v9M16 21v9M2 16h9M21 16h9M6.2 6.2l6.4 6.4M19.4 19.4l6.4 6.4M25.8 6.2l-6.4 6.4M12.6 19.4l-6.4 6.4" stroke="#ffd166" stroke-width="1.4" stroke-linecap="round"/>
                <circle cx="16" cy="16" r="5" fill="url(#ncbw_${id})"/>
                <circle cx="16" cy="16" r="3" fill="#ffffff"/>
                <circle cx="15.4" cy="15.4" r="1.2" fill="#fde68a"/>
            </svg>
        `
        },
        {
            "id": "ny-firework-comet",
            "name": "Firework Comet",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nfc_${id}" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f59e0b" stop-opacity="0"/>
                        <stop offset="0.5" stop-color="#fbbf24"/>
                        <stop offset="1" stop-color="#fff7cc"/>
                    </linearGradient>
                    <radialGradient id="nfc_h_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M4 27C9 20 15 14 26 5" stroke="url(#nfc_${id})" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <circle cx="27" cy="5" r="5" fill="url(#nfc_h_${id})"/>
                <circle cx="27" cy="5" r="2.4" fill="#ffffff"/>
                <circle cx="19" cy="12" r="1.5" fill="#ffd166"/>
                <circle cx="10" cy="21" r="1.1" fill="#f59e0b" opacity="0.9"/>
                <circle cx="6" cy="25" r="0.8" fill="#fde68a" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "ny-gold-foil",
            "name": "Gold Foil Shard",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.55,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ngf_${id}" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12.6" width="18" height="6.8" rx="1" transform="rotate(-32 16 16)" fill="url(#ngf_${id})"/>
                <path d="M11 13.6h10" transform="rotate(-32 16 16)" stroke="#fff7cc" stroke-width="0.8" stroke-linecap="round" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "ny-silver-foil",
            "name": "Platinum Shard",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.55,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nsf_${id}" x1="8" y1="10" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#dbeafe"/><stop offset="1" stop-color="#64748b"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12.6" width="18" height="6.8" rx="1" transform="rotate(24 16 16)" fill="url(#nsf_${id})"/>
                <path d="M11 13.6h10" transform="rotate(24 16 16)" stroke="#ffffff" stroke-width="0.8" stroke-linecap="round" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "ny-amber-bubble",
            "name": "Amber Celebration Bubble",
            "tier": "mid",
            "material": "bubble",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nyB_${id}" cx="32%" cy="28%" r="72%">
                        <stop stop-color="#fff7cc"/><stop offset="0.55" stop-color="#f59e0b"/><stop offset="1" stop-color="#7c2d12"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="17" r="8.4" fill="url(#nyB_${id})" fill-opacity="0.7"/>
                <circle cx="16" cy="17" r="8.4" fill="none" stroke="#fcd34d" stroke-width="0.5" opacity="0.7"/>
                <ellipse cx="13" cy="13.4" rx="2" ry="2.6" fill="#ffffff" opacity="0.7" transform="rotate(-30 13 13.4)"/>
                <circle cx="20.4" cy="21" r="0.8" fill="#ffffff" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "ny-midnight-dot",
            "name": "Midnight Amber Dot",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.2,
            "maxScale": 0.4,
            "minOpacity": 0.28,
            "maxOpacity": 0.5,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nmd_${id}" cx="45%" cy="40%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="9" fill="url(#nmd_${id})"/>
                <circle cx="16" cy="16" r="3" fill="#ffffff" opacity="0.95"/>
            </svg>
        `
        },
        {
            "id": "ny-clock-ring",
            "name": "Midnight Clock Rim",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ncr_${id}" cx="35%" cy="30%" r="80%">
                        <stop stop-color="#1e293b"/><stop offset="0.7" stop-color="#0f172a"/><stop offset="1" stop-color="#020617"/>
                    </radialGradient>
                    <linearGradient id="ncr_g_${id}" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="11" fill="url(#ncr_${id})" stroke="url(#ncr_g_${id})" stroke-width="1.6"/>
                <g stroke="#fde68a" stroke-width="0.9" stroke-linecap="round">
                    <path d="M16 6v1.6M16 24.4v1.6M6 16h1.6M24.4 16h1.6"/>
                </g>
                <path d="M16 16V9.6M16 16l4.6 2.6" stroke="#fef9c3" stroke-width="1.4" stroke-linecap="round"/>
                <circle cx="16" cy="16" r="1.7" fill="#facc15" stroke="#7c2d12" stroke-width="0.4"/>
                <circle cx="11" cy="9.6" r="1.2" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "ny-rocket-spark",
            "name": "Midnight Rocket Spark",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.8,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nrs_${id}" x1="9" y1="23" x2="24" y2="8" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f59e0b"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#ffffff"/>
                    </linearGradient>
                    <radialGradient id="nrs_h_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M9.6 22.4c3.8-8 8-11.4 14-13.6-1.6 6-4.4 10.2-12 14.2Z" fill="url(#nrs_${id})"/>
                <path d="M11 22c-2 2-3 4-3 6M9.6 23.4c-1.4-0.4-3-0.4-4.4 0.4M9.6 21c-0.4-1.4-0.4-3 0.4-4.4" stroke="#fbbf24" stroke-width="1.1" stroke-linecap="round"/>
                <circle cx="21" cy="12.4" r="3.6" fill="url(#nrs_h_${id})"/>
                <circle cx="21" cy="12.4" r="1.6" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "ny-constellation",
            "name": "New Year Constellation",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.42,
            "maxScale": 0.72,
            "minOpacity": 0.4,
            "maxOpacity": 0.66,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="nyc_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M6 22 13 10l7 7 6-10" stroke="#f8e7a7" stroke-width="0.8" stroke-dasharray="1.6 1.6" fill="none" opacity="0.85"/>
                <circle cx="6" cy="22" r="2.4" fill="url(#nyc_${id})"/>
                <circle cx="6" cy="22" r="1.2" fill="#ffffff"/>
                <circle cx="13" cy="10" r="2.2" fill="url(#nyc_${id})"/>
                <circle cx="13" cy="10" r="1.2" fill="#ffd166"/>
                <circle cx="20" cy="17" r="2.4" fill="url(#nyc_${id})"/>
                <circle cx="20" cy="17" r="1.2" fill="#ffffff"/>
                <circle cx="26" cy="7" r="2" fill="url(#nyc_${id})"/>
                <circle cx="26" cy="7" r="1.1" fill="#fbbf24"/>
            </svg>
        `
        },
        {
            "id": "ny-metallic-streamer",
            "name": "Metallic Streamer",
            "tier": "mid",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.48,
            "maxScale": 0.8,
            "minOpacity": 0.44,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nms_${id}" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.4" stop-color="#facc15"/><stop offset="0.75" stop-color="#b45309"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                </defs>
                <path d="M4 6c6 4 8 10 12 12s8 2 12 6" stroke="url(#nms_${id})" stroke-width="2.4" stroke-linecap="round" fill="none"/>
                <path d="M4 6c6 4 8 10 12 12s8 2 12 6" stroke="#fff7cc" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M4 4.6 4.4 6.2 6 6.6 4.4 7 4 8.6 3.6 7 2 6.6 3.6 6.2Z" fill="#fef9c3"/>
            </svg>
        `
        }
    ],
    "easter": [
        {
            "id": "easter-bunny-head",
            "name": "Bunny Head",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ebh_f_${id}" x1="6" y1="4" x2="26" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7f1"/><stop offset="0.6" stop-color="#f4e2d3"/><stop offset="1" stop-color="#d9bfa9"/>
                    </linearGradient>
                    <linearGradient id="ebh_i_${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop stop-color="#fbcfe8"/><stop offset="1" stop-color="#f9a8d4"/>
                    </linearGradient>
                </defs>
                <ellipse cx="10.6" cy="9.6" rx="2.8" ry="8.4" transform="rotate(-14 10.6 9.6)" fill="url(#ebh_f_${id})"/>
                <ellipse cx="21.4" cy="9.6" rx="2.8" ry="8.4" transform="rotate(14 21.4 9.6)" fill="url(#ebh_f_${id})"/>
                <ellipse cx="10.6" cy="9.6" rx="1.35" ry="6.2" transform="rotate(-14 10.6 9.6)" fill="url(#ebh_i_${id})"/>
                <ellipse cx="21.4" cy="9.6" rx="1.35" ry="6.2" transform="rotate(14 21.4 9.6)" fill="url(#ebh_i_${id})"/>
                <ellipse cx="16" cy="24" rx="9.6" ry="9" fill="url(#ebh_f_${id})"/>
                <ellipse cx="10.4" cy="26.6" rx="2.1" ry="1.5" fill="#f9a8d4" opacity="0.5"/>
                <ellipse cx="21.6" cy="26.6" rx="2.1" ry="1.5" fill="#f9a8d4" opacity="0.5"/>
                <ellipse cx="12.2" cy="22.8" rx="1.35" ry="1.6" fill="#3f1427"/>
                <ellipse cx="19.8" cy="22.8" rx="1.35" ry="1.6" fill="#3f1427"/>
                <circle cx="12.6" cy="22.2" r="0.45" fill="#ffffff"/>
                <circle cx="20.2" cy="22.2" r="0.45" fill="#ffffff"/>
                <path d="M15 26.6 17 26.6 16 27.8Z" fill="#f28aa5"/>
                <path d="M16 27.8v1.2" stroke="#7f1d3a" stroke-width="0.6" stroke-linecap="round"/>
                <path d="M16 29c-0.9 1-2 1-2.8 0.4M16 29c0.9 1 2 1 2.8 0.4" stroke="#7f1d3a" stroke-width="0.6" stroke-linecap="round" fill="none"/>
                <path d="M6.6 24.6 3.6 24.2M6.6 26.4 3.4 26.8M6.6 28 3.8 28.8" stroke="#a78bfa" stroke-width="0.35" stroke-linecap="round" opacity="0.55"/>
                <path d="M25.4 24.6 28.4 24.2M25.4 26.4 28.6 26.8M25.4 28 28.2 28.8" stroke="#a78bfa" stroke-width="0.35" stroke-linecap="round" opacity="0.55"/>
                <path d="M11.2 16.6c1.4-1 3-1.4 4.8-1.4" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "easter-pastel-egg",
            "name": "Pastel Egg Gem",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="eEg_${id}" cx="35%" cy="30%" r="76%">
                        <stop stop-color="#f3e8ff"/><stop offset="0.45" stop-color="#c4b5fd"/><stop offset="1" stop-color="#6d28d9"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.4c5.4 4.4 8.8 9.4 8.8 14.6 0 5.4-3.9 10.6-8.8 10.6s-8.8-5.2-8.8-10.6C7.2 12.8 10.6 7.8 16 3.4Z" fill="url(#eEg_${id})"/>
                <path d="M10.4 12.6c2.8 1.8 8.4 1.8 11.2 0" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <path d="M9.6 17.4c3.4 2 9.4 2 12.8 0" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <path d="M10.6 22.2c2.8 1.6 8 1.6 10.8 0" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <ellipse cx="12" cy="9.8" rx="1.6" ry="2.4" fill="#ffffff" opacity="0.55" transform="rotate(-32 12 9.8)"/>
                <circle cx="21.6" cy="8.4" r="0.8" fill="#ffffff" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "easter-painted-egg",
            "name": "Painted Spring Egg",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="epe_${id}" x1="8" y1="5" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fce7f3"/><stop offset="0.5" stop-color="#f9a8d4"/><stop offset="1" stop-color="#db2777"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.4c5.4 4.4 8.8 9.4 8.8 14.6 0 5.4-3.9 10.6-8.8 10.6s-8.8-5.2-8.8-10.6C7.2 12.8 10.6 7.8 16 3.4Z" fill="url(#epe_${id})"/>
                <path d="M9.2 12.4 12.4 15 16 12.4 19.6 15 22.8 12.4M9.2 19 12.4 21.6 16 19 19.6 21.6 22.8 19" stroke="#86efac" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <circle cx="13" cy="24" r="0.9" fill="#fef08a"/>
                <circle cx="20" cy="24" r="0.9" fill="#fef08a"/>
                <circle cx="16" cy="8.6" r="0.9" fill="#fef08a"/>
                <ellipse cx="12" cy="9.4" rx="1.4" ry="2.2" fill="#ffffff" opacity="0.6" transform="rotate(-32 12 9.4)"/>
            </svg>
        `
        },
        {
            "id": "easter-floral-egg",
            "name": "Floral Easter Egg",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="efe_${id}" x1="8" y1="5" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fef3c7"/><stop offset="1" stop-color="#fbbf24"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.4c5.4 4.4 8.8 9.4 8.8 14.6 0 5.4-3.9 10.6-8.8 10.6s-8.8-5.2-8.8-10.6C7.2 12.8 10.6 7.8 16 3.4Z" fill="url(#efe_${id})"/>
                <g stroke="#f472b6" stroke-width="0.7" fill="none">
                    <path d="M16 16c-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9S17.6 16 16 16Z"/>
                </g>
                <g fill="#f472b6">
                    <ellipse cx="16" cy="13" rx="1.5" ry="2.1"/>
                    <ellipse cx="19.6" cy="15.4" rx="1.5" ry="2.1" transform="rotate(72 19.6 15.4)"/>
                    <ellipse cx="18.1" cy="19.6" rx="1.5" ry="2.1" transform="rotate(144 18.1 19.6)"/>
                    <ellipse cx="13.9" cy="19.6" rx="1.5" ry="2.1" transform="rotate(216 13.9 19.6)"/>
                    <ellipse cx="12.4" cy="15.4" rx="1.5" ry="2.1" transform="rotate(288 12.4 15.4)"/>
                </g>
                <circle cx="16" cy="16" r="1.1" fill="#fbbf24"/>
                <g stroke="#86efac" stroke-width="0.8" fill="none" stroke-linecap="round">
                    <path d="M11.6 8.4c1.2 0.6 2 1.4 2.4 2.6"/>
                    <path d="M20.4 8.4c-1.2 0.6-2 1.4-2.4 2.6"/>
                    <path d="M10.4 24.6c1.2-0.6 2.6-0.6 3.6 0.4"/>
                    <path d="M21.6 24.6c-1.2-0.6-2.6-0.6-3.6 0.4"/>
                </g>
                <ellipse cx="12" cy="9.4" rx="1.4" ry="2.2" fill="#ffffff" opacity="0.6" transform="rotate(-32 12 9.4)"/>
            </svg>
        `
        },
        {
            "id": "easter-cracked-egg",
            "name": "Cracked Open Egg",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.58,
            "maxScale": 0.92,
            "minOpacity": 0.5,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ece_sh_${id}" x1="6" y1="16" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#c7d2fe"/>
                    </linearGradient>
                    <linearGradient id="ece_ch_${id}" x1="16" y1="8" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="1" stop-color="#facc15"/>
                    </linearGradient>
                </defs>
                <path d="M9 24c0-5 3.2-9.4 7.2-13.4L18 13l-2.6 2.4 3 2-2.4 2.8 3 1.4-1.6 3.2c-1.6 1-3.6 1.6-5.6 1.6C11 26.4 9 25.6 9 24Z" fill="url(#ece_sh_${id})"/>
                <path d="M16.2 4.6c3.2 2.8 5.2 5.6 5.2 8.6 0 1.4-0.4 2.8-1.2 4-2-1-3.8-1-5.4 0C13.6 15.6 13.4 14 13.6 12.4c0.2-2.6 1.2-5.2 2.6-7.8Z" fill="url(#ece_ch_${id})"/>
                <circle cx="18.4" cy="11" r="0.5" fill="#7c2d12"/>
                <circle cx="20.4" cy="11.2" r="0.5" fill="#7c2d12"/>
                <path d="M19.4 12.6 20 13.4 18.8 13.4Z" fill="#f97316"/>
                <path d="M7.6 26.4c3-1.4 6-2 9.4-2 3.6 0 6.6 0.6 9.4 2" stroke="#a78bfa" stroke-width="0.9" stroke-linecap="round" opacity="0.7" fill="none"/>
                <circle cx="6.8" cy="24.8" r="0.8" fill="#f9a8d4"/>
                <circle cx="25.2" cy="24.8" r="0.8" fill="#86efac"/>
            </svg>
        `
        },
        {
            "id": "easter-basket",
            "name": "Easter Basket with Eggs",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 34 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ebk_b_${id}" x1="4" y1="14" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="0.5" stop-color="#d97706"/><stop offset="1" stop-color="#7c2d12"/>
                    </linearGradient>
                    <linearGradient id="ebk_e1_${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop stop-color="#fbcfe8"/><stop offset="1" stop-color="#db2777"/>
                    </linearGradient>
                    <linearGradient id="ebk_e2_${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop stop-color="#bae6fd"/><stop offset="1" stop-color="#0369a1"/>
                    </linearGradient>
                    <linearGradient id="ebk_e3_${id}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop stop-color="#bbf7d0"/><stop offset="1" stop-color="#15803d"/>
                    </linearGradient>
                </defs>
                <path d="M9 12c0-5.4 3.6-9.6 8-9.6s8 4.2 8 9.6" stroke="#b45309" stroke-width="1.3" fill="none" stroke-linecap="round"/>
                <ellipse cx="13" cy="14.4" rx="3.2" ry="4.2" fill="url(#ebk_e1_${id})"/>
                <ellipse cx="21" cy="14.4" rx="3.2" ry="4.2" fill="url(#ebk_e2_${id})"/>
                <ellipse cx="17" cy="13.6" rx="3.2" ry="4.2" fill="url(#ebk_e3_${id})"/>
                <path d="M12 12.8 14 14 16 12.8" stroke="#fef08a" stroke-width="0.7" fill="none" stroke-linecap="round"/>
                <path d="M20 12.8 22 14 24 12.8" stroke="#fef3c7" stroke-width="0.7" fill="none" stroke-linecap="round"/>
                <circle cx="17" cy="11.4" r="0.6" fill="#fef08a"/>
                <path d="M3.4 15h27.2l-2.6 11.4c-0.2 1-1.1 1.6-2 1.6H8c-1 0-1.8-0.6-2-1.6Z" fill="url(#ebk_b_${id})"/>
                <path d="M5.4 19.4h23.2M6.4 23.4h21.2" stroke="#451a03" stroke-width="0.6" opacity="0.55" fill="none"/>
                <path d="M10 16.4 8.4 27.4M13.6 16.4 12.6 27.8M17 16.4v11.4M20.4 16.4l1 11.4M24 16.4l1.6 11" stroke="#451a03" stroke-width="0.5" opacity="0.4"/>
                <path d="M3.4 15h27.2" stroke="#fde68a" stroke-width="0.8" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "easter-daisy",
            "name": "Daisy Spark",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="edy_${id}" cx="50%" cy="50%" r="60%">
                        <stop stop-color="#ffffff"/><stop offset="0.7" stop-color="#fdf2f8"/><stop offset="1" stop-color="#fbcfe8"/>
                    </radialGradient>
                </defs>
                <g fill="url(#edy_${id})">
                    <ellipse cx="16" cy="7.4" rx="3" ry="5.4"/>
                    <ellipse cx="23" cy="12" rx="3" ry="5.4" transform="rotate(72 23 12)"/>
                    <ellipse cx="21" cy="20.6" rx="3" ry="5.4" transform="rotate(144 21 20.6)"/>
                    <ellipse cx="11" cy="20.6" rx="3" ry="5.4" transform="rotate(216 11 20.6)"/>
                    <ellipse cx="9" cy="12" rx="3" ry="5.4" transform="rotate(288 9 12)"/>
                </g>
                <g fill="#fce7f3" opacity="0.55">
                    <ellipse cx="16" cy="7.4" rx="1.2" ry="3.4"/>
                    <ellipse cx="23" cy="12" rx="1.2" ry="3.4" transform="rotate(72 23 12)"/>
                    <ellipse cx="21" cy="20.6" rx="1.2" ry="3.4" transform="rotate(144 21 20.6)"/>
                    <ellipse cx="11" cy="20.6" rx="1.2" ry="3.4" transform="rotate(216 11 20.6)"/>
                    <ellipse cx="9" cy="12" rx="1.2" ry="3.4" transform="rotate(288 9 12)"/>
                </g>
                <circle cx="16" cy="16" r="3.2" fill="#fbbf24"/>
                <circle cx="15" cy="15" r="0.9" fill="#fde68a"/>
            </svg>
        `
        },
        {
            "id": "easter-butterfly",
            "name": "Lilac Butterfly",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.16,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ebf_w1_${id}" x1="4" y1="6" x2="15" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f5d0fe"/><stop offset="0.5" stop-color="#d946ef"/><stop offset="1" stop-color="#86198f"/>
                    </linearGradient>
                    <linearGradient id="ebf_w2_${id}" x1="17" y1="6" x2="28" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f5d0fe"/><stop offset="0.5" stop-color="#d946ef"/><stop offset="1" stop-color="#86198f"/>
                    </linearGradient>
                </defs>
                <path d="M15.4 14.4c-2.4-0.6-8.4-3-10-6.6-1.4-3 1.6-5.4 4.6-4.6 3.6 1 5.6 5 5.4 11.2Z" fill="url(#ebf_w1_${id})"/>
                <path d="M16.6 14.4c2.4-0.6 8.4-3 10-6.6 1.4-3-1.6-5.4-4.6-4.6-3.6 1-5.6 5-5.4 11.2Z" fill="url(#ebf_w2_${id})"/>
                <path d="M15.4 16.4c-2-0.4-6-1.6-7.2-3.6-1-1.8 0.6-3.6 2.6-3 2.4 0.8 4.2 2.8 4.6 6.6Z" fill="#a21caf" opacity="0.8"/>
                <path d="M16.6 16.4c2-0.4 6-1.6 7.2-3.6 1-1.8-0.6-3.6-2.6-3-2.4 0.8-4.2 2.8-4.6 6.6Z" fill="#a21caf" opacity="0.8"/>
                <path d="M15.4 12.4c-2.2 1.2-3.6 4.4-3.6 8.6 0 3.4 1.4 6 4.2 6.4Z" fill="url(#ebf_w1_${id})" opacity="0.55"/>
                <path d="M16.6 12.4c2.2 1.2 3.6 4.4 3.6 8.6 0 3.4-1.4 6-4.2 6.4Z" fill="url(#ebf_w2_${id})" opacity="0.55"/>
                <path d="M12 6.4c0.6-0.4 1.6-0.8 2.2-0.6" stroke="#f0abfc" stroke-width="0.8" fill="none" opacity="0.9"/>
                <path d="M20 6.4c-0.6-0.4-1.6-0.8-2.2-0.6" stroke="#f0abfc" stroke-width="0.8" fill="none" opacity="0.9"/>
                <ellipse cx="16" cy="17.6" rx="0.9" ry="7.6" fill="#581c87"/>
                <path d="M15 6.4 12 3.4M17 6.4l3-3" stroke="#581c87" stroke-width="0.8" stroke-linecap="round" fill="none"/>
                <circle cx="12" cy="3.4" r="0.9" fill="#581c87"/>
                <circle cx="20" cy="3.4" r="0.9" fill="#581c87"/>
                <circle cx="11.6" cy="11.6" r="0.7" fill="#ffffff" opacity="0.75"/>
                <circle cx="20.4" cy="11.6" r="0.7" fill="#ffffff" opacity="0.75"/>
            </svg>
        `
        },
        {
            "id": "easter-tulip",
            "name": "Spring Tulip",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.52,
            "maxScale": 0.82,
            "minOpacity": 0.44,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 28 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="etu_${id}" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbcfe8"/><stop offset="0.5" stop-color="#f472b6"/><stop offset="1" stop-color="#be185d"/>
                    </linearGradient>
                </defs>
                <path d="M14 20.4v11.8" stroke="#4d9a63" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M14 26c-2.6-3-5-4-7.6-3 2.4 3.2 4.8 4.4 7.6 4.2Z" fill="#86efac"/>
                <path d="M14 28.4c2.6-3 5-4 7.6-3-2.4 3.2-4.8 4.4-7.6 4.2Z" fill="#4ade80"/>
                <path d="M6.8 8.4C7.6 15 10.8 19 14 19s6.4-4 7.2-10.6c-2.6 1.4-4.8 2.2-7.2 2.2s-4.6-0.8-7.2-2.2Z" fill="url(#etu_${id})"/>
                <path d="M11.6 9.2c0.4 3 1.4 5.2 2.4 6.6" stroke="#ffffff" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.65"/>
                <path d="M6.8 8.4 9.6 4.6 14 9 18.4 4.6 21.2 8.4" stroke="url(#etu_${id})" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <ellipse cx="16.4" cy="12.6" rx="1.2" ry="3" fill="#ffffff" opacity="0.28" transform="rotate(20 16.4 12.6)"/>
            </svg>
        `
        },
        {
            "id": "easter-chick",
            "name": "Tiny Spring Chick",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.72,
            "maxScale": 1.06,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="eck_${id}" cx="38%" cy="30%" r="72%">
                        <stop stop-color="#fef9c3"/><stop offset="0.6" stop-color="#fde047"/><stop offset="1" stop-color="#ca8a04"/>
                    </radialGradient>
                </defs>
                <ellipse cx="16" cy="20" rx="9.4" ry="9" fill="url(#eck_${id})"/>
                <ellipse cx="16" cy="20" rx="9.4" ry="9" fill="none" stroke="#a16207" stroke-width="0.35" opacity="0.5"/>
                <path d="M7.4 17c-1-4 1-7.4 4-6.6" stroke="#fde047" stroke-width="0.9" fill="none" opacity="0.75"/>
                <ellipse cx="11.6" cy="11.6" rx="2.4" ry="3" fill="#fde047" opacity="0.7"/>
                <ellipse cx="20.4" cy="11.6" rx="2.4" ry="3" fill="#fde047" opacity="0.7"/>
                <circle cx="13" cy="18.8" r="1.4" fill="#78350f"/>
                <circle cx="19" cy="18.8" r="1.4" fill="#78350f"/>
                <circle cx="13.4" cy="18.2" r="0.5" fill="#ffffff"/>
                <circle cx="19.4" cy="18.2" r="0.5" fill="#ffffff"/>
                <path d="M14 21.6 18 21.6 16 23.8Z" fill="#f97316"/>
                <path d="M14 21.6 18 21.6" stroke="#7c2d12" stroke-width="0.4"/>
                <ellipse cx="9.6" cy="22" rx="1.2" ry="0.8" fill="#f472b6" opacity="0.55"/>
                <ellipse cx="22.4" cy="22" rx="1.2" ry="0.8" fill="#f472b6" opacity="0.55"/>
                <path d="M11.6 26.4 9 28.4M14 27.6 12.6 29.6M18 27.6 19.4 29.6M20.4 26.4 23 28.4" stroke="#f97316" stroke-width="1.2" stroke-linecap="round"/>
                <ellipse cx="11.6" cy="16" rx="1.6" ry="2.4" fill="#ffffff" opacity="0.55" transform="rotate(-32 11.6 16)"/>
            </svg>
        `
        },
        {
            "id": "easter-dew",
            "name": "Morning Dew",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.2,
            "maxScale": 0.4,
            "minOpacity": 0.26,
            "maxOpacity": 0.46,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="edw_${id}" cx="35%" cy="30%" r="70%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#e0f2fe"/><stop offset="1" stop-color="#7dd3fc"/>
                    </radialGradient>
                </defs>
                <path d="M16 6.4c4 5.2 6.6 8.8 6.6 12.4a6.6 6.6 0 1 1-13.2 0c0-3.6 2.6-7.2 6.6-12.4Z" fill="url(#edw_${id})" fill-opacity="0.7"/>
                <ellipse cx="13.6" cy="18" rx="1.4" ry="2.2" fill="#ffffff" opacity="0.85" transform="rotate(-22 13.6 18)"/>
            </svg>
        `
        },
        {
            "id": "easter-spring-star",
            "name": "Spring Star",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.28,
            "maxScale": 0.5,
            "minOpacity": 0.3,
            "maxOpacity": 0.54,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ess_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#ddd6fe"/><stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.6c1 7.3 3.7 10 11 11-7.3 1-10 3.7-11 11-1-7.3-3.7-10-11-11 7.3-1 10-3.7 11-11Z" fill="url(#ess_${id})"/>
                <circle cx="16" cy="14.6" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "easter-rainbow",
            "name": "Spring Rainbow",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.1,
            "minOpacity": 0.62,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 36 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21C3 11.6 9.7 4.4 18 4.4s15 7.2 15 16.6" stroke="#fb7185" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M7 21c0-6.6 4.9-12.4 11-12.4s11 5.8 11 12.4" stroke="#fbbf24" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M11 21c0-4 3.2-7.6 7-7.6s7 3.6 7 7.6" stroke="#86efac" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <path d="M15 21c0-1.8 1.4-3.4 3-3.4s3 1.6 3 3.4" stroke="#a5b4fc" stroke-width="2.6" stroke-linecap="round" fill="none"/>
                <circle cx="4.4" cy="21.4" r="1.4" fill="#fbcfe8" opacity="0.85"/>
                <circle cx="31.6" cy="21.4" r="1.4" fill="#bae6fd" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "easter-blossom",
            "name": "Spring Blossom Petal",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ebl_${id}" x1="8" y1="6" x2="24" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fce7f3"/><stop offset="0.5" stop-color="#f9a8d4"/><stop offset="1" stop-color="#db2777"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.6c6.4 2 10.4 8 7.2 14.6-2.4 5-7.6 8.2-12 6.2-4.4-2-5.4-6.6-3.4-11.4C9.8 8.6 13.6 5.2 16 3.6Z" fill="url(#ebl_${id})"/>
                <path d="M16 6.4c-0.4 6.6-2.4 13-5 18" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.55" fill="none"/>
                <path d="M13 20c1.4-0.6 2.6-1.4 3.6-2.6" stroke="#ffffff" stroke-width="0.6" stroke-linecap="round" opacity="0.4" fill="none"/>
            </svg>
        `
        },
        {
            "id": "easter-tender-leaf",
            "name": "Tender Sprout Leaf",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="etl_${id}" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#dcfce7"/><stop offset="0.5" stop-color="#4ade80"/><stop offset="1" stop-color="#15803d"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.4c7 4 9 10.5 5.7 16.1-2.7 4.5-6.9 5.8-11.1 4.6 0-7 1.1-15 5.4-20.7Z" fill="url(#etl_${id})"/>
                <path d="M16 5.8c-0.6 7-1 13.4-4.2 19.4" stroke="#f0fdf4" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.85"/>
                <path d="M14.2 11.4 16.6 12.4M13.4 15.4 15.8 16.4M12.6 19.4 14.8 20.4" stroke="#f0fdf4" stroke-width="0.6" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "easter-five-petal",
            "name": "Five Petal Blossom",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="efp_${id}" cx="50%" cy="45%" r="60%">
                        <stop stop-color="#fff1f5"/><stop offset="0.55" stop-color="#fbcfe8"/><stop offset="1" stop-color="#ec4899" stop-opacity="0.85"/>
                    </radialGradient>
                </defs>
                <g fill="url(#efp_${id})">
                    <ellipse cx="16" cy="7" rx="4.4" ry="6.2"/>
                    <ellipse cx="23.4" cy="12.6" rx="4.4" ry="6.2" transform="rotate(72 23.4 12.6)"/>
                    <ellipse cx="20.6" cy="21.6" rx="4.4" ry="6.2" transform="rotate(144 20.6 21.6)"/>
                    <ellipse cx="11.4" cy="21.6" rx="4.4" ry="6.2" transform="rotate(216 11.4 21.6)"/>
                    <ellipse cx="8.6" cy="12.6" rx="4.4" ry="6.2" transform="rotate(288 8.6 12.6)"/>
                </g>
                <g fill="#fce7f3" opacity="0.6">
                    <ellipse cx="16" cy="7" rx="1.6" ry="3.6"/>
                    <ellipse cx="23.4" cy="12.6" rx="1.6" ry="3.6" transform="rotate(72 23.4 12.6)"/>
                    <ellipse cx="20.6" cy="21.6" rx="1.6" ry="3.6" transform="rotate(144 20.6 21.6)"/>
                    <ellipse cx="11.4" cy="21.6" rx="1.6" ry="3.6" transform="rotate(216 11.4 21.6)"/>
                    <ellipse cx="8.6" cy="12.6" rx="1.6" ry="3.6" transform="rotate(288 8.6 12.6)"/>
                </g>
                <circle cx="16" cy="15.8" r="3.6" fill="#fbbf24"/>
                <circle cx="16" cy="15.8" r="2.4" fill="#fde68a"/>
                <circle cx="15.2" cy="15" r="0.7" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "easter-star",
            "name": "Lilac Starlight",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.28,
            "maxScale": 0.5,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="est_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#e9d5ff"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.4c1 7 3 9.4 10 10.6-7 1-9.4 3.4-10 10.6-1-7-3-9.4-10-10.6 7-1 9.4-3.4 10-10.6Z" fill="url(#est_${id})"/>
                <circle cx="16" cy="14" r="1.5" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "easter-egg-speckle",
            "name": "Painted Egg Speckle",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ees_${id}" cx="38%" cy="30%" r="72%">
                        <stop stop-color="#fce7f3"/><stop offset="0.55" stop-color="#f9a8d4"/><stop offset="1" stop-color="#be185d"/>
                    </radialGradient>
                </defs>
                <path d="M16 4.4c4.8 4 7.8 8.6 7.8 13.4 0 5-3.4 9.4-7.8 9.4s-7.8-4.4-7.8-9.4C8.2 13 11.2 8.4 16 4.4Z" fill="url(#ees_${id})"/>
                <circle cx="12.4" cy="13" r="1" fill="#fde68a"/>
                <circle cx="18.4" cy="11" r="1" fill="#86efac"/>
                <circle cx="21" cy="16" r="1" fill="#a78bfa"/>
                <circle cx="14" cy="20" r="0.9" fill="#fef08a"/>
                <circle cx="19" cy="22" r="0.9" fill="#86efac"/>
                <circle cx="11.6" cy="17" r="0.7" fill="#a78bfa"/>
                <path d="M11 17c2 1.4 4 1.4 5.5 0s3.3-1.4 5.5 0" stroke="#fef3c7" stroke-width="0.9" fill="none" opacity="0.85"/>
                <ellipse cx="13" cy="9.6" rx="1.2" ry="2" fill="#ffffff" opacity="0.6" transform="rotate(-32 13 9.6)"/>
            </svg>
        `
        },
        {
            "id": "easter-rabbit-ear",
            "name": "Rabbit Silhouette",
            "tier": "near",
            "material": "petal",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.12,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ere_${id}" x1="6" y1="4" x2="26" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7f1"/><stop offset="0.6" stop-color="#f1ddc9"/><stop offset="1" stop-color="#c9a98c"/>
                    </linearGradient>
                </defs>
                <path d="M11 14.4c-1.6-6.6-1.2-10.4 1.6-10.4 2.8 0 3.2 4.4 3.1 9 1.5-1.6 3-2.6 4.3-2.6 1.3 0 2.8 1 4.3 2.6-0.1-4.6 0.3-9 3.1-9 2.8 0 3.2 3.8 1.6 10.4 3.3 1.5 4.8 4 4 7.2C32 26.8 25.6 30.4 20.4 30.4c-4.4 0-9.6-2.6-11.6-6.4-1.4-2.8-0.6-6.4 2.2-9.6Z" fill="url(#ere_${id})"/>
                <path d="M12.6 6.4c-0.3 2.2-0.3 4.4-0.1 6.2M19.5 6.4c0.3 2.2 0.3 4.4 0.1 6.2" stroke="#e2a8b8" stroke-width="1.1" stroke-linecap="round" fill="none"/>
                <circle cx="15.6" cy="21.6" r="1.1" fill="#3f1427"/>
                <circle cx="24.4" cy="21.6" r="1.1" fill="#3f1427"/>
                <circle cx="15.9" cy="21.2" r="0.35" fill="#ffffff"/>
                <circle cx="24.7" cy="21.2" r="0.35" fill="#ffffff"/>
                <path d="M19 24.4 21 24.4 20 25.6Z" fill="#e2a8b8"/>
                <path d="M16 20c1.6-1 3.4-1 5 0" stroke="#ffffff" stroke-width="0.85" stroke-linecap="round" fill="none" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "easter-spring-orbit",
            "name": "Spring Orbit",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.42,
            "maxScale": 0.72,
            "minOpacity": 0.4,
            "maxOpacity": 0.64,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="eso_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <ellipse cx="16" cy="16" rx="12" ry="5.6" transform="rotate(-28 16 16)" stroke="#d8b4fe" stroke-width="0.9" fill="none" opacity="0.85" stroke-dasharray="2.4 2"/>
                <circle cx="26" cy="11" r="2.6" fill="url(#eso_${id})"/>
                <circle cx="26" cy="11" r="2" fill="#f9a8d4"/>
                <circle cx="6" cy="20.6" r="2.2" fill="url(#eso_${id})"/>
                <circle cx="6" cy="20.6" r="1.6" fill="#86efac"/>
                <circle cx="16" cy="16" r="1.6" fill="#ffffff"/>
            </svg>
        `
        }
    ],
    "anniversary": [
        {
            "id": "anniv-diamond-ring",
            "name": "Diamond Ring",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.7,
            "maxOpacity": 0.92,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ar1_${id}" x1="4" y1="14" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.4" stop-color="#facc15"/><stop offset="0.85" stop-color="#b45309"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                    <linearGradient id="ar1_d1_${id}" x1="12" y1="4" x2="20" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#e0f2fe"/>
                    </linearGradient>
                    <linearGradient id="ar1_d2_${id}" x1="12" y1="10" x2="20" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#bae6fd"/><stop offset="1" stop-color="#0ea5e9"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="22" rx="9.6" ry="6.6" stroke="url(#ar1_${id})" stroke-width="2.6" fill="none"/>
                <ellipse cx="16" cy="22" rx="9.6" ry="6.6" stroke="#fffbeb" stroke-width="0.6" fill="none" opacity="0.55"/>
                <path d="M13 16.6 12.2 19.4M19 16.6l0.8 2.8" stroke="#facc15" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M16 3.6 20.8 8 19 13.4H13L11.2 8Z" fill="url(#ar1_d1_${id})"/>
                <path d="M16 3.6 20.8 8 16 9.4 11.2 8Z" fill="#ffffff" opacity="0.85"/>
                <path d="M16 9.4 19 13.4H13Z" fill="url(#ar1_d2_${id})" opacity="0.85"/>
                <path d="M16 3.6 16 9.4M11.2 8 16 9.4 20.8 8M16 9.4 16 13.4" stroke="#0284c7" stroke-width="0.4" opacity="0.6"/>
                <path d="M22.6 17.6c0.6-1.6 1.6-2.6 2.8-3" stroke="#fff7cc" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M28 4.6 28.6 6.4 30.4 7 28.6 7.6 28 9.4 27.4 7.6 25.6 7 27.4 6.4Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "anniv-twin-diamond-rings",
            "name": "Twin Diamond Rings",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 36 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="atr_g1_${id}" x1="2" y1="10" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                    <linearGradient id="atr_g2_${id}" x1="20" y1="10" x2="34" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#e2e8f0"/><stop offset="1" stop-color="#64748b"/>
                    </linearGradient>
                </defs>
                <ellipse cx="20" cy="18" rx="7.4" ry="6.4" stroke="url(#atr_g2_${id})" stroke-width="2.2" fill="none"/>
                <ellipse cx="12" cy="18" rx="7.4" ry="6.4" stroke="url(#atr_g1_${id})" stroke-width="2.2" fill="none"/>
                <path d="M20.06 24.32 A 7.4 6.4 0 0 1 15.02 22.35" stroke="url(#atr_g2_${id})" stroke-width="2.2" fill="none" stroke-linecap="round"/>
                <path d="M12 3.6 15.4 7.4 12 11.6 8.6 7.4Z" fill="#ffffff"/>
                <path d="M12 3.6 15.4 7.4 12 8.4 8.6 7.4Z" fill="#f8fafc"/>
                <path d="M12 8.4 12 11.6 8.6 7.4ZM12 8.4 12 11.6 15.4 7.4Z" fill="#bae6fd" opacity="0.85"/>
                <path d="M20 3.6 23.4 7.4 20 11.6 16.6 7.4Z" fill="#ffffff"/>
                <path d="M20 3.6 23.4 7.4 20 8.4 16.6 7.4Z" fill="#f8fafc"/>
                <path d="M20 8.4 20 11.6 16.6 7.4ZM20 8.4 20 11.6 23.4 7.4Z" fill="#bae6fd" opacity="0.85"/>
                <path d="M6 12.6c0.6-1.4 1.4-2.2 2.6-2.6M14 12.6c0.6-1.4 1.4-2.2 2.6-2.6" stroke="#fff7cc" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.7"/>
                <circle cx="10" cy="14" r="0.7" fill="#ffffff" opacity="0.85"/>
                <circle cx="18" cy="14" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "anniv-infinity",
            "name": "Infinity Promise",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aif_${id}" x1="4" y1="12" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <ellipse cx="10.6" cy="16" rx="6.4" ry="5.8" stroke="url(#aif_${id})" stroke-width="1.8" fill="none"/>
                <ellipse cx="21.4" cy="16" rx="6.4" ry="5.8" stroke="url(#aif_${id})" stroke-width="1.8" fill="none"/>
                <ellipse cx="10.6" cy="16" rx="6.4" ry="5.8" stroke="#fff7cc" stroke-width="0.5" fill="none" opacity="0.65"/>
                <ellipse cx="21.4" cy="16" rx="6.4" ry="5.8" stroke="#fff7cc" stroke-width="0.5" fill="none" opacity="0.65"/>
                <path d="M7 12.6c0.4-0.9 1.1-1.6 2-2M25 12.6c-0.4-0.9-1.1-1.6-2-2" stroke="#fff7cc" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.9"/>
                <circle cx="16" cy="16" r="1.5" fill="#ffffff"/>
                <circle cx="16" cy="16" r="0.7" fill="#facc15"/>
                <path d="M16 4.4 16.5 5.9 18 6.4 16.5 6.9 16 8.4 15.5 6.9 14 6.4 15.5 5.9Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "anniv-infinity-heart",
            "name": "Infinity with Heart",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aih_${id}" x1="4" y1="12" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                    <linearGradient id="aih_h_${id}" x1="16" y1="10" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fda4af"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <ellipse cx="9.6" cy="16" rx="6" ry="5.4" stroke="url(#aih_${id})" stroke-width="1.8" fill="none"/>
                <ellipse cx="22.4" cy="16" rx="6" ry="5.4" stroke="url(#aih_${id})" stroke-width="1.8" fill="none"/>
                <ellipse cx="9.6" cy="16" rx="6" ry="5.4" stroke="#fff7cc" stroke-width="0.5" fill="none" opacity="0.6"/>
                <ellipse cx="22.4" cy="16" rx="6" ry="5.4" stroke="#fff7cc" stroke-width="0.5" fill="none" opacity="0.6"/>
                <path d="M16 20.4c-0.3 0-4.4-2.6-4.4-5.4 0-1.6 1.3-2.4 2.4-2.4 0.7 0 1.4 0.3 2 0.9 0.6-0.6 1.3-0.9 2-0.9 1.1 0 2.4 0.8 2.4 2.4 0 2.8-4.1 5.4-4.4 5.4Z" fill="url(#aih_h_${id})"/>
                <path d="M13.6 15.6c0-0.8 0.6-1.2 1.3-1.2" stroke="#ffffff" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.85"/>
                <path d="M5.6 12c0.4-0.8 1-1.4 1.8-1.7M26.4 12c-0.4-0.8-1-1.4-1.8-1.7" stroke="#fff7cc" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "anniv-infinity-sparkle",
            "name": "Infinity with Sparkle",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.54,
            "maxScale": 0.86,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ais_${id}" x1="4" y1="12" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <ellipse cx="12" cy="16" rx="5.4" ry="4.8" stroke="url(#ais_${id})" stroke-width="1.7" fill="none"/>
                <ellipse cx="20" cy="16" rx="5.4" ry="4.8" stroke="url(#ais_${id})" stroke-width="1.7" fill="none"/>
                <path d="M4.4 6.4 4.9 7.9 6.4 8.4 4.9 8.9 4.4 10.4 3.9 8.9 2.4 8.4 3.9 7.9Z" fill="#ffffff" opacity="0.9"/>
                <path d="M27.6 22 28.1 23.5 29.6 24 28.1 24.5 27.6 26 27.1 24.5 25.6 24 27.1 23.5Z" fill="#ffffff" opacity="0.9"/>
                <circle cx="16" cy="16" r="1.2" fill="#ffffff"/>
                <path d="M16 25.6 16.4 27 17.8 27.4 16.4 27.8 16 29.2 15.6 27.8 14.2 27.4 15.6 27Z" fill="#fff7cc" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "anniv-gold-heart",
            "name": "Golden Anniversary Heart",
            "tier": "mid",
            "material": "heart",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="agh_${id}" x1="6" y1="6" x2="26" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#eab308"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M16 27.4c-0.4 0-11-7-11-13.6 0-3.6 3-5.6 5.8-5.6 1.8 0 3 0.8 4 1.8 1-1 2.2-1.8 4-1.8 2.8 0 5.8 2 5.8 5.6 0 6.6-10.6 13.6-11 13.6Z" fill="url(#agh_${id})"/>
                <path d="M9.6 11c-1.2 0.8-1.8 1.8-1.8 3" stroke="#fff7cc" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.7"/>
                <path d="M16 6.4 16 27.4" stroke="#a16207" stroke-width="0.35" opacity="0.4"/>
                <circle cx="21.6" cy="10.4" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "anniv-champagne-petal",
            "name": "Champagne Rose Petal",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.56,
            "maxScale": 0.88,
            "minOpacity": 0.48,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aPet_${id}" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#f59e0b"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M17 3.6c6.4 2.2 9.6 8.6 6.8 14.8-2.2 5-7 8-11.4 6.2-4.4-1.8-5.6-6.6-3.6-11.6 1.8-4.4 5.2-7.8 8.2-9.4Z" fill="url(#aPet_${id})"/>
                <path d="M16.8 6c0.4 6.8-1.8 13.8-4.8 18" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.5" fill="none"/>
                <path d="M15 12c1.6-0.4 3-0.4 4.4 0" stroke="#fef3c7" stroke-width="0.7" stroke-linecap="round" opacity="0.7" fill="none"/>
            </svg>
        `
        },
        {
            "id": "anniv-rose",
            "name": "Anniversary Rose",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.58,
            "maxScale": 0.92,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="aro_${id}" cx="42%" cy="38%" r="68%">
                        <stop stop-color="#fecdd3"/><stop offset="0.5" stop-color="#e11d48"/><stop offset="1" stop-color="#7f1d3a"/>
                    </radialGradient>
                </defs>
                <path d="M16 23.4c1 3 2.4 5.4 4.6 7.6" stroke="#4d7c0f" stroke-width="1.7" stroke-linecap="round" fill="none"/>
                <path d="M16 24.6c-3.2-0.4-5.2 1.4-5.8 3.6 2.6 1 5 0.2 6.2-1.6Z" fill="#65a30d"/>
                <path d="M18.4 26.4c2.4-1.6 4.8-1.4 6.2 0.2-1.4 2-4 2.4-5.8 1.2Z" fill="#4d7c0f"/>
                <circle cx="16" cy="15.4" r="9.2" fill="url(#aro_${id})"/>
                <path d="M16 6.6c4.4 0 8 3.4 8 7.6" stroke="#9f1239" stroke-width="1" fill="none" opacity="0.5"/>
                <path d="M16 9.6c3 0 5.6 2.6 5.6 5.8 0 3-2.4 5.4-5.6 5.4-2.6 0-4.6-1.8-4.6-4.2 0-2.2 1.8-4 4-4" stroke="#fda4af" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                <path d="M16 13c1.6 0 3 1.4 3 3 0 1.4-1.2 2.6-2.6 2.6" stroke="#fff1f2" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.9"/>
                <ellipse cx="11.6" cy="11.6" rx="2.2" ry="1.4" fill="#ffffff" opacity="0.3" transform="rotate(-32 11.6 11.6)"/>
            </svg>
        `
        },
        {
            "id": "anniv-pearl",
            "name": "Luminous Pearl",
            "tier": "far",
            "material": "bubble",
            "rarity": "common",
            "minScale": 0.22,
            "maxScale": 0.4,
            "minOpacity": 0.28,
            "maxOpacity": 0.48,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="aPearl_${id}" cx="35%" cy="28%" r="70%">
                        <stop stop-color="#ffffff"/><stop offset="0.45" stop-color="#fef3c7"/><stop offset="1" stop-color="#d4a017"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="7" fill="url(#aPearl_${id})"/>
                <ellipse cx="13.4" cy="13.4" rx="1.8" ry="2.2" fill="#ffffff" opacity="0.9" transform="rotate(-30 13.4 13.4)"/>
                <circle cx="19" cy="19.4" r="0.8" fill="#ffffff" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "anniv-gold-star",
            "name": "Golden Starlight",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.28,
            "maxScale": 0.52,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ags_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fef3c7"/><stop offset="1" stop-color="#f6c453" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 3c1.1 7.9 4.1 10.9 12 12-7.9 1.1-10.9 4.1-12 12-1.1-7.9-4.1-10.9-12-12 7.9-1.1 10.9-4.1 12-12Z" fill="url(#ags_${id})"/>
                <circle cx="16" cy="15" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "anniv-vow-seal",
            "name": "Golden Vow Seal",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.46,
            "maxScale": 0.76,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="avs_${id}" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="9.4" fill="url(#avs_${id})"/>
                <circle cx="16" cy="16" r="9.4" fill="none" stroke="#78350f" stroke-width="0.5" opacity="0.6"/>
                <circle cx="16" cy="16" r="7" fill="none" stroke="#fffbeb" stroke-width="0.7" opacity="0.7"/>
                <path d="m16 9.4 1.7 3.7 4 0.6-2.9 2.9 0.7 4-3.5-1.9-3.5 1.9 0.7-4-2.9-2.9 4-0.6Z" fill="#ffd166"/>
                <path d="m16 11.6 0.9 2 2.2 0.3-1.6 1.6 0.4 2.2-1.9-1-1.9 1 0.4-2.2-1.6-1.6 2.2-0.3Z" fill="#fff7cc" opacity="0.8"/>
            </svg>
        `
        },
        {
            "id": "anniv-diamond-glint",
            "name": "Diamond Head Glint",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="adg_t_${id}" x1="10" y1="5" x2="22" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#e0f2fe"/>
                    </linearGradient>
                    <linearGradient id="adg_b_${id}" x1="10" y1="11" x2="22" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#bae6fd"/><stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                    <radialGradient id="adg_h_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#bae6fd" stop-opacity="0.5"/><stop offset="1" stop-color="#0ea5e9" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="12" fill="url(#adg_h_${id})"/>
                <path d="M10 5 22 5 26.4 11 16 14.4 5.6 11Z" fill="url(#adg_t_${id})"/>
                <path d="M5.6 11 16 14.4 26.4 11 16 27Z" fill="url(#adg_b_${id})"/>
                <path d="M10 5 16 14.4 22 5M5.6 11 16 14.4 26.4 11M16 14.4 16 27" stroke="#ffffff" stroke-width="0.5" opacity="0.75"/>
                <path d="M13 7.4 16 10.4 19 7.4" stroke="#ffffff" stroke-width="0.7" fill="none" opacity="0.9" stroke-linejoin="round"/>
                <path d="M12 6.4 12 8.4" stroke="#ffffff" stroke-width="0.6" opacity="0.85"/>
                <circle cx="14" cy="9.4" r="0.7" fill="#ffffff"/>
                <path d="M27.4 4.6 28 6.2 29.6 6.8 28 7.4 27.4 9 26.8 7.4 25.2 6.8 26.8 6.2Z" fill="#ffffff"/>
                <path d="M4.6 22 5 23.2 6.2 23.6 5 24 4.6 25.2 4.2 24 3 23.6 4.2 23.2Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "anniv-double-ring",
            "name": "Twin Infinity Rings",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aRing_${id}" x1="3" y1="8" x2="17" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#facc15"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                    <linearGradient id="aRing2_${id}" x1="15" y1="8" x2="29" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fef3c7"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <circle cx="20" cy="17.4" r="7.6" stroke="url(#aRing2_${id})" stroke-width="2" fill="none"/>
                <circle cx="12" cy="17.4" r="7.6" stroke="url(#aRing_${id})" stroke-width="2" fill="none"/>
                <path d="M19.44 24.78 A 7.6 7.6 0 0 1 14.14 23.07" stroke="url(#aRing2_${id})" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M6.4 12.6c0.4-1.2 1.1-2.2 2-3M14.4 12.6c0.4-1.2 1.1-2.2 2-3" stroke="#fff7cc" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M16 3.6 17.4 6.4 20.4 7 18.2 9.2 18.8 12.2 16 10.7 13.2 12.2 13.8 9.2 11.6 7 14.6 6.4Z" fill="#ffffff" opacity="0.9"/>
                <circle cx="16" cy="7.6" r="0.8" fill="#fef3c7"/>
            </svg>
        `
        },
        {
            "id": "anniv-gold-fleck",
            "name": "Gold Leaf Fleck",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="agf_${id}" x1="6" y1="8" x2="24" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#eab308"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                </defs>
                <path d="M7 12 23 7l-3 14-11 3-4-6 2-6Z" fill="url(#agf_${id})"/>
                <path d="M10 12 20 18" stroke="#fff7d6" stroke-width="0.9" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "anniv-champagne-star",
            "name": "Champagne Star",
            "tier": "far",
            "material": "star",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.58,
            "minOpacity": 0.35,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="acs_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fef3c7"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 3c1.3 8.7 4.3 11.7 13 13-8.7 1.3-11.7 4.3-13 13-1.3-8.7-4.3-11.7-13-13 8.7-1.3 11.7-4.3 13-13Z" fill="url(#acs_${id})"/>
                <circle cx="16" cy="15" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "anniv-champagne-spark",
            "name": "Champagne Spark",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="acsp_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fef3c7"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 3v9M16 20v9M3 16h9M20 16h9" stroke="#fff4bf" stroke-width="1.3" stroke-linecap="round"/>
                <path d="M6.6 6.6 12.4 12.4M19.6 19.6 25.4 25.4M25.4 6.6 19.6 12.4M12.4 19.6 6.6 25.4" stroke="#fbbf24" stroke-width="1" stroke-linecap="round" opacity="0.75"/>
                <circle cx="16" cy="16" r="5" fill="url(#acsp_${id})"/>
                <circle cx="16" cy="16" r="3" fill="#fbbf24"/>
                <circle cx="15.4" cy="15.4" r="1" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "anniv-rose-gold-heart",
            "name": "Rose Gold Heart",
            "tier": "mid",
            "material": "heart",
            "rarity": "uncommon",
            "minScale": 0.52,
            "maxScale": 0.82,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aH_${id}" x1="7" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffe1e9"/><stop offset="0.5" stop-color="#e87988"/><stop offset="1" stop-color="#9f1239"/>
                    </linearGradient>
                </defs>
                <path d="M16 26.6c-0.4 0-10-6.6-10-12.8 0-3.4 2.8-5.4 5.6-5.4 1.6 0 2.8 0.8 3.6 1.8 0.8-1 2-1.8 3.6-1.8 2.8 0 5.6 2 5.6 5.4 0 6.2-9.6 12.8-10 12.8Z" fill="url(#aH_${id})"/>
                <path d="M10 10.4c-1.2 0.7-1.8 1.7-1.8 3" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.65"/>
                <ellipse cx="21.6" cy="10.6" rx="1" ry="1.4" fill="#ffffff" opacity="0.4" transform="rotate(-30 21.6 10.6)"/>
            </svg>
        `
        },
        {
            "id": "anniv-couple-star",
            "name": "Togetherness Star",
            "tier": "mid",
            "material": "star",
            "rarity": "uncommon",
            "minScale": 0.52,
            "maxScale": 0.84,
            "minOpacity": 0.44,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="acs2_${id}" x1="3" y1="5" x2="16" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#fbbf24"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                    <linearGradient id="acs3_${id}" x1="15" y1="10" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fcd34d"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <path d="m11 5 2.2 6 6.2 2.1-6.2 2.1L11 21l-2.2-5.8L2.6 13l6.2-2.1L11 5Z" fill="url(#acs2_${id})"/>
                <path d="m21 11 1.6 4.4 4.6 1.4-4.6 1.4L21 22.6l-1.6-4.4L14.8 17l4.6-1.4L21 11Z" fill="url(#acs3_${id})"/>
                <circle cx="11" cy="13" r="0.9" fill="#ffffff"/>
                <circle cx="21" cy="17" r="0.7" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "anniv-crystal-drop",
            "name": "Crystal Tear",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.66,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="acd_${id}" cx="35%" cy="28%" r="72%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.6c5.2 6.4 8.6 11 8.6 16.2A8.6 8.6 0 1 1 7.4 19.8C7.4 14.6 10.8 10 16 3.6Z" fill="url(#acd_${id})"/>
                <path d="M13.6 13.4c-1.4 1.9-2 3.6-2 5.4" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.85"/>
                <ellipse cx="20" cy="15" rx="1" ry="1.6" fill="#ffffff" opacity="0.5" transform="rotate(20 20 15)"/>
                <circle cx="18.4" cy="22.4" r="0.7" fill="#ffffff" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "anniv-champagne-glass",
            "name": "Champagne Toast",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 24 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="acg_l_${id}" x1="4" y1="4" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc" stop-opacity="0.5"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0.35"/>
                    </linearGradient>
                    <linearGradient id="acg_s_${id}" x1="12" y1="20" x2="12" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <path d="M4.4 4h15.2l-1.2 11c-0.4 3.4-2.6 5.2-4.6 5.2h-3.6c-2 0-4.2-1.8-4.6-5.2Z" fill="url(#acg_l_${id})" stroke="#fcd34d" stroke-width="0.9"/>
                <path d="M5.4 6h13.2l-0.5 6.4c-0.3 2.4-2 3.6-3.8 3.6h-4.6c-1.8 0-3.5-1.2-3.8-3.6Z" fill="#fde68a" opacity="0.6"/>
                <circle cx="9" cy="9.4" r="0.7" fill="#ffffff" opacity="0.9"/>
                <circle cx="15.4" cy="11" r="0.55" fill="#ffffff" opacity="0.85"/>
                <circle cx="12.6" cy="13" r="0.5" fill="#ffffff" opacity="0.8"/>
                <path d="M12 22v12" stroke="url(#acg_s_${id})" stroke-width="1.3" stroke-linecap="round"/>
                <path d="M7 35h10" stroke="url(#acg_s_${id})" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M7 7c0.4-1.6 1-2.4 1.8-3" stroke="#ffffff" stroke-width="0.85" stroke-linecap="round" opacity="0.85" fill="none"/>
                <path d="M20 3 20.4 4.4 21.8 4.8 20.4 5.2 20 6.6 19.6 5.2 18.2 4.8 19.6 4.4Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "anniv-ribbon-bow",
            "name": "Anniversary Ribbon Bow",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.88,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="arb_${id}" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#f5b94a"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M4.4 12c2.8-3.2 8.4-3.6 11.6-0.4 3.2-3.2 8.8-2.8 11.6 0.4 1.6 1.8 0.4 5-2.4 6.4-3.6 1.8-7.8 1.4-9.2-1.2-1.4 2.6-5.6 3-9.2 1.2C4 16.9 2.8 13.8 4.4 12Z" fill="url(#arb_${id})"/>
                <path d="M16 11.6c0.6 0.8 0.6 2 0 3-0.6-1-0.6-2.2 0-3Z" fill="#7c2d12" opacity="0.6"/>
                <circle cx="16" cy="14" r="2" fill="#78350f"/>
                <circle cx="15.4" cy="13.4" r="0.5" fill="#fff7cc"/>
                <path d="M13.6 17.4 11 27M18.4 17.4 21 27" stroke="url(#arb_${id})" stroke-width="2" stroke-linecap="round"/>
                <path d="M11 27 9.4 29 11.4 28.6Z M21 27l1.6 2-2-0.4Z" fill="#92400e"/>
                <path d="M8 10.4c2.2-1.6 4.4-2 6.4-1.2M24 10.4c-2.2-1.6-4.4-2-6.4-1.2" stroke="#fff7cc" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.7"/>
            </svg>
        `
        }
    ],
    "graduation": [
        {
            "id": "grad-blue-cap",
            "name": "Sapphire Graduation Cap",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.18,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 40 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gbc_b_${id}" x1="4" y1="6" x2="36" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="0.5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <linearGradient id="gbc_s_${id}" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3b82f6"/><stop offset="1" stop-color="#1e40af"/>
                    </linearGradient>
                    <linearGradient id="gbc_t_${id}" x1="20" y1="6" x2="20" y2="14" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="1" stop-color="#d97706"/>
                    </linearGradient>
                </defs>
                <path d="M20 5 35 12.5 20 20 5 12.5Z" fill="url(#gbc_b_${id})"/>
                <path d="M5 12.5 20 20 35 12.5 35 14 20 21.5 5 14Z" fill="#1e3a8a"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8s9.5-2.4 9.5-5.8v-5.5" fill="url(#gbc_s_${id})"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8" stroke="#60a5fa" stroke-width="0.7" fill="none" opacity="0.55"/>
                <path d="M12.5 14 12.5 20.4M16 15.7V22M20 16.6v5.5M24 15.7V22M27.5 14V20.4" stroke="#1e3a8a" stroke-width="0.4" opacity="0.45"/>
                <circle cx="20" cy="12.5" r="1.2" fill="url(#gbc_t_${id})"/>
                <path d="M21.2 12.4Q27.5 12.6 33 12.4L33.2 20" stroke="#facc15" stroke-width="1" stroke-linecap="round" fill="none"/>
                <circle cx="33.2" cy="20.6" r="1.3" fill="#fde68a"/>
                <path d="M32.4 21.6 32.2 24M33 21.6 33 24M33.8 21.6 34 24" stroke="#fcd34d" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M11 9.4 22 14.6" stroke="#dbeafe" stroke-width="0.7" stroke-linecap="round" opacity="0.6"/>
                <path d="M7 12.5 20 18.8 33 12.5" stroke="#dbeafe" stroke-width="0.5" stroke-linecap="round" opacity="0.45" fill="none"/>
            </svg>
        `
        },
        {
            "id": "grad-gold-cap",
            "name": "Honor Gold Cap",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 40 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ggc_b_${id}" x1="4" y1="6" x2="36" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="0.5" stop-color="#d4a017"/><stop offset="1" stop-color="#78350f"/>
                    </linearGradient>
                    <linearGradient id="ggc_s_${id}" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fbbf24"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <path d="M20 5 35 12.5 20 20 5 12.5Z" fill="url(#ggc_b_${id})"/>
                <path d="M5 12.5 20 20 35 12.5 35 14 20 21.5 5 14Z" fill="#7c2d12"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8s9.5-2.4 9.5-5.8v-5.5" fill="url(#ggc_s_${id})"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8" stroke="#fef9c3" stroke-width="0.7" fill="none" opacity="0.65"/>
                <path d="M12.5 14 12.5 20.4M16 15.7V22M20 16.6v5.5M24 15.7V22M27.5 14V20.4" stroke="#78350f" stroke-width="0.4" opacity="0.45"/>
                <circle cx="20" cy="12.5" r="1.2" fill="#1e40af"/>
                <path d="M21.2 12.4Q27.5 12.6 33 12.4L33.2 20" stroke="#1e3a8a" stroke-width="1" stroke-linecap="round" fill="none"/>
                <circle cx="33.2" cy="20.6" r="1.3" fill="#1d4ed8"/>
                <path d="M32.4 21.6 32.2 24M33 21.6 33 24M33.8 21.6 34 24" stroke="#1e40af" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M11 9.4 22 14.6" stroke="#fff7cc" stroke-width="0.7" stroke-linecap="round" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "grad-red-cap",
            "name": "Crimson Graduation Cap",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.58,
            "maxScale": 0.92,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 40 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grc_b_${id}" x1="4" y1="6" x2="36" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="0.5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                    <linearGradient id="grc_s_${id}" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>
                <path d="M20 5 35 12.5 20 20 5 12.5Z" fill="url(#grc_b_${id})"/>
                <path d="M5 12.5 20 20 35 12.5 35 14 20 21.5 5 14Z" fill="#7f1d1d"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8s9.5-2.4 9.5-5.8v-5.5" fill="url(#grc_s_${id})"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8" stroke="#fecaca" stroke-width="0.7" fill="none" opacity="0.55"/>
                <circle cx="20" cy="12.5" r="1.2" fill="#fde68a"/>
                <path d="M21.2 12.4Q27.5 12.6 33 12.4L33.2 20" stroke="#fde68a" stroke-width="1" stroke-linecap="round" fill="none"/>
                <circle cx="33.2" cy="20.6" r="1.3" fill="#facc15"/>
                <path d="M32.4 21.6 32.2 24M33 21.6 33 24M33.8 21.6 34 24" stroke="#fcd34d" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M11 9.4 22 14.6" stroke="#fecaca" stroke-width="0.7" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-green-cap",
            "name": "Emerald Graduation Cap",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 40 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ggn_b_${id}" x1="4" y1="6" x2="36" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#6ee7b7"/><stop offset="0.5" stop-color="#059669"/><stop offset="1" stop-color="#064e3b"/>
                    </linearGradient>
                    <linearGradient id="ggn_s_${id}" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#10b981"/><stop offset="1" stop-color="#065f46"/>
                    </linearGradient>
                </defs>
                <path d="M20 5 35 12.5 20 20 5 12.5Z" fill="url(#ggn_b_${id})"/>
                <path d="M5 12.5 20 20 35 12.5 35 14 20 21.5 5 14Z" fill="#064e3b"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8s9.5-2.4 9.5-5.8v-5.5" fill="url(#ggn_s_${id})"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8" stroke="#a7f3d0" stroke-width="0.7" fill="none" opacity="0.55"/>
                <circle cx="20" cy="12.5" r="1.2" fill="#fde68a"/>
                <path d="M21.2 12.4Q27.5 12.6 33 12.4L33.2 20" stroke="#fde68a" stroke-width="1" stroke-linecap="round" fill="none"/>
                <circle cx="33.2" cy="20.6" r="1.3" fill="#facc15"/>
                <path d="M32.4 21.6 32.2 24M33 21.6 33 24M33.8 21.6 34 24" stroke="#fcd34d" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M11 9.4 22 14.6" stroke="#a7f3d0" stroke-width="0.7" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-purple-cap",
            "name": "Amethyst Graduation Cap",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 40 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gpc_b_${id}" x1="4" y1="6" x2="36" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#c4b5fd"/><stop offset="0.5" stop-color="#7c3aed"/><stop offset="1" stop-color="#4c1d95"/>
                    </linearGradient>
                    <linearGradient id="gpc_s_${id}" x1="8" y1="14" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#8b5cf6"/><stop offset="1" stop-color="#5b21b6"/>
                    </linearGradient>
                </defs>
                <path d="M20 5 35 12.5 20 20 5 12.5Z" fill="url(#gpc_b_${id})"/>
                <path d="M5 12.5 20 20 35 12.5 35 14 20 21.5 5 14Z" fill="#3b0764"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8s9.5-2.4 9.5-5.8v-5.5" fill="url(#gpc_s_${id})"/>
                <path d="M10.5 15.5v5.5c0 3.4 4.4 5.8 9.5 5.8" stroke="#ddd6fe" stroke-width="0.7" fill="none" opacity="0.55"/>
                <circle cx="20" cy="12.5" r="1.2" fill="#fde68a"/>
                <path d="M21.2 12.4Q27.5 12.6 33 12.4L33.2 20" stroke="#fde68a" stroke-width="1" stroke-linecap="round" fill="none"/>
                <circle cx="33.2" cy="20.6" r="1.3" fill="#facc15"/>
                <path d="M32.4 21.6 32.2 24M33 21.6 33 24M33.8 21.6 34 24" stroke="#fcd34d" stroke-width="0.7" stroke-linecap="round"/>
                <path d="M11 9.4 22 14.6" stroke="#ddd6fe" stroke-width="0.7" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-medal-first",
            "name": "First Place Medal",
            "tier": "near",
            "material": "star",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 34 42" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gm1_r_${id}" x1="6" y1="3" x2="26" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="0.5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <radialGradient id="gm1_d_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#f7c948"/><stop offset="1" stop-color="#a16207"/>
                    </radialGradient>
                </defs>
                <path d="M11 3 15.4 3 14.6 19 10.2 19Z" fill="url(#gm1_r_${id})"/>
                <path d="M18.6 3 23 3 23.8 19 19.4 19Z" fill="url(#gm1_r_${id})"/>
                <path d="M11 3 15.4 3 14.8 12 11.4 12Z" fill="#93c5fd" opacity="0.5"/>
                <path d="M18.6 3 23 3 22.6 12 19.2 12Z" fill="#93c5fd" opacity="0.5"/>
                <circle cx="17" cy="26" r="11" fill="url(#gm1_d_${id})"/>
                <circle cx="17" cy="26" r="11" fill="none" stroke="#78350f" stroke-width="0.5" opacity="0.5"/>
                <circle cx="17" cy="26" r="8.6" fill="none" stroke="#78350f" stroke-width="0.4" opacity="0.55"/>
                <circle cx="17" cy="26" r="7" fill="#fffbeb"/>
                <g stroke="#b45309" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none">
                    <path d="M14.4 23.4 17 21.2 17 30.4"/>
                    <path d="M13.6 30.4 20.4 30.4"/>
                </g>
                <path d="M11.4 20.6c0.6-1.2 1.6-2 2.8-2.4" stroke="#fff7cc" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
                <circle cx="23.4" cy="21.6" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "grad-medal-second",
            "name": "Second Place Medal",
            "tier": "mid",
            "material": "star",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.88,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 34 42" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gm2_r_${id}" x1="6" y1="3" x2="26" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="0.5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <radialGradient id="gm2_d_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#dbe2ea"/><stop offset="1" stop-color="#64748b"/>
                    </radialGradient>
                </defs>
                <path d="M11 3 15.4 3 14.6 19 10.2 19Z" fill="url(#gm2_r_${id})"/>
                <path d="M18.6 3 23 3 23.8 19 19.4 19Z" fill="url(#gm2_r_${id})"/>
                <path d="M11 3 15.4 3 14.8 12 11.4 12Z" fill="#93c5fd" opacity="0.5"/>
                <path d="M18.6 3 23 3 22.6 12 19.2 12Z" fill="#93c5fd" opacity="0.5"/>
                <circle cx="17" cy="26" r="11" fill="url(#gm2_d_${id})"/>
                <circle cx="17" cy="26" r="11" fill="none" stroke="#334155" stroke-width="0.5" opacity="0.45"/>
                <circle cx="17" cy="26" r="8.6" fill="none" stroke="#334155" stroke-width="0.4" opacity="0.5"/>
                <circle cx="17" cy="26" r="7" fill="#f8fafc"/>
                <path d="M13.4 23.4 C13.4 21.6 14.9 20.4 16.8 20.4 C18.7 20.4 20 21.6 20 23.4 C20 24.8 18.9 25.8 17.4 27 L13.6 30.6 L20.2 30.6" stroke="#334155" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M11.4 20.6c0.6-1.2 1.6-2 2.8-2.4" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
                <circle cx="23.4" cy="21.6" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "grad-medal-third",
            "name": "Third Place Bronze Medal",
            "tier": "mid",
            "material": "star",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.88,
            "minOpacity": 0.48,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 34 42" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gm3_r_${id}" x1="6" y1="3" x2="26" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="0.5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                    <radialGradient id="gm3_d_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fed7aa"/><stop offset="0.5" stop-color="#c2410c"/><stop offset="1" stop-color="#7c2d12"/>
                    </radialGradient>
                </defs>
                <path d="M11 3 15.4 3 14.6 19 10.2 19Z" fill="url(#gm3_r_${id})"/>
                <path d="M18.6 3 23 3 23.8 19 19.4 19Z" fill="url(#gm3_r_${id})"/>
                <path d="M11 3 15.4 3 14.8 12 11.4 12Z" fill="#fca5a5" opacity="0.5"/>
                <path d="M18.6 3 23 3 22.6 12 19.2 12Z" fill="#fca5a5" opacity="0.5"/>
                <circle cx="17" cy="26" r="11" fill="url(#gm3_d_${id})"/>
                <circle cx="17" cy="26" r="11" fill="none" stroke="#7c2d12" stroke-width="0.5" opacity="0.5"/>
                <circle cx="17" cy="26" r="8.6" fill="none" stroke="#7c2d12" stroke-width="0.4" opacity="0.55"/>
                <circle cx="17" cy="26" r="7" fill="#fff7ed"/>
                <path d="M13.8 22.2 L19.4 22.2 L16.4 25.6 C18.6 25.6 20 26.6 20 28.1 C20 29.6 18.5 30.8 16.6 30.8 C15 30.8 13.8 30.1 13.2 29" stroke="#7c2d12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M11.4 20.6c0.6-1.2 1.6-2 2.8-2.4" stroke="#fed7aa" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
                <circle cx="23.4" cy="21.6" r="0.7" fill="#ffffff" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "grad-certificate",
            "name": "Graduation Certificate",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.72,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 42 34" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gct_p_${id}" x1="4" y1="4" x2="38" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fffbeb"/><stop offset="1" stop-color="#fde68a"/>
                    </linearGradient>
                    <linearGradient id="gct_r_${id}" x1="20" y1="20" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="1" stop-color="#991b1b"/>
                    </linearGradient>
                </defs>
                <rect x="5" y="5" width="32" height="24" rx="1.6" fill="url(#gct_p_${id})" stroke="#d4a017" stroke-width="0.8"/>
                <rect x="6.4" y="6.4" width="29.2" height="21.2" rx="1" fill="none" stroke="#facc15" stroke-width="0.5" stroke-dasharray="1.2 1.4" opacity="0.85"/>
                <circle cx="10" cy="10" r="1.3" fill="none" stroke="#d4a017" stroke-width="0.5"/>
                <path d="M10 8.9v2.2M8.9 10h2.2" stroke="#d4a017" stroke-width="0.35"/>
                <path d="M15 12.4h14M15 15.4h10M15 18.4h12" stroke="#1d4ed8" stroke-width="0.95" stroke-linecap="round"/>
                <path d="M15 21.4h7" stroke="#1d4ed8" stroke-width="0.95" stroke-linecap="round" opacity="0.7"/>
                <path d="M28.4 22.4 32 20 30.6 24 32 28 28.4 25.6 24.8 28 26.2 24 24.8 20Z" fill="url(#gct_r_${id})"/>
                <circle cx="28.4" cy="24" r="1.4" fill="#ffd166"/>
                <circle cx="28" cy="23.6" r="0.5" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "grad-diploma-scroll",
            "name": "Diploma Scroll",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.72,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 38 34" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gds_b_${id}" x1="8" y1="12" x2="30" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc"/><stop offset="0.55" stop-color="#fde68a"/><stop offset="1" stop-color="#d4a017"/>
                    </linearGradient>
                    <linearGradient id="gds_e_${id}" x1="28" y1="12" x2="32" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fffbeb"/><stop offset="1" stop-color="#fbbf24"/>
                    </linearGradient>
                    <linearGradient id="gds_r_${id}" x1="16" y1="8" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/><stop offset="1" stop-color="#991b1b"/>
                    </linearGradient>
                </defs>
                <rect x="8" y="12" width="22" height="10" rx="0.4" fill="url(#gds_b_${id})"/>
                <path d="M8 12h22M8 22h22" stroke="#92400e" stroke-width="0.3" opacity="0.55"/>
                <ellipse cx="30" cy="17" rx="2.4" ry="5" fill="url(#gds_e_${id})" stroke="#92400e" stroke-width="0.5"/>
                <ellipse cx="30" cy="17" rx="1.4" ry="3.1" fill="none" stroke="#92400e" stroke-width="0.45" opacity="0.7"/>
                <path d="M30 15.6q1 1.4 0 2.8" stroke="#92400e" stroke-width="0.4" fill="none" opacity="0.7"/>
                <ellipse cx="8" cy="17" rx="2.2" ry="5" fill="url(#gds_e_${id})" stroke="#92400e" stroke-width="0.5"/>
                <ellipse cx="8" cy="17" rx="1.3" ry="3.1" fill="none" stroke="#92400e" stroke-width="0.45" opacity="0.7"/>
                <path d="M8 15.6q-1 1.4 0 2.8" stroke="#92400e" stroke-width="0.4" fill="none" opacity="0.7"/>
                <rect x="16.4" y="10.4" width="4.2" height="13.2" rx="0.6" fill="url(#gds_r_${id})"/>
                <rect x="16.4" y="10.4" width="4.2" height="13.2" rx="0.6" fill="#ffffff" opacity="0.12"/>
                <path d="M18.5 10.4c-1.6-1.6-3-1.8-3.2-0.6-0.2 1 1.6 1.2 3.2 0.6Z" fill="url(#gds_r_${id})"/>
                <path d="M18.5 10.4c1.6-1.6 3-1.8 3.2-0.6 0.2 1-1.6 1.2-3.2 0.6Z" fill="url(#gds_r_${id})"/>
                <circle cx="18.5" cy="10.4" r="0.9" fill="#7f1d1d"/>
                <path d="M11 15.4h3M11 18.6h3" stroke="#92400e" stroke-width="0.35" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "grad-diploma-roll",
            "name": "Mini Diploma Roll",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.1,
            "minOpacity": 0.66,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gdr_b_${id}" x1="6" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#c28a12"/>
                    </linearGradient>
                    <linearGradient id="gdr_r_${id}" x1="12" y1="7" x2="22" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>
                <rect x="6" y="10.4" width="20" height="11.2" rx="0.6" fill="url(#gdr_b_${id})"/>
                <path d="M6 10.4h20M6 21.6h20" stroke="#92400e" stroke-width="0.3" opacity="0.55"/>
                <ellipse cx="26" cy="16" rx="2.4" ry="5.6" fill="#fff7cc" stroke="#92400e" stroke-width="0.5"/>
                <ellipse cx="26" cy="16" rx="1.4" ry="3.4" fill="none" stroke="#92400e" stroke-width="0.45" opacity="0.7"/>
                <path d="M26 14.4q1 1.6 0 3.2" stroke="#92400e" stroke-width="0.4" fill="none" opacity="0.7"/>
                <rect x="12.6" y="8.6" width="4" height="14.6" rx="0.6" fill="url(#gdr_r_${id})"/>
                <path d="M14.6 8.6c-1.6-1.6-3-1.8-3.2-0.6-0.2 1 1.6 1.2 3.2 0.6Z" fill="url(#gdr_r_${id})"/>
                <path d="M14.6 8.6c1.6-1.6 3-1.8 3.2-0.6 0.2 1-1.6 1.2-3.2 0.6Z" fill="url(#gdr_r_${id})"/>
                <circle cx="14.6" cy="8.6" r="0.8" fill="#7f1d1d"/>
                <path d="M8.4 13.6h2.6M8.4 16h2.6M8.4 18.4h2.6" stroke="#92400e" stroke-width="0.35" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-cap-diploma",
            "name": "Cap and Diploma",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.82,
            "maxScale": 1.2,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 36 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gcd_b_${id}" x1="4" y1="4" x2="32" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="0.5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <linearGradient id="gcd_s_${id}" x1="8" y1="10" x2="28" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3b82f6"/><stop offset="1" stop-color="#1e40af"/>
                    </linearGradient>
                    <linearGradient id="gcd_p_${id}" x1="4" y1="24" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#fde68a"/><stop offset="1" stop-color="#c28a12"/>
                    </linearGradient>
                    <linearGradient id="gcd_r_${id}" x1="14" y1="22" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>
                <path d="M18 2.4 30.4 8 18 13.6 5.6 8Z" fill="url(#gcd_b_${id})"/>
                <path d="M5.6 8 18 13.6 30.4 8 30.4 9.2 18 14.8 5.6 9.2Z" fill="#1e3a8a"/>
                <path d="M10.4 10.4v4.6c0 2.8 3.6 4.8 7.6 4.8s7.6-2 7.6-4.8v-4.6" fill="url(#gcd_s_${id})"/>
                <circle cx="18" cy="8" r="1" fill="#facc15"/>
                <path d="M18.9 8Q24.6 8 29.4 8L29.6 15.4" stroke="#facc15" stroke-width="0.9" stroke-linecap="round" fill="none"/>
                <circle cx="29.6" cy="16" r="1.2" fill="#fde68a"/>
                <path d="M28.9 16.9 28.7 19M29.6 16.9 29.6 19M30.3 16.9 30.5 19" stroke="#fcd34d" stroke-width="0.6" stroke-linecap="round"/>
                <rect x="4" y="24.6" width="28" height="7.4" rx="0.6" fill="url(#gcd_p_${id})"/>
                <path d="M4 24.6h28M4 32h28" stroke="#92400e" stroke-width="0.3" opacity="0.55"/>
                <ellipse cx="32" cy="28.3" rx="1.8" ry="3.7" fill="#fff7cc" stroke="#92400e" stroke-width="0.45"/>
                <ellipse cx="32" cy="28.3" rx="1" ry="2.2" fill="none" stroke="#92400e" stroke-width="0.4" opacity="0.7"/>
                <ellipse cx="4" cy="28.3" rx="1.8" ry="3.7" fill="#fff7cc" stroke="#92400e" stroke-width="0.45"/>
                <ellipse cx="4" cy="28.3" rx="1" ry="2.2" fill="none" stroke="#92400e" stroke-width="0.4" opacity="0.7"/>
                <rect x="15.6" y="23.4" width="3.2" height="9.6" rx="0.5" fill="url(#gcd_r_${id})"/>
                <path d="M17.2 23.4c-1.2-1.2-2.4-1.4-2.6-0.4-0.2 0.8 1.4 0.9 2.6 0.4Z" fill="url(#gcd_r_${id})"/>
                <path d="M17.2 23.4c1.2-1.2 2.4-1.4 2.6-0.4 0.2 0.8-1.4 0.9-2.6 0.4Z" fill="url(#gcd_r_${id})"/>
                <circle cx="17.2" cy="23.4" r="0.7" fill="#7f1d1d"/>
            </svg>
        `
        },
        {
            "id": "grad-medal",
            "name": "Academic Medal",
            "tier": "near",
            "material": "star",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 34 42" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gmd_r_${id}" x1="6" y1="3" x2="26" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="0.5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <radialGradient id="gmd_d_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#fff7cc"/><stop offset="0.5" stop-color="#f7c948"/><stop offset="1" stop-color="#a16207"/>
                    </radialGradient>
                    <linearGradient id="gmd_i_${id}" x1="12" y1="14" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                </defs>
                <path d="M11 3 15.4 3 14.6 19 10.2 19Z" fill="url(#gmd_r_${id})"/>
                <path d="M18.6 3 23 3 23.8 19 19.4 19Z" fill="url(#gmd_r_${id})"/>
                <path d="M11 3 15.4 3 14.8 12 11.4 12Z" fill="#93c5fd" opacity="0.5"/>
                <path d="M18.6 3 23 3 22.6 12 19.2 12Z" fill="#93c5fd" opacity="0.5"/>
                <circle cx="17" cy="26" r="11" fill="url(#gmd_d_${id})"/>
                <circle cx="17" cy="26" r="11" fill="none" stroke="#78350f" stroke-width="0.5" opacity="0.5"/>
                <circle cx="17" cy="26" r="8.6" fill="url(#gmd_i_${id})"/>
                <path d="m17 20.6 1.9 3.8 4.2 0.6-3 3 0.7 4.2-3.8-2-3.8 2 0.7-4.2-3-3 4.2-0.6Z" fill="#ffffff"/>
                <path d="M11.4 20.6c0.6-1.2 1.6-2 2.8-2.4" stroke="#fff7cc" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "grad-laurel",
            "name": "Triumph Laurel",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="glr_${id}" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#e6c35a"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M16 27.4C14.4 18.4 16 10.2 22 4.8" stroke="#92400e" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <g fill="url(#glr_${id})">
                    <path d="M15.6 21.4c-4.6-1-7.4-3.6-9-7.4 5 0.4 7.8 2.8 9 7.4Z"/>
                    <path d="M15.4 17c-3.8-1.2-6-3.4-7.2-6.4 4.2 0.8 6.6 3 7.2 6.4Z"/>
                    <path d="M16.6 12.8c-2.8-1.4-4.4-3.4-5.2-6.2 3.4 1 5.2 3 5.2 6.2Z"/>
                    <path d="M17.4 22.4c4.4-0.4 7.4-2.4 9.2-5.8-4.6 0-7.6 1.8-9.2 5.8Z"/>
                    <path d="M18 18c3.6-0.8 6-2.8 7.4-5.6-4 0.4-6.4 2.4-7.4 5.6Z"/>
                    <path d="M18.6 13.4c2.4-1.2 3.8-2.8 4.6-5-2.8 0.6-4.4 2.2-4.6 5Z"/>
                </g>
                <path d="M9 13.4c1.2-1.6 2.6-2.4 4-2.6M21.6 13.8c-1.2-1.4-2.4-2.2-3.8-2.4" stroke="#fff7cc" stroke-width="0.5" fill="none" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-honor-star",
            "name": "Academic Honor Star",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.46,
            "maxScale": 0.78,
            "minOpacity": 0.46,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ghs_${id}" x1="16" y1="3" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#f8c94a"/><stop offset="1" stop-color="#a16207"/>
                    </linearGradient>
                </defs>
                <path d="m16 3 3 8 8.5 0.6-6.4 5.3 2 8.2-7.1-4.6-7.1 4.6 2-8.2L4.5 11.6 13 11Z" fill="url(#ghs_${id})"/>
                <path d="m16 6.6 2.1 5.8 6.1 0.4-4.6 3.8 1.4 5.9-5-3.3-5 3.3 1.4-5.9-4.6-3.8 6.1-0.4Z" fill="#ffffff" opacity="0.55"/>
                <circle cx="16" cy="15" r="1.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "grad-blue-confetti",
            "name": "Sapphire Paper",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.32,
            "maxScale": 0.58,
            "minOpacity": 0.38,
            "maxOpacity": 0.62,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gbcf_${id}" x1="8" y1="12" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#93c5fd"/><stop offset="0.5" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12.4" width="18" height="5.6" rx="1" transform="rotate(28 16 16)" fill="url(#gbcf_${id})"/>
                <path d="M11 13.6 21 17.6" stroke="#dbeafe" stroke-width="0.8" stroke-linecap="round" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "grad-gold-confetti",
            "name": "Honor Gold Foil",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.32,
            "maxScale": 0.58,
            "minOpacity": 0.38,
            "maxOpacity": 0.62,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ggcf_${id}" x1="8" y1="12" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef9c3"/><stop offset="0.5" stop-color="#f6c453"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <rect x="7" y="12.4" width="18" height="5.6" rx="1" transform="rotate(-23 16 16)" fill="url(#ggcf_${id})"/>
                <path d="M11 13 21 17" stroke="#fff7cc" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "grad-tassel-streamer",
            "name": "Tassel Streamer",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.82,
            "minOpacity": 0.42,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gts_${id}" x1="6" y1="4" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#d4a017"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M6 5.4c7.6 2.4 13.4 6.2 12.4 11-0.8 3.8-7.2 3.4-7.6 6.4-0.4 3 2.8 4.6 12.6 4" stroke="url(#gts_${id})" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <path d="M6 5.4c7.6 2.4 13.4 6.2 12.4 11" stroke="#fff7cc" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.7"/>
                <path d="M23.4 26.8h4.8M24 26.8l-1 3M26 26.8l0.4 3M28 26.8l1 3" stroke="#1d4ed8" stroke-width="1" stroke-linecap="round"/>
                <circle cx="23.6" cy="26.8" r="1" fill="#facc15"/>
            </svg>
        `
        },
        {
            "id": "grad-cap",
            "name": "Minimalist Mortarboard",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.16,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gcap_b_${id}" x1="4" y1="4" x2="28" y2="14" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3b82f6"/><stop offset="0.5" stop-color="#1d4ed8"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                    <linearGradient id="gcap_s_${id}" x1="8" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/>
                    </linearGradient>
                </defs>
                <path d="m16 4.4 12 6-12 6-12-6Z" fill="url(#gcap_b_${id})"/>
                <path d="M4 10.4 16 16.4 28 10.4 28 11.6 16 17.6 4 11.6Z" fill="#172554"/>
                <path d="M9 13.4v5.4c0 3 3.1 5 7 5s7-2 7-5v-5.4" fill="url(#gcap_s_${id})"/>
                <path d="M9 13.4v5.4c0 3 3.1 5 7 5" stroke="#60a5fa" stroke-width="0.55" fill="none" opacity="0.65"/>
                <path d="M10.6 12.4v5.4M13.6 13.9v5.9M16 14.6v5.9M18.4 13.9v5.9M21.4 12.4v5.4" stroke="#1e3a8a" stroke-width="0.35" opacity="0.45"/>
                <circle cx="16" cy="10.4" r="1" fill="#facc15"/>
                <path d="M17 10.3q5 0.2 9.6 0L26.8 16.8" stroke="#facc15" stroke-width="0.85" stroke-linecap="round" fill="none"/>
                <circle cx="26.8" cy="17.4" r="1.1" fill="#fde68a"/>
                <path d="M26.1 18.2 26 20.4M26.8 18.2 26.8 20.4M27.5 18.2 27.6 20.4" stroke="#fcd34d" stroke-width="0.55" stroke-linecap="round"/>
                <path d="M9.6 8 19.4 12.4" stroke="#dbeafe" stroke-width="0.5" stroke-linecap="round" opacity="0.55"/>
            </svg>
        `
        },
        {
            "id": "grad-success-burst",
            "name": "Success Starburst",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.4,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="gsb_${id}" cx="50%" cy="50%" r="50%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#dbeafe"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.4 18 12.4 26 4.4 21.4 13.4 31 16 21.4 18.6 26 27.6 18 19.6 16 29.6 14 19.6 6 27.6 10.6 18.6 1 16 10.6 13.4 6 4.4 14 12.4Z" fill="url(#gsb_${id})"/>
                <path d="M16 6.4 17.4 13.4 22.6 8.4 20 14.6 26 16 20 17.4 22.6 23.6 17.4 18.6 16 25.6 14.6 18.6 9.4 23.6 12 17.4 6 16 12 14.6 9.4 8.4 14.6 13.4Z" fill="#60a5fa" opacity="0.55"/>
                <circle cx="16" cy="16" r="2.2" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1" fill="#93c5fd"/>
            </svg>
        `
        },
        {
            "id": "grad-sapphire-dot",
            "name": "Sapphire Micro Dot",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.2,
            "maxScale": 0.4,
            "minOpacity": 0.3,
            "maxOpacity": 0.5,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="gsd_${id}" cx="38%" cy="32%" r="70%">
                        <stop stop-color="#dbeafe"/><stop offset="0.5" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e3a8a"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="6.5" fill="url(#gsd_${id})"/>
                <ellipse cx="14" cy="13.4" rx="1.8" ry="2.2" fill="#ffffff" opacity="0.85" transform="rotate(-30 14 13.4)"/>
            </svg>
        `
        },
        {
            "id": "grad-constellation",
            "name": "Academic Constellation",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.44,
            "maxScale": 0.74,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="gcn_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#60a5fa" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M7 23 13 11l7 5 5-8" stroke="#93c5fd" stroke-width="0.9" stroke-dasharray="1.6 1.6" fill="none" opacity="0.8"/>
                <circle cx="7" cy="23" r="2.6" fill="url(#gcn_${id})"/>
                <circle cx="7" cy="23" r="1.4" fill="#ffffff"/>
                <circle cx="13" cy="11" r="2.6" fill="url(#gcn_${id})"/>
                <circle cx="13" cy="11" r="1.4" fill="#facc15"/>
                <circle cx="20" cy="16" r="2.8" fill="url(#gcn_${id})"/>
                <circle cx="20" cy="16" r="1.6" fill="#60a5fa"/>
                <circle cx="25" cy="8" r="2.4" fill="url(#gcn_${id})"/>
                <circle cx="25" cy="8" r="1.3" fill="#ffffff"/>
            </svg>
        `
        }
    ],
    "custom": [
        {
            "id": "custom-celestial-star",
            "name": "Prismatic Celestial Star",
            "tier": "mid",
            "material": "star",
            "rarity": "common",
            "minScale": 0.46,
            "maxScale": 0.78,
            "minOpacity": 0.44,
            "maxOpacity": 0.7,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ccs_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fef3c7"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.4c1.2 8.8 4.2 11.8 13 13-8.8 1.2-11.8 4.2-13 13-1.2-8.8-4.2-11.8-13-13 8.8-1.2 11.8-4.2 13-13Z" fill="url(#ccs_${id})"/>
                <path d="M16 6.4c0.8 6 2.8 8 8.8 8.8-6 0.8-8 2.8-8.8 8.8-0.8-6-2.8-8-8.8-8.8 6-0.8 8-2.8 8.8-8.8Z" fill="#ffffff" opacity="0.85"/>
                <circle cx="16" cy="16" r="2" fill="#fde68a"/>
                <circle cx="16" cy="16" r="0.8" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "custom-diamond-spark",
            "name": "Pure Diamond Spark",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.55,
            "minOpacity": 0.34,
            "maxOpacity": 0.58,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cds_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#bae6fd" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.6 18.4 13.6 29.4 16 18.4 18.4 16 29.4 13.6 18.4 2.6 16 13.6 13.6Z" fill="url(#cds_${id})"/>
                <path d="M16 6 17.4 14.6 26 16 17.4 17.4 16 26 14.6 17.4 6 16 14.6 14.6Z" fill="#ffffff" opacity="0.9"/>
                <circle cx="16" cy="16" r="1.6" fill="#dbeafe"/>
            </svg>
        `
        },
        {
            "id": "custom-gold-fleck",
            "name": "Celebration Gold Fleck",
            "tier": "far",
            "material": "confetti",
            "rarity": "common",
            "minScale": 0.3,
            "maxScale": 0.56,
            "minOpacity": 0.32,
            "maxOpacity": 0.56,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cgf_${id}" x1="7" y1="7" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fef3c7"/><stop offset="0.5" stop-color="#f4c95d"/><stop offset="1" stop-color="#92400e"/>
                    </linearGradient>
                </defs>
                <path d="M7 13 22 7l3 10-10 8-8-6Z" fill="url(#cgf_${id})"/>
                <path d="m11 12 9 7" stroke="#fff7cc" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>
            </svg>
        `
        },
        {
            "id": "custom-soft-orb",
            "name": "Luminous Aura Orb",
            "tier": "far",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.2,
            "maxScale": 0.38,
            "minOpacity": 0.24,
            "maxOpacity": 0.46,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cso_${id}" cx="38%" cy="32%" r="72%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#ddd6fe"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0.35"/>
                    </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="8" fill="url(#cso_${id})"/>
                <ellipse cx="13.4" cy="13.4" rx="1.8" ry="2.4" fill="#ffffff" opacity="0.9" transform="rotate(-30 13.4 13.4)"/>
            </svg>
        `
        },
        {
            "id": "custom-graceful-petal",
            "name": "Celebration Petal",
            "tier": "mid",
            "material": "petal",
            "rarity": "common",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cgp_${id}" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fce7f3"/><stop offset="0.5" stop-color="#f9a8d4"/><stop offset="1" stop-color="#be185d"/>
                    </linearGradient>
                </defs>
                <path d="M16 3.6c6.2 3.4 8.8 9 5.5 15.3-2.6 5-7.4 7.4-11.4 5-3.7-2.1-4.3-6.9-1.9-11.5C10.8 8.6 13.6 5.2 16 3.6Z" fill="url(#cgp_${id})"/>
                <path d="M15.8 6c0.4 6.4-1.2 13-4.3 17.4" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.55" fill="none"/>
                <ellipse cx="13" cy="9.6" rx="1.4" ry="2.2" fill="#ffffff" opacity="0.35" transform="rotate(-32 13 9.6)"/>
            </svg>
        `
        },
        {
            "id": "custom-orbit-gem",
            "name": "Celebration Orbit Gem",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.46,
            "maxScale": 0.76,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cog_${id}" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#7c3aed"/>
                    </linearGradient>
                </defs>
                <ellipse cx="16" cy="16" rx="12" ry="5.6" transform="rotate(-25 16 16)" stroke="#c4b5fd" stroke-width="0.9" fill="none" opacity="0.85" stroke-dasharray="2.4 2"/>
                <circle cx="26" cy="11" r="2.6" fill="#facc15"/>
                <circle cx="25.4" cy="10.4" r="0.8" fill="#fef9c3"/>
                <circle cx="6" cy="20.4" r="2.2" fill="#f9a8d4"/>
                <circle cx="5.6" cy="20" r="0.6" fill="#fce7f3"/>
                <path d="M16 12.4 20 16 16 20 12 16Z" fill="url(#cog_${id})"/>
                <path d="M16 12.4 20 16 16 16Z" fill="#ffffff" opacity="0.65"/>
                <path d="M16 16 16 20 12 16Z" fill="#7c3aed" opacity="0.5"/>
            </svg>
        `
        },
        {
            "id": "custom-heartlet",
            "name": "Universal Heartlet",
            "tier": "mid",
            "material": "heart",
            "rarity": "uncommon",
            "minScale": 0.46,
            "maxScale": 0.74,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cH_${id}" x1="7" y1="8" x2="26" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fecdd3"/><stop offset="0.5" stop-color="#fda4af"/><stop offset="1" stop-color="#e11d48"/>
                    </linearGradient>
                </defs>
                <path d="M16 27c-0.4 0-10-6.6-10-13 0-3.6 2.8-5.6 5.8-5.6 1.8 0 3 0.8 4.2 2 1.2-1.2 2.4-2 4.2-2 3 0 5.8 2 5.8 5.6 0 6.4-9.6 13-10 13Z" fill="url(#cH_${id})"/>
                <path d="M10 11c-1.2 0.8-1.8 1.8-1.8 3.2" stroke="#ffffff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0.65"/>
                <ellipse cx="21.4" cy="11.4" rx="1" ry="1.4" fill="#ffffff" opacity="0.4" transform="rotate(-30 21.4 11.4)"/>
            </svg>
        `
        },
        {
            "id": "custom-comet",
            "name": "Celebration Comet",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ccm_${id}" x1="4" y1="28" x2="27" y2="6" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#c4b5fd" stop-opacity="0"/><stop offset="0.5" stop-color="#c4b5fd"/><stop offset="1" stop-color="#ffffff"/>
                    </linearGradient>
                    <radialGradient id="ccm_h_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#e0e7ff"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M5 26C10 18 17 12 26 6" stroke="url(#ccm_${id})" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <circle cx="26" cy="6" r="5" fill="url(#ccm_h_${id})"/>
                <circle cx="26" cy="6" r="2.8" fill="#ffffff"/>
                <circle cx="18" cy="13" r="1.6" fill="#fde68a"/>
                <circle cx="10" cy="20" r="1.2" fill="#f9a8d4"/>
                <circle cx="6" cy="25" r="0.9" fill="#c4b5fd" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "custom-ribbon",
            "name": "Celebration Ribbon",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.76,
            "maxScale": 1.12,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 36 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="crb_${id}" x1="4" y1="4" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#e9d5ff"/><stop offset="0.5" stop-color="#a855f7"/><stop offset="1" stop-color="#6d28d9"/>
                    </linearGradient>
                </defs>
                <path d="M5 6c9 1 15.6 4.6 15 9.6-0.6 4.4-8.6 3.4-8.6 7.2 0 3 3.8 5.4 15.6 5.2" stroke="url(#crb_${id})" stroke-width="2.4" stroke-linecap="round" fill="none"/>
                <path d="M5 6c7 0.8 12.4 3.4 14.4 6.8" stroke="#f5d0fe" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.8"/>
                <path d="M27 28h4.4M27.4 28l-1.6 3M29.2 28l0.2 3M31 28l1 3" stroke="#fde68a" stroke-width="1" stroke-linecap="round"/>
                <circle cx="27.2" cy="28" r="0.9" fill="#facc15"/>
            </svg>
        `
        },
        {
            "id": "custom-crystal",
            "name": "Faceted Celebration Crystal",
            "tier": "near",
            "material": "sparkle",
            "rarity": "rare",
            "minScale": 0.72,
            "maxScale": 1.08,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 34 38" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ccr_t_${id}" x1="7" y1="4" x2="27" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#ddd6fe"/>
                    </linearGradient>
                    <linearGradient id="ccr_b_${id}" x1="7" y1="17" x2="27" y2="31" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#a78bfa"/><stop offset="1" stop-color="#5b21b6"/>
                    </linearGradient>
                </defs>
                <path d="m17 3.4 10 9.6-4 17H11L7 13Z" fill="url(#ccr_t_${id})"/>
                <path d="m7 13 10 4 10-4-4 17H11Z" fill="url(#ccr_b_${id})" opacity="0.9"/>
                <path d="M17 3.4 17 17M7 13h20M11 30h12M11 30 7 13M23 30l4-17M17 17l-6 13M17 17l6 13" stroke="#ffffff" stroke-width="0.7" opacity="0.75" fill="none"/>
                <path d="M13.4 7.4 17 10.4 20.6 7.4" stroke="#ffffff" stroke-width="0.7" fill="none" opacity="0.9"/>
                <path d="M27.6 3.4 28.1 4.9 29.6 5.4 28.1 5.9 27.6 7.4 27.1 5.9 25.6 5.4 27.1 4.9Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "custom-geometric-gem",
            "name": "Faceted Celebration Gem",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.44,
            "maxOpacity": 0.72,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cgg_t_${id}" x1="7" y1="5" x2="25" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#d8b4fe"/>
                    </linearGradient>
                    <linearGradient id="cgg_b_${id}" x1="7" y1="13" x2="25" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#a855f7"/><stop offset="1" stop-color="#4c1d95"/>
                    </linearGradient>
                </defs>
                <path d="m7 11 9-6 9 6-4 14-5 4-5-4Z" fill="url(#cgg_t_${id})"/>
                <path d="M7 11h18l-4 14H11Z" fill="url(#cgg_b_${id})" opacity="0.9"/>
                <path d="M16 5v6M7 11 16 17M25 11 16 17M16 17v12M11 25 7 11M21 25l4-14" stroke="#ffffff" stroke-width="0.75" opacity="0.75" fill="none"/>
                <path d="M12.4 8.2 16 10.6 19.6 8.2" stroke="#ffffff" stroke-width="0.6" fill="none" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "custom-festive-ribbon",
            "name": "Celebration Streamer",
            "tier": "near",
            "material": "confetti",
            "rarity": "rare",
            "minScale": 0.8,
            "maxScale": 1.16,
            "minOpacity": 0.64,
            "maxOpacity": 0.86,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cfr_${id}" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#c4b5fd"/><stop offset="0.5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/>
                    </linearGradient>
                </defs>
                <path d="M5 7c8 1.2 15 4.5 14.4 9.4-0.5 4-8.4 3.4-9 7.4-0.5 3 3.2 4.4 10.8 4" stroke="url(#cfr_${id})" stroke-width="2.3" stroke-linecap="round" fill="none"/>
                <path d="M5 7c6.4 0.8 11.4 3 13.6 6.2" stroke="#ddd6fe" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.75"/>
                <path d="M24 28h4.4M24.4 28l-1.6 3M26.2 28l0.2 3M28 28l1 3" stroke="#fde68a" stroke-width="1" stroke-linecap="round"/>
                <circle cx="24.2" cy="28" r="0.9" fill="#facc15"/>
            </svg>
        `
        },
        {
            "id": "custom-triumph-star",
            "name": "Triumph Star",
            "tier": "near",
            "material": "star",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cts_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.6" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="m16 2 2.6 10.3L29 16l-10.4 2.7L16 29l-2.6-10.3L3 16l10.4-3.7Z" fill="url(#cts_${id})"/>
                <path d="m16 6.6 1.7 6.8L24.4 16l-6.7 2.6L16 25.4l-1.7-6.8L7.6 16l6.7-2.6Z" fill="#ffffff"/>
                <path d="M16 11.4 17.2 14.8 20.6 16 17.2 17.2 16 20.6 14.8 17.2 11.4 16 14.8 14.8Z" fill="#fcd34d"/>
                <path d="M28.6 4.6 29.2 6.2 30.8 6.8 29.2 7.4 28.6 9 28 7.4 26.4 6.8 28 6.2Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "custom-orbit",
            "name": "Celebration Orbit",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "common",
            "minScale": 0.44,
            "maxScale": 0.72,
            "minOpacity": 0.4,
            "maxOpacity": 0.64,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cor_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <ellipse cx="16" cy="16" rx="11.5" ry="5.6" transform="rotate(-25 16 16)" stroke="#c4b5fd" stroke-width="0.9" fill="none" opacity="0.85" stroke-dasharray="2.2 2"/>
                <circle cx="25.6" cy="11.4" r="2.6" fill="url(#cor_${id})"/>
                <circle cx="25.6" cy="11.4" r="2" fill="#fde68a"/>
                <circle cx="6" cy="20.6" r="2.2" fill="url(#cor_${id})"/>
                <circle cx="6" cy="20.6" r="1.6" fill="#f9a8d4"/>
                <circle cx="16" cy="16" r="1.8" fill="url(#cor_${id})"/>
                <circle cx="16" cy="16" r="1.1" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "custom-lantern",
            "name": "Celebration Lantern",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.1,
            "minOpacity": 0.64,
            "maxOpacity": 0.84,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cLan_${id}" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f0abfc"/><stop offset="0.5" stop-color="#a855f7"/><stop offset="1" stop-color="#5b21b6"/>
                    </linearGradient>
                    <linearGradient id="cLan_t_${id}" x1="8" y1="8" x2="24" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/>
                    </linearGradient>
                </defs>
                <path d="M13.4 5.6h5.2L20 8h-8Z" fill="url(#cLan_t_${id})"/>
                <path d="M10 8h12l2 4.6v10.4H8V12.6Z" fill="url(#cLan_${id})"/>
                <path d="M11 8c0-3 10-3 10 0" stroke="#fde68a" stroke-width="0.8" fill="none"/>
                <path d="M12 13v6M16 13v6M20 13v6" stroke="#ffffff" stroke-width="0.7" opacity="0.55"/>
                <path d="M8 12.6h16M8 23h16" stroke="#fde68a" stroke-width="0.5" opacity="0.7"/>
                <path d="M11 23v3M16 23v3M21 23v3" stroke="#fde68a" stroke-width="0.6" stroke-linecap="round"/>
                <circle cx="16" cy="11.4" r="0.8" fill="#ffffff" opacity="0.9"/>
                <path d="M25.6 4.6 26.1 6.1 27.6 6.6 26.1 7.1 25.6 8.6 25.1 7.1 23.6 6.6 25.1 6.1Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        },
        {
            "id": "custom-balloon",
            "name": "Celebration Balloon",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.78,
            "maxScale": 1.14,
            "minOpacity": 0.68,
            "maxOpacity": 0.9,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cbal_${id}" cx="36%" cy="30%" r="76%">
                        <stop stop-color="#ffffff"/><stop offset="0.4" stop-color="#c4b5fd"/><stop offset="0.85" stop-color="#7c3aed"/><stop offset="1" stop-color="#4c1d95"/>
                    </radialGradient>
                </defs>
                <path d="M16 3.4c-5 0-8.8 4-8.8 9.4 0 5.4 3.4 10.2 8.8 12.6 5.4-2.4 8.8-7.2 8.8-12.6 0-5.4-3.8-9.4-8.8-9.4Z" fill="url(#cbal_${id})"/>
                <ellipse cx="11.6" cy="9.4" rx="2.2" ry="3.4" fill="#ffffff" opacity="0.55" transform="rotate(-22 11.6 9.4)"/>
                <circle cx="21.6" cy="8.4" r="0.9" fill="#ffffff" opacity="0.75"/>
                <path d="M14 25 16 27.6 18 25Z" fill="#4c1d95"/>
                <path d="M16 27.6c1.4 1.6 1.4 3 0 4.4" stroke="#cbd5e1" stroke-width="0.85" stroke-linecap="round" fill="none"/>
            </svg>
        `
        },
        {
            "id": "custom-gift",
            "name": "Celebration Gift Box",
            "tier": "mid",
            "material": "confetti",
            "rarity": "uncommon",
            "minScale": 0.56,
            "maxScale": 0.9,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="cgft_b_${id}" x1="4" y1="13" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#e9d5ff"/><stop offset="0.5" stop-color="#a78bfa"/><stop offset="1" stop-color="#5b21b6"/>
                    </linearGradient>
                    <linearGradient id="cgft_l_${id}" x1="3" y1="10" x2="29" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#8b5cf6"/><stop offset="1" stop-color="#4c1d95"/>
                    </linearGradient>
                </defs>
                <rect x="5" y="14" width="22" height="14" rx="1.6" fill="url(#cgft_b_${id})"/>
                <rect x="3.6" y="11" width="24.8" height="4.6" rx="1.2" fill="url(#cgft_l_${id})"/>
                <rect x="14.6" y="11" width="2.8" height="17" fill="#fde68a"/>
                <rect x="14.6" y="11" width="2.8" height="17" fill="#ffffff" opacity="0.18"/>
                <path d="M16 11c-2.6-2.6-5-3-5.4-1.2-0.4 1.6 2.2 2 5.4 1.2Z" fill="#fde68a"/>
                <path d="M16 11c2.6-2.6 5-3 5.4-1.2 0.4 1.6-2.2 2-5.4 1.2Z" fill="#fde68a"/>
                <circle cx="16" cy="10.8" r="1.3" fill="#d97706"/>
                <circle cx="9" cy="18.4" r="0.6" fill="#ffffff" opacity="0.65"/>
                <circle cx="23" cy="18.4" r="0.6" fill="#ffffff" opacity="0.65"/>
                <circle cx="9" cy="24" r="0.6" fill="#ffffff" opacity="0.65"/>
                <circle cx="23" cy="24" r="0.6" fill="#ffffff" opacity="0.65"/>
            </svg>
        `
        },
        {
            "id": "custom-flower",
            "name": "Celebration Flower",
            "tier": "mid",
            "material": "petal",
            "rarity": "uncommon",
            "minScale": 0.52,
            "maxScale": 0.84,
            "minOpacity": 0.5,
            "maxOpacity": 0.76,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cfl_p_${id}" cx="50%" cy="45%" r="65%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fbcfe8"/><stop offset="1" stop-color="#ec4899" stop-opacity="0.85"/>
                    </radialGradient>
                </defs>
                <g fill="url(#cfl_p_${id})">
                    <ellipse cx="16" cy="7" rx="4.2" ry="5.8"/>
                    <ellipse cx="23" cy="12.6" rx="4.2" ry="5.8" transform="rotate(72 23 12.6)"/>
                    <ellipse cx="20.4" cy="21" rx="4.2" ry="5.8" transform="rotate(144 20.4 21)"/>
                    <ellipse cx="11.6" cy="21" rx="4.2" ry="5.8" transform="rotate(216 11.6 21)"/>
                    <ellipse cx="9" cy="12.6" rx="4.2" ry="5.8" transform="rotate(288 9 12.6)"/>
                </g>
                <g fill="#fce7f3" opacity="0.55">
                    <ellipse cx="16" cy="7" rx="1.4" ry="3.2"/>
                    <ellipse cx="23" cy="12.6" rx="1.4" ry="3.2" transform="rotate(72 23 12.6)"/>
                    <ellipse cx="20.4" cy="21" rx="1.4" ry="3.2" transform="rotate(144 20.4 21)"/>
                    <ellipse cx="11.6" cy="21" rx="1.4" ry="3.2" transform="rotate(216 11.6 21)"/>
                    <ellipse cx="9" cy="12.6" rx="1.4" ry="3.2" transform="rotate(288 9 12.6)"/>
                </g>
                <circle cx="16" cy="15.4" r="3.4" fill="#fbbf24"/>
                <circle cx="15.2" cy="14.6" r="0.9" fill="#ffffff"/>
            </svg>
        `
        },
        {
            "id": "custom-burst",
            "name": "Celebration Burst",
            "tier": "mid",
            "material": "sparkle",
            "rarity": "uncommon",
            "minScale": 0.5,
            "maxScale": 0.8,
            "minOpacity": 0.46,
            "maxOpacity": 0.74,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cbu_${id}" cx="50%" cy="50%" r="55%">
                        <stop stop-color="#ffffff"/><stop offset="0.5" stop-color="#fce7f3"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <path d="M16 2.4v9M16 20.6v9M2.4 16h9M20.6 16h9M6.2 6.2l6.4 6.4M19.4 19.4l6.4 6.4M25.8 6.2l-6.4 6.4M12.6 19.4l-6.4 6.4" stroke="#f472b6" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10.6 10.6 13.4 13.4M18.6 18.6l2.8 2.8M21.4 10.6l-2.8 2.8M13.4 18.6l-2.8 2.8" stroke="#c4b5fd" stroke-width="1.4" stroke-linecap="round" opacity="0.75"/>
                <g fill="#fde68a">
                    <circle cx="16" cy="2.6" r="1"/>
                    <circle cx="16" cy="29.4" r="1"/>
                    <circle cx="2.6" cy="16" r="1"/>
                    <circle cx="29.4" cy="16" r="1"/>
                    <circle cx="6.6" cy="6.6" r="0.9"/>
                    <circle cx="25.4" cy="25.4" r="0.9"/>
                    <circle cx="25.4" cy="6.6" r="0.9"/>
                    <circle cx="6.6" cy="25.4" r="0.9"/>
                </g>
                <circle cx="16" cy="16" r="5.4" fill="url(#cbu_${id})"/>
                <circle cx="16" cy="16" r="3" fill="#ffffff"/>
                <circle cx="16" cy="16" r="1.4" fill="#f472b6"/>
            </svg>
        `
        },
        {
            "id": "custom-bubbles",
            "name": "Celebration Bubbles",
            "tier": "mid",
            "material": "bubble",
            "rarity": "common",
            "minScale": 0.48,
            "maxScale": 0.78,
            "minOpacity": 0.42,
            "maxOpacity": 0.68,
            "svg": (id) => `
            <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="cbub_a_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.6" stop-color="#bae6fd" stop-opacity="0.45"/><stop offset="1" stop-color="#38bdf8" stop-opacity="0.3"/>
                    </radialGradient>
                    <radialGradient id="cbub_b_${id}" cx="35%" cy="30%" r="72%">
                        <stop stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.6" stop-color="#fbcfe8" stop-opacity="0.45"/><stop offset="1" stop-color="#f472b6" stop-opacity="0.3"/>
                    </radialGradient>
                </defs>
                <circle cx="12" cy="13" r="6.4" fill="url(#cbub_a_${id})" stroke="#ffffff" stroke-width="0.7" opacity="0.95"/>
                <ellipse cx="9.6" cy="10.6" rx="1.6" ry="2.2" fill="#ffffff" opacity="0.9" transform="rotate(-30 9.6 10.6)"/>
                <circle cx="21.4" cy="19" r="5.4" fill="url(#cbub_b_${id})" stroke="#ffffff" stroke-width="0.6" opacity="0.95"/>
                <ellipse cx="19.4" cy="17" rx="1.4" ry="1.9" fill="#ffffff" opacity="0.9" transform="rotate(-30 19.4 17)"/>
                <circle cx="23.4" cy="8.4" r="3.4" fill="url(#cbub_a_${id})" stroke="#ffffff" stroke-width="0.5" opacity="0.9"/>
                <ellipse cx="22.4" cy="7.4" rx="0.9" ry="1.2" fill="#ffffff" opacity="0.9" transform="rotate(-30 22.4 7.4)"/>
                <circle cx="8" cy="22.6" r="2.4" fill="url(#cbub_b_${id})" stroke="#ffffff" stroke-width="0.4" opacity="0.85"/>
            </svg>
        `
        },
        {
            "id": "custom-ornament",
            "name": "Celebration Ornament",
            "tier": "near",
            "material": "bubble",
            "rarity": "rare",
            "minScale": 0.74,
            "maxScale": 1.1,
            "minOpacity": 0.66,
            "maxOpacity": 0.88,
            "svg": (id) => `
            <svg viewBox="0 0 32 36" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="corn_${id}" cx="35%" cy="28%" r="76%">
                        <stop stop-color="#fef9c3"/><stop offset="0.4" stop-color="#fbbf24"/><stop offset="0.8" stop-color="#b45309"/><stop offset="1" stop-color="#78350f"/>
                    </radialGradient>
                </defs>
                <path d="M16 2v3.4" stroke="#facc15" stroke-width="1" stroke-linecap="round"/>
                <path d="M14.4 5.4c0-1.4 3.2-1.4 3.2 0" stroke="#facc15" stroke-width="1" fill="none"/>
                <rect x="13.4" y="5.8" width="5.2" height="2.6" rx="0.9" fill="#facc15"/>
                <path d="M13.8 7h4.4" stroke="#7c2d12" stroke-width="0.4" opacity="0.7"/>
                <circle cx="16" cy="20" r="11.6" fill="url(#corn_${id})"/>
                <circle cx="16" cy="20" r="11.6" fill="none" stroke="#78350f" stroke-width="0.5" opacity="0.5"/>
                <path d="M6.4 22.6c6.4 2 12.8 2 19.2 0" stroke="#fef3c7" stroke-width="0.7" fill="none" opacity="0.7"/>
                <path d="M5.6 17c6.4 1.6 14.4 1.6 20.8 0" stroke="#fef3c7" stroke-width="0.7" fill="none" opacity="0.55"/>
                <ellipse cx="11.2" cy="14" rx="2.2" ry="3.4" fill="#ffffff" opacity="0.55" transform="rotate(-30 11.2 14)"/>
                <circle cx="21.6" cy="12.6" r="0.9" fill="#ffffff" opacity="0.75"/>
                <path d="M16 30.6 16 34" stroke="#fcd34d" stroke-width="0.9" stroke-linecap="round"/>
                <path d="M15 34.6 16 35.4 17 34.6" stroke="#fcd34d" stroke-width="0.9" stroke-linecap="round" fill="none"/>
                <path d="M28 3.4 28.5 4.9 30 5.4 28.5 5.9 28 7.4 27.5 5.9 26 5.4 27.5 4.9Z" fill="#ffffff" opacity="0.9"/>
            </svg>
        `
        }
    ]
 }

/* ==========================================================================
   BACKWARD-COMPATIBLE REGISTRY & RESOLUTION
   ========================================================================== */

export const SVG_REGISTRY = {};

for (const [key, list] of Object.entries(OCCASION_PARTICLES)) {
    SVG_REGISTRY[key] = list.map(item => item.svg);
}

export function resolveOccasionKey(stateOrOccasion) {
    if (!stateOrOccasion) return 'valentine';

    let occasionId = '';
    if (typeof stateOrOccasion === 'string') {
        occasionId = stateOrOccasion.toLowerCase().trim();
    } else if (typeof stateOrOccasion === 'object') {
        const candidate = (stateOrOccasion.theme && stateOrOccasion.theme !== 'light' && stateOrOccasion.theme !== 'dark')
            ? stateOrOccasion.theme
            : (stateOrOccasion.activeTheme || stateOrOccasion.occasion || stateOrOccasion.visualTheme || '');
        occasionId = String(candidate).toLowerCase().trim();
    }

    occasionId = occasionId.replace(/^(theme-|occasion-)/, '');

    if (SVG_REGISTRY[occasionId]) return occasionId;

    if (occasionId.includes('valen') || occasionId.includes('heart') || occasionId.includes('rose') || occasionId.includes('cupid')) return 'valentine';
    if (occasionId.includes('birth') || occasionId.includes('bday') || occasionId.includes('party')) return 'birthday';
    if (occasionId.includes('anniv') || occasionId.includes('wedding')) return 'anniversary';
    if (occasionId.includes('grad') || occasionId.includes('diploma')) return 'graduation';
    if (occasionId.includes('xmas') || occasionId.includes('christ') || occasionId.includes('snow')) return 'christmas';
    if (occasionId.includes('year') || occasionId.includes('nye') || occasionId.includes('midnight')) return 'newyear';
    if (occasionId.includes('east') || occasionId.includes('spring') || occasionId.includes('bunny') || occasionId.includes('egg')) return 'easter';

    return 'custom';
}

export function registerParticleSvg(occasion, generatorOrDef) {
    const key = resolveOccasionKey(occasion);
    if (!SVG_REGISTRY[key]) {
        SVG_REGISTRY[key] = [];
        OCCASION_PARTICLES[key] = [];
    }

    if (typeof generatorOrDef === 'function') {
        SVG_REGISTRY[key].push(generatorOrDef);
        OCCASION_PARTICLES[key].push({
            id: `${key}-custom-${Date.now()}`,
            name: 'Custom Particle',
            tier: 'mid',
            material: 'sparkle',
            rarity: 'common',
            minScale: 0.9,
            maxScale: 1.3,
            minOpacity: 0.5,
            maxOpacity: 0.75,
            svg: generatorOrDef
        });
    } else if (generatorOrDef && typeof generatorOrDef.svg === 'function') {
        OCCASION_PARTICLES[key].push(generatorOrDef);
        SVG_REGISTRY[key].push(generatorOrDef.svg);
    }
}

export function getOccasionParticleSvg(stateOrOccasion, forcedVariantIndex) {
    const occasionKey = resolveOccasionKey(stateOrOccasion);
    const particleList = OCCASION_PARTICLES[occasionKey] || OCCASION_PARTICLES.valentine;
    const count = particleList.length;

    let variantIndex = 0;
    if (typeof forcedVariantIndex === 'number' && forcedVariantIndex >= 0 && forcedVariantIndex < count) {
        variantIndex = forcedVariantIndex;
    } else {
        const roll = Math.random();
        let targetRarity = 'common';
        if (roll > 0.90) {
            targetRarity = 'rare';
        } else if (roll > 0.65) {
            targetRarity = 'uncommon';
        }

        const filtered = particleList
            .map((p, idx) => ({ p, idx }))
            .filter(item => item.p.rarity === targetRarity);

        if (filtered.length > 0) {
            const chosen = filtered[Math.floor(Math.random() * filtered.length)];
            variantIndex = chosen.idx;
        } else {
            variantIndex = Math.floor(Math.random() * count);
        }
    }

    const definition = particleList[variantIndex] || particleList[0];
    const id = getNextSvgId();
    const svg = definition.svg(id);

    return {
        svg,
        occasionKey,
        variantIndex,
        definition
    };
}

export function getOccasionVariantCount(occasion) {
    const key = resolveOccasionKey(occasion);
    return (OCCASION_PARTICLES[key] || []).length;
}

export function listSupportedOccasions() {
    return Object.keys(OCCASION_PARTICLES);
}
