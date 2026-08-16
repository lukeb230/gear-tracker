import type { GearItem } from "../types";

export function StatsBar({ items }: { items: GearItem[] }) {
  const total = items.length;
  const out = items.filter((g) => g.status === "checked-out").length;
  const maint = items.filter((g) => g.status === "maintenance").length;
  const inShop = total - out - maint;

  const stat = (label: string, value: number) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.6 }}>{label}</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        padding: "16px 0",
        borderBottom: "1px solid #232d42",
      }}
    >
      {stat("Total", total)}
      {stat("In shop", inShop)}
      {stat("Checked out", out)}
      {stat("Maintenance", maint)}
    </div>
  );
}
