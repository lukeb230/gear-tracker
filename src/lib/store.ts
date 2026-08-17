// localStorage-backed store with pub/sub. The snapshot is kept in a module
// variable so useSyncExternalStore always sees a stable reference.

import type { GearDraft, GearItem } from "../types";

const KEY = "gear-tracker:items:v2";

type Listener = () => void;
const listeners = new Set<Listener>();

let items: GearItem[] = load();

function load(): GearItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GearItem[]) : [];
  } catch {
    return [];
  }
}

function commit(next: GearItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded (usually photos) — state still updates in memory.
  }
  listeners.forEach((l) => l());
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getGear(): GearItem[] {
  return items;
}

export function addGear(draft: GearDraft): GearItem {
  const now = new Date().toISOString();
  const item: GearItem = { ...draft, id: crypto.randomUUID(), addedAt: now, updatedAt: now };
  commit([item, ...items]);
  return item;
}

export function updateGear(id: string, patch: Partial<GearDraft>) {
  commit(
    items.map((g) =>
      g.id === id ? { ...g, ...patch, updatedAt: new Date().toISOString() } : g,
    ),
  );
}

export function removeGear(id: string) {
  commit(items.filter((g) => g.id !== id));
}

const SAMPLES: GearDraft[] = [
  {
    name: "Hornet 2P",
    brand: "Nemo",
    category: "Shelter",
    weightGrams: 878,
    dims: { l: 49, w: 14, h: 14 },
    priceUsd: 399,
    acquiredOn: "2025-04-12",
    condition: "good",
    notes: "Packed size with stakes. Seam-sealed spring 2026.",
    photo: null,
  },
  {
    name: "Exos 58",
    brand: "Osprey",
    category: "Pack",
    weightGrams: 1210,
    dims: { l: 79, w: 37, h: 30 },
    priceUsd: 260,
    acquiredOn: "2024-06-02",
    condition: "worn",
    notes: "Hip belt pocket zipper sticks.",
    photo: null,
  },
  {
    name: "Revelation 20°",
    brand: "Enlightened Equipment",
    category: "Sleep",
    weightGrams: 595,
    dims: { l: 30, w: 18, h: 18 },
    priceUsd: 315,
    acquiredOn: "2025-01-20",
    condition: "new",
    notes: "950fp down quilt, long/wide.",
    photo: null,
  },
  {
    name: "NeoAir XLite NXT",
    brand: "Therm-a-Rest",
    category: "Sleep",
    weightGrams: 354,
    dims: { l: 23, w: 10, h: 10 },
    priceUsd: 210,
    acquiredOn: "2024-09-15",
    condition: "good",
    notes: "",
    photo: null,
  },
  {
    name: "Flash",
    brand: "Jetboil",
    category: "Cooking",
    weightGrams: 371,
    dims: { l: 18, w: 10, h: 10 },
    priceUsd: 130,
    acquiredOn: "2023-05-30",
    condition: "good",
    notes: "Boils 500ml in ~100s. Fuel not included in weight.",
    photo: null,
  },
  {
    name: "Squeeze",
    brand: "Sawyer",
    category: "Water",
    weightGrams: 85,
    dims: { l: 13, w: 5, h: 5 },
    priceUsd: 41,
    acquiredOn: "2023-05-30",
    condition: "worn",
    notes: "Backflush before every trip.",
    photo: null,
  },
  {
    name: "Spot 400",
    brand: "Black Diamond",
    category: "Safety",
    weightGrams: 86,
    dims: { l: 6, w: 4, h: 4 },
    priceUsd: 50,
    acquiredOn: "2025-11-08",
    condition: "new",
    notes: "Weight with AAA batteries.",
    photo: null,
  },
  {
    name: "Nano Puff",
    brand: "Patagonia",
    category: "Clothing",
    weightGrams: 337,
    dims: { l: 20, w: 15, h: 12 },
    priceUsd: 239,
    acquiredOn: "2022-12-25",
    condition: "worn",
    notes: "Stuffs into its own pocket.",
    photo: null,
  },
];

export function addSampleGear() {
  const now = new Date().toISOString();
  const seeded = SAMPLES.map((draft, i) => ({
    ...draft,
    id: crypto.randomUUID(),
    addedAt: now,
    updatedAt: new Date(Date.now() - i * 1000).toISOString(),
  }));
  commit([...seeded, ...items]);
}
