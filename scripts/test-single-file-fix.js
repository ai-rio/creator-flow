#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Test with single file first - M2BusinessSimphonyCard.tsx
const TEST_FILE = 'src/components/mocks/M2BusinessSimphonyCard.tsx';

function fixSingleFile(content) {
  console.log('🔧 Fixing single file with quality approach...\n');
  
  // Step 1: Remove malformed interface at top
  content = content.replace(/^interface.*Props.*\{[\s\S]*?\}\n\n/m, '');
  
  // Step 2: Ensure React import is first and clean
  const lines = content.split('\n');
  const imports = lines.filter(line => line.trim().startsWith('import'));
  const nonImports = lines.filter(line => !line.trim().startsWith('import') && line.trim() !== '');
  
  // Clean React import
  const reactImport = "import React, { useState, useEffect } from 'react';";
  const otherImports = imports.filter(imp => !imp.includes('import React'));
  
  // Step 3: Add proper type definitions
  const typeDefinitions = `
// Type definitions
interface ThemeProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}
`;
  
  // Step 4: Fix component parameters
  let fixedContent = nonImports.join('\n');
  
  // Fix destructured parameters
  fixedContent = fixedContent.replace(
    /const (\w+) = \(\{ ([^}]+) \}\) =>/g, 
    (match, name, params) => {
      const typedParams = params.split(',').map(p => {
        const param = p.trim();
        if (param.includes('theme')) return 'theme: ThemeProps["theme"]';
        if (param.includes('setTheme')) return 'setTheme: ThemeProps["setTheme"]';
        if (param.includes('children')) return 'children: React.ReactNode';
        if (param.includes('className')) return 'className?: string';
        return `${param}: any`;
      }).join(', ');
      return `const ${name} = ({ ${typedParams} }) =>`;
    }
  );
  
  // Step 5: Fix array access and object property access
  fixedContent = fixedContent.replace(/(\w+)\[(\w+)\]/g, '($1 as any)[$2]');
  
  // Step 6: Fix function parameters in callbacks
  fixedContent = fixedContent.replace(/\.map\(([^,)]+) =>/g, '.map(($1: any) =>');
  fixedContent = fixedContent.replace(/\(([^:)]+)\) =>/g, '($1: any) =>');
  
  // Combine everything
  const finalContent = [
    reactImport,
    ...otherImports,
    typeDefinitions,
    fixedContent
  ].join('\n');
  
  return finalContent;
}

async function testSingleFile() {
  try {
    console.log(`📁 Testing with: ${TEST_FILE}`);
    
    const content = fs.readFileSync(TEST_FILE, 'utf8');
    const fixedContent = fixSingleFile(content);
    
    // Write to test file
    const testOutputFile = TEST_FILE.replace('.tsx', '.test.tsx');
    fs.writeFileSync(testOutputFile, fixedContent);
    
    console.log(`✅ Fixed file saved as: ${testOutputFile}`);
    
    // Test TypeScript compilation on single file
    const { execSync } = require('child_process');
    try {
      execSync(`npx tsc --noEmit ${testOutputFile}`, { stdio: 'pipe' });
      console.log('✅ TypeScript compilation: SUCCESS');
      return true;
    } catch (error) {
      console.log('❌ TypeScript compilation: FAILED');
      console.log('Errors:', error.stdout.toString());
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

if (require.main === module) {
  testSingleFile().then(success => {
    if (success) {
      console.log('\n🎉 Single file test PASSED - ready to scale!');
    } else {
      console.log('\n❌ Single file test FAILED - need to fix approach');
    }
  });
}

module.exports = { testSingleFile, fixSingleFile };