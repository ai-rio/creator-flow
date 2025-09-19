#!/usr/bin/env node

/**
 * CreatorFlow Design Token Replacement Tool
 * Converts hardcoded styles to design tokens with preview
 */

const fs = require('fs');
const path = require('path');

// Design token mappings
const TOKEN_MAPPINGS = {
  // Spacing
  'p-1': 'p-tactical',
  'p-2': 'p-tactical',
  'p-4': 'p-tactical',
  'p-6': 'p-strategic',
  'p-8': 'p-strategic',
  'p-12': 'p-command',
  'p-16': 'p-executive',

  'px-4': 'px-tactical',
  'px-6': 'px-strategic',
  'px-8': 'px-strategic',
  'py-2': 'py-tactical',
  'py-4': 'py-tactical',
  'py-6': 'py-strategic',
  'py-8': 'py-strategic',

  'gap-2': 'gap-tactical',
  'gap-4': 'gap-tactical',
  'gap-6': 'gap-strategic',
  'gap-8': 'gap-strategic',

  'mb-4': 'mb-tactical',
  'mb-6': 'mb-strategic',
  'mb-8': 'mb-strategic',
  'mt-4': 'mt-tactical',
  'mt-6': 'mt-strategic',
  'mt-8': 'mt-strategic',

  // Colors
  'bg-white': 'bg-background',
  'bg-gray-50': 'bg-background',
  'bg-gray-100': 'bg-muted',
  'bg-gray-900': 'bg-background',
  'bg-slate-50': 'bg-background',
  'bg-slate-100': 'bg-muted',
  'bg-slate-900': 'bg-background',
  'bg-zinc-900': 'bg-background',
  'bg-black': 'bg-background',

  'text-white': 'text-foreground',
  'text-black': 'text-foreground',
  'text-gray-900': 'text-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-slate-900': 'text-foreground',
  'text-slate-600': 'text-muted-foreground',
  'text-zinc-900': 'text-foreground',

  'border-gray-200': 'border-border',
  'border-gray-300': 'border-border',
  'border-slate-200': 'border-border',

  // Brand colors
  'bg-blue-600': 'bg-brand-teal-primary',
  'bg-blue-500': 'bg-brand-teal-primary',
  'bg-teal-600': 'bg-brand-teal-primary',
  'bg-teal-500': 'bg-brand-teal-primary',
  'text-blue-600': 'text-brand-teal-primary',
  'text-teal-600': 'text-brand-teal-primary',

  // Typography
  'text-sm': 'text-body-sm',
  'text-base': 'text-body-md',
  'text-lg': 'text-body-lg',
  'text-xl': 'text-heading-sm',
  'text-2xl': 'text-heading-md',
  'text-3xl': 'text-heading-lg',
  'text-4xl': 'text-heading-xl',

  // Radius
  'rounded-lg': 'rounded-premium',
  'rounded-xl': 'rounded-executive',
  'rounded-2xl': 'rounded-executive',

  // Widths
  'max-w-md': 'max-w-content',
  'max-w-lg': 'max-w-content',
  'max-w-xl': 'max-w-content',
  'max-w-2xl': 'max-w-content',
  'max-w-4xl': 'max-w-content',
  'max-w-6xl': 'max-w-content',

  // Heights
  'h-6': 'h-icon-sm',
  'h-8': 'h-icon-md',
  'h-10': 'h-icon-lg',
  'w-6': 'w-icon-sm',
  'w-8': 'w-icon-md',
  'w-10': 'w-icon-lg',
};

// Common theme patterns that need transition classes
const THEME_PATTERNS = [
  { pattern: /bg-(background|card|muted)/, replacement: '$& transition-colors duration-300' },
  { pattern: /text-(foreground|muted-foreground)/, replacement: '$& transition-colors duration-300' },
];

