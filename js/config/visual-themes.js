/**
 * Romantic Visual & GIF Themes Configuration
 * Curated library of romantic themes, animated SVGs, and GIFs for the personal card.
 */

import { resolveOccasionDefaultVisual, isOccasionDefaultVisual } from './occasions.js';

export const ROMANTIC_VISUAL_THEMES = [
    {
        id: 'valentine-default',
        name: 'Valentine Bear',
        subtitle: 'Sweetheart Mascot',
        badge: 'Occasion',
        icon: '💖',
        categories: ['all', 'romantic', 'animated', 'occasion'],
        thumbnail: './assets/bear-valentine.svg',
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg',
        description: 'Sweetheart bear holding a pulsing glowing ruby heart'
    },
    {
        id: 'birthday-default',
        name: 'Birthday Bear',
        subtitle: 'Party Mascot',
        badge: 'Occasion',
        icon: '🎂',
        categories: ['all', 'animated', 'occasion'],
        thumbnail: './assets/bear-birthday.svg',
        normal: './assets/bear-birthday.svg',
        success: './assets/bear-birthday-success.svg',
        description: 'Joyful birthday bear celebrating with cake, cupcakes, and party cheers'
    },
    {
        id: 'anniversary-default',
        name: 'Anniversary Bear',
        subtitle: 'Golden Mascot',
        badge: 'Occasion',
        icon: '💍',
        categories: ['all', 'romantic', 'animated', 'occasion'],
        thumbnail: './assets/bear-anniversary.svg',
        normal: './assets/bear-anniversary.svg',
        success: './assets/bear-anniversary-success.svg',
        description: 'Romantic anniversary bear celebrating enduring love and golden milestones'
    },
    {
        id: 'graduation-default',
        name: 'Graduation Bear',
        subtitle: 'Cap & Gown Mascot',
        badge: 'Occasion',
        icon: '🎓',
        categories: ['all', 'animated', 'occasion'],
        thumbnail: './assets/bear-graduation.svg',
        normal: './assets/bear-graduation.svg',
        success: './assets/bear-graduation-success.svg',
        description: 'Proud graduate bear in academic cap holding a diploma scroll'
    },
    {
        id: 'christmas-default',
        name: 'Christmas Bear',
        subtitle: 'Holiday Mascot',
        badge: 'Occasion',
        icon: '🎄',
        categories: ['all', 'animated', 'occasion'],
        thumbnail: './assets/bear-christmas.svg',
        normal: './assets/bear-christmas.svg',
        success: './assets/bear-christmas-success.svg',
        description: 'Festive holiday bear wearing a cozy Santa hat amidst winter snow'
    },
    {
        id: 'newyear-default',
        name: 'New Year Bear',
        subtitle: 'Midnight Mascot',
        badge: 'Occasion',
        icon: '🎆',
        categories: ['all', 'animated', 'occasion'],
        thumbnail: './assets/bear-newyear.svg',
        normal: './assets/bear-newyear.svg',
        success: './assets/bear-newyear-success.svg',
        description: 'Dazzling New Year bear toasting with sparklers and midnight cheer'
    },
    {
        id: 'easter-default',
        name: 'Easter Bunny Bear',
        subtitle: 'Spring Mascot',
        badge: 'Occasion',
        icon: '🐰',
        categories: ['all', 'animated', 'occasion'],
        thumbnail: './assets/bear-easter.svg',
        normal: './assets/bear-easter.svg',
        success: './assets/bear-easter-success.svg',
        description: 'Playful bunny-eared bear with colorful spring eggs and blossoms'
    },
    {
        id: 'custom-default',
        name: 'Celebration Bear',
        subtitle: 'Milestone Mascot',
        badge: 'Occasion',
        icon: '✨',
        categories: ['all', 'romantic', 'animated', 'occasion'],
        thumbnail: './assets/bear-valentine.svg',
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg',
        description: 'Versatile celebratory bear honoring your special moments'
    },
    {
        id: 'sweetheart-bear',
        name: 'Sweetheart Teddy',
        subtitle: 'Beating Ruby Heart',
        badge: 'Animated',
        icon: '🧸',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/bear-valentine.svg',
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg',
        description: 'Plush sweetheart bear holding a pulsing glowing ruby heart'
    },
    {
        id: 'cupid-arrow',
        name: "Cupid's Golden Arrow",
        subtitle: 'Love Messenger',
        badge: 'Romantic',
        icon: '🏹',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-cupid.svg',
        normal: './assets/romantic-cupid.svg',
        success: './assets/romantic-cupid-success.svg',
        description: 'Winged Cupid ready to strike with sweet arrows of affection'
    },
    {
        id: 'blooming-rose',
        name: 'Velvet Ruby Rose',
        subtitle: 'Enchanted Blossom',
        badge: 'Floral',
        icon: '🌹',
        categories: ['all', 'floral', 'romantic', 'animated'],
        thumbnail: './assets/romantic-rose.svg',
        normal: './assets/romantic-rose.svg',
        success: './assets/romantic-rose-success.svg',
        description: 'Blooming velvety crimson rose with drifting starlit petals'
    },
    {
        id: 'romantic-bouquet',
        name: 'Sweet Pastel Bouquet',
        subtitle: 'Lush Fresh Petals',
        badge: 'Floral',
        icon: '💐',
        categories: ['all', 'floral', 'romantic', 'animated'],
        thumbnail: './assets/romantic-bouquet.svg',
        normal: './assets/romantic-bouquet.svg',
        success: './assets/romantic-bouquet-success.svg',
        description: 'Handcrafted floral arrangement with blushing peonies and roses'
    },
    {
        id: 'love-letter',
        name: 'Fluttering Love Letter',
        subtitle: 'Wax-Sealed Note',
        badge: 'Keepsake',
        icon: '💌',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-letter.svg',
        normal: './assets/romantic-letter.svg',
        success: './assets/romantic-letter-success.svg',
        description: 'Vintage love mail opening to reveal floating origami hearts'
    },
    {
        id: 'twilight-sunset',
        name: 'Moonlit Twilight Swans',
        subtitle: 'Serenade Lake',
        badge: 'Atmosphere',
        icon: '🦢',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/romantic-sunset.svg',
        normal: './assets/romantic-sunset.svg',
        success: './assets/romantic-sunset-success.svg',
        description: 'Graceful swans forming a glowing heart under starlight'
    },
    {
        id: 'bouncing-hearts',
        name: 'Playful Bouncing Hearts',
        subtitle: 'Cheerful Romance',
        badge: 'GIF',
        icon: '💖',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/img1.gif',
        normal: './assets/img1.gif',
        success: './assets/img3.gif',
        description: 'Bouncy, joyful cartoon hearts full of affectionate energy'
    },
    {
        id: 'heart-hug',
        name: 'Loving Heart Hug',
        subtitle: 'Tender Embrace',
        badge: 'GIF',
        icon: '🤗',
        categories: ['all', 'animated', 'romantic'],
        thumbnail: './assets/img3.gif',
        normal: './assets/img3.gif',
        success: './assets/img3.gif',
        description: 'Warm, cozy embrace celebrating love and shared happiness'
    },
    {
        id: 'golden-anniversary',
        name: 'Golden Milestone',
        subtitle: 'Eternal Rings',
        badge: 'Milestone',
        icon: '💍',
        categories: ['all', 'romantic', 'animated'],
        thumbnail: './assets/bear-anniversary.svg',
        normal: './assets/bear-anniversary.svg',
        success: './assets/bear-anniversary-success.svg',
        description: 'Shimmering intertwined golden rings for timeless celebrations'
    }
];

