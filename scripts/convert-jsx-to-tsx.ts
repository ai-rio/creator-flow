#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const JSX_DIR = '/home/carlos/projects/creator-flow/docs/development/dashboard-design/03-jsx-mock';
const TSX_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

async function convertJsxToTsx() {
  const files = await readdir(JSX_DIR);
  const jsxFiles = files.filter(f => f.endsWith('.jsx') && !f.includes('public-pages'));
  
  console.log(`Found ${jsxFiles.length} JSX files to convert`);
  
  for (const file of jsxFiles) {
    const jsxPath = join(JSX_DIR, file);
    let content = await readFile(jsxPath, 'utf-8');
    
    // Skip empty files
    if (content.trim().length === 0) {
      console.log(`Skipping empty file: ${file}`);
      continue;
    }
    
    // Convert to TypeScript following Microsoft guide patterns
    
    // 1. Fix React import
    content = content.replace(/^import React from 'react';$/m, "import React from 'react';");
    
    // 2. Add basic TypeScript types for common patterns
    
    // Add interface for props with children
    if (content.includes('{ children')) {
      content = `import React from 'react';\n\ninterface ComponentProps {\n  children?: React.ReactNode;\n  className?: string;\n}\n\n${content.replace(/^import React.*$/m, '')}`;
    }
    
    // 3. Convert function components to proper TypeScript
    content = content.replace(
      /const (\w+) = \(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g,
      'const $1: React.FC<any> = ({ $2 }) => ('
    );
    
    // 4. Convert arrow function components
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
    
    // Generate TSX filename
    const tsxFileName = file
      .replace('.jsx', '.tsx')
      .replace(/^(\d+)-/, 'Component$1')
      .replace(/^([a-z])/, (match) => match.toUpperCase())
      .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    
    const tsxPath = join(TSX_DIR, tsxFileName);
    
    await writeFile(tsxPath, content, 'utf-8');
    console.log(`Converted: ${file} -> ${tsxFileName}`);
  }
}

convertJsxToTsx().catch(console.error);
