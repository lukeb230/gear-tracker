# overview

**What it is:** a personal outdoor gear inventory — a single-user locker of
gear with weight, packed size, price, condition, photo, and notes per item.
Originally a check-in/check-out app; the `light-dark-mode` branch rebuilt it
as an inventory (see [[decisions]]). Still deliberately disposable: it exists
as the test subject for DevBrain. Data lives in localStorage; no backend, no
tests.

**Stack:** React 18 + Vite + TypeScript. No UI library — a single
`src/styles.css` with theme tokens (see [[theming]]). Type set: Bitter slab
for display, Cabin for body, IBM Plex Mono for spec figures.

**Run:** `npm install && npm run dev` → http://localhost:5173
**Build check:** `npm run build` (tsc + vite; must pass before any PR).

**Team rules for this repo:**
- Feature branches + PRs only; you cannot approve your own PR.
- Merge origin/main and resolve conflicts before opening a PR.
- Update the matching brain note in the same branch as any behavior change.

Related: [[architecture]], [[gotchas]]
