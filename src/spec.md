# Specification

## Summary
**Goal:** Update both the authenticated app header and the marketing site header to use the new monochrome logo assets, switching correctly for light/dark theme.

**Planned changes:**
- Update `frontend/src/components/Header.tsx` to render `/logo-mono-white.png` in light mode and `/logo-mono-dark.png` in dark mode, with logo height set to 80px and width auto, and exact alt text per theme.
- Update `frontend/src/components/MarketingHeader.tsx` to use the same light/dark logo selection, 80px height with width auto, and matching alt text strings.

**User-visible outcome:** The header logo on both the marketing site and the authenticated app displays the correct monochrome logo for the current light/dark theme at a consistent 80px height.
