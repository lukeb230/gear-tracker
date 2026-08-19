# decisions

Append new entries at the top: date · decision · why.

- **2026-08-19 · Brand picker is a native datalist, not a select.** Brands
  stay free-text (`GearItem.brand: string`, no migration); the form input
  suggests `KNOWN_BRANDS` merged with brands already in the locker. A closed
  `<select>` would have needed an "Other" escape hatch. See [[brand-picker]].
- **2026-08-17 · Maintenance notes get their own field after the rework.**
  The merge of `light-dark-mode` with main split the fields: the rework uses
  `notes` as a real general-notes field, so the maintenance feature moved to
  a dedicated `maintenanceNotes` (reversing the 2026-08-16 reuse decision,
  which only worked because `notes` was dead). `"maintenance"` became a
  `GearCondition` since `GearStatus` no longer exists. See
  [[maintenance-notes]].
- **2026-08-17 · Rebuilt as a personal inventory (`light-dark-mode`).**
  Check-in/check-out (status, holder, actor, history) replaced by a
  single-user gear locker: weight, dims, price, condition, photo, notes.
  Cards + edit form instead of a list + action buttons; light/dark theming
  ([[theming]]). New storage key `gear-tracker:items:v2`; v1 data abandoned.
- **2026-08-17 · Store snapshot lives in memory.** Main fixed the
  useSyncExternalStore render-loop risk by caching parsed JSON; the rework's
  store subsumes that fix — the snapshot is a module variable, localStorage
  is only read once at load and written on commit. Keep it referentially
  stable ([[gotchas]]).
- **2026-08-17 · Brain v2.** Flat numbered docs replaced by this linked-note
  graph: `index.md` + `notes/*.md` with `[[wiki-links]]`. Update the matching
  note in the same branch as any behavior change.
- **2026-08-16 · Maintenance notes reuse the existing `notes` field.**
  (Superseded 2026-08-17.) `GearItem.notes` was dead in the check-out app,
  so the feature repurposed it; no migration needed.
- **2026-08-16 · localStorage over backend.** This app exists to exercise
  DevBrain, not to be good. No server, no auth, no persistence guarantees.
- **2026-08-16 · Store is the only data boundary.** Mirrors the Veriflush
  service-layer convention: UI never reads/writes storage directly.

Related: [[overview]]
