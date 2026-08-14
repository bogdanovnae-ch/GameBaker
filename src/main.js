import { loadSprites } from './assets/sprites.js';
import { Game } from './game/Game.js';
import { Renderer } from './ui/Renderer.js';
import { UI } from './ui/UI.js';
import { Controls } from './ui/Controls.js';

function isDesktop() {
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const noTouch = navigator.maxTouchPoints === 0;
  return finePointer || canHover || noTouch;
}

function applyDeviceClass() {
  document.documentElement.classList.toggle('is-desktop', isDesktop());
}

function preventScroll() {
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.target.closest('button')) return;
      event.preventDefault();
    },
    { passive: false },
  );
}

async function boot() {
  applyDeviceClass();
  preventScroll();
  await loadSprites();

  const canvas = document.getElementById('game-canvas');
  const renderer = new Renderer(canvas);
  const ui = new UI();
  const game = new Game({ renderer, ui });
  window.__game = game;
  window.startGame = () => game.start();
  new Controls(game);
  game.boot();
  if (window.__pendingStart) game.start();
}

boot().catch((error) => {
  console.error(error);
});
