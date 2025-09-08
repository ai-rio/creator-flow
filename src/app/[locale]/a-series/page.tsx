import ASeries from '@/components/mocks/ASeries';

interface PageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function ASeriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <ASeries 
      initialComponent={params.component || 'a1'} 
    />
  );
}