function replaceTokens(filePath, preview = false) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  const changes = [];

  // Apply token mappings
  Object.entries(TOKEN_MAPPINGS).forEach(([oldToken, newToken]) => {
    const regex = new RegExp(`\\b${oldToken}\\b`, 'g');
    const matches = content.match(regex);

    if (matches) {
      updatedContent = updatedContent.replace(regex, newToken);
      changes.push({
        type: 'token',
        old: oldToken,
        new: newToken,
        count: matches.length,
      });
    }
  });

  // Apply theme transition patterns
  THEME_PATTERNS.forEach(({ pattern, replacement }) => {
    const regex = new RegExp(`(${pattern.source})(?!.*transition-colors)`, 'g');
    const matches = [...updatedContent.matchAll(regex)];

    if (matches.length > 0) {
      updatedContent = updatedContent.replace(regex, replacement);
      changes.push({
        type: 'theme',
        pattern: pattern.source,
        count: matches.length,
      });
    }
  });

  // Remove duplicate transition classes
  updatedContent = updatedContent.replace(/(transition-colors\s+duration-300\s+)+/g, 'transition-colors duration-300 ');

  if (preview) {
    showPreview(filePath, content, updatedContent, changes);
  } else {
    if (changes.length > 0) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated ${filePath}`);
      showChangeSummary(changes);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
  }
}

function showPreview(filePath, original, updated, changes) {
  console.log(`\\n📋 Preview for ${filePath}\\n`);

  if (changes.length === 0) {
    console.log('ℹ️  No changes would be made.');
    return;
  }

  console.log('📊 Summary of changes:');
  changes.forEach((change) => {
    if (change.type === 'token') {
      console.log(`  ${change.old} → ${change.new} (${change.count} occurrences)`);
    } else {
      console.log(`  Added transition-colors to ${change.count} theme classes`);
    }
  });

  console.log('\\n🔍 First 10 lines with changes:');
  const originalLines = original.split('\\n');
  const updatedLines = updated.split('\\n');

  let changesShown = 0;
  for (let i = 0; i < Math.min(originalLines.length, updatedLines.length) && changesShown < 10; i++) {
    if (originalLines[i] !== updatedLines[i]) {
      console.log(`\\n  Line ${i + 1}:`);
      console.log(`  - ${originalLines[i].trim()}`);
      console.log(`  + ${updatedLines[i].trim()}`);
      changesShown++;
    }
  }

  console.log(`\\n🔧 To apply changes, run without --preview flag`);
}

function showChangeSummary(changes) {
  console.log('\\n📊 Changes applied:');
  changes.forEach((change) => {
    if (change.type === 'token') {
      console.log(`  ✅ ${change.old} → ${change.new} (${change.count}x)`);
    } else {
      console.log(`  ✅ Added transitions to ${change.count} theme classes`);
    }
  });
}

function replaceTokensInDirectory(dirPath, preview = false) {
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

  files.forEach((file) => {
    replaceTokens(file, preview);
  });
}

// CLI interface
const args = process.argv.slice(2);
const target = args[0];
const isPreview = args.includes('--preview') || args.includes('-p');
const isDirectory = args.includes('--dir') || args.includes('-d');

if (!target) {
  console.log(`
🎨 CreatorFlow Design Token Replacement Tool

Usage:
  node scripts/replace-tokens.js <file> [--preview]
  node scripts/replace-tokens.js <directory> --dir [--preview]

Options:
  --preview, -p    Show preview without making changes
  --dir, -d        Process entire directory

Examples:
  node scripts/replace-tokens.js src/components/Hero.tsx --preview
  node scripts/replace-tokens.js src/components/mocks --dir
  node scripts/replace-tokens.js src/components --dir --preview

Features:
  ✅ Converts hardcoded Tailwind to design tokens
  ✅ Adds theme transition classes automatically
  ✅ Shows before/after preview
  ✅ Batch processing for directories
  ✅ Safe dry-run mode
  `);
  process.exit(0);
}

if (isDirectory) {
  replaceTokensInDirectory(target, isPreview);
} else {
  replaceTokens(target, isPreview);
}
