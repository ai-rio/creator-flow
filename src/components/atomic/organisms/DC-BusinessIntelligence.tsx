'use client';

import { motion } from 'framer-motion';
import { Clapperboard, DollarSign, Package, Palette, Truck } from 'lucide-react';
import * as React from 'react';

// --- BASE COMPONENT: GlassPane ---
const GlassPane = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/50 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- HELPER COMPONENT: SymphonyCard ---
interface SymphonyCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  primaryMetric: string;
  secondaryMetric: string;
  colorClass: string;
}

const SymphonyCard: React.FC<SymphonyCardProps> = ({
  icon,
  title,
  subtitle,
  primaryMetric,
  secondaryMetric,
  colorClass,
}) => (
  <GlassPane className='flex flex-col justify-between p-4'>
    <div>
      <div className={`mb-2 flex items-center gap-3`}>
        <div className={colorClass}>{icon}</div>
        <h3 className='font-bold text-foreground'>{title}</h3>
      </div>
      <p className='mb-4 text-sm font-semibold text-foreground/70'>{subtitle}</p>
    </div>
    <div>
      <p className='text-3xl font-bold text-foreground'>{primaryMetric}</p>
      <p className={`text-sm font-semibold ${colorClass}`}>{secondaryMetric}</p>
    </div>
  </GlassPane>
);

// --- MAIN COMPONENT: CrossSystemMasterpieceCard ---
interface MasterpieceData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  primaryMetric: string;
  secondaryMetric: string;
  colorClass: string;
}

export const CrossSystemMasterpieceCard: React.FC = () => {
  const masterpieceData: MasterpieceData[] = [
    {
      icon: <DollarSign />,
      title: 'Revenue',
      subtitle: 'Symphony',
      primaryMetric: '$12,847',
      secondaryMetric: '+23% growth',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: <Package />,
      title: 'Inventory',
      subtitle: 'Orchestra',
      primaryMetric: '98% auto-sync',
      secondaryMetric: '3.2s latency',
      colorClass: 'text-purple-700 dark:text-purple-400',
    },
    {
      icon: <Truck />,
      title: 'Shipping',
      subtitle: 'Liberation',
      primaryMetric: '$1.2K saved',
      secondaryMetric: '96% automated',
      colorClass: 'text-blue-700 dark:text-blue-500',
    },
    {
      icon: <Clapperboard />,
      title: 'TikTok',
      subtitle: 'Viral Engine',
      primaryMetric: '+347 orders',
      secondaryMetric: 'viral impact',
      colorClass: 'text-pink-600 dark:text-pink-500',
    },
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as any, staggerChildren: 0.1 } },
      }}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <div className='flex items-center gap-3 px-2'>
        <Palette className='text-primary' />
        <h2 className='text-xl font-bold text-foreground'>Cross-System Business Intelligence Masterpiece</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {masterpieceData.map((data, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SymphonyCard {...data} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CrossSystemMasterpieceCard;
