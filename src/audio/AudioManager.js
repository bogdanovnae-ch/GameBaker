/**
 * Sound hooks. Files can be assigned later without changing game logic.
 * Playback is off until `enabled` is true and clips are loaded.
 */
export class AudioManager {
  constructor() {
    this.enabled = false;
    this.muted = true;
    this.clips = {
      catch: null,
      miss: null,
      lifeLost: null,
      levelUp: null,
      gameOver: null,
      music: null,
    };
  }

  load(map = {}) {
    Object.keys(this.clips).forEach((key) => {
      if (!map[key]) return;
      const audio = new Audio(map[key]);
      audio.preload = 'auto';
      if (key === 'music') audio.loop = true;
      this.clips[key] = audio;
    });
  }

  play(name) {
    if (!this.enabled || this.muted) return;
    const clip = this.clips[name];
    if (!clip) return;
    clip.currentTime = 0;
    clip.play().catch(() => {});
  }

  startMusic() {
    if (!this.enabled || this.muted) return;
    const music = this.clips.music;
    if (!music) return;
    music.play().catch(() => {});
  }

  stopMusic() {
    const music = this.clips.music;
    if (!music) return;
    music.pause();
    music.currentTime = 0;
  }
}
