import { BASKET_HITBOX, DESSERT_RADIUS, WORLD } from '../config/constants.js';
import { PLAYER_POSES } from '../config/positions.js';

export function circleRectOverlap(cx, cy, radius, rect) {
  const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy <= radius * radius;
}

export function getBasketRect(player, width = WORLD.width, height = WORLD.height) {
  const pose = PLAYER_POSES[player.positionId];
  const bx = pose.basket.x * width;
  const by = pose.basket.y * height;
  return {
    x: bx - BASKET_HITBOX.width / 2,
    y: by - BASKET_HITBOX.height / 2,
    width: BASKET_HITBOX.width,
    height: BASKET_HITBOX.height,
  };
}

/**
 * Catch only when the dessert is in the chute's catch window AND overlaps the basket.
 * Matching baker position is implied: the basket exists in only one of the four slots.
 */
export function canCatchDessert(dessert, player) {
  if (dessert.state !== 'rolling') return false;
  const { catchStart, catchEnd } = dessert.trajectory;
  if (dessert.progress < catchStart || dessert.progress > catchEnd) return false;
  if (player.positionId !== dessert.trajectory.catchPosition) return false;

  const pos = dessert.getPosition();
  const basket = getBasketRect(player);
  return circleRectOverlap(pos.x, pos.y, DESSERT_RADIUS, basket);
}
