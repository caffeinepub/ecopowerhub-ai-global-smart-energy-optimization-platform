# Specification

## Summary
**Goal:** Add a `getEnergySnapshot` query method to the equipa canister that aggregates all cached device data into a single snapshot record.

**Planned changes:**
- Add a `getEnergySnapshot` query function to the equipa canister (Motoko actor) that computes and returns a record with: `totalPower` (Float), `activeDevices` (Nat), `averageCarbon` (Float), `cycleCost` (Nat), and `timestamp` (Int)
- When no devices are cached, `totalPower` and `averageCarbon` default to 0.0 and `activeDevices` to 0
- When devices are cached, aggregate power sum, device count, and arithmetic mean of carbon values from the cache
- All existing methods remain unchanged

**User-visible outcome:** Calling `dfx canister call --query equipa getEnergySnapshot` returns a snapshot of aggregated energy data without errors, and all previously existing canister methods continue to work as before.
