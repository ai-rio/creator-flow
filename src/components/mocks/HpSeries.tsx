'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import HP010Header from './public-pages/HP-010-Header';
import HP010HeaderHero from './public-pages/HP-010-Header-Hero';
import HP010HeaderVariant from './public-pages/HP-010-Header-Variant';
import HP020Hero from './public-pages/HP-020-Hero';
import HP030BenefitsReelShowcase from './public-pages/HP-030-BenefitsReel-Showcase';
import HP040Manifesto from './public-pages/HP-040-Manifesto';
import HP050InteractiveShowcase from './public-pages/HP-050-InteractiveShowcase';
import HP060Testimonials from './public-pages/HP-060-Testimonials';
import HP070PricingTiers from './public-pages/HP-070-PricingTiers';
import HP080FinalCTAVariant from './public-pages/HP-080-FinalCTA-Variant';
import HP090Footer from './public-pages/HP-090-Footer';

const components = [
  { id: 'hp1', name: 'HP1: Header', component: HP010Header },
  { id: 'hp2', name: 'HP2: Header Hero', component: HP010HeaderHero },
  { id: 'hp3', name: 'HP3: Header Variant', component: HP010HeaderVariant },
  { id: 'hp4', name: 'HP4: Hero', component: HP020Hero },
  { id: 'hp5', name: 'HP5: Benefits Reel Showcase', component: HP030BenefitsReelShowcase },
  { id: 'hp6', name: 'HP6: Manifesto', component: HP040Manifesto },
  { id: 'hp7', name: 'HP7: Interactive Showcase', component: HP050InteractiveShowcase },
  { id: 'hp8', name: 'HP8: Testimonials', component: HP060Testimonials },
  { id: 'hp9', name: 'HP9: Pricing Tiers', component: HP070PricingTiers },
  { id: 'hp10', name: 'HP10: Final CTA Variant', component: HP080FinalCTAVariant },
  { id: 'hp11', name: 'HP11: Footer', component: HP090Footer },
];

interface HpSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function HpSeries({ initialComponent = 'hp1', mode = 'individual' }: HpSeriesProps) {
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
          <h3 className='font-semibold text-slate-800 dark:text-slate-200'>HP Series</h3>
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
              onClick={() => (window.location.href = `/hp-series?component=${currentComponent.id}`)}
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
