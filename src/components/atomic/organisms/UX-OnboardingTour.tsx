/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

interface TourStep {
  targetRef: React.RefObject<HTMLElement>;
  title: string;
  content: string;
}

interface OnboardingTourProps {
  tourSteps?: TourStep[];
  active?: number;
  setActiveStep?: (step: number) => void;
  onFinish?: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ tourSteps = [], active = -1, setActiveStep, onFinish }) => {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const activeStep = tourSteps[active];

  // Early return if no valid step or invalid active index
  if (!tourSteps.length || active < 0 || active >= tourSteps.length || !activeStep) {
    return null;
  }

  const handleNext = () => {
    if (active < tourSteps.length - 1) {
      setActiveStep?.(active + 1);
    } else {
      onFinish?.();
    }
  };

  const handleBack = () => {
    if (active > 0) {
      setActiveStep?.(active - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeStep) return;

      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handleBack();
          break;
        case 'Enter':
          handleNext();
          break;
        case 'Escape':
          onFinish?.();
          break;
      }
    };

    if (active > -1) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [active, activeStep, onFinish]);

  useEffect(() => {
    if (activeStep?.targetRef.current) {
      const rect = activeStep.targetRef.current.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [active, activeStep]);

  return (
    <AnimatePresence>
      {activeStep && targetRect && (
        <motion.div
          className='fixed inset-0 z-modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Spotlight Backdrop */}
          <svg className='absolute inset-0 h-full w-full'>
            <defs>
              <mask id='spotlight-mask'>
                <rect x='0' y='0' width='100%' height='100%' fill='white' />
                <motion.rect
                  x={targetRect.left - 12}
                  y={targetRect.top - 12}
                  width={targetRect.width + 24}
                  height={targetRect.height + 24}
                  rx='20'
                  fill='black'
                  animate={{
                    x: targetRect.left - 12,
                    y: targetRect.top - 12,
                    width: targetRect.width + 24,
                    height: targetRect.height + 24,
                  }}
                  transition={{ type: 'spring' as any, stiffness: 300, damping: 30 }}
                />
              </mask>
            </defs>
            <rect x='0' y='0' width='100%' height='100%' fill='rgba(0,0,0,0.7)' mask='url(#spotlight-mask)' />
          </svg>

          {/* Tooltip */}
          <motion.div
            className='absolute'
            animate={{
              top: targetRect.top + targetRect.height + 20,
              left: targetRect.left + targetRect.width / 2,
            }}
            initial={{
              top: targetRect.top + targetRect.height + 20,
              left: targetRect.left + targetRect.width / 2,
            }}
            style={{ transform: 'translateX(-50%)' }}
            transition={{ type: 'spring' as any, stiffness: 300, damping: 30 }}
          >
            <div className='max-w-content rounded-executive border border-border bg-background p-strategic shadow-xl backdrop-blur-lg'>
              <div className='mb-tactical flex items-center justify-between'>
                <h3 className='text-heading-md font-semibold text-foreground'>{activeStep.title}</h3>
                <Button variant='ghost' size='sm' onClick={() => onFinish?.()} className='h-auto p-1'>
                  <X className='h-icon-sm w-icon-sm' />
                </Button>
              </div>

              <p className='mb-strategic text-body-md text-muted-foreground'>{activeStep.content}</p>

              <div className='flex items-center justify-between'>
                <div className='flex gap-tactical'>
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === active ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <div className='flex gap-tactical'>
                  {active > 0 && (
                    <Button variant='outline' size='sm' onClick={handleBack}>
                      <ArrowLeft className='mr-1 h-icon-sm w-icon-sm' />
                      Back
                    </Button>
                  )}
                  <Button size='sm' onClick={handleNext}>
                    {active < tourSteps.length - 1 ? (
                      <>
                        Next
                        <ArrowRight className='ml-1 h-icon-sm w-icon-sm' />
                      </>
                    ) : (
                      'Finish'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { OnboardingTour };
export type { TourStep, OnboardingTourProps };
