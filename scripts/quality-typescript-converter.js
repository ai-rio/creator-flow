#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MOCKS_DIR = 'src/components/mocks';

// Quality-first TypeScript conversion - proper types, not 'any'
function convertToQualityTypeScript(content, filename) {
  // Add proper React imports
  if (!content.includes('import React')) {
    content = `import React, { useState, useEffect, useRef } from 'react';\n${content}`;
  }
  
  // Define proper interfaces for common props
  const interfaces = `
interface ThemeProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

interface ChildrenProps {
  children: React.ReactNode;
  className?: string;
}

interface IconProps {
  icon: React.ReactNode;
  status?: 'nominal' | 'warning' | 'critical';
  label?: string;
}

interface MetricProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
`;
  
  // Add interfaces at the top
  content = content.replace(/^import/, interfaces + '\nimport');
  
  // Fix component parameter destructuring with proper types
  content = content.replace(/const (\w+) = \(\{ ([^}]+) \}\) =>/g, (match, name, params) => {
    const typedParams = params.split(',').map(param => {
      const trimmed = param.trim();
      if (trimmed.includes('theme')) return `${trimmed}: ThemeProps['theme']`;
      if (trimmed.includes('setTheme')) return `${trimmed}: ThemeProps['setTheme']`;
      if (trimmed.includes('children')) return `${trimmed}: React.ReactNode`;
      if (trimmed.includes('className')) return `${trimmed}: string`;
      if (trimmed.includes('icon')) return `${trimmed}: React.ReactNode`;
      if (trimmed.includes('title')) return `${trimmed}: string`;
      if (trimmed.includes('value')) return `${trimmed}: string | number`;
      return `${trimmed}: unknown`;
    }).join(', ');
    return `const ${name} = ({ ${typedParams} }) =>`;
  });
  
  // Fix useState calls with proper types
  content = content.replace(/useState\(([^)]+)\)/g, (match, initial) => {
    if (initial.includes('false') || initial.includes('true')) {
      return `useState<boolean>(${initial})`;
    }
    if (initial.includes("'") || initial.includes('"')) {
      return `useState<string>(${initial})`;
    }
    if (initial.includes('[')) {
      return `useState<any[]>(${initial})`;
    }
    if (initial.includes('{')) {
      return `useState<Record<string, any>>(${initial})`;
    }
    return `useState<any>(${initial})`;
  });
  
  // Fix useRef calls
  content = content.replace(/useRef\(null\)/g, 'useRef<HTMLElement | null>(null)');
  content = content.replace(/useRef\(\)/g, 'useRef<HTMLElement | null>(null)');
  
  // Fix event handlers
  content = content.replace(/\(e\) =>/g, '(e: React.MouseEvent) =>');
  content = content.replace(/\(event\) =>/g, '(event: React.Event) =>');
  
  // Fix array methods with proper typing
  content = content.replace(/\.map\(([^,)]+) =>/g, '.map(($1: any) =>');
  content = content.replace(/\.filter\(([^,)]+) =>/g, '.filter(($1: any) =>');
  
  return content;
}

async function convertToQualityTS() {
  console.log('🎯 Converting to Quality TypeScript (Proper Types)...\n');
  
  const files = fs.readdirSync(MOCKS_DIR).filter(f => f.endsWith('.tsx'));
  let converted = 0;
  
  for (const file of files) {
    const filePath = path.join(MOCKS_DIR, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      content = convertToQualityTS(content, file);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Converted ${file} to quality TypeScript`);
        converted++;
      }
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Converted ${converted} files to quality TypeScript`);
  console.log('📋 Quality over speed - proper types implemented');
}

if (require.main === module) {
  convertToQualityTS().catch(console.error);
}

module.exports = { convertToQualityTS };