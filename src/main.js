import { loadSprites } from './assets/sprites.js';
import { Game } from './game/Game.js';
import { Renderer } from './ui/Renderer.js';
import { UI } from './ui/UI.js';
import { Controls } from './ui/Controls.js';
import { watchOrientation } from './ui/orientation.js';

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

  watchOrientation(() => renderer.fit());
}

boot().catch((error) => {
  console.error(error);
});
