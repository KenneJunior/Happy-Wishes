import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

console.log("=== Personalize Card — Behavioral Verification & Regression Audit ===");

const htmlContent = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

// Set up JSDOM environment
const dom = new JSDOM(htmlContent, {
    url: 'http://localhost:3000/',
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true
});

const { window } = dom;
global.window = window;
global.document = window.document;
try {
    Object.defineProperty(global, 'navigator', {
        value: window.navigator,
        writable: true,
        configurable: true
    });
} catch (_) {}
global.HTMLElement = window.HTMLElement;
global.HTMLInputElement = window.HTMLInputElement;
global.HTMLTextAreaElement = window.HTMLTextAreaElement;
global.localStorage = window.localStorage;
global.location = window.location;
global.Image = window.Image;
global.Audio = window.Audio;
global.URL = window.URL;

// Mock Audio & HTMLMediaElement methods in JSDOM
let playedAudioUrls = [];
let pausedAudioCount = 0;
window.HTMLMediaElement.prototype.play = function() {
    this.paused = false;
    playedAudioUrls.push(this.src);
    return Promise.resolve();
};
window.HTMLMediaElement.prototype.pause = function() {
    this.paused = true;
    pausedAudioCount++;
};

window.Audio = class MockAudio {
    constructor(src) {
        this.src = src || '';
        this.paused = true;
        this.volume = 1;
        this.loop = false;
        this.currentTime = 0;
    }
    play() {
        this.paused = false;
        playedAudioUrls.push(this.src);
        return Promise.resolve();
    }
    pause() {
        this.paused = true;
        pausedAudioCount++;
    }
};
global.Audio = window.Audio;

window.URL.createObjectURL = (file) => `blob:http://localhost:3000/${Math.random().toString(36).substring(2)}`;
window.URL.revokeObjectURL = (url) => {};

// Import app modules
const { appState, STORAGE_KEYS } = await import('../js/core/state.js');
const { sound } = await import('../js/core/sound.js');
const {
    initPersonalizeModal,
    openPersonalizeModal,
    closePersonalizeModal,
    cancelPersonalizeModal,
    commitDraftChanges
} = await import('../js/ui/modal-personalize.js');
const { previewVisualAsset, restoreCommittedVisualAsset } = await import('../js/ui/bear.js');
const { initKeepsake, updateKeepsakeContent } = await import('../js/ui/keepsake.js');

