'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Home, Layers, Mail, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Types
interface RecalibrationOption {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  subtitleKey: string;
  href: string;
}

interface TP404NotFoundProps {
  className?: string;
}

// Recalibration Options Configuration
const recalibrationOptions: RecalibrationOption[] = [
  {
    id: 'home',
    Icon: Home,
    titleKey: 'options.home.title',
    subtitleKey: 'options.home.subtitle',
    href: '/',
  },
  {
    id: 'features',
    Icon: Layers,
    titleKey: 'options.features.title',
    subtitleKey: 'options.features.subtitle',
    href: '/features',
  },
  {
    id: 'contact',
    Icon: Mail,
    titleKey: 'options.contact.title',
    subtitleKey: 'options.contact.subtitle',
    href: '/contact',
  },
];

// Theme Toggle Component
const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-xl'
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
};

// Main Component
export const TP404NotFound: React.FC<TP404NotFoundProps> = ({ className }) => {
  const t = useTranslations('components.atomic.organisms.TP404NotFound');

  return (
    <div
      className={`flex min-h-screen items-center justify-center overflow-hidden p-4 font-sans antialiased ${className}`}
    >
      <ThemeToggleButton />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className='relative w-full max-w-3xl bg-card/80 p-8 text-center backdrop-blur-xl md:p-12'>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10'
          >
            <AlertTriangle className='text-primary' size={48} />
          </motion.div>

          <h1 className='text-4xl font-black text-primary md:text-5xl'>{t('title')}</h1>

          <p className='mx-auto mt-4 max-w-xl text-lg text-muted-foreground'>{t('description')}</p>

          <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
            {recalibrationOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <Link href={option.href}>
                  <Card className='cursor-pointer p-6 text-left transition-colors duration-300 hover:bg-accent/50'>
                    <option.Icon className='mb-3 h-8 w-8 text-primary' />
                    <h3 className='text-lg font-bold text-foreground'>{t(option.titleKey)}</h3>
                    <p className='text-sm text-muted-foreground'>{t(option.subtitleKey)}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default TP404NotFound;
