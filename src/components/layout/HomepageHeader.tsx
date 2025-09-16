'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, Bolt, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const Spark = () => (
  <motion.div
    className='absolute top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-lg shadow-violet-500/50'
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
    href='/'
    className='flex flex-shrink-0 items-center gap-tactical text-heading-md font-bold'
    whileHover='hover'
  >
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -90 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 }}
      variants={{ hover: { scale: 1.2, rotate: 15 } }}
    >
      <Bolt className='h-icon-md w-icon-md text-blue-600 dark:text-blue-400' />
    </motion.div>
    <span className='text-foreground'>CreatorFlow</span>
  </motion.a>
);

const Navigation = ({ isScrolled }: { isScrolled: boolean }) => {
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <div className='hidden items-center gap-command md:flex'>
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex items-center gap-command'
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className='text-body-md font-medium text-muted-foreground transition-colors hover:text-foreground'
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTA = ({ isScrolled }: { isScrolled: boolean }) => {
  // For now, we'll assume unauthenticated since this is client-side
  // In a real implementation, you'd use a client-side auth hook
  const isAuthenticated = false; // TODO: Replace with actual auth state

  return (
    <div className='hidden md:block'>
      <AnimatePresence mode='popLayout'>
        {isScrolled ? (
          <Button
            size='icon'
            className='relative h-icon-lg w-icon-lg rounded-full bg-violet-600 text-white hover:bg-violet-500'
            asChild
          >
            <motion.a
              href={isAuthenticated ? '/dashboard' : '/login'}
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
            className='relative rounded-premium bg-violet-600 px-strategic py-tactical text-body-md font-semibold text-white hover:bg-violet-500'
            asChild
          >
            <motion.a
              href={isAuthenticated ? '/dashboard' : '/login'}
              layoutId='cta-button'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAuthenticated ? 'Dashboard' : 'Start Free Trial'}
            </motion.a>
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileMenuButton = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => (
  <div className='md:hidden'>
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className='flex h-icon-lg w-icon-lg items-center justify-center rounded text-foreground'
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={isOpen ? 'close' : 'menu'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className='h-icon-sm w-icon-sm' /> : <Menu className='h-icon-sm w-icon-sm' />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  </div>
);

export const HomepageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    if (!isMounted) return;

    const isScrollingUp = latest < lastScrollY;
    const isAtTop = latest < 50;
    setIsScrolled(!(isScrollingUp || isAtTop));
    setLastScrollY(latest);
  });

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className='fixed left-tactical right-tactical top-tactical z-50'>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        className='relative mx-auto w-full max-w-7xl overflow-hidden rounded-executive border border-border/20 bg-background/40 shadow-lg backdrop-blur-xl'
      >
        <Spark />
        <motion.div
          animate={{ height: isScrolled ? '60px' : '80px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='flex items-center justify-between px-strategic'
        >
          <Logo />
          <Navigation isScrolled={isScrolled} />
          <div className='flex items-center gap-tactical'>
            <CTA isScrolled={isScrolled} />
            <MobileMenuButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='overflow-hidden border-t border-border/20 md:hidden'
            >
              <div className='flex flex-col gap-tactical p-strategic'>
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className='text-body-md font-medium text-muted-foreground transition-colors hover:text-foreground'
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <Button
                  className='mt-tactical w-full rounded-premium bg-violet-600 text-white hover:bg-violet-500'
                  asChild
                >
                  <motion.a href='/login' whileTap={{ scale: 0.95 }} onClick={() => setIsMobileMenuOpen(false)}>
                    Start Free Trial
                  </motion.a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};
