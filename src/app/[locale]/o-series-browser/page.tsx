'use client';

import { useSearchParams } from 'next/navigation';
import OSeries from '@/components/mocks/OSeries';

export default function OSeriesBrowser() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'o2';

  return <OSeries initialComponent={component} mode="browser" />;
}