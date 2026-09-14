/**
 * ==============================================================================
 * Seasonal Celebration Card — Interactive Frontend Logic
 * ==============================================================================
 * Features:
 * - Dynamic Date-based seasonal heading & theme auto-detection:
 *   • Before Sep 22: 'Happy Birthday!'
 *   • Sep 22 – Dec 25: 'Merry Christmas!'
 *   • Dec 25 – Jan 1: 'Happy New Year!'
 *   • Otherwise: 'Will you be my Valentine?'
 * - Animated seasonal jumping bears (SVG / GIF) matching each celebration
 * - Cursor-dodging 'Deny' button with safe 50px viewport boundaries
 * - Simultaneously scaling 'Accept' button by 1.2x on each dodge attempt
 * - Celebratory success state with canvas-confetti and jumping victory bear
 * - Real-time upward floating seasonal emojis (cakes, trees, fireworks, hearts)
 * - Interactive seasonal switcher pills for instant manual preview & testing
 * - Web Audio API cheerful acoustic chimes (zero external audio dependencies)
 * ==============================================================================
 */

// --------------------------------------------------------------------------
// 1. Seasonal Configurations & Theming
// --------------------------------------------------------------------------
const SEASONS = {
    birthday: {
        id: 'birthday',
        name: 'Birthday',
        themeClass: 'theme-birthday',
        heading: 'Happy Birthday',
        subMessage: 'Today is entirely about celebrating the most incredible person I know. Wishing you a day overflowing with sweet moments, endless laughter, and a love that grows exponentially. You deserve the entire universe and more! 🎂✨💖🥺',
        badge: '🎂 Special Day',
        bearNormal: './assets/bear-birthday.svg',
        bearSuccess: './assets/bear-birthday-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '🎂',
        denyText: 'Deny',
        denyEmoji: '🙈',
        denyPhrases: [
            "Deny", 
            "Are you seriously clicking this? 🥺", 
            "But I made this just for you! 🥺❤️", 
            "My heart is breaking a little 💔", 
            "Error: Your finger must have slipped! 🙈", 
            "Still trying? You're too cute! 🥰", 
            "The math says you must click Accept! 📈", 
            "Just surrender to the birthday love! 🎂", 
            "Click Accept for infinite hugs! 🧸💖"
        ],
        successHeading: 'Yaaay! Happy Birthday',
        successSubtext: 'My greatest wish is to see you smiling every single day. May this new chapter bring you closer to all your dreams, and I promise to be right here cheering you on through every beautiful moment. I love you endlessly! ✨💖🦋',
        celebrationBadge: '🎉 BEST BIRTHDAY EVER! 🎂',
        particleType: 'up',
        floatingEmojis: ['🎂', '🎈', '🍰', '🎁', '🎉', '✨', '🧁', '🥳', '💖', '🍭'],
        confettiColors: ['#ff758c', '#ffd166', '#ffb199', '#fbc2eb', '#06d6a0', '#ffffff']
    },
    christmas: {
        id: 'christmas',
        name: 'Christmas',
        themeClass: 'theme-christmas',
        heading: 'Merry Christmas, my love! 🎄❤️✨',
        subMessage: 'The holidays are magical, but absolutely nothing compares to the warmth and light you bring into my life every single day. Sending you the coziest winter vibes and all my love! 🎄❄️🥰☕',
        badge: '🎄 Holiday Magic',
        bearNormal: './assets/bear-christmas.svg',
        bearSuccess: './assets/bear-christmas-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '🎁',
        denyText: 'Deny',
        denyEmoji: '⛄',
        denyPhrases: [
            "Deny", 
            "Wait, are you sure? 🎄🥺", 
            "Santa is literally watching us 🎅", 
            "Don't break my heart this Christmas! 💔", 
            "Too slow for the mistletoe! ❄️💋", 
            "Cozy hugs are waiting for you over here! 👉", 
            "Slippery like ice! ⛸️", 
            "Just take my gift! 🎁", 
            "Holiday kisses await! ✨🥰"
        ],
        successHeading: 'Merry Christmas, my beautiful angel! 🎄🎅✨❤️',
        successSubtext: 'You are the absolute best gift I could ever ask for. May our holiday season be wrapped in warmth, sweet kisses, and cozy memories that we will cherish forever. Let\'s make this unforgettable! 🎁🍪💏',
        celebrationBadge: '🎄 MERRY & BRIGHT! 🎅',
        particleType: 'snow',
        floatingEmojis: ['❄️', '❅', '❆', '✻', '✨', '❤️', '🎁'],
        confettiColors: ['#d90429', '#2b9348', '#ffd166', '#ffffff', '#ef233c', '#55a630']
    },
    newyear: {
        id: 'newyear',
        name: 'New Year',
        themeClass: 'theme-newyear',
        heading: 'Happy New Yea',
        subMessage: 'As the year comes to a close, I am incredibly grateful that I get to walk into this brand-new chapter holding your hand. Cheers to our beautiful future together! 🎆🥂✨🥺',
        badge: '🎆 2026 Celebration',
        bearNormal: './assets/bear-newyear.svg',
        bearSuccess: './assets/bear-newyear-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '✨',
        denyText: 'Deny',
        denyEmoji: '🎇',
        denyPhrases: [
            "Deny", 
            "Are you sure? 🎆🥺", 
            "Don't ruin our midnight countdown! ⏳❤️", 
            "Think again, my love! 👀", 
            "Too slow! ⚡", 
            "Midnight toast over here! 👉🥂", 
            "We are going into 2026 together! 🛸", 
            "Say yes to us! 🌟", 
            "Our magic awaits! 💫🥰"
        ],
        successHeading: 'Cheers to us and an amazing 2026! 🎆🥂✨🥰',
        successSubtext: 'Here is to 365 new chances to shine, laugh, and write the next beautiful pages of our love story. There is no one else I would rather build a future with. I love you more than words can say! 🥳🌟💖🥂',
        celebrationBadge: '🎆 CHEERS TO US! 🥂',
        particleType: 'spark',
        floatingEmojis: ['✨', '🌟', '💫', '⭐', '🎇', '🥂', '💖', '🥰'],
        confettiColors: ['#ffd166', '#00f5d4', '#f72585', '#7209b7', '#ffffff', '#4cc9f0']
    },
    valentine: {
        id: 'valentine',
        name: 'Valentine',
        themeClass: 'theme-valentine',
        heading: 'will you be my Valentine? 🥺🌹💖',
        subMessage: 'Every single variable in my life changed for the better the moment I met you. Statistically and undeniably, you are my perfect match. Will you do me the absolute honor? 💌🦋🥺❤️',
        badge: '💖 Special Question',
        bearNormal: './assets/bear-valentine.svg',
        bearSuccess: './assets/bear-valentine-success.svg',
        acceptText: 'Accept',
        acceptEmoji: '💖',
        denyText: 'Deny',
        denyEmoji: '🥺',
        denyPhrases: [
            "Deny", 
            "Wait, seriously? 🥺", 
            "Recalculate that! 📊💔", 
            "Probability of clicking this: 0% 🛑", 
            "The limit does not exist! 📉", 
            "Graphing your hesitation... 🤔", 
            "Coordinate geometry says no! 🛸", 
            "Just optimize for Accept! 👉", 
            "Q.E.D. Just click Yes already! 🥰💋"
        ],
        successHeading: 'Hypothesis Confirmed! You said YES! 💖🌹🥰💍',
        successSubtext: 'My heart just skipped a beat! You are my absolute favorite person in the entire universe. Happy Valentine\'s Day! Let\'s keep optimizing our love forever and ever! ✨🥰🧸💘',
        celebrationBadge: '🎉 100% PROBABILITY OF HAPPINESS! 💖',
        particleType: 'up',
        floatingEmojis: ['💖', '❤️', '💘', '🌹', '💕', '💌', '💝', '🥰', '✨', '🌸', '🦋'],
        confettiColors: ['#ff2e63', '#ff6b8b', '#ff9a9e', '#fbc2eb', '#ffffff', '#ffd166']
    }
};

