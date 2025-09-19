'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/i18n/navigation';

// Types
interface CP010HeroProps {
  className?: string;
}

interface ThemeConfig {
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  buttonBorder: string;
  buttonHoverBg: string;
  buttonHoverText: string;
  cursor: string;
  toggleButton: string;
}

// Theme configurations
const darkTheme: ThemeConfig = {
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

const lightTheme: ThemeConfig = {
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

// Helper Components
const Typewriter: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
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

const Cursor: React.FC<{ theme: ThemeConfig }> = ({ theme }) => (
  <motion.span
    className={`inline-block h-6 w-3 align-middle ${theme.cursor}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
  />
);

const IgnitionShatter: React.FC<{ onComplete: () => void; theme: string }> = ({ onComplete, theme }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const shatterColor = theme === 'dark' ? '#2DD4BF' : '#0d9488';

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
          animate={{
            x: `${(Math.random() - 0.5) * 200}vw`,
            y: `${(Math.random() - 0.5) * 200}vh`,
            opacity: 0,
          }}
          transition={{ duration: 1 + Math.random(), ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
};

const ThemeToggleButton: React.FC<{ currentTheme: ThemeConfig }> = ({ currentTheme }) => {
  const { theme, setTheme } = useTheme();

  return (
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
};

// Main Component
export const CP010Hero: React.FC<CP010HeroProps> = ({ className }) => {
  const { theme } = useTheme();
  const t = useTranslations('components.atomic.organisms.CP010Hero');
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [systemState, setSystemState] = useState<string>('typing_headline');
  const [bodyLineIndex, setBodyLineIndex] = useState<number>(0);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigate to missions after authentication
  useEffect(() => {
    if (systemState === 'authenticated') {
      const timer = setTimeout(() => {
        router.push('/careers/missions');
      }, 2000); // Wait 2 seconds to show the authenticated message
      return () => clearTimeout(timer);
    }
  }, [systemState, router]);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const manifestoBody = t.raw('manifesto.body') as string[];

  const handleHeadlineComplete = useCallback(() => {
    setSystemState('typing_body');
  }, []);

  const handleBodyLineComplete = useCallback(() => {
    if (bodyLineIndex < manifestoBody.length - 1) {
      setBodyLineIndex((prev) => prev + 1);
    } else {
      setSystemState('prompt_revealed');
    }
  }, [bodyLineIndex, manifestoBody.length]);

  const handleAuth = () => setSystemState('igniting');

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 p-4 font-mono text-lg antialiased'>
        <div className='z-10 w-full max-w-4xl'>
          <div className='animate-pulse'>
            <div className='mb-6 h-8 w-3/4 rounded bg-slate-700'></div>
            <div className='space-y-4'>
              <div className='h-4 w-full rounded bg-slate-700'></div>
              <div className='h-4 w-5/6 rounded bg-slate-700'></div>
              <div className='h-4 w-4/5 rounded bg-slate-700'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ background: currentTheme.background }}
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 font-mono text-lg antialiased ${
        className || ''
      }`}
    >
      <ThemeToggleButton currentTheme={currentTheme} />

      {systemState === 'igniting' && (
        <IgnitionShatter onComplete={() => setSystemState('authenticated')} theme={theme || 'dark'} />
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
                <Typewriter text={t('manifesto.headline')} onComplete={handleHeadlineComplete} />
                {systemState === 'typing_headline' && <Cursor theme={currentTheme} />}
              </h1>

              {systemState !== 'typing_headline' && (
                <div className={`${currentTheme.textPrimary} space-y-4`}>
                  {systemState === 'typing_body' ? (
                    <>
                      {manifestoBody.slice(0, bodyLineIndex).map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                      ))}
                      <p>
                        <Typewriter text={manifestoBody[bodyLineIndex]} onComplete={handleBodyLineComplete} />
                        <Cursor theme={currentTheme} />
                      </p>
                    </>
                  ) : (
                    <>
                      {manifestoBody.map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                      ))}
                      {systemState === 'prompt_revealed' && (
                        <motion.button
                          onClick={handleAuth}
                          className={`mt-10 border px-6 py-3 transition-colors duration-300 ${currentTheme.buttonBorder} ${currentTheme.accent} hover:${currentTheme.buttonHoverBg} hover:${currentTheme.buttonHoverText}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {t('manifesto.prompt')}
                        </motion.button>
                      )}
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
              <p className={currentTheme.accent}>{t('authenticated.welcome')}</p>
              <p className={currentTheme.textSecondary}>{t('authenticated.revealing')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
