/* eslint-disable */
'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, Bolt } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

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

// Main Header Variant Component
const HPHeaderVariant = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest: any) => {
    setIsScrolled(latest > 50);
  });

  return (
    <header className='fixed left-tactical right-tactical top-tactical z-header'>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        className='relative mx-auto w-full max-w-content overflow-hidden rounded-premium border border-border/20 bg-background/40 shadow-lg backdrop-blur-xl'
      >
        <Spark />
        <motion.div
          animate={{ height: isScrolled ? '60px' : '80px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='flex items-center justify-between px-tactical'
        >
          <Logo />
          <Navigation isScrolled={isScrolled} />
          <CTA isScrolled={isScrolled} />
        </motion.div>
      </motion.div>
    </header>
  );
};

// Header Sub-Components
const Spark = () => (
  <motion.div
    className='absolute top-0 h-[2px] bg-brand-teal-primary shadow-lg shadow-brand-teal-primary/50'
    initial={{ x: '-150%', width: '50%' }}
    animate={{ x: '150%', width: '150%' }}
    transition={{
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 5,
      repeatType: 'loop',
    }}
  />
);

const Logo = () => (
  <motion.a
    href='#'
    className='flex flex-shrink-0 items-center gap-tactical text-heading-lg font-bold'
    whileHover='hover'
  >
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -90 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 }}
      variants={{ hover: { scale: 1.2, rotate: 15 } }}
    >
      <Bolt className='h-icon-md w-icon-md text-brand-teal-primary' />
    </motion.div>
    <span className='text-foreground'>CreatorFlow</span>
  </motion.a>
);

const Navigation: React.FC<any> = ({ isScrolled }: any) => {
  const navLinks = ['Features', 'Pricing', 'Testimonials'];
  return (
    <div className='hidden items-center gap-strategic md:flex'>
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex items-center gap-strategic'
          >
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href='#'
                className='text-body-md font-medium text-muted-foreground transition-colors hover:text-foreground'
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTA = ({ isScrolled }: any) => (
  <div className='hidden md:block'>
    <AnimatePresence mode='popLayout'>
      {isScrolled ? (
        <Button
          size='icon'
          className='bg-brand-purple-primary hover:bg-brand-purple-secondary relative h-9 w-9 rounded-full text-white'
          asChild
        >
          <motion.a
            href='#'
            layoutId='cta-button'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className='h-icon-sm w-icon-sm' />
          </motion.a>
        </Button>
      ) : (
        <Button
          className='bg-brand-purple-primary hover:bg-brand-purple-secondary relative rounded-premium px-tactical py-tactical text-body-md font-semibold text-white'
          asChild
        >
          <motion.a
            href='#'
            layoutId='cta-button'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.a>
        </Button>
      )}
    </AnimatePresence>
  </div>
);

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background'>
      <HPHeaderVariant />
      {/* Demo content for scroll testing */}
      <main className='relative z-0 px-tactical pb-executive pt-48'>
        <div className='mx-auto max-w-hero space-y-command'>
          <h1 className='text-center text-display-md font-black text-foreground'>Scroll to see header animation</h1>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='h-48 w-full rounded-executive border border-border/20 bg-card/50' />
          ))}
        </div>
      </main>
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
