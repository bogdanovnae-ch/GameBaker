export function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function drawBackground(ctx, world, time) {
  const { width: w, height: h } = world;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#f8e7c8');
  sky.addColorStop(0.55, '#f3d7a8');
  sky.addColorStop(1, '#e8c48a');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  drawWindow(ctx, w * 0.5, h * 0.22, 210, 120, time);
  drawWallTiles(ctx, w, h);
  drawBackShelves(ctx, w, h);
  drawCounter(ctx, w, h);
  drawDecor(ctx, w, h);
}

function drawWindow(ctx, cx, cy, w, h, time) {
  ctx.save();
  roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 12);
  const glass = ctx.createLinearGradient(cx, cy - h / 2, cx, cy + h / 2);
  glass.addColorStop(0, '#9fd7ef');
  glass.addColorStop(1, '#d8f3c9');
  ctx.fillStyle = glass;
  ctx.fill();
  ctx.strokeStyle = '#8a5a32';
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2);
  ctx.lineTo(cx, cy + h / 2);
  ctx.moveTo(cx - w / 2, cy);
  ctx.lineTo(cx + w / 2, cy);
  ctx.strokeStyle = '#a56a3c';
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.ellipse(cx - 40, cy - 22, 28, 10, -0.4, 0, Math.PI * 2);
  ctx.fill();

  const glow = 0.12 + Math.sin(time * 1.4) * 0.03;
  ctx.fillStyle = `rgba(255, 236, 170, ${glow})`;
  roundRect(ctx, cx - w / 2, cy - h / 2, w, h, 12);
  ctx.fill();
  ctx.restore();
}

function drawWallTiles(ctx, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = '#b07a40';
  ctx.lineWidth = 1;
  const size = 36;
  for (let y = 80; y < h * 0.72; y += size) {
    for (let x = 0; x < w; x += size) {
      ctx.strokeRect(x, y, size, size);
    }
  }
  ctx.restore();
}

function drawBackShelves(ctx, w, h) {
  ctx.save();
  ctx.fillStyle = '#c48a4a';
  ctx.fillRect(w * 0.18, h * 0.08, w * 0.18, 10);
  ctx.fillRect(w * 0.64, h * 0.08, w * 0.18, 10);

  drawJar(ctx, w * 0.22, h * 0.08, '#f4a6c1');
  drawJar(ctx, w * 0.28, h * 0.08, '#8fd3c2');
  drawJar(ctx, w * 0.72, h * 0.08, '#f0c14a');
  drawJar(ctx, w * 0.78, h * 0.08, '#d98b6a');
  ctx.restore();
}

function drawJar(ctx, x, y, color) {
  ctx.fillStyle = color;
  roundRect(ctx, x - 10, y - 28, 20, 26, 4);
  ctx.fill();
  ctx.fillStyle = '#fff8';
  ctx.fillRect(x - 6, y - 24, 5, 14);
  ctx.fillStyle = '#8a5a32';
  roundRect(ctx, x - 12, y - 32, 24, 8, 3);
  ctx.fill();
}

function drawCounter(ctx, w, h) {
  ctx.fillStyle = '#6d3e22';
  ctx.fillRect(0, h * 0.86, w, h * 0.14);
  ctx.fillStyle = '#8b542e';
  ctx.fillRect(0, h * 0.84, w, 16);

  ctx.fillStyle = '#d9c2a0';
  const tile = 28;
  for (let x = 0; x < w; x += tile) {
    ctx.fillStyle = ((x / tile) | 0) % 2 === 0 ? '#f3e6d0' : '#e7d3b0';
    ctx.fillRect(x, h * 0.86, tile, 10);
  }
}

function drawDecor(ctx, w, h) {
  ctx.fillStyle = '#c9a06a';
  roundRect(ctx, 18, h * 0.7, 70, 52, 8);
  ctx.fill();
  ctx.fillStyle = '#a97845';
  roundRect(ctx, 26, h * 0.72, 54, 12, 4);
  ctx.fill();

  ctx.fillStyle = '#b9b9c6';
  ctx.beginPath();
  ctx.ellipse(w - 58, h * 0.74, 34, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8f8fa3';
  ctx.fillRect(w - 70, h * 0.74, 24, 40);
}

export function drawChutes(ctx, trajectories) {
  trajectories.forEach((traj) => {
    drawChute(ctx, traj.rollPoints, traj.side);
    drawSource(ctx, traj.rollPoints[0], traj.side, traj.height);
  });
}

function drawChute(ctx, points, side) {
  if (!points || points.length < 2) return;

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  strokePoly(ctx, points, 34, '#6b3a1c');
  strokePoly(ctx, points, 26, '#c48a4a');
  strokePoly(ctx, points, 14, '#e2b072');

  ctx.strokeStyle = 'rgba(90, 40, 10, 0.28)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 10]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.stroke();
  ctx.setLineDash([]);

  const railOffset = side === 'left' ? -12 : 12;
  ctx.strokeStyle = '#8d5a30';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y + railOffset * 0.15);
  points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y + 3));
  ctx.stroke();
  ctx.restore();
}

function strokePoly(ctx, points, width, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.stroke();
}

function drawSource(ctx, point, side, height) {
  const x = point.x;
  const y = point.y;
  const dir = side === 'left' ? 1 : -1;

  ctx.save();
  ctx.translate(x - dir * 8, y - 18);

  ctx.fillStyle = '#8b542e';
  roundRect(ctx, -28, 8, 56, 14, 4);
  ctx.fill();

  ctx.fillStyle = height === 'upper' ? '#f2d2a0' : '#e8c48c';
  ctx.beginPath();
  ctx.ellipse(0, 6, 24, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d9a56a';
  ctx.beginPath();
  ctx.ellipse(0, 6, 16, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff8f0';
  roundRect(ctx, -10, -22, 20, 18, 4);
  ctx.fill();
  ctx.fillStyle = '#e7b7c9';
  ctx.beginPath();
  ctx.arc(0, -26, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawCatchSlots(ctx, poses, activeId, world) {
  Object.values(poses).forEach((pose) => {
    const x = pose.basket.x * world.width;
    const y = pose.basket.y * world.height;
    const active = pose.id === activeId;
    ctx.save();
    ctx.globalAlpha = active ? 0.35 : 0.12;
    ctx.strokeStyle = active ? '#fff4c2' : '#ffffff';
    ctx.lineWidth = active ? 4 : 2;
    ctx.beginPath();
    ctx.ellipse(x, y + 8, 36, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
    if (active) {
      ctx.fillStyle = 'rgba(255, 244, 180, 0.18)';
      ctx.fill();
    }
    ctx.restore();
  });
}
