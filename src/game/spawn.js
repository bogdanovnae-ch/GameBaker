import { pickWeightedDessert } from '../config/desserts.js';
import { Dessert } from './Dessert.js';

export class SpawnController {
  constructor(trajectories) {
    this.trajectories = trajectories;
    this.timer = 0;
  }

  reset() {
    this.timer = 0.4;
  }

  update(dt, { desserts, level }) {
    this.timer += dt;
    if (desserts.length >= level.maxConcurrent) return null;
    if (this.timer < level.spawnInterval) return null;

    const trajectory = this._pickTrajectory(desserts);
    if (!trajectory) return null;

    this.timer = 0;
    const type = pickWeightedDessert();
    const speed = level.speed * (trajectory.speedMultiplier || 1);
    return new Dessert({ type, trajectory, speed });
  }

  _pickTrajectory(desserts) {
    const busyNearStart = new Set(
      desserts
        .filter((item) => item.state === 'rolling' && item.progress < 0.42)
        .map((item) => item.trajectory.id),
    );

    const free = this.trajectories.filter((traj) => !busyNearStart.has(traj.id));
    const pool = free.length ? free : this.trajectories;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
