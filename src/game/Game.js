import { GAME_STATES, INITIAL_LIVES } from '../config/constants.js';
import { getLevelForScore } from '../config/levels.js';
import { getWorldTrajectories } from '../config/trajectories.js';
import { Player } from './Player.js';
import { SpawnController } from './spawn.js';
import { canCatchDessert } from './collision.js';
import { AudioManager } from '../audio/AudioManager.js';
import { SOUND_FILES } from '../config/sounds.js';

export class Game {
  constructor({ renderer, ui }) {
    this.renderer = renderer;
    this.ui = ui;
    this.audio = new AudioManager();
    this.audio.load(SOUND_FILES);
    this.trajectories = getWorldTrajectories();
    this.player = new Player();
    this.spawner = new SpawnController(this.trajectories);
    this.state = GAME_STATES.START;
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.level = getLevelForScore(0);
    this.desserts = [];
    this.effects = [];
    this.banner = null;
    this.time = 0;
    this.lastTime = 0;
    this.raf = 0;
    this.controlsEnabled = false;
  }

  boot() {
    this.ui.sync(this);
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame((t) => this._tick(t));
  }

  start() {
    this.score = 0;
    this.lives = INITIAL_LIVES;
    this.level = getLevelForScore(0);
    this.desserts = [];
    this.effects = [];
    this.banner = { text: this.level.name, age: 0 };
    this.player.reset();
    this.spawner.reset();
    this.state = GAME_STATES.PLAYING;
    this.controlsEnabled = true;
    this.lastTime = performance.now();
    this.audio.startMusic();
    this.ui.sync(this);
  }

  togglePause() {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
      this.controlsEnabled = false;
      this.ui.sync(this);
      return;
    }
    if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
      this.controlsEnabled = true;
      this.lastTime = performance.now();
      this.ui.sync(this);
    }
  }

  input(positionId) {
    if (this.state !== GAME_STATES.PLAYING || !this.controlsEnabled) return;
    this.player.applyPosition(positionId);
  }

  _tick(now) {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.time += this.state === GAME_STATES.PAUSED ? 0 : dt;

    if (this.state === GAME_STATES.PLAYING) {
      this._update(dt);
    } else if (this.state === GAME_STATES.START) {
      this.player.update(dt);
    }

    this.renderer.draw(this);
    this.raf = requestAnimationFrame((t) => this._tick(t));
  }

  _update(dt) {
    this.player.update(dt);
    this._updateLevel();

    const spawned = this.spawner.update(dt, {
      desserts: this.desserts.filter((d) => d.state === 'rolling'),
      level: this.level,
    });
    if (spawned) this.desserts.push(spawned);

    this.desserts.forEach((dessert) => {
      dessert.update(dt);
      if (canCatchDessert(dessert, this.player)) {
        this._catch(dessert);
      } else if (dessert.state === 'rolling' && dessert.progress >= 1) {
        this._miss(dessert);
      }
    });

    this.desserts = this.desserts.filter((d) => d.alive);
    this._updateEffects(dt);

    if (this.banner) {
      this.banner.age += dt;
      if (this.banner.age > 1.5) this.banner = null;
    }

    this.ui.sync(this);
  }

  _updateLevel() {
    const next = getLevelForScore(this.score);
    if (next.id !== this.level.id) {
      this.level = next;
      this.banner = { text: next.name, age: 0 };
      this.audio.play('levelUp');
    }
  }

  _catch(dessert) {
    dessert.catch();
    this.score += dessert.type.points;
    const pos = dessert.getPosition();
    this.effects.push({
      kind: 'text',
      text: `+${dessert.type.points}`,
      x: pos.x,
      y: pos.y - 18,
      vx: 0,
      vy: -40,
      age: 0,
      life: 0.7,
    });
    this._burst(pos.x, pos.y, ['#fff4c2', '#f4a6c8', '#8fd3c2']);
    this.audio.play('catch');
  }

  _miss(dessert) {
    dessert.miss();
    this.lives = Math.max(0, this.lives - 1);
    const pos = dessert.getPosition();
    this._burst(pos.x, pos.y, ['#c9843a', '#8a4f1e', '#f3d18a']);
    this.audio.play('miss');
    this.audio.play('lifeLost');
    if (this.lives <= 0) this._gameOver();
  }

  _gameOver() {
    this.state = GAME_STATES.GAMEOVER;
    this.controlsEnabled = false;
    this.audio.stopMusic();
    this.audio.play('gameOver');
    this.ui.sync(this);
  }

  _burst(x, y, colors) {
    for (let i = 0; i < 8; i += 1) {
      const angle = (Math.PI * 2 * i) / 8;
      this.effects.push({
        kind: 'crumb',
        x,
        y,
        vx: Math.cos(angle) * 70,
        vy: Math.sin(angle) * 70 - 20,
        size: 3 + Math.random() * 3,
        color: colors[i % colors.length],
        age: 0,
        life: 0.45,
      });
    }
  }

  _updateEffects(dt) {
    this.effects.forEach((fx) => {
      fx.age += dt;
      fx.x += fx.vx * dt;
      fx.y += fx.vy * dt;
    });
    this.effects = this.effects.filter((fx) => fx.age < fx.life);
  }
}
