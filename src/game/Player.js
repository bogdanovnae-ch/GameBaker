import { POSE_ANIM_DURATION, PLAYER_HEIGHTS, PLAYER_SIDES, WORLD } from '../config/constants.js';
import { PLAYER_POSES, poseIdFromAxes } from '../config/positions.js';

export class Player {
  constructor() {
    this.side = PLAYER_SIDES.LEFT;
    this.height = PLAYER_HEIGHTS.LOWER;
    this.visual = {
      basketX: 0,
      basketY: 0,
      bodyX: 0,
      bodyY: 0,
      facing: -1,
      lean: 0,
    };
    this._snapVisual();
  }

  get positionId() {
    return poseIdFromAxes(this.side, this.height);
  }

  get pose() {
    return PLAYER_POSES[this.positionId];
  }

  reset() {
    this.side = PLAYER_SIDES.LEFT;
    this.height = PLAYER_HEIGHTS.LOWER;
    this._snapVisual();
  }

  setSide(side) {
    if (side !== PLAYER_SIDES.LEFT && side !== PLAYER_SIDES.RIGHT) return;
    this.side = side;
  }

  setHeight(height) {
    if (height !== PLAYER_HEIGHTS.UPPER && height !== PLAYER_HEIGHTS.LOWER) return;
    this.height = height;
  }

  applyPosition(positionId) {
    const pose = PLAYER_POSES[positionId];
    if (!pose) return;
    this.side = pose.side;
    this.height = pose.height;
  }

  update(dt) {
    const pose = this.pose;
    const target = {
      basketX: pose.basket.x * WORLD.width,
      basketY: pose.basket.y * WORLD.height,
      bodyX: pose.body.x * WORLD.width,
      bodyY: pose.body.y * WORLD.height,
      facing: pose.facing,
      lean: pose.lean,
    };

    const k = 1 - Math.exp(-dt / Math.max(POSE_ANIM_DURATION, 0.001));
    this.visual.basketX += (target.basketX - this.visual.basketX) * k;
    this.visual.basketY += (target.basketY - this.visual.basketY) * k;
    this.visual.bodyX += (target.bodyX - this.visual.bodyX) * k;
    this.visual.bodyY += (target.bodyY - this.visual.bodyY) * k;
    this.visual.lean += (target.lean - this.visual.lean) * k;
    this.visual.facing = target.facing;
  }

  _snapVisual() {
    const pose = this.pose;
    this.visual.basketX = pose.basket.x * WORLD.width;
    this.visual.basketY = pose.basket.y * WORLD.height;
    this.visual.bodyX = pose.body.x * WORLD.width;
    this.visual.bodyY = pose.body.y * WORLD.height;
    this.visual.facing = pose.facing;
    this.visual.lean = pose.lean;
  }
}
