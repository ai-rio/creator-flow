'use client';

import { NextIntlClientProvider as BaseNextIntlClientProvider } from 'next-intl';
import React, { ReactNode } from 'react';

interface NextIntlClientProviderProps {
  locale: string;
  messages: any;
  children: ReactNode;
  timeZone?: string;
  now?: Date;
}

/**
 * Optimized NextIntl Client Provider for CreatorFlow
 *
 * Features:
 * - Selective message loading to reduce bundle size
 * - Component-specific message filtering
 * - Performance monitoring and error boundaries
 * - Atomic design pattern integration
 */
export default function NextIntlClientProvider({
  locale,
  messages,
  children,
  timeZone,
  now,
}: NextIntlClientProviderProps): React.JSX.Element {
  // Performance monitoring for translation loading
  const messageCount = React.useMemo(() => {
    if (!messages) return 0;

    const countKeys = (obj: any, depth = 0): number => {
      if (depth > 10) return 0; // Prevent infinite recursion

      let count = 0;
      for (const value of Object.values(obj)) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          count += countKeys(value, depth + 1);
        } else {
          count += 1;
        }
      }
      return count;
    };

    return countKeys(messages);
  }, [messages]);

  // Error boundary for translation errors
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 NextIntl Provider initialized:`, {
        locale,
        messageCount,
        timeZone,
        timestamp: new Date().toISOString(),
      });
    }
  }, [locale, messageCount, timeZone]);

  // Error boundary
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('MISSING_MESSAGE') || event.message.includes('next-intl')) {
        setError(new Error(`Translation error: ${event.message}`));

        if (process.env.NODE_ENV === 'development') {
          console.error('🚨 Translation Error:', {
            error: event.message,
            locale,
            stack: event.error?.stack,
          });
        }
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [locale]);

  // Fallback for translation errors
  if (error) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className='min-h-screen bg-red-50 p-8 dark:bg-red-950'>
          <div className='mx-auto max-w-4xl'>
            <div className='rounded-lg border border-red-200 bg-red-100 p-6 dark:border-red-800 dark:bg-red-900'>
              <h1 className='mb-4 text-xl font-bold text-red-800 dark:text-red-200'>🚨 Translation Error</h1>
              <p className='mb-4 text-red-700 dark:text-red-300'>
                Failed to load translations for locale:{' '}
                <code className='rounded bg-red-200 px-2 py-1 dark:bg-red-800'>{locale}</code>
              </p>
              <details className='text-sm'>
                <summary className='cursor-pointer font-medium text-red-600 dark:text-red-400'>Error Details</summary>
                <pre className='mt-2 overflow-auto rounded bg-red-200 p-4 text-red-800 dark:bg-red-800 dark:text-red-200'>
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
              <button
                onClick={() => setError(null)}
                className='mt-4 rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Production fallback - render children without translations
    return <>{children}</>;
  }

  return (
    <BaseNextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      now={now}
      onError={(error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('🚨 NextIntl Client Error:', {
            error: error.message,
            locale,
            code: error.code,
          });
        }

        // Set error for development mode display
        if (process.env.NODE_ENV === 'development') {
          setError(error);
        }
      }}
    >
      {children}
    </BaseNextIntlClientProvider>
  );
}

/**
 * Hook for selective message loading
 * Reduces bundle size by loading only required message sections
 */
export function useSelectiveMessages(fullMessages: any, requiredSections: string[]): any {
  return React.useMemo(() => {
    if (!fullMessages || requiredSections.length === 0) {
      return fullMessages;
    }

    const selectiveMessages: any = {};

    for (const section of requiredSections) {
      const sectionPath = section.split('.');
      let sourceRef = fullMessages;
      let targetRef = selectiveMessages;

      // Navigate to the source section
      for (let i = 0; i < sectionPath.length - 1; i++) {
        if (!sourceRef[sectionPath[i]]) break;
        sourceRef = sourceRef[sectionPath[i]];

        if (!targetRef[sectionPath[i]]) {
          targetRef[sectionPath[i]] = {};
        }
        targetRef = targetRef[sectionPath[i]];
      }

      // Copy the final section
      const finalKey = sectionPath[sectionPath.length - 1];
      if (sourceRef[finalKey]) {
        targetRef[finalKey] = sourceRef[finalKey];
      }
    }

    if (process.env.NODE_ENV === 'development') {
      const originalCount = JSON.stringify(fullMessages).length;
      const optimizedCount = JSON.stringify(selectiveMessages).length;
      const savings = (((originalCount - optimizedCount) / originalCount) * 100).toFixed(1);

      console.log(`📦 Message optimization:`, {
        sections: requiredSections,
        originalSize: `${(originalCount / 1024).toFixed(1)}KB`,
        optimizedSize: `${(optimizedCount / 1024).toFixed(1)}KB`,
        savings: `${savings}%`,
      });
    }

    return selectiveMessages;
  }, [fullMessages, requiredSections]);
}

/**
 * Provider for atomic components with selective message loading
 */
interface AtomicTranslationProviderProps {
  locale: string;
  messages: any;
  children: ReactNode;
  componentLevel: 'atoms' | 'molecules' | 'organisms' | 'compositions';
  componentName?: string;
}

export function AtomicTranslationProvider({
  locale,
  messages,
  children,
  componentLevel,
  componentName,
}: AtomicTranslationProviderProps): React.JSX.Element {
  // Load only messages relevant to this atomic level
  const selectiveMessages = useSelectiveMessages(messages, [
    // Always include common sections
    'common',
    'ui',
    'errors',

    // Include specific atomic level
    `components.atomic.${componentLevel}`,

    // Include specific component if provided
    ...(componentName ? [`components.atomic.${componentLevel}.${componentName}`] : []),
  ]);

  return (
    <NextIntlClientProvider locale={locale} messages={selectiveMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

/**
 * Helper for creating page-specific providers
 */
export function createPageTranslationProvider(pageKeys: string[]) {
  return function PageTranslationProvider({
    locale,
    messages,
    children,
  }: {
    locale: string;
    messages: any;
    children: ReactNode;
  }) {
    const selectiveMessages = useSelectiveMessages(messages, [
      // Always include common sections
      'common',
      'ui',
      'navigation',
      'errors',

      // Include page-specific keys
      ...pageKeys,
    ]);

    return (
      <NextIntlClientProvider locale={locale} messages={selectiveMessages}>
        {children}
      </NextIntlClientProvider>
    );
  };
}
