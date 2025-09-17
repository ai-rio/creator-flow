'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const ConditionalFooter = () => {
  const pathname = usePathname();
  const t = useTranslations('footer');

  // Show footer for public routes
  const isPublicRoute =
    pathname.includes('/(public)') ||
    pathname === '/' ||
    pathname.includes('/homepage') ||
    pathname.includes('/login') ||
    pathname.includes('/signup') ||
    pathname.includes('/about') ||
    pathname.includes('/pricing') ||
    pathname.includes('/contact') ||
    // Match locale roots (e.g., /en, /es, /pt-br)
    Boolean(pathname.match(/^\/[a-z]{2,5}(-[a-z]{2})?$/));

  // Hide footer for dashboard routes
  const isDashboardRoute =
    pathname.includes('/(dashboard)') ||
    pathname.includes('/dashboard') ||
    pathname.includes('/account') ||
    pathname.includes('/manage-subscription');

  if (isDashboardRoute) {
    return null;
  }

  if (!isPublicRoute) {
    return null;
  }

  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Brand */}
          <div>
            <h3 className='text-lg font-semibold'>CreatorFlow</h3>
            <p className='mt-2 text-sm text-muted-foreground'>{t('brand.tagline')}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className='font-medium'>{t('sections.product.title')}</h4>
            <ul className='mt-2 space-y-1'>
              <li>
                <Link href='/features' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.product.features')}
                </Link>
              </li>
              <li>
                <Link href='/pricing' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.product.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className='font-medium'>{t('sections.company.title')}</h4>
            <ul className='mt-2 space-y-1'>
              <li>
                <Link href='/about' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.company.about')}
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.company.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className='font-medium'>{t('sections.legal.title')}</h4>
            <ul className='mt-2 space-y-1'>
              <li>
                <Link href='/privacy' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href='/terms' className='text-sm text-muted-foreground hover:text-foreground'>
                  {t('sections.legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 border-t pt-4 text-center'>
          <p className='text-sm text-muted-foreground'>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
