function numberOr(value, fallback) {
  return value > 0 ? value : fallback;
}

export function measureViewport() {
  const vv = window.visualViewport;
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (vv) {
    width = numberOr(vv.width, width);
    height = numberOr(vv.height, height);
  }
  width = numberOr(width, document.documentElement.clientWidth);
  height = numberOr(height, document.documentElement.clientHeight);
  width = numberOr(Math.round(width), 320);
  height = numberOr(Math.round(height), 480);
  return { width: width, height: height };
}

export function applyViewport() {
  const size = measureViewport();
  const pxW = size.width + 'px';
  const pxH = size.height + 'px';
  const root = document.documentElement;
  const app = document.getElementById('app');
  root.style.setProperty('--app-width', pxW);
  root.style.setProperty('--app-height', pxH);
  root.style.width = pxW;
  root.style.height = pxH;
  document.body.style.width = pxW;
  document.body.style.height = pxH;
  if (app) {
    app.style.width = pxW;
    app.style.height = pxH;
  }
  return size;
}

export function watchViewport(onChange) {
  const run = function () {
    applyViewport();
    if (typeof onChange === 'function') onChange();
  };
  run();
  window.addEventListener('resize', run);
  window.addEventListener('orientationchange', function () {
    run();
    setTimeout(run, 100);
    setTimeout(run, 300);
    setTimeout(run, 700);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', run);
    window.visualViewport.addEventListener('scroll', run);
  }
}
