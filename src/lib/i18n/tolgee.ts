import { DevTools, FormatSimple, Tolgee, TolgeeProvider, useTolgeeSSR } from '@tolgee/react';

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: 'en',
    // for dev mode
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    // for production and server
    staticData: {
      en: () => import('../../messages/en.json'),
      'pt-br': () => import('../../messages/pt-br.json'),
      es: () => import('../../messages/es.json'),
    },
  });

export { tolgee, TolgeeProvider, useTolgeeSSR };