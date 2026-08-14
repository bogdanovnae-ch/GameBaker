import { CATCH_POP_DURATION, MISS_FALL_DURATION } from '../config/constants.js';
import { pointAlongPolyline, polylineLength } from './path.js';

export class Dessert {
  constructor({ type, trajectory, speed }) {
    this.type = type;
    this.trajectory = trajectory;
    this.speed = speed;
    this.progress = 0;
    this.state = 'rolling';
    this.rotation = 0;
    this.alive = true;
    this.animT = 0;
    this.fallProgress = 0;
    this.pointsAwarded = false;
    this.lifeTaken = false;
  }

  getPosition() {
    if (this.state === 'falling') {
      return pointAlongPolyline(this.trajectory.fallPoints, this.fallProgress);
    }
    return pointAlongPolyline(this.trajectory.rollPoints, this.progress);
  }

  update(dt) {
    if (!this.alive) return;

    if (this.state === 'rolling') {
      const length = polylineLength(this.trajectory.rollPoints);
      const delta = length <= 0 ? 1 : (this.speed * dt) / length;
      this.progress = Math.min(1, this.progress + delta);
      this.rotation += delta * 8;
      return;
    }

    if (this.state === 'falling') {
      this.fallProgress = Math.min(1, this.fallProgress + dt / MISS_FALL_DURATION);
      this.rotation += dt * 10;
      this.animT += dt;
      if (this.fallProgress >= 1) this.alive = false;
      return;
    }

    if (this.state === 'caught') {
      this.animT += dt;
      if (this.animT >= CATCH_POP_DURATION) this.alive = false;
    }
  }

  catch() {
    this.state = 'caught';
    this.animT = 0;
    this.pointsAwarded = true;
  }

  miss() {
    this.state = 'falling';
    this.fallProgress = 0;
    this.animT = 0;
    this.lifeTaken = true;
  }
}
