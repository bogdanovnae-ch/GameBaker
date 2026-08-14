export function distance(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
}

export function polylineLength(points) {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    length += distance(points[i - 1], points[i]);
  }
  return length;
}

/**
 * Sample a polyline by arc-length progress t in [0, 1].
 * Returns position and tangent angle (radians).
 */
export function pointAlongPolyline(points, t) {
  if (!points.length) return { x: 0, y: 0, angle: 0 };
  if (points.length === 1) return { x: points[0].x, y: points[0].y, angle: 0 };

  const clamped = Math.max(0, Math.min(1, t));
  const total = polylineLength(points);
  if (total <= 0) {
    const last = points[points.length - 1];
    return { x: last.x, y: last.y, angle: 0 };
  }

  let remaining = clamped * total;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const seg = distance(a, b);
    if (remaining <= seg || i === points.length - 1) {
      const ratio = seg === 0 ? 0 : remaining / seg;
      return {
        x: a.x + (b.x - a.x) * ratio,
        y: a.y + (b.y - a.y) * ratio,
        angle: Math.atan2(b.y - a.y, b.x - a.x),
      };
    }
    remaining -= seg;
  }

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  return {
    x: last.x,
    y: last.y,
    angle: Math.atan2(last.y - prev.y, last.x - prev.x),
  };
}
