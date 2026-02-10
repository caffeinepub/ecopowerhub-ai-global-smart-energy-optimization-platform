# Specification

## Summary
**Goal:** Ensure required generated PNG assets are present with exact filenames and dimensions, and enforce dimension validation during build verification.

**Planned changes:**
- Add the specified PNG files to `frontend/public/generated/` with exact case-sensitive filenames and the exact pixel dimensions encoded in each filename.
- Update `frontend/vite-build-verify.js` to validate both presence and actual pixel dimensions (width×height) for the required generated PNG files in `frontend/public/generated/` and `frontend/dist/generated/`, failing with clear English errors on mismatch.

**User-visible outcome:** All required `/generated/<filename>` assets load successfully at runtime (HTTP 200), and the build verification script reliably fails if any required image is missing or has incorrect dimensions.