// --------------------------------------------------------------------------
// 1b. Seasonal Wishes & Reasons Collections
// --------------------------------------------------------------------------
const WISH_DATA = {
    valentine: {
        title: "Reasons Why I Love You 💖",
        tagPrefix: "Reason",
        pillLabel: "Tap for a reason 💌",
        items: [
            "The way your eyes crinkle with pure joy when you genuinely laugh.",
            "How you make even the simplest grocery trip feel like our favorite adventure.",
            "Your unwavering kindness and empathy toward everyone you meet.",
            "The warm, calming safety I feel every time you hold my hand.",
            "The silly songs and inside jokes that only make sense to the two of us.",
            "How passionate you get whenever you talk about things you love.",
            "Your sweet good morning texts that brighten my entire day before it even starts.",
            "The way you remember small details about me that I thought nobody noticed.",
            "How beautiful you look when you wake up, completely effortless and radiant.",
            "You are both my best friend and the love of my life all in one.",
            "Your endless patience, understanding, and generous heart.",
            "The comfort of sharing silent, cozy moments with you and feeling completely at home.",
            "The cute little happy dance you do when good food arrives.",
            "How you inspire me to be a better, gentler, and braver version of myself.",
            "Your infectious smile that immediately melts away even my most stressful days.",
            "The way we can communicate an entire story across a crowded room with just one look.",
            "Your warm hugs that make the rest of the noisy world disappear.",
            "The way you believe in my dreams even when I struggle to believe in them myself.",
            "Every single tomorrow feels exciting and full of promise because you're in it.",
            "Quite simply: you are my favorite human in the entire universe, forever and always."
        ]
    },
    birthday: {
        title: "Birthday Wishes & Sweet Compliments 🎂",
        tagPrefix: "Birthday Wish",
        pillLabel: "Tap for a wish 💌",
        items: [
            "May your year ahead be as radiant, joyful, and limitless as your smile!",
            "Wishing you uncontainable laughter, unexpected miracles, and all your biggest goals coming true!",
            "You have this rare gift of bringing effortless sunshine into every room you enter.",
            "May today remind you just how deeply loved, appreciated, and cherished you are!",
            "Here's to 365 new days of unforgettable memories, delicious food, and thrilling adventures!",
            "The world became an infinitely sweeter, brighter place the day you were born.",
            "May every single candle on your cake grant you your truest, deepest heart's desire!",
            "Wishing you peace of mind, fierce confidence, and boundless opportunities this year!",
            "You deserve all the cake, all the hugs, and all the happiness this planet has to offer.",
            "Never stop shining your unique light—you inspire everyone lucky enough to know you.",
            "May this new chapter overflow with prosperity, genuine health, and soul-deep happiness!",
            "Happy Birthday to someone who makes life infinitely more fun, colorful, and meaningful!",
            "May you be surrounded today by the people, food, and music that bring you pure bliss.",
            "Another year wiser, more wonderful, and even more breathtakingly magnificent!",
            "May all your hard work pay off in the most spectacular and rewarding ways this year!",
            "Wishing you sweet surprises, cozy evenings, and love that never wavers!",
            "May your heart be lighter than air and your smile wider than the sky today!",
            "Here's to celebrating YOU—the kindest, funniest, and most extraordinary soul I know!"
        ]
    },
    christmas: {
        title: "Holiday Cheer & Cozy Wishes 🎄",
        tagPrefix: "Holiday Wish",
        pillLabel: "Holiday Wish 🎁",
        items: [
            "May your holidays be wrapped in warmth, sweet cocoa kisses, and fireside peace.",
            "Of all the holiday lights twinkling this season, you will always be the brightest one to me.",
            "Wishing you cozy sweater weather, endless holiday treats, and quiet moments of pure contentment.",
            "You are the absolute greatest gift I could ever unwrap, year after year.",
            "May the magic of Christmas fill every corner of your heart and home with joy.",
            "Wishing you laughter around the table, snow softly falling, and all the comfort in the world.",
            "Being with you turns any ordinary day into a storybook holiday wonderland.",
            "May your season be free of stress and abundant in warm memories with those you cherish.",
            "Here's to warm gingerbread, nostalgic songs, and endless holiday cuddles with you.",
            "May the gentle peace of Christmas remain with you all through the coming winter months."
        ]
    },
    newyear: {
        title: "New Year Hopes & Toast Wishes 🎆",
        tagPrefix: "New Year Toast",
        pillLabel: "New Year Toast 🥂",
        items: [
            "Cheers to 365 fresh chances to laugh louder, dream bolder, and love deeper!",
            "May 2026 bring you career breakthroughs, breathtaking travels, and continuous peace.",
            "Stepping into another year with you is the greatest privilege and joy I know.",
            "May every door you knock on open wide, and every seed you plant blossom gracefully.",
            "Here's to leaving behind old doubts and stepping boldly into your greatest chapter yet!",
            "May our midnight dreams turn into our everyday reality all year long.",
            "Wishing you robust health, unstoppable resilience, and pure serenity every single day.",
            "To new horizons, late-night conversations, and making every second count together!",
            "May your courage be stronger than any obstacle and your happiness be contagious.",
            "Cheers to writing our most beautiful, joyful, and victorious love story yet in 2026!"
        ]
    }
};

/**
 * Generates personalized headings based on URL recipient parameter (?to=Lucie or ?name=...)
 */
function getPersonalizedHeading(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].heading;
    switch (seasonKey) {
        case 'birthday':
            return `Happy Birthday, ${name}!`;
        case 'christmas':
            return `Merry Christmas, ${name}!`;
        case 'newyear':
            return `Happy New Year, ${name}!`;
        case 'valentine':
            return `${name}, will you be my Valentine?`;
        default:
            return `${name}, will you be my Valentine?`;
    }
}

function getPersonalizedSubMessage(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].subMessage;
    switch (seasonKey) {
        case 'birthday':
            return `Wishing you a magical day filled with sweet moments, huge smiles, and unlimited cake, ${name}! 🎂✨`;
        case 'christmas':
            return `Sending you cozy winter vibes, warm cocoa hugs, and holiday cheer, ${name}! 🎄❄️`;
        case 'newyear':
            return `Cheers to brand-new adventures, sparkling dreams, and an unforgettable 2026, ${name}! 🎆🥂`;
        case 'valentine':
            return `My heart has been waiting to ask you this all year long, ${name}... 💌`;
        default:
            return SEASONS[seasonKey].subMessage;
    }
}

function getPersonalizedSuccessHeading(seasonKey, name) {
    if (!name) return SEASONS[seasonKey].successHeading;
    switch (seasonKey) {
        case 'birthday':
            return `Yaaay, ${name}! Happy Birthday! 🎂🎉🥳`;
        case 'christmas':
            return `Merry Christmas, ${name}! 🎄🎅✨`;
        case 'newyear':
            return `Cheers to 2026, ${name}! 🎆🥂✨`;
        case 'valentine':
            return `Yaaay, ${name}! You said YES! 💖🌹`;
        default:
            return SEASONS[seasonKey].successHeading;
    }
}

/**
 * Determines seasonal identifier strictly based on date requirements:
 * - If before September 22 of the current year: 'Happy Birthday!' ('birthday')
 * - If between September 22 and December 25: 'Merry Christmas!' ('christmas')
 * - If between December 25 and January 1: 'Happy New Year!' ('newyear')
 * - Otherwise: 'Will you be my Valentine?' ('valentine')
 */
function getSeasonKeyByDate(date = new Date()) {
    const month = date.getMonth(); // 0-indexed: 0 = Jan, 8 = Sep, 11 = Dec
    const day = date.getDate();

    // 1. Between December 25 and January 1 -> Happy New Year!
    const isNewYear = (month === 11 && day >= 25) || (month === 0 && day <= 1);
    if (isNewYear) {
        return 'newyear';
    }

    // 2. Between September 22 and December 25 -> Merry Christmas!
    const isChristmas = (month === 8 && day >= 22) || (month > 8 && month < 11) || (month === 11 && day < 25);
    if (isChristmas) {
        return 'christmas';
    }

    // 3. Valentine window (January 2 through end of February / early spring) -> "Otherwise"
    const isValentinePeriod = (month === 0 && day > 1) || (month === 1);
    if (isValentinePeriod) {
        return 'valentine';
    }

    // 4. Before September 22 of the current year -> Happy Birthday!
    const isBeforeSep22 = (month < 8) || (month === 8 && day < 22);
    if (isBeforeSep22) {
        return 'birthday';
    }

    // Default "Otherwise" fallback
    return 'valentine';
}

/**
 * Public helper function to return the heading string for any given Date.
 */
function determineHeadingByDate(date = new Date()) {
    const seasonKey = getSeasonKeyByDate(date);
    return SEASONS[seasonKey].heading;
}

