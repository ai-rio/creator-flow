'use client';

import { AnimatePresence, motion, useInView, type Variants } from 'framer-motion';
import { AlertTriangle, Clock, Package, TrendingUp, Users, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// TypeScript Interfaces
interface ThemeConfig {
  background: string;
  textPrimary: string;
  textSecondary: string;
  chaosColor: string;
  stressColor: string;
  overflowColor: string;
  streamColors: string[];
}

interface FP010ScalingChallengesProps {
  className?: string;
}

interface PainPoint {
  id: 'orders' | 'inventory' | 'shipping' | 'time' | 'customers' | 'stress';
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  severity: 'high' | 'critical' | 'breaking';
}

// Configuration & Data
const painPoints: PainPoint[] = [
  { id: 'orders', Icon: Package, title: 'Order Overflow', severity: 'critical' },
  { id: 'inventory', Icon: AlertTriangle, title: 'Stock Chaos', severity: 'breaking' },
  { id: 'shipping', Icon: Clock, title: 'Shipping Delays', severity: 'high' },
  { id: 'time', Icon: Zap, title: 'Time Burnout', severity: 'breaking' },
  { id: 'customers', Icon: Users, title: 'Angry Customers', severity: 'critical' },
  { id: 'stress', Icon: TrendingUp, title: 'Viral Overwhelm', severity: 'breaking' },
];

// System design token integration
const systemTheme: ThemeConfig = {
  background: 'hsl(var(--background))',
  textPrimary: 'text-foreground',
  textSecondary: 'text-muted-foreground',
  chaosColor: 'hsl(var(--destructive))',
  stressColor: 'hsl(var(--orange))',
  overflowColor: 'hsl(var(--yellow))',
  streamColors: ['hsl(var(--destructive))', 'hsl(var(--orange))', 'hsl(var(--yellow))', 'hsl(var(--red))'],
};

// Deterministic particle positions to prevent hydration mismatch
const CHAOS_PARTICLE_POSITIONS = [
  { left: '15%', top: '20%', colorIndex: 0 },
  { left: '75%', top: '35%', colorIndex: 1 },
  { left: '45%', top: '60%', colorIndex: 2 },
  { left: '80%', top: '75%', colorIndex: 3 },
  { left: '25%', top: '45%', colorIndex: 0 },
  { left: '90%', top: '15%', colorIndex: 1 },
  { left: '10%', top: '80%', colorIndex: 2 },
  { left: '65%', top: '25%', colorIndex: 3 },
  { left: '35%', top: '85%', colorIndex: 0 },
  { left: '85%', top: '50%', colorIndex: 1 },
  { left: '5%', top: '55%', colorIndex: 2 },
  { left: '55%', top: '10%', colorIndex: 3 },
  { left: '20%', top: '70%', colorIndex: 0 },
  { left: '70%', top: '90%', colorIndex: 1 },
  { left: '40%', top: '30%', colorIndex: 2 },
  { left: '95%', top: '65%', colorIndex: 3 },
  { left: '30%', top: '15%', colorIndex: 0 },
  { left: '60%', top: '80%', colorIndex: 1 },
  { left: '50%', top: '40%', colorIndex: 2 },
  { left: '12%', top: '95%', colorIndex: 3 },
];

// Deterministic stress line positions
const STRESS_LINE_POSITIONS = [
  { width: '30%', left: '10%', top: '20%', rotation: 15 },
  { width: '45%', left: '40%', top: '60%', rotation: 75 },
  { width: '25%', left: '70%', top: '30%', rotation: 120 },
  { width: '35%', left: '15%', top: '80%', rotation: 45 },
  { width: '40%', left: '60%', top: '15%', rotation: 90 },
  { width: '20%', left: '30%', top: '70%', rotation: 160 },
  { width: '50%', left: '80%', top: '50%', rotation: 30 },
  { width: '30%', left: '5%', top: '40%', rotation: 105 },
];

// Advanced motion variants
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const painPointVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const breakdownVariants: Variants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  breakdown: {
    rotate: [0, -2, 2, -2, 2, 0],
    scale: [1, 1.02, 0.98, 1.02, 0.98, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// Main Component
export default function FP010ScalingChallenges({ className = '' }: FP010ScalingChallengesProps) {
  const t = useTranslations('components.atomic.organisms.FP010ScalingChallenges');
  const [state, setState] = useState<'idle' | 'breakdown' | 'overwhelmed'>('idle');
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: '-100px' });

  const handleBreakdown = useCallback(() => {
    setState('breakdown');
    setTimeout(() => setState('overwhelmed'), 3000);
  }, []);

  const handleReset = useCallback(() => {
    setState('idle');
    setSelectedPainPoint(null);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300';
      case 'breaking':
        return 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300';
      case 'high':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div
      className={`relative flex min-h-[800px] w-full flex-col items-center justify-center bg-background p-4 lg:p-8 ${className}`}
      ref={heroRef}
    >
      {/* Background Chaos Visualization */}
      <div className='absolute inset-0 z-0 h-full w-full overflow-hidden'>
        <ChaosVisualization state={state} theme={systemTheme} />
      </div>

      {/* Hero Content */}
      <motion.div
        className='relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center text-center'
        variants={containerVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Title and Description */}
        <motion.div variants={heroTextVariants} className='mb-8'>
          <h2
            className={`text-4xl font-black md:text-6xl lg:text-7xl ${systemTheme.textPrimary} mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent`}
          >
            {t('title')}
          </h2>
          <p className={`mx-auto max-w-3xl text-lg md:text-xl ${systemTheme.textSecondary} leading-relaxed`}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Scaling Breakdown Metrics */}
        <motion.div variants={heroTextVariants} className='mb-12 grid grid-cols-2 gap-4 md:grid-cols-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-600 md:text-3xl'>50+</div>
            <div className='text-sm text-muted-foreground'>{t('metrics.ordersPerDay')}</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-orange-600 md:text-3xl'>16hr</div>
            <div className='text-sm text-muted-foreground'>{t('metrics.workDays')}</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-600 md:text-3xl'>40%</div>
            <div className='text-sm text-muted-foreground'>{t('metrics.errorRate')}</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-600 md:text-3xl'>$0</div>
            <div className='text-sm text-muted-foreground'>{t('metrics.timeForGrowth')}</div>
          </div>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div variants={heroTextVariants} className='mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
          {painPoints.map((painPoint, index) => (
            <motion.div
              key={painPoint.id}
              variants={painPointVariants}
              whileHover='hover'
              animate={state === 'breakdown' ? 'breakdown' : 'visible'}
              onHoverStart={() => setSelectedPainPoint(painPoint.id)}
              onHoverEnd={() => setSelectedPainPoint(null)}
              className='cursor-pointer'
            >
              <Card
                className={`border-2 p-4 transition-all duration-300 ${getSeverityColor(painPoint.severity)} ${
                  selectedPainPoint === painPoint.id ? 'shadow-lg' : ''
                }`}
              >
                <div className='flex flex-col items-center text-center'>
                  <painPoint.Icon className='mb-2 h-8 w-8' />
                  <div className='text-sm font-semibold'>{t(`painPoints.${painPoint.id}.title`)}</div>
                  <div className='mt-1 text-xs opacity-75'>{t(`painPoints.${painPoint.id}.impact`)}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pain Point Details */}
        <AnimatePresence mode='wait'>
          {selectedPainPoint && (
            <motion.div
              key={selectedPainPoint}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='mb-8 max-w-2xl'
            >
              <Card className='border-2 border-primary/20 bg-card/80 p-6 backdrop-blur-sm'>
                <h3 className='mb-3 text-xl font-bold text-foreground'>{t(`painPoints.${selectedPainPoint}.title`)}</h3>
                <p className='mb-4 text-muted-foreground'>{t(`painPoints.${selectedPainPoint}.description`)}</p>
                <div className='flex items-center gap-2 text-sm'>
                  <AlertTriangle className='h-4 w-4 text-red-500' />
                  <span className='font-medium text-red-600'>{t(`painPoints.${selectedPainPoint}.consequence`)}</span>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Demonstration */}
        <motion.div className='relative z-20' variants={heroTextVariants}>
          <AnimatePresence mode='wait'>
            {state === 'idle' && (
              <motion.div
                key='demonstrate'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className='text-center'
              >
                <p className='mb-4 text-muted-foreground'>{t('demo.description')}</p>
                <Button
                  onClick={handleBreakdown}
                  size='lg'
                  variant='destructive'
                  className='px-8 py-4 text-lg font-bold'
                >
                  {t('buttons.demonstrateBreakdown')}
                </Button>
              </motion.div>
            )}
            {state === 'breakdown' && (
              <motion.div
                key='breaking'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className='text-center'
              >
                <div className='mb-4 flex items-center justify-center'>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <AlertTriangle className='h-8 w-8 text-red-500' />
                  </motion.div>
                </div>
                <p className='text-lg font-semibold text-red-600'>{t('demo.breakingDown')}</p>
              </motion.div>
            )}
            {state === 'overwhelmed' && (
              <motion.div
                key='solution'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className='text-center'
              >
                <h3 className='mb-4 text-2xl font-bold text-foreground'>{t('solution.title')}</h3>
                <p className='mb-6 max-w-xl text-muted-foreground'>{t('solution.description')}</p>
                <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                  <Button
                    size='lg'
                    className='bg-gradient-to-r from-green-600 to-blue-600 px-8 py-4 text-lg font-bold hover:from-green-700 hover:to-blue-700'
                  >
                    {t('buttons.seeAutomation')}
                  </Button>
                  <Button onClick={handleReset} size='lg' variant='outline' className='px-8 py-4 text-lg font-bold'>
                    {t('buttons.reset')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Chaos Visualization Component - Fixed for hydration safety
function ChaosVisualization({ state, theme }: { state: 'idle' | 'breakdown' | 'overwhelmed'; theme: ThemeConfig }) {
  return (
    <motion.div
      className='pointer-events-none absolute inset-0 h-full w-full'
      animate={{
        opacity: state === 'idle' ? 0.1 : state === 'breakdown' ? 0.3 : 0.2,
      }}
      transition={{ duration: 1 }}
    >
      {/* Chaos particles with deterministic positioning */}
      {CHAOS_PARTICLE_POSITIONS.map((particle, i) => (
        <motion.div
          key={`chaos-${i}`}
          className='absolute h-2 w-2 rounded-full'
          style={{
            backgroundColor: theme.streamColors[particle.colorIndex],
            left: particle.left,
            top: particle.top,
          }}
          animate={
            state === 'breakdown'
              ? {
                  x: [0, ((i % 3) - 1) * 100, ((i % 5) - 2) * 80, 0],
                  y: [0, ((i % 4) - 1.5) * 120, ((i % 6) - 2.5) * 90, 0],
                  scale: [1, 1.5, 0.5, 1],
                  opacity: [0.5, 1, 0.3, 0.5],
                }
              : {}
          }
          transition={{
            duration: 2 + (i % 3) * 0.5, // Deterministic duration variation
            repeat: state === 'breakdown' ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Stress lines with deterministic positioning */}
      {state !== 'idle' &&
        STRESS_LINE_POSITIONS.map((line, i) => (
          <motion.div
            key={`stress-${i}`}
            className='absolute h-px opacity-30'
            style={{
              backgroundColor: theme.chaosColor,
              width: line.width,
              left: line.left,
              top: line.top,
              transform: `rotate(${line.rotation}deg)`,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
    </motion.div>
  );
}
