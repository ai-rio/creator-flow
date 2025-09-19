'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useState } from 'react';

import { Card } from '../../../components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { cn } from '../../../utils/cn';

// TypeScript Interfaces
interface InventoryItem {
  id: string;
  name: string;
}

interface Pod {
  id: 'at_risk' | 'opportunity' | 'secure';
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  colorClass: string;
  colorValue: string;
}

interface FP030DigitalTwinCommandProps {
  className?: string;
}

// Configuration
const inventory: Record<string, InventoryItem[]> = {
  secure: Array.from({ length: 8 }, (_, i) => ({
    id: `hoodie-${i}`,
    name: 'Creator Hoodie',
  })),
  opportunity: Array.from({ length: 4 }, (_, i) => ({
    id: `mug-${i}`,
    name: 'Creator Mug',
  })),
  at_risk: [
    { id: 'cap-1', name: 'Limited Edition Cap' },
    { id: 'shirt-1', name: 'Viral T-Shirt' },
  ],
};

const pods: Pod[] = [
  {
    id: 'at_risk',
    Icon: AlertTriangle,
    title: 'At Risk',
    colorClass: 'text-red-500 dark:text-red-400',
    colorValue: '#ef4444',
  },
  {
    id: 'opportunity',
    Icon: TrendingUp,
    title: 'Opportunity',
    colorClass: 'text-purple-500 dark:text-purple-400',
    colorValue: '#8b5cf6',
  },
  {
    id: 'secure',
    Icon: Package,
    title: 'Secure Stock',
    colorClass: 'text-teal-500 dark:text-teal-400',
    colorValue: '#14b8a6',
  },
];

// Core Data Visualization Component
const DataCore: React.FC<{ activePod: string | null }> = ({ activePod }) => {
  const activePodData = activePod ? pods.find((p) => p.id === activePod) : null;
  const coreColor = activePodData?.colorValue || '#14b8a6';

  return (
    <div className='col-span-1 col-start-2 row-span-2 flex items-center justify-center'>
      <motion.div
        className='relative h-48 w-48 md:h-64 md:w-64'
        animate={{ scale: activePod ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Outer ring */}
        <motion.div className='absolute inset-0 rounded-full border-2 opacity-30' style={{ borderColor: coreColor }} />

        {/* Rotating middle ring */}
        <motion.div
          className='absolute inset-2 rounded-full border-2 opacity-40'
          style={{ borderColor: coreColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Counter-rotating inner ring */}
        <motion.div
          className='absolute inset-4 rounded-full border-2 opacity-50'
          style={{ borderColor: coreColor }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Pulsing core */}
        <motion.div
          className='absolute inset-8 rounded-full'
          style={{
            background: `radial-gradient(circle, ${coreColor} 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

// Strategic Pod Component
const StrategicPod: React.FC<{
  pod: Pod;
  setActivePod: (id: string | null) => void;
}> = ({ pod, setActivePod }) => {
  const t = useTranslations('components.atomic.organisms.FP030DigitalTwinCommand');

  return (
    <motion.div
      className={cn(
        'flex items-center justify-center',
        pod.id === 'at_risk' && 'col-start-1 row-start-1',
        pod.id === 'opportunity' && 'col-start-3 row-start-1',
        pod.id === 'secure' ? 'col-span-3 col-start-1 row-start-2' : 'col-span-1'
      )}
      onHoverStart={() => setActivePod(pod.id)}
    >
      <Card
        className={cn(
          'relative flex h-32 w-full max-w-xs items-center justify-center gap-4 p-6',
          'border-border/40 bg-background/40 backdrop-blur-md',
          'transition-all duration-300 hover:border-border/60'
        )}
      >
        <pod.Icon className={cn('h-8 w-8', pod.colorClass)} />
        <div>
          <h3 className='text-xl font-bold text-foreground'>{t(`pods.${pod.id}.title`)}</h3>
          <p className='text-muted-foreground'>
            {inventory[pod.id].length} {t('pods.itemsLabel')}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

// Briefing Tooltip Component
const BriefingTooltip: React.FC<{ activePod: string | null }> = ({ activePod }) => {
  const t = useTranslations('components.atomic.organisms.FP030DigitalTwinCommand');
  const podData = activePod ? pods.find((p) => p.id === activePod) : null;
  const items = activePod ? inventory[activePod] : [];

  const position = {
    at_risk: { top: '50%', left: '0%', transform: 'translateY(-50%)' },
    opportunity: { top: '50%', right: '0%', transform: 'translateY(-50%)' },
    secure: { bottom: '100%', left: '50%', transform: 'translate(-50%, -20px)' },
  };

  if (!activePod || !podData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={position[activePod as keyof typeof position]}
        className='absolute z-10 w-64'
      >
        <Card className='border-border/40 bg-background/90 backdrop-blur-md'>
          <div className='border-b p-4' style={{ borderColor: podData.colorValue }}>
            <h4 className='font-bold' style={{ color: podData.colorValue }}>
              {t(`briefing.${activePod}.title`)}
            </h4>
          </div>
          <div className='max-h-48 overflow-y-auto p-4'>
            <ul className='space-y-2'>
              {items.map((item) => (
                <li key={item.id} className='text-sm text-muted-foreground'>
                  {t(`items.${item.id}`, { fallback: item.name })}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Component
export const FP030DigitalTwinCommand: React.FC<FP030DigitalTwinCommandProps> = ({ className }) => {
  const t = useTranslations('components.atomic.organisms.FP030DigitalTwinCommand');
  const [activePod, setActivePod] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className={cn('flex min-h-screen w-full flex-col items-center justify-center p-4', className)}>
        {/* Hero Section */}
        <div className='text-center'>
          <motion.h2
            className='text-6xl font-black text-foreground md:text-8xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h2>
          <motion.p
            className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.description')}
          </motion.p>
        </div>

        {/* Interactive Grid */}
        <motion.div
          className='relative mt-16 grid h-[500px] w-full max-w-5xl grid-cols-3 grid-rows-2 gap-8'
          onMouseLeave={() => setActivePod(null)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <DataCore activePod={activePod} />
          {pods.map((pod) => (
            <StrategicPod key={pod.id} pod={pod} setActivePod={setActivePod} />
          ))}
          <BriefingTooltip activePod={activePod} />
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default FP030DigitalTwinCommand;
