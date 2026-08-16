import { useState } from "react";
import { addGear } from "../lib/store";

const CATEGORIES = ["Pump", "Hose", "Meter", "Sensor", "Tool", "Other"];

export function AddGearForm({ actor }: { actor: string }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addGear(name.trim(), category, actor);
    setName("");
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, padding: "16px 0" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New gear name (e.g. MAX-4 #12)"
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #232d42",
          background: "#111827",
          color: "#e2e8f0",
        }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #232d42",
          background: "#111827",
          color: "#e2e8f0",
        }}
      >
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          background: "#14b8a6",
          color: "#0a0e14",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}
