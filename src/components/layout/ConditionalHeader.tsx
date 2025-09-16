'use client';

import { usePathname } from 'next/navigation';

import { Logo } from '@/components/logo';

import { ClientNavigation } from './ClientNavigation';
import { HomepageHeader } from './HomepageHeader';

export const ConditionalHeader = () => {
  const pathname = usePathname();

  // Show HomepageHeader for public routes
  const isPublicRoute =
    pathname.includes('/(public)') ||
    pathname === '/' ||
    pathname.includes('/homepage') ||
    pathname.includes('/login') ||
    pathname.includes('/signup') ||
    pathname.includes('/about') ||
    pathname.includes('/pricing') ||
    pathname.includes('/contact');

  // Hide header for dashboard routes (they have their own layout)
  const isDashboardRoute =
    pathname.includes('/(dashboard)') ||
    pathname.includes('/dashboard') ||
    pathname.includes('/account') ||
    pathname.includes('/manage-subscription');

  if (isDashboardRoute) {
    return null; // Dashboard layout handles its own header
  }

  if (isPublicRoute) {
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
