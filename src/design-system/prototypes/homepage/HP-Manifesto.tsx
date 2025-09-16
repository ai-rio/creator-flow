/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Brush, Eye, X } from 'lucide-react';
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

// Manifesto Data
const manifestoData = [
  {
    id: 'clarity',
    Icon: Eye,
    title: 'Clarity',
    tagline: 'From Chaos to Cohesion.',
    detail:
      'We believe in transforming overwhelming data into a clear, actionable narrative. Our interface is meticulously designed to eliminate noise, providing you with the pure insight needed to make confident, strategic decisions.',
    color: 'brand-blue',
  },
  {
    id: 'data_as_art',
    Icon: Brush,
    title: 'Data as Art',
    tagline: 'Wisdom Made Visible.',
    detail:
      "Data is more than numbers; it's the story of your business. We present your analytics not as spreadsheets, but as beautiful, intuitive visualizations that allow you to grasp complex trends in a single, elegant glance.",
    color: 'brand-purple',
  },
  {
    id: 'empowerment',
    Icon: ArrowUpRight,
    title: 'Empowerment',
    tagline: 'Your Vision, Amplified.',
    detail:
      "Our platform is not just a tool, it's a force multiplier. By automating the mundane and illuminating the crucial, we give you back the time and control to focus on what truly matters: building your brand and commanding your growth.",
    color: 'brand-teal',
  },
];

// Main Manifesto Component
const HPManifesto = () => {
  const [selectedId, setSelectedId] = useState<any>(null);

  return (
    <section className='mx-auto w-full max-w-5xl'>
      <div className='grid grid-cols-1 gap-manifesto-grid md:grid-cols-3'>
        {manifestoData.map((item) => (
          <ManifestoCard key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
        ))}
      </div>
      <DeepDiveView selectedId={selectedId} setSelectedId={setSelectedId} />
    </section>
  );
};

// Manifesto Card Sub-Component
const ManifestoCard: React.FC<any> = ({ item, onClick }: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getColorValue = (color: string) => {
    switch (color) {
      case 'brand-blue':
        return '#60a5fa';
      case 'brand-purple':
        return '#c084fc';
      case 'brand-teal':
        return '#2dd4bf';
      default:
        return '#60a5fa';
    }
  };

  const colorValue = getColorValue(item.color);
  const showContent = isHovered || isMobile; // Always show content on mobile

  return (
    <motion.div
      layoutId={item.id}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className='relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-executive border border-border/20 bg-background/50 p-strategic text-center md:aspect-[3/4] md:p-command'
    >
      <motion.div
        className='absolute inset-0 -z-10'
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colorValue}40, transparent 80%)`,
        }}
        animate={{ scale: showContent ? [1, 1.3, 1] : 1, opacity: showContent ? 1 : 0.5 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className='z-10' layoutId={`icon-${item.id}`}>
        <item.Icon className='h-8 w-8 text-foreground md:h-12 md:w-12' />
      </motion.div>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: isMobile ? 0 : 0.1 }}
            className='mt-tactical text-center md:mt-strategic'
          >
            <motion.h3 layoutId={`title-${item.id}`} className='text-lg font-bold text-foreground md:text-2xl'>
              {item.title}
            </motion.h3>
            <motion.p
              layoutId={`tagline-${item.id}`}
              className='mt-xs text-sm text-muted-foreground md:mt-tactical md:text-base'
            >
              {item.tagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{showContent && <SharpEdgeAndSpark color={colorValue} />}</AnimatePresence>
    </motion.div>
  );
};

// Deep Dive Modal View
const DeepDiveView: React.FC<any> = ({ selectedId, setSelectedId }: any) => {
  const selectedItem = manifestoData.find((item) => item.id === selectedId);

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-header-padding'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className='absolute inset-0 bg-black/70 backdrop-blur-md' onClick={() => setSelectedId(null)} />
          <motion.div
            layoutId={selectedId}
            className='relative w-full max-w-2xl rounded-executive border border-border/20 bg-background/80 p-strategic backdrop-blur-xl md:p-command'
          >
            <motion.button
              onClick={() => setSelectedId(null)}
              className='absolute right-tactical top-tactical text-muted-foreground hover:text-foreground md:right-header-padding md:top-header-padding'
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className='md:hidden' />
              <X size={24} className='hidden md:block' />
            </motion.button>
            <div className='flex items-start gap-tactical md:gap-strategic'>
              <motion.div layoutId={`icon-${selectedId}`} className='rounded-lg p-xs md:p-tactical'>
                <selectedItem.Icon className='h-8 w-8 text-foreground md:h-12 md:w-12' />
              </motion.div>
              <div className='flex-1'>
                <motion.h3 layoutId={`title-${selectedId}`} className='text-xl font-bold text-foreground md:text-3xl'>
                  {selectedItem.title}
                </motion.h3>
                <motion.p
                  layoutId={`tagline-${selectedId}`}
                  className='mt-xs text-base text-muted-foreground md:mt-xs md:text-lg'
                >
                  {selectedItem.tagline}
                </motion.p>
              </div>
            </div>
            <motion.p
              className='mt-tactical leading-relaxed text-foreground md:mt-strategic'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {selectedItem.detail}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Sharp Edge and Spark Effect
const SharpEdgeAndSpark = ({ color }: any) => (
  <>
    <svg className='absolute inset-0 h-full w-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <motion.rect
        x='1'
        y='1'
        width='calc(100% - 2px)'
        height='calc(100% - 2px)'
        rx='15'
        stroke={color}
        strokeWidth='2'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'circOut' }}
      />
    </svg>
    <div className='absolute right-[1px] top-[1px]'>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute h-0.5 w-0.5 rounded-full'
          style={{ background: color, top: 0, left: 0 }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
          animate={{
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            scale: Math.random() * 0.5 + 0.5,
            opacity: [0, 1, 0],
          }}
          transition={{ delay: 0.4, duration: 0.4 + Math.random() * 0.3, ease: 'easeOut' }}
        />
      ))}
    </div>
  </>
);

// Export wrapper
const AppContent = () => {
  return (
    <div className='flex min-h-screen items-center justify-center overflow-hidden bg-background p-header-padding'>
      <HPManifesto />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
