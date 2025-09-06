#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const mockDir = path.join(__dirname, '../docs/development/dashboard-design/03-jsx-mock');
const componentDir = path.join(__dirname, '../src/components/mocks');

// Create mocks directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Get all JSX files
const jsxFiles = fs.readdirSync(mockDir).filter(file => file.endsWith('.jsx'));

jsxFiles.forEach(file => {
  const mockPath = path.join(mockDir, file);
  const componentName = file
    .replace('.jsx', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const newFileName = `${componentName}.tsx`;
  const newPath = path.join(componentDir, newFileName);
  
  // Read original content
  let content = fs.readFileSync(mockPath, 'utf8');
  
  // Basic conversion to TypeScript
  content = content.replace(/\.jsx/g, '.tsx');
  
  // Add export default if not present
  if (!content.includes('export default')) {
    // Find the main component (usually the last one defined)
    const componentMatch = content.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/g);
    if (componentMatch) {
      const lastComponent = componentMatch[componentMatch.length - 1];
      const componentName = lastComponent.match(/const\s+(\w+)/)[1];
      content += `\n\nexport default ${componentName};`;
    }
  }
  
  // Write to new location
  fs.writeFileSync(newPath, content);
  console.log(`Copied ${file} -> ${newFileName}`);
});

console.log('\nMock components copied to src/components/mocks/');
console.log('You can now import and preview them in your Next.js app!');