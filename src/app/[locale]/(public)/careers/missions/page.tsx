import type { Metadata } from 'next';

import { CP020OpenMissions } from '@/components/atomic/organisms';

interface CareersMissionsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CareersMissionsPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: `Active Missions - CreatorFlow Careers`,
    description:
      'Explore critical missions in our campaign against operational chaos. Join our elite team of architects.',
  };
}

export default function CareersMissionsPage() {
  return <CP020OpenMissions />;
}
