import { GAME_STATES } from '../config/constants.js';

export class UI {
  constructor() {
    this.root = document.getElementById('app');
    this.scoreEl = document.getElementById('score-value');
    this.levelEl = document.getElementById('level-value');
    this.livesEl = document.getElementById('lives');
    this.startScreen = document.getElementById('start-screen');
    this.pauseOverlay = document.getElementById('pause-overlay');
    this.gameoverScreen = document.getElementById('gameover-screen');
    this.finalScoreEl = document.getElementById('final-score');
    this.pauseBtn = document.getElementById('pause-btn');
    this.hurtFlash = document.getElementById('hurt-flash');
  }

  flashHurt(onDesktop) {
    if (!onDesktop || !this.hurtFlash) return;
    this.hurtFlash.classList.remove('on');
    void this.hurtFlash.offsetWidth;
    this.hurtFlash.classList.add('on');
  }

  sync(game) {
    this.scoreEl.textContent = String(game.score).padStart(4, '0');
    this.levelEl.textContent = String(game.level.id);
    this._renderLives(game.lives);

    const playing = game.state === GAME_STATES.PLAYING || game.state === GAME_STATES.PAUSED;
    this.startScreen.classList.toggle('hidden', game.state !== GAME_STATES.START);
    this.pauseOverlay.classList.toggle('hidden', game.state !== GAME_STATES.PAUSED);
    this.gameoverScreen.classList.toggle('hidden', game.state !== GAME_STATES.GAMEOVER);
    this.pauseBtn.classList.toggle('hidden', !playing);
    this.pauseBtn.setAttribute('aria-pressed', game.state === GAME_STATES.PAUSED ? 'true' : 'false');
    this.root.dataset.state = game.state;

    if (game.state === GAME_STATES.GAMEOVER) {
      this.finalScoreEl.textContent = String(game.score).padStart(4, '0');
    }
  }

  _renderLives(lives) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21s-6.7-4.35-9.33-8.1C.4 9.9 1.15 5.8 4.6 4.35 6.7 3.45 9.05 4.1 12 6.4c2.95-2.3 5.3-2.95 7.4-2.05 3.45 1.45 4.2 5.55 1.93 8.55C18.7 16.65 12 21 12 21z"/></svg>';
    const hearts = [0, 1, 2].map((i) => {
      const on = i < lives;
      return `<span class="heart ${on ? 'on' : 'off'}">${icon}</span>`;
    });
    this.livesEl.innerHTML = hearts.join('');
    this.livesEl.setAttribute('aria-label', `Жизни: ${lives}`);
  }
}
