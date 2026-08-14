import { POSITION_IDS, WORLD } from './constants.js';

/**
 * Four shortened chutes. Catch points match PLAYER_POSES baskets.
 */
export const TRAJECTORIES = [
  {
    id: 'left-upper',
    side: 'left',
    height: 'upper',
    direction: 'down-right',
    catchPosition: POSITION_IDS.UPPER_LEFT,
    speedMultiplier: 1,
    catchStart: 0.78,
    catchEnd: 1,
    roll: [
      { x: 0.12, y: 0.18 },
      { x: 0.2, y: 0.26 },
      { x: 0.28, y: 0.35 },
      { x: 0.372, y: 0.438 },
    ],
    fall: [
      { x: 0.372, y: 0.438 },
      { x: 0.4, y: 0.58 },
      { x: 0.43, y: 0.84 },
    ],
  },
  {
    id: 'left-lower',
    side: 'left',
    height: 'lower',
    direction: 'down-right',
    catchPosition: POSITION_IDS.LOWER_LEFT,
    speedMultiplier: 1,
    catchStart: 0.78,
    catchEnd: 1,
    roll: [
      { x: 0.12, y: 0.44 },
      { x: 0.2, y: 0.51 },
      { x: 0.28, y: 0.58 },
      { x: 0.37, y: 0.648 },
    ],
    fall: [
      { x: 0.37, y: 0.648 },
      { x: 0.4, y: 0.78 },
      { x: 0.425, y: 0.92 },
    ],
  },
  {
    id: 'right-upper',
    side: 'right',
    height: 'upper',
    direction: 'down-left',
    catchPosition: POSITION_IDS.UPPER_RIGHT,
    speedMultiplier: 1,
    catchStart: 0.78,
    catchEnd: 1,
    roll: [
      { x: 0.88, y: 0.18 },
      { x: 0.8, y: 0.26 },
      { x: 0.72, y: 0.35 },
      { x: 0.628, y: 0.438 },
    ],
    fall: [
      { x: 0.628, y: 0.438 },
      { x: 0.6, y: 0.58 },
      { x: 0.57, y: 0.84 },
    ],
  },
  {
    id: 'right-lower',
    side: 'right',
    height: 'lower',
    direction: 'down-left',
    catchPosition: POSITION_IDS.LOWER_RIGHT,
    speedMultiplier: 1,
    catchStart: 0.78,
    catchEnd: 1,
    roll: [
      { x: 0.88, y: 0.44 },
      { x: 0.8, y: 0.51 },
      { x: 0.72, y: 0.58 },
      { x: 0.63, y: 0.648 },
    ],
    fall: [
      { x: 0.63, y: 0.648 },
      { x: 0.6, y: 0.78 },
      { x: 0.575, y: 0.92 },
    ],
  },
];

export function toWorldPoint(point, width = WORLD.width, height = WORLD.height) {
  return { x: point.x * width, y: point.y * height };
}

export function toWorldPoints(points, width = WORLD.width, height = WORLD.height) {
  return points.map((point) => toWorldPoint(point, width, height));
}

export function getWorldTrajectories(width = WORLD.width, height = WORLD.height) {
  return TRAJECTORIES.map((traj) => ({
    ...traj,
    rollPoints: toWorldPoints(traj.roll, width, height),
    fallPoints: toWorldPoints(traj.fall, width, height),
  }));
}