// Expose globally for testing/inspection
window.determineHeadingByDate = determineHeadingByDate;
window.getSeasonKeyByDate = getSeasonKeyByDate;
window.SEASONS = SEASONS;

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 2. DOM Elements & State
    // --------------------------------------------------------------------------
    const acceptBtn = document.getElementById('accept-btn') || document.getElementById('yes-btn');
    const denyBtn = document.getElementById('deny-btn') || document.getElementById('no-btn');
    const buttonGroup = document.getElementById('button-group');
    const contentHeader = document.getElementById('content-header');
    const questionText = document.getElementById('question-text');
    const subMessage = document.getElementById('sub-message');
    const successContainer = document.getElementById('success-container');
    const visualContainer = document.getElementById('visual-container');
    const mainGif = document.getElementById('main-gif');
    const cardBadge = document.getElementById('card-badge');
    const badgeText = document.getElementById('badge-text');
    const valentineCard = document.getElementById('valentine-card');
    const replayBtn = document.getElementById('replay-btn');
    const floatingHeartsContainer = document.getElementById('floating-hearts-container');
    const fallbackCanvas = document.getElementById('fallback-confetti-canvas');

    // Preloader Elements
    const preloader = document.getElementById('app-preloader');
    const preloaderBarFill = document.getElementById('preloader-bar-fill');
    const preloaderStatus = document.getElementById('preloader-status');
    const preloaderBadgeText = document.getElementById('preloader-badge-text');
    const dropletIcon = document.getElementById('droplet-icon');
    const preloaderSvgImg = document.getElementById('preloader-svg-img');

    // --------------------------------------------------------------------------
    // Centralized Device & Adaptive Performance Engine (Zero Mobile Heating & Freezing)
    // --------------------------------------------------------------------------
    const DeviceManager = {
        isMobile: false,
        isCoarsePointer: false,
        isLowPower: false,
        canTilt: false,
        maxParticles: 2,
        spawnIntervalMs: 3200,

        detect() {
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

            if (this.isMobile) {
                document.body.classList.add('is-mobile', 'mobile-throttled');
                this.maxParticles = 2; // Strict mobile throttle: max 2 active floating particles
                this.spawnIntervalMs = 3200; // Low-frequency spawn to preserve mobile battery
            } else {
                document.body.classList.add('is-desktop');
                this.maxParticles = 8;
                this.spawnIntervalMs = 850;
            }

            // Pause particle spawner when tab is hidden to save mobile battery and avoid background buildup
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (floatingInterval) {
                        clearInterval(floatingInterval);
                        floatingInterval = null;
                    }
                } else if (!isAccepted) {
                    startEmojiSpawner();
                }
            });
        }
    };
    DeviceManager.detect();

    // Birthday Music Elements
    const birthdayAudio = document.getElementById('birthday-audio');
    const musicPlayerPill = document.getElementById('music-player-pill');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicLabel = document.getElementById('music-label');

    // Prime the card for fluid entrance scaling when preloader fades
    if (valentineCard && preloader) {
        valentineCard.classList.add('card-initial-hide');
    }

    const acceptTextSpan = document.getElementById('accept-text');
    const acceptEmojiSpan = document.getElementById('accept-emoji');
    const denyTextSpan = document.getElementById('deny-text');
    const denyEmojiSpan = document.getElementById('deny-emoji');

    // Parse URL parameters for recipient (?to=Lucie or ?name=...), date, and custom note
    const urlParams = new URLSearchParams(window.location.search);
    const rawRecipient = urlParams.get('to') || urlParams.get('name') || urlParams.get('recipient') || localStorage.getItem('celebration_recipient') || '';
    let recipientName = rawRecipient.trim().slice(0, 36);

    const rawCustomMsg = urlParams.get('msg') || urlParams.get('message') || localStorage.getItem('custom_keepsake_msg') || '';
    let customKeepsakeMsg = rawCustomMsg.trim().slice(0, 500);

    const rawCustomDate = urlParams.get('date') || localStorage.getItem('celebration_custom_date') || '';
    let customCelebrationDate = rawCustomDate.trim();

    // Top Controls & Personalization Elements
    const personalizePillBtn = document.getElementById('personalize-pill-btn');
    const recipientPillText = document.getElementById('recipient-pill-text');
    const wishJarPillBtn = document.getElementById('wish-jar-pill-btn');
    const wishJarPillText = document.getElementById('wish-jar-pill-text');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const themeToggleText = document.getElementById('theme-toggle-text');

    // Countdown Elements
    const countdownWidget = document.getElementById('countdown-widget');
    const countdownTitle = document.getElementById('countdown-title');
    const countdownEditBtn = document.getElementById('countdown-edit-btn');
    const timerDays = document.getElementById('timer-days');
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');
    const countdownTodayBanner = document.getElementById('countdown-today-banner');

    // Bear Emotion Elements
    const bearEmotionPill = document.getElementById('bear-emotion-pill');
    const bearEmotionIcon = document.getElementById('bear-emotion-icon');
    const bearEmotionText = document.getElementById('bear-emotion-text');
    const bearSpeechBubble = document.getElementById('bear-speech-bubble');
    const bearSpeechText = document.getElementById('bear-speech-text');

    // 3D Flip-Card Virtual Love Letter / Scratchpad Elements
    const virtualCardWrapper = document.getElementById('virtual-card-wrapper');
    const virtualCardInner = document.getElementById('virtual-card-inner');
    const virtualCardFront = document.getElementById('virtual-card-front');
    const waxSealBtn = document.getElementById('wax-seal-btn');
    const envelopeRecipientText = document.getElementById('envelope-recipient-text');
    const flipBackBtn = document.getElementById('flip-back-btn');
    const parchmentContentView = document.getElementById('parchment-content-view');
    const keepsakeGreeting = document.getElementById('keepsake-greeting');
    const keepsakeBody = document.getElementById('keepsake-body');
    const keepsakeSignature = document.getElementById('keepsake-signature');
    const parchmentScratchpadEditor = document.getElementById('parchment-scratchpad-editor');
    const scratchpadTextarea = document.getElementById('scratchpad-textarea');
    const editScratchpadBtn = document.getElementById('edit-scratchpad-btn');
    const scratchpadBtnIcon = document.getElementById('scratchpad-btn-icon');
    const scratchpadBtnText = document.getElementById('scratchpad-btn-text');
    const copyScratchpadBtn = document.getElementById('copy-scratchpad-btn');
    const shareLinkBtn = document.getElementById('share-link-btn');

    // Modals: Personalize & Wish Jar
    const personalizeModal = document.getElementById('personalize-modal');
    const closePersonalizeBtn = document.getElementById('close-personalize-btn');
    const recipientNameInput = document.getElementById('recipient-name-input');
    const customNoteInput = document.getElementById('custom-note-input');
    const celebrationDateInput = document.getElementById('celebration-date-input');
    const savePersonalizeBtn = document.getElementById('save-personalize-btn');
    const copyCustomLinkBtn = document.getElementById('copy-custom-link-btn');

    const wishJarModal = document.getElementById('wish-jar-modal');
    const closeWishModalBtn = document.getElementById('close-wish-modal-btn');
    const wishJarTitle = document.getElementById('wish-jar-title');
    const wishJarIcon = document.getElementById('wish-jar-icon');
    const wishContentText = document.getElementById('wish-content-text');
    const wishCapsuleTag = document.getElementById('wish-capsule-tag');
    const nextWishBtn = document.getElementById('next-wish-btn');
    const copyWishBtn = document.getElementById('copy-wish-btn');

    // Toast Notification
    const toastNotification = document.getElementById('toast-notification');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-msg');
    if (toastNotification) {
        toastNotification.hidden = true;
        toastNotification.style.display = 'none';
    }

    // Interactive State Variables
    let currentSeasonKey = 'birthday';
    let currentSeason = SEASONS.birthday;
    let acceptScale = 1.0;
    let dodgeCount = 0;
    let isAccepted = false;
    let floatingInterval = null;
    let countdownTimerInterval = null;
    let currentWishIndex = 0;
    let isCardFlipped = false;
    let isScratchpadEditing = false;

    // --------------------------------------------------------------------------
    // Dynamic Aspect-Ratio Calculation for Visual Container
    // --------------------------------------------------------------------------
    function updateVisualAspectRatio() {
        if (!mainGif || !visualContainer) return;

        let naturalW = mainGif.naturalWidth;
        let naturalH = mainGif.naturalHeight;

        // Fallback to HTML width/height or bounding dimensions if naturalWidth not yet ready
        if (!naturalW || !naturalH) {
            naturalW = parseFloat(mainGif.getAttribute('width')) || 240;
            naturalH = parseFloat(mainGif.getAttribute('height')) || 200;
        }

        if (naturalW > 0 && naturalH > 0) {
            const ratio = naturalW / naturalH;
            visualContainer.style.setProperty('--img-ratio', `${naturalW} / ${naturalH}`);
            visualContainer.dataset.aspectRatio = ratio.toFixed(2);

            // Dynamically mark wide or tall animations for tailored maximum constraints
            if (ratio > 1.35) {
                visualContainer.classList.add('is-wide-visual');
                visualContainer.classList.remove('is-tall-visual');
            } else if (ratio < 0.88) {
                visualContainer.classList.add('is-tall-visual');
                visualContainer.classList.remove('is-wide-visual');
            } else {
                visualContainer.classList.remove('is-wide-visual', 'is-tall-visual');
            }
        }
    }

    if (mainGif) {
        mainGif.addEventListener('load', updateVisualAspectRatio);
        if (mainGif.complete) {
            updateVisualAspectRatio();
        }
    }

    // --------------------------------------------------------------------------
    // 3. Audio Synthesizer (Zero-dependency Web Audio API)
    // --------------------------------------------------------------------------
    class SoundEffects {
        constructor() {
            this.ctx = null;
        }

        initContext() {
            if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playDodgePop() {
            try {
                this.initContext();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + 0.12);
            } catch {
                // Optional enhancement
            }
        }

        playCelebrationChime() {
            try {
                this.initContext();
                if (!this.ctx) return;
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, index) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.value = freq;

                    const startTime = this.ctx.currentTime + index * 0.1;
                    gain.gain.setValueAtTime(0, startTime);
                    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(startTime);
                    osc.stop(startTime + 0.65);
                });
            } catch {
                // Optional enhancement
            }
        }

        playThemeToggleSound(isDark) {
            try {
                this.initContext();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const now = this.ctx.currentTime;

                osc.type = 'sine';
                if (isDark) {
                    // Deep, cozy descending acoustic chime for night-time
                    osc.frequency.setValueAtTime(587.33, now); // D5
                    osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.18); // G4
                } else {
                    // Bright, ascending daylight chime
                    osc.frequency.setValueAtTime(392.00, now); // G4
                    osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.18); // D5
                }
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.23);
            } catch {
                // Optional enhancement
            }
        }
    }

    const sound = new SoundEffects();

    // --------------------------------------------------------------------------
    // 3b. Floating Toast Notification Helper
    // --------------------------------------------------------------------------
    function showToast(message, icon = '✨', durationMs = 2800) {
        if (!toastNotification) return;
        if (toastMsg) toastMsg.textContent = message;
        if (toastIcon) toastIcon.textContent = icon;
        toastNotification.hidden = false;
        toastNotification.style.display = 'inline-flex';

        if (toastNotification._timer) clearTimeout(toastNotification._timer);
        toastNotification._timer = setTimeout(() => {
            toastNotification.hidden = true;
            toastNotification.style.display = 'none';
        }, durationMs);
    }

    // --------------------------------------------------------------------------
    // 3b-2. Dark Mode / Night-Time Viewing System
    // --------------------------------------------------------------------------
    function isDarkModeActive() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ||
               document.body.classList.contains('dark-mode');
    }

    function updateThemeToggleUI(isDark) {
        if (!themeToggleBtn) return;
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode for Night-Time Viewing');
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode for night-time viewing');

        if (themeToggleIcon) {
            themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
        }
        if (themeToggleText) {
            themeToggleText.textContent = isDark ? 'Light' : 'Dark';
        }
    }

    function setThemeMode(isDark, saveToStorage = true) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
        }

        if (saveToStorage) {
            try {
                localStorage.setItem('valentine_theme_mode', isDark ? 'dark' : 'light');
            } catch (e) {}
        }

        updateThemeToggleUI(isDark);
    }

    function toggleThemeMode() {
        const currentlyDark = isDarkModeActive();
        const nextDark = !currentlyDark;
        setThemeMode(nextDark, true);
        sound.playThemeToggleSound(nextDark);
        showToast(nextDark ? "Night-Time Dark Mode enabled 🌙✨" : "Daylight Mode enabled ☀️💖", nextDark ? "🌙" : "☀️");
    }

    // Initialize Theme Toggle UI state from current DOM / localStorage / system preference
    const initialIsDark = isDarkModeActive();
    setThemeMode(initialIsDark, false);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleThemeMode);
    }

    // System theme change listener (respects OS if user hasn't explicitly set preference)
    if (window.matchMedia) {
        try {
            const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
            darkMedia.addEventListener('change', (e) => {
                const explicitPreference = localStorage.getItem('valentine_theme_mode');
                if (!explicitPreference) {
                    setThemeMode(e.matches, false);
                }
            });
        } catch (e) {}
    }

    // --------------------------------------------------------------------------
    // 3c. Count-up and Countdown Timer Engine
    // --------------------------------------------------------------------------
    function getCelebrationTargetDate(seasonKey, customDateStr) {
        if (customDateStr) {
            const parsed = new Date(customDateStr);
            if (!isNaN(parsed.getTime())) {
                return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0);
            }
        }

        const now = new Date();
        const currentYear = now.getFullYear();

        if (seasonKey === 'valentine') {
            let valDate = new Date(currentYear, 1, 14, 0, 0, 0); // Feb 14
            if (now > valDate && (now - valDate) > 86400000) {
                valDate = new Date(currentYear + 1, 1, 14, 0, 0, 0);
            }
            return valDate;
        }

        if (seasonKey === 'newyear') {
            return new Date(currentYear + 1, 0, 1, 0, 0, 0); // Jan 1 midnight
        }

        if (seasonKey === 'christmas') {
            let xmasDate = new Date(currentYear, 11, 25, 0, 0, 0); // Dec 25
            if (now > xmasDate && (now - xmasDate) > 86400000) {
                xmasDate = new Date(currentYear + 1, 11, 25, 0, 0, 0);
            }
            return xmasDate;
        }

        // Birthday default: custom saved date or upcoming celebration date
        const savedBday = localStorage.getItem('celebration_custom_date');
        if (savedBday) {
            const parsed = new Date(savedBday);
            if (!isNaN(parsed.getTime())) {
                let target = new Date(currentYear, parsed.getMonth(), parsed.getDate(), 0, 0, 0);
                if (now > target && (now - target) > 86400000) {
                    target = new Date(currentYear + 1, parsed.getMonth(), parsed.getDate(), 0, 0, 0);
                }
                return target;
            }
        }

        // Default birthday demonstration target (Sep 22 or upcoming)
        let defaultBday = new Date(currentYear, 8, 22, 0, 0, 0);
        if (now > defaultBday && (now - defaultBday) > 86400000) {
            defaultBday = new Date(currentYear + 1, 8, 22, 0, 0, 0);
        }
        return defaultBday;
    }

    function updateCountdownDisplay() {
        if (!timerDays || !timerHours || !timerMinutes || !timerSeconds) return;

        // Set title based on season
        if (countdownTitle) {
            if (currentSeasonKey === 'valentine') {
                countdownTitle.textContent = "💖 Valentine's Day Countdown";
            } else if (currentSeasonKey === 'newyear') {
                countdownTitle.textContent = "🎆 New Year's Midnight Countdown";
            } else if (currentSeasonKey === 'christmas') {
                countdownTitle.textContent = "🎄 Christmas Day Countdown";
            } else {
                countdownTitle.textContent = recipientName ? `🎂 ${recipientName}'s Birthday Countdown` : "🎂 Birthday Celebration Countdown";
            }
        }

        const targetDate = getCelebrationTargetDate(currentSeasonKey, customCelebrationDate);
        const now = new Date();
        const diffMs = targetDate.getTime() - now.getTime();

        // If today is the celebration date (within the active day)
        if (diffMs <= 0 && diffMs > -86400000) {
            if (countdownTodayBanner) {
                countdownTodayBanner.hidden = false;
                countdownTodayBanner.style.display = 'block';
                countdownTodayBanner.textContent = currentSeasonKey === 'birthday' 
                    ? `🎉 TODAY IS ${recipientName ? recipientName.toUpperCase() + "'S" : "THE"} CELEBRATION DAY! WISHING YOU INFINITE JOY! 🎂✨`
                    : `🎉 THE CELEBRATION IS HAPPENING TODAY! ENJOY EVERY SECOND! ✨🥂`;
            }
            // Count-up active hours/minutes/seconds of the celebration day
            const elapsed = Math.abs(diffMs);
            const hours = Math.floor(elapsed / (1000 * 60 * 60));
            const mins = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((elapsed % (1000 * 60)) / 1000);

            timerDays.textContent = "00";
            timerHours.textContent = String(hours).padStart(2, '0');
            timerMinutes.textContent = String(mins).padStart(2, '0');
            timerSeconds.textContent = String(secs).padStart(2, '0');
            return;
        } else {
            if (countdownTodayBanner) {
                countdownTodayBanner.hidden = true;
                countdownTodayBanner.style.display = 'none';
            }
        }

        let remaining = Math.max(0, diffMs);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        remaining -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        remaining -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(remaining / (1000 * 60));
        remaining -= minutes * (1000 * 60);
        const seconds = Math.floor(remaining / 1000);

        timerDays.textContent = String(days).padStart(2, '0');
        timerHours.textContent = String(hours).padStart(2, '0');
        timerMinutes.textContent = String(minutes).padStart(2, '0');
        timerSeconds.textContent = String(seconds).padStart(2, '0');
    }

    function startCountdownTimer() {
        if (countdownTimerInterval) clearInterval(countdownTimerInterval);
        updateCountdownDisplay();
        countdownTimerInterval = setInterval(updateCountdownDisplay, 1000);
    }

    // --------------------------------------------------------------------------
    // 3d. Bear Reaction Emotions State Machine
    // --------------------------------------------------------------------------
    const BEAR_EMOTIONS = [
        {
            minDodge: 0,
            maxDodge: 0,
            icon: '🐻',
            mood: 'Curious',
            className: 'bear-neutral',
            speech: (name) => name ? `Hey ${name}! Tap Accept! 🐻✨` : `Hey there! Tap Accept! 🐻✨`
        },
        {
            minDodge: 1,
            maxDodge: 2,
            icon: '😮',
            mood: 'Surprised',
            className: 'bear-surprised',
            speech: () => "Wait... did your finger slip? 🥺"
        },
        {
            minDodge: 3,
            maxDodge: 4,
            icon: '😜',
            mood: 'Playful',
            className: 'bear-playful',
            speech: () => "Haha, nice try! You can't catch me! 💨"
        },
        {
            minDodge: 5,
            maxDodge: 6,
            icon: '🥺',
            mood: 'Pleading',
            className: 'bear-pleading',
            speech: () => "Look at these puppy bear eyes... how could you say no? 🥺❤️"
        },
        {
            minDodge: 7,
            maxDodge: 8,
            icon: '💫',
            mood: 'Dizzy',
            className: 'bear-dizzy',
            speech: () => "Whoa, I'm getting dizzy chasing you! Just click Accept! 💫"
        },
        {
            minDodge: 9,
            maxDodge: Infinity,
            icon: '🥰',
            mood: 'Unstoppable',
            className: 'bear-dramatic',
            speech: () => "Accept is huge now! Resistance is futile! 🥰✨"
        }
    ];

    function updateBearEmotion(dodgeNum) {
        if (isAccepted) {
            setBearEmotionDisplay('🎉', 'Overjoyed', 'bear-joy', 'YAAAY! BEST DECISION EVER! 🥳💖');
            return;
        }
        const emotion = BEAR_EMOTIONS.find(e => dodgeNum >= e.minDodge && dodgeNum <= e.maxDodge) || BEAR_EMOTIONS[0];
        const speechText = typeof emotion.speech === 'function' ? emotion.speech(recipientName) : emotion.speech;
        setBearEmotionDisplay(emotion.icon, emotion.mood, emotion.className, speechText);
    }

    function setBearEmotionDisplay(icon, mood, animClass, speechText) {
        if (bearEmotionIcon) bearEmotionIcon.textContent = icon;
        if (bearEmotionText) bearEmotionText.textContent = `Mood: ${mood}`;
        if (bearSpeechText) bearSpeechText.textContent = speechText;

        if (mainGif) {
            mainGif.classList.remove('bear-neutral', 'bear-curious', 'bear-surprised', 'bear-playful', 'bear-pleading', 'bear-dizzy', 'bear-dramatic', 'bear-joy');
            mainGif.classList.add(animClass);
        }
    }

    // --------------------------------------------------------------------------
    // 3e. 3D Flip-Card Keepsake Letter & Scratchpad Editor + Swipe/Glide Gestures
    // --------------------------------------------------------------------------
    function updateEditNoteVisibility() {
        const hasRecipient = Boolean(recipientName && recipientName.trim().length > 0);
        if (editScratchpadBtn) {
            if (hasRecipient) {
                editScratchpadBtn.style.display = 'none';
                editScratchpadBtn.setAttribute('hidden', 'true');
                if (isScratchpadEditing) {
                    isScratchpadEditing = false;
                    if (parchmentContentView) parchmentContentView.hidden = false;
                    if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = true;
                    if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '✍️';
                    if (scratchpadBtnText) scratchpadBtnText.textContent = 'Edit Note';
                }
            } else {
                editScratchpadBtn.style.display = 'inline-flex';
                editScratchpadBtn.removeAttribute('hidden');
            }
        }
    }

    function initKeepsakeCard() {
        if (envelopeRecipientText) {
            envelopeRecipientText.textContent = recipientName ? `To: ${recipientName} ❤️` : "To: Someone Special ❤️";
        }
        if (keepsakeGreeting) {
            keepsakeGreeting.textContent = recipientName ? `Dearest ${recipientName},` : "Dearest One,";
        }
        if (keepsakeBody) {
            if (customKeepsakeMsg) {
                keepsakeBody.textContent = customKeepsakeMsg;
            } else {
                keepsakeBody.textContent = currentSeason.successSubtext;
            }
        }
        if (scratchpadTextarea && keepsakeBody) {
            scratchpadTextarea.value = keepsakeBody.textContent.trim();
        }
        updateEditNoteVisibility();
    }

    function flipCardToBack() {
        if (!virtualCardInner) return;
        virtualCardInner.classList.add('is-flipped');
        isCardFlipped = true;
        sound.playDodgePop();
    }

    function flipCardToFront() {
        if (!virtualCardInner) return;
        virtualCardInner.classList.remove('is-flipped');
        isCardFlipped = false;
        sound.playDodgePop();
    }

    // Hand Gesture (Swipe / Glide Left or Right) & Touch Handler
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchActive = false;
    let hasSwipedDuringTouch = false;

    if (virtualCardWrapper) {
        // Touch events for mobile phones & tablets
        virtualCardWrapper.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            if (e.target.closest('button, textarea, input, a, .wax-seal')) {
                return;
            }
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            touchStartTime = Date.now();
            isTouchActive = true;
            hasSwipedDuringTouch = false;
        }, { passive: true });

        virtualCardWrapper.addEventListener('touchmove', (e) => {
            if (!isTouchActive || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const diffX = touch.clientX - touchStartX;
            const diffY = touch.clientY - touchStartY;

            // Horizontal glide tracking
            if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
                hasSwipedDuringTouch = true;
                if (virtualCardInner) {
                    const currentRot = isCardFlipped ? 180 : 0;
                    const previewTilt = Math.max(-24, Math.min(24, diffX * 0.18));
                    virtualCardInner.style.transition = 'none';
                    virtualCardInner.style.transform = `rotateY(${currentRot + previewTilt}deg)`;
                }
            }
        }, { passive: true });

        const endTouchGlide = (e) => {
            if (!isTouchActive) return;
            isTouchActive = false;

            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }

            const touch = e.changedTouches ? e.changedTouches[0] : e;
            const diffX = touch.clientX - touchStartX;
            const diffY = touch.clientY - touchStartY;
            const elapsed = Date.now() - touchStartTime;

            // Glide left or right threshold
            if (Math.abs(diffX) >= 30 && Math.abs(diffX) > Math.abs(diffY) * 1.1 && elapsed < 850) {
                hasSwipedDuringTouch = true;
                if (!isCardFlipped) {
                    flipCardToBack();
                } else {
                    flipCardToFront();
                }
                if (navigator.vibrate) {
                    try { navigator.vibrate(25); } catch (_) {}
                }
            }

            setTimeout(() => {
                hasSwipedDuringTouch = false;
            }, 120);
        };

        virtualCardWrapper.addEventListener('touchend', endTouchGlide, { passive: true });
        virtualCardWrapper.addEventListener('touchcancel', () => {
            isTouchActive = false;
            hasSwipedDuringTouch = false;
            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }
        }, { passive: true });

        // Mouse pointer glide support for desktop
        let mouseStartX = 0;
        let mouseStartY = 0;
        let mouseStartTime = 0;
        let isMouseDown = false;

        virtualCardWrapper.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            if (e.target.closest('button, textarea, input, a, .wax-seal')) return;
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            mouseStartTime = Date.now();
            isMouseDown = true;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;
            if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
                if (virtualCardInner) {
                    const currentRot = isCardFlipped ? 180 : 0;
                    const previewTilt = Math.max(-20, Math.min(20, diffX * 0.15));
                    virtualCardInner.style.transition = 'none';
                    virtualCardInner.style.transform = `rotateY(${currentRot + previewTilt}deg)`;
                }
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            if (virtualCardInner) {
                virtualCardInner.style.transition = '';
                virtualCardInner.style.transform = '';
            }
            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;
            const elapsed = Date.now() - mouseStartTime;

            if (Math.abs(diffX) >= 35 && Math.abs(diffX) > Math.abs(diffY) && elapsed < 850) {
                hasSwipedDuringTouch = true;
                if (!isCardFlipped) {
                    flipCardToBack();
                } else {
                    flipCardToFront();
                }
                setTimeout(() => { hasSwipedDuringTouch = false; }, 120);
            }
        });
    }

    if (virtualCardFront) {
        virtualCardFront.addEventListener('click', () => {
            if (hasSwipedDuringTouch) return;
            flipCardToBack();
        });
        virtualCardFront.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCardToBack();
            }
        });
    }

    if (waxSealBtn) {
        waxSealBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCardToBack();
        });
    }

    if (flipBackBtn) {
        flipBackBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCardToFront();
        });
    }

    // Scratchpad editing toggle
    if (editScratchpadBtn) {
        editScratchpadBtn.addEventListener('click', () => {
            if (!isScratchpadEditing) {
                // Enter edit mode
                if (parchmentContentView) parchmentContentView.hidden = true;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = false;
                if (scratchpadTextarea && keepsakeBody) {
                    scratchpadTextarea.value = keepsakeBody.textContent.trim();
                    scratchpadTextarea.focus();
                }
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '💾';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Save Note';
                isScratchpadEditing = true;
            } else {
                // Save edit mode
                const newText = scratchpadTextarea ? scratchpadTextarea.value.trim() : '';
                if (newText) {
                    if (keepsakeBody) keepsakeBody.textContent = newText;
                    customKeepsakeMsg = newText;
                    localStorage.setItem('custom_keepsake_msg', newText);
                }
                if (parchmentContentView) parchmentContentView.hidden = false;
                if (parchmentScratchpadEditor) parchmentScratchpadEditor.hidden = true;
                if (scratchpadBtnIcon) scratchpadBtnIcon.textContent = '✍️';
                if (scratchpadBtnText) scratchpadBtnText.textContent = 'Edit Note';
                isScratchpadEditing = false;
                showToast("Personal message saved to card! 💌", "💾");
            }
        });
    }

    // Copy note to clipboard
    if (copyScratchpadBtn) {
        copyScratchpadBtn.addEventListener('click', () => {
            const greeting = keepsakeGreeting ? keepsakeGreeting.textContent : 'Dearest One,';
            const body = keepsakeBody ? keepsakeBody.textContent : '';
            const sig = keepsakeSignature ? keepsakeSignature.textContent : 'With all my love ❤️';
            const fullLetter = `${greeting}\n\n${body}\n\n${sig}`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullLetter).then(() => {
                    showToast("Keepsake note copied to clipboard! 💌", "📋");
                }).catch(() => {
                    showToast("Note ready! Press Ctrl+C to copy", "✍️");
                });
            } else {
                showToast("Note ready! Press Ctrl+C to copy", "✍️");
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3f. Personalization Modal & Dynamic Link Generator
    // --------------------------------------------------------------------------
    function openPersonalizeModal() {
        if (!personalizeModal) return;
        if (recipientNameInput) recipientNameInput.value = recipientName;
        if (customNoteInput) customNoteInput.value = customKeepsakeMsg || currentSeason.successSubtext;
        if (celebrationDateInput) celebrationDateInput.value = customCelebrationDate;

        personalizeModal.hidden = false;
        personalizeModal.style.display = 'flex';
        personalizeModal.removeAttribute('aria-hidden');
    }

    function closePersonalizeModal() {
        if (!personalizeModal) return;
        personalizeModal.hidden = true;
        personalizeModal.style.display = 'none';
        personalizeModal.setAttribute('aria-hidden', 'true');
    }

    if (personalizePillBtn) {
        personalizePillBtn.addEventListener('click', openPersonalizeModal);
    }
    if (countdownEditBtn) {
        countdownEditBtn.addEventListener('click', openPersonalizeModal);
    }
    if (closePersonalizeBtn) {
        closePersonalizeBtn.addEventListener('click', closePersonalizeModal);
    }
    if (personalizeModal) {
        personalizeModal.addEventListener('click', (e) => {
            if (e.target === personalizeModal) closePersonalizeModal();
        });
    }

    function generateShareableLink() {
        const url = new URL(window.location.origin + window.location.pathname);
        if (recipientName) url.searchParams.set('to', recipientName);
        if (currentSeasonKey && currentSeasonKey !== 'birthday') url.searchParams.set('season', currentSeasonKey);
        if (customCelebrationDate) url.searchParams.set('date', customCelebrationDate);
        if (customKeepsakeMsg) url.searchParams.set('msg', customKeepsakeMsg);
        return url.toString();
    }

    if (savePersonalizeBtn) {
        savePersonalizeBtn.addEventListener('click', () => {
            const newName = recipientNameInput ? recipientNameInput.value.trim().slice(0, 36) : '';
            const newNote = customNoteInput ? customNoteInput.value.trim().slice(0, 500) : '';
            const newDate = celebrationDateInput ? celebrationDateInput.value.trim() : '';

            recipientName = newName;
            if (newName) {
                localStorage.setItem('celebration_recipient', newName);
            } else {
                localStorage.removeItem('celebration_recipient');
            }

            if (newNote) {
                customKeepsakeMsg = newNote;
                localStorage.setItem('custom_keepsake_msg', newNote);
            }

            if (newDate) {
                customCelebrationDate = newDate;
                localStorage.setItem('celebration_custom_date', newDate);
            } else {
                customCelebrationDate = '';
                localStorage.removeItem('celebration_custom_date');
            }

            // Update UI elements in place
            if (recipientPillText) {
                recipientPillText.textContent = recipientName ? `For: ${recipientName}` : "For: Someone Special";
            }

            applySeason(currentSeasonKey);
            initKeepsakeCard();
            updateCountdownDisplay();
            updateBearEmotion(dodgeCount);

            closePersonalizeModal();
            showToast(recipientName ? `Card personalized for ${recipientName}! 💖` : "Card personalized! 💖", "✨");
        });
    }

    if (copyCustomLinkBtn) {
        copyCustomLinkBtn.addEventListener('click', () => {
            const link = generateShareableLink();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(link).then(() => {
                    showToast("Personalized link copied! Ready to share 🔗✨", "📋");
                }).catch(() => {
                    showToast("Link created! Ready to share", "🔗");
                });
            } else {
                showToast("Link created! Ready to share", "🔗");
            }
        });
    }

    if (shareLinkBtn) {
        shareLinkBtn.addEventListener('click', () => {
            const link = generateShareableLink();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(link).then(() => {
                    showToast("Shareable link copied to clipboard! 🎁✨", "💌");
                });
            } else {
                showToast("Share link ready to send! 💌", "🎁");
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3g. "Reason Why I Love You" / Wish Generator
    // --------------------------------------------------------------------------
    function openWishJarModal() {
        if (!wishJarModal) return;
        const seasonData = WISH_DATA[currentSeasonKey] || WISH_DATA.valentine;
        if (wishJarTitle) wishJarTitle.textContent = seasonData.title;

        // Draw a random wish
        drawRandomWish();

        wishJarModal.hidden = false;
        wishJarModal.style.display = 'flex';
        wishJarModal.removeAttribute('aria-hidden');
    }

    function closeWishJarModal() {
        if (!wishJarModal) return;
        wishJarModal.hidden = true;
        wishJarModal.style.display = 'none';
        wishJarModal.setAttribute('aria-hidden', 'true');
    }

    function drawRandomWish() {
        const seasonData = WISH_DATA[currentSeasonKey] || WISH_DATA.valentine;
        const items = seasonData.items;
        if (!items || items.length === 0) return;

        let nextIdx = Math.floor(Math.random() * items.length);
        if (items.length > 1 && nextIdx === currentWishIndex) {
            nextIdx = (nextIdx + 1) % items.length;
        }
        currentWishIndex = nextIdx;

        if (wishContentText) {
            wishContentText.textContent = `"${items[currentWishIndex]}"`;
        }
        if (wishCapsuleTag) {
            wishCapsuleTag.textContent = `✨ ${seasonData.tagPrefix} #${currentWishIndex + 1} of ${items.length}`;
        }

        sound.playCelebrationChime();
    }

    if (wishJarPillBtn) {
        wishJarPillBtn.addEventListener('click', openWishJarModal);
    }
    if (closeWishModalBtn) {
        closeWishModalBtn.addEventListener('click', closeWishJarModal);
    }
    if (wishJarModal) {
        wishJarModal.addEventListener('click', (e) => {
            if (e.target === wishJarModal) closeWishJarModal();
        });
    }
    if (nextWishBtn) {
        nextWishBtn.addEventListener('click', drawRandomWish);
    }
    if (copyWishBtn) {
        copyWishBtn.addEventListener('click', () => {
            const text = wishContentText ? wishContentText.textContent : '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast("Wish copied to clipboard! 📋✨", "💌");
                });
            } else {
                showToast("Wish copied! 💌", "📋");
            }
        });
    }

    // --------------------------------------------------------------------------
    // 4. Seasonal Theme Application
    // --------------------------------------------------------------------------
    function applySeason(seasonKey) {
        if (!SEASONS[seasonKey]) seasonKey = 'birthday';
        currentSeasonKey = seasonKey;
        currentSeason = SEASONS[seasonKey];

        // Update body theme gradient (preserving dark-mode and other dynamic state classes)
        Object.values(SEASONS).forEach(s => {
            if (s.themeClass) document.body.classList.remove(s.themeClass);
        });
        document.body.classList.add(currentSeason.themeClass);

        // Update Heading & Sub-message with personalized recipient support
        const personalizedHeading = getPersonalizedHeading(currentSeasonKey, recipientName);
        const personalizedSubMessage = getPersonalizedSubMessage(currentSeasonKey, recipientName);

        if (questionText) questionText.textContent = personalizedHeading;
        if (subMessage) subMessage.textContent = personalizedSubMessage;

        // Update document title & Open Graph tags for personal links
        if (recipientName) {
            document.title = `${personalizedHeading} | Special Message`;
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', personalizedHeading);
        }

        // Update Top Control Pills
        if (recipientPillText) {
            recipientPillText.textContent = recipientName ? `For: ${recipientName}` : "For: Someone Special";
        }
        if (wishJarPillText && WISH_DATA[currentSeasonKey]) {
            wishJarPillText.textContent = WISH_DATA[currentSeasonKey].pillLabel || "Tap for a wish 💌";
        }

        // Update Badge
        if (badgeText) badgeText.textContent = currentSeason.badge;

        // Update Jumping Bear Visual
        if (mainGif) {
            mainGif.src = isAccepted ? currentSeason.bearSuccess : currentSeason.bearNormal;
            mainGif.alt = `Animated jumping bear for ${currentSeason.name}`;
            mainGif.style.transform = '';
            if (mainGif.complete) {
                updateVisualAspectRatio();
            }
        }

        // Update Countdown Timer Widget
        startCountdownTimer();

        // Update Bear Emotion
        updateBearEmotion(dodgeCount);

        // Update Buttons
        if (acceptTextSpan) acceptTextSpan.textContent = currentSeason.acceptText;
        if (acceptEmojiSpan) acceptEmojiSpan.textContent = currentSeason.acceptEmoji;
        if (denyTextSpan) denyTextSpan.textContent = currentSeason.denyText;
        if (denyEmojiSpan) denyEmojiSpan.textContent = currentSeason.denyEmoji;

        // Initialize Keepsake Card with current recipient and note
        initKeepsakeCard();

        // Reset positions & scaling
        resetButtonStates();
    }

    function resetButtonStates() {
        isAccepted = false;
        acceptScale = 1.0;
        dodgeCount = 0;

        // Reset Bear Emotion back to Initial Stage
        updateBearEmotion(0);

        // Reset Virtual Flip Card back to Front
        if (virtualCardInner) {
            virtualCardInner.classList.remove('is-flipped');
            isCardFlipped = false;
        }

        if (acceptBtn) {
            acceptBtn.style.transform = 'scale(1)';
            acceptBtn.style.boxShadow = '';
        }

        if (denyBtn) {
            // Restore back inside buttonGroup if it was moved to <body>
            if (buttonGroup && denyBtn.parentElement !== buttonGroup) {
                buttonGroup.appendChild(denyBtn);
            }
            denyBtn.classList.remove('dodging');
            denyBtn.style.position = '';
            denyBtn.style.left = '';
            denyBtn.style.top = '';
            denyBtn.style.margin = '';
            denyBtn.style.display = '';
            if (denyTextSpan) denyTextSpan.textContent = currentSeason.denyText;
            if (denyEmojiSpan) denyEmojiSpan.textContent = currentSeason.denyEmoji;
        }

        if (contentHeader) {
            contentHeader.style.display = '';
            contentHeader.removeAttribute('hidden');
        }

        if (buttonGroup) {
            buttonGroup.style.display = 'flex';
            buttonGroup.removeAttribute('hidden');
        }

        if (successContainer) {
            successContainer.hidden = true;
            successContainer.setAttribute('aria-hidden', 'true');
            successContainer.style.display = 'none';
        }

        if (mainGif) {
            mainGif.src = currentSeason.bearNormal;
            mainGif.style.transform = '';
        }

        // Reset zoomed-out card layout back to initial state
        if (valentineCard) {
            valentineCard.classList.remove('card-accepted');
        }
        document.body.classList.remove('state-accepted');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // --------------------------------------------------------------------------
    // 5. High-Performance Background Particles (Thrust & Season Customization)
    // --------------------------------------------------------------------------
    // Adaptively throttled via DeviceManager to prevent mobile overheating & frame freezes
    const isMobileDevice = DeviceManager.isMobile;
    const maxActiveParticles = DeviceManager.maxParticles;
    const spawnIntervalMs = DeviceManager.spawnIntervalMs;

    function spawnFloatingParticle() {
        if (document.hidden || !floatingHeartsContainer) return;
        // Strict thrust limit: drop new particles if max count reached on screen to prevent jitter/lag
        if (floatingHeartsContainer.childElementCount >= maxActiveParticles) return;

        const particleType = currentSeason.particleType || 'up';
        const particleEl = document.createElement('span');
        particleEl.className = `floating-particle particle-${particleType}`;

        const glyphList = currentSeason.floatingEmojis || ['❤️', '✨', '🎉'];
        const randomGlyph = glyphList[Math.floor(Math.random() * glyphList.length)];
        particleEl.textContent = randomGlyph;

        const startX = (Math.random() * 92 + 4).toFixed(1);
        const duration = (Math.random() * 3 + (isMobileDevice ? 5 : 4)).toFixed(2);
        const size = (Math.random() * (particleType === 'snow' ? 0.8 : 0.7) + (isMobileDevice ? 0.95 : 1.1)).toFixed(2);
        const drift = (Math.random() * 80 - 40).toFixed(0) + 'px';
        const spin = (Math.random() * 60 - 30).toFixed(0) + 'deg';

        particleEl.style.left = `${startX}vw`;
        particleEl.style.fontSize = `${size}rem`;
        particleEl.style.animationDuration = `${duration}s`;
        particleEl.style.setProperty('--drift', drift);
        particleEl.style.setProperty('--spin', spin);

        floatingHeartsContainer.appendChild(particleEl);

        let cleanedUp = false;
        const cleanup = () => {
            if (!cleanedUp && particleEl.parentNode) {
                cleanedUp = true;
                particleEl.remove();
            }
        };

        particleEl.addEventListener('animationend', cleanup, { once: true });
        // Safe timeout fallback
        setTimeout(cleanup, parseFloat(duration) * 1000 + 400);
    }

    // Backwards-compatible alias for particle spawner
    const spawnFloatingEmoji = spawnFloatingParticle;

    function startEmojiSpawner() {
        if (!floatingInterval) {
            const initialCount = isMobileDevice ? 2 : 4;
            for (let i = 0; i < initialCount; i++) {
                setTimeout(spawnFloatingParticle, i * 250);
            }
            floatingInterval = setInterval(spawnFloatingParticle, spawnIntervalMs);
        }
    }

    // --------------------------------------------------------------------------
    // 6. 'Deny' Button Dodge Logic & 'Accept' Button Scaling
    // --------------------------------------------------------------------------
    function dodgeDenyButton(event) {
        if (isAccepted) return;
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        sound.playDodgePop();
        dodgeCount++;

        // 1. Solution 2: If the button is not yet attached to document.body, append it to <body>
        // This completely bypasses any parent container's overflow:hidden, backdrop-filter, or transform clipping context!
        if (denyBtn.parentElement !== document.body) {
            const initialRect = denyBtn.getBoundingClientRect();
            document.body.appendChild(denyBtn);
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.left = `${initialRect.left}px`;
            denyBtn.style.top = `${initialRect.top}px`;
            denyBtn.style.margin = '0';
        } else {
            denyBtn.classList.add('dodging');
            denyBtn.style.position = 'fixed';
            denyBtn.style.margin = '0';
        }

        // 2. Measure button and viewport client dimensions
        const btnWidth = denyBtn.offsetWidth || 110;
        const btnHeight = denyBtn.offsetHeight || 44;

        // Calculate boundaries relative to the viewport's client dimensions
        const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        const viewportHeight = document.documentElement.clientHeight || window.innerHeight;

        // Adaptive safe margin: 16px on mobile to give maximum play area, 36px on desktop
        const isMobileScreen = viewportWidth <= 640 || ('ontouchstart' in window);
        const safeMargin = isMobileScreen ? 16 : 36;

        const minX = safeMargin;
        const maxX = Math.max(safeMargin, viewportWidth - btnWidth - safeMargin);
        const minY = safeMargin;
        const maxY = Math.max(safeMargin, viewportHeight - btnHeight - safeMargin);

        // Generate random target coordinates strictly within the safe margins
        let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        // If triggered on mobile touch, ensure the button dodges away from the touch point
        if (event && (event.touches || event.changedTouches)) {
            const touch = (event.touches && event.touches[0]) || (event.changedTouches && event.changedTouches[0]);
            if (touch) {
                const touchX = touch.clientX;
                const touchY = touch.clientY;
                if (Math.hypot(randomX - touchX, randomY - touchY) < 85) {
                    // Reposition away from touch quadrant
                    randomY = touchY < viewportHeight / 2 
                        ? Math.min(maxY, Math.max(minY, Math.floor(viewportHeight * 0.65)))
                        : Math.min(maxY, Math.max(minY, Math.floor(viewportHeight * 0.2)));
                }
            }
        }

        // Apply new bounded position across the entire screen
        denyBtn.style.left = `${randomX}px`;
        denyBtn.style.top = `${randomY}px`;

        // 3. Update 'Deny' button playful text & emoji
        const phrases = currentSeason.denyPhrases || ["Deny", "Are you sure? 👀", "Think again!"];
        const phrase = phrases[dodgeCount % phrases.length];
        if (denyTextSpan) denyTextSpan.textContent = phrase;

        // 4. Gradually scale up the 'Accept' button over gentle steps, capped proportionally for mobile
        const maxScale = isMobileScreen ? 1.35 : 1.65;
        const scaleStep = isMobileScreen ? 0.03 : 0.04;
        const currentScale = Math.min(1.0 + (dodgeCount * scaleStep), maxScale);
        acceptScale = parseFloat(currentScale.toFixed(3));

        if (acceptBtn) {
            acceptBtn.style.transform = `scale(${acceptScale})`;
            if (dodgeCount >= 2) {
                const glowIntensity = Math.min(0.35 + (dodgeCount * 0.025), 0.7);
                acceptBtn.style.boxShadow = `0 14px 28px -4px rgba(255, 46, 99, ${glowIntensity}), 0 0 18px 3px rgba(255, 117, 140, 0.45)`;
            }
        }

        // 5. Update Bear Reaction Emotion based on dodge count
        updateBearEmotion(dodgeCount);

        // Spawn a burst of celebratory particles around the card on dodge (only on desktop to save mobile CPU)
        if (!DeviceManager.isMobile) {
            for (let i = 0; i < 3; i++) {
                setTimeout(spawnFloatingParticle, i * 80);
            }
        }
    }

    if (denyBtn) {
        denyBtn.addEventListener('mouseenter', dodgeDenyButton);
        denyBtn.addEventListener('mouseover', dodgeDenyButton);
        denyBtn.addEventListener('pointerdown', dodgeDenyButton);
        denyBtn.addEventListener('touchstart', dodgeDenyButton, { passive: false });
        denyBtn.addEventListener('click', dodgeDenyButton);
    }

    // --------------------------------------------------------------------------
    // 7. Confetti System (Canvas-Confetti with Built-in Fallback)
    // --------------------------------------------------------------------------
    function launchCelebrationConfetti(customColors) {
        const colors = customColors || currentSeason.confettiColors || ['#ff2e63', '#ffd166', '#06d6a0', '#ffffff'];

        if (typeof confetti === 'function') {
            if (DeviceManager.isMobile) {
                // Single lightweight burst on mobile - zero GPU overheating & zero frame drops
                confetti({
                    particleCount: 35,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: colors,
                    startVelocity: 32
                });
                return;
            }

            confetti({
                particleCount: 90,
                spread: 100,
                origin: { y: 0.6 },
                colors: colors,
                startVelocity: 45
            });

            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    angle: 60,
                    spread: 75,
                    origin: { x: 0.1, y: 0.7 },
                    colors: colors
                });
            }, 250);

            setTimeout(() => {
                confetti({
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
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
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

    // --------------------------------------------------------------------------
    // 8. 'Accept' Button Success State
    // --------------------------------------------------------------------------
    function triggerAcceptSuccess() {
        if (isAccepted) return;
        isAccepted = true;

        sound.playCelebrationChime();

        // 1. Hide question content-header, buttons group, and Deny button
        if (contentHeader) {
            contentHeader.style.display = 'none';
            contentHeader.setAttribute('hidden', 'true');
        }
        if (buttonGroup) {
            buttonGroup.style.display = 'none';
            buttonGroup.setAttribute('hidden', 'true');
        }
        if (denyBtn) {
            denyBtn.style.display = 'none';
        }

        // 2. Update Jumping Bear to celebratory victory bear
        if (mainGif) {
            mainGif.src = currentSeason.bearSuccess;
            mainGif.alt = `Celebratory ${currentSeason.name} animation`;
            mainGif.style.transform = 'scale(1.08)';
            if (mainGif.complete) {
                updateVisualAspectRatio();
            }
        }

        // 3. Update Card Badge
        if (cardBadge && badgeText) {
            badgeText.textContent = currentSeason.celebrationBadge;
        }

        // 4. Update Success Container elements (Single, unified celebration message with personal name)
        const successHeading = document.getElementById('success-heading');
        const successSubtext = document.getElementById('success-subtext');
        const celebrationBadge = document.getElementById('celebration-badge');

        const personalizedSuccessHeading = getPersonalizedSuccessHeading(currentSeasonKey, recipientName);

        if (successHeading) successHeading.textContent = personalizedSuccessHeading;
        if (successSubtext) successSubtext.textContent = currentSeason.successSubtext;
        if (celebrationBadge) celebrationBadge.innerHTML = `<span>${currentSeason.celebrationBadge}</span>`;

        // 5. Populate and initialize Virtual Keepsake Flip-Card
        initKeepsakeCard();

        // 6. Update Bear Reaction Emotion to Overjoyed
        updateBearEmotion(999);

        // 7. Reveal celebratory container cleanly
        if (successContainer) {
            successContainer.hidden = false;
            successContainer.removeAttribute('aria-hidden');
            successContainer.style.display = 'flex';
        }

        // 8. Fluid Zoom-Out: scale card so all top controls, celebration header, keepsake card, and buttons fit cleanly
        if (valentineCard) {
            valentineCard.classList.add('card-accepted');
            if (valentineCard.vanillaTilt) {
                valentineCard.vanillaTilt.destroy();
            }
            valentineCard.scrollTop = 0;
        }
        document.body.classList.add('state-accepted');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        // 9. Fire Confetti (mobile throttled)
        launchCelebrationConfetti();

        // 10. Extra celebratory particles shower (respecting mobile thrust cap)
        const burstCount = DeviceManager.isMobile ? 2 : 10;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(spawnFloatingParticle, i * 140);
        }

        // 11. Play Birthday Celebration Music (Simi ft. Adekunle Gold & Deja - Happy Birthday)
        playCelebrationMusic();
    }

    // --------------------------------------------------------------------------
    // Birthday Celebration Audio Controller
    // --------------------------------------------------------------------------
    function playCelebrationMusic() {
        if (!birthdayAudio) return;
        try {
            birthdayAudio.currentTime = 0;
            birthdayAudio.volume = 0;
            const playPromise = birthdayAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Smooth volume fade-in from 0 to 0.75 over 1.2s
                    let vol = 0;
                    const fadeTimer = setInterval(() => {
                        vol = Math.min(vol + 0.06, 0.75);
                        birthdayAudio.volume = parseFloat(vol.toFixed(2));
                        if (vol >= 0.75) clearInterval(fadeTimer);
                    }, 80);

                    if (musicToggleBtn) {
                        musicToggleBtn.classList.remove('is-paused');
                    }
                    if (musicLabel) {
                        musicLabel.textContent = 'Birthday Music: Playing 🎶';
                    }
                }).catch((err) => {
                    console.log('Audio playback waiting for user tap:', err);
                    if (musicToggleBtn) {
                        musicToggleBtn.classList.add('is-paused');
                    }
                    if (musicLabel) {
                        musicLabel.textContent = 'Tap to Play Birthday Music 🎶';
                    }
                });
            }
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    }

    // Music Player Toggle Control (Pause / Resume)
    if (musicToggleBtn && birthdayAudio) {
        musicToggleBtn.addEventListener('click', () => {
            if (birthdayAudio.paused) {
                birthdayAudio.play().then(() => {
                    musicToggleBtn.classList.remove('is-paused');
                    if (musicLabel) musicLabel.textContent = 'Birthday Music: Playing 🎶';
                }).catch(() => {});
            } else {
                birthdayAudio.pause();
                musicToggleBtn.classList.add('is-paused');
                if (musicLabel) musicLabel.textContent = 'Birthday Music: Paused ⏸️';
            }
        });
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', triggerAcceptSuccess);
    }

    // Replay / Reset
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            // Stop and reset birthday music if playing
            if (birthdayAudio) {
                birthdayAudio.pause();
                birthdayAudio.currentTime = 0;
            }
            if (musicToggleBtn) {
                musicToggleBtn.classList.remove('is-paused');
            }
            if (musicLabel) {
                musicLabel.textContent = 'Birthday Music: Playing 🎶';
            }

            resetButtonStates();
            applySeason(currentSeasonKey);
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }

    // --------------------------------------------------------------------------
    // 9. Automated Date-Based Initialization
    // --------------------------------------------------------------------------
    // Check URL parameters for manual season override: ?season=birthday|christmas|newyear|valentine
    const seasonQuery = urlParams.get('season')?.toLowerCase();
    const dateQuery = urlParams.get('date');

    let initialSeasonKey = 'birthday';

    if (dateQuery) {
        const parsedDate = new Date(dateQuery);
        if (!isNaN(parsedDate.getTime())) {
            initialSeasonKey = getSeasonKeyByDate(parsedDate);
        }
    } else if (seasonQuery && SEASONS[seasonQuery]) {
        initialSeasonKey = seasonQuery;
    } else {
        // Automatically determine season via JavaScript Date function
        const today = new Date();
        initialSeasonKey = getSeasonKeyByDate(today);
    }

    // Apply the determined seasonal content, jumping bear, and texts
    applySeason(initialSeasonKey);

    startEmojiSpawner();

    // Pause spawner when tab is hidden to save GPU/battery
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (floatingInterval) {
                clearInterval(floatingInterval);
                floatingInterval = null;
            }
        } else {
            startEmojiSpawner();
        }
    });

    // --------------------------------------------------------------------------
    // 10. AOS (Animate On Scroll) Initialization Helper
    // --------------------------------------------------------------------------
    let aosInitialized = false;
    function initAOS() {
        if (aosInitialized) {
            if (typeof AOS !== 'undefined') AOS.refresh();
            return;
        }
        if (typeof AOS !== 'undefined') {
            aosInitialized = true;
            AOS.init({
                duration: 850,
                easing: 'ease-out-cubic',
                once: true,
                offset: 10,
                delay: 40,
                disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
            });
        }
    }

    // --------------------------------------------------------------------------
    // 11. Subtle 3D Tilt Hover Effect (vanilla-tilt.js)
    // --------------------------------------------------------------------------
    let tiltInitialized = false;
    function initCardTilt() {
        if (tiltInitialized) return;
        // Strictly enable only for desktop/laptops with fine cursor and non-touch to keep mobile zero-cost & jitter-free
        if (DeviceManager.canTilt && valentineCard && typeof VanillaTilt !== 'undefined') {
            tiltInitialized = true;
            VanillaTilt.init(valentineCard, {
                max: 18,
                speed: 650,
                perspective: 850,
                scale: 1.035,
                glare: true,
                "max-glare": 0.28,
                gyroscope: false, // Turn off mobile sensor listening to prevent battery drain & jitter
                reset: true,
                easing: "cubic-bezier(.03,.98,.52,.99)"
            });
        }
    }

    // --------------------------------------------------------------------------
    // 12. Liquid Glass Droplet Preloader & Fluid Card Entrance
    // --------------------------------------------------------------------------
    const MIN_PRELOADER_TIME = 2500; // Minimum 2.5s duration to let liquid droplet animation play out
    const preloaderStartTime = performance.now();
    let isPreloaderDismissed = false;
    let windowLoadFired = (document.readyState === 'complete');

    // Adapt preloader droplet icon and badge to current season
    if (dropletIcon && currentSeason) {
        dropletIcon.textContent = currentSeason.btnAcceptEmoji || '💖';
    }
    if (preloaderBadgeText && currentSeason) {
        preloaderBadgeText.textContent = currentSeason.name === 'Birthday' ? 'Crafting Birthday Joy 🎂' : `Crafting ${currentSeason.name} Magic ✨`;
    }

    const preloaderPhrases = [
        "Infusing sweetness... 🍯",
        "Polishing frosted glass... ✨",
        "Preparing celebratory magic... 🎁",
        "Almost ready! 💖"
    ];

    // Smoothly animate progress bar and cycle status phrases
    const progressInterval = setInterval(() => {
        if (isPreloaderDismissed) {
            clearInterval(progressInterval);
            return;
        }

        const elapsed = performance.now() - preloaderStartTime;
        const ratio = Math.min(elapsed / MIN_PRELOADER_TIME, 0.96);
        const percent = Math.round(ratio * 100);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = `${percent}%`;
        }

        // Phrase cycling based on time progress
        if (preloaderStatus) {
            const phraseIdx = Math.min(Math.floor(ratio * preloaderPhrases.length), preloaderPhrases.length - 1);
            preloaderStatus.textContent = preloaderPhrases[phraseIdx];
        }
    }, 60);

    function dismissPreloader() {
        if (isPreloaderDismissed) return;
        isPreloaderDismissed = true;
        clearInterval(progressInterval);

        if (preloaderBarFill) {
            preloaderBarFill.style.width = '100%';
        }
        if (preloaderStatus) {
            preloaderStatus.textContent = 'Welcome! ✨';
        }

        // Elegantly fade out the preloader and scale the main glass UI card into view
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('preloader-hiding');
            }

            if (valentineCard) {
                valentineCard.classList.remove('card-initial-hide');
                valentineCard.classList.add('card-revealed');
            }

            initAOS();

            // After fadeout completes (850ms), fully remove preloader from view and activate 3D tilt
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('preloader-hidden');
                    preloader.setAttribute('aria-hidden', 'true');
                }
                initCardTilt();
            }, 850);
        }, 180);
    }

    function checkReadyToDismiss() {
        const elapsed = performance.now() - preloaderStartTime;
        if (elapsed >= MIN_PRELOADER_TIME && windowLoadFired) {
            dismissPreloader();
        }
    }

    window.addEventListener('load', () => {
        windowLoadFired = true;
        checkReadyToDismiss();
    });

    // Ensure preloader plays for at least 2.5 seconds, then dismisses once window load has fired
    if (preloader) {
        setTimeout(() => {
            if (windowLoadFired || document.readyState === 'complete') {
                dismissPreloader();
            } else {
                // If window load is taking extra time (e.g. slow network), wait for it or fallback safely at +1.8s
                const fallbackSafetyTimer = setTimeout(dismissPreloader, 1800);
                window.addEventListener('load', () => {
                    clearTimeout(fallbackSafetyTimer);
                    dismissPreloader();
                }, { once: true });
            }
        }, MIN_PRELOADER_TIME);
    } else {
        // Fallback if preloader element is absent
        initAOS();
        initCardTilt();
    }

    if (valentineCard) {
        valentineCard.addEventListener('mouseenter', initCardTilt, { once: true });
    }

    // Adjust canvas and visual container on window resize and orientation change
    const handleViewportChange = () => {
        if (fallbackCanvas) {
            fallbackCanvas.width = window.innerWidth;
            fallbackCanvas.height = window.innerHeight;
        }
        updateVisualAspectRatio();
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleViewportChange, 120);
    });
});
