import { useMemo, useState, useSyncExternalStore } from "react";
import { FilterBar } from "./components/FilterBar";
import { GearCard } from "./components/GearCard";
import { GearForm } from "./components/GearForm";
import { Header } from "./components/Header";
import { StatsBar } from "./components/StatsBar";
import { addSampleGear, getGear, subscribe } from "./lib/store";
import { useTheme } from "./theme";
import type { GearItem } from "./types";

export default function App() {
  const items = useSyncExternalStore(subscribe, getGear);
  const [theme, toggleTheme] = useTheme();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<GearItem | null>(null);

  const categories = useMemo(
    () => [...new Set(items.map((g) => g.category))],
    [items],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (g) =>
        (!category || g.category === category) &&
        (!q ||
          `${g.name} ${g.brand} ${g.category} ${g.notes} ${g.maintenanceNotes}`
            .toLowerCase()
            .includes(q)),
    );
  }, [items, query, category]);

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(item: GearItem) {
    setEditing(item);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <main className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <StatsBar items={items} />
      <FilterBar
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        categories={categories}
        onAdd={openAdd}
      />

      {formOpen && (
        <GearForm key={editing?.id ?? "new"} initial={editing} onClose={closeForm} />
      )}

      {items.length === 0 && !formOpen ? (
        <div className="empty">
          <h2>The locker is empty</h2>
          <p>Add your first piece of gear, or load a sample kit to look around.</p>
          <div className="actions">
            <button type="button" className="btn btn-primary" onClick={openAdd}>
              + Add gear
            </button>
            <button type="button" className="btn" onClick={addSampleGear}>
              Load sample kit
            </button>
          </div>
        </div>
      ) : visible.length === 0 && items.length > 0 ? (
        <div className="empty">
          <h2>No matches</h2>
          <p>Nothing fits that search or filter. Clear it to see all gear.</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setQuery("");
                setCategory(null);
              }}
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        <section className="grid" aria-label="Gear inventory">
          {visible.map((g) => (
            <GearCard key={g.id} item={g} onEdit={openEdit} />
          ))}
        </section>
      )}
    </main>
  );
}
