/**
 * Procedural bakery music and short cues via Web Audio.
 * Starts on the first player tap (browser autoplay rules).
 */
const MELODY = [
  523.25, 659.25, 783.99, 659.25,
  698.46, 523.25, 659.25, 392.0,
  523.25, 659.25, 987.77, 783.99,
  880.0, 698.46, 659.25, 523.25,
];

export class AudioManager {
  constructor() {
    this.enabled = true;
    this.muted = false;
    this.ctx = null;
    this.master = null;
    this.musicPlaying = false;
    this.musicTimer = 0;
    this.noteIndex = 0;
  }

  load() {}

  unlock() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;
    if (!this.ctx) {
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.16;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  play(name) {
    if (!this.enabled || this.muted) return;
    this.unlock();
    if (!this.ctx) return;
    if (name === 'catch') this._blip(760, 0.09, 'triangle', 0.12);
    else if (name === 'miss' || name === 'lifeLost') this._hurt();
    else if (name === 'levelUp') this._blip(520, 0.16, 'triangle', 0.1);
    else if (name === 'gameOver') this._hurt(220);
  }

  startMusic() {
    if (!this.enabled || this.muted) return;
    this.unlock();
    if (!this.ctx) return;
    this.musicPlaying = true;
    this.noteIndex = 0;
    this._tickMusic();
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = 0;
    }
  }

  _tickMusic() {
    if (!this.musicPlaying || !this.ctx) return;
    const freq = MELODY[this.noteIndex % MELODY.length];
    this.noteIndex += 1;
    this._blip(freq, 0.22, 'triangle', 0.05);
    if (this.noteIndex % 2 === 0) this._blip(freq / 2, 0.22, 'sine', 0.03);
    this.musicTimer = setTimeout(() => this._tickMusic(), 280);
  }

  _blip(freq, duration, type, gainValue) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.ctx.currentTime + duration + 0.02);
  }

  _hurt(start = 280) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(start, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.24);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  }
}
