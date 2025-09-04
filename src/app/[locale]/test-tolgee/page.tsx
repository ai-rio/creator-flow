'use client';

import { useTranslate } from '@tolgee/react';

export default function TestTolgeePage() {
  const { t } = useTranslate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tolgee Test Page</h1>
      <p>{t('test.welcome', 'Welcome to CreatorFlow!')}</p>
      <p>{t('test.description', 'This is a test page for Tolgee integration.')}</p>
      <p className="text-sm text-gray-600 mt-4">
        Hold Alt + Click on any text above to edit translations!
      </p>
    </div>
  );
}