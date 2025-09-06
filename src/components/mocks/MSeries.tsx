'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';

// Import M-Series components
import M1ExecutiveHeader from './M1ExecutiveHeader';
import M2BusinessSimphonyCard from './M2BusinessSimphonyCard';
import M3StrategicCommandCard from './M3StrategicCommandCard';
import M4LiberationOrchestraCard from './M4LiberationOrchestraCard';
import M5IntelBriefingCard from './M5IntelBriefingCard';
import M6MobileNavbar from './M6MobileNavbar';

const components = [
  { id: 'm1', name: 'M1: Executive Header', component: M1ExecutiveHeader },
  { id: 'm2', name: 'M2: Business Simphony Card', component: M2BusinessSimphonyCard },
  { id: 'm3', name: 'M3: Strategic Command Card', component: M3StrategicCommandCard },
  { id: 'm4', name: 'M4: Liberation Orchestra Card', component: M4LiberationOrchestraCard },
  { id: 'm5', name: 'M5: Intel Briefing Card', component: M5IntelBriefingCard },
  { id: 'm6', name: 'M6: Mobile Navbar', component: M6MobileNavbar },
];

interface MSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function MSeries({ initialComponent = 'm1', mode = 'individual' }: MSeriesProps) {
  const [currentIndex, setCurrentIndex] = useState(
    components.findIndex(c => c.id === initialComponent) || 0
  );

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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 relative">
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className="fixed top-4 right-4 z-[9999] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">
            M-SERIES ({currentIndex + 1}/{components.length})
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