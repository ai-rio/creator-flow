import UnifiedComponentBrowser from '@/components/mocks/UnifiedComponentBrowser';

interface PageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function ComponentBrowserPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <UnifiedComponentBrowser 
      initialComponent={params.component || 'a1'} 
    />
  );
}
