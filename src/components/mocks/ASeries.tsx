/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

// Import DC-Series components (renamed from A-Series)
import DC010ShmDashboard from './DC-010-ShmDashboard';
import DC020ShmDashboardV2 from './DC-020-ShmDashboardV2';
import DC030ShmDashboardV3 from './DC-030-ShmDashboardV3';
import DC040ShmDashboardV4 from './DC-040-ShmDashboardV4';
import DC050ShmDashboardV5 from './DC-050-ShmDashboardV5';
import DC060ShmDashboardV6 from './DC-060-ShmDashboardV6';

const components = [
  { id: 'a1', name: 'DC-010: SHM Dashboard', component: DC010ShmDashboard },
  { id: 'a2', name: 'DC-020: SHM Dashboard V2', component: DC020ShmDashboardV2 },
  { id: 'a3', name: 'DC-030: SHM Dashboard V3', component: DC030ShmDashboardV3 },
  { id: 'a4', name: 'DC-040: SHM Dashboard V4', component: DC040ShmDashboardV4 },
  { id: 'a5', name: 'DC-050: SHM Dashboard V5', component: DC050ShmDashboardV5 },
  { id: 'a6', name: 'DC-060: SHM Dashboard V6', component: DC060ShmDashboardV6 },
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
