#!/usr/bin/env node
/**
 * EcoPowerHub.ai — Device Polling Script
 * =======================================
 * Polls Equipa canister for registered devices.
 * Uses named identity 'automation-plain' (plaintext, works non-interactively in cron).
 *
 * Usage:
 *   node poll-devices.cjs          # continuous loop every 30s
 *   node poll-devices.cjs --once   # single run, then exit (for cron)
 *
 * Cron example (every minute):
 *   * * * * * cd /home/bill/ecopowerhub-ai-clean && /usr/bin/node poll-devices.cjs --once >> /home/bill/ecopowerhub-poll.log 2>&1
 */

'use strict';

const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);
const LOG_FILE = path.join(process.env.HOME || '/home/bill', 'ecopowerhub-poll.log');

function log(msg, type = 'INFO') {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${type.padEnd(6)} ${msg}\n`;
  process.stdout.write(line);
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}

// ─── Configuration ────────────────────────────────────────────────────────────

const DEVICE_IDS = [
  'shelly-1',
  'shelly-em',
  'shelly-live',
];

const CANISTER_NAME = 'equipa';
const DFX_IDENTITY = 'automation-plain';
const NETWORK = 'local';
const DEFAULT_INTERVAL_MS = 30_000;

// ─── Poll Functions ──────────────────────────────────────────────────────────

async function fetchDevice(deviceId) {
  log(`Fetching ${deviceId}...`);
  try {
    const cmd = `dfx --identity ${DFX_IDENTITY} canister --network ${NETWORK} call ${CANISTER_NAME} fetchDeviceData '("${deviceId}")'`;
    const { stdout, stderr } = await execPromise(cmd);
    log(`OK ${deviceId}: ${stdout.trim()}`);
    if (stderr && stderr.trim()) {
      log(`stderr ${deviceId}: ${stderr.trim()}`, 'WARN');
    }
  } catch (err) {
    log(`ERROR ${deviceId}: ${err.message}`, 'ERROR');
  }
}

async function pollAllDevices() {
  if (DEVICE_IDS.length === 0) {
    log('No devices configured. Edit DEVICE_IDS in poll-devices.cjs', 'WARN');
    return;
  }

  log(`Starting poll cycle (${DEVICE_IDS.length} devices)`);

  for (const id of DEVICE_IDS) {
    await fetchDevice(id);
  }

  log('Poll cycle complete');
  log('─'.repeat(50));
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

(async () => {
  const isOnce = process.argv.includes('--once');

  log('EcoPowerHub.ai poller starting');
  log(`Canister : ${CANISTER_NAME}`);
  log(`Identity : ${DFX_IDENTITY}`);
  log(`Network  : ${NETWORK}`);
  log(`Devices  : ${DEVICE_IDS.join(', ') || '(none)'}`);
  log(`Interval : ${DEFAULT_INTERVAL_MS} ms`);
  log(`Mode     : ${isOnce ? 'single run (--once)' : 'continuous loop'}`);

  await pollAllDevices();

  if (isOnce) {
    process.exit(0);
  }

  setInterval(pollAllDevices, DEFAULT_INTERVAL_MS);
})();
