'use client';

import { usePathname } from 'next/navigation';

import FooterSection from '../footer';

/**
 * Clean Footer Component with ZERO gap
 *
 * Uses the clean footer.tsx component with modifications to eliminate gaps
 */
export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't show footer on specific pages where it would interfere
  if (pathname.startsWith('/auth/') || pathname.startsWith('/dashboard/')) {
    return null;
  }

  return (
    <div className='w-full bg-background transition-colors duration-300'>
      <FooterSection />
    </div>
  );
}
