'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import { type Principle, principles } from '@/data/about/principles';

// --- Sub-Components ---
const ArchitectPrism = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className='relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-border bg-card/60 backdrop-blur-lg'
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    style={{ transform: 'translate3d(0, 0, 0)' }}
  >
    <motion.div
      className='absolute h-full w-full rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-50'
      animate={{ rotate: -720 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className='h-12 w-12 will-change-transform'
      animate={{ scale: isHovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <motion.path
          d='M50 2 L98 50 L50 98 L2 50 Z'
          stroke='hsl(var(--primary))'
          strokeWidth='4'
          animate={{ scale: [1, 1.05, 1], rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d='M25 25 L75 25 L75 75 L25 75 Z'
          stroke='hsl(var(--primary))'
          strokeWidth='2'
          animate={{ scale: [1, 0.95, 1], rotate: isHovered ? -45 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

const PrincipleNode = ({ principle, onHoverStart }: { principle: Principle; onHoverStart: () => void }) => {
  const { angle, distance } = principle.position;
  const x = Math.cos((angle * Math.PI) / 180) * (distance * 0.6);
  const y = Math.sin((angle * Math.PI) / 180) * (distance * 0.6);

  return (
    <motion.div
      className='absolute will-change-transform'
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      onHoverStart={onHoverStart}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm'
      >
        <principle.Icon className='h-4 w-4 text-primary' />
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
function AP010HeroComponent() {
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const t = useTranslations('components.atomic.organisms.AP010Hero');

  useEffect(() => {
    setMounted(true);
  }, []);

  const activePrincipleData = principles.find((p) => p.id === activePrinciple);

  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
    setActivePrinciple(null);
  }, []);

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/50 p-8 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className='mb-8 will-change-transform'
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        <h1 className='mb-2 text-3xl font-black text-primary md:text-4xl'>{t('title')}</h1>
        <p className='mx-auto mt-2 max-w-md text-sm text-muted-foreground md:text-base'>{t('subtitle')}</p>
      </motion.div>

      <div
        className='relative flex h-64 w-64 items-center justify-center'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className='bg-gradient-radial absolute inset-0 rounded-full from-primary/20 via-transparent to-transparent will-change-transform'
          style={{ transform: 'translate3d(0, 0, 0)' }}
          animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <ArchitectPrism isHovered={isHovered} />

        <AnimatePresence>
          {isHovered &&
            principles.map((principle) => (
              <PrincipleNode
                key={principle.id}
                principle={principle}
                onHoverStart={() => setActivePrinciple(principle.id)}
              />
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {activePrincipleData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='pointer-events-none absolute z-20 w-48'
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <Card className='border border-border bg-card/80 p-3 text-left backdrop-blur-md'>
                <div className='flex items-center gap-2'>
                  <activePrincipleData.Icon className='h-4 w-4 text-primary' />
                  <h3 className='text-sm font-bold text-primary'>{t(`principles.${activePrincipleData.id}.title`)}</h3>
                </div>
                <p className='mt-1 text-xs text-muted-foreground'>
                  {t(`principles.${activePrincipleData.id}.description`)}
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const AP010Hero = React.memo(AP010HeroComponent);
