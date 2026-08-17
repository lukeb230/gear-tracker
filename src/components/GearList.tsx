import { useState } from "react";
import { removeGear, setNotes, setStatus } from "../lib/store";
import { statusColor, statusLabel, timeAgo } from "../lib/format";
import type { GearItem } from "../types";

export function GearList({ items, actor }: { items: GearItem[]; actor: string }) {
  const [holderFor, setHolderFor] = useState<string | null>(null);
  const [holderName, setHolderName] = useState("");

  if (items.length === 0) {
    return (
      <p style={{ opacity: 0.5, textAlign: "center", padding: 40 }}>
        No gear yet — add your first item above.
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((g) => (
        <li
          key={g.id}
          style={{
            padding: "12px 8px",
            borderBottom: "1px solid #1a2233",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: statusColor(g.status),
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600 }}>{g.name}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              {g.category} · {statusLabel(g.status)}
              {g.holder ? ` by ${g.holder}` : ""} · {timeAgo(g.updatedAt)}
            </div>
          </div>

          {holderFor === g.id ? (
            <>
              <input
                autoFocus
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="Who's taking it?"
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #232d42",
                  background: "#111827",
                  color: "#e2e8f0",
                }}
              />
              <button
                onClick={() => {
                  setStatus(g.id, "checked-out", actor, holderName || actor);
                  setHolderFor(null);
                  setHolderName("");
                }}
                style={btn("#14b8a6")}
              >
                Go
              </button>
            </>
          ) : (
            <>
              {g.status !== "checked-out" && (
                <button onClick={() => setHolderFor(g.id)} style={btn("#fbbf24")}>
                  Check out
                </button>
              )}
              {g.status !== "in-shop" && (
                <button
                  onClick={() => setStatus(g.id, "in-shop", actor)}
                  style={btn("#2dd4bf")}
                >
                  Return
                </button>
              )}
              {g.status !== "maintenance" && (
                <button
                  onClick={() => setStatus(g.id, "maintenance", actor)}
                  style={btn("#f87171")}
                >
                  Maint.
                </button>
              )}
              <button onClick={() => removeGear(g.id, actor)} style={btn("#475569")}>
                ✕
              </button>
            </>
          )}
          </div>
          {g.status === "maintenance" && <MaintenanceNotes item={g} />}
        </li>
      ))}
    </ul>
  );
}

function MaintenanceNotes({ item }: { item: GearItem }) {
  const [draft, setDraft] = useState(item.notes);
  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== item.notes) setNotes(item.id, draft);
      }}
      placeholder="Maintenance notes — what needs fixing?"
      style={{
        display: "block",
        boxSizing: "border-box",
        width: "calc(100% - 22px)",
        marginTop: 8,
        marginLeft: 22,
        padding: "6px 10px",
        borderRadius: 6,
        border: "1px solid #232d42",
        background: "#111827",
        color: "#e2e8f0",
        fontSize: 12,
      }}
    />
  );
}

function btn(color: string): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: 6,
    border: `1px solid ${color}`,
    background: "transparent",
    color,
    fontSize: 12,
    cursor: "pointer",
  };
}
