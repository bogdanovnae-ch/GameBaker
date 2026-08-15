import { positionFromKeyEvent } from '../config/controls.js';
import { bindPress, bindTap } from './input.js';

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
    const buttons = document.querySelectorAll('[data-pos]');
    for (let i = 0; i < buttons.length; i += 1) {
      const button = buttons[i];
      bindPress(button, function () {
        this.game.input(button.dataset.pos);
      }.bind(this));
    }
  }

  _bindScreens() {
    bindTap(document.getElementById('pause-btn'), () => this.game.togglePause());
    bindTap(document.getElementById('resume-btn'), () => this.game.togglePause());
  }
}
