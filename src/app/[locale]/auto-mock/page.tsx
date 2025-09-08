'use client';

import { Button } from '@/components/ui/button';

export default function AutoMockPage() {
  return (
    <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100'>
      <div className='border-b border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900'>
        <h1 className='mb-2 text-3xl font-bold'>🔄 Auto Mock Page (Under Construction)</h1>
        <p className='text-gray-600 dark:text-gray-400'>
          This page is being updated. Please use /direct-mock for component testing.
        </p>
      </div>

      <div className='mx-auto max-w-4xl p-6'>
        <div className='py-12 text-center'>
          <h2 className='mb-4 text-xl font-semibold'>Page Under Maintenance</h2>
          <p className='mb-6 text-gray-600 dark:text-gray-400'>
            We&apos;re updating this page to work with the new TypeScript components.
          </p>
          <Button onClick={() => (window.location.href = '/en/direct-mock')}>Go to Direct Mock Page</Button>
        </div>
      </div>
    </div>
  );
}
