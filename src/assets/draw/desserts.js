import { roundRect } from './scene.js';

const DRAWERS = {
  cookie: drawCookie,
  strawberry: drawStrawberry,
  chocolate: drawChocolate,
  cupcake: drawCupcake,
  croissant: drawCroissant,
  cake: drawCake,
  soap: drawSoap,
  sponge: drawSponge,
  bolt: drawBolt,
  sock: drawSock,
  battery: drawBattery,
};

export function drawDessert(ctx, typeId, x, y, rotation, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  const fn = DRAWERS[typeId] || drawCookie;
  fn(ctx);
  ctx.restore();
}

function drawCookie(ctx) {
  ctx.fillStyle = '#d9a441';
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#c4892e';
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#5b3314';
  [[-5, -4], [4, -6], [6, 3], [-3, 6], [1, 1]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.1, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawStrawberry(ctx) {
  ctx.fillStyle = '#e23b4a';
  ctx.beginPath();
  ctx.moveTo(0, 16);
  ctx.quadraticCurveTo(16, 6, 8, -8);
  ctx.quadraticCurveTo(0, -14, -8, -8);
  ctx.quadraticCurveTo(-16, 6, 0, 16);
  ctx.fill();
  ctx.fillStyle = '#3fa35a';
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(-8, -16);
  ctx.lineTo(-2, -10);
  ctx.lineTo(0, -18);
  ctx.lineTo(2, -10);
  ctx.lineTo(8, -16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fff6';
  [[-4, 0], [3, 2], [0, 8], [5, -2]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, 1.4, 2, 0.4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawChocolate(ctx) {
  ctx.fillStyle = '#6b3418';
  roundRect(ctx, -16, -10, 32, 20, 3);
  ctx.fill();
  ctx.strokeStyle = '#4a210e';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-5, -10);
  ctx.lineTo(-5, 10);
  ctx.moveTo(5, -10);
  ctx.lineTo(5, 10);
  ctx.moveTo(-16, 0);
  ctx.lineTo(16, 0);
  ctx.stroke();
  ctx.fillStyle = '#8a4a24';
  roundRect(ctx, -14, -8, 8, 6, 1);
  ctx.fill();
}

function drawCupcake(ctx) {
  ctx.fillStyle = '#f0c14a';
  ctx.beginPath();
  ctx.moveTo(-14, 2);
  ctx.lineTo(-10, 16);
  ctx.lineTo(10, 16);
  ctx.lineTo(14, 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#d9a441';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-8, 2);
  ctx.lineTo(-6, 16);
  ctx.moveTo(0, 2);
  ctx.lineTo(0, 16);
  ctx.moveTo(8, 2);
  ctx.lineTo(6, 16);
  ctx.stroke();
  ctx.fillStyle = '#f4a6c8';
  ctx.beginPath();
  ctx.arc(0, -2, 13, Math.PI, 0);
  ctx.quadraticCurveTo(10, 4, 0, 4);
  ctx.quadraticCurveTo(-10, 4, -13, -2);
  ctx.fill();
  ctx.fillStyle = '#7ad3ff';
  ctx.beginPath();
  ctx.arc(0, -14, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawCroissant(ctx) {
  ctx.fillStyle = '#e2a24a';
  ctx.beginPath();
  ctx.ellipse(0, 2, 18, 10, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#c47d28';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-2, 2, 12, 0.4, 2.4);
  ctx.stroke();
  ctx.fillStyle = '#f3d18a';
  ctx.beginPath();
  ctx.ellipse(-8, -2, 6, 4, -0.6, 0, Math.PI * 2);
  ctx.fill();
}

function drawCake(ctx) {
  ctx.fillStyle = '#f4c1d4';
  roundRect(ctx, -16, -2, 32, 16, 4);
  ctx.fill();
  ctx.fillStyle = '#fff8f4';
  roundRect(ctx, -16, -8, 32, 10, 4);
  ctx.fill();
  ctx.fillStyle = '#8fd3c2';
  ctx.beginPath();
  ctx.moveTo(-16, -2);
  ctx.lineTo(-10, 4);
  ctx.lineTo(-4, -2);
  ctx.lineTo(2, 4);
  ctx.lineTo(8, -2);
  ctx.lineTo(14, 4);
  ctx.lineTo(16, -2);
  ctx.lineTo(16, -8);
  ctx.lineTo(-16, -8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e23b4a';
  ctx.beginPath();
  ctx.arc(4, -12, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3fa35a';
  ctx.fillRect(2, -18, 4, 6);
}

function drawSoap(ctx) {
  ctx.fillStyle = '#9fd8f2';
  roundRect(ctx, -16, -8, 32, 16, 6);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  roundRect(ctx, -12, -5, 14, 5, 3);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.arc(-10, -14, 5, 0, Math.PI * 2);
  ctx.arc(-2, -18, 3.5, 0, Math.PI * 2);
  ctx.arc(6, -13, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawSponge(ctx) {
  ctx.fillStyle = '#e8c84a';
  roundRect(ctx, -15, -10, 30, 20, 4);
  ctx.fill();
  ctx.fillStyle = '#c9a322';
  [[-8, -4], [4, -2], [-2, 4], [8, 5], [-10, 6]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBolt(ctx) {
  ctx.fillStyle = '#8a93a0';
  ctx.beginPath();
  ctx.moveTo(-6, -14);
  ctx.lineTo(6, -14);
  ctx.lineTo(4, -8);
  ctx.lineTo(-4, -8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#6d7582';
  roundRect(ctx, -4, -8, 8, 22, 2);
  ctx.fill();
  ctx.strokeStyle = '#4c535c';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-4, -2);
  ctx.lineTo(4, -2);
  ctx.moveTo(-4, 4);
  ctx.lineTo(4, 4);
  ctx.moveTo(-4, 10);
  ctx.lineTo(4, 10);
  ctx.stroke();
}

function drawSock(ctx) {
  ctx.fillStyle = '#5b7cbf';
  ctx.beginPath();
  ctx.moveTo(-6, -16);
  ctx.lineTo(6, -16);
  ctx.lineTo(7, 4);
  ctx.quadraticCurveTo(16, 8, 14, 14);
  ctx.quadraticCurveTo(4, 18, -2, 12);
  ctx.lineTo(-7, 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f4f0e6';
  ctx.fillRect(-6, -16, 12, 5);
  ctx.strokeStyle = '#f4d76a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-5, -6);
  ctx.lineTo(6, -6);
  ctx.moveTo(-5, 2);
  ctx.lineTo(6, 2);
  ctx.stroke();
}

function drawBattery(ctx) {
  ctx.fillStyle = '#d8dde4';
  roundRect(ctx, -8, -16, 16, 30, 3);
  ctx.fill();
  ctx.fillStyle = '#d94f6d';
  roundRect(ctx, -8, -16, 16, 10, 3);
  ctx.fill();
  ctx.fillStyle = '#bfc5ce';
  roundRect(ctx, -4, -20, 8, 6, 2);
  ctx.fill();
  ctx.fillStyle = '#3b2414';
  ctx.font = '700 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('+', 0, -8);
}
