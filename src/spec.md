# Specification

## Summary
**Goal:** Fix the HTTP outcalls import error in backend/main.mo by replacing the missing ExperimentalHttpOutcalls module with the correct implementation.

**Planned changes:**
- Remove the non-existent import 'import ExperimentalHttpOutcalls "mo:base/ExperimentalHttpOutcalls"' from backend/main.mo
- Define HTTP outcalls types and management canister interface directly in backend/main.mo (HttpRequestArgs, HttpHeader, HttpMethod, HttpResponsePayload, management canister actor)
- Update all existing HTTP outcall usage to use the corrected type definitions
- Ensure device API calls and weather data fetching continue to work

**User-visible outcome:** The backend compiles successfully without import errors, and all existing HTTP outcall functionality (device management, weather API) works as before.
