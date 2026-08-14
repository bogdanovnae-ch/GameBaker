import { positionFromKeyEvent } from '../config/controls.js';

export class Controls {
  constructor(game) {
    this.game = game;
    this._onKey = this._onKey.bind(this);
    this._bindKeyboard();
    this._bindButtons();
    this._bindScreens();
  }

  _bindKeyboard() {
    window.addEventListener('keydown', this._onKey);
  }

  _onKey(event) {
    if (event.repeat) return;

    if (event.key === 'Enter' || event.code === 'Space') {
      if (this.game.state === 'start' || this.game.state === 'gameover') {
        event.preventDefault();
        this.game.start();
      }
      return;
    }

    if (event.code === 'Escape' || event.key === 'Escape') {
      if (this.game.state === 'playing' || this.game.state === 'paused') {
        event.preventDefault();
        this.game.togglePause();
      }
      return;
    }

    const positionId = positionFromKeyEvent(event);
    if (!positionId) return;
    event.preventDefault();
    this.game.input(positionId);
  }

  _bindButtons() {
    document.querySelectorAll('[data-pos]').forEach((button) => {
      const fire = (event) => {
        event.preventDefault();
        this.game.input(button.dataset.pos);
      };
      button.addEventListener('pointerdown', fire);
    });
  }

  _bindScreens() {
    const bindTap = (id, handler) => {
      const el = document.getElementById(id);
      if (!el) return;
      let last = 0;
      const fire = (event) => {
        event.preventDefault();
        const now = Date.now();
        if (now - last < 400) return;
        last = now;
        handler();
      };
      el.addEventListener('pointerup', fire);
      el.addEventListener('click', fire);
    };
    bindTap('pause-btn', () => this.game.togglePause());
    bindTap('resume-btn', () => this.game.togglePause());
  }
}
