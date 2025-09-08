'use client';

import { useSearchParams } from 'next/navigation';

import MxSeries from '@/components/mocks/MxSeries';

export default function MxSeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'mx1';

  return <MxSeries initialComponent={component} mode="browser" />;
}