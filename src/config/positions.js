import { POSITION_IDS } from './constants.js';

/**
 * body.y is the chest. Feet are always planted on FLOOR_Y when drawing.
 * Lower poses step toward the tray and squat slightly.
 */
export const PLAYER_POSES = {
  [POSITION_IDS.UPPER_LEFT]: {
    id: POSITION_IDS.UPPER_LEFT,
    side: 'left',
    height: 'upper',
    facing: -1,
    lean: 0.08,
    body: { x: 0.5, y: 0.618 },
    basket: { x: 0.372, y: 0.438 },
  },
  [POSITION_IDS.LOWER_LEFT]: {
    id: POSITION_IDS.LOWER_LEFT,
    side: 'left',
    height: 'lower',
    facing: -1,
    lean: 0.4,
    body: { x: 0.455, y: 0.668 },
    basket: { x: 0.37, y: 0.648 },
  },
  [POSITION_IDS.UPPER_RIGHT]: {
    id: POSITION_IDS.UPPER_RIGHT,
    side: 'right',
    height: 'upper',
    facing: 1,
    lean: 0.08,
    body: { x: 0.5, y: 0.618 },
    basket: { x: 0.628, y: 0.438 },
  },
  [POSITION_IDS.LOWER_RIGHT]: {
    id: POSITION_IDS.LOWER_RIGHT,
    side: 'right',
    height: 'lower',
    facing: 1,
    lean: 0.4,
    body: { x: 0.545, y: 0.668 },
    basket: { x: 0.63, y: 0.648 },
  },
};

export function poseIdFromAxes(side, height) {
  return `${height}-${side}`;
}
