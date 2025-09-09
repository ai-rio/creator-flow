import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Star, Sun } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

// --- TypeScript Interfaces ---
interface User {
  handle: string;
  avatarUrl: string;
}

interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Mock Data for the Wall ---
const testimonials = [
  {
    handle: '@viral_creator',
    quote: "CreatorFlow didn't just organize my business, it unlocked a new level of growth I never thought possible.",
    metric: '500+ Orders/Day',
    img: 'https://placehold.co/100x100/1e293b/ffffff?text=VC',
  },
  {
    handle: '@ecom_queen',
    quote: "The automation saved me over 40 hours a week. It's like having a full-time operations manager.",
    metric: '$27k Saved/Mo',
    img: 'https://placehold.co/100x100/475569/ffffff?text=EQ',
  },
  {
    handle: '@tiktok_hustler',
    quote: "Inventory syncing is flawless. I haven't oversold a single item since switching.",
    metric: '99.9% Accuracy',
    img: 'https://placehold.co/100x100/64748b/ffffff?text=TH',
  },
  {
    handle: '@gadget_guru',
    quote: 'My order processing went from 15 minutes to literally 15 seconds. Game changer.',
    metric: '60x Faster',
    img: 'https://placehold.co/100x100/1e293b/ffffff?text=GG',
  },
  {
    handle: '@style_sensei',
    quote: 'The CEO dashboard gives me the clarity to make real, data-driven decisions. My revenue is up 40%.',
    metric: '+40% Revenue',
    img: 'https://placehold.co/100x100/475569/ffffff?text=SS',
  },
  {
    handle: '@crafty_creator',
    quote: 'I can finally focus on creating, not logistics. CreatorFlow handles everything.',
    metric: '100% Focus',
    img: 'https://placehold.co/100x100/64748b/ffffff?text=CC',
  },
];
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]; // Extended for a long, seamless loop

// --- Main Showcase Component ---
export default function TestimonialsShowcase(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='bg-slate-100 font-sans transition-colors duration-300 dark:bg-[#0A090F]'>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display.swap'); 
                body { font-family: 'Inter', sans-serif; }
                .autoscroll-container {
                    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
                }
                .scroller {
                    animation: scroll 120s linear infinite;
                }
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
      <HP060Testimonials />
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- HP-060-Testimonials Component ---
const HP060Testimonials = () => {
  return (
    <section className='relative flex w-full flex-col items-center justify-center overflow-hidden py-24'>
      <div className='mb-12 px-4 text-center'>
        <h2 className='bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-slate-400 md:text-5xl'>
          The Wall of Growth
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400'>
          Join the creators who turned chaos into command. Their success is our foundation.
        </p>
      </div>
      <div className='autoscroll-container w-full'>
        <div className='scroller flex gap-8'>
          {extendedTestimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonial Card Sub-Component ---
const TestimonialCard: React.FC<any> = ({ handle, quote, metric, img }: any) => {
  return (
    <div className='aspect-[4/3] w-[350px] flex-shrink-0 rounded-2xl bg-gradient-to-b from-slate-300/50 to-transparent p-1 dark:from-slate-800/50 dark:to-transparent'>
      <div className='flex h-full w-full flex-col justify-between rounded-[15px] border border-slate-900/10 bg-slate-200/80 p-6 shadow-lg backdrop-blur-2xl dark:border-slate-100/10 dark:bg-black/30'>
        <div>
          <div className='flex items-center gap-4'>
            <img
              src={img}
              alt={handle}
              className='h-12 w-12 rounded-full border-2 border-slate-300 dark:border-slate-700'
            />
            <div>
              <p className='font-bold text-slate-900 dark:text-slate-100'>{handle}</p>
              <div className='flex text-yellow-500 dark:text-yellow-400'>
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
              </div>
            </div>
          </div>
          <p className='mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300'>&ldquo;{quote}&rdquo;</p>
        </div>
        <motion.div
          className='mt-4 rounded-lg bg-slate-300/50 p-2 text-center dark:bg-slate-800/50'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className='bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-lg font-bold text-transparent dark:from-blue-400 dark:to-teal-300'>
            {metric}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

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
