/**
 * Bear Mascot & Emotion UI Component
 * Controls the animated jumping bear asset, reactive emotion badges,
 * dynamic speech bubble copy, and aspect-ratio CSS variables.
 */

import { BEAR_EMOTIONS, SUCCESS_EMOTION } from '../config/emotions.js';
import { OCCASIONS, getBearAssetsForState } from '../config/occasions.js';
import { appState } from '../core/state.js';

let mainGif = null;
let visualContainer = null;
let bearSpeechText = null;
let bearEmotionIcon = null;
let bearEmotionText = null;

const ANIMATION_CLASSES = [
    'bear-neutral',
    'bear-curious',
    'bear-surprised',
    'bear-playful',
    'bear-pleading',
    'bear-dizzy',
    'bear-dramatic',
    'bear-joy'
];

export function updateVisualAspectRatio() {
    if (!mainGif || !visualContainer) return;

    let naturalW = mainGif.naturalWidth;
    let naturalH = mainGif.naturalHeight;

    // Fallback to HTML width/height attributes if naturalWidth not yet ready
    if (!naturalW || !naturalH) {
        naturalW = parseFloat(mainGif.getAttribute('width')) || 240;
        naturalH = parseFloat(mainGif.getAttribute('height')) || 200;
    }

    if (naturalW > 0 && naturalH > 0) {
        const ratio = naturalW / naturalH;
        visualContainer.style.setProperty('--img-ratio', `${naturalW} / ${naturalH}`);
        visualContainer.dataset.aspectRatio = ratio.toFixed(2);

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

export function setBearEmotionDisplay(icon, mood, animClass, speechText) {
    if (bearEmotionIcon) bearEmotionIcon.textContent = icon;
    if (bearEmotionText) bearEmotionText.textContent = `Mood: ${mood}`;
    if (bearSpeechText) bearSpeechText.textContent = speechText;

    if (mainGif) {
        ANIMATION_CLASSES.forEach(cls => mainGif.classList.remove(cls));
        if (animClass) mainGif.classList.add(animClass);
    }
}

export function updateBearEmotion(dodgeNum) {
    const state = appState.getState();
    if (state.isAccepted) {
        setBearEmotionDisplay(
            SUCCESS_EMOTION.icon,
            SUCCESS_EMOTION.mood,
            SUCCESS_EMOTION.className,
            SUCCESS_EMOTION.speech
        );
        return;
    }

    const emotion = BEAR_EMOTIONS.find(e => dodgeNum >= e.minDodge && dodgeNum <= e.maxDodge) || BEAR_EMOTIONS[0];
    const speechText = typeof emotion.speech === 'function' ? emotion.speech(state.recipient) : emotion.speech;
    setBearEmotionDisplay(emotion.icon, emotion.mood, emotion.className, speechText);
}

export function updateBearAsset(isAccepted = false) {
    if (!mainGif) return;
    const state = appState.getState();
    const assets = getBearAssetsForState(state);

    const targetSrc = isAccepted ? assets.success : assets.normal;
    if (targetSrc && mainGif.getAttribute('src') !== targetSrc) {
        mainGif.src = targetSrc;
    }
}

export function initBear() {
    mainGif = document.getElementById('main-gif');
    visualContainer = document.getElementById('visual-container');
    bearSpeechText = document.getElementById('bear-speech-text');
    bearEmotionIcon = document.getElementById('bear-emotion-icon');
    bearEmotionText = document.getElementById('bear-emotion-text');

    if (mainGif) {
        mainGif.addEventListener('load', updateVisualAspectRatio);
        if (mainGif.complete) {
            updateVisualAspectRatio();
        }
    }

    // Subscribe to state changes for recipient updates or occasion changes
    appState.subscribe((newState, oldState, changedKeys) => {
        if (changedKeys.includes('occasion') || changedKeys.includes('isAccepted')) {
            updateBearAsset(newState.isAccepted);
        }
        if (changedKeys.includes('denyCount') || changedKeys.includes('recipient') || changedKeys.includes('isAccepted')) {
            updateBearEmotion(newState.denyCount);
        }
    });

    const state = appState.getState();
    updateBearAsset(state.isAccepted);
    updateBearEmotion(state.denyCount);
}
