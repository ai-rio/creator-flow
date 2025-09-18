'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';

/**
 * HOMEPAGE HERO SECTION
 *
 * Extracted from HP-020-Hero mock - clean, focused hero component
 * for the actual CreatorFlow homepage.
 *
 * UPDATED: Now uses CreatorFlow theme system with proper theme awareness
 */
export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  } as any;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as any, stiffness: 100 } },
  } as any;

  return (
    <section className='relative -mx-4 flex min-h-screen w-screen items-center justify-center overflow-hidden bg-background pb-16 pt-24 transition-colors duration-300'>
      {/* Subtle grid pattern background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20' />
      {/* Subtle glow */}
      <div className='absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]' />

      <motion.div
        className='relative z-10 w-full px-8 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1
          variants={itemVariants}
          className='text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl'
        >
          Scale Your TikTok Shop
          <br />
          <span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
            From Chaos to Command
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className='mx-auto mt-8 max-w-3xl text-xl text-muted-foreground md:text-2xl'>
          The only fulfillment automation platform built for viral TikTok creators.
          <br />
          Transform 50 orders into 500+ without breaking a sweat.
        </motion.p>

        <motion.div variants={itemVariants} className='mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center'>
          <motion.button
            className='rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90'
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring' as any, stiffness: 300, damping: 20 }}
          >
            Start Building
          </motion.button>
          <motion.button
            className='rounded-lg border border-border bg-transparent px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-accent'
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring' as any, stiffness: 300, damping: 20 }}
          >
            Request a demo
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className='mt-16'>
          <CommandCenterSnippet />
        </motion.div>
      </motion.div>
    </section>
  );
}

const CommandCenterSnippet = () => (
  <div className='relative rounded-xl bg-gradient-to-b from-muted/50 to-transparent p-1'>
    <div className='rounded-[11px] border border-border bg-card/80 p-6 shadow-2xl backdrop-blur-2xl'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='font-semibold text-card-foreground'>Live Operations Overview</h3>
        <div className='flex items-center gap-2 text-xs text-green-600 dark:text-green-400'>
          <motion.div
            className='h-2 w-2 rounded-full bg-current'
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span>LIVE</span>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 text-left md:grid-cols-3'>
        <MetricCard
          Icon={TrendingUp}
          label='Orders Processed Today'
          value='1,204'
          color='text-blue-600 dark:text-blue-400'
        />
        <HeartbeatMetricCard
          Icon={ShieldCheck}
          label='Automation Savings'
          value='$4,567'
          color='text-green-600 dark:text-green-400'
        />
        <MetricCard
          Icon={CheckCircle}
          label='Inventory Sync'
          value='99.98%'
          color='text-purple-600 dark:text-purple-400'
        />
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
      <Icon className={`h-4 w-4 ${color}`} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </div>
    <p className='mt-1 text-3xl font-bold text-card-foreground'>{value}</p>
  </div>
);

const HeartbeatMetricCard = ({ Icon, label, value, color }: any) => (
  <motion.div
    animate={{ scale: [1, 1.01, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    className='rounded-lg p-1'
    style={{
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(74, 222, 128, 0.1), transparent 70%)',
    }}
  >
    <div className='flex items-center gap-2'>
      <Icon className={`h-4 w-4 ${color}`} />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </div>
    <motion.p
      className='mt-1 text-3xl font-bold text-card-foreground'
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
