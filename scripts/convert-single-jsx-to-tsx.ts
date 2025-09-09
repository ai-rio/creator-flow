#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';
import { execSync } from 'child_process';

const JSX_DIR = '/home/carlos/projects/creator-flow/docs/development/dashboard-design/03-jsx-mock';
const TSX_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

async function convertSingleFile(jsxFileName: string) {
  const jsxPath = `${JSX_DIR}/${jsxFileName}`;
  let content = await readFile(jsxPath, 'utf-8');
  
  if (content.trim().length === 0) {
    console.log(`❌ Skipping empty file: ${jsxFileName}`);
    return false;
  }

  // Generate TSX filename
  const tsxFileName = jsxFileName
    .replace('.jsx', '.tsx')
    .replace(/^([a-z])/, (match) => match.toUpperCase())
    .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

  console.log(`🔄 Converting: ${jsxFileName} -> ${tsxFileName}`);

  // Basic TypeScript conversion following Microsoft guide
  
  // 1. Add TypeScript interfaces at the top
  const interfaces = `
// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}

interface User {
  handle: string;
  avatarUrl: string;
}
`;

  // 2. Fix React import and add interfaces
  content = content.replace(
    /^import React.*$/m,
    `import React, { useState, useEffect } from 'react';${interfaces}`
  );

  // 3. Add React.FC types to components
  content = content.replace(
    /const (\w+) = \(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g,
    'const $1: React.FC<any> = ({ $2 }) => ('
  );

  // 4. Fix function component declarations
  content = content.replace(
    /export default function (\w+)\(\) \{/g,
    'export default function $1(): React.JSX.Element {'
  );

  // 5. Add type annotations for useState
  content = content.replace(
    /const \[(\w+), set\w+\] = useState\(([^)]+)\);/g,
    'const [$1, set$1] = useState<any>($2);'
  );

  // 6. Fix event handlers
  content = content.replace(
    /const (\w+) = \(e\) => \{/g,
    'const $1 = (e: any) => {'
  );

  const tsxPath = `${TSX_DIR}/${tsxFileName}`;
  await writeFile(tsxPath, content, 'utf-8');

  // Type check the converted file
  try {
    execSync(`cd /home/carlos/projects/creator-flow && bunx tsc --noEmit ${tsxPath}`, { 
      stdio: 'pipe' 
    });
    console.log(`✅ ${tsxFileName} - Converted and type-checked successfully`);
    return true;
  } catch (error) {
    console.log(`⚠️  ${tsxFileName} - Converted but has type errors`);
    console.log(`   Run: bunx tsc --noEmit ${tsxPath} to see errors`);
    return true; // Still consider it converted
  }
}

// Get filename from command line argument
const fileName = process.argv[2];
if (!fileName) {
  console.log('Usage: bun run scripts/convert-single-jsx-to-tsx.ts <filename.jsx>');
  console.log('Example: bun run scripts/convert-single-jsx-to-tsx.ts m3-strategic-command-card.jsx');
  process.exit(1);
}

convertSingleFile(fileName).catch(console.error);
