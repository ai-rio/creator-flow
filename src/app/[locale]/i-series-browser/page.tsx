'use client';

import { useSearchParams } from 'next/navigation';
import ISeries from '@/components/mocks/ISeries';

export default function ISeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'i1';

  return <ISeries initialComponent={component} mode="browser" />;
}