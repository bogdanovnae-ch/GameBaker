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
    const hearts = [0, 1, 2].map((i) => {
      const on = i < lives;
      return `<span class="heart ${on ? 'on' : 'off'}" aria-hidden="true">❤</span>`;
    });
    this.livesEl.innerHTML = hearts.join('');
    this.livesEl.setAttribute('aria-label', `Жизни: ${lives}`);
  }
}
