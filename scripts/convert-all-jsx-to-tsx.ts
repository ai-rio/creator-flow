#!/usr/bin/env bun

import { readFile, writeFile, readdir } from 'fs/promises';

const JSX_DIR = '/home/carlos/projects/creator-flow/docs/development/dashboard-design/03-jsx-mock';
const TSX_DIR = '/home/carlos/projects/creator-flow/src/components/mocks';

async function convertFile(jsxFileName: string): Promise<boolean> {
  try {
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

    // Fix React imports first
    const needsHooks = content.includes('useState') || content.includes('useEffect');
    
    if (needsHooks) {
      content = content.replace(
        /^import React.*$/m,
        "import React, { useState, useEffect } from 'react';"
      );
    } else {
      content = content.replace(
        /^import React.*$/m,
        "import React from 'react';"
      );
    }

    // Add TypeScript interfaces after imports
    const importEndIndex = content.lastIndexOf("} from 'lucide-react';");
    if (importEndIndex !== -1) {
      const beforeImports = content.substring(0, importEndIndex + "} from 'lucide-react';".length);
      const afterImports = content.substring(importEndIndex + "} from 'lucide-react';".length);
      
      const interfaces = `

// --- TypeScript Interfaces ---
interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}

interface User {
  handle: string;
  avatarUrl: string;
}

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}`;

      content = beforeImports + interfaces + afterImports;
    }

    // Fix component function signatures
    content = content.replace(
      /const (\w+) = \(\s*\{\s*([^}]+)\s*\}\s*\) => \(/g,
      'const $1: React.FC<any> = ({ $2 }) => ('
    );

    // Fix useState with typing
    content = content.replace(
      /const \[(\w+), (set\w+)\] = useState\(([^)]+)\);/g,
      'const [$1, $2] = useState<any>($3);'
    );

    const tsxPath = `${TSX_DIR}/${tsxFileName}`;
    await writeFile(tsxPath, content, 'utf-8');

    console.log(`✅ ${tsxFileName} - Converted successfully`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to convert ${jsxFileName}: ${error.message}`);
    return false;
  }
}

async function convertAllSeries() {
  const files = await readdir(JSX_DIR);
  const jsxFiles = files.filter(f => 
    f.endsWith('.jsx') && 
    !f.includes('public-pages') &&
    (f.startsWith('a') || f.startsWith('m') || f.startsWith('o') || f.startsWith('d') || f.startsWith('i'))
  );
  
  console.log(`📁 Found ${jsxFiles.length} JSX files to convert`);
  
  const results = [];
  for (const file of jsxFiles) {
    const success = await convertFile(file);
    results.push({ file, success });
  }
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n📊 Conversion Summary:`);
  console.log(`✅ Converted: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log(`\n✅ Successfully converted:`);
    successful.forEach(r => console.log(`   - ${r.file}`));
  }
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed to convert:`);
    failed.forEach(r => console.log(`   - ${r.file}`));
  }
  
  return successful.map(r => r.file);
}

convertAllSeries().catch(console.error);
