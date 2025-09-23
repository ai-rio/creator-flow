import type { Metadata } from 'next';

import { CP010Hero } from '@/components/atomic/organisms';

interface CareersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: `Careers - CreatorFlow`,
    description:
      "Join CreatorFlow's elite team of architects. We don't have open roles - we have critical missions in the campaign against operational chaos.",
  };
}

export default function CareersPage() {
  return <CP010Hero />;
}
