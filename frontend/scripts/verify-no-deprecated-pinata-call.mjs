#!/usr/bin/env node

/**
 * Verification script to ensure no deprecated Pinata API calls exist in the codebase
 * 
 * Scans specified directories for the deprecated `pinata.upload.folder` call
 * and fails with a clear error message if found.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEPRECATED_PATTERNS = [
  'pinata.upload.folder',
  'pinata.pinFromFS', // Also deprecated in newer versions
];

const SCAN_DIRECTORIES = [
  path.join(__dirname, '..'),
  path.join(__dirname, '../../backend'),
];

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
];

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const findings = [];

  DEPRECATED_PATTERNS.forEach(pattern => {
    if (content.includes(pattern)) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes(pattern)) {
          findings.push({
            file: filePath,
            line: index + 1,
            pattern,
            content: line.trim(),
          });
        }
      });
    }
  });

  return findings;
}

function scanDirectory(dirPath) {
  let findings = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (shouldIgnore(fullPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      findings = findings.concat(scanDirectory(fullPath));
    } else if (entry.isFile() && /\.(js|mjs|ts|tsx|jsx)$/.test(entry.name)) {
      findings = findings.concat(scanFile(fullPath));
    }
  }

  return findings;
}

function main() {
  console.log('🔍 Scanning for deprecated Pinata API calls...\n');

  let allFindings = [];

  for (const dir of SCAN_DIRECTORIES) {
    if (fs.existsSync(dir)) {
      console.log(`Scanning: ${dir}`);
      const findings = scanDirectory(dir);
      allFindings = allFindings.concat(findings);
    }
  }

  if (allFindings.length > 0) {
    console.error('\n❌ DEPRECATED PINATA API CALLS FOUND:\n');
    
    allFindings.forEach(finding => {
      console.error(`File: ${finding.file}`);
      console.error(`Line: ${finding.line}`);
      console.error(`Pattern: ${finding.pattern}`);
      console.error(`Code: ${finding.content}`);
      console.error('');
    });

    console.error('ERROR: Deprecated Pinata API calls detected.');
    console.error('Please update to use the modern Pinata SDK methods:');
    console.error('  - Use pinata.upload.file() for individual files');
    console.error('  - Use the pinata-pin.mjs script for folder pinning');
    console.error('\nSee frontend/docs/pinata-pinning.md for details.\n');
    
    process.exit(1);
  }

  console.log('✅ No deprecated Pinata API calls found.\n');
  process.exit(0);
}

main();
