# Specification

## Summary
**Goal:** Make the app work reliably on ICP static hosting by switching to hash-based routing, fixing Vite’s base path for relative assets, and adding a top-level runtime error fallback to avoid blank screens.

**Planned changes:**
- Update the existing TanStack Router configuration to use hash-based URL history so all current routes load correctly via `/#/...` deep links on ICP.
- Set `base: './'` in `frontend/vite.config.ts` so production build assets are referenced with relative paths.
- Add a top-level error fallback (using existing in-repo fallback components where possible) that displays an English error message and at least one recovery action (e.g., reload or navigate home) if an unexpected runtime error occurs during initial rendering.

**User-visible outcome:** All pages use hash URLs (e.g., `/#/dashboard`) and can be refreshed or deep-linked on ICP without 404/blank screens; built assets load correctly from an ICP asset canister; unexpected render-time errors show a visible fallback with a recovery option instead of a white screen.
