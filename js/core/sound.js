/**
 * Sound and Music Service
 * Zero-dependency procedural Web Audio API tone synthesizer
 * and background celebration audio player.
 */

class SoundService {
    constructor() {
        this.ctx = null;
        this.audioEl = null;
        this.musicToggleBtn = null;
        this.musicLabel = null;
        this.fadeTimer = null;
    }

    /**
     * Lazy-initializes the Web Audio Context on first user interaction.
     */
    initContext() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    /**
     * Binds DOM audio and control elements.
     */
    initAudioElements(audioElementId = 'birthday-audio', toggleBtnId = 'music-toggle-btn', labelId = 'music-label') {
        if (typeof document === 'undefined') return;
        this.audioEl = document.getElementById(audioElementId);
        this.musicToggleBtn = document.getElementById(toggleBtnId);
        this.musicLabel = document.getElementById(labelId);

        if (this.musicToggleBtn && this.audioEl) {
            this.musicToggleBtn.addEventListener('click', () => {
                this.toggleCelebrationMusic();
            });
        }
    }

    /**
     * Plays the cute pop sound when the deny button dodges.
     */
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

    /**
     * Plays ascending celebration chime notes.
     */
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

    /**
     * Plays sound effect when toggling dark/light theme mode.
     * @param {boolean} isDark
     */
    playThemeToggleSound(isDark) {
        try {
            this.initContext();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            if (isDark) {
                // Deep descending tone for dark mode
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.18); // G4
            } else {
                // Bright ascending tone for daylight mode
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

    /**
     * Starts celebration background music with smooth volume fade-in.
     * @param {string} [occasionName='Celebration']
     */
    playCelebrationMusic(occasionName = 'Celebration') {
        if (!this.audioEl) return;
        try {
            if (this.fadeTimer) clearInterval(this.fadeTimer);
            this.audioEl.currentTime = 0;
            this.audioEl.volume = 0;
            const playPromise = this.audioEl.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    let vol = 0;
                    this.fadeTimer = setInterval(() => {
                        vol = Math.min(vol + 0.06, 0.75);
                        if (this.audioEl) this.audioEl.volume = parseFloat(vol.toFixed(2));
                        if (vol >= 0.75) {
                            clearInterval(this.fadeTimer);
                            this.fadeTimer = null;
                        }
                    }, 80);

                    if (this.musicToggleBtn) {
                        this.musicToggleBtn.classList.remove('is-paused');
                    }
                    if (this.musicLabel) {
                        this.musicLabel.textContent = `${occasionName} Music: Playing 🎶`;
                    }
                }).catch((err) => {
                    console.log('Audio playback waiting for user interaction:', err);
                    if (this.musicToggleBtn) {
                        this.musicToggleBtn.classList.add('is-paused');
                    }
                    if (this.musicLabel) {
                        this.musicLabel.textContent = `Tap to Play ${occasionName} Music 🎶`;
                    }
                });
            }
        } catch (e) {
            console.error('Audio playback error:', e);
        }
    }

    /**
     * Toggles celebration audio pause/play state.
     * @param {string} [occasionName='Celebration']
     */
    toggleCelebrationMusic(occasionName = 'Celebration') {
        if (!this.audioEl) return;
        if (this.audioEl.paused) {
            this.audioEl.play().then(() => {
                if (this.musicToggleBtn) this.musicToggleBtn.classList.remove('is-paused');
                if (this.musicLabel) this.musicLabel.textContent = `${occasionName} Music: Playing 🎶`;
            }).catch(() => {});
        } else {
            this.audioEl.pause();
            if (this.musicToggleBtn) this.musicToggleBtn.classList.add('is-paused');
            if (this.musicLabel) this.musicLabel.textContent = `${occasionName} Music: Paused ⏸️`;
        }
    }

    /**
     * Stops celebration music and resets playback position.
     */
    stopCelebrationMusic() {
        if (this.fadeTimer) clearInterval(this.fadeTimer);
        if (this.audioEl) {
            this.audioEl.pause();
            this.audioEl.currentTime = 0;
        }
        if (this.musicToggleBtn) {
            this.musicToggleBtn.classList.add('is-paused');
        }
    }
}

export const sound = new SoundService();
