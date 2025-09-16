/* eslint-disable */
'use client';

import React, { useState } from 'react';

import { SecuritySettings, ActiveSession } from './AM-SecuritySettings';

export default function SecuritySettingsDemo(): React.JSX.Element {
  const [is2faEnabled, setIs2faEnabled] = useState(true);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      type: 'Desktop',
      browser: 'Chrome',
      location: 'Rio de Janeiro, Brazil',
      ip: '189.45.122.155',
      isCurrent: true,
    },
    {
      id: '2',
      type: 'Smartphone',
      browser: 'Safari',
      location: 'New York, USA',
      ip: '207.97.227.239',
      isCurrent: false,
    },
    {
      id: '3',
      type: 'Desktop',
      browser: 'Firefox',
      location: 'London, UK',
      ip: '81.2.69.142',
      isCurrent: false,
    },
  ]);

  const handleUpdatePassword = (currentPassword: string, newPassword: string) => {
    console.log('Update password:', { currentPassword, newPassword });
  };

  const handleToggle2FA = (enabled: boolean) => {
    setIs2faEnabled(enabled);
    console.log('2FA toggled:', enabled);
  };

  const handleLogoutSession = (sessionId: string) => {
    setActiveSessions((prev) => prev.filter((session) => session.id !== sessionId));
    console.log('Logged out session:', sessionId);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Security Settings Demo</h1>
          <p className='text-body-lg text-muted-foreground'>
            Password management, 2FA toggle, and active session control
          </p>
        </div>

        <SecuritySettings
          is2faEnabled={is2faEnabled}
          activeSessions={activeSessions}
          onUpdatePassword={handleUpdatePassword}
          onToggle2FA={handleToggle2FA}
          onLogoutSession={handleLogoutSession}
        />

        <div className='mx-auto max-w-4xl rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Password update form with current/new password fields</li>
            <li>• Animated toggle switch for 2FA enable/disable</li>
            <li>• Active sessions list with device type icons</li>
            <li>• Current session indicator and logout functionality</li>
            <li>• Layout animations when sessions are removed</li>
            <li>• Organized sections with consistent spacing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
