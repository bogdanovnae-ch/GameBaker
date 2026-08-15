import { WORLD } from '../config/constants.js';
import { DISPLAY } from '../config/display.js';
import { PLAYER_POSES } from '../config/positions.js';
import { SPRITES, getDessertSprite } from '../assets/sprites.js';
import { drawBackground, drawCatchSlots, drawChutes } from '../assets/draw/scene.js';
import { drawBaker } from '../assets/draw/baker.js';
import { drawDessert } from '../assets/draw/desserts.js';
import { applyViewport } from './viewport.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = 1;
    this.fit();
    window.addEventListener('resize', () => this.fit());
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => this.fit());
    }
  }

  fit() {
    applyViewport();
    const parent = this.canvas.parentElement;
    const rect = parent && parent.getBoundingClientRect ? parent.getBoundingClientRect() : null;
    const maxW = (rect && rect.width) || window.innerWidth || 320;
    const maxH = (rect && rect.height) || window.innerHeight || 180;
    const scale = Math.min(maxW / WORLD.width, maxH / WORLD.height);
    const cssW = Math.max(DISPLAY.minCanvas, Math.floor(WORLD.width * scale));
    const cssH = Math.max(DISPLAY.minCanvas, Math.floor(WORLD.height * scale));

    this.dpr = Math.min(window.devicePixelRatio || 1, DISPLAY.maxDpr);
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    this.canvas.width = Math.floor(WORLD.width * this.dpr);
    this.canvas.height = Math.floor(WORLD.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  draw(game) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, WORLD.width, WORLD.height);

    if (SPRITES.background.image) {
      ctx.drawImage(SPRITES.background.image, 0, 0, WORLD.width, WORLD.height);
    } else {
      drawBackground(ctx, WORLD, game.time);
    }

    if (SPRITES.chutes.image) {
      ctx.drawImage(SPRITES.chutes.image, 0, 0, WORLD.width, WORLD.height);
    } else {
      drawChutes(ctx, game.trajectories);
    }

    if (game.state !== 'start') {
      drawCatchSlots(ctx, PLAYER_POSES, game.player.positionId, WORLD);
    }

    game.desserts.forEach((dessert) => this._drawDessert(ctx, dessert));
    this._drawBaker(ctx, game);
    game.effects.forEach((fx) => this._drawEffect(ctx, fx));

    if (game.banner) this._drawBanner(ctx, game.banner);
  }

  _drawBaker(ctx, game) {
    const { visual } = game.player;
    if (SPRITES.baker.image) {
      const img = SPRITES.baker.image;
      const w = 140;
      const h = 180;
      ctx.save();
      ctx.translate(visual.bodyX, visual.bodyY);
      ctx.scale(visual.facing, 1);
      ctx.drawImage(img, -w / 2, -h * 0.55, w, h);
      ctx.restore();
      return;
    }
    drawBaker(ctx, {
      x: visual.bodyX,
      y: visual.bodyY,
      facing: visual.facing,
      basketX: visual.basketX,
      basketY: visual.basketY,
      time: game.time,
      lean: visual.lean,
      poseHeight: game.player.height,
      caughtItems: game.player.caught,
    });
  }

  _drawDessert(ctx, dessert) {
    const pos = dessert.getPosition();
    let scale = 1;
    let alpha = 1;

    if (dessert.state === 'caught') {
      scale = 1 + dessert.animT * 1.6;
      alpha = Math.max(0, 1 - dessert.animT / 0.45);
    } else if (dessert.state === 'falling') {
      scale = 1 - dessert.fallProgress * 0.25;
      alpha = 1 - dessert.fallProgress * 0.35;
    }

    ctx.save();
    ctx.globalAlpha = alpha;
    const sprite = getDessertSprite(dessert.type.id);
    if (sprite) {
      ctx.translate(pos.x, pos.y);
      ctx.rotate(dessert.rotation);
      ctx.scale(scale, scale);
      ctx.drawImage(sprite, -20, -20, 40, 40);
    } else {
      drawDessert(ctx, dessert.type.id, pos.x, pos.y, dessert.rotation, scale);
    }
    ctx.restore();
  }

  _drawEffect(ctx, fx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - fx.age / fx.life);
    if (fx.kind === 'text') {
      ctx.font = '700 22px Fredoka, Nunito, sans-serif';
      ctx.fillStyle = '#fff6c2';
      ctx.strokeStyle = '#8a4a12';
      ctx.lineWidth = 4;
      ctx.textAlign = 'center';
      ctx.strokeText(fx.text, fx.x, fx.y);
      ctx.fillText(fx.text, fx.x, fx.y);
    } else if (fx.kind === 'crumb') {
      ctx.fillStyle = fx.color;
      ctx.beginPath();
      ctx.arc(fx.x, fx.y, fx.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  _drawBanner(ctx, banner) {
    const alpha = banner.age < 0.2 ? banner.age / 0.2 : Math.max(0, 1 - (banner.age - 1.1) / 0.4);
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = 'rgba(90, 40, 16, 0.72)';
    ctx.fillRect(WORLD.width * 0.25, WORLD.height * 0.38, WORLD.width * 0.5, 64);
    ctx.font = '700 28px Fredoka, Nunito, sans-serif';
    ctx.fillStyle = '#fff4d2';
    ctx.textAlign = 'center';
    ctx.fillText(banner.text, WORLD.width / 2, WORLD.height * 0.38 + 42);
    ctx.restore();
  }
}
