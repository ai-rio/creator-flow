/* eslint-disable */
'use client';

import React, { useRef, useState } from 'react';
import { OnboardingTour, TourStep } from './UX-OnboardingTour';
import { Button } from '@/components/ui/button';

export default function OnboardingTourDemo(): React.JSX.Element {
  const [tourActive, setTourActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const tourSteps: TourStep[] = [
    {
      targetRef: step1Ref,
      title: 'Welcome to CreatorFlow',
      content: 'This is your dashboard where you can see all your TikTok Shop orders and analytics.',
    },
    {
      targetRef: step2Ref,
      title: 'Order Management',
      content: 'Click here to manage your orders, track shipments, and handle customer requests.',
    },
    {
      targetRef: step3Ref,
      title: 'Analytics Hub',
      content: 'View your performance metrics, revenue trends, and growth insights here.',
    },
  ];

  const startTour = () => {
    setActiveStep(0);
    setTourActive(true);
  };

  const finishTour = () => {
    setTourActive(false);
    setActiveStep(0);
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-4xl space-y-strategic'>
        <div className='mb-strategic text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Onboarding Tour Demo</h1>
          <Button onClick={startTour}>Start Tour</Button>
        </div>

        <div className='grid grid-cols-1 gap-strategic md:grid-cols-3'>
          <div ref={step1Ref} className='rounded-executive border border-border bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Dashboard Overview</h3>
            <p className='text-body-md text-muted-foreground'>
              Your main hub for monitoring TikTok Shop performance and order fulfillment.
            </p>
          </div>

          <div ref={step2Ref} className='rounded-executive border border-border bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Order Management</h3>
            <p className='text-body-md text-muted-foreground'>
              Process orders, manage inventory, and handle customer communications.
            </p>
          </div>

          <div ref={step3Ref} className='rounded-executive border border-border bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Analytics Hub</h3>
            <p className='text-body-md text-muted-foreground'>
              Track performance metrics, revenue trends, and business growth.
            </p>
          </div>
        </div>
      </div>

      {tourActive && (
        <OnboardingTour tourSteps={tourSteps} active={activeStep} setActiveStep={setActiveStep} onFinish={finishTour} />
      )}
    </div>
  );
}
