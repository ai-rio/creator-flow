'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Import only existing converted components
import M1ExecutiveHeader from '@/components/mocks/M1ExecutiveHeader';
import M2BusinessSimphonyCard from '@/components/mocks/M2BusinessSimphonyCard';
import M3StrategicCommandCard from '@/components/mocks/M3StrategicCommandCard';
import M4LiberationOrchestraCard from '@/components/mocks/M4LiberationOrchestraCard';
import M5IntelBriefingCard from '@/components/mocks/M5IntelBriefingCard';
import M6MobileNavbar from '@/components/mocks/M6MobileNavbar';

// Component registry - only existing components
const COMPONENTS = {
  'M1ExecutiveHeader': M1ExecutiveHeader,
  'M2BusinessSimphonyCard': M2BusinessSimphonyCard,
  'M3StrategicCommandCard': M3StrategicCommandCard,
  'M4LiberationOrchestraCard': M4LiberationOrchestraCard,
  'M5IntelBriefingCard': M5IntelBriefingCard,
  'M6MobileNavbar': M6MobileNavbar,
};

export default function DirectMockPage() {
  const [selectedMock, setSelectedMock] = useState('')
  
  const mockFiles = {
    'M-Series (Mobile)': ['M1ExecutiveHeader', 'M2BusinessSimphonyCard', 'M3StrategicCommandCard', 'M4LiberationOrchestraCard', 'M5IntelBriefingCard', 'M6MobileNavbar'],
    'Conversion Status': [
      'M-Series: 6/6 components ✅ Complete',
      'A-Series: 0/6 components 🔄 Pending',
      'O-Series: 0/2 components 🔄 Pending', 
      'D-Series: 0/1 components 🔄 Pending',
      'I-Series: 0/2 components 🔄 Pending',
      'Total: 6 components ready for testing! 🎉'
    ]
  };

  const renderComponent = (componentName: string) => {
    const Component = COMPONENTS[componentName as keyof typeof COMPONENTS];
    if (!Component) {
      return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Component: {componentName}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            This component is pending TypeScript conversion
          </p>
          <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
            Status: Ready for conversion from JSX to TSX
          </div>
        </div>
      );
    }
    
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
            {componentName}.tsx ✅
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
          TypeScript conversion progress - Interactive preview of converted TSX components
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            ✅ 6 Ready
          </span>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
            🔄 40+ Pending
          </span>
        </div>
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
                  {files.map((file) => {
                    const isWorking = file.includes('✅');
                    const componentName = file.split(' ')[0];
                    
                    return (
                      <Button
                        key={file}
                        onClick={() => setSelectedMock(componentName)}
                        variant={selectedMock === componentName ? "default" : "ghost"}
                        className={`w-full justify-start text-xs h-8 px-3 ${
                          isWorking ? 'text-green-700 dark:text-green-400' : 'text-gray-500'
                        }`}
                        disabled={!isWorking && !file.includes('🔄')}
                      >
                        {file}
                      </Button>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <h2 className="text-xl font-bold">
                  {selectedMock ? `Preview: ${selectedMock}` : 'Select a Component'}
                </h2>
                {selectedMock && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    TypeScript Ready ✅
                  </div>
                )}
              </div>

              {!selectedMock && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <h3 className="text-lg font-semibold mb-2">JSX to TSX Conversion Progress</h3>
                  <p className="mb-4">Click any component on the left to see conversion status</p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left max-w-md mx-auto">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                      Conversion Method:
                    </h4>
                    <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-300">
                      <li>• Following Microsoft TypeScript React Guide</li>
                      <li>• Proper interface definitions</li>
                      <li>• React.FC type annotations</li>
                      <li>• Event handler typing</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedMock && renderComponent(selectedMock)}
            </Card>
          </div>
        </div>

        {/* Conversion Progress */}
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Conversion Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">6</div>
                <div className="text-sm text-green-700 dark:text-green-300">Ready</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">40+</div>
                <div className="text-sm text-yellow-700 dark:text-yellow-300">Pending</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">TSX</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Target Format</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Ready</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">For Development</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
