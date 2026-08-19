# architecture

One-page app, one-way data flow, no router. Layout after the inventory
rework (the `light-dark-mode` branch — see [[decisions]]):

```
src/
  types.ts            GearItem, GearCondition, GearDraft, CATEGORIES,
                      CONDITIONS — change types FIRST
  theme.ts            useTheme hook: light/dark persistence (see [[theming]])
  lib/store.ts        THE data layer: localStorage + tiny pub/sub.
                      Snapshot lives in a module variable; commit() writes
                      storage and notifies subscribers.
  lib/format.ts       weight / dims / price / date formatting helpers
  lib/image.ts        photo → compressed data URL for card images
  components/
    Header.tsx        title + theme toggle
    StatsBar.tsx      items / total weight / categories
    FilterBar.tsx     search + category chips + add button
    GearCard.tsx      one item card; inline maintenance-notes input when
                      condition is "maintenance" (see [[maintenance-notes]])
    GearForm.tsx      add/edit panel for the full GearDraft; brand field is
                      a datalist combobox (see [[brand-picker]])
  App.tsx             composition, search/filter state, form open/edit state,
                      brandOptions for the brand picker
  main.tsx            mount
```

**Data flow:** components call store functions → `commit()` replaces the
in-memory snapshot, writes localStorage, and notifies → components re-read
via `useSyncExternalStore`. Components never touch localStorage directly.

**State keys:** `gear-tracker:items:v2` (gear), `gear-tracker:theme`
(see [[theming]]). The v1 keys (`gear-tracker:items`, `:history`, `:actor`)
belong to the old check-out app and are abandoned, not migrated.

Removed in the rework: GearList, AddGearForm, HistoryLog, the actor concept,
and the history log. GearList's maintenance-notes UI was ported to GearCard
([[maintenance-notes]]).

Related: [[overview]], [[gotchas]]
