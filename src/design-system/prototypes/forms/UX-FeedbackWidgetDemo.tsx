/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { FeedbackWidget } from './UX-FeedbackWidget';
import { Button } from '@/components/ui/button';

export default function FeedbackWidgetDemo(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: { type: string; message: string }) => {
    console.log('Feedback submitted:', data);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='space-y-strategic text-center'>
        <div>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Feedback Widget Demo</h1>
          <p className='mb-strategic text-body-lg text-muted-foreground'>
            Click the button below to open the feedback widget
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)} size='lg'>
          Send Feedback
        </Button>

        <div className='max-w-md rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-left text-body-md text-muted-foreground'>
            <li>• Multi-step feedback form</li>
            <li>• Category selection (Bug, Feature, General)</li>
            <li>• Glass morphism design</li>
            <li>• Success confirmation</li>
            <li>• Keyboard navigation support</li>
          </ul>
        </div>
      </div>

      <FeedbackWidget isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
}
