#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Convert flat keys to nested objects
 */
function flatToNested(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    setNestedValue(result, key, value);
  }

  return result;
}

/**
 * Set a nested value using dot notation
 */
function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || Array.isArray(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
}

/**
 * Process a single JSON file
 */
function processFile(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');
    const flatObj = JSON.parse(content);

    // Check if this file has flat keys (keys with dots)
    const hasFlatKeys = Object.keys(flatObj).some((key) => key.includes('.'));

    if (!hasFlatKeys) {
      console.log(`  ✓ Already nested format`);
      return;
    }

    const nestedObj = flatToNested(flatObj);

    // Write back to file with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(nestedObj, null, 2) + '\n');

    console.log(`  ✓ Converted ${Object.keys(flatObj).length} keys to nested format`);
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Process all JSON files in locales directory
 */
function processLocalesDirectory() {
  const localesDir = path.join(__dirname, '../locales');

  if (!fs.existsSync(localesDir)) {
    console.error('Locales directory not found:', localesDir);
    return;
  }

  const locales = fs
    .readdirSync(localesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log(`Found locales: ${locales.join(', ')}`);

  for (const locale of locales) {
    const localeDir = path.join(localesDir, locale);
    console.log(`\nProcessing locale: ${locale}`);

    const files = fs.readdirSync(localeDir).filter((file) => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      processFile(filePath);
    }
  }
}

// Run the conversion
console.log('🔄 Converting flat keys to nested structure...\n');
processLocalesDirectory();
console.log('\n✅ Conversion complete!');
