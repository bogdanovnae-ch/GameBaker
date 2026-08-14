import { roundRect } from './scene.js';
import { FLOOR_Y, WORLD } from '../../config/constants.js';

const HIP_Y = 26;
const SCALE = 1.38;

export function drawBaker(ctx, { x, y, facing, basketX, basketY, time, scale = SCALE, lean = 0.1, poseHeight = 'upper' }) {
  const bob = poseHeight === 'upper' ? Math.sin(time * 3) * 1.1 : 0;
  const bodyY = y + bob;
  const floorY = FLOOR_Y * WORLD.height;
  const footY = (floorY - bodyY) / scale;

  ctx.save();
  ctx.translate(x, bodyY);
  ctx.scale(facing * scale, scale);

  drawBakerShadow(ctx, footY, poseHeight);
  drawLegs(ctx, time, poseHeight, footY);

  ctx.save();
  ctx.translate(0, HIP_Y);
  ctx.rotate(lean);
  ctx.translate(0, -HIP_Y);
  drawBody(ctx);
  drawIdleArm(ctx, poseHeight);
  drawHead(ctx);
  drawHat(ctx);
  ctx.restore();
  ctx.restore();

  drawCatchingArm(ctx, x, bodyY, basketX, basketY, facing, scale, poseHeight, lean);
  drawBasket(ctx, basketX, basketY, facing, time);
}

