export function watchOrientation(onReady) {
  const run = () => {
    if (typeof onReady === 'function') onReady();
  };

  run();
  window.addEventListener('resize', run);
  window.visualViewport?.addEventListener('resize', run);
  window.addEventListener('orientationchange', () => {
    run();
    setTimeout(run, 120);
    setTimeout(run, 400);
  });
}
