#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'pt-br'];

// Mapping of top-level keys to module files
const MODULE_MAPPING = {
  navigation: 'common',
  header: 'common',
  footer: 'common',
  errors: 'common',
  homepage: 'homepage',
  auth: 'auth',
  account: 'dashboard',
  dashboard: 'dashboard',
  orders: 'dashboard',
  components: 'features',
  test: 'test',
};

function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenObject(obj[key], newKey));
    } else {
      flattened[newKey] = obj[key];
    }
  }

  return flattened;
}

function migrateLocale(locale) {
  console.log(`Migrating ${locale}...`);

  const inputPath = path.join(__dirname, '..', 'src', 'messages', `${locale}.json`);

  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping ${locale} - file doesn't exist`);
    return;
  }

  const inputData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const flattened = flattenObject(inputData);

  // Group keys by module
  const modules = {};

  for (const [key, value] of Object.entries(flattened)) {
    const topLevelKey = key.split('.')[0];
    const moduleName = MODULE_MAPPING[topLevelKey] || 'common';

    if (!modules[moduleName]) {
      modules[moduleName] = {};
    }

    modules[moduleName][key] = value;
  }

  // Write module files
  const outputDir = path.join(__dirname, '..', 'locales', locale);
  fs.mkdirSync(outputDir, { recursive: true });

  for (const [moduleName, moduleData] of Object.entries(modules)) {
    const outputPath = path.join(outputDir, `${moduleName}.json`);
    const sortedData = Object.keys(moduleData)
      .sort()
      .reduce((obj, key) => {
        obj[key] = moduleData[key];
        return obj;
      }, {});

    fs.writeFileSync(outputPath, JSON.stringify(sortedData, null, 2));
    console.log(`  Created ${moduleName}.json with ${Object.keys(sortedData).length} keys`);
  }
}

// Run migration for all locales
LOCALES.forEach(migrateLocale);

console.log('✅ Translation migration complete!');
