function isInteractiveTarget(target) {
  let node = target;
  while (node && node !== document.body && node !== document.documentElement) {
    const tag = node.tagName;
    if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT') return true;
    node = node.parentNode;
  }
  return false;
}

export function preventPageScroll() {
  document.addEventListener(
    'touchmove',
    function (event) {
      if (isInteractiveTarget(event.target)) return;
      if (event.cancelable) event.preventDefault();
    },
    { passive: false },
  );
}

export function bindTap(el, handler) {
  if (!el) return;
  let last = 0;
  const fire = function (event) {
    const now = Date.now();
    if (now - last < 280) {
      if (event && event.cancelable) event.preventDefault();
      return;
    }
    last = now;
    handler(event);
  };
  el.addEventListener('click', fire);
  el.addEventListener(
    'touchend',
    function (event) {
      fire(event);
      if (event.cancelable) event.preventDefault();
    },
    { passive: false },
  );
}

export function bindPress(el, handler) {
  if (!el) return;
  let last = 0;
  const fire = function (event) {
    if (event && event.cancelable) event.preventDefault();
    const now = Date.now();
    if (now - last < 70) return;
    last = now;
    handler(event);
  };
  if (window.PointerEvent) {
    el.addEventListener('pointerdown', fire);
    return;
  }
  el.addEventListener('touchstart', fire, { passive: false });
  el.addEventListener('mousedown', fire);
}
