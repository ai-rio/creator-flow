import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Configuration & Theming ---
const darkTheme = {
  background: '#0A090F',
  textPrimary: 'text-white',
  textSecondary: 'text-slate-400',
  glassBg: 'bg-black/30',
  border: 'border-slate-100/10',
  glow: 'from-teal-500/20 to-purple-500/20',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #eef2ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  glassBg: 'bg-white/50',
  border: 'border-slate-300',
  glow: 'from-teal-500/10 to-purple-500/10',
};

// --- Team Data ---
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

// --- Architect Card Component ---
const ArchitectCard: React.FC<any> = ({ member, theme }: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className='relative h-[450px] w-80 rounded-3xl p-px'
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.glow}`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ rotateY: isHovered ? 0 : -15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`relative h-full w-full rounded-[23px] border p-6 backdrop-blur-xl ${theme.glassBg} ${theme.border}`}
      >
        <div className='flex h-full flex-col'>
          <img
            src={member.imageUrl}
            alt={member.name}
            className='h-40 w-40 rounded-full border-2 border-slate-100/10 object-cover'
          />
          <h3 className={`mt-4 text-2xl font-bold ${theme.textPrimary}`}>{member.name}</h3>
          <p className='font-semibold text-teal-400'>{member.role}</p>
          <div className='my-4 h-px flex-shrink-0 bg-slate-100/10' />
          <p className={`flex-grow text-lg italic ${theme.textSecondary}`}>&ldquo;{member.philosophy}&rdquo;</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
export default function AP030TheTeam(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <div style={{ background: currentTheme.background }} className='font-sans antialiased'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display.swap');`}</style>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center space-y-8 overflow-hidden px-4 py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-center'
        >
          <h1 className={`text-5xl font-black md:text-7xl ${currentTheme.textPrimary}`}>
            The Minds Behind the Machine.
          </h1>
          <p className={`mx-auto mt-4 max-w-3xl text-lg md:text-xl ${currentTheme.textSecondary}`}>
            CreatorFlow is the product of a collective obsession. Meet the architects who fused enterprise-grade
            engineering with an intimate understanding of the creator economy.
          </p>
        </motion.div>

        <div className='flex w-full justify-center pt-16'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {teamMembers.map((member) => (
              <ArchitectCard key={member.name} member={member} theme={currentTheme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Theme Toggle Button ---
const ThemeToggleButton: React.FC<any> = ({ theme, setTheme }: any) => {
  const buttonClasses =
    theme === 'dark'
      ? 'bg-white/5 border-slate-100/10 text-slate-200'
      : 'bg-slate-800/5 border-slate-300 text-slate-800';
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${buttonClasses}`}
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
};
