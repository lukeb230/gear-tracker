# Gotchas & known landmines

- `useSyncExternalStore(subscribe, getGear)` — `getGear` must return a stable
  reference between emits or React loops. It re-parses JSON each call, which
  works only because `emit()` gates re-renders. If you add derived state,
  memoize it in the component, not the store.
- `crypto.randomUUID()` requires a secure context — fine on localhost and
  https, breaks on plain http LAN IPs.
- Status → action mapping in `GearList.tsx` renders buttons conditionally by
  current status; adding a new `GearStatus` means touching types.ts,
  format.ts (label + color), and GearList's button logic together.
- The "actor" input defaults to `"someone"` when empty — history entries with
  actor "someone" usually mean a dev forgot to set their name, not a bug.
- In-flight branch (2026-08-17): `light-dark-mode` is reworking components
  (GearCard/GearForm/FilterBar) and theming — check its PR before assuming
  this doc's component list is current.
