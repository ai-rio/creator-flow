import { AnimatePresence, motion } from 'framer-motion';
import { Bolt, Instagram, Linkedin, Moon, Sun, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useEffect, useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Main Showcase Component ---
export default function FooterShowcase(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='bg-slate-100 font-sans transition-colors duration-300 dark:bg-[#0A090F]'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display.swap'); body { font-family: 'Inter', sans-serif; }`}</style>
      <div className='h-screen' />
      <HP090Footer />
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- HP-090-Footer Component ---
const HP090Footer = () => {
  const t = useTranslations('footer');

  const linkSections = [
    {
      title: t('sections.product.title'),
      links: [t('sections.product.features'), t('sections.product.pricing'), t('sections.product.testimonials')],
    },
    {
      title: t('sections.company.title'),
      links: [t('sections.company.about'), t('sections.company.careers'), t('sections.company.contact')],
    },
    { title: t('sections.legal.title'), links: [t('sections.legal.privacy'), t('sections.legal.terms')] },
  ];
  const socialLinks = [{ Icon: Twitter }, { Icon: Instagram }, { Icon: Linkedin }];

  return (
    <footer className='-mx-4 -mt-1 w-screen bg-background transition-colors duration-300'>
      <div className='mx-auto max-w-6xl px-8 pb-16 pt-0'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 gap-12 md:grid-cols-5'>
          {/* Brand Section */}
          <div className='md:col-span-2'>
            <a href='#' className='flex items-center gap-2 text-xl font-bold text-foreground'>
              <Bolt className='h-6 w-6 text-primary' />
              CreatorFlow
            </a>
            <p className='mt-4 max-w-xs text-sm text-muted-foreground'>{t('brand.tagline')}</p>

            {/* Social Links - Mobile Optimized */}
            <div className='mt-6 flex gap-4 md:hidden'>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href='#'
                  className='flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary'
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className='font-semibold text-foreground'>{section.title}</h3>
              <ul className='mt-4 space-y-3'>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href='#' className='text-sm text-muted-foreground transition-colors hover:text-primary'>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='mt-16 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row'>
          <p className='text-sm text-muted-foreground'>{t('copyright')}</p>

          {/* Desktop Social Links */}
          <div className='mt-4 hidden gap-6 md:mt-0 md:flex'>
            {socialLinks.map((social, i) => (
              <a key={i} href='#' className='text-muted-foreground transition-colors hover:text-primary'>
                <social.Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 text-foreground backdrop-blur-xl'
    aria-label='Toggle theme'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9, rotate: -15 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);
