import { loadSprites } from './assets/sprites.js';
import { Game } from './game/Game.js';
import { Renderer } from './ui/Renderer.js';
import { UI } from './ui/UI.js';
import { Controls } from './ui/Controls.js';
import { watchViewport } from './ui/viewport.js';
import { preventPageScroll } from './ui/input.js';

function showBootError(error) {
  const title = document.querySelector('#start-screen h1');
  const button = document.getElementById('play-btn');
  if (title) title.textContent = 'Не удалось загрузить игру';
  if (button) {
    button.textContent = 'Обновите страницу';
    button.onclick = function () {
      window.location.reload();
    };
  }
  console.error(error);
}

async function boot() {
  preventPageScroll();

  const canvas = document.getElementById('game-canvas');
  if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
    throw new Error('Canvas is not supported');
  }

  await loadSprites();

  const renderer = new Renderer(canvas);
  const ui = new UI();
  const game = new Game({ renderer: renderer, ui: ui });
  window.__game = game;
  window.startGame = function () {
    game.start();
  };
  new Controls(game);
  game.boot();
  if (window.__pendingStart) game.start();

  watchViewport(function () {
    renderer.fit();
  });
}

boot().catch(showBootError);
