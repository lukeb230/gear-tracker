// Tiny localStorage-backed store with a pub/sub so components stay in sync.
// Deliberately simple — this app exists to exercise DevBrain, not to be good.

import type { GearItem, GearStatus, HistoryEntry } from "../types";

const GEAR_KEY = "gear-tracker:items";
const HISTORY_KEY = "gear-tracker:history";

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

export function getGear(): GearItem[] {
  return read<GearItem[]>(GEAR_KEY, []);
}

export function getHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(HISTORY_KEY, []);
}

function logHistory(entry: Omit<HistoryEntry, "id" | "at">) {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  });
  write(HISTORY_KEY, history.slice(0, 200));
}

export function addGear(name: string, category: string, actor: string): GearItem {
  const item: GearItem = {
    id: crypto.randomUUID(),
    name,
    category,
    status: "in-shop",
    holder: null,
    notes: "",
    updatedAt: new Date().toISOString(),
  };
  write(GEAR_KEY, [item, ...getGear()]);
  logHistory({ gearId: item.id, gearName: name, action: "added", actor });
  return item;
}

export function setStatus(
  id: string,
  status: GearStatus,
  actor: string,
  holder: string | null = null,
) {
  const items = getGear().map((g) =>
    g.id === id
      ? { ...g, status, holder, updatedAt: new Date().toISOString() }
      : g,
  );
  write(GEAR_KEY, items);
  const item = items.find((g) => g.id === id);
  if (item) {
    logHistory({
      gearId: id,
      gearName: item.name,
      action:
        status === "checked-out"
          ? "checked-out"
          : status === "maintenance"
            ? "maintenance"
            : "returned",
      actor,
    });
  }
}

export function removeGear(id: string, actor: string) {
  const item = getGear().find((g) => g.id === id);
  write(
    GEAR_KEY,
    getGear().filter((g) => g.id !== id),
  );
  if (item) {
    logHistory({ gearId: id, gearName: item.name, action: "deleted", actor });
  }
}
