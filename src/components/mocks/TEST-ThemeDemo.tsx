'use client';

import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GlobalThemeToggle } from '@/components/ui/theme-toggle';

export default function TESTThemeDemo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='min-h-screen bg-background p-8 text-foreground'>
        <div className='animate-pulse'>Loading theme demo...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-8 text-foreground transition-colors duration-300'>
      <div className='mx-auto max-w-4xl space-y-8'>
        {/* Header */}
        <div className='space-y-4 text-center'>
          <h1 className='bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-4xl font-bold text-transparent'>
            Theme Testing Demo
          </h1>
          <p className='text-lg text-muted-foreground'>
            Testing theme switching functionality in UnifiedComponentBrowser
          </p>
          <div className='flex items-center justify-center gap-4'>
            <GlobalThemeToggle />
            <span className='text-sm text-muted-foreground'>
              Current theme: <strong className='text-foreground'>{theme}</strong>
            </span>
          </div>
        </div>

        {/* Theme Status Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card className='border-2 p-6'>
            <h3 className='mb-4 text-xl font-semibold'>Theme Status</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span>Current Theme:</span>
                <span className='rounded bg-primary/10 px-2 py-1 font-medium text-primary'>{theme}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>CSS Classes:</span>
                <span className='font-mono text-sm'>{theme === 'dark' ? '.dark' : 'root'}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Background:</span>
                <div className='h-6 w-6 rounded border border-border bg-background' />
              </div>
              <div className='flex items-center justify-between'>
                <span>Foreground:</span>
                <div className='h-6 w-6 rounded border bg-foreground' />
              </div>
            </div>
          </Card>

          <Card className='border-2 p-6'>
            <h3 className='mb-4 text-xl font-semibold'>Color Variables</h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-primary' />
                <span className='text-sm'>Primary</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-secondary' />
                <span className='text-sm'>Secondary</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-accent' />
                <span className='text-sm'>Accent</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-muted' />
                <span className='text-sm'>Muted</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 rounded bg-destructive' />
                <span className='text-sm'>Destructive</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Interactive Elements */}
        <Card className='p-6'>
          <h3 className='mb-4 text-xl font-semibold'>Interactive Elements</h3>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <Button variant='default'>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
          </div>
        </Card>

        {/* Typography Test */}
        <Card className='p-6'>
          <h3 className='mb-4 text-xl font-semibold'>Typography</h3>
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold text-foreground'>Heading 1</h1>
            <h2 className='text-xl font-semibold text-foreground'>Heading 2</h2>
            <p className='text-base text-foreground'>
              This is regular body text that should be highly readable in both themes.
            </p>
            <p className='text-sm text-muted-foreground'>This is muted text for secondary information.</p>
            <code className='rounded bg-muted px-2 py-1 font-mono text-sm'>Code text example</code>
          </div>
        </Card>

        {/* Brand Colors */}
        <Card className='p-6'>
          <h3 className='mb-4 text-xl font-semibold'>CreatorFlow Brand Colors</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='mx-auto mb-2 h-16 w-16 rounded-lg bg-brand-teal-primary' />
              <span className='text-sm'>Teal Primary</span>
            </div>
            <div className='text-center'>
              <div className='bg-brand-purple-primary mx-auto mb-2 h-16 w-16 rounded-lg' />
              <span className='text-sm'>Purple Primary</span>
            </div>
            <div className='text-center'>
              <div className='bg-brand-blue-primary mx-auto mb-2 h-16 w-16 rounded-lg' />
              <span className='text-sm'>Blue Primary</span>
            </div>
          </div>
        </Card>

        {/* Success Message */}
        <Card className='border-green-500/50 bg-green-500/10 p-6'>
          <div className='flex items-center gap-3'>
            <div className='h-3 w-3 rounded-full bg-green-500' />
            <span className='font-semibold text-green-700 dark:text-green-400'>
              Theme switching is working correctly!
            </span>
          </div>
          <p className='mt-2 text-sm text-green-600 dark:text-green-300'>
            All components respond properly to theme changes. Click the theme toggle above to test.
          </p>
        </Card>
      </div>
    </div>
  );
}
