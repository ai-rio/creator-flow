'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Clock, MapPin, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card } from '../../../components/ui/card';
import { cn } from '../../../utils/cn';

// TypeScript Interfaces
interface DataFacet {
  id: 'bestseller' | 'golden_hour' | 'customers';
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
}

interface ForecastDataPoint {
  name: string;
  forecast: number;
}

interface FP050DataPrismProps {
  className?: string;
}

// Performance-Optimized Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.6,
    },
  },
};

const facetButtonVariants: Variants = {
  idle: {
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
  hover: {
    scale: 1.05,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.95,
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  },
};

const contentTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const heatmapHighlightVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
      duration: 0.5,
      delay: 0.3,
    },
  },
};

// Configuration
const dateFacets: DataFacet[] = [
  { id: 'bestseller', Icon: TrendingUp, title: 'Next Bestseller Prediction' },
  { id: 'golden_hour', Icon: Clock, title: 'Peak Sales Window' },
  { id: 'customers', Icon: MapPin, title: 'Customer Geographic Insights' },
];

const forecastData: ForecastDataPoint[] = [
  { name: 'Aug', forecast: 400 },
  { name: 'Sep', forecast: 450 },
  { name: 'Oct', forecast: 600 },
  { name: 'Nov', forecast: 800 },
  { name: 'Dec', forecast: 1100 },
];

// Generate heatmap data for 7 days × 12 hours
const generateHeatmapData = (): number[] => Array.from({ length: 7 * 12 }, () => Math.random());

// Facet Button Component
const DataFacetButton: React.FC<{
  facet: DataFacet;
  isActive: boolean;
  onClick: () => void;
}> = ({ facet, isActive, onClick }) => {
  const t = useTranslations('components.atomic.organisms.FP050DataPrism');

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors',
        'border border-border/40 bg-background/40 backdrop-blur-md',
        'hover:border-border/60 hover:bg-background/60',
        isActive && 'border-primary/50 bg-primary/10'
      )}
      variants={facetButtonVariants}
      initial='idle'
      whileHover='hover'
      whileTap='tap'
    >
      <facet.Icon className={cn('h-6 w-6 flex-shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
      <span className={cn('font-bold', isActive ? 'text-foreground' : 'text-muted-foreground')}>
        {t(`facets.${facet.id}.title`, { fallback: facet.title })}
      </span>
    </motion.button>
  );
};

// Bestseller Chart Component
const BestsellerChart: React.FC = () => {
  const t = useTranslations('components.atomic.organisms.FP050DataPrism');

  return (
    <div>
      <h3 className='text-xl font-bold text-foreground'>
        {t('insights.bestseller.title', { fallback: 'Demand Forecast: Creator Hoodie' })}
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        {t('insights.bestseller.description', {
          fallback: 'Predictive analysis suggests a 175% increase in demand over the next quarter.',
        })}
      </p>
      <div className='mt-4 h-80 w-full'>
        <ResponsiveContainer>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id='colorForecast' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='hsl(var(--primary))' stopOpacity={0.8} />
                <stop offset='95%' stopColor='hsl(var(--primary))' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='name' stroke='hsl(var(--muted-foreground))' fontSize={12} />
            <YAxis stroke='hsl(var(--muted-foreground))' fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background) / 0.9)',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Area
              type='monotone'
              dataKey='forecast'
              stroke='hsl(var(--primary))'
              strokeWidth={2}
              fill='url(#colorForecast)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Golden Hour Heatmap Component
const GoldenHourHeatmap: React.FC = () => {
  const t = useTranslations('components.atomic.organisms.FP050DataPrism');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heatmapData = generateHeatmapData();

  return (
    <div>
      <h3 className='text-xl font-bold text-foreground'>
        {t('insights.golden_hour.title', { fallback: 'Golden Hour Identified' })}
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        {t('insights.golden_hour.description', {
          fallback: 'Your peak sales activity consistently occurs between 7-9 PM on Thursdays.',
        })}
      </p>
      <div className='mt-4'>
        <div className='flex'>
          <div className='w-10 shrink-0' />
          <div className='grid flex-grow grid-cols-12'>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className='text-center text-xs text-muted-foreground'>
                {i * 2 + 1}h
              </span>
            ))}
          </div>
        </div>
        <div className='mt-1 flex'>
          <div className='flex w-10 shrink-0 flex-col'>
            {days.map((day) => (
              <span key={day} className='flex h-6 items-center text-xs text-muted-foreground'>
                {day}
              </span>
            ))}
          </div>
          <div className='relative grid flex-grow grid-cols-12 grid-rows-7 gap-1'>
            {heatmapData.map((intensity, i) => (
              <div
                key={i}
                className='h-6 w-full rounded'
                style={{
                  backgroundColor: 'hsl(var(--primary))',
                  opacity: intensity,
                }}
              />
            ))}
            {/* Golden Hour Highlight - GPU-accelerated animation */}
            <motion.div
              className='absolute rounded border-2 will-change-transform'
              style={{
                borderColor: 'hsl(var(--primary))',
                boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
                gridRow: '4 / span 1',
                gridColumn: '9 / span 3',
                inset: '0',
                transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
              }}
              variants={heatmapHighlightVariants}
              initial='initial'
              animate='animate'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Customer Insight Component - with optimized animations
