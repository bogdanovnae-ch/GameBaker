function isPhone() {
  const touch = navigator.maxTouchPoints > 0;
  const shortSide = Math.min(screen.width, screen.height);
  return touch && shortSide <= 920;
}

function isLandscape() {
  const width = window.visualViewport?.width || window.innerWidth;
  const height = window.visualViewport?.height || window.innerHeight;
  if (width > height) return true;
  if (window.matchMedia('(orientation: landscape)').matches) return true;
  const angle = window.orientation;
  if (typeof angle === 'number' && Math.abs(angle) === 90) return true;
  const type = screen.orientation?.type;
  if (type && type.includes('landscape')) return true;
  return false;
}

export function needsLandscapePrompt() {
  return isPhone() && !isLandscape();
}

export function showGame() {
  document.documentElement.classList.remove('need-rotate');
}

export function syncOrientation(onReady) {
  const needRotate = needsLandscapePrompt();
  const root = document.documentElement;
  root.classList.toggle('is-desktop', !isPhone());
  root.classList.toggle('need-rotate', needRotate);

  if (!needRotate && typeof onReady === 'function') {
    onReady();
    requestAnimationFrame(onReady);
    setTimeout(onReady, 250);
  }
}

export function watchOrientation(onReady) {
  const run = () => syncOrientation(onReady);
  run();

  window.addEventListener('orientationchange', () => {
    run();
    setTimeout(run, 100);
    setTimeout(run, 400);
    setTimeout(run, 800);
  });
  window.addEventListener('resize', run);
  window.visualViewport?.addEventListener('resize', run);

  const landscapeQuery = window.matchMedia('(orientation: landscape)');
  if (landscapeQuery.addEventListener) {
    landscapeQuery.addEventListener('change', run);
  } else if (landscapeQuery.addListener) {
    landscapeQuery.addListener(run);
  }

  screen.orientation?.addEventListener?.('change', run);

  const openBtn = document.getElementById('open-game-btn');
  const openGame = (event) => {
    event.preventDefault();
    showGame();
    if (typeof onReady === 'function') onReady();
  };
  openBtn?.addEventListener('pointerup', openGame);
  openBtn?.addEventListener('click', openGame);
}
