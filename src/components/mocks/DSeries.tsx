/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Info, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Import DC-Series components (renamed from D-Series)
import DC080EnhancedCccV1 from './DC-080-EnhancedCccV1';
import DC090EnhancedCccV4 from './DC-090-EnhancedCccV4';
import DC100EnhancedCccV5 from './DC-100-EnhancedCccV5';
import DC110EnhancedCccV6 from './DC-110-EnhancedCccV6';
import DC120EnhancedCccV4Alt from './DC-120-EnhancedCccV4Alt';
import DC130EnhancedCccV5Alt from './DC-130-EnhancedCccV5Alt';

const components = [
  { id: 'd1', name: 'DC-080: Enhanced CCC V1', component: DC080EnhancedCccV1 },
  { id: 'd4', name: 'DC-090: Enhanced CCC V4', component: DC090EnhancedCccV4 },
  { id: 'd5', name: 'DC-100: Enhanced CCC V5', component: DC100EnhancedCccV5 },
  { id: 'd6', name: 'DC-110: Enhanced CCC V6', component: DC110EnhancedCccV6 },
  { id: 'd4space', name: 'DC-120: Enhanced CCC V4 Alt', component: DC120EnhancedCccV4Alt },
  { id: 'd5space', name: 'DC-130: Enhanced CCC V5 Alt', component: DC130EnhancedCccV5Alt },
];

interface DSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function DSeries({ initialComponent = 'd1', mode = 'individual' }: DSeriesProps) {
  const [currentIndex, setCurrentIndex] = useState(components.findIndex((c) => c.id === initialComponent) || 0);

  const currentComponent = components[currentIndex];
  const Component = currentComponent.component;

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'Escape') window.history.back();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  return (
    <div className='relative min-h-screen bg-slate-100 dark:bg-slate-900'>
      {/* Navigation Panel */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className='fixed right-4 top-4 z-[9999] rounded-lg border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90'
      >
        <div className='flex flex-col gap-2'>
          <div className='text-center text-xs font-bold text-slate-600 dark:text-slate-400'>
            D-SERIES ({currentIndex + 1}/{components.length})
          </div>

          <div className='flex gap-1'>
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className='rounded bg-green-100 p-1.5 text-green-700 disabled:opacity-50 dark:bg-green-900 dark:text-green-300'
              title='Previous (←)'
            >
              <ChevronLeft size={14} />
            </button>

            <button
              onClick={() => navigate('next')}
              disabled={currentIndex === components.length - 1}
              className='rounded bg-green-100 p-1.5 text-green-700 disabled:opacity-50 dark:bg-green-900 dark:text-green-300'
              title='Next (→)'
            >
              <ChevronRight size={14} />
            </button>

            <button
              onClick={() => window.history.back()}
              className='rounded bg-yellow-100 p-1.5 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
              title='Back (ESC)'
            >
              <Home size={14} />
            </button>

            <button
              onClick={() => window.location.reload()}
              className='rounded bg-purple-100 p-1.5 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
              title='Reload'
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className='text-center text-xs text-slate-500 dark:text-slate-400'>{currentComponent.name}</div>
        </div>
      </motion.div>

      {/* Component Display */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentComponent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
