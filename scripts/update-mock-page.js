#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Auto-update the direct-mock page with all converted components
function updateMockPage() {
  const mockDir = 'src/components/mocks';
  const pagePath = 'src/app/[locale]/direct-mock/page.tsx';
  
  // Get all TSX files in mocks directory
  const mockFiles = fs.readdirSync(mockDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => file.replace('.tsx', ''));
  
  // Categorize files
  const categories = {
    'A-Series': mockFiles.filter(f => f.startsWith('A')),
    'M-Series': mockFiles.filter(f => f.startsWith('M')),
    'O-Series': mockFiles.filter(f => f.startsWith('O')),
    'D-Series': mockFiles.filter(f => f.startsWith('D')),
    'I-Series': mockFiles.filter(f => f.startsWith('I')),
    'Desktop': mockFiles.filter(f => f.startsWith('Desktop') || /^\d/.test(f)),
    'Mobile': mockFiles.filter(f => f.includes('Mobile'))
  };
  
  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) delete categories[key];
  });
  
  // Generate imports
  const imports = mockFiles.map(name => 
    `import ${name} from '@/components/mocks/${name}';`
  ).join('\n');
  
  // Generate component map
  const componentMap = mockFiles.map(name => 
    `  '${name}': ${name},`
  ).join('\n');
  
  // Generate mock files object
  const mockFilesObj = Object.entries(categories).map(([category, files]) => 
    `    '${category}': [${files.map(f => `'${f}'`).join(', ')}],`
  ).join('\n');
  
  const pageContent = `'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
${imports}

// Component registry
const COMPONENTS = {
${componentMap}
};

export default function DirectMockPage() {
  const [selectedMock, setSelectedMock] = useState('')
  const [loading, setLoading] = useState(false)
  
  const mockFiles = {
${mockFilesObj}
  };

  const renderComponent = (componentName: string) => {
    const Component = COMPONENTS[componentName];
    if (!Component) return <div>Component not found: {componentName}</div>;
    
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            {componentName}.tsx
          </span>
        </div>
        <div className="p-4">
          <Component />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-2">
          🚀 CreatorFlow Component Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive preview of all converted TSX components
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Component Browser */}
          <div className="lg:col-span-1 space-y-4">
            {Object.entries(mockFiles).map(([category, files]) => (
              <Card key={category} className="p-4">
                <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                  {category} ({files.length})
                </h3>
                <div className="space-y-1">
                  {files.map((file) => (
                    <Button
                      key={file}
                      onClick={() => setSelectedMock(file)}
                      variant={selectedMock === file ? "default" : "ghost"}
                      className="w-full justify-start text-xs h-8 px-3"
                    >
                      {file}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-xl font-bold">
                  {selectedMock ? \`Preview: \${selectedMock}\` : 'Select a Component'}
                </h2>
              </div>

              {!selectedMock && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <h3 className="text-lg font-semibold mb-2">Ready to Preview</h3>
                  <p>Click any component on the left to see it render</p>
                </div>
              )}

              {selectedMock && renderComponent(selectedMock)}
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(mockFiles).map(([category, files]) => (
            <Card key={category} className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {files.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {category}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}`;

  fs.writeFileSync(pagePath, pageContent);
  console.log('✅ Updated direct-mock page with all components');
}

if (require.main === module) {
  updateMockPage();
}

module.exports = { updateMockPage };