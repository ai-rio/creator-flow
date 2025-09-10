'use client';

import { useSearchParams } from 'next/navigation';

import UnifiedComponentBrowser from '@/components/mocks/UnifiedComponentBrowser';

export default function DxSeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'nc010';

  return <UnifiedComponentBrowser initialComponent={component} />;
}
