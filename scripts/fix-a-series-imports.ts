#!/usr/bin/env bun

import { readFile, writeFile } from 'fs/promises';

async function fixImportsInFile(filePath: string) {
  console.log(`🔧 Fixing: ${filePath}`);
  let content = await readFile(filePath, 'utf-8');
  
  // Pattern to match the broken import structure
  const brokenPattern = /import \{ \n\ninterface[\s\S]*?\} from 'lucide-react';/;
  const match = content.match(brokenPattern);
  
  if (!match) {
    console.log(`✅ No broken pattern found in ${filePath}`);
    return;
  }
  
  const brokenSection = match[0];
  
  // Extract interfaces
  const interfaceMatches = brokenSection.match(/interface[\s\S]*?\n\}/g) || [];
  
  // Extract icons (everything after the last interface and before 'from')
  const afterInterfaces = brokenSection.split(/\}\ninterface[\s\S]*?\n\}/).pop() || '';
  const iconsMatch = afterInterfaces.match(/\n([\s\S]*?)\} from 'lucide-react';/);
  const icons = iconsMatch ? iconsMatch[1].trim() : '';
  
  // Create corrected import
  const correctedImport = `import { \n    ${icons}\n} from 'lucide-react';`;
  
  // Create interfaces section
  const interfacesSection = interfaceMatches.length > 0 
    ? '\n// --- TypeScript Interfaces ---\n' + interfaceMatches.join('\n\n')
    : '';
  
  // Replace the broken section
  content = content.replace(brokenSection, correctedImport + interfacesSection);
  
  await writeFile(filePath, content, 'utf-8');
  console.log(`✅ Fixed: ${filePath}`);
}

// Fix A3-A6
const filesToFix = [
  '/home/carlos/projects/creator-flow/src/components/mocks/A3ShmDashboard.tsx',
  '/home/carlos/projects/creator-flow/src/components/mocks/A4ShmDashboard.tsx', 
  '/home/carlos/projects/creator-flow/src/components/mocks/A5ShmDashboard.tsx',
  '/home/carlos/projects/creator-flow/src/components/mocks/A6ShmDashboard.tsx'
];

for (const file of filesToFix) {
  await fixImportsInFile(file);
}