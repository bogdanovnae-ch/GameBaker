/** Logical game world. All gameplay math uses this size; the canvas is scaled to fit. */
export const WORLD = {
  width: 960,
  height: 540,
};

export const INITIAL_LIVES = 3;

export const PLAYER_SIDES = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const PLAYER_HEIGHTS = {
  UPPER: 'upper',
  LOWER: 'lower',
};

export const POSITION_IDS = {
  UPPER_LEFT: 'upper-left',
  LOWER_LEFT: 'lower-left',
  UPPER_RIGHT: 'upper-right',
  LOWER_RIGHT: 'lower-right',
};

export const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
};

export const DESSERT_RADIUS = 22;
export const BASKET_HITBOX = { width: 78, height: 52 };

/** Short lerp when switching baker pose (seconds). */
export const POSE_ANIM_DURATION = 0.08;

export const CATCH_POP_DURATION = 0.45;
export const MISS_FALL_DURATION = 0.55;

/** Counter top where the baker's feet stand (normalized 0..1). */
export const FLOOR_Y = 0.842;
