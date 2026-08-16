import { timeAgo } from "../lib/format";
import type { HistoryEntry } from "../types";

const VERBS: Record<HistoryEntry["action"], string> = {
  added: "added",
  "checked-out": "checked out",
  returned: "returned",
  maintenance: "flagged for maintenance",
  deleted: "deleted",
};

export function HistoryLog({ entries }: { entries: HistoryEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 14, opacity: 0.6, textTransform: "uppercase" }}>
        Activity
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
        {entries.slice(0, 20).map((e) => (
          <li key={e.id} style={{ padding: "6px 0", opacity: 0.8 }}>
            <strong>{e.actor}</strong> {VERBS[e.action]} <strong>{e.gearName}</strong>
            <span style={{ opacity: 0.5 }}> · {timeAgo(e.at)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