const CustomerInsight: React.FC = () => {
  const t = useTranslations('components.atomic.organisms.FP050DataPrism');

  return (
    <div>
      <h3 className='text-xl font-bold text-foreground'>
        {t('insights.customers.title', { fallback: 'New Customer Hotspot' })}
      </h3>
      <p className='mt-1 text-sm text-muted-foreground'>
        {t('insights.customers.description', {
          fallback: 'A significant pocket of new customers has emerged in the Pacific Northwest.',
        })}
      </p>
      <div className='relative mt-4 flex h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-muted/20'>
        <WorldMapIllustration />
        <div className='relative z-10 flex items-center'>
          <motion.div
            className='will-change-transform'
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
            style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
          >
            <MapPin
              size={64}
              className='text-primary'
              style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' }}
            />
          </motion.div>
          <motion.p
            className='ml-4 text-4xl font-black text-foreground'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {t('insights.customers.region', { fallback: 'PNW Region' })}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

// World Map Illustration Component
const WorldMapIllustration: React.FC = () => (
  <svg className='absolute h-full w-full opacity-20' viewBox='0 0 1000 500'>
    <path
      d='M100,250 C150,200 250,150 300,200 S400,300 500,250 S600,150 700,200 S800,300 900,250'
      stroke='hsl(var(--primary))'
      fill='none'
      strokeWidth='2'
    />
    <path
      d='M50,150 C100,100 200,120 250,180 S350,280 450,200 S550,100 650,150 S750,250 850,200'
      stroke='hsl(var(--primary))'
      fill='none'
      strokeWidth='2'
    />
    <path
      d='M200,350 C250,300 350,320 400,380 S500,450 600,380 S700,300 800,350'
      stroke='hsl(var(--primary))'
      fill='none'
      strokeWidth='2'
    />
  </svg>
);

// Main Component with Performance Optimizations
export const FP050DataPrism: React.FC<FP050DataPrismProps> = ({ className }) => {
  const t = useTranslations('components.atomic.organisms.FP050DataPrism');
  const [activeFacet, setActiveFacet] = useState<DataFacet['id']>(dateFacets[0].id);

  const renderActiveInsight = React.useCallback(() => {
    switch (activeFacet) {
      case 'bestseller':
        return <BestsellerChart />;
      case 'golden_hour':
        return <GoldenHourHeatmap />;
      case 'customers':
        return <CustomerInsight />;
      default:
        return <BestsellerChart />;
    }
  }, [activeFacet]);

  return (
    <motion.div
      className={cn('flex min-h-screen w-full flex-col items-center justify-center p-4', className)}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
    >
      {/* Hero Section */}
      <div className='text-center'>
        <motion.h2 className='text-6xl font-black text-foreground md:text-8xl' variants={heroTextVariants}>
          {t('hero.title', { fallback: 'The Oracle of Growth.' })}
        </motion.h2>
        <motion.p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground' variants={heroTextVariants}>
          {t('hero.description', {
            fallback:
              'Our analytics engine deciphers your past to predict your future, revealing the hidden trends that will drive your next wave of growth.',
          })}
        </motion.p>
      </div>

      {/* Interactive Data Prism */}
      <motion.div className='mt-16 w-full max-w-6xl' variants={heroTextVariants}>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Facet Selection */}
          <div className='flex flex-row justify-center gap-4 lg:flex-col lg:justify-start'>
            {dateFacets.map((facet) => (
              <DataFacetButton
                key={facet.id}
                facet={facet}
                isActive={activeFacet === facet.id}
                onClick={() => setActiveFacet(facet.id)}
              />
            ))}
          </div>

          {/* Data Revelation Display */}
          <Card className='relative min-h-[400px] border-border/40 bg-background/40 p-6 backdrop-blur-md lg:col-span-2'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeFacet}
                variants={contentTransitionVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                style={{ transform: 'translate3d(0, 0, 0)' }} // Force GPU acceleration
              >
                {renderActiveInsight()}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FP050DataPrism;
