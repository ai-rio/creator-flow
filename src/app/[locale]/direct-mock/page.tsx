'use client';

import { useState } from 'react';

import BI020BusinessSymphony from '@/components/mocks/BI-020-BusinessSymphony';
import BI030StrategicCommand from '@/components/mocks/BI-030-StrategicCommand';
import BI040LiberationOrchestra from '@/components/mocks/BI-040-LiberationOrchestra';
import BI050IntelBriefing from '@/components/mocks/BI-050-IntelBriefing';
import MC030Navbar from '@/components/mocks/MC-030-Navbar';
// Import only existing converted components (updated with renamed components)
import NC030ExecutiveHeader from '@/components/mocks/NC-030-ExecutiveHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Component registry - only existing components
const COMPONENTS = {
  M1ExecutiveHeader: NC030ExecutiveHeader,
  M2BusinessSimphonyCard: BI020BusinessSymphony,
  M3StrategicCommandCard: BI030StrategicCommand,
  M4LiberationOrchestraCard: BI040LiberationOrchestra,
  M5IntelBriefingCard: BI050IntelBriefing,
  M6MobileNavbar: MC030Navbar,
};

export default function DirectMockPage() {
  const [selectedMock, setSelectedMock] = useState('');

  const mockFiles = {
    'M-Series (Mobile)': [
      'M1ExecutiveHeader',
      'M2BusinessSimphonyCard',
      'M3StrategicCommandCard',
      'M4LiberationOrchestraCard',
      'M5IntelBriefingCard',
      'M6MobileNavbar',
    ],
    'Conversion Status': [
      'M-Series: 6/6 components ✅ Complete',
      'A-Series: 0/6 components 🔄 Pending',
      'O-Series: 0/2 components 🔄 Pending',
      'D-Series: 0/1 components 🔄 Pending',
      'I-Series: 0/2 components 🔄 Pending',
      'Total: 6 components ready for testing! 🎉',
    ],
  };

  const renderComponent = (componentName: string) => {
    const Component = COMPONENTS[componentName as keyof typeof COMPONENTS];
    if (!Component) {
      return (
        <div className='rounded-lg border border-gray-200 p-8 text-center dark:border-gray-800'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300'>Component: {componentName}</h3>
          <p className='text-gray-500 dark:text-gray-400'>This component is pending TypeScript conversion</p>
          <div className='mt-4 text-sm text-blue-600 dark:text-blue-400'>
            Status: Ready for conversion from JSX to TSX
          </div>
        </div>
      );
    }

    return (
      <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800'>
        <div className='border-b bg-gray-50 px-4 py-2 dark:bg-gray-900'>
          <span className='font-mono text-sm text-gray-600 dark:text-gray-400'>{componentName}.tsx ✅</span>
        </div>
        <div className='p-4'>
          <Component />
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      <div className='border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900'>
        <h1 className='mb-2 text-3xl font-bold'>🚀 CreatorFlow Component Library</h1>
        <p className='text-gray-600 dark:text-gray-400'>
          TypeScript conversion progress - Interactive preview of converted TSX components
        </p>
        <div className='mt-4 flex gap-4 text-sm'>
          <span className='rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-900/30 dark:text-green-400'>
            ✅ 6 Ready
          </span>
          <span className='rounded-full bg-yellow-100 px-3 py-1 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'>
            🔄 40+ Pending
          </span>
        </div>
      </div>

      <div className='mx-auto max-w-7xl p-6'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Component Browser */}
          <div className='space-y-4 lg:col-span-1'>
            {Object.entries(mockFiles).map(([category, files]) => (
              <Card key={category} className='p-4'>
                <h3 className='mb-3 text-lg font-bold text-blue-600 dark:text-blue-400'>
                  {category} ({files.length})
                </h3>
                <div className='space-y-1'>
                  {files.map((file) => {
                    const isWorking = file.includes('✅');
                    const componentName = file.split(' ')[0];

                    return (
                      <Button
                        key={file}
                        onClick={() => setSelectedMock(componentName)}
                        variant={selectedMock === componentName ? 'default' : 'ghost'}
                        className={`h-8 w-full justify-start px-3 text-xs ${
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
          <div className='lg:col-span-2'>
            <Card className='p-6'>
              <div className='mb-4 flex items-center justify-between border-b pb-4'>
                <h2 className='text-xl font-bold'>
                  {selectedMock ? `Preview: ${selectedMock}` : 'Select a Component'}
                </h2>
                {selectedMock && <div className='text-sm text-green-600 dark:text-green-400'>TypeScript Ready ✅</div>}
              </div>

              {!selectedMock && (
                <div className='py-12 text-center text-gray-500 dark:text-gray-400'>
                  <h3 className='mb-2 text-lg font-semibold'>JSX to TSX Conversion Progress</h3>
                  <p className='mb-4'>Click any component on the left to see conversion status</p>
                  <div className='mx-auto max-w-md rounded-lg bg-blue-50 p-4 text-left dark:bg-blue-900/20'>
                    <h4 className='mb-2 font-semibold text-blue-700 dark:text-blue-400'>Conversion Method:</h4>
                    <ul className='space-y-1 text-sm text-blue-600 dark:text-blue-300'>
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
        <div className='mt-8'>
          <Card className='p-6'>
            <h3 className='mb-4 text-lg font-bold'>Conversion Progress</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
              <div className='rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20'>
                <div className='text-2xl font-bold text-green-600 dark:text-green-400'>6</div>
                <div className='text-sm text-green-700 dark:text-green-300'>Ready</div>
              </div>
              <div className='rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20'>
                <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>40+</div>
                <div className='text-sm text-yellow-700 dark:text-yellow-300'>Pending</div>
              </div>
              <div className='rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20'>
                <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>TSX</div>
                <div className='text-sm text-blue-700 dark:text-blue-300'>Target Format</div>
              </div>
              <div className='rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20'>
                <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>Ready</div>
                <div className='text-sm text-purple-700 dark:text-purple-300'>For Development</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
