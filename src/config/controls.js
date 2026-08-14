import { POSITION_IDS } from './constants.js';

const UL = POSITION_IDS.UPPER_LEFT;
const LL = POSITION_IDS.LOWER_LEFT;
const UR = POSITION_IDS.UPPER_RIGHT;
const LR = POSITION_IDS.LOWER_RIGHT;

/**
 * Two-handed layout. Physical keys AND letters (EN + RU) so ЙЦУКЕН works
 * without switching to English.
 *
 * Left hand:  Q/W/Й/Ц = upper-left,  A/S/Ф/Ы = lower-left
 * Right hand: O/P/Щ/З = upper-right, K/L/Л/Д = lower-right
 */
export const KEY_TO_POSITION = {
  KeyQ: UL,
  KeyW: UL,
  KeyA: LL,
  KeyS: LL,
  KeyZ: LL,
  KeyI: UR,
  KeyO: UR,
  KeyP: UR,
  ArrowUp: UR,
  KeyK: LR,
  KeyL: LR,
  Semicolon: LR,
  ArrowDown: LR,
};

export const CHAR_TO_POSITION = {
  q: UL,
  Q: UL,
  й: UL,
  Й: UL,
  w: UL,
  W: UL,
  ц: UL,
  Ц: UL,

  a: LL,
  A: LL,
  ф: LL,
  Ф: LL,
  s: LL,
  S: LL,
  ы: LL,
  Ы: LL,
  z: LL,
  Z: LL,
  я: LL,
  Я: LL,

  i: UR,
  I: UR,
  ш: UR,
  Ш: UR,
  o: UR,
  O: UR,
  щ: UR,
  Щ: UR,
  p: UR,
  P: UR,
  з: UR,
  З: UR,

  k: LR,
  K: LR,
  л: LR,
  Л: LR,
  l: LR,
  L: LR,
  д: LR,
  Д: LR,
  ';': LR,
  ж: LR,
  Ж: LR,
};

export function positionFromKeyEvent(event) {
  return KEY_TO_POSITION[event.code] || CHAR_TO_POSITION[event.key] || null;
}
