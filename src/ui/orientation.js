function isPhone() {
  const touch = navigator.maxTouchPoints > 0;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const shortSide = Math.min(screen.width, screen.height);
  return touch && (coarse || shortSide <= 920) && shortSide <= 920;
}

function isPortrait() {
  const type = screen.orientation?.type;
  if (type) return type.startsWith('portrait');
  if (typeof window.orientation === 'number') {
    return window.orientation === 0 || window.orientation === 180;
  }
  return window.innerHeight > window.innerWidth;
}

export function needsLandscapePrompt() {
  return isPhone() && isPortrait();
}

export function syncOrientation(onReady) {
  const needRotate = needsLandscapePrompt();
  const root = document.documentElement;
  root.classList.toggle('is-desktop', !isPhone());
  root.classList.toggle('need-rotate', needRotate);

  const overlay = document.getElementById('rotate-overlay');
  const app = document.getElementById('app');
  if (overlay) overlay.hidden = !needRotate;
  if (app) app.hidden = needRotate;

  if (!needRotate && typeof onReady === 'function') onReady();
}

export function watchOrientation(onReady) {
  const run = () => syncOrientation(onReady);
  run();
  window.addEventListener('orientationchange', () => {
    run();
    setTimeout(run, 80);
    setTimeout(run, 320);
  });
  window.addEventListener('resize', run);
  window.visualViewport?.addEventListener('resize', run);
  screen.orientation?.addEventListener('change', run);
}
