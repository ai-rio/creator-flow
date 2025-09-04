'use client';

import { useTranslate } from '@tolgee/react';

export default function TolgeeTestPage() {
  const { t } = useTranslate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tolgee Test</h1>
      <p>{t('navigation.dashboard', 'Dashboard')}</p>
      <p>{t('navigation.orders', 'Orders')}</p>
      <p className="text-sm text-gray-600 mt-4">
        Alt+Click on text above to edit!
      </p>
    </div>
  );
}