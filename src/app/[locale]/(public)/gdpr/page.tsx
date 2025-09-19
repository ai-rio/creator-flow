import type { Metadata } from 'next';

import { TPGDPRDataSovereignty } from '@/components/atomic/organisms';

interface GDPRPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: GDPRPageProps): Promise<Metadata> {
  return {
    title: `Data Sovereignty Protocol - CreatorFlow`,
    description:
      "Control your data lifecycle with CreatorFlow's GDPR compliance center. Request your data or initiate the right to be forgotten protocol.",
  };
}

export default function GDPRPage() {
  return <TPGDPRDataSovereignty />;
}
