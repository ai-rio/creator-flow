/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { KeyRound, LogOut, LucideIcon, Monitor, ShieldCheck, Smartphone } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ActiveSession {
  id: string;
  type: 'Desktop' | 'Smartphone';
  browser: string;
  location: string;
  ip: string;
  isCurrent: boolean;
}

interface SecuritySettingsProps {
  title?: string;
  subtitle?: string;
  is2faEnabled: boolean;
  activeSessions: ActiveSession[];
  onUpdatePassword?: (currentPassword: string, newPassword: string) => void;
  onToggle2FA?: (enabled: boolean) => void;
  onLogoutSession?: (sessionId: string) => void;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: (enabled: boolean) => void }> = ({ enabled, onToggle }) => (
  <div
    onClick={() => onToggle(!enabled)}
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

const SettingsSection: React.FC<{
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <div className='border-t border-slate-300/50 py-6 dark:border-slate-700/50'>
    <h2 className='mb-4 flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-200'>
      <Icon className='text-slate-500' size={24} />
      {title}
    </h2>
    {children}
  </div>
);

const InputField: React.FC<{
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, id, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className='mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300'>
      {label}
    </label>
    <motion.input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className='w-full rounded-lg border-2 border-slate-300 bg-slate-200/50 px-3 py-2 text-slate-900 outline-none transition-all duration-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-100 dark:focus:border-purple-400 dark:focus:ring-purple-400'
      whileFocus={{ boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.4)' }}
    />
  </div>
);

const ActionButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    className='rounded-lg bg-teal-600 px-5 py-2 font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-teal-500 dark:text-slate-900 dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)]'
  >
    {children}
  </motion.button>
);

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  title = 'Security & Access',
  subtitle = "Manage your account's security and active sessions.",
  is2faEnabled,
  activeSessions,
  onUpdatePassword,
  onToggle2FA,
  onLogoutSession,
}) => {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword) {
      onUpdatePassword?.(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className='w-full max-w-4xl'
    >
      <div className='rounded-2xl border border-slate-900/10 bg-white/30 p-8 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20'>
        <div className='mb-8'>
          <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
            <ShieldCheck className='text-purple-600 dark:text-purple-400' size={32} />
            {title}
          </h1>
          <p className='mt-1 text-slate-600 dark:text-slate-400'>{subtitle}</p>
        </div>

        {/* Password Section */}
        <SettingsSection icon={KeyRound} title='Password'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <InputField
              id='currentPassword'
              label='Current Password'
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <InputField
              id='newPassword'
              label='New Password'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <ActionButton onClick={handleUpdatePassword}>Update Password</ActionButton>
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
            <ToggleSwitch enabled={is2faEnabled} onToggle={onToggle2FA || (() => {})} />
          </div>
        </SettingsSection>

        {/* Active Sessions Section */}
        <SettingsSection icon={Monitor} title='Active Sessions'>
          <div className='space-y-4'>
            <AnimatePresence>
              {activeSessions.map((session) => (
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
                      onClick={() => onLogoutSession?.(session.id)}
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
      </div>
    </motion.div>
  );
};

export { SecuritySettings };
export type { ActiveSession, SecuritySettingsProps };
