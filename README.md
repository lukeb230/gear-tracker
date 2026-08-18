# Gear Tracker

A deliberately disposable personal outdoor gear inventory. Its entire purpose
in life is to be the test subject for **DevBrain** — presence, PR collision
warnings, context digests, the works.

Catalog gear with weight, packed size, price, condition, and photos; flag
items as in maintenance and jot what needs fixing; toggle light/dark mode.
Data lives in localStorage. There is no backend. There are no tests. It is
glorious.

## Run

```bash
npm install
npm run dev
```

## DevBrain test ideas

- Two people open branches touching `src/lib/store.ts` → collision warning.
- One Claude Code session edits `GearCard.tsx` while another edits
  `GearForm.tsx` → both show in "Now working", no collision.
- Open a PR renaming something in `types.ts` → PR panel + changed-file chips.
- Run `devbrain ctx` inside the repo → context digest with open PRs.

## Structure

```
src/
  types.ts               shared types (GearItem, GearCondition, …)
  theme.ts               light/dark mode hook
  lib/store.ts           localStorage store + pub/sub
  lib/format.ts          weight / dims / price / date formatting
  lib/image.ts           photo compression
  components/Header      title + theme toggle
  components/StatsBar    items / total weight / categories
  components/FilterBar   search + category chips
  components/GearCard    item card + inline maintenance notes
  components/GearForm    add/edit panel
  App.tsx                composition
```

The team knowledge base lives in `.brain/` (`index.md` + `notes/`).
