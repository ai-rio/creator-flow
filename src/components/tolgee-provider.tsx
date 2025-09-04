'use client';

import { useParams } from 'next/navigation';

import { tolgee, TolgeeProvider, useTolgeeSSR } from '@/lib/i18n/tolgee';

export function TolgeeClientProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  
  const ssrTolgee = useTolgeeSSR(tolgee, locale);
  
  return (
    <TolgeeProvider tolgee={ssrTolgee}>
      {children}
    </TolgeeProvider>
  );
}