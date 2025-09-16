'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import { Logo } from '@/components/logo';

export const ConditionalFooter = () => {
  const pathname = usePathname();

  // Hide footer for dashboard routes (they have their own layout)
  const isDashboardRoute =
    pathname.includes('/(dashboard)') ||
    pathname.includes('/dashboard') ||
    pathname.includes('/account') ||
    pathname.includes('/manage-subscription');

  if (isDashboardRoute) {
    return null; // Dashboard layout handles its own footer if needed
  }

  return (
    <footer className='mt-8 flex flex-col gap-8 text-muted-foreground lg:mt-32'>
      <div className='flex flex-col justify-between gap-8 lg:flex-row'>
        <div>
          <Logo />
        </div>
        <div className='flex flex-col gap-8 lg:flex-row lg:gap-16'>
          <div className='flex flex-col gap-4'>
            <h3 className='font-semibold text-foreground'>Product</h3>
            <div className='flex flex-col gap-2'>
              <Link href='/features' className='hover:text-foreground'>
                Features
              </Link>
              <Link href='/pricing' className='hover:text-foreground'>
                Pricing
              </Link>
              <Link href='/changelog' className='hover:text-foreground'>
                Changelog
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='font-semibold text-foreground'>Company</h3>
            <div className='flex flex-col gap-2'>
              <Link href='/about' className='hover:text-foreground'>
                About
              </Link>
              <Link href='/contact' className='hover:text-foreground'>
                Contact
              </Link>
              <Link href='/blog' className='hover:text-foreground'>
                Blog
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='font-semibold text-foreground'>Legal</h3>
            <div className='flex flex-col gap-2'>
              <Link href='/privacy' className='hover:text-foreground'>
                Privacy Policy
              </Link>
              <Link href='/terms' className='hover:text-foreground'>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <p className='text-sm'>© 2024 CreatorFlow. All rights reserved.</p>
        <div className='flex gap-4'>
          <Link href='#' className='hover:text-foreground'>
            <IoLogoTwitter size={20} />
          </Link>
          <Link href='#' className='hover:text-foreground'>
            <IoLogoFacebook size={20} />
          </Link>
          <Link href='#' className='hover:text-foreground'>
            <IoLogoInstagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
