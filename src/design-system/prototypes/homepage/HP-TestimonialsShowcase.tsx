/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Testimonials Data
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

const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

// Testimonial Card Component
const TestimonialCard: React.FC<{
  handle: string;
  quote: string;
  metric: string;
  img: string;
}> = ({ handle, quote, metric, img }) => {
  return (
    <div className='aspect-[4/3] w-80 flex-shrink-0 rounded-executive bg-gradient-to-b from-muted/50 to-transparent p-1 md:w-[350px]'>
      <div className='bg-glass-testimonial flex h-full w-full flex-col justify-between rounded-executive border border-border/20 p-strategic shadow-lg backdrop-blur-2xl'>
        <div>
          <div className='flex items-center gap-tactical'>
            <img src={img} alt={handle} className='h-icon-lg w-icon-lg rounded-full border-2 border-border' />
            <div>
              <p className='font-bold text-foreground'>{handle}</p>
              <div className='flex text-warning-amber-500'>
                <Star className='h-icon-sm w-icon-sm' fill='currentColor' />
                <Star className='h-icon-sm w-icon-sm' fill='currentColor' />
                <Star className='h-icon-sm w-icon-sm' fill='currentColor' />
                <Star className='h-icon-sm w-icon-sm' fill='currentColor' />
                <Star className='h-icon-sm w-icon-sm' fill='currentColor' />
              </div>
            </div>
          </div>
          <p className='mt-tactical text-body-sm leading-relaxed text-muted-foreground'>&ldquo;{quote}&rdquo;</p>
        </div>
        <motion.div
          className='mt-tactical rounded-premium bg-muted/50 p-tactical text-center'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className='bg-gradient-to-r from-brand-blue-600 to-brand-teal-primary bg-clip-text text-heading-md font-bold text-transparent'>
            {metric}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Main Testimonials Component
const HPTestimonialsShowcase = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); 
        body { font-family: 'Inter', sans-serif; }
        .autoscroll-container {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        .scroller {
          display: flex;
          width: max-content;
          animation: scroll 120s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className='relative flex w-full flex-col items-center justify-center overflow-hidden py-hero-section-mobile md:py-hero-section-desktop'>
        <div className='mb-benefits-description px-tactical text-center md:px-strategic'>
          <h2 className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-display-md font-extrabold tracking-tight text-transparent md:text-display-lg'>
            The Wall of Growth
          </h2>
          <p className='mx-auto mt-tactical max-w-content text-body-sm text-muted-foreground md:text-body-md'>
            Join the creators who turned chaos into command. Their success is our foundation.
          </p>
        </div>
        <div className='autoscroll-container w-full'>
          <div className='scroller gap-manifesto-grid'>
            {extendedTestimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <HPTestimonialsShowcase />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
