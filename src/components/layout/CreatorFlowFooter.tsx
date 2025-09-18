'use client';

import { Bolt, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

/**
 * CreatorFlow Footer Component
 *
 * Hybrid Implementation Strategy:
 * - Uses HP-090-Footer.tsx as EXACT visual specification
 * - Implements with shadcn/ui components for maintainability
 * - Integrates next-intl for i18n compatibility
 * - Follows CreatorFlow design tokens
 *
 * Visual Elements Preserved:
 * - Event horizon separator with gradient
 * - Grid layout (md:grid-cols-5)
 * - Brand section with logo and tagline
 * - Social media icons with hover states
 * - Copyright section with border-top
 * - Light/dark theme compatibility
 */

interface CreatorFlowFooterProps {
  className?: string;
}

export function CreatorFlowFooter({ className }: CreatorFlowFooterProps) {
  const t = useTranslations('footer');

  // Link sections from HP-090-Footer design with complete i18n integration
  const linkSections = [
    {
      title: t('sections.product.title'),
      links: [
        { name: t('sections.product.features'), href: '/features' },
        { name: t('sections.product.pricing'), href: '/pricing' },
        { name: t('sections.product.testimonials'), href: '#testimonials' },
      ],
    },
    {
      title: t('sections.company.title'),
      links: [
        { name: t('sections.company.about'), href: '/about' },
        { name: t('sections.company.careers'), href: '/careers' },
        { name: t('sections.company.contact'), href: '/contact' },
      ],
    },
    {
      title: t('sections.legal.title'),
      links: [
        { name: t('sections.legal.privacy'), href: '/privacy' },
        { name: t('sections.legal.terms'), href: '/terms' },
      ],
    },
  ];

  // Social links from HP-090-Footer design with complete i18n integration
  const socialLinks = [
    {
      Icon: Twitter,
      href: 'https://twitter.com/creatorflow',
      label: t('social.twitter'),
    },
    {
      Icon: Instagram,
      href: 'https://instagram.com/creatorflow',
      label: t('social.instagram'),
    },
    {
      Icon: Linkedin,
      href: 'https://linkedin.com/company/creatorflow',
      label: t('social.linkedin'),
    },
  ];

  return (
    <footer
      className={cn(
        // Base footer styling from HP-090-Footer
        'relative w-full overflow-hidden bg-slate-200/50 dark:bg-black/20',
        className
      )}
    >
      <div className='relative z-10 mx-auto max-w-6xl px-8 py-16'>
        {/* Event Horizon Separator - Exact match from HP-090-Footer */}
        <div className='mb-16 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' />

        {/* Main Grid Layout - Exact match from HP-090-Footer */}
        <div className='grid grid-cols-1 gap-12 md:grid-cols-5'>
          {/* Brand Section - Exact match with i18n integration */}
          <div className='md:col-span-2'>
            <Link href='#' className='flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100'>
              <Bolt className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              CreatorFlow
            </Link>
            <p className='mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400'>{t('brand.tagline')}</p>
          </div>

          {/* Link Sections - Exact styling with i18n data */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className='font-semibold text-slate-800 dark:text-slate-200'>{section.title}</h3>
              <ul className='mt-4 space-y-3'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-sm text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Exact match from HP-090-Footer with i18n */}
        <div className='mt-16 flex flex-col items-center justify-between border-t border-slate-900/10 pt-8 dark:border-slate-100/10 md:flex-row'>
          <p className='text-sm text-slate-600 dark:text-slate-400'>{t('copyright')}</p>
          <div className='mt-4 flex gap-6 md:mt-0'>
            {socialLinks.map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className='text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400'
                aria-label={social.label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <social.Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
