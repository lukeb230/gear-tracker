import type { GearDims, GearItem } from "./../types";

export function formatWeight(grams: number | null): string {
  if (grams == null) return "— g";
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg % 1 === 0 ? kg : kg.toFixed(2)} kg`;
  }
  return `${grams} g`;
}

export function formatDims(dims: GearDims): string | null {
  const parts = [dims.l, dims.w, dims.h];
  if (parts.every((p) => p == null)) return null;
  return `${parts.map((p) => p ?? "—").join(" × ")} cm`;
}

export function formatPrice(usd: number | null): string | null {
  if (usd == null) return null;
  return `$${usd % 1 === 0 ? usd : usd.toFixed(2)}`;
}

export function totalWeightGrams(items: GearItem[]): number {
  return items.reduce((sum, g) => sum + (g.weightGrams ?? 0), 0);
}

export function formatDate(yyyyMmDd: string): string | null {
  if (!yyyyMmDd) return null;
  const d = new Date(`${yyyyMmDd}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}
