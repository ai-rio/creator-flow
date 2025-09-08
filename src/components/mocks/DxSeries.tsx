'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';

// Import Dx-Series components (Desktop)
import DesktopHeaderDemo from './02DesktopHeaderDemo';
import DesktopToastNotifications from './03DesktopToastNotifications';
import DesktopSidebarDemo from './04DesktopSidebarDemo';
import DesktopModals from './05DesktopModals';
import DesktopOnboardingTourDemo from './06DesktopOnboardingTour.demo';
import DesktopFeedbackWidget from './07DesktopFeedbackWidget';
import DesktopOrderTableComponent from './09DesktopOrderTableComponent';
import DesktopDashboardCommandCenter from './10DesktopDashboardCommandCenter';
import DesktopOrderFlowVisualisation from './11DesktopOrderFlowVisualisation';
import DesktopStrategicInsights from './12DesktopStrategicInsights';
import DesktopUserProfileCard from './13DesktopUserProfileCard';
import DesktopSecurityCard from './14DesktopSecurityCard';
import DesktopEmailNotificationsCard from './15DesktopEmailNotificationsCard';
import DesktopBillinqOverview from './16DesktopBillinqOverview';
import DesktopBillingHistory from './17DesktopBillingHistory';
import DesktopPaymentMethod from './18DesktopPaymentMethod';

const components = [
  { id: 'dx2', name: 'DX2: Desktop Header Demo', component: DesktopHeaderDemo },
  { id: 'dx3', name: 'DX3: Desktop Toast Notifications', component: DesktopToastNotifications },
  { id: 'dx4', name: 'DX4: Desktop Sidebar Demo', component: DesktopSidebarDemo },
  { id: 'dx5', name: 'DX5: Desktop Modals', component: DesktopModals },
  { id: 'dx6', name: 'DX6: Desktop Onboarding Tour', component: DesktopOnboardingTourDemo },
  { id: 'dx7', name: 'DX7: Desktop Feedback Widget', component: DesktopFeedbackWidget },
  { id: 'dx9', name: 'DX9: Desktop Order Table', component: DesktopOrderTableComponent },
  { id: 'dx10', name: 'DX10: Desktop Command Center', component: DesktopDashboardCommandCenter },
  { id: 'dx11', name: 'DX11: Desktop Order Flow', component: DesktopOrderFlowVisualisation },
  { id: 'dx12', name: 'DX12: Desktop Strategic Insights', component: DesktopStrategicInsights },
  { id: 'dx13', name: 'DX13: Desktop User Profile', component: DesktopUserProfileCard },
  { id: 'dx14', name: 'DX14: Desktop Security Card', component: DesktopSecurityCard },
  { id: 'dx15', name: 'DX15: Desktop Email Notifications', component: DesktopEmailNotificationsCard },
  { id: 'dx16', name: 'DX16: Desktop Billing Overview', component: DesktopBillinqOverview },
  { id: 'dx17', name: 'DX17: Desktop Billing History', component: DesktopBillingHistory },
  { id: 'dx18', name: 'DX18: Desktop Payment Method', component: DesktopPaymentMethod },
];

interface DxSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function DxSeries({ initialComponent = 'dx2', mode = 'individual' }: DxSeriesProps) {
  const [currentIndex, setCurrentIndex] = useState(
    components.findIndex(c => c.id === initialComponent) || 0
  );

  const currentComponent = (components as any)[currentIndex];
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 relative">
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className="fixed top-4 right-4 z-[9999] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">
            DX-SERIES ({currentIndex + 1}/{components.length})
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className="p-1.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 disabled:opacity-50"
            >
              <ChevronLeft size={14} />
            </button>
            
            <button
              onClick={() => navigate('next')}
              disabled={currentIndex === components.length - 1}
              className="p-1.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 disabled:opacity-50"
            >
              <ChevronRight size={14} />
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
            >
              <Home size={14} />
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="p-1.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
            >
              <RotateCcw size={14} />
            </button>
          </div>
          
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {currentComponent.name}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
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