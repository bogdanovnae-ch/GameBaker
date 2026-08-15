/**
 * Sprite registry. Set `src` to an image URL later; the renderer uses canvas
 * fallbacks whenever `image` is null. Gameplay never depends on these files.
 */
export const SPRITES = {
  baker: { src: null, image: null },
  basket: { src: null, image: null },
  background: { src: null, image: null },
  chutes: { src: null, image: null },
  desserts: {
    cookie: { src: null, image: null },
    strawberry: { src: null, image: null },
    chocolate: { src: null, image: null },
    cupcake: { src: null, image: null },
    croissant: { src: null, image: null },
    cake: { src: null, image: null },
  },
};

export async function loadSprites() {
  const jobs = [];

  const loadOne = (entry) => {
    if (!entry || !entry.src) return;
    jobs.push(
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          entry.image = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = entry.src;
      }),
    );
  };

  loadOne(SPRITES.baker);
  loadOne(SPRITES.basket);
  loadOne(SPRITES.background);
  loadOne(SPRITES.chutes);
  Object.values(SPRITES.desserts).forEach(loadOne);

  await Promise.all(jobs);
}

export function getDessertSprite(id) {
  const dessert = SPRITES.desserts[id];
  return dessert && dessert.image ? dessert.image : null;
}
