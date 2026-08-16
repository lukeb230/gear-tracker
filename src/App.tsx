import { useEffect, useState, useSyncExternalStore } from "react";
import { AddGearForm } from "./components/AddGearForm";
import { GearList } from "./components/GearList";
import { HistoryLog } from "./components/HistoryLog";
import { StatsBar } from "./components/StatsBar";
import { getGear, getHistory, subscribe } from "./lib/store";

export default function App() {
  const items = useSyncExternalStore(subscribe, getGear);
  const history = useSyncExternalStore(subscribe, getHistory);
  const [actor, setActor] = useState(
    () => localStorage.getItem("gear-tracker:actor") ?? "",
  );

  useEffect(() => {
    localStorage.setItem("gear-tracker:actor", actor);
  }, [actor]);

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Gear Tracker</h1>
        <span style={{ opacity: 0.5, fontSize: 13 }}>
          the world's most disposable inventory app
        </span>
        <input
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          placeholder="Your name"
          style={{
            marginLeft: "auto",
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #232d42",
            background: "#111827",
            color: "#e2e8f0",
            width: 120,
          }}
        />
      </header>

      <StatsBar items={items} />
      <AddGearForm actor={actor || "someone"} />
      <GearList items={items} actor={actor || "someone"} />
      <HistoryLog entries={history} />
    </main>
  );
}
