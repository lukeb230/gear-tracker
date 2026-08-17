# Decisions log

Append new entries at the top: date · decision · why.

- **2026-08-17 · Brain seeded.** First `.brain/` for this repo, structure:
  overview / architecture / decisions / gotchas. Update the matching doc in
  the same branch as any behavior change.
- **2026-08-16 · localStorage over backend.** This app exists to exercise
  DevBrain, not to be good. No server, no auth, no persistence guarantees.
- **2026-08-16 · Store is the only data boundary.** Mirrors the Veriflush
  service-layer convention: UI never reads/writes storage directly.
- **2026-08-16 · History capped at 200 entries** (stored) / 20 (rendered) to
  keep localStorage small.
