/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bolt, Instagram, Linkedin, Moon, Sun, Twitter } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Theme Toggle Button Component
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-tactical top-tactical z-modal flex h-12 w-12 items-center justify-center rounded-premium border border-border/10 bg-background/50 text-foreground backdrop-blur-xl'
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
          {theme === 'dark' ? <Sun className='h-icon-md w-icon-md' /> : <Moon className='h-icon-md w-icon-md' />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// Main Footer Component
const Footer = () => {
  const linkSections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Testimonials'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
  ];

  const socialLinks = [
    { Icon: Twitter, label: 'Twitter' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className='relative w-full overflow-hidden bg-background/50'>
      <div className='relative z-10 mx-auto max-w-content px-strategic py-command'>
        {/* Event Horizon Separator */}
        <div className='mb-command h-px w-full bg-gradient-to-r from-transparent via-brand-teal-primary/50 to-transparent' />

        <div className='grid grid-cols-1 gap-command md:grid-cols-5'>
          <div className='md:col-span-2'>
            <a href='#' className='flex items-center gap-tactical text-heading-lg font-bold text-foreground'>
              <Bolt className='h-icon-lg w-icon-lg text-brand-teal-primary' />
              CreatorFlow
            </a>
            <p className='mt-tactical max-w-xs text-body-sm text-muted-foreground'>
              The automated command center for ambitious TikTok Shop creators.
            </p>
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className='font-semibold text-foreground'>{section.title}</h3>
              <ul className='mt-tactical space-y-tactical'>
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-body-sm text-muted-foreground transition-colors hover:text-brand-teal-primary'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-command flex flex-col items-center justify-between border-t border-border pt-strategic md:flex-row'>
          <p className='text-body-sm text-muted-foreground'>
            © {new Date().getFullYear()} CreatorFlow. All rights reserved.
          </p>
          <div className='mt-tactical flex gap-tactical md:mt-0'>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href='#'
                className='text-muted-foreground transition-colors hover:text-brand-teal-primary'
                aria-label={social.label}
              >
                <social.Icon className='h-icon-md w-icon-md' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <div className='h-screen' />
      <Footer />
      <ThemeToggleButton />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
