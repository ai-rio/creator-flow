/* eslint-disable */
'use client';

import React from 'react';
import { ToastContainer, useToastActions } from './UX-ToastNotifications';
import { Button } from '@/components/ui/button';

const ToastDemo = () => {
  const toast = useToastActions();

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='space-y-strategic text-center'>
        <div>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Toast Notifications Demo</h1>
          <p className='mb-strategic text-body-lg text-muted-foreground'>
            Click the buttons below to trigger different toast notifications
          </p>
        </div>

        <div className='grid max-w-md grid-cols-2 gap-tactical'>
          <Button
            onClick={() => toast.success('Success!', 'Your data has been saved successfully.')}
            className='bg-green-500 hover:bg-green-600'
          >
            Success Toast
          </Button>

          <Button
            onClick={() => toast.warning('Warning', 'Your trial is ending in 3 days.')}
            className='bg-yellow-500 hover:bg-yellow-600'
          >
            Warning Toast
          </Button>

          <Button
            onClick={() => toast.error('Error', 'Failed to process your request.')}
            className='bg-red-500 hover:bg-red-600'
          >
            Error Toast
          </Button>

          <Button
            onClick={() => toast.info('Info', 'New features are now available.')}
            className='bg-blue-500 hover:bg-blue-600'
          >
            Info Toast
          </Button>
        </div>

        <div className='max-w-md rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-left text-body-md text-muted-foreground'>
            <li>• Auto-dismiss after 5 seconds</li>
            <li>• Manual dismiss with close button</li>
            <li>• Glow effects for each type</li>
            <li>• Smooth animations</li>
            <li>• Context provider pattern</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function ToastNotificationsDemo(): React.JSX.Element {
  return (
    <ToastContainer>
      <ToastDemo />
    </ToastContainer>
  );
}
