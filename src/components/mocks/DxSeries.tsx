/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Import Dx-Series components (Desktop) - Updated to use renamed components
import NC010Header from './NC-010-Header';
import UX040ToastNotifications from './UX-040-ToastNotifications';
import NC020Sidebar from './NC-020-Sidebar';
import UX010Modals from './UX-010-Modals';
import UX020OnboardingTour from './UX-020-OnboardingTour';
import UX030FeedbackWidget from './UX-030-FeedbackWidget';
import DA010OrderTable from './DA-010-OrderTable';
import DC070CommandCenter from './DC-070-CommandCenter';
import OM020FlowVisualization from './OM-020-FlowVisualization';
import BI010StrategicInsights from './BI-010-StrategicInsights';
import PM010UserProfile from './PM-010-UserProfile';
import SC010SecurityCard from './SC-010-SecurityCard';
import AM040EmailNotifications from './AM-040-EmailNotifications';
import AM010BillingOverview from './AM-010-BillingOverview';
import AM020BillingHistory from './AM-020-BillingHistory';
import AM030PaymentMethod from './AM-030-PaymentMethod';

const components = [
  { id: 'dx2', name: 'DX2: Desktop Header Demo', component: NC010Header },
  { id: 'dx3', name: 'DX3: Desktop Toast Notifications', component: UX040ToastNotifications },
  { id: 'dx4', name: 'DX4: Desktop Sidebar Demo', component: NC020Sidebar },
  { id: 'dx5', name: 'DX5: Desktop Modals', component: UX010Modals },
  { id: 'dx6', name: 'DX6: Desktop Onboarding Tour', component: UX020OnboardingTour },
  { id: 'dx7', name: 'DX7: Desktop Feedback Widget', component: UX030FeedbackWidget },
  { id: 'dx9', name: 'DX9: Desktop Order Table', component: DA010OrderTable },
  { id: 'dx10', name: 'DX10: Desktop Command Center', component: DC070CommandCenter },
  { id: 'dx11', name: 'DX11: Desktop Order Flow', component: OM020FlowVisualization },
  { id: 'dx12', name: 'DX12: Desktop Strategic Insights', component: BI010StrategicInsights },
  { id: 'dx13', name: 'DX13: Desktop User Profile', component: PM010UserProfile },
  { id: 'dx14', name: 'DX14: Desktop Security Card', component: SC010SecurityCard },
  { id: 'dx15', name: 'DX15: Desktop Email Notifications', component: AM040EmailNotifications },
  { id: 'dx16', name: 'DX16: Desktop Billing Overview', component: AM010BillingOverview },
  { id: 'dx17', name: 'DX17: Desktop Billing History', component: AM020BillingHistory },
  { id: 'dx18', name: 'DX18: Desktop Payment Method', component: AM030PaymentMethod },
];

interface DxSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function DxSeries({ initialComponent = 'dx2', mode = 'individual' }: DxSeriesProps) {
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
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className='fixed right-4 top-4 z-[9999] rounded-lg border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90'
      >
        <div className='flex flex-col gap-2'>
          <div className='text-center text-xs font-bold text-slate-600 dark:text-slate-400'>
            DX-SERIES ({currentIndex + 1}/{components.length})
          </div>

          <div className='flex gap-1'>
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className='rounded bg-green-100 p-1.5 text-green-700 disabled:opacity-50 dark:bg-green-900 dark:text-green-300'
            >
              <ChevronLeft size={14} />
            </button>

            <button
              onClick={() => navigate('next')}
              disabled={currentIndex === components.length - 1}
              className='rounded bg-green-100 p-1.5 text-green-700 disabled:opacity-50 dark:bg-green-900 dark:text-green-300'
            >
              <ChevronRight size={14} />
            </button>

            <button
              onClick={() => window.history.back()}
              className='rounded bg-yellow-100 p-1.5 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
            >
              <Home size={14} />
            </button>

            <button
              onClick={() => window.location.reload()}
              className='rounded bg-purple-100 p-1.5 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className='text-center text-xs text-slate-500 dark:text-slate-400'>{currentComponent.name}</div>
        </div>
      </motion.div>

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
