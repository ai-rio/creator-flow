/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

// Import FP-Series components (Features Page)
import FP020OrderManagement from './FP-020-OrderManagement';
import FP030DigitalTwinCommand from './FP-030-DigitalTwinCommand';
import FP040LogisticsCoPilot from './FP-040-LogisticsCoPilot';
import FP050DataPrism from './FP-050-DataPrism';

const components = [
  { id: 'fp020', name: 'FP020: Order Management', component: FP020OrderManagement },
  { id: 'fp030', name: 'FP030: Digital Twin Command', component: FP030DigitalTwinCommand },
  { id: 'fp040', name: 'FP040: Logistics CoPilot', component: FP040LogisticsCoPilot },
  { id: 'fp050', name: 'FP050: Data Prism', component: FP050DataPrism },
];

interface FPSeriesProps {
  initialComponent?: string;
}

export default function FPSeries({ initialComponent = 'fp020' }: FPSeriesProps) {
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
