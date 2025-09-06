'use client';

import { useSearchParams } from 'next/navigation';
import DxSeries from '@/components/mocks/DxSeries';

export default function DxSeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'dx2';

  return <DxSeries initialComponent={component} mode="browser" />;
}