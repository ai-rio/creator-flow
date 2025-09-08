import FPSeries from '@/components/mocks/FPSeries';

interface PageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function FPSeriesBrowserPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <FPSeries 
      initialComponent={params.component || 'fp020'} 
    />
  );
}
