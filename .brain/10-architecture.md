# Architecture

One-page app, one-way data flow, no router.

```
src/
  types.ts            GearItem, GearStatus, HistoryEntry — change types FIRST
  lib/store.ts        THE data layer: localStorage + tiny pub/sub (subscribe/emit)
  lib/format.ts       statusLabel / statusColor / timeAgo helpers
  components/
    StatsBar.tsx      counts row (total / in shop / out / maintenance)
    AddGearForm.tsx   name + category form → store.addGear
    GearList.tsx      list + per-item actions (check out / return / maint / delete)
                      + maintenance-notes input (shown only while in maintenance,
                      saves on blur via store.setNotes)
    HistoryLog.tsx    last 20 activity entries
  App.tsx             composition + actor (your name) persistence
  main.tsx            mount + body styling
```

**Data flow:** components call store functions → store writes localStorage →
store `emit()`s → every subscriber re-reads via `useSyncExternalStore`.
Components never touch localStorage directly — always through `lib/store.ts`.

**State keys:** `gear-tracker:items`, `gear-tracker:history`,
`gear-tracker:actor`.
