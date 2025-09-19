'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BarChart2, Check, Moon, Settings, Shield, Sun, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Types
interface Protocol {
  id: string;
  Icon: React.ComponentType<any>;
  titleKey: string;
  descriptionKey: string;
  required?: boolean;
}

interface CookieSettings {
  core: boolean;
  performance: boolean;
  growth: boolean;
}

interface TPCookiePolicyBarProps {
  className?: string;
}

// Protocol Configuration
const protocols: Protocol[] = [
  {
    id: 'core',
    Icon: Shield,
    titleKey: 'protocols.core.title',
    descriptionKey: 'protocols.core.description',
    required: true,
  },
  {
    id: 'performance',
    Icon: BarChart2,
    titleKey: 'protocols.performance.title',
    descriptionKey: 'protocols.performance.description',
  },
  {
    id: 'growth',
    Icon: Zap,
    titleKey: 'protocols.growth.title',
    descriptionKey: 'protocols.growth.description',
  },
];

// Protocol Toggle Component
interface ProtocolToggleProps {
  protocol: Protocol;
  enabled: boolean;
  onToggle: () => void;
}

const ProtocolToggle: React.FC<ProtocolToggleProps> = ({ protocol, enabled, onToggle }) => {
  const t = useTranslations('components.atomic.organisms.TPCookiePolicyBar');

  return (
    <div className='flex items-start justify-between py-4'>
      <div className='flex items-start gap-4'>
        <protocol.Icon className='mt-1 h-6 w-6 flex-shrink-0 text-primary' />
        <div>
          <h4 className='font-bold text-foreground'>{t(protocol.titleKey)}</h4>
          <p className='text-sm text-muted-foreground'>{t(protocol.descriptionKey)}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        disabled={protocol.required}
        className={`relative flex h-7 w-12 flex-shrink-0 items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          enabled ? 'bg-primary' : 'bg-muted'
        } ${protocol.required ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <motion.span
          layout
          className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform duration-300 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-xl'
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
export const TPCookiePolicyBar: React.FC<TPCookiePolicyBarProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    core: true,
    performance: false,
    growth: false,
  });

  const t = useTranslations('components.atomic.organisms.TPCookiePolicyBar');

  useEffect(() => {
    // Check if cookie consent has been given
    const consent = localStorage.getItem('creatorflow-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleToggle = (id: keyof CookieSettings) => {
    if (id !== 'core') {
      setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleAccept = (acceptedSettings: CookieSettings) => {
    localStorage.setItem('creatorflow-consent', JSON.stringify(acceptedSettings));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl ${className}`}
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div layout transition={{ duration: 0.3, ease: 'easeOut' }}>
            <div className='py-4'>
              <div
                className={`flex flex-col items-center justify-between gap-4 md:flex-row ${
                  isExpanded ? 'hidden' : 'flex'
                }`}
              >
                <div className='text-center md:text-left'>
                  <h3 className='text-lg font-bold text-foreground'>{t('title')}</h3>
                  <p className='text-sm text-muted-foreground'>{t('description')}</p>
                </div>
                <div className='flex flex-shrink-0 gap-3'>
                  <Button variant='ghost' onClick={() => setIsExpanded(true)} className='flex items-center gap-2'>
                    <Settings size={16} /> {t('buttons.customize')}
                  </Button>
                  <Button variant='outline' onClick={() => handleAccept(settings)}>
                    {t('buttons.activateSelected')}
                  </Button>
                  <Button onClick={() => handleAccept({ core: true, performance: true, growth: true })}>
                    {t('buttons.activateAll')}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <h3 className='mb-2 text-lg font-bold text-foreground'>{t('customize.title')}</h3>
                    <div className='divide-y divide-border'>
                      {protocols.map((protocol) => (
                        <ProtocolToggle
                          key={protocol.id}
                          protocol={protocol}
                          enabled={settings[protocol.id as keyof CookieSettings]}
                          onToggle={() => handleToggle(protocol.id as keyof CookieSettings)}
                        />
                      ))}
                    </div>
                    <div className='mt-4 flex justify-end gap-3'>
                      <Button onClick={() => handleAccept(settings)} className='flex items-center gap-2'>
                        <Check size={16} /> {t('buttons.saveActivate')}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <ThemeToggleButton />
    </>
  );
};

export default TPCookiePolicyBar;
