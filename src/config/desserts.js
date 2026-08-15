/**
 * Dessert and hazard types. `edible: false` means do not catch — catching costs a life.
 */
export const DESSERT_TYPES = {
  cookie: {
    id: 'cookie',
    name: 'Печенье',
    points: 10,
    weight: 3,
    edible: true,
    sprite: null,
  },
  strawberry: {
    id: 'strawberry',
    name: 'Клубника',
    points: 10,
    weight: 3,
    edible: true,
    sprite: null,
  },
  chocolate: {
    id: 'chocolate',
    name: 'Шоколад',
    points: 15,
    weight: 2,
    edible: true,
    sprite: null,
  },
  cupcake: {
    id: 'cupcake',
    name: 'Капкейк',
    points: 20,
    weight: 2,
    edible: true,
    sprite: null,
  },
  croissant: {
    id: 'croissant',
    name: 'Круассан',
    points: 20,
    weight: 2,
    edible: true,
    sprite: null,
  },
  cake: {
    id: 'cake',
    name: 'Торт',
    points: 30,
    weight: 1,
    edible: true,
    sprite: null,
  },
  soap: {
    id: 'soap',
    name: 'Мыло',
    points: 0,
    weight: 1,
    edible: false,
    sprite: null,
  },
  sponge: {
    id: 'sponge',
    name: 'Губка',
    points: 0,
    weight: 1,
    edible: false,
    sprite: null,
  },
  bolt: {
    id: 'bolt',
    name: 'Болт',
    points: 0,
    weight: 1,
    edible: false,
    sprite: null,
  },
  sock: {
    id: 'sock',
    name: 'Носок',
    points: 0,
    weight: 1,
    edible: false,
    sprite: null,
  },
  battery: {
    id: 'battery',
    name: 'Батарейка',
    points: 0,
    weight: 1,
    edible: false,
    sprite: null,
  },
};

export function getDessertList() {
  return Object.values(DESSERT_TYPES);
}

export function isEdible(type) {
  return !type || type.edible !== false;
}

export function pickWeightedDessert(random = Math.random) {
  return pickSpawnItem({ hazardChance: 0 }, random);
}

export function pickSpawnItem(level, random = Math.random) {
  const list = getDessertList();
  const edible = list.filter((item) => item.edible !== false);
  const hazards = list.filter((item) => item.edible === false);
  const hazardChance = level && level.hazardChance ? level.hazardChance : 0;

  if (hazards.length && random() < hazardChance) {
    return hazards[Math.floor(random() * hazards.length)];
  }

  const total = edible.reduce((sum, item) => sum + item.weight, 0);
  let roll = random() * total;
  for (let i = 0; i < edible.length; i += 1) {
    roll -= edible[i].weight;
    if (roll <= 0) return edible[i];
  }
  return edible[0];
}
