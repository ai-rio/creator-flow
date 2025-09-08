/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

// Import A-Series components
import A1ShmDashboard from './A1ShmDashboard';
import A2ShmDashboard from './A2ShmDashboard';
import A3ShmDashboard from './A3ShmDashboard';
import A4ShmDashboard from './A4ShmDashboard';
import A5ShmDashboard from './A5ShmDashboard';
import A6ShmDashboard from './A6ShmDashboard';

const components = [
  { id: 'a1', name: 'A1: SHM Dashboard', component: A1ShmDashboard },
  { id: 'a2', name: 'A2: SHM Dashboard', component: A2ShmDashboard },
  { id: 'a3', name: 'A3: SHM Dashboard', component: A3ShmDashboard },
  { id: 'a4', name: 'A4: SHM Dashboard', component: A4ShmDashboard },
  { id: 'a5', name: 'A5: SHM Dashboard', component: A5ShmDashboard },
  { id: 'a6', name: 'A6: SHM Dashboard', component: A6ShmDashboard },
];

interface ASeriesProps {
  initialComponent?: string;
}

export default function ASeries({ initialComponent = 'a1' }: ASeriesProps) {
  const [currentIndex] = useState(components.findIndex((c) => c.id === initialComponent) || 0);

  const currentComponent = components[currentIndex];
  const CurrentComponent = currentComponent.component;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='border-b bg-blue-50 py-4 text-center'>
        <p className='text-sm text-blue-600'>
          Use the{' '}
          <Link href='/en/component-browser' className='font-medium underline'>
            Unified Component Browser
          </Link>{' '}
          for full navigation
        </p>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentComponent.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
