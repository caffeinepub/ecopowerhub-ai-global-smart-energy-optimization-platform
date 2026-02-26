#!/usr/bin/env node

/**
 * Resend Base64 Slice for EcoPowerHub AI monochrome-dark logo PNG
 * 
 * This script reads the 1024x1024 monochrome-dark logo PNG (white on transparent),
 * encodes it to Base64, and outputs a specified slice as plain text 
 * (no formatting, no code fences, no trailing newline).
 * 
 * Usage:
 *   node resend-ecopowerhub-logo-mono-dark-slice.mjs [sliceNumber]
 *   
 * Examples:
 *   node resend-ecopowerhub-logo-mono-dark-slice.mjs     # Outputs Slice 1 (default)
 *   node resend-ecopowerhub-logo-mono-dark-slice.mjs 2   # Outputs Slice 2
 *   node resend-ecopowerhub-logo-mono-dark-slice.mjs 3   # Outputs Slice 3
 *   node resend-ecopowerhub-logo-mono-dark-slice.mjs 4   # Outputs Slice 4
 * 
 * The slice is suitable for concatenation with other slices and single-pass decoding.
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse slice number from command line (default to 1)
const sliceNumber = parseInt(process.argv[2] || '1', 10);

if (isNaN(sliceNumber) || sliceNumber < 1 || sliceNumber > 4) {
  process.stderr.write('ERROR: Slice number must be between 1 and 4\n');
  process.stderr.write('Usage: node resend-ecopowerhub-logo-mono-dark-slice.mjs [1-4]\n');
  process.exit(1);
}

// Define paths (prefer assets/generated, fallback to public/generated)
const primaryPath = join(__dirname, '../public/assets/generated/logo-mono-dark.dim_1024x1024.png');
const fallbackPath = join(__dirname, '../public/generated/logo-mono-dark.png');

let imagePath;
if (existsSync(primaryPath)) {
  imagePath = primaryPath;
} else if (existsSync(fallbackPath)) {
  imagePath = fallbackPath;
} else {
  // Write error to stderr (not stdout) to keep stdout clean
  process.stderr.write('ERROR: PNG file not found at either path:\n');
  process.stderr.write(`  Primary: ${primaryPath}\n`);
  process.stderr.write(`  Fallback: ${fallbackPath}\n`);
  process.exit(1);
}

try {
  // Read the PNG file
  const imageBytes = readFileSync(imagePath);
  
  // Encode to Base64
  const base64Full = imageBytes.toString('base64');
  
  // Calculate slice boundaries (4 equal slices using Math.ceil for consistency)
  const totalLength = base64Full.length;
  const sliceSize = Math.ceil(totalLength / 4);
  
  // Calculate start and end positions for the requested slice
  const startPos = (sliceNumber - 1) * sliceSize;
  const endPos = Math.min(sliceNumber * sliceSize, totalLength);
  
  // Extract the requested slice
  const slice = base64Full.substring(startPos, endPos);
  
  // Output ONLY the slice as plain text to stdout
  // Use process.stdout.write (not console.log) to avoid trailing newline
  process.stdout.write(slice);
  
} catch (error) {
  // Write error to stderr (not stdout) to keep stdout clean
  process.stderr.write(`ERROR reading or encoding PNG: ${error.message}\n`);
  process.exit(1);
}
