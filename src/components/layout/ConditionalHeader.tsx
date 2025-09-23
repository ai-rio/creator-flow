'use client';

import { usePathname } from 'next/navigation';

import { Logo } from '@/components/logo';

import { ClientNavigation } from './ClientNavigation';
import { HomepageHeader } from './HomepageHeader';

export const ConditionalHeader = () => {
  const pathname = usePathname();

  // Hide header for dashboard routes (they have their own layout)
  const isDashboardRoute =
    pathname.includes('/(dashboard)') ||
    pathname.includes('/dashboard') ||
    pathname.includes('/account') ||
    pathname.includes('/manage-subscription');

  // Hide header for public routes (they have their own layout with HomepageHeader)
  const isPublicRoute =
    pathname.includes('/login') ||
    pathname.includes('/signup') ||
    pathname.includes('/about') ||
    pathname.includes('/pricing') ||
    pathname.includes('/contact') ||
    pathname.includes('/features') ||
    pathname.includes('/privacy') ||
    pathname.includes('/terms') ||
    pathname.includes('/careers') ||
    pathname.includes('/legal') ||
    pathname.includes('/blog') ||
    pathname.includes('/gdpr') ||
    pathname.includes('/theme-demo') ||
    pathname.includes('/cookie-demo');

  // Show HomepageHeader for locale roots (e.g., /en, /es, /pt-br) - these are homepage
  const isHomepage = pathname.match(/^\/[a-z]{2,5}(-[a-z]{2})?$/);

  if (isDashboardRoute || isPublicRoute) {
    return null; // These routes handle their own headers
  }

  if (isHomepage) {
    return <HomepageHeader />;
  }

  // Default header for other pages
  return (
    <header className='flex items-center justify-between py-8'>
      <Logo />
      <ClientNavigation />
    </header>
  );
};
