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
      enabled ? 'bg-primary' : 'bg-muted'
    }`}
  >
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className='h-6 w-6 rounded-full bg-background shadow-md'
      style={{ marginLeft: enabled ? '1.8rem' : '0.2rem' }}
    />
  </div>
);

const SettingsSection: React.FC<{
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <div className='border-t border-border py-strategic'>
    <h2 className='mb-tactical flex items-center gap-tactical text-heading-md font-semibold text-foreground'>
      <Icon className='text-muted-foreground' size={24} />
      {title}
    </h2>
    {children}
  </div>
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
      <div className='rounded-executive border border-border bg-background/95 p-strategic shadow-xl backdrop-blur-lg'>
        <div className='mb-strategic'>
          <h1 className='flex items-center gap-tactical text-heading-xl font-bold text-foreground'>
            <ShieldCheck className='text-primary' size={32} />
            {title}
          </h1>
          <p className='mt-1 text-body-md text-muted-foreground'>{subtitle}</p>
        </div>

        {/* Password Section */}
        <SettingsSection icon={KeyRound} title='Password'>
          <div className='grid grid-cols-1 gap-tactical md:grid-cols-2'>
            <div>
              <label htmlFor='currentPassword' className='text-body-sm font-medium text-foreground'>
                Current Password
              </label>
              <Input
                type='password'
                id='currentPassword'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='mt-1'
              />
            </div>
            <div>
              <label htmlFor='newPassword' className='text-body-sm font-medium text-foreground'>
                New Password
              </label>
              <Input
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='mt-1'
              />
            </div>
          </div>
          <div className='mt-tactical flex justify-end'>
            <Button onClick={handleUpdatePassword} className='bg-primary hover:bg-primary/90'>
              Update Password
            </Button>
          </div>
        </SettingsSection>

        {/* 2FA Section */}
        <SettingsSection icon={ShieldCheck} title='Two-Factor Authentication'>
          <div className='flex items-center justify-between rounded-premium bg-muted/50 p-tactical'>
            <div>
              <h3 className='font-semibold text-foreground'>{is2faEnabled ? '2FA is Enabled' : 'Enable 2FA'}</h3>
              <p className='text-body-sm text-muted-foreground'>Add an extra layer of security to your account.</p>
            </div>
            <ToggleSwitch enabled={is2faEnabled} onToggle={onToggle2FA || (() => {})} />
          </div>
        </SettingsSection>

        {/* Active Sessions Section */}
        <SettingsSection icon={Monitor} title='Active Sessions'>
          <div className='space-y-tactical'>
            <AnimatePresence>
              {activeSessions.map((session) => (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                  className='flex items-center justify-between rounded-premium bg-muted/50 p-tactical'
                >
                  <div className='flex items-center gap-tactical'>
                    {session.type === 'Desktop' ? (
                      <Monitor className='text-muted-foreground' />
                    ) : (
                      <Smartphone className='text-muted-foreground' />
                    )}
                    <div>
                      <p className='font-semibold text-foreground'>
                        {session.browser} on {session.type}{' '}
                        {session.isCurrent && <span className='text-xs font-medium text-primary'> (Current)</span>}
                      </p>
                      <p className='text-body-sm text-muted-foreground'>
                        {session.location} - {session.ip}
                      </p>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onLogoutSession?.(session.id)}
                      className='flex items-center gap-2 text-destructive hover:text-destructive/80'
                    >
                      <LogOut size={16} />
                      Log Out
                    </Button>
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
