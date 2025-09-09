import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

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
  textPrimary: 'text-slate-200',
  textSecondary: 'text-slate-400',
  accent: 'text-teal-300',
  buttonBorder: 'border-teal-300',
  buttonHoverBg: 'bg-teal-300',
  buttonHoverText: 'text-black',
  cursor: 'bg-teal-300',
  toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #eef2ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  accent: 'text-teal-600',
  buttonBorder: 'border-teal-600',
  buttonHoverBg: 'bg-teal-600',
  buttonHoverText: 'text-white',
  cursor: 'bg-teal-600',
  toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

const manifesto = {
  headline: 'This Is Not a Job Application.',
  body: [
    "We do not have 'open roles.' We have critical missions in the relentless campaign against operational chaos.",
    "Our enemy is mediocrity. Our battlefield is the knife's edge between a creator's viral moment and their catastrophic collapse.",
    'We are not a family. We are a small, elite team of architects obsessed with forging perfect systems under extreme pressure.',
    "Read our philosophy of 'Flying Fly Dead.' Internalize our 'Think Hard and Dig Deep' methodology. If these principles do not resonate with you on a fundamental level, we thank you for your time. This is not the place for you.",
    "We do not offer ping pong tables. Our reward is the rare opportunity to build something definitive. The 'perk' is the forge itself.",
    "If you believe your best work is still ahead of you and that 'good enough' is a betrayal, then proceed.",
    'Show us not your resume, but your thinking.',
  ],
  prompt: 'Accept the Standard & Proceed',
};

// --- Helper Components ---
const Typewriter: React.FC<any> = ({ text, onComplete }: any) => {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        if (onComplete) onComplete();
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, [text, onComplete]);

  return <span>{displayText}</span>;
};

const Cursor = ({ theme }: any) => (
  <motion.span
    className={`inline-block h-6 w-3 align-middle ${theme.cursor}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);

const IgnitionShatter: React.FC<any> = ({ onComplete, theme }: any) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const shatterColor = theme === 'dark' ? '#2DD4BF' : '#0d9488'; // Teal-300 for dark, Teal-600 for light

  return (
    <motion.div
      className='pointer-events-none absolute inset-0 z-50'
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      aria-hidden='true'
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute'
          style={{ backgroundColor: shatterColor }}
          initial={{
            top: '50%',
            left: '50%',
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5,
            x: '-50%',
            y: '-50%',
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 20 + 10}px`,
          }}
          animate={{ x: `${(Math.random() - 0.5) * 200}vw`, y: `${(Math.random() - 0.5) * 200}vh`, opacity: 0 }}
          transition={{ duration: 1 + Math.random(), ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

const ThemeToggleButton = ({ theme, setTheme, currentTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${currentTheme.toggleButton}`}
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

// --- Main Component ---
export default function CP010Hero(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const [systemState, setSystemState] = useState<string>('typing_headline');
  const [bodyLineIndex, setBodyLineIndex] = useState<number>(0);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const handleHeadlineComplete = useCallback(() => {
    setSystemState('typing_body');
  }, []);

  const handleBodyLineComplete = useCallback(() => {
    if (bodyLineIndex < manifesto.body.length - 1) {
      setBodyLineIndex((prev) => prev + 1);
    } else {
      setSystemState('prompt_revealed');
    }
  }, [bodyLineIndex]);

  const handleAuth = () => setSystemState('igniting');

  return (
    <div
      style={{ background: currentTheme.background }}
      className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 font-mono text-lg antialiased'
    >
      <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
      {systemState === 'igniting' && (
        <IgnitionShatter onComplete={() => setSystemState('authenticated')} theme={theme} />
      )}

      <div className='z-10 w-full max-w-4xl'>
        <AnimatePresence mode='wait'>
          {systemState !== 'authenticated' && systemState !== 'igniting' ? (
            <motion.div
              key='creed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={`${currentTheme.accent} mb-6 text-3xl font-bold`}>
                <Typewriter text={manifesto.headline} onComplete={handleHeadlineComplete} />
                {systemState === 'typing_headline' && <Cursor theme={currentTheme} />}
              </h1>

              {systemState !== 'typing_headline' && (
                <div className={`${currentTheme.textPrimary} space-y-4`}>
                  {manifesto.body.slice(0, bodyLineIndex).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  {systemState === 'typing_body' && (
                    <p>
                      <Typewriter text={manifesto.body[bodyLineIndex]} onComplete={handleBodyLineComplete} />
                      <Cursor theme={currentTheme} />
                    </p>
                  )}
                  {systemState === 'prompt_revealed' && (
                    <>
                      {manifesto.body.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                      <motion.button
                        onClick={handleAuth}
                        className={`mt-10 border px-6 py-3 transition-colors duration-300 ${currentTheme.buttonBorder} ${currentTheme.accent} hover:${currentTheme.buttonHoverBg} hover:${currentTheme.buttonHoverText}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {manifesto.prompt}
                      </motion.button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          ) : null}

          {systemState === 'authenticated' && (
            <motion.div
              key='authenticated'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className={currentTheme.accent}>&gt; AUTHENTICATION SUCCESSFUL. WELCOME, ARCHITECT.</p>
              <p className={currentTheme.textSecondary}>&gt; Revealing open missions...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
