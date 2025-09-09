'use client';

import { useSearchParams } from 'next/navigation';

import DSeries from '@/components/mocks/DSeries';

export default function DSeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'd1';

  return <DSeries initialComponent={component} mode="browser" />;
}