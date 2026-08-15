/** Display and input layout shared by phones, tablets, and desktop. */
export const DISPLAY = {
  maxDpr: 2,
  minCanvas: 1,
  maxBasketItems: 4,
};

export function usesTouchControls() {
  const touch = navigator.maxTouchPoints > 0;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const shortSide = Math.min(screen.width, screen.height);
  return touch && (coarse || shortSide <= 1180);
}

export function applyDeviceClass() {
  const desktop = !usesTouchControls();
  const width = window.visualViewport && window.visualViewport.width
    ? window.visualViewport.width
    : window.innerWidth;
  const height = window.visualViewport && window.visualViewport.height
    ? window.visualViewport.height
    : window.innerHeight;
  const landscape = width > height;
  document.documentElement.classList.toggle('is-desktop', desktop);
  document.documentElement.classList.toggle('is-touch', !desktop);
  document.documentElement.classList.toggle('is-landscape', landscape);
  return desktop;
}
