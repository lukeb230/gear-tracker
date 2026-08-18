# gotchas

- `useSyncExternalStore(subscribe, getGear)` — `getGear` must return a
  stable reference between commits or React loops. The store keeps the
  snapshot in a module variable and only replaces it in `commit()`; never
  make `getGear` re-read/re-parse localStorage per call, and memoize derived
  state in components, not the store.
- `commit()` swallows localStorage quota errors (usually photos): state
  still updates in memory but won't survive reload. Photos are compressed in
  `lib/image.ts` to keep this rare.
- `crypto.randomUUID()` requires a secure context — fine on localhost and
  https, breaks on plain http LAN IPs.
- Adding a `GearCondition` value means touching types.ts (union +
  CONDITIONS) and styles.css (`.condition.<value>` badge color) together;
  the form select and card badge render from CONDITIONS automatically. See
  [[maintenance-notes]] for the "maintenance" example.
- The inline maintenance-notes input keeps a local draft and saves on blur;
  edits made elsewhere (e.g. the form) while a card's input is mounted won't
  refresh that draft. Same behavior as the original feature — accepted.
- Old v1 localStorage keys (`gear-tracker:items`, `:history`, `:actor`) are
  not migrated to `gear-tracker:items:v2` ([[decisions]]).

Related: [[architecture]]
