let switchBox = null;
let primed = false;

function ensureSwitch() {
  if (switchBox && switchBox.isConnected) return switchBox;
  const label = document.createElement('label');
  label.setAttribute('aria-hidden', 'true');
  Object.assign(label.style, {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    opacity: '0.01',
    pointerEvents: 'none',
    zIndex: '-1',
  });
  switchBox = document.createElement('input');
  switchBox.type = 'checkbox';
  switchBox.setAttribute('switch', '');
  switchBox.tabIndex = -1;
  label.appendChild(switchBox);
  document.body.appendChild(label);
  return switchBox;
}

function vibrateNative(pattern) {
  const nav = window.navigator;
  const fn = nav.vibrate || nav.webkitVibrate || nav.mozVibrate;
  if (typeof fn !== 'function') return false;
  try {
    return !!fn.call(nav, pattern);
  } catch (err) {
    return false;
  }
}

function iosTick() {
  try {
    const box = ensureSwitch();
    box.checked = !box.checked;
    if (box.click) box.click();
    if (box.parentNode && box.parentNode.click) box.parentNode.click();
  } catch (err) {
    /* ignore */
  }
}

function telegramHaptic() {
  const haptic =
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.HapticFeedback;
  if (!haptic) return false;
  try {
    if (haptic.notificationOccurred) haptic.notificationOccurred('error');
    else if (haptic.impactOccurred) haptic.impactOccurred('heavy');
    return true;
  } catch (err) {
    return false;
  }
}

export function primeHaptics() {
  primed = true;
  ensureSwitch();
  vibrateNative(1);
  iosTick();
}

export function hapticLifeLost() {
  if (!primed) primeHaptics();
  telegramHaptic();
  vibrateNative(0);
  const ok = vibrateNative([80, 50, 180]) || vibrateNative(220);
  iosTick();
  setTimeout(iosTick, 35);
  setTimeout(iosTick, 90);
  return ok;
}
