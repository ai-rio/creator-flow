import FPSeries from '@/components/mocks/FPSeries';

interface PageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function FPSeriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <FPSeries 
      initialComponent={params.component || 'fp020'} 
      mode="individual" 
    />
  );
}
