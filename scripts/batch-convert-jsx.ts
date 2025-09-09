#!/usr/bin/env bun

import { readdir } from 'fs/promises';
import { execSync } from 'child_process';

const JSX_DIR = '/home/carlos/projects/creator-flow/docs/development/dashboard-design/03-jsx-mock';

async function batchConvert() {
  const files = await readdir(JSX_DIR);
  const jsxFiles = files.filter(f => f.endsWith('.jsx') && !f.includes('public-pages'));
  
  console.log(`📁 Found ${jsxFiles.length} JSX files to convert`);
  
  const converted = [];
  const failed = [];
  
  for (const file of jsxFiles) {
    try {
      console.log(`\n🔄 Converting ${file}...`);
      execSync(`bun run scripts/convert-jsx-to-tsx-improved.ts ${file}`, { 
        stdio: 'inherit',
        cwd: '/home/carlos/projects/creator-flow'
      });
      converted.push(file);
    } catch (error) {
      console.log(`❌ Failed to convert ${file}`);
      failed.push(file);
    }
  }
  
  console.log(`\n📊 Conversion Summary:`);
  console.log(`✅ Converted: ${converted.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (converted.length > 0) {
    console.log(`\n✅ Successfully converted:`);
    converted.forEach(file => console.log(`   - ${file}`));
  }
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed to convert:`);
    failed.forEach(file => console.log(`   - ${file}`));
  }
}

batchConvert().catch(console.error);
