'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

// Main Hero Component
const HPHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  } as any;
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as any, stiffness: 100 } },
  } as any;

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <div className='absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[200px]' />

      <motion.div
        className='relative z-10 mx-auto max-w-4xl px-6 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1
          variants={itemVariants}
          className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl'
        >
          Stop Drowning in Orders.
          <br />
          Start Commanding Your Growth.
        </motion.h1>

        <motion.p variants={itemVariants} className='mt-6 text-xl font-semibold text-foreground md:mt-8 md:text-2xl'>
          The All-in-One Platform for Automated Order Processing, Inventory Sync, and Shipping for TikTok Shops.
        </motion.p>

        <motion.p variants={itemVariants} className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
          We turn operational chaos into a CEO-level command center, so you can scale from 50 to 500+ orders a
          day—effortlessly.
        </motion.p>

        <motion.div variants={itemVariants} className='mt-8 md:mt-10'>
          <Button
            className='min-h-12 rounded-lg bg-violet-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:shadow-xl hover:shadow-violet-600/50 md:min-h-14'
            asChild
          >
            <motion.a
              href='#'
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring' as any, stiffness: 300, damping: 20 }}
            >
              Start Your 14-Day Free Trial
            </motion.a>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className='mt-12 md:mt-16'>
          <CommandCenterSnippet />
        </motion.div>
      </motion.div>
    </div>
  );
};

const CommandCenterSnippet = () => (
  <div className='relative rounded-2xl bg-gradient-to-b from-muted/50 to-transparent p-1'>
    <div className='rounded-xl border border-border/20 bg-background/80 p-6 shadow-2xl backdrop-blur-2xl'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-foreground'>Live Operations Overview</h3>
        <div className='flex items-center gap-2 text-sm text-green-500'>
          <motion.div
            className='h-2 w-2 rounded-full bg-current'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span>LIVE</span>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 text-left md:grid-cols-3'>
        <MetricCard Icon={TrendingUp} label='Orders Processed Today' value='1,204' color='text-violet-600' />
        <HeartbeatMetricCard Icon={ShieldCheck} label='Automation Savings' value='$4,567' color='text-green-500' />
        <MetricCard Icon={CheckCircle} label='Inventory Sync' value='99.98%' color='text-blue-600' />
      </div>
      <div className='relative mt-6 h-24'>
        <AnimatedLineGraph />
      </div>
    </div>
  </div>
);

const MetricCard = ({ Icon, label, value, color }: any) => (
  <div>
    <div className='flex items-center gap-2'>
      <Icon className={`h-5 w-5 ${color}`} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </div>
    <p className='mt-1 text-2xl font-bold text-foreground'>{value}</p>
  </div>
);

const HeartbeatMetricCard = ({ Icon, label, value, color }: any) => (
  <motion.div
    animate={{ scale: [1, 1.01, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    className='rounded-lg p-2'
    style={{
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(74, 222, 128, 0.1), transparent 70%)',
    }}
  >
    <div className='flex items-center gap-2'>
      <Icon className={`h-5 w-5 ${color}`} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </div>
    <motion.p
      className='mt-1 text-2xl font-bold text-foreground'
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
    >
      {value}
    </motion.p>
  </motion.div>
);

const AnimatedLineGraph = () => (
  <svg width='100%' height='100%' viewBox='0 0 300 100' preserveAspectRatio='none'>
    <defs>
      <linearGradient id='line-gradient' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0%' stopColor='rgba(59, 130, 246, 1)' />
        <stop offset='100%' stopColor='rgba(20, 184, 166, 1)' />
      </linearGradient>
      <linearGradient id='area-gradient' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='rgba(59, 130, 246, 0.2)' />
        <stop offset='100%' stopColor='rgba(59, 130, 246, 0)' />
      </linearGradient>
    </defs>
    <motion.path
      d='M 0 80 Q 50 20, 100 60 T 200 40 T 300 70'
      fill='none'
      stroke='url(#line-gradient)'
      strokeWidth='2'
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
    />
    <motion.path
      d='M 0 100 L 0 80 Q 50 20, 100 60 T 200 40 T 300 70 L 300 100 Z'
      fill='url(#area-gradient)'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    />
  </svg>
);

export default HPHero;
