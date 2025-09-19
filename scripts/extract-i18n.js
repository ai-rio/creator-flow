#!/usr/bin/env node

/**
 * CreatorFlow I18n Extraction Helper
 * Finds hardcoded strings and suggests translation keys
 */

const fs = require('fs');
const path = require('path');

// Patterns to identify hardcoded strings
const STRING_PATTERNS = [
  // JSX text content
  { pattern: />([^<>{}\n]+)</g, type: 'jsx_text' },
  // String literals in JSX attributes
  { pattern: /(\w+)=["']([^"'{}]+)["']/g, type: 'jsx_attribute' },
  // String literals in JavaScript
  { pattern: /["']([^"'\n{}]+)["']/g, type: 'js_string' },
];

// Common attribute names that likely contain user-facing text
const TEXT_ATTRIBUTES = [
  'placeholder',
  'title',
  'alt',
  'aria-label',
  'aria-describedby',
  'label',
  'description',
  'tooltip',
];

// Words/patterns to exclude (not user-facing)
const EXCLUDE_PATTERNS = [
  /^(className|style|src|href|id|key|role|data-\w+)$/,
  /^(bg-|text-|p-|m-|w-|h-|flex|grid|border|rounded)/,
  /^(import|export|from|const|let|var|function|return)/,
  /^(\d+|true|false|null|undefined)$/,
  /^[a-f0-9]{6,}$/i, // hex colors
  /^https?:\/\//i, // URLs
  /^\w+\.\w+/, // file extensions or object notation
  /^\/[\w\/-]*$/, // paths
  /^[\w-]+\.tsx?$/, // file names
];

function extractStringsFromFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const foundStrings = new Set();
  const suggestions = [];

  // Remove existing translation calls to avoid suggesting already translated strings
  const cleanContent = content
    .replace(/t\s*\(\s*['"`][^'"`]+['"`]\s*[^)]*\)/g, '') // Remove t('key') calls
    .replace(/\{t\s*\(\s*['"`][^'"`]+['"`]\s*[^)]*\)\}/g, '') // Remove {t('key')} calls
    .replace(/getTranslations\s*\([^)]+\)/g, ''); // Remove getTranslations calls

  STRING_PATTERNS.forEach(({ pattern, type }) => {
    let match;
    while ((match = pattern.exec(cleanContent)) !== null) {
      let text = match[1] || match[2];

      if (!text) continue;

      text = text.trim();

      // Skip if empty or too short
      if (text.length < 2) continue;

      // Skip if matches exclude patterns
      if (EXCLUDE_PATTERNS.some((exclude) => exclude.test(text))) continue;

      // Skip if it's likely code/style related
      if (type === 'jsx_attribute' && match[1] && !TEXT_ATTRIBUTES.includes(match[1])) continue;

      // Skip if it's already been found
      if (foundStrings.has(text)) continue;

      foundStrings.add(text);

      const suggestion = generateI18nSuggestion(text, filePath, type);
      if (suggestion) {
        suggestions.push({
          text,
          type,
          suggestion,
          context: getContext(content, match.index),
        });
      }
    }
  });

  return suggestions;
}

function generateI18nSuggestion(text, filePath, type) {
  // Determine component hierarchy from file path
  const pathParts = filePath.split('/');
  const fileName = path.basename(filePath, '.tsx');

  // Detect atomic component level
  let level = 'organisms'; // default
  if (pathParts.includes('atoms')) level = 'atoms';
  else if (pathParts.includes('molecules')) level = 'molecules';
  else if (pathParts.includes('compositions')) level = 'compositions';

  // Generate component name (convert PascalCase to camelCase)
  const componentName = fileName.charAt(0).toLowerCase() + fileName.slice(1);

  // Generate key based on text content and type
  let key;
  if (type === 'jsx_text') {
    if (text.length > 50) {
      key = 'description';
    } else if (text.includes('?')) {
      key = 'question';
    } else if (text.endsWith('!')) {
      key = 'exclamation';
    } else if (/^(get|start|try|learn|view|see|explore)/i.test(text)) {
      key = 'actions.' + generateActionKey(text);
    } else {
      key = generateTextKey(text);
    }
  } else if (type === 'jsx_attribute') {
    key = generateAttributeKey(text);
  } else {
    key = generateGenericKey(text);
  }

  return `components.atomic.${level}.${componentName}.${key}`;
}

function generateActionKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 3)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('');
}

function generateTextKey(text) {
  if (text.toLowerCase().includes('title') || text.length < 20) {
    return 'title';
  } else if (text.toLowerCase().includes('subtitle')) {
    return 'subtitle';
  } else if (text.length > 100) {
    return 'description';
  } else {
    return 'content';
  }
}

