/**
 * Bear Emotion State Machine Configuration
 * Defines emotion levels, icons, moods, CSS animation classes, and reactive speech bubbles.
 */

export const BEAR_EMOTIONS = [
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

export const SUCCESS_EMOTION = {
    icon: '🎉',
    mood: 'Overjoyed',
    className: 'bear-joy',
    speech: 'YAAAY! BEST DECISION EVER! 🥳💖'
};
