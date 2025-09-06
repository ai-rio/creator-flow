#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const MOCKS_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

async function finalTsxFix() {
  const files = await readdir(MOCKS_DIR);
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  
  for (const file of tsxFiles) {
    const filePath = join(MOCKS_DIR, file);
    let content = await readFile(filePath, 'utf-8');
    
    // Final comprehensive fixes
    
    // 1. Fix missing closing braces in parameter lists
    content = content.replace(/\(\s*\{\s*([^}]+)\s+\}\s*:\s*any\s*\)/g, '({ $1 }: any)');
    
    // 2. Fix malformed function parameters with extra spaces
    content = content.replace(/\(\s*\{\s*([^}]+?)\s+\}\s*:\s*any\s*\)/g, '({ $1 }: any)');
    
    // 3. Fix any remaining parameter issues
    content = content.replace(/\{\s*([^}]+?)\s+\}/g, '{ $1 }');
    
    // 4. Fix React component return types
    if (!content.includes('React.JSX.Element') && content.includes('export default function')) {
      content = content.replace(/export default function (\w+)\(\)/g, 'export default function $1(): React.JSX.Element');
    }
    
    // 5. Add missing React import if JSX is present
    if (!content.includes('import React') && content.includes('<')) {
      content = `import React from 'react';\n\n${content}`;
    }
    
    // 6. Fix any remaining syntax issues with object destructuring
    content = content.replace(/\{\s*([^}]+)\s*\}\s*:\s*any\s*\)\s*=>/g, '({ $1 }: any) =>');
    
    await writeFile(filePath, content, 'utf-8');
    console.log(`Applied final fixes to: ${file}`);
  }
}

finalTsxFix().catch(console.error);
