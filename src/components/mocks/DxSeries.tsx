'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Placeholder components for DX series
const PlaceholderComponent = ({ name }: { name: string }) => (
  <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
    <div className='rounded-xl bg-white p-8 text-center shadow-lg'>
      <h1 className='mb-4 text-3xl font-bold text-gray-800'>{name}</h1>
      <p className='text-gray-600'>Component placeholder - implementation pending</p>
    </div>
  </div>
);

const components = [
  { id: 'dx2', name: 'DX2: Desktop Header Demo', component: () => <PlaceholderComponent name='Desktop Header Demo' /> },
  {
    id: 'dx3',
    name: 'DX3: Desktop Toast Notifications',
    component: () => <PlaceholderComponent name='Desktop Toast Notifications' />,
  },
  {
    id: 'dx4',
    name: 'DX4: Desktop Sidebar Demo',
    component: () => <PlaceholderComponent name='Desktop Sidebar Demo' />,
  },
  { id: 'dx5', name: 'DX5: Desktop Modals', component: () => <PlaceholderComponent name='Desktop Modals' /> },
  {
    id: 'dx6',
    name: 'DX6: Desktop Onboarding Tour',
    component: () => <PlaceholderComponent name='Desktop Onboarding Tour' />,
  },
  {
    id: 'dx7',
    name: 'DX7: Desktop Feedback Widget',
    component: () => <PlaceholderComponent name='Desktop Feedback Widget' />,
  },
  { id: 'dx9', name: 'DX9: Desktop Order Table', component: () => <PlaceholderComponent name='Desktop Order Table' /> },
  {
    id: 'dx10',
    name: 'DX10: Desktop Command Center',
    component: () => <PlaceholderComponent name='Desktop Command Center' />,
  },
  { id: 'dx11', name: 'DX11: Desktop Order Flow', component: () => <PlaceholderComponent name='Desktop Order Flow' /> },
  {
    id: 'dx12',
    name: 'DX12: Desktop Strategic Insights',
    component: () => <PlaceholderComponent name='Desktop Strategic Insights' />,
  },
  {
    id: 'dx13',
    name: 'DX13: Desktop User Profile',
    component: () => <PlaceholderComponent name='Desktop User Profile' />,
  },
  {
    id: 'dx14',
    name: 'DX14: Desktop Security Card',
    component: () => <PlaceholderComponent name='Desktop Security Card' />,
  },
  {
    id: 'dx15',
    name: 'DX15: Desktop Email Notifications',
    component: () => <PlaceholderComponent name='Desktop Email Notifications' />,
  },
  {
    id: 'dx16',
    name: 'DX16: Desktop Billing Overview',
    component: () => <PlaceholderComponent name='Desktop Billing Overview' />,
  },
  {
    id: 'dx17',
    name: 'DX17: Desktop Billing History',
    component: () => <PlaceholderComponent name='Desktop Billing History' />,
  },
  {
    id: 'dx18',
    name: 'DX18: Desktop Payment Method',
    component: () => <PlaceholderComponent name='Desktop Payment Method' />,
  },
];

interface DxSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function DxSeries({ initialComponent = 'dx2', mode = 'individual' }: DxSeriesProps) {
  const [currentIndex, setCurrentIndex] = useState(components.findIndex((comp) => comp.id === initialComponent) || 0);

  const currentComponent = components[currentIndex];
  const CurrentComponent = currentComponent.component;

  const nextComponent = () => {
    setCurrentIndex((prev) => (prev + 1) % components.length);
  };

  const prevComponent = () => {
    setCurrentIndex((prev) => (prev - 1 + components.length) % components.length);
  };

  const goHome = () => {
    window.location.href = '/';
  };

  const resetComponent = () => {
    setCurrentIndex(0);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextComponent();
      if (e.key === 'ArrowLeft') prevComponent();
      if (e.key === 'Escape') goHome();
      if (e.key === 'r' || e.key === 'R') resetComponent();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <motion.div
        className='fixed right-4 top-4 z-50 min-w-[280px] rounded-xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/95'
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='font-semibold text-slate-800 dark:text-slate-200'>DX Series</h3>
          <div className='flex gap-1'>
            <button
              onClick={goHome}
              className='rounded-lg bg-yellow-100 p-1.5 transition-colors hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800'
              title='Home (ESC)'
            >
              <Home className='h-4 w-4 text-yellow-700 dark:text-yellow-300' />
            </button>
            <button
              onClick={resetComponent}
              className='rounded-lg bg-blue-100 p-1.5 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800'
              title='Reset (R)'
            >
              <RotateCcw className='h-4 w-4 text-blue-700 dark:text-blue-300' />
            </button>
          </div>
        </div>

        <div className='mb-3 text-sm text-slate-600 dark:text-slate-400'>
          {currentIndex + 1} of {components.length}
        </div>

        <div className='mb-4 text-sm font-medium text-slate-800 dark:text-slate-200'>{currentComponent.name}</div>

        <div className='flex gap-2'>
          <button
            onClick={prevComponent}
            className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-100 px-3 py-2 transition-colors hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
            title='Previous (←)'
          >
            <ChevronLeft className='h-4 w-4 text-green-700 dark:text-green-300' />
            <span className='text-sm font-medium text-green-700 dark:text-green-300'>Prev</span>
          </button>
          <button
            onClick={nextComponent}
            className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-100 px-3 py-2 transition-colors hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
            title='Next (→)'
          >
            <span className='text-sm font-medium text-green-700 dark:text-green-300'>Next</span>
            <ChevronRight className='h-4 w-4 text-green-700 dark:text-green-300' />
          </button>
        </div>

        {mode === 'browser' && (
          <div className='mt-3 border-t border-slate-200 pt-3 dark:border-slate-700'>
            <button
              onClick={() => (window.location.href = `/dx-series?component=${currentComponent.id}`)}
              className='w-full rounded-lg bg-purple-100 px-3 py-2 transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800'
            >
              <span className='text-sm font-medium text-purple-700 dark:text-purple-300'>Individual Mode</span>
            </button>
          </div>
        )}

        <div className='mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400'>
          Use ← → arrows to navigate • ESC for home • R to reset
        </div>
      </motion.div>

      <CurrentComponent />
    </div>
  );
}
