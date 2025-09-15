/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

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

// Team Data
const teamMembers = [
  {
    name: 'Alex Thorne',
    role: 'Lead Systems Architect',
    philosophy:
      "A system's elegance is measured by its resilience under maximum pressure. We built CreatorFlow to be unbreakable during a viral storm.",
    imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=AT',
  },
  {
    name: 'Dr. Lena Petrova',
    role: 'Growth Intelligence',
    philosophy:
      'Data is useless noise. Actionable wisdom is the only metric that matters. My work is to turn raw data into your next strategic move.',
    imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=LP',
  },
  {
    name: 'Marcus Cole',
    role: 'Creator Experience Lead',
    philosophy:
      'Every click, every pixel, every interaction is either adding to the chaos or contributing to command. There is no middle ground.',
    imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=MC',
  },
  {
    name: 'Sofia Chen',
    role: 'Automation & Fulfillment',
    philosophy:
      'We automate the predictable so our creators can master the unpredictable. Repetitive tasks are the enemy of creative growth.',
    imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=SC',
  },
];

// Architect Card Component
const ArchitectCard: React.FC<any> = ({ member }: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='relative h-[450px] w-80 rounded-premium p-px'
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className='to-brand-purple-primary/20 absolute inset-0 rounded-premium bg-gradient-to-br from-brand-teal-primary/20'
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ rotateY: isHovered ? 0 : -15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className='relative h-full w-full rounded-[23px] border border-border/10 bg-card/30 p-tactical backdrop-blur-xl'
      >
        <div className='flex h-full flex-col'>
          <img
            src={member.imageUrl}
            alt={member.name}
            className='h-40 w-40 rounded-full border-2 border-border/10 object-cover'
          />
          <h3 className='mt-tactical text-heading-lg font-bold text-foreground'>{member.name}</h3>
          <p className='font-semibold text-brand-teal-primary'>{member.role}</p>
          <div className='my-tactical h-px flex-shrink-0 bg-border/10' />
          <p className='flex-grow text-body-lg italic text-muted-foreground'>&ldquo;{member.philosophy}&rdquo;</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Team Architects Component
const TeamArchitects = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='min-h-screen bg-background font-sans antialiased'>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='mx-auto flex min-h-screen w-full flex-col items-center justify-center space-y-strategic overflow-hidden px-tactical py-command'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-center'
        >
          <h1 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>
            The Minds Behind the Machine.
          </h1>
          <p className='md:text-heading-sm mx-auto mt-tactical max-w-prose text-body-lg text-muted-foreground'>
            CreatorFlow is the product of a collective obsession. Meet the architects who fused enterprise-grade
            engineering with an intimate understanding of the creator economy.
          </p>
        </motion.div>

        <div className='flex w-full justify-center pt-command'>
          <div className='grid grid-cols-1 gap-strategic md:grid-cols-2 lg:grid-cols-4'>
            {teamMembers.map((member) => (
              <ArchitectCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Theme Toggle Button Component
const ThemeToggleButton: React.FC<any> = ({ theme, setTheme }: any) => {
  return (
    <motion.div
      className='fixed bottom-tactical right-tactical z-modal'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant='outline'
        size='icon'
        className='h-12 w-12 rounded-full border-border/20 bg-card/80 backdrop-blur-xl'
        aria-label='Toggle theme'
      >
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

// Export wrapper
const AppContent = () => {
  return <TeamArchitects />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
