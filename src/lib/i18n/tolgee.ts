import { DevTools, FormatSimple, Tolgee, TolgeeProvider, useTolgeeSSR } from '@tolgee/react';

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: 'en',
    availableLanguages: ['en', 'pt-br', 'es'],
    // Only enable API in development with proper configuration
    ...(typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_TOLGEE_API_KEY && {
        apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
        apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io',
        projectId: 22132,
      }),
    // Static data as primary source
    staticData: {
      // Note: Static imports removed to avoid build issues
      // Translation files are loaded dynamically via the i18n system
    },
  });

export { tolgee, TolgeeProvider, useTolgeeSSR };
