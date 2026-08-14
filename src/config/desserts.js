/**
 * Dessert types. Swap `sprite` later to an image URL; drawing uses the id as a fallback key.
 * Points and spawn weights live here, not in game logic.
 */
export const DESSERT_TYPES = {
  cookie: {
    id: 'cookie',
    name: 'Печенье',
    points: 10,
    weight: 3,
    sprite: null,
  },
  strawberry: {
    id: 'strawberry',
    name: 'Клубника',
    points: 10,
    weight: 3,
    sprite: null,
  },
  chocolate: {
    id: 'chocolate',
    name: 'Шоколад',
    points: 15,
    weight: 2,
    sprite: null,
  },
  cupcake: {
    id: 'cupcake',
    name: 'Капкейк',
    points: 20,
    weight: 2,
    sprite: null,
  },
  croissant: {
    id: 'croissant',
    name: 'Круассан',
    points: 20,
    weight: 2,
    sprite: null,
  },
  cake: {
    id: 'cake',
    name: 'Торт',
    points: 30,
    weight: 1,
    sprite: null,
  },
};

export function getDessertList() {
  return Object.values(DESSERT_TYPES);
}

export function pickWeightedDessert(random = Math.random) {
  const list = getDessertList();
  const total = list.reduce((sum, item) => sum + item.weight, 0);
  let roll = random() * total;
  for (const item of list) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return list[0];
}
