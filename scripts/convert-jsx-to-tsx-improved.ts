#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';

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

  // Microsoft TypeScript React Conversion Guide approach
  
  // 1. Fix React import and add hooks if needed
  const needsHooks = content.includes('useState') || content.includes('useEffect') || content.includes('useContext');
  
  if (needsHooks) {
    content = content.replace(
      /^import React.*$/m,
      "import * as React from 'react';\nimport { useState, useEffect } from 'react';"
    );
  } else {
    content = content.replace(
      /^import React.*$/m,
      "import * as React from 'react';"
    );
  }

  // 2. Add proper TypeScript interfaces based on component analysis
  const hasTheme = content.includes('theme') && content.includes('setTheme');
  const hasUser = content.includes('user') && content.includes('handle');
  const hasSystemStatus = content.includes('systemStatus');
  
  let interfaces = '';
  
  if (hasSystemStatus) {
    interfaces += `
interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}`;
  }
  
  if (hasUser) {
    interfaces += `
interface User {
  handle: string;
  avatarUrl: string;
}`;
  }
  
  if (hasTheme) {
    interfaces += `
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}`;
  }

  // Add basic props interface
  interfaces += `
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}`;

  // Insert interfaces after imports
  const importLines = content.split('\n').filter(line => line.startsWith('import'));
  const restContent = content.split('\n').filter(line => !line.startsWith('import')).join('\n');
  
  content = [...importLines, interfaces, restContent].join('\n');

  // 3. Fix component function signatures with proper TypeScript
  content = content.replace(
    /const (\w+) = \(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g,
    'const $1: React.FC<any> = ({ $2 }) => ('
  );

  // 4. Fix React.Component class declarations
  content = content.replace(
    /class (\w+) extends React\.Component \{/g,
    'class $1 extends React.Component<any, any> {'
  );

  // 5. Add return type to default export functions
  content = content.replace(
    /export default function (\w+)\(\) \{/g,
    'export default function $1(): React.JSX.Element {'
  );

  // 6. Fix useState with proper typing
  content = content.replace(
    /const \[(\w+), (set\w+)\] = useState\(([^)]+)\);/g,
    'const [$1, $2] = useState<any>($3);'
  );

  // 7. Fix event handlers
  content = content.replace(
    /(\w+) = \(e\) => \{/g,
    '$1 = (e: any) => {'
  );

  // 8. Fix arrow function parameters
  content = content.replace(
    /\(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g,
    '({ $1 }: any) => ('
  );

  const tsxPath = `${TSX_DIR}/${tsxFileName}`;
  await writeFile(tsxPath, content, 'utf-8');

  console.log(`✅ ${tsxFileName} - Converted successfully`);
  console.log(`📁 Saved to: ${tsxPath}`);
  
  return true;
}

// Get filename from command line argument
const fileName = process.argv[2];
if (!fileName) {
  console.log('Usage: bun run scripts/convert-jsx-to-tsx-improved.ts <filename.jsx>');
  console.log('Example: bun run scripts/convert-jsx-to-tsx-improved.ts m4-liberation-orchestra-card.jsx');
  process.exit(1);
}

convertSingleFile(fileName).catch(console.error);