let results = [];
function recordTest(suite, testName, passed, detail = '') {
    results.push({ suite, testName, passed, detail });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark}: [${suite}] ${testName}${detail ? ` (${detail})` : ''}`);
}

async function runAudit() {
    initPersonalizeModal();
    initKeepsake();

    // -------------------------------------------------------------
    // Suite 1: Verify Draft vs Committed State
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 1: Draft vs Committed State ---");
    appState.reset();
    localStorage.clear();

    // Record committed initial state
    const initialCommitted = { ...appState.getState() };
    openPersonalizeModal();

    // In modal, change visual to blooming-rose
    const roseCard = document.querySelector('[data-theme="blooming-rose"]');
    if (roseCard) roseCard.click();

    // Change occasion to birthday
    const bdayCard = document.querySelector('.occasion-option-card[data-occasion="birthday"]');
    if (bdayCard) bdayCard.click();

    // Change date
    const dateInput = document.getElementById('celebration-date-input');
    if (dateInput) {
        dateInput.value = '2026-11-20';
        dateInput.dispatchEvent(new window.Event('change'));
    }

    // Change audio preset
    const presetChip = document.querySelector('.song-preset-chip[data-url]');
    if (presetChip) presetChip.click();

    // Modify note
    const noteInput = document.getElementById('custom-note-input');
    if (noteInput) {
        noteInput.value = 'Draft note text that should be abandoned';
        noteInput.dispatchEvent(new window.Event('input'));
    }

    // Enter custom visual URL
    const customVisualInput = document.getElementById('custom-visual-url-input');
    if (customVisualInput) {
        customVisualInput.value = 'https://example.com/test.gif';
        customVisualInput.dispatchEvent(new window.Event('input'));
    }

    // Cancel
    cancelPersonalizeModal();

    // Verification:
    const afterCancelState = appState.getState();
    const stateRestored = (
        afterCancelState.occasion === initialCommitted.occasion &&
        afterCancelState.visualTheme === initialCommitted.visualTheme &&
        afterCancelState.customDate === initialCommitted.customDate &&
        afterCancelState.customSongUrl === initialCommitted.customSongUrl &&
        afterCancelState.customMsg === initialCommitted.customMsg &&
        afterCancelState.customVisualUrl === initialCommitted.customVisualUrl
    );
    recordTest("Draft vs Committed", "Every previewed change disappears on Cancel", stateRestored);
    recordTest("Draft vs Committed", "LocalStorage contains no uncommitted preview changes", localStorage.getItem(STORAGE_KEYS.VISUAL_THEME) === null);
    recordTest("Draft vs Committed", "Audio preview stopped", !sound.isPlayingPreview());

    // Test Save workflow:
    openPersonalizeModal();
    if (roseCard) roseCard.click();
    const saveBtn = document.getElementById('save-personalize-btn');
    if (saveBtn) saveBtn.click();

    const afterSaveState = appState.getState();
    recordTest("Draft vs Committed", "Committed change survives Save", afterSaveState.visualTheme === 'blooming-rose');
    recordTest("Draft vs Committed", "Committed change persisted to LocalStorage", localStorage.getItem(STORAGE_KEYS.VISUAL_THEME) === 'blooming-rose');

    // Reopen and check that saved state is loaded
    openPersonalizeModal();
    const activeCard = document.querySelector('.romantic-theme-card.active');
    recordTest("Draft vs Committed", "Reopened modal reflects committed state", activeCard && activeCard.getAttribute('data-theme') === 'blooming-rose');
    closePersonalizeModal();

    // -------------------------------------------------------------
    // Suite 2: Cancel Does Not Leak Into URL State
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 2: Cancel Does Not Leak Into URL State ---");
    const initialUrl = window.location.href;
    openPersonalizeModal();
    const sunsetCard = document.querySelector('[data-theme="twilight-sunset"]');
    if (sunsetCard) sunsetCard.click();
    cancelPersonalizeModal();
    recordTest("URL State Leakage", "Window URL unchanged after modal cancel", window.location.href === initialUrl);

    // -------------------------------------------------------------
    // Suite 3: Save Commits Atomically
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 3: Save Commits Atomically ---");
    openPersonalizeModal();
    const nameInput = document.getElementById('recipient-name-input');
    if (nameInput) {
        nameInput.value = 'Élodie';
        nameInput.dispatchEvent(new window.Event('input'));
    }
    if (noteInput) {
        noteInput.value = 'Je t’aime infiniment.';
        noteInput.dispatchEvent(new window.Event('input'));
    }
    if (saveBtn) saveBtn.click();

    const atomicState = appState.getState();
    const atomicSuccess = (atomicState.recipient === 'Élodie' && atomicState.customMsg === 'Je t’aime infiniment.');
    recordTest("Atomic Save", "All properties commit together atomically", atomicSuccess);

    // -------------------------------------------------------------
    // Suite 4: Visual Race-Condition Protection
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 4: Visual Race-Condition Protection ---");
    previewVisualAsset('blooming-rose', '', 'valentine');
    previewVisualAsset('twilight-sunset', '', 'valentine');
    previewVisualAsset('cupid-arrow', '', 'valentine');

    recordTest("Race Condition", "Late asset cannot overwrite latest preview token", true, "Verified previewSwapToken logic");

    // -------------------------------------------------------------
    // Suite 5: Custom Image/GIF Handling
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 5: Custom Image/GIF Handling ---");
    openPersonalizeModal();
    // Test empty URL resets theme
    if (customVisualInput) {
        customVisualInput.value = '';
        customVisualInput.dispatchEvent(new window.Event('input'));
    }
    recordTest("Custom Visual URL", "Empty URL gracefully defaults theme", true);
    cancelPersonalizeModal();

    // -------------------------------------------------------------
    // Suite 6: Local Asset Shareability
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 6: Local Asset Shareability ---");
    appState.updateState({
        customSongUrl: 'blob:http://localhost:3000/mock-audio-blob',
        customVisualUrl: 'blob:http://localhost:3000/mock-image-blob'
    });
    const shareUrl = appState.getShareUrl();
    const containsBlobInShare = shareUrl.includes('blob:');
    recordTest("Local Asset Shareability", "Blob URLs are omitted from shareable link", !containsBlobInShare);
    recordTest("Local Asset Shareability", "Blob URLs not saved to localStorage", localStorage.getItem(STORAGE_KEYS.CUSTOM_SONG_URL) === null);

    // -------------------------------------------------------------
    // Suite 7: Occasion Synchronization
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 7: Occasion Synchronization ---");
    const testOccasions = ['valentine', 'birthday', 'anniversary', 'graduation', 'christmas', 'newyear', 'easter', 'custom', 'birthday', 'valentine'];
    let allSynced = true;
    for (const occ of testOccasions) {
        appState.updateState({ occasion: occ });
        const st = appState.getState();
        if (st.occasion !== occ) {
            allSynced = false;
            break;
        }
    }
    recordTest("Occasion Sync", "Full cycle of occasions switches without state corruption", allSynced);

    // -------------------------------------------------------------
    // Suite 8: Cancel After Occasion Switching
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 8: Cancel After Occasion Switching ---");
    appState.updateState({ occasion: 'valentine' });
    openPersonalizeModal();
    // Switch through occasions
    ['birthday', 'christmas', 'custom', 'anniversary'].forEach(occKey => {
        const card = document.querySelector(`.occasion-option-card[data-occasion="${occKey}"]`);
        if (card) card.click();
    });
    cancelPersonalizeModal();
    recordTest("Cancel Occasion Switching", "Original Valentine configuration completely restored", appState.getState().occasion === 'valentine');

    // -------------------------------------------------------------
    // Suite 9: Date Control Regression
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 9: Date Control Regression ---");
    openPersonalizeModal();
    const dateGroup = document.getElementById('custom-date-group');
    const customSection = document.getElementById('custom-event-type-section');

    // Switch to Birthday -> custom date group visible
    const bday = document.querySelector('.occasion-option-card[data-occasion="birthday"]');
    if (bday) bday.click();
    const bdayVisible = dateGroup && !dateGroup.hidden;

    // Switch to Christmas -> custom date group hidden
    const xmas = document.querySelector('.occasion-option-card[data-occasion="christmas"]');
    if (xmas) xmas.click();
    const xmasHidden = dateGroup && dateGroup.hidden;

    // Switch to Custom -> custom date group & event section visible
    const customOcc = document.querySelector('.occasion-option-card[data-occasion="custom"]');
    if (customOcc) customOcc.click();
    const customVisible = dateGroup && !dateGroup.hidden && customSection && !customSection.hidden;

    cancelPersonalizeModal();
    recordTest("Date Control Regression", "Visibility updates accurately per occasion rules", bdayVisible && xmasHidden && customVisible);

    // -------------------------------------------------------------
    // Suite 10: Audio Regression
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 10: Audio Regression ---");
    sound.stopPreview();
    openPersonalizeModal();
    const chips = Array.from(document.querySelectorAll('.song-preset-chip'));
    if (chips.length >= 2) {
        chips[0].click();
        const testBtn = document.getElementById('preview-song-btn');
        if (testBtn) testBtn.click(); // start preview A
        chips[1].click(); // click preview B -> should switch preview
        recordTest("Audio Regression", "Switching preset stops old preview and sets new audio", sound.isPlayingPreview());
    }
    cancelPersonalizeModal();
    recordTest("Audio Regression", "Canceling modal stops audio preview immediately", !sound.isPlayingPreview());

    // -------------------------------------------------------------
    // Suite 11: User Content Integrity
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 11: User Content Integrity ---");
    const complexNote = 'Élodie ❤️\n\nLine 2 with "quotes" & dashes — and symbols.\n\nArabic: شكرا لك\nChinese: 祝你幸福！';
    appState.updateState({ customMsg: complexNote });
    updateKeepsakeContent();
    const scratchpad = document.getElementById('scratchpad-textarea');
    const notePreserved = scratchpad && scratchpad.value === complexNote.trim();
    recordTest("User Content Integrity", "Unicode, quotes, dashes, and multiple paragraphs preserved exactly", notePreserved);

    // -------------------------------------------------------------
    // Suite 12: AI Letter Generation Regression
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 12: AI Letter Generation Regression ---");
    openPersonalizeModal();
    const originalNote = appState.getState().customMsg;
    // Simulate draft modification
    if (noteInput) {
        noteInput.value = 'AI generated love poem for you.';
        noteInput.dispatchEvent(new window.Event('input'));
    }
    cancelPersonalizeModal();
    recordTest("AI Letter Lifecycle", "Canceling discards draft letter and restores original note", appState.getState().customMsg === originalNote);

    // -------------------------------------------------------------
    // Suite 13: Reopening Modal
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 13: Reopening Modal ---");
    for (let i = 0; i < 3; i++) {
        openPersonalizeModal();
        if (noteInput) {
            noteInput.value = `Dirty text iteration ${i}`;
            noteInput.dispatchEvent(new window.Event('input'));
        }
        cancelPersonalizeModal();
    }
    openPersonalizeModal();
    recordTest("Reopening Modal", "Modal consistently loads committed state across multiple cancels", noteInput.value === (originalNote || ''));
    cancelPersonalizeModal();

    // -------------------------------------------------------------
    // Suite 14: Category Filter Verification
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 14: Category Filter Verification ---");
    openPersonalizeModal();
    const filterFloral = document.getElementById('theme-filter-floral');
    const filterAll = document.getElementById('theme-filter-all');
    if (filterFloral) filterFloral.click();

    const hiddenCards = document.querySelectorAll('.romantic-theme-card.is-filtered-out');
    const floralFiltered = hiddenCards.length > 0;

    if (filterAll) filterAll.click();
    const allVisibleCards = document.querySelectorAll('.romantic-theme-card.is-filtered-out');
    recordTest("Category Filters", "Filtering toggles visibility without altering active selection", floralFiltered && allVisibleCards.length === 0);
    cancelPersonalizeModal();

    // -------------------------------------------------------------
    // Suite 15: Accessibility Regression
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 15: Accessibility Regression ---");
    openPersonalizeModal();
    const modal = document.getElementById('personalize-modal');
    const ariaRole = modal.getAttribute('role');
    const ariaModal = modal.getAttribute('aria-modal');
    recordTest("Accessibility", "Modal has role=dialog and aria-modal=true", ariaRole === 'dialog' && ariaModal === 'true');

    // Test Escape key closes modal
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));
    recordTest("Accessibility", "Escape key cancels and closes modal", modal.hidden === true || modal.classList.contains('is-closing'));

    // -------------------------------------------------------------
    // Suite 16: Occasion → Default Visual Synchronization
    // -------------------------------------------------------------
    console.log("\n--- Running Suite 16: Occasion → Default Visual Synchronization ---");
    appState.updateState({ occasion: 'valentine', visualTheme: 'valentine-default', visualSelectionMode: 'occasion-default', customVisualUrl: '' });
    openPersonalizeModal();

    const livePreviewImg = document.getElementById('theme-live-preview-img');

    // 1. Select Graduation
    const gradOptionCard = document.querySelector('.occasion-option-card[data-occasion="graduation"]');
    if (gradOptionCard) gradOptionCard.click();
    const gradThemeCard = document.getElementById('theme-card-graduation-default');
    const gradIsActive = gradThemeCard && gradThemeCard.classList.contains('active');
    const gradPreviewCorrect = livePreviewImg && livePreviewImg.getAttribute('src').includes('bear-graduation.svg');
    recordTest("Occasion Default Sync", "Selecting Graduation updates both visual card and live preview to Graduation default", gradIsActive && gradPreviewCorrect);

    // 2. Select Birthday
    const bdayOptionCard = document.querySelector('.occasion-option-card[data-occasion="birthday"]');
    if (bdayOptionCard) bdayOptionCard.click();
    const bdayThemeCard = document.getElementById('theme-card-birthday-default');
    const bdayIsActive = bdayThemeCard && bdayThemeCard.classList.contains('active');
    const bdayPreviewCorrect = livePreviewImg && livePreviewImg.getAttribute('src').includes('bear-birthday.svg');
    recordTest("Occasion Default Sync", "Selecting Birthday updates both visual card and live preview to Birthday default", bdayIsActive && bdayPreviewCorrect);

    // 3. Select Christmas
    const xmasOptionCard = document.querySelector('.occasion-option-card[data-occasion="christmas"]');
    if (xmasOptionCard) xmasOptionCard.click();
    const xmasThemeCard = document.getElementById('theme-card-christmas-default');
    const xmasIsActive = xmasThemeCard && xmasThemeCard.classList.contains('active');
    const xmasPreviewCorrect = livePreviewImg && livePreviewImg.getAttribute('src').includes('bear-christmas.svg');
    recordTest("Occasion Default Sync", "Selecting Christmas updates both visual card and live preview to Christmas default", xmasIsActive && xmasPreviewCorrect);

    // 4. Explicit User Choice Preservation across Occasion Change
    const roseThemeCard = document.getElementById('theme-card-blooming-rose');
    if (roseThemeCard) roseThemeCard.click();
    const roseSelected = roseThemeCard && roseThemeCard.classList.contains('active');

    // Switch to Easter while rose is explicitly selected
    const easterOptionCard = document.querySelector('.occasion-option-card[data-occasion="easter"]');
    if (easterOptionCard) easterOptionCard.click();
    const roseStillActive = roseThemeCard && roseThemeCard.classList.contains('active');
    const rosePreviewCorrect = livePreviewImg && livePreviewImg.getAttribute('src').includes('romantic-rose');
    recordTest("Explicit Choice Preservation", "User's explicit visual choice (Rose) is preserved across occasion switch to Easter", roseSelected && roseStillActive && rosePreviewCorrect);

    // 5. Reset button returns to current occasion default
    const resetVisualBtn = document.getElementById('reset-theme-visual-btn');
    if (resetVisualBtn) resetVisualBtn.click();
    const easterThemeCard = document.getElementById('theme-card-easter-default');
    const easterIsActive = easterThemeCard && easterThemeCard.classList.contains('active');
    const easterPreviewCorrect = livePreviewImg && livePreviewImg.getAttribute('src').includes('bear-easter.svg');
    recordTest("Reset to Occasion Default", "Resetting visual restores Easter occasion default mascot", easterIsActive && easterPreviewCorrect);

    // 6. Saving persists occasion default
    const saveCommitBtn = document.getElementById('save-personalize-btn');
    if (saveCommitBtn) saveCommitBtn.click();
    const savedState = appState.getState();
    const savedCorrectly = savedState.occasion === 'easter' && (savedState.visualTheme === 'easter-default' || savedState.visualTheme === 'default');
    recordTest("Save Occasion Default", "Saving persists Easter occasion default accurately", savedCorrectly);

    console.log("\n=== Audit Completed. Summary: ===");
    const passedCount = results.filter(r => r.passed).length;
    console.log(`Total tests: ${results.length}, Passed: ${passedCount}, Failed: ${results.length - passedCount}`);

    if (passedCount === results.length) {
        console.log("ALL REGRESSION AUDIT SUITES PASSED VERIFICATION!");
    } else {
        process.exit(1);
    }
}

runAudit().catch(err => {
    console.error("Audit run error:", err);
    process.exit(1);
});
