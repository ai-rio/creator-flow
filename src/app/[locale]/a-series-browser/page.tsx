import ASeries from '@/components/mocks/ASeries';

interface ASeriesBrowserPageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function ASeriesBrowserPage({ searchParams }: ASeriesBrowserPageProps) {
  const params = await searchParams;
  const selectedComponent = params.component;
  
  // If a specific component is requested, show it individually
  if (selectedComponent) {
    return (
      <div className="min-h-screen">
        <ASeries mode="individual" initialComponent={selectedComponent} />
      </div>
    );
  }

  // Otherwise show the browser mode
  return (
    <div className="min-h-screen">
      <ASeries mode="browser" />
    </div>
  );
}