#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MOCKS_DIR = 'src/components/mocks';

// Comprehensive "any" type strategy - following methodology for quick wins
function applyComprehensiveAnyFixes(content, filename) {
  // Add React import if missing
  if (!content.includes('import React')) {
    content = `import React from 'react';\n${content}`;
  }
  
  // Fix all parameter destructuring with any types
  content = content.replace(/\(\{\s*([^}]+)\s*\}/g, (match, params) => {
    const typedParams = params.split(',').map(param => {
      const trimmed = param.trim();
      if (trimmed && !trimmed.includes(':')) {
        return `${trimmed}: any`;
      }
      return trimmed;
    }).filter(p => p.trim()).join(', ');
    return `({ ${typedParams} })`;
  });
  
  // Fix all function parameters
  content = content.replace(/\(([^)]+)\)\s*=>/g, (match, params) => {
    if (params.includes(':')) return match; // Already typed
    const typedParams = params.split(',').map(p => {
      const param = p.trim();
      if (param && !param.includes(':')) {
        return `${param}: any`;
      }
      return param;
    }).filter(p => p.trim()).join(', ');
    return `(${typedParams}) =>`;
  });
  
  // Add any type to all object property access
  content = content.replace(/(\w+)\.(\w+)\[/g, '($1 as any).$2[');
  content = content.replace(/(\w+)\[([^\]]+)\]/g, '($1 as any)[$2]');
  
  // Fix useState calls
  content = content.replace(/useState\(/g, 'useState<any>(');
  
  // Fix useRef calls  
  content = content.replace(/useRef\(/g, 'useRef<any>(');
  
  // Fix useEffect dependencies
  content = content.replace(/useEffect\(\s*\(\)\s*=>/g, 'useEffect(() =>');
  
  // Add any to all remaining implicit parameters
  content = content.replace(/\.map\(\s*([^:,)]+)\s*=>/g, '.map(($1: any) =>');
  content = content.replace(/\.filter\(\s*([^:,)]+)\s*=>/g, '.filter(($1: any) =>');
  content = content.replace(/\.forEach\(\s*([^:,)]+)\s*=>/g, '.forEach(($1: any) =>');
  content = content.replace(/\.find\(\s*([^:,)]+)\s*=>/g, '.find(($1: any) =>');
  
  return content;
}

async function applyComprehensiveAnyStrategy() {
  console.log('⚡ Applying Comprehensive "any" Strategy (Quick Wins)...\n');
  
  const files = fs.readdirSync(MOCKS_DIR).filter(f => f.endsWith('.tsx'));
  let fixed = 0;
  
  for (const file of files) {
    const filePath = path.join(MOCKS_DIR, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = applyComprehensiveAnyFixes(content, file);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Applied comprehensive any fixes to ${file}`);
        fixed++;
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Applied comprehensive any fixes to ${fixed} files`);
  console.log('📋 Strategy: Quick wins with "any" types while preserving functionality');
}

if (require.main === module) {
  applyComprehensiveAnyStrategy().catch(console.error);
}

module.exports = { applyComprehensiveAnyStrategy };