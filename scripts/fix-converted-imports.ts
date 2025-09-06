#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';

const TSX_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

async function fixImportsInFile(filePath: string) {
  let content = await readFile(filePath, 'utf-8');
  
  // Check if the file has the broken import pattern
  if (!content.includes('import { \n\ninterface')) {
    console.log(`✅ ${filePath} - Already correct`);
    return false;
  }
  
  console.log(`🔧 Fixing imports in: ${filePath}`);
  
  // Extract the broken import section and interfaces
  const importStartPattern = /import { \n\ninterface[\s\S]*?\} from 'lucide-react';/;
  const match = content.match(importStartPattern);
  
  if (!match) {
    console.log(`❌ Could not find broken import pattern in ${filePath}`);
    return false;
  }
  
  const brokenSection = match[0];
  
  // Extract the interfaces from the broken section
  const interfacePattern = /interface[\s\S]*?\}/g;
  const interfaces = brokenSection.match(interfacePattern) || [];
  
  // Extract the lucide imports (everything after the interfaces)
  const lucideImportsMatch = brokenSection.match(/}\s*([^}]+)\s*} from 'lucide-react';/);
  const lucideImports = lucideImportsMatch ? lucideImportsMatch[1].trim() : '';
  
  // Create the corrected import
  const correctedImport = `import { \n    ${lucideImports}\n} from 'lucide-react';`;
  
  // Create the interfaces section
  const interfacesSection = interfaces.length > 0 
    ? '\n// --- TypeScript Interfaces ---\n' + interfaces.join('\n\n')
    : '';
  
  // Replace the broken section
  content = content.replace(brokenSection, correctedImport + interfacesSection);
  
  await writeFile(filePath, content, 'utf-8');
  console.log(`✅ Fixed imports in: ${filePath}`);
  return true;
}

async function fixAllConvertedFiles() {
  // Fix A-Series components
  const aSeriesFiles = await glob(`${TSX_DIR}/A*ShmDashboard.tsx`);
  
  let fixedCount = 0;
  
  for (const file of aSeriesFiles) {
    const wasFixed = await fixImportsInFile(file);
    if (wasFixed) fixedCount++;
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} files with broken imports`);
}

fixAllConvertedFiles().catch(console.error);