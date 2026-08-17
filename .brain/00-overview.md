# Gear Tracker — overview

**What it is:** a deliberately disposable equipment check-in/check-out app.
Its purpose is to be the test subject for DevBrain (presence, PRs, collisions,
this very brain). Data lives in localStorage; there is no backend and no tests.

**Stack:** React 18 + Vite + TypeScript. No UI library — inline styles, dark
theme (`#0a0e14` background, teal `#14b8a6` accent).

**Run:** `npm install && npm run dev` → http://localhost:5173
**Build check:** `npm run build` (tsc + vite; must pass before any PR).

**Team rules for this repo:**
- Feature branches + PRs only; you cannot approve your own PR.
- Update the relevant `.brain/` doc in the same branch as any behavior change.
