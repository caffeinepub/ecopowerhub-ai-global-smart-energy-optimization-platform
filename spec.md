# Specification

## Summary
**Goal:** Fix two compilation errors in `backend/main.mo` for the equipa canister: add the missing `HashMap` import and replace hardcoded `timestamp = 0` values with `Time.now()`.

**Planned changes:**
- Add `import HashMap "mo:base/HashMap";` to the imports section of `backend/main.mo`
- Add `import Time "mo:base/Time";` to the imports section of `backend/main.mo` if not already present
- Replace all instances of `timestamp = 0` in device record construction with `timestamp = Time.now()`

**User-visible outcome:** The equipa canister compiles and deploys without errors, and registered devices return a non-zero timestamp reflecting the current IC time.
