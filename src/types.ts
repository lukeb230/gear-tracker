export type GearCondition = "new" | "good" | "worn" | "retired";

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
  photo: string | null; // compressed data URL
  addedAt: string; // ISO
  updatedAt: string; // ISO
}

export type GearDraft = Omit<GearItem, "id" | "addedAt" | "updatedAt">;

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
  { value: "retired", label: "Retired" },
];
