'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Info, RotateCcw } from 'lucide-react';

// Import O-Series components
import O2OrderSystemStatsCard from './O2OrderSystemStatsCard';
import O5OrderSubNavbar from './O5OrderSubNavbar';

const components = [
  { id: 'o2', name: 'O2: Order System Stats', component: O2OrderSystemStatsCard },
  { id: 'o5', name: 'O5: Order Sub Navbar', component: O5OrderSubNavbar },
];

interface OSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function OSeries({ initialComponent = 'o2', mode = 'individual' }: OSeriesProps) {
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
      {/* Navigation Panel */}
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        className="fixed top-4 right-4 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">
            O-SERIES ({currentIndex + 1}/{components.length})
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => navigate('prev')}
              disabled={currentIndex === 0}
              className="p-1.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 disabled:opacity-50"
              title="Previous (←)"
            >
              <ChevronLeft size={14} />
            </button>
            
            <button
              onClick={() => navigate('next')}
              disabled={currentIndex === components.length - 1}
              className="p-1.5 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 disabled:opacity-50"
              title="Next (→)"
            >
              <ChevronRight size={14} />
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
              title="Back (ESC)"
            >
              <Home size={14} />
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="p-1.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
              title="Reload"
            >
              <RotateCcw size={14} />
            </button>
          </div>
          
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {currentComponent.name}
          </div>
        </div>
      </motion.div>

      {/* Component Display */}
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