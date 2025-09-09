import { AnimatePresence, motion } from 'framer-motion';
import { Bolt, Instagram, Linkedin, Moon, Sun, Twitter } from 'lucide-react';
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
  const linkSections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Testimonials'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
  ];
  const socialLinks = [{ Icon: Twitter }, { Icon: Instagram }, { Icon: Linkedin }];

  return (
    <footer className='relative w-full overflow-hidden bg-slate-200/50 dark:bg-black/20'>
      <div className='relative z-10 mx-auto max-w-6xl px-8 py-16'>
        {/* Event Horizon Separator */}
        <div className='mb-16 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' />

        <div className='grid grid-cols-1 gap-12 md:grid-cols-5'>
          <div className='md:col-span-2'>
            <a href='#' className='flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100'>
              <Bolt className='h-6 w-6 text-blue-600 dark:text-blue-400' />
              CreatorFlow
            </a>
            <p className='mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-400'>
              The automated command center for ambitious TikTok Shop creators.
            </p>
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className='font-semibold text-slate-800 dark:text-slate-200'>{section.title}</h3>
              <ul className='mt-4 space-y-3'>
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-sm text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-16 flex flex-col items-center justify-between border-t border-slate-900/10 pt-8 dark:border-slate-100/10 md:flex-row'>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            © {new Date().getFullYear()} CreatorFlow. All rights reserved.
          </p>
          <div className='mt-4 flex gap-6 md:mt-0'>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href='#'
                className='text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400'
              >
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
    className='fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/10 bg-slate-200/50 text-slate-800 backdrop-blur-xl dark:border-slate-100/10 dark:bg-white/5 dark:text-slate-200'
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
