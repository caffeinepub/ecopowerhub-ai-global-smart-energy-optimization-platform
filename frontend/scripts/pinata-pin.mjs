#!/usr/bin/env node

/**
 * Modern Pinata IPFS Pinning Script
 * 
 * Recursively pins files from a directory to IPFS using the current Pinata SDK.
 * Generates a deterministic manifest mapping file paths to CIDs.
 * 
 * Usage:
 *   node pinata-pin.mjs <directory-path>
 * 
 * Environment Variables Required:
 *   PINATA_JWT - Your Pinata API JWT token
 *   PINATA_GATEWAY (optional) - Your Pinata gateway domain
 */

import { PinataSDK } from 'pinata';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { discoverFiles } from './pinata-fs-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  console.error(`${colors.red}ERROR: ${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

/**
 * Validate environment variables
 */
function validateEnvironment() {
  const requiredVars = ['PINATA_JWT'];
  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    logError('Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`  - ${varName}`);
    });
    console.error('\nPlease set the following environment variables:');
    console.error('  PINATA_JWT          Your Pinata API JWT token (required)');
    console.error('  PINATA_GATEWAY      Your Pinata gateway domain (optional)');
    console.error('\nExample:');
    console.error('  export PINATA_JWT="your-jwt-token-here"');
    console.error('  export PINATA_GATEWAY="example-gateway.mypinata.cloud"');
    process.exit(1);
  }
}

/**
 * Initialize Pinata SDK
 */
function initializePinata() {
  try {
    const config = {
      pinataJwt: process.env.PINATA_JWT,
    };

    if (process.env.PINATA_GATEWAY) {
      config.pinataGateway = process.env.PINATA_GATEWAY;
    }

    return new PinataSDK(config);
  } catch (error) {
    logError(`Failed to initialize Pinata SDK: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Pin a single file to IPFS via Pinata
 */
async function pinFile(pinata, filePath, relativePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    // Create a File object from the buffer
    const file = new File([fileBuffer], fileName, {
      type: 'application/octet-stream'
    });

    logInfo(`Pinning: ${relativePath}`);
    
    // Use the modern Pinata SDK upload method
    const result = await pinata.upload.file(file);
    
    logSuccess(`Pinned: ${relativePath} → ${result.cid}`);
    
    return {
      path: relativePath,
      cid: result.cid,
      size: fileBuffer.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logError(`Failed to pin ${relativePath}: ${error.message}`);
    throw error;
  }
}

/**
 * Pin all files in a directory
 */
async function pinDirectory(pinata, directoryPath) {
  logInfo(`Discovering files in: ${directoryPath}`);
  
  const files = discoverFiles(directoryPath);
  
  if (files.length === 0) {
    logError(`No files found in directory: ${directoryPath}`);
    console.error('Please ensure the directory exists and contains files.');
    process.exit(1);
  }

  logInfo(`Found ${files.length} file(s) to pin`);
  
  const results = [];
  let successCount = 0;
  let failureCount = 0;

  for (const fileInfo of files) {
    try {
      const result = await pinFile(pinata, fileInfo.absolutePath, fileInfo.relativePath);
      results.push(result);
      successCount++;
    } catch (error) {
      failureCount++;
      results.push({
        path: fileInfo.relativePath,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return {
    results,
    successCount,
    failureCount,
    totalFiles: files.length,
  };
}

/**
 * Write manifest to disk
 */
function writeManifest(directoryPath, pinningResults) {
  const manifest = {
    version: '1.0',
    inputDirectory: directoryPath,
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: pinningResults.totalFiles,
      successfulPins: pinningResults.successCount,
      failedPins: pinningResults.failureCount,
    },
    files: pinningResults.results,
  };

  const manifestPath = path.join(process.cwd(), 'pinata-manifest.json');
  
  try {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    logSuccess(`Manifest written to: ${manifestPath}`);
    return manifestPath;
  } catch (error) {
    logError(`Failed to write manifest: ${error.message}`);
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  log('\n=== Pinata IPFS Pinning Script ===\n', 'blue');

  // Parse command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node pinata-pin.mjs <directory-path>');
    console.log('\nPins all files in the specified directory to IPFS via Pinata.');
    console.log('Generates a JSON manifest mapping file paths to CIDs.');
    console.log('\nRequired Environment Variables:');
    console.log('  PINATA_JWT          Your Pinata API JWT token');
    console.log('  PINATA_GATEWAY      Your Pinata gateway domain (optional)');
    console.log('\nExample:');
    console.log('  export PINATA_JWT="your-jwt-token"');
    console.log('  node pinata-pin.mjs ./frontend/public/generated');
    process.exit(0);
  }

  const directoryPath = path.resolve(args[0]);

  // Validate directory exists
  if (!fs.existsSync(directoryPath)) {
    logError(`Directory does not exist: ${directoryPath}`);
    console.error('Please provide a valid directory path.');
    process.exit(1);
  }

  if (!fs.statSync(directoryPath).isDirectory()) {
    logError(`Path is not a directory: ${directoryPath}`);
    console.error('Please provide a directory path, not a file.');
    process.exit(1);
  }

  // Validate environment
  validateEnvironment();

  // Initialize Pinata
  const pinata = initializePinata();
  logSuccess('Pinata SDK initialized');

  try {
    // Pin all files
    const pinningResults = await pinDirectory(pinata, directoryPath);

    // Write manifest
    const manifestPath = writeManifest(directoryPath, pinningResults);

    // Summary
    log('\n=== Pinning Summary ===', 'blue');
    logInfo(`Total files: ${pinningResults.totalFiles}`);
    logSuccess(`Successfully pinned: ${pinningResults.successCount}`);
    
    if (pinningResults.failureCount > 0) {
      logWarning(`Failed to pin: ${pinningResults.failureCount}`);
    }
    
    logInfo(`Manifest: ${manifestPath}`);
    log('');

    process.exit(pinningResults.failureCount > 0 ? 1 : 0);
  } catch (error) {
    logError(`Pinning failed: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  logError(`Unexpected error: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
