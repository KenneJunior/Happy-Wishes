/**
 * Occasion Configuration
 * Declarative metadata and definitions for all supported holidays and celebration types.
 * Complex calculations belong in core/occasion-service.js.
 */

export const OCCASIONS = {
    valentine: {
        id: 'valentine',
        name: "Valentine's Day",
        icon: '💖',
        emoji: '💖',
        badge: '💖 BE MY VALENTINE',
        celebrationBadge: '💖 YOU SAID YES!',
        fixedDate: { month: 1, day: 14 }, // Month is 0-indexed: 1 = February
        question: 'Will you be my Valentine?',
        subtext: 'A little question straight from the heart...',
        themeClass: 'theme-valentine',
        bgGradient: 'linear-gradient(-45deg, #ff4e79, #ff758c, #a18cd1, #fbc2eb, #e0407b, #ff758c)',
        bearNormal: './assets/bear-valentine.svg',
        bearSuccess: './assets/bear-valentine-success.svg',
        assets: {
            bearInitial: './assets/bear-valentine.svg',
            bearSuccess: './assets/bear-valentine-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Yes, with all my heart!',
        acceptEmoji: '💖',
        denyText: 'No way',
        denyEmoji: '🥺',
        denyPhrases: [
            "Are you sure? 🥺",
            "Think again! 💭",
            "Look at those puppy eyes! 🥺",
            "Don't break my heart! 💔",
            "Pretty please? 🌸",
            "I baked cookies! 🍪",
            "Last chance! ✨",
            "You can't resist! 🐻"
        ],
        btnAcceptEmoji: '💖',
        particleType: 'up',
        floatingEmojis: ['💖', '💕', '✨', '🌸', '💘', '💝'],
        effects: ['💖', '💕', '✨', '🌸', '💘', '💝'],
        confettiColors: ['#ff2e63', '#ff758c', '#ffffff', '#ffd166', '#ff9a9e'],
        countdownTitle: (name) => name ? `💖 Countdown to ${name}'s Valentine's Day` : "💖 Countdown to Valentine's Day",
        todayMessage: (name) => name ? `🎉 HAPPY VALENTINE'S DAY, ${name.toUpperCase()}! WISHING YOU INFINITE LOVE! 💖✨` : "🎉 HAPPY VALENTINE'S DAY! WISHING YOU INFINITE LOVE! 💖✨",
        getHeading: (name) => name ? `${name}, will you be my Valentine?` : 'Will you be my Valentine?',
        getSubMessage: () => 'A little question straight from the heart...',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! You said YES! 💖` : 'You said YES! 💖',
        successSubtext: 'Every moment spent thinking of you brings warmth to my heart. So excited to celebrate with you! 💖',
        reasonsPool: [
            'Your smile brightens up even the gloomiest of mornings.',
            'The warmth and kindness you naturally share with everyone around you.',
            'How comfortable and peaceful everything feels whenever we talk.',
            'Your genuine laugh that is completely infectious and contagious.',
            'The quiet, thoughtful ways you show you truly care.',
            'How you make ordinary moments feel memorable and special.',
            'The little things you do that you think nobody notices.',
            'Simply because having you in my life makes everything sweeter.'
        ],
        defaultMessage: "Every moment spent thinking of you brings a quiet warmth to my day. I wanted to create this little corner of the world just to remind you how genuinely special you are to me.",
        defaultFrom: 'With all my heart'
    },
    birthday: {
        id: 'birthday',
        name: 'Birthday',
        icon: '🎂',
        emoji: '🎂',
        badge: '🎂 HAPPY BIRTHDAY',
        celebrationBadge: '🎉 BEST DECISION EVER! 🎉',
        fixedDate: null, // Dynamic: determined by recipient's birthday or current year
        question: 'Happy Birthday!',
        subtext: 'Wishing you a magical day filled with sweet moments and huge smiles! 🎂✨',
        themeClass: 'theme-birthday',
        bgGradient: 'linear-gradient(-45deg, #ff758c, #ffb199, #fbc2eb, #ffd166, #ff758c, #a18cd1)',
        bearNormal: './assets/bear-birthday.svg',
        bearSuccess: './assets/bear-birthday-success.svg',
        assets: {
            bearInitial: './assets/bear-birthday.svg',
            bearSuccess: './assets/bear-birthday-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Accept',
        acceptEmoji: '🎂',
        denyText: 'Deny',
        denyEmoji: '🙈',
        denyPhrases: [
            "Are you sure? 🙈",
            "Think again! 💭",
            "I got you a cake! 🎂",
            "Don't skip the celebration! 🎉",
            "Make a wish first! ✨",
            "There is ice cream too! 🍦",
            "Let us party! 🥳",
            "You cannot say no! 🐻"
        ],
        btnAcceptEmoji: '🎂',
        particleType: 'up',
        floatingEmojis: ['🎂', '🎉', '✨', '🎈', '⭐', '🧁'],
        effects: ['🎂', '🎉', '✨', '🎈', '⭐', '🧁'],
        confettiColors: ['#ffd166', '#ff758c', '#06d6a0', '#118ab2', '#ffbe0b'],
        countdownTitle: (name) => name ? `🎂 ${name}'s Birthday Countdown` : "🎂 Birthday Countdown",
        todayMessage: (name) => name ? `🎉 HAPPY BIRTHDAY, ${name.toUpperCase()}! WISHING YOU INFINITE JOY! 🎂✨` : "🎉 THE CELEBRATION IS TODAY! WISHING YOU INFINITE JOY! 🎂✨",
        getHeading: (name) => name ? `Happy Birthday, ${name}!` : 'Happy Birthday!',
        getSubMessage: () => 'Wishing you a magical day filled with sweet moments and huge smiles! 🎂✨',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! Happy Birthday! 🎂🎉🥳` : 'Yaaay! Happy Birthday! 🎂🎉🥳',
        successSubtext: 'May all your birthday wishes come true today and always! Hope your year is full of love and adventures! ✨💖',
        reasonsPool: [
            'For your infectious zest for life and contagious enthusiasm.',
            'The way you constantly lift the spirits of everyone in the room.',
            'For every unforgettable adventure, laugh, and late-night conversation.',
            'Because you are growing into an even more remarkable soul each year.',
            'The inspiring passion you bring to everything you set your mind to.',
            'Your generous heart and the unwavering support you offer friends.',
            'All the spontaneous, goofy moments that become cherished memories.',
            'Because today is your day, and nobody deserves joy more than you!'
        ],
        defaultMessage: "May your coming year be filled with vibrant adventures, heartwarming laughter, peace of mind, and the fulfillment of your wildest dreams. Happy Birthday!",
        defaultFrom: 'Cheering you on always'
    },
    christmas: {
        id: 'christmas',
        name: 'Christmas',
        icon: '🎄',
        emoji: '🎄',
        badge: '🎄 MERRY CHRISTMAS',
        celebrationBadge: '🎄 MERRY CHRISTMAS!',
        fixedDate: { month: 11, day: 25 }, // Month 11 = December
        question: 'Merry Christmas! Will you celebrate with me?',
        subtext: 'Winter coziness, warm cocoa, and holiday cheer...',
        themeClass: 'theme-christmas',
        bgGradient: 'linear-gradient(-45deg, #d90429, #ef233c, #2b9348, #38b000, #ffb703, #d90429)',
        bearNormal: './assets/bear-christmas.svg',
        bearSuccess: './assets/bear-christmas-success.svg',
        assets: {
            bearInitial: './assets/bear-christmas.svg',
            bearSuccess: './assets/bear-christmas-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Celebrate Together!',
        acceptEmoji: '🎄',
        denyText: 'Bah Humbug',
        denyEmoji: '❄️',
        denyPhrases: [
            "Are you a Grinch? 🥺",
            "There's hot cocoa! ☕",
            "Santa is watching! 🎅",
            "Check under the tree! 🎁",
            "Don't freeze out Christmas! ❄️",
            "Cookies fresh from the oven! 🍪",
            "Jingle all the way! 🔔",
            "Holiday spirit awaits! 🐻"
        ],
        btnAcceptEmoji: '🎄',
        particleType: 'snow',
        floatingEmojis: ['❄️', '🎄', '✨', '⭐', '🔔', '🎁'],
        effects: ['❄️', '🎄', '✨', '⭐', '🔔', '🎁'],
        confettiColors: ['#d90429', '#2b9348', '#ffd166', '#ffffff', '#38b000'],
        countdownTitle: (name) => name ? `🎄 Countdown to ${name}'s Christmas` : "🎄 Countdown to Christmas",
        todayMessage: (name) => name ? `🎉 MERRY CHRISTMAS, ${name.toUpperCase()}! WISHING YOU WARMTH AND JOY! 🎄✨` : "🎉 MERRY CHRISTMAS! WISHING YOU WARMTH AND JOY! 🎄✨",
        getHeading: (name) => name ? `Merry Christmas, ${name}! Will you celebrate with me?` : 'Merry Christmas! Will you celebrate with me?',
        getSubMessage: () => 'Winter coziness, warm cocoa, and holiday cheer...',
        getSuccessHeading: (name) => name ? `Merry Christmas, ${name}! 🎄✨` : 'Merry Christmas! 🎄✨',
        successSubtext: 'May your holiday season be sprinkled with magic, dusted with delight, and wrapped in cozy warmth! 🎄🎁',
        reasonsPool: [
            'Warm cinnamon teas and cozy fireside chats on chilly nights.',
            'The sparkle in your eyes that rivals any decorated tree.',
            'The simple joy of wrapping gifts while holiday songs play in the background.',
            'How you make freezing winter days feel comfortable and warm.',
            'Sharing sweet holiday treats and delicious homemade snacks together.',
            'The comforting quiet of snow gently falling outside the window.',
            'All the traditions we share and the fresh new ones we make.',
            'Because having you around is the finest present of all.'
        ],
        defaultMessage: "May your home be blessed with quiet peace, sparkling joy, and the embrace of loved ones. Wishing you the merriest, warmest holiday season!",
        defaultFrom: 'Warm winter wishes'
    },
    newyear: {
        id: 'newyear',
        name: "New Year's Eve",
        icon: '🎆',
        emoji: '🎆',
        badge: '🎆 HAPPY NEW YEAR',
        celebrationBadge: '🎆 HAPPY NEW YEAR!',
        fixedDate: { month: 0, day: 1 }, // Month 0 = January 1st
        question: 'Ready to ring in the New Year together?',
        subtext: '365 fresh pages, blank canvases, and bold new chapters...',
        themeClass: 'theme-newyear',
        bgGradient: 'linear-gradient(-45deg, #3a0ca3, #7209b7, #f72585, #ffd166, #4cc9f0, #3a0ca3)',
        bearNormal: './assets/bear-newyear.svg',
        bearSuccess: './assets/bear-newyear-success.svg',
        assets: {
            bearInitial: './assets/bear-newyear.svg',
            bearSuccess: './assets/bear-newyear-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Cheers to 2026!',
        acceptEmoji: '🥂',
        denyText: 'Not Ready',
        denyEmoji: '⏰',
        denyPhrases: [
            "Tick-tock! ⏰",
            "The ball is dropping! 🎊",
            "Midnight countdown awaits! ✨",
            "Champagne is chilled! 🍾",
            "New adventures ahead! 🚀",
            "Make a resolution with me! 📝",
            "Sparklers are lit! 🎆",
            "Ring in the year together! 🐻"
        ],
        btnAcceptEmoji: '🎆',
        particleType: 'up',
        floatingEmojis: ['🎆', '✨', '🥂', '⭐', '🎊', '💫'],
        effects: ['🎆', '✨', '🥂', '⭐', '🎊', '💫'],
        confettiColors: ['#ffd166', '#f72585', '#7209b7', '#4cc9f0', '#ffffff'],
        countdownTitle: (name) => name ? `🎆 Countdown to ${name}'s New Year` : "🎆 Countdown to New Year",
        todayMessage: (name) => name ? `🎉 HAPPY NEW YEAR, ${name.toUpperCase()}! MAY THIS YEAR BE EXTRAORDINARY! 🎆🥂` : "🎉 HAPPY NEW YEAR! MAY THIS YEAR BE EXTRAORDINARY! 🎆🥂",
        getHeading: (name) => name ? `${name}, ready to ring in the New Year together?` : 'Ready to ring in the New Year together?',
        getSubMessage: () => '365 fresh pages, blank canvases, and bold new chapters...',
        getSuccessHeading: (name) => name ? `Happy New Year, ${name}! 🥂🎆` : 'Happy New Year! 🥂🎆',
        successSubtext: "Here's to new beginnings, daring aspirations, deeper connections, and countless reasons to smile! 🥂✨",
        reasonsPool: [
            'Toasting to all the hurdles we leaped over together this past year.',
            'Excitement for all the unexplored roads and fresh chapters waiting ahead.',
            'How we can always make each other laugh through any unexpected turn.',
            'The countdown adrenaline when the clock inches towards midnight.',
            'Making grand promises and knowing we have each other’s support.',
            'The sparkle of city fireworks illuminating smiling faces in the crowd.',
            'Leaving the old worries behind and greeting dawn with hope.',
            'Because entering a new calendar year with you feels like good fortune.'
        ],
        defaultMessage: "Here is to new beginnings, daring aspirations, deeper connections, and countless reasons to smile. May your year ahead be nothing short of extraordinary!",
        defaultFrom: 'Cheers to our future'
    },
    easter: {
        id: 'easter',
        name: 'Easter',
        icon: '🐰',
        emoji: '🐰',
        badge: '🐰 HAPPY EASTER',
        celebrationBadge: '🐰 HAPPY EASTER!',
        fixedDate: null, // Calculated dynamically by Easter algorithm in occasion-service.js
        question: 'Happy Easter! Will you hop along with me?',
        subtext: 'Springtime blossoms, sweet treats, and colorful renewal...',
        themeClass: 'theme-easter',
        bgGradient: 'linear-gradient(-45deg, #a855f7, #f472b6, #38bdf8, #fef08a, #4ade80, #a855f7)',
        bearNormal: './assets/bear-easter.svg',
        bearSuccess: './assets/bear-easter-success.svg',
        assets: {
            bearInitial: './assets/bear-easter.svg',
            bearSuccess: './assets/bear-easter-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Hop Along!',
        acceptEmoji: '🐰',
        denyText: 'No Thanks',
        denyEmoji: '🥚',
        denyPhrases: [
            "Are you sure? 🥺",
            "I have chocolate eggs! 🍫",
            "Look at the bunny ears! 🐰",
            "Spring is here! 🌸",
            "Don't crack my egg! 🥚",
            "Sunny days ahead! ☀️",
            "Hop to it! 🐾",
            "Too sweet to resist! 🐻"
        ],
        btnAcceptEmoji: '🐰',
        particleType: 'up',
        floatingEmojis: ['🐰', '🌸', '🥚', '🌷', '✨', '🐣'],
        effects: ['🐰', '🌸', '🥚', '🌷', '✨', '🐣'],
        confettiColors: ['#f472b6', '#a855f7', '#38bdf8', '#fef08a', '#4ade80'],
        countdownTitle: (name) => name ? `🐰 Countdown to ${name}'s Easter` : "🐰 Countdown to Easter",
        todayMessage: (name) => name ? `🎉 HAPPY EASTER, ${name.toUpperCase()}! WISHING YOU SPRINGTIME BLOSSOMS! 🐰🌸` : "🎉 HAPPY EASTER! WISHING YOU SPRINGTIME BLOSSOMS! 🐰🌸",
        getHeading: (name) => name ? `Happy Easter, ${name}! Will you hop along with me?` : 'Happy Easter! Will you hop along with me?',
        getSubMessage: () => 'Springtime blossoms, sweet treats, and colorful renewal...',
        getSuccessHeading: (name) => name ? `Happy Easter, ${name}! 🐰🌸` : 'Happy Easter! 🐰🌸',
        successSubtext: 'Wishing you a bright, joyous springtime filled with cheerful blossoms, sweet chocolate surprises, and warm sunny days! 🐰🌷',
        reasonsPool: [
            'The cheerful pastel colors of spring awakening after the cold winter.',
            'Sweet chocolate eggs and playful morning garden hunts.',
            'Freshly blooming tulips and the gentle scent of lavender in the breeze.',
            'Sunny morning walks with nowhere to rush and birds singing above.',
            'Your warm, springtime laugh that makes every morning feel hopeful.',
            'The soft afternoon sunshine filtering through open windows.',
            'Bright new beginnings and refreshing peaceful moments.',
            'Because you bring sunshine and blossoming energy wherever you step.'
        ],
        defaultMessage: "Wishing you a bright, joyous springtime filled with cheerful blossoms, sweet chocolate surprises, and the warmth of gentle sunny days. Happy Easter!",
        defaultFrom: 'Springtime hugs'
    },
    custom: {
        id: 'custom',
        name: 'Custom Celebration',
        icon: '✨',
        emoji: '✨',
        badge: '✨ SPECIAL CELEBRATION',
        celebrationBadge: '✨ SPECIAL CELEBRATION DAY!',
        fixedDate: null, // User-selected via date input
        question: 'Will you celebrate with me?',
        subtext: 'A unique milestone made especially for us...',
        themeClass: 'theme-custom',
        bgGradient: 'linear-gradient(-45deg, #ff758c, #ffd166, #ff9a9e, #c084fc, #fbc2eb, #ff758c)',
        bearNormal: './assets/bear-valentine.svg',
        bearSuccess: './assets/bear-valentine-success.svg',
        assets: {
            bearInitial: './assets/bear-valentine.svg',
            bearSuccess: './assets/bear-valentine-success.svg',
            fallbackGif: './assets/img1.gif',
            fallbackSuccessGif: './assets/img3.gif'
        },
        acceptText: 'Yes, Absolutely!',
        acceptEmoji: '✨',
        denyText: 'Maybe Later',
        denyEmoji: '💭',
        denyPhrases: [
            "Are you sure? 🥺",
            "Think again! 💭",
            "This celebration is special! ✨",
            "Created just for you! 💌",
            "Don't miss the moment! 🌟",
            "So many reasons to celebrate! 🎉",
            "Say yes! 💖",
            "You cannot resist! 🐻"
        ],
        btnAcceptEmoji: '✨',
        particleType: 'up',
        floatingEmojis: ['✨', '💫', '🌟', '💖', '🎉', '💎'],
        effects: ['✨', '💫', '🌟', '💖', '🎉', '💎'],
        confettiColors: ['#ff2e63', '#ffd166', '#c084fc', '#ffffff', '#ff758c'],
        countdownTitle: (name, title) => {
            const t = (title && title.trim()) ? title.trim() : 'Celebration';
            return name ? `✨ ${name}'s ${t} Countdown` : `✨ ${t} Countdown`;
        },
        todayMessage: (name, title) => {
            const t = (title && title.trim()) ? title.trim().toUpperCase() : 'CELEBRATION';
            return name ? `🎉 TODAY IS ${name.toUpperCase()}'S ${t}! WISHING YOU INFINITE JOY! ✨🥂` : `🎉 TODAY IS ${t}! WISHING YOU INFINITE JOY! ✨🥂`;
        },
        getHeading: (name, title) => {
            if (title && title.trim()) {
                return name ? `${name}, will you celebrate "${title}" with me? ✨` : `Will you celebrate "${title}" with me? ✨`;
            }
            return name ? `${name}, will you celebrate with me? ✨` : `Will you celebrate with me? ✨`;
        },
        getSubMessage: () => 'A unique milestone made especially for us...',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! You said YES! 🎉✨` : 'You said YES! 🎉✨',
        successSubtext: "Some milestones hold a magic that is uniquely ours. Here's to making unforgettable memories together! 🥂✨",
        reasonsPool: [
            'Because our story is completely unique and worth celebrating every day.',
            'The private jokes and silly moments that only the two of us understand.',
            'How even the simplest conversation with you turns into my favorite part of the week.',
            'The reassurance of knowing you are right there whenever it counts.',
            'How we build our own traditions on our own terms.',
            'Every small victory we celebrated and every challenge we conquered together.',
            'The honest comfort of being completely myself around you.',
            'Because any milestone is sweeter when experienced by your side.'
        ],
        defaultMessage: "Some dates on the calendar hold a quiet magic that only we truly understand. I wanted to mark this special moment and remind you how cherished you are.",
        defaultFrom: 'Always in my thoughts'
    }
};

/**
 * Detailed event types supported by the custom celebration modal and occasion service.
 * Keyed by unique event ID matching HTML data-event attributes.
 */
export const CELEBRATION_EVENT_TYPES = {
    birthday: {
        id: 'birthday',
        label: 'Birthday',
        icon: '🎂',
        emoji: '🎂',
        badge: '🎂 HAPPY BIRTHDAY',
        acceptText: 'Celebrate Big!',
        acceptEmoji: '🎉',
        getHeading: (name) => name ? `Happy Birthday, ${name}! 🎂` : 'Happy Birthday! 🎂',
        getSubMessage: () => 'Wishing you a wonderful year filled with happiness and laughter...',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! Happy Birthday! 🎂🎉` : 'Happy Birthday! 🎉🎂',
        countdownTitle: (name) => name ? `🎂 ${name}'s Birthday Countdown` : '🎂 Birthday Countdown',
        todayMessage: (name) => name ? `🎉 HAPPY BIRTHDAY, ${name.toUpperCase()}! WISHING YOU INFINITE JOY! 🎂✨` : '🎉 HAPPY BIRTHDAY! WISHING YOU INFINITE JOY! 🎂✨',
        successSubtext: 'May all your birthday wishes and deepest dreams come true! 🥳💖'
    },
    anniversary: {
        id: 'anniversary',
        label: 'Anniversary',
        icon: '💍',
        emoji: '💍',
        badge: '💍 HAPPY ANNIVERSARY',
        acceptText: 'Forever & Always',
        acceptEmoji: '💖',
        getHeading: (name) => name ? `Happy Anniversary, ${name}! 💍` : 'Happy Anniversary! 💍',
        getSubMessage: () => 'Celebrating our journey together and all the sweet moments we share...',
        getSuccessHeading: (name) => name ? `Happy Anniversary, ${name}! 💖💍` : 'Happy Anniversary! 💖💍',
        countdownTitle: (name) => name ? `💍 ${name}'s Anniversary Countdown` : '💍 Anniversary Countdown',
        todayMessage: (name) => name ? `🎉 HAPPY ANNIVERSARY, ${name.toUpperCase()}! HERE IS TO FOREVER! 💍💖` : '🎉 HAPPY ANNIVERSARY! HERE IS TO FOREVER! 💍💖',
        successSubtext: "Here's to another beautiful year of laughter, love, and memories together! 🥂❤️"
    },
    graduation: {
        id: 'graduation',
        label: 'Graduation',
        icon: '🎓',
        emoji: '🎓',
        badge: '🎓 CONGRATULATIONS',
        acceptText: 'Onto New Heights!',
        acceptEmoji: '🚀',
        getHeading: (name) => name ? `Congratulations, Graduate ${name}! 🎓` : 'Congratulations, Graduate! 🎓',
        getSubMessage: () => 'Your hard work, brilliance, and perseverance have paid off...',
        getSuccessHeading: (name) => name ? `So Proud of You, ${name}! 🎓🌟` : 'So Proud of You! 🎓🌟',
        countdownTitle: (name) => name ? `🎓 ${name}'s Graduation Countdown` : '🎓 Graduation Countdown',
        todayMessage: (name) => name ? `🎉 CONGRATS GRADUATE ${name.toUpperCase()}! THE WORLD IS YOURS! 🎓🌟` : '🎉 CONGRATULATIONS GRADUATE! THE WORLD IS YOURS! 🎓🌟',
        successSubtext: 'The future is yours to conquer! May success follow you wherever you go! 🌟'
    },
    promotion: {
        id: 'promotion',
        label: 'Job Promotion',
        icon: '🚀',
        emoji: '🚀',
        badge: '🚀 PROMOTION VICTORY',
        acceptText: 'Level Up!',
        acceptEmoji: '🥂',
        getHeading: (name) => name ? `Congrats on the Promotion, ${name}! 🚀` : 'Congrats on the Promotion! 🚀',
        getSubMessage: () => 'Celebrating your dedication, talent, and well-earned achievement...',
        getSuccessHeading: (name) => name ? `Cheers to Your Next Level, ${name}! 🚀🥂` : 'Cheers to Your Next Level! 🚀🥂',
        countdownTitle: (name) => name ? `🚀 ${name}'s Career Milestone Countdown` : '🚀 Career Milestone Countdown',
        todayMessage: (name) => name ? `🎉 CHEERS TO YOUR PROMOTION, ${name.toUpperCase()}! YOU DID IT! 🚀🥂` : '🎉 CHEERS TO YOUR PROMOTION! YOU DID IT! 🚀🥂',
        successSubtext: "Your dedication is inspiring. Here's to making great things happen in your new role! 🏆"
    },
    newhome: {
        id: 'newhome',
        label: 'New Home',
        icon: '🏡',
        emoji: '🏡',
        badge: '🏡 HOME SWEET HOME',
        acceptText: 'Warm Welcome!',
        acceptEmoji: '🔑',
        getHeading: (name) => name ? `Happy Housewarming, ${name}! 🏡` : 'Happy Housewarming! 🏡',
        getSubMessage: () => 'Wishing you endless laughter, peace, and sweet memories in your new sanctuary...',
        getSuccessHeading: (name) => name ? `Welcome Home, ${name}! 🏡💖` : 'Welcome Home! 🏡💖',
        countdownTitle: (name) => name ? `🏡 ${name}'s Housewarming Countdown` : '🏡 Housewarming Countdown',
        todayMessage: (name) => name ? `🎉 WELCOME HOME, ${name.toUpperCase()}! MAY JOY FILL EVERY ROOM! 🏡🔑` : '🎉 WELCOME HOME! MAY JOY FILL EVERY ROOM! 🏡🔑',
        successSubtext: 'May your new home always be filled with warmth, happiness, and love! 🔑'
    },
    friendship: {
        id: 'friendship',
        label: 'Best Friends Day',
        icon: '🌸',
        emoji: '🌸',
        badge: '🌸 BEST FRIENDS CELEBRATION',
        acceptText: 'Besties Forever!',
        acceptEmoji: '✨',
        getHeading: (name) => name ? `To the Best Friend Ever, ${name}! 🌸` : 'To My Best Friend! 🌸',
        getSubMessage: () => 'Grateful every day for your laughter, support, and wonderful friendship...',
        getSuccessHeading: (name) => name ? `Besties Forever, ${name}! 🌸💖` : 'Besties Forever! 🌸💖',
        countdownTitle: (name) => name ? `🌸 ${name}'s Friendship Celebration Countdown` : '🌸 Friendship Celebration Countdown',
        todayMessage: (name) => name ? `🎉 HAPPY BEST FRIENDS DAY, ${name.toUpperCase()}! BESTIES FOREVER! 🌸✨` : '🎉 HAPPY BEST FRIENDS DAY! BESTIES FOREVER! 🌸✨',
        successSubtext: 'Thank you for being such an irreplaceable part of my life! 👯‍♀️✨'
    },
    milestone: {
        id: 'milestone',
        label: 'Major Milestone',
        icon: '🌟',
        emoji: '🌟',
        badge: '🌟 CELEBRATING SUCCESS',
        acceptText: 'Celebrate Big!',
        acceptEmoji: '🥂',
        getHeading: (name, title) => {
            const t = (title && title.trim()) ? title.trim() : 'Special Milestone';
            return name ? `${name}, Celebrating Your ${t}! 🌟` : `Celebrating Your ${t}! 🌟`;
        },
        getSubMessage: () => "Honoring how far you've come and cheering for everything still ahead...",
        getSuccessHeading: (name) => name ? `Congratulations, ${name}! 🌟🥂` : 'Congratulations! 🌟🥂',
        countdownTitle: (name, title) => {
            const t = (title && title.trim()) ? title.trim() : 'Milestone';
            return name ? `🌟 ${name}'s ${t} Countdown` : `🌟 ${t} Countdown`;
        },
        todayMessage: (name, title) => {
            const t = (title && title.trim()) ? title.trim().toUpperCase() : 'MILESTONE';
            return name ? `🎉 TODAY IS ${name.toUpperCase()}'S ${t}! YOU SHINE SO BRIGHT! 🌟🥂` : `🎉 TODAY IS YOUR ${t}! YOU SHINE SO BRIGHT! 🌟🥂`;
        },
        successSubtext: 'You aimed high and achieved something remarkable. Soak in every second of this moment! 🎉'
    },
    love: {
        id: 'love',
        label: 'Our Love Story',
        icon: '💖',
        emoji: '💖',
        badge: '💖 SPECIAL ROMANCE',
        acceptText: 'Yes, With All My Heart!',
        acceptEmoji: '🥰',
        getHeading: (name) => name ? `${name}, will you celebrate our love with me? 💖` : 'Will you celebrate our love with me? 💖',
        getSubMessage: () => 'A little corner of the world dedicated just to our story...',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! You said YES! 💖` : 'You said YES! 💖',
        countdownTitle: (name) => name ? `💖 ${name}'s Love Story Countdown` : '💖 Love Story Countdown',
        todayMessage: (name) => name ? `🎉 CELEBRATING OUR LOVE TODAY, ${name.toUpperCase()}! FOREVER YOURS! 💖🥰` : '🎉 CELEBRATING OUR LOVE TODAY! FOREVER YOURS! 💖🥰',
        successSubtext: 'Every chapter with you is sweeter than the last. I love you! 💖✨'
    },
    other: {
        id: 'other',
        label: 'Special Celebration',
        icon: '✍️',
        emoji: '✍️',
        badge: '✨ SPECIAL CELEBRATION',
        acceptText: 'Yes, Absolutely!',
        acceptEmoji: '✨',
        getHeading: (name, title) => {
            if (title && title.trim()) {
                return name ? `${name}, will you celebrate "${title}" with me? ✨` : `Will you celebrate "${title}" with me? ✨`;
            }
            return name ? `${name}, will you celebrate with me? ✨` : 'Will you celebrate with me? ✨';
        },
        getSubMessage: () => 'A unique milestone made especially for us...',
        getSuccessHeading: (name) => name ? `Yaaay, ${name}! You said YES! 🎉✨` : 'You said YES! 🎉✨',
        countdownTitle: (name, title) => {
            const t = (title && title.trim()) ? title.trim() : 'Celebration';
            return name ? `✨ ${name}'s ${t} Countdown` : `✨ ${t} Countdown`;
        },
        todayMessage: (name, title) => {
            const t = (title && title.trim()) ? title.trim().toUpperCase() : 'CELEBRATION';
            return name ? `🎉 TODAY IS ${name.toUpperCase()}'S ${t}! WISHING YOU INFINITE JOY! ✨🥂` : `🎉 TODAY IS ${t}! WISHING YOU INFINITE JOY! ✨🥂`;
        },
        successSubtext: "Some milestones hold a magic that is uniquely ours. Here's to making memories! 🥂✨"
    }
};