function generateAttributeKey(text) {
  if (text.toLowerCase().includes('placeholder')) {
    return 'placeholder';
  } else if (text.toLowerCase().includes('search')) {
    return 'search';
  } else {
    return 'label';
  }
}

function generateGenericKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .slice(0, 15);
}

function getContext(content, index) {
  const lines = content.split('\n');
  let currentIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineEnd = currentIndex + lines[i].length + 1;
    if (index >= currentIndex && index < lineEnd) {
      return {
        line: i + 1,
        content: lines[i].trim(),
      };
    }
    currentIndex = lineEnd;
  }

  return { line: 1, content: '' };
}

function generateTranslationFiles(suggestions, locale = 'en') {
  const translations = {};

  suggestions.forEach(({ suggestion, text }) => {
    const keyParts = suggestion.split('.');
    let current = translations;

    // Build nested structure
    for (let i = 0; i < keyParts.length - 1; i++) {
      if (!current[keyParts[i]]) {
        current[keyParts[i]] = {};
      }
      current = current[keyParts[i]];
    }

    const finalKey = keyParts[keyParts.length - 1];
    current[finalKey] = text;
  });

  return translations;
}

function extractI18n(filePath, options = {}) {
  const { preview = false, generateKeys = false, locale = 'en' } = options;

  console.log(`\\n🔍 Analyzing ${filePath} for hardcoded strings...\\n`);

  const suggestions = extractStringsFromFile(filePath);

  if (suggestions.length === 0) {
    console.log('✅ No hardcoded strings found!');
    return;
  }

  console.log(`📊 Found ${suggestions.length} potential strings to translate:\\n`);

  suggestions.forEach((item, index) => {
    console.log(`${index + 1}. "${item.text}"`);
    console.log(`   Type: ${item.type}`);
    console.log(`   Suggested key: ${item.suggestion}`);
    console.log(`   Context: Line ${item.context.line} - ${item.context.content}`);
    console.log('');
  });

  if (generateKeys) {
    const translations = generateTranslationFiles(suggestions, locale);
    const outputPath = `extracted-translations-${locale}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));
    console.log(`\\n📝 Generated translation template: ${outputPath}`);

    console.log('\\n🔧 To integrate these translations:');
    console.log('1. Review and refine the generated keys');
    console.log('2. Merge with your existing locales/*/features.json files');
    console.log('3. Replace hardcoded strings with t() calls');
  }

  if (preview) {
    console.log('\\n🔄 Example transformation:');
    const example = suggestions[0];
    console.log(`Before: "${example.text}"`);
    console.log(`After: {t('${example.suggestion}')}`);
  }
}

function extractFromDirectory(dirPath, options = {}) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    return;
  }

  const files = [];
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dirPath);

  console.log(`🔍 Found ${files.length} TypeScript files in ${dirPath}`);

  const allSuggestions = [];
  files.forEach((file) => {
    const suggestions = extractStringsFromFile(file);
    if (suggestions.length > 0) {
      console.log(`\\n📁 ${file}: ${suggestions.length} strings found`);
      allSuggestions.push(...suggestions);
    }
  });

  if (options.generateKeys) {
    const translations = generateTranslationFiles(allSuggestions, options.locale);
    const outputPath = `batch-extracted-translations-${options.locale}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));
    console.log(`\\n📝 Generated batch translation template: ${outputPath}`);
  }
}

// CLI interface
const args = process.argv.slice(2);
const target = args[0];
const isPreview = args.includes('--preview') || args.includes('-p');
const isDirectory = args.includes('--dir') || args.includes('-d');
const generateKeys = args.includes('--generate') || args.includes('-g');
const locale = args.find((arg) => arg.startsWith('--locale='))?.split('=')[1] || 'en';

if (!target) {
  console.log(`
🌐 CreatorFlow I18n Extraction Helper

Usage:
  node scripts/extract-i18n.js <file> [options]
  node scripts/extract-i18n.js <directory> --dir [options]

Options:
  --preview, -p         Show transformation examples
  --dir, -d            Process entire directory
  --generate, -g       Generate translation file template
  --locale=<locale>    Target locale (default: en)

Examples:
  node scripts/extract-i18n.js src/components/Hero.tsx --preview
  node scripts/extract-i18n.js src/components/mocks --dir --generate
  node scripts/extract-i18n.js src/components --dir --generate --locale=es

Features:
  ✅ Detects hardcoded strings in JSX and JavaScript
  ✅ Suggests nested translation keys following atomic convention
  ✅ Excludes code, styles, and non-user-facing content
  ✅ Generates translation file templates
  ✅ Shows context and line numbers
  ✅ Batch processing for directories
  `);
  process.exit(0);
}

const options = { preview: isPreview, generateKeys, locale };

if (isDirectory) {
  extractFromDirectory(target, options);
} else {
  extractI18n(target, options);
}
