/**
 * Difficulty steps. Game logic only reads these values; tune speed and spawn here.
 * `scoreThreshold` is the score at which this level becomes active.
 */
export const LEVELS = [
  {
    id: 1,
    name: 'Уровень 1',
    scoreThreshold: 0,
    speed: 95,
    spawnInterval: 1.85,
    maxConcurrent: 2,
  },
  {
    id: 2,
    name: 'Уровень 2',
    scoreThreshold: 120,
    speed: 135,
    spawnInterval: 1.25,
    maxConcurrent: 3,
  },
  {
    id: 3,
    name: 'Уровень 3',
    scoreThreshold: 320,
    speed: 175,
    spawnInterval: 0.9,
    maxConcurrent: 4,
  },
  {
    id: 4,
    name: 'Уровень 4',
    scoreThreshold: 600,
    speed: 215,
    spawnInterval: 0.7,
    maxConcurrent: 5,
  },
];

export function getLevelForScore(score) {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (score >= level.scoreThreshold) current = level;
  }
  return current;
}
