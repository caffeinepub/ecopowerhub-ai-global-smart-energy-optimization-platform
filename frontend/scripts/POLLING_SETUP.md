# EcoPowerHub.ai – Headless Polling Setup Guide

This guide explains how to configure the `poll-devices.cjs` script to run
automatically in headless environments (cron, systemd, CI/CD).

The script uses the named dfx identity **`automation`** (plaintext, no passphrase)
directly via the `--identity` flag. No environment variables or PEM file exports
are required. The `--network local` flag is always included so the script works
correctly in cron environments that have no dfx project context.

> **Security note:** Keep `secure-bill` (encrypted) for interactive mainnet
> deployments and admin operations only. Use `automation` (plaintext) exclusively
> for local automated polling.

---

## Prerequisites

### Step 1 – Create the `automation` identity (one-time setup)

The `automation` identity must be created with `--storage-mode plaintext` so that
dfx can use it non-interactively without prompting for a passphrase.

