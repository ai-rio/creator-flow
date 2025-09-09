import { AnimatePresence, motion } from 'framer-motion';
import { Bolt, CheckCircle, Menu, Moon, ShieldCheck, Sun, TrendingUp, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

// --- TypeScript Interfaces ---

// --- Main Homepage Component ---
export default function CreatorFlowHomepage(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className='bg-slate-100 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0A090F] dark:text-slate-100'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap'); body { font-family: 'Inter', sans-serif; }`}</style>

      <HP010Header />
      <main>
        <HP020Hero />
        {/* Placeholder for next components to show scrolling effect */}
        <div className='h-screen'></div>
      </main>
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

// --- HP-010-Header Component ---
const HP010Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navLinks = ['Features', 'Pricing', 'Testimonials'];

  return (
    <header className='fixed left-4 right-4 top-4 z-50'>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        className='mx-auto w-full max-w-6xl rounded-lg border border-slate-900/10 bg-slate-200/50 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-black/20 dark:shadow-blue-500/15'
      >
        <div className='flex items-center justify-between px-6 py-3'>
          <motion.a
            href='#'
            className='flex items-center gap-2 text-xl font-bold'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bolt className='h-6 w-6 text-blue-600 dark:text-blue-400' />
            <span className='text-slate-900 dark:text-slate-100'>CreatorFlow</span>
          </motion.a>
          <div className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href='#'
                className='text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          <motion.button
            className='hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:block'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Start Free Trial
          </motion.button>
          <div className='md:hidden'>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='rounded-md p-2 text-slate-800 dark:text-slate-200'
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className='overflow-hidden md:hidden'
            >
              <div className='flex flex-col gap-4 border-t border-slate-900/10 p-4 dark:border-slate-100/10'>
                {navLinks.map((link) => (
                  <a key={link} href='#' className='text-base font-medium text-slate-700 dark:text-slate-300'>
                    {link}
                  </a>
                ))}
                <motion.button
                  className='w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

// --- HP-020-Hero Component (REVISED) ---
const HP020Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  } as any;
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as any, stiffness: 100 } },
  } as any;

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
      <div className='absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[200px] dark:bg-blue-500/5' />

      <motion.div
        className='relative z-10 mx-auto max-w-4xl px-4 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h1
          variants={itemVariants}
          className='bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-slate-400 md:text-6xl'
        >
          Stop Drowning in Orders.
          <br />
          Start Commanding Your Growth.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='mt-6 text-lg font-semibold text-slate-800 dark:text-slate-200 md:text-xl'
        >
          The All-in-One Platform for Automated Order Processing, Inventory Sync, and Shipping for TikTok Shops.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className='mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400'
        >
          We turn operational chaos into a CEO-level command center, so you can scale from 50 to 500+ orders a
          day—effortlessly.
        </motion.p>

        <motion.div variants={itemVariants} className='mt-10'>
          <motion.button
            className='rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50'
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring' as any, stiffness: 300, damping: 20 }}
          >
            Start Your 14-Day Free Trial
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className='mt-16'>
          <CommandCenterSnippet />
        </motion.div>
      </motion.div>
    </div>
  );
};

const CommandCenterSnippet = () => (
  <div className='relative rounded-xl bg-gradient-to-b from-slate-300/50 to-transparent p-1 dark:from-slate-800/50 dark:to-transparent'>
    <div className='rounded-[11px] border border-slate-900/10 bg-slate-200/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-slate-100/10 dark:bg-black/30 dark:shadow-[0_0_40px_rgba(59,130,246,0.15)]'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='font-semibold text-slate-800 dark:text-slate-200'>Live Operations Overview</h3>
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
      <span className='text-sm text-slate-600 dark:text-slate-400'>{label}</span>
    </div>
    <p className='mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100'>{value}</p>
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
      <span className='text-sm text-slate-600 dark:text-slate-400'>{label}</span>
    </div>
    <motion.p
      className='mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100'
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

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, toggleTheme }: any) => (
  <motion.button
    onClick={toggleTheme}
    className='fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/10 bg-slate-200/50 text-slate-800 backdrop-blur-xl dark:border-slate-100/10 dark:bg-white/5 dark:text-slate-200'
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
