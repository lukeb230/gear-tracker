export type GearCondition = "new" | "good" | "worn" | "maintenance" | "retired";

export interface GearDims {
  l: number | null; // cm
  w: number | null;
  h: number | null;
}

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  weightGrams: number | null;
  dims: GearDims;
  priceUsd: number | null;
  acquiredOn: string; // yyyy-mm-dd, or ""
  condition: GearCondition;
  notes: string;
  maintenanceNotes: string; // editable/visible only while condition is "maintenance"
  photo: string | null; // compressed data URL
  addedAt: string; // ISO
  updatedAt: string; // ISO
}

export type GearDraft = Omit<GearItem, "id" | "addedAt" | "updatedAt">;

// Seed suggestions for the brand picker; the datalist in GearForm merges
// these with brands already in the locker. Free-text brands remain valid.
export const KNOWN_BRANDS = [
  "Arc'teryx",
  "Big Agnes",
  "Black Diamond",
  "Deuter",
  "Enlightened Equipment",
  "Garmin",
  "Gregory",
  "Hyperlite Mountain Gear",
  "Jetboil",
  "Katadyn",
  "MSR",
  "Nemo",
  "Osprey",
  "Outdoor Research",
  "Patagonia",
  "Petzl",
  "Rab",
  "REI Co-op",
  "Salomon",
  "Sawyer",
  "Sea to Summit",
  "Therm-a-Rest",
  "Zpacks",
] as const;

export const CATEGORIES = [
  "Shelter",
  "Sleep",
  "Pack",
  "Cooking",
  "Water",
  "Clothing",
  "Climbing",
  "Navigation",
  "Safety",
  "Other",
] as const;

export const CONDITIONS: { value: GearCondition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "worn", label: "Worn" },
  { value: "maintenance", label: "In maintenance" },
  { value: "retired", label: "Retired" },
];
