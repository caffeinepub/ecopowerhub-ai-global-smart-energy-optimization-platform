# Specification

## Summary
**Goal:** Fix broken marketing logo asset loading and eliminate broken internal navigation links across marketing-facing pages.

**Planned changes:**
- Serve the marketing logo from the `/generated/...` runtime asset directory in both `MarketingHeader` and `MarketingFooter`, and ensure the PNG exists under `frontend/public/generated/` and is present in the production build output under `frontend/dist/generated/`.
- Update internal navigation links in `MarketingHeader`/`MarketingFooter` so all internal paths match routes that exist in `frontend/src/App.tsx` (or are deliberate in-page anchors).
- Add a build-time verification step that checks all generated PNGs referenced by the marketing header/footer exist at the expected location and match expected dimensions, failing the build with a clear English error when they do not.
- Audit other prominent marketing-page internal links (at minimum: LandingPage primary CTAs and device guide buttons) and update them to navigate to existing routes declared in `frontend/src/App.tsx`.

**User-visible outcome:** The marketing header/footer logo consistently renders on load/refresh, and all key marketing navigation links (including CTAs and guide buttons) route to working pages without 404s or blank screens.
