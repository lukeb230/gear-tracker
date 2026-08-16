# Gear Tracker

A deliberately disposable equipment check-in/check-out app. Its entire purpose
in life is to be the test subject for **DevBrain** — presence, PR collision
warnings, context digests, the works.

Track gear, check it out to people, flag it for maintenance, watch the
activity log. Data lives in localStorage. There is no backend. There are no
tests. It is glorious.

## Run

```bash
npm install
npm run dev
```

## DevBrain test ideas

- Two people open branches touching `src/lib/store.ts` → collision warning.
- One Claude Code session edits `GearList.tsx` while another edits
  `AddGearForm.tsx` → both show in "Now working", no collision.
- Open a PR renaming something in `types.ts` → PR panel + changed-file chips.
- Run `devbrain ctx` inside the repo → context digest with open PRs.

## Structure

```
src/
  types.ts               shared types
  lib/store.ts           localStorage store + pub/sub
  lib/format.ts          labels, colors, relative time
  components/StatsBar    counts
  components/AddGearForm add form
  components/GearList    list + actions
  components/HistoryLog  activity feed
  App.tsx                composition
```
