/**
 * Difficulty steps. Game logic only reads these values; tune speed and spawn here.
 * `scoreThreshold` is the score at which this level becomes active.
 */
export const LEVELS = [
  {
    id: 1,
    name: 'Уровень 1',
    scoreThreshold: 0,
    speed: 118,
    spawnInterval: 1.7,
    maxConcurrent: 2,
    hazardChance: 0.14,
  },
  {
    id: 2,
    name: 'Уровень 2',
    scoreThreshold: 120,
    speed: 152,
    spawnInterval: 1.15,
    maxConcurrent: 3,
    hazardChance: 0.2,
  },
  {
    id: 3,
    name: 'Уровень 3',
    scoreThreshold: 320,
    speed: 175,
    spawnInterval: 0.9,
    maxConcurrent: 4,
    hazardChance: 0.26,
  },
  {
    id: 4,
    name: 'Уровень 4',
    scoreThreshold: 600,
    speed: 215,
    spawnInterval: 0.7,
    maxConcurrent: 5,
    hazardChance: 0.32,
  },
];

export function getLevelForScore(score) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (score >= level.scoreThreshold) current = level;
  }
  return current;
}
