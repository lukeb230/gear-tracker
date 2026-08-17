import { totalWeightGrams } from "../lib/format";
import type { GearItem } from "../types";

export function StatsBar({ items }: { items: GearItem[] }) {
  const totalG = totalWeightGrams(items);
  const kg = totalG / 1000;
  const categories = new Set(items.map((g) => g.category)).size;

  return (
    <div className="stats">
      <div className="stat">
        <div className="value">{items.length}</div>
        <div className="label">Items</div>
      </div>
      <div className="stat">
        <div className="value">
          {kg % 1 === 0 ? kg : kg.toFixed(2)} <em>kg</em>
        </div>
        <div className="label">Total weight</div>
      </div>
      <div className="stat">
        <div className="value">{categories}</div>
        <div className="label">Categories</div>
      </div>
    </div>
  );
}