function drawBakerShadow(ctx, footY, poseHeight) {
  ctx.fillStyle = 'rgba(80, 40, 20, 0.22)';
  ctx.beginPath();
  const width = poseHeight === 'lower' ? 58 : 48;
  ctx.ellipse(poseHeight === 'lower' ? 10 : 0, footY + 2, width, 9, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawIdleArm(ctx, poseHeight) {
  const shoulderX = -30;
  const shoulderY = 0;
  const handX = poseHeight === 'lower' ? -28 : -22;
  const handY = poseHeight === 'lower' ? 36 : 42;
  const midX = poseHeight === 'lower' ? -40 : -36;
  const midY = poseHeight === 'lower' ? 14 : 18;

  ctx.lineCap = 'round';

  ctx.strokeStyle = '#efe8dc';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.quadraticCurveTo(midX, midY, handX, handY);
  ctx.stroke();

  ctx.strokeStyle = '#f7f4ee';
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.quadraticCurveTo(midX, midY, handX, handY);
  ctx.stroke();

  ctx.fillStyle = '#f3c7a3';
  ctx.beginPath();
  ctx.arc(handX, handY + 2, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawLegs(ctx, time, poseHeight, footY) {
  const step = poseHeight === 'lower' ? 18 : 3;
  const back = poseHeight === 'lower' ? -14 : -8;
  const kneeBend = poseHeight === 'lower' ? 10 : 0;
  const swing = poseHeight === 'upper' ? Math.sin(time * 2) * 1.5 : 0;

  const backX = back + swing;
  const frontX = 8 + step;

  drawOneLeg(ctx, backX, footY, kneeBend, false);
  drawOneLeg(ctx, frontX, footY, kneeBend + (poseHeight === 'lower' ? 4 : 0), true);
}

function drawOneLeg(ctx, footX, footY, kneeBend, front) {
  const hipX = front ? 10 : -12;
  const kneeX = footX * 0.55 + hipX * 0.45;
  const kneeY = HIP_Y + (footY - HIP_Y) * 0.45 + kneeBend;

  ctx.strokeStyle = '#f4e8c8';
  ctx.lineWidth = 11;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(hipX, HIP_Y);
  ctx.lineTo(kneeX, kneeY);
  ctx.stroke();

  ctx.strokeStyle = '#3b3b4a';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(kneeX, kneeY);
  ctx.lineTo(footX, footY - 6);
  ctx.stroke();

  ctx.fillStyle = '#d94f6d';
  roundRect(ctx, footX - 11, footY - 8, 22, 9, 4);
  ctx.fill();
}

function drawBody(ctx) {
  ctx.fillStyle = '#f7f4ee';
  roundRect(ctx, -32, -8, 64, 58, 16);
  ctx.fill();
  ctx.strokeStyle = '#d9d2c6';
  ctx.lineWidth = 2;
  roundRect(ctx, -32, -8, 64, 58, 16);
  ctx.stroke();

  ctx.fillStyle = '#e8e2d6';
  ctx.fillRect(-2, -4, 4, 48);
  ctx.beginPath();
  ctx.arc(-12, 12, 4, 0, Math.PI * 2);
  ctx.arc(12, 12, 4, 0, Math.PI * 2);
  ctx.arc(-12, 28, 4, 0, Math.PI * 2);
  ctx.arc(12, 28, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#c9b89a';
  ctx.fill();
}

function drawHead(ctx) {
  ctx.fillStyle = '#f3c7a3';
  ctx.beginPath();
  ctx.ellipse(0, -28, 24, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f0a090';
  ctx.beginPath();
  ctx.ellipse(-16, -22, 6, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(16, -22, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2c2c38';
  ctx.beginPath();
  ctx.ellipse(-8, -30, 3.2, 4, 0, 0, Math.PI * 2);
  ctx.ellipse(8, -30, 3.2, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(-7, -31, 1.2, 0, Math.PI * 2);
  ctx.arc(9, -31, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#c47a62';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -18, 8, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.strokeStyle = '#2c2c38';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-16, -40);
  ctx.lineTo(-5, -38);
  ctx.moveTo(5, -38);
  ctx.lineTo(16, -40);
  ctx.stroke();
}

function drawHat(ctx) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(-22, -50);
  ctx.bezierCurveTo(-36, -56, -40, -76, -24, -88);
  ctx.bezierCurveTo(-28, -102, -10, -112, 0, -100);
  ctx.bezierCurveTo(8, -114, 30, -108, 26, -90);
  ctx.bezierCurveTo(42, -82, 38, -56, 22, -50);
  ctx.closePath();
  ctx.fillStyle = '#fffdf8';
  ctx.fill();
  ctx.strokeStyle = '#cfc6b8';
  ctx.lineWidth = 2.2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.ellipse(-9, -84, 11, 8, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10, -90, 10, 8, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(2, -76, 8, 6, 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(170, 158, 145, 0.4)';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-10, -52);
  ctx.quadraticCurveTo(-14, -70, -6, -92);
  ctx.moveTo(2, -52);
  ctx.quadraticCurveTo(0, -74, 4, -98);
  ctx.moveTo(12, -52);
  ctx.quadraticCurveTo(16, -70, 12, -88);
  ctx.stroke();

  roundRect(ctx, -27, -56, 54, 16, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#cfc6b8';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  roundRect(ctx, -20, -53, 20, 5, 3);
  ctx.fill();

  ctx.restore();
}

function drawCatchingArm(ctx, x, y, basketX, basketY, facing, scale, poseHeight, lean) {
  const stretch = poseHeight === 'upper';
  const shoulderX = x + facing * 30 * scale;
  const shoulderY = y + (stretch ? -2 : 4 + lean * 6) * scale;
  const handX = basketX - facing * 14;
  const handY = basketY + 4;

  const midX = (shoulderX + handX) / 2 + facing * 6;
  const midY = (shoulderY + handY) / 2 + (stretch ? 4 : 8);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#efe8dc';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.quadraticCurveTo(midX, midY, handX, handY);
  ctx.stroke();

  ctx.strokeStyle = '#f7f4ee';
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.moveTo(shoulderX, shoulderY);
  ctx.quadraticCurveTo(midX, midY, handX, handY);
  ctx.stroke();

  ctx.fillStyle = '#f3c7a3';
  ctx.beginPath();
  ctx.arc(handX, handY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawBasket(ctx, x, y, facing, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(facing * 0.08);
  const pulse = 1 + Math.sin(time * 6) * 0.01;
  ctx.scale(pulse, pulse);

  ctx.fillStyle = 'rgba(255, 220, 120, 0.22)';
  ctx.beginPath();
  ctx.ellipse(0, 10, 40, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#c9843a';
  ctx.beginPath();
  ctx.ellipse(0, 6, 34, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8a4f1e';
  ctx.beginPath();
  ctx.ellipse(0, 4, 26, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#e2b06a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 6, 34, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#a05e24';
  ctx.lineWidth = 2;
  for (let i = -20; i <= 20; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, -2);
    ctx.lineTo(i * 0.7, 16);
    ctx.stroke();
  }

  ctx.strokeStyle = '#dca056';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, -2, 22, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.restore();
}
