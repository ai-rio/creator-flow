import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Main Showcase Component ---
export default function CtaShowcase(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='bg-slate-100 font-sans transition-colors duration-300 dark:bg-[#0A090F]'>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display.swap'); 
                body { font-family: 'Inter', sans-serif; }
                .supernova-button::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    box-shadow: 0 0 40px 10px #3b82f6, 0 0 80px 20px #8b5cf6;
                    animation: supernova-pulse 3s ease-in-out infinite;
                }
                @keyframes supernova-pulse {
                    0% { transform: scale(0.9); opacity: 0.5; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(0.9); opacity: 0.5; }
                }
            `}</style>
      <div className='h-screen' />
      <HP080FinalCTA />
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- HP-080-FinalCTA Component ---
const HP080FinalCTA = () => {
  return (
    <section className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
      <StarVortex />
      <motion.div
        className='relative z-10 p-8 text-center'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.h2
          variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 100 }}
          className='bg-gradient-to-br from-slate-800 to-slate-500 bg-clip-text text-4xl font-black tracking-tight text-transparent dark:from-white dark:to-slate-400 md:text-6xl'
        >
          Ready to Command Your Growth?
        </motion.h2>

        <motion.div
          variants={{ hidden: { scale: 0.5, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.5, duration: 1 }}
          className='mt-12'
        >
          <a
            href='#'
            className='supernova-button relative inline-block rounded-full bg-blue-600 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all'
          >
            Start Your 14-Day Free Trial
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- Star Vortex Background Component ---
const StarVortex = () => (
  <div className='absolute inset-0 z-0'>
    <svg width='100%' height='100%' className='absolute inset-0'>
      <defs>
        <radialGradient id='nebula' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='rgba(139, 92, 246, 0.3)' />
          <stop offset='50%' stopColor='rgba(59, 130, 246, 0.2)' />
          <stop offset='100%' stopColor='rgba(59, 130, 246, 0)' />
        </radialGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#nebula)' />
      {Array.from({ length: 200 }).map((_, i) => {
        const angle = (i / 200) * Math.PI * 2;
        const radius = Math.random() * 50 + 5;
        const duration = Math.random() * 10 + 10;
        return (
          <motion.circle
            key={i}
            cx='50%'
            cy='50%'
            r={Math.random() * 0.75 + 0.25}
            fill='white'
            animate={{
              x: `${radius * Math.cos(angle)}%`,
              y: `${radius * Math.sin(angle)}%`,
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * -duration,
            }}
          />
        );
      })}
    </svg>
  </div>
);

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-900/10 bg-slate-200/50 text-slate-800 backdrop-blur-xl dark:border-slate-100/10 dark:bg-white/5 dark:text-slate-200'
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
