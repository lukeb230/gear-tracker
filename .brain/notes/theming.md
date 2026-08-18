# theming

Light/dark mode, added by the inventory rework ([[decisions]]).

- `src/theme.ts` — `useTheme()` hook. Initial theme: saved value in
  localStorage (`gear-tracker:theme`), else `prefers-color-scheme`. An effect
  stamps `data-theme` on `<html>` and persists the choice; the Header button
  toggles it.
- `src/styles.css` — all colors are custom-property tokens declared on
  `:root` (light: map-paper) and overridden under `:root[data-theme="dark"]`
  (spruce-night). Both blocks set `color-scheme` so native controls match.
- **Rule:** never hard-code a color in a component; use the tokens
  (`--bg`, `--surface`, `--ink`, `--muted`, `--accent`, `--danger`, …).
  Inline styles are gone from components; styling lives in classes.

Related: [[architecture]]