export const ROMANTIC_VISUAL_MAP = Object.fromEntries(
    ROMANTIC_VISUAL_THEMES.map(theme => [theme.id, theme])
);

// Backward-compatible alias for generic 'default'
ROMANTIC_VISUAL_MAP.default = {
    id: 'default',
    name: 'Occasion Mascot',
    subtitle: 'Auto Holiday Bear',
    badge: 'Occasion',
    icon: '🐻',
    categories: ['all', 'romantic', 'animated', 'occasion'],
    thumbnail: './assets/bear-valentine.svg',
    normal: null,
    success: null,
    description: 'Dynamically matches the selected celebration mascot'
};

/**
 * Resolves the visual asset URLs for normal and success states given the app state.
 * Priority order:
 * 1. Custom Image/GIF URL (if specified in state.customVisualUrl)
 * 2. Selected Visual Theme from Library (resolved to occasion default if 'default' or occasion-default)
 * 3. Fallback to seasonal occasion mascot resolver
 *
 * @param {Object} state - The centralized application state
 * @param {Function} defaultOccasionResolver - Fallback function resolving seasonal bear
 * @returns {{ normal: string, success: string, isCustom: boolean, theme: Object }}
 */
export function resolveVisualAssetsForState(state, defaultOccasionResolver) {
    // 1. Custom Image/GIF URL
    if (state && state.customVisualUrl && state.customVisualUrl.trim()) {
        const cleanUrl = state.customVisualUrl.trim();
        return {
            normal: cleanUrl,
            success: cleanUrl,
            isCustom: true,
            theme: {
                id: 'custom-url',
                name: 'Custom Image/GIF',
                icon: '🖼️'
            }
        };
    }

    // 2. Resolve target theme ID
    let themeId = state ? state.visualTheme : '';
    if (!themeId || themeId === 'default') {
        themeId = resolveOccasionDefaultVisual(state ? state.occasion : '', state ? state.customEvent : '');
    }

    if (themeId && ROMANTIC_VISUAL_MAP[themeId]) {
        const theme = ROMANTIC_VISUAL_MAP[themeId];
        const isOccDefault = isOccasionDefaultVisual(themeId, state ? state.occasion : '', state ? state.customEvent : '');
        const normalAsset = theme.normal || theme.thumbnail;
        const successAsset = theme.success || theme.normal || theme.thumbnail;

        return {
            normal: normalAsset,
            success: successAsset,
            isCustom: !isOccDefault,
            theme
        };
    }

    // 3. Fallback to Occasion Default
    const defaultAssets = defaultOccasionResolver ? defaultOccasionResolver(state) : {
        normal: './assets/bear-valentine.svg',
        success: './assets/bear-valentine-success.svg'
    };

    const fallbackOccDefaultId = resolveOccasionDefaultVisual(state ? state.occasion : '', state ? state.customEvent : '');
    const defTheme = ROMANTIC_VISUAL_MAP[fallbackOccDefaultId] || ROMANTIC_VISUAL_MAP['valentine-default'];

    return {
        normal: defaultAssets.normal,
        success: defaultAssets.success,
        isCustom: false,
        theme: defTheme
    };
}

