'use client';

import { AnimatePresence, motion, useSpring, useTransform, type Variants } from 'framer-motion';
import { BadgeDollarSign, Bot, TerminalSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

// --- Types ---
interface Doctrine {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  principle: string;
  proof: Array<{
    value: number;
    unit: string;
    prefix?: boolean;
    label: string;
  }>;
}

// --- Manifesto Data ---
const doctrines: Doctrine[] = [
  {
    id: 'automate',
    Icon: Bot,
    title: 'Automate Everything.',
    principle:
      'Your time is a strategic asset, not an operational expense. We are fundamentally opposed to manual tasks that drain creative energy.',
    proof: [{ value: 12, unit: 'hrs/wk', label: 'Reclaimed for growth' }],
  },
  {
    id: 'defend',
    Icon: BadgeDollarSign,
    title: 'Defend Every Dollar.',
    principle:
      'Profitability at scale is a non-negotiable architectural requirement. Every sale must be a victory, not a liability.',
    proof: [
      { value: 8400, unit: '$', prefix: true, label: 'In oversell losses prevented' },
      { value: 21, unit: '%', label: 'Average profit increase on shipping' },
    ],
  },
  {
    id: 'command',
    Icon: TerminalSquare,
    title: "Command, Don't Manage.",
    principle:
      'Scaling should grant you more control, not more complexity. We transform operational chaos into strategic clarity.',
    proof: [{ value: 1, unit: 'CEO-Grade Interface', label: 'For definitive business intelligence' }],
  },
];

// --- Animated Counter ---
const AnimatedCounter = ({
  value,
  isVisible,
  prefix = false,
  unit,
}: {
  value: number;
  isVisible: boolean;
  prefix?: boolean;
  unit: string;
}) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isVisible) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [spring, value, isVisible]);

  const displayValue = useTransform(spring, (currentValue) => {
    const rounded = Math.round(currentValue);
    if (value < 100) {
      return rounded.toFixed(0);
    }
    return rounded.toLocaleString('en-US', { maximumFractionDigits: 0 });
  });

  return (
    <div className='flex items-baseline'>
      {prefix && <span>{unit}</span>}
      <motion.span>{displayValue}</motion.span>
      {!prefix && <span>{unit}</span>}
    </div>
  );
};

// --- Doctrine Card Component ---
const DoctrineCard = ({
  doctrine,
  isActive,
  onClick,
}: {
  doctrine: Doctrine;
  isActive: boolean;
  onClick: () => void;
}) => {
  const t = useTranslations('components.atomic.organisms.AP020OurMission');
  const isSpecialUnit = doctrine.proof[0].unit.includes(' ');

  const cardVariants: Variants = {
    dormant: { opacity: 0.7, filter: 'blur(2px)', scale: 0.9, y: 20 },
    primed: { opacity: 1, filter: 'blur(0px)', scale: 1.05, y: 10 },
    active: { opacity: 1, filter: 'blur(0px)', scale: 1.1, y: 0 },
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      className='relative min-h-[450px] w-full max-w-sm cursor-pointer will-change-transform'
      variants={cardVariants}
      animate={isActive ? 'active' : 'dormant'}
      whileHover='primed'
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <Card className='h-full border-border bg-card/60 p-8 backdrop-blur-lg transition-shadow duration-500 hover:shadow-lg'>
        <motion.div layout='position' className='flex items-center gap-4'>
          <doctrine.Icon className='h-8 w-8 text-primary' />
          <h2 className='text-2xl font-bold text-foreground'>{t(`doctrines.${doctrine.id}.title`)}</h2>
        </motion.div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className='mt-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
            >
              <p className='text-lg leading-relaxed text-muted-foreground'>{t(`doctrines.${doctrine.id}.principle`)}</p>
              <div className='mt-8 space-y-4'>
                {doctrine.proof.map((p, i) => (
                  <div key={i}>
                    <div className={`font-black text-primary ${isSpecialUnit ? 'text-4xl' : 'text-5xl'}`}>
                      <AnimatedCounter value={p.value} isVisible={isActive} prefix={p.prefix} unit={p.unit} />
                    </div>
                    <p className='mt-1 text-muted-foreground'>{t(`doctrines.${doctrine.id}.proof.${i}.label`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// --- Main Component ---
function AP020OurMissionComponent() {
  const [activeId, setActiveId] = useState(doctrines[1].id);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('components.atomic.organisms.AP020OurMission');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDoctrineClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/10 font-sans antialiased'>
      <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center space-y-8 px-4 py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-center will-change-transform'
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <h1 className='text-5xl font-black text-foreground md:text-7xl'>{t('hero.title')}</h1>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl'>{t('hero.description')}</p>
        </motion.div>

        <div className='flex w-full flex-col items-center justify-center pt-16 md:flex-row md:items-start md:space-x-4'>
          {doctrines.map((doctrine) => (
            <div key={doctrine.id} className='my-4 w-full md:my-0 md:w-1/3'>
              <DoctrineCard
                doctrine={doctrine}
                isActive={activeId === doctrine.id}
                onClick={() => handleDoctrineClick(doctrine.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const AP020OurMission = React.memo(AP020OurMissionComponent);
