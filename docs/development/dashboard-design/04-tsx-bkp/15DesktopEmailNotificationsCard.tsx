/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { KeyRound, LogOut, Monitor, Moon, ShieldCheck, Smartphone, Sun } from 'lucide-react';
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

// Mock active sessions data for demonstration
const mockSessions = [
  {
    id: 1,
    type: 'Desktop',
    browser: 'Chrome',
    location: 'Rio de Janeiro, Brazil',
    ip: '189.45.122.155',
    isCurrent: true,
  },
  { id: 2, type: 'Smartphone', browser: 'Safari', location: 'New York, USA', ip: '207.97.227.239', isCurrent: false },
];

const GlassPane = ({ children, className = '' }: any) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);

const ThemeToggle = ({ theme, setTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-8 top-8 z-10 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
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

const SecuritySettingsCard = () => {
  const [theme, setTheme] = useState<string>('dark');
  const [is2faEnabled, setIs2faEnabled] = useState<boolean>(true);
  const [activeSessions, setActiveSessions] = useState<any>(mockSessions);

  const logoutSession = (id: any) => {
    setActiveSessions((prev: any) => prev.filter((session: any) => session.id !== id));
  };

  return (
    <div className={`${theme} font-sans`}>
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-500 dark:bg-[#0A090F]'>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className='w-full max-w-4xl'
        >
          <GlassPane className='p-8'>
            <div className='mb-8'>
              <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
                <ShieldCheck className='text-purple-600 dark:text-purple-400' size={32} />
                Security & Access
              </h1>
              <p className='mt-1 text-slate-600 dark:text-slate-400'>
                Manage your account's security and active sessions.
              </p>
            </div>

            {/* Password Section */}
            <SettingsSection icon={KeyRound} title='Password'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <InputField id='currentPassword' label='Current Password' type='password' />
                <InputField id='newPassword' label='New Password' type='password' />
              </div>
              <div className='mt-4 flex justify-end'>
                <ActionButton>Update Password</ActionButton>
              </div>
            </SettingsSection>

            {/* 2FA Section */}
            <SettingsSection icon={ShieldCheck} title='Two-Factor Authentication'>
              <div className='flex items-center justify-between rounded-lg bg-slate-200/50 p-4 dark:bg-slate-900/50'>
                <div>
                  <h3 className='font-semibold text-slate-800 dark:text-slate-200'>
                    {is2faEnabled ? '2FA is Enabled' : 'Enable 2FA'}
                  </h3>
                  <p className='text-sm text-slate-600 dark:text-slate-400'>
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <ToggleSwitch enabled={is2faEnabled} setEnabled={setIs2faEnabled} />
              </div>
            </SettingsSection>

            {/* Active Sessions Section */}
            <SettingsSection icon={Monitor} title='Active Sessions'>
              <div className='space-y-4'>
                <AnimatePresence>
                  {activeSessions.map((session: any) => (
                    <motion.div
                      key={session.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                      className='flex items-center justify-between rounded-lg bg-slate-200/50 p-4 dark:bg-slate-900/50'
                    >
                      <div className='flex items-center gap-4'>
                        {session.type === 'Desktop' ? (
                          <Monitor className='text-slate-600 dark:text-slate-400' />
                        ) : (
                          <Smartphone className='text-slate-600 dark:text-slate-400' />
                        )}
                        <div>
                          <p className='font-semibold text-slate-800 dark:text-slate-200'>
                            {session.browser} on {session.type}{' '}
                            {session.isCurrent && (
                              <span className='text-xs font-medium text-teal-600 dark:text-teal-400'> (Current)</span>
                            )}
                          </p>
                          <p className='text-sm text-slate-600 dark:text-slate-500'>
                            {session.location} - {session.ip}
                          </p>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <motion.button
                          onClick={() => logoutSession(session.id)}
                          className='flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LogOut size={16} />
                          Log Out
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </SettingsSection>
          </GlassPane>
        </motion.div>
      </div>
    </div>
  );
};

const SettingsSection = ({ icon: Icon, title, children }: any) => (
  <div className='border-t border-slate-300/50 py-6 dark:border-slate-700/50'>
    <h2 className='mb-4 flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200'>
      <Icon className='text-slate-500' size={24} />
      {title}
    </h2>
    {children}
  </div>
);

const InputField = ({ label, id, type }: any) => (
  <div>
    <label htmlFor={id} className='mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300'>
      {label}
    </label>
    <motion.input
      type={type}
      id={id}
      className='w-full rounded-lg border-2 border-slate-300 bg-slate-200/50 px-3 py-2 text-slate-900 outline-none transition-all duration-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100 dark:focus:border-purple-400 dark:focus:ring-purple-400'
      whileFocus={{ boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.4)' }}
    />
  </div>
);

const ActionButton = ({ children }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    className='rounded-lg bg-teal-600 px-5 py-2 font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-teal-500 dark:text-slate-900 dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)]'
  >
    {children}
  </motion.button>
);

const ToggleSwitch = ({ enabled, setEnabled }: any) => (
  <div
    onClick={() => setEnabled(!enabled)}
    className={`flex h-8 w-14 cursor-pointer items-center rounded-full transition-colors duration-300 ${
      enabled ? 'bg-teal-500' : 'bg-slate-400 dark:bg-slate-600'
    }`}
  >
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className='h-6 w-6 rounded-full bg-white shadow-md'
      style={{ marginLeft: enabled ? '1.8rem' : '0.2rem' }}
    />
  </div>
);

export default SecuritySettingsCard;
