/**
 * File system utilities for deterministic file discovery
 * 
 * Provides stable, sorted file enumeration for consistent pinning results.
 */

import fs from 'fs';
import path from 'path';

/**
 * Recursively discover all files in a directory
 * Returns a deterministically sorted list of files with relative paths
 * 
 * @param {string} rootPath - Root directory to scan
 * @returns {Array<{relativePath: string, absolutePath: string}>}
 */
export function discoverFiles(rootPath) {
  const files = [];

  function scanDirectory(currentPath, relativePath = '') {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    // Sort entries alphabetically for deterministic ordering
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);
      const entryRelativePath = relativePath ? path.join(relativePath, entry.name) : entry.name;

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(entryPath, entryRelativePath);
      } else if (entry.isFile()) {
        // Add file to list
        files.push({
          relativePath: entryRelativePath.replace(/\\/g, '/'), // Normalize path separators
          absolutePath: entryPath,
        });
      }
    }
  }

  scanDirectory(rootPath);

  // Final sort by relative path for consistency
  files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  return files;
}

/**
 * Get file size in bytes
 * 
 * @param {string} filePath - Path to file
 * @returns {number} File size in bytes
 */
export function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

/**
 * Format bytes to human-readable string
 * 
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
