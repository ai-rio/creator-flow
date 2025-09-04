'use client';

import { useTranslations } from 'next-intl';

export default function WorkingTranslationsPage() {
  const t = useTranslations();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t('navigation.dashboard')}</h1>
      <p className="mb-2">{t('navigation.orders')}</p>
      <p className="mb-2">{t('navigation.analytics')}</p>
      
      <div className="mt-6 p-4 bg-green-100 rounded">
        <h2 className="font-semibold text-green-800">✅ Working Localization</h2>
        <p className="text-green-700">Using next-intl - fully functional!</p>
        <p className="text-sm text-green-600 mt-2">
          Try changing URL to /pt-br/working-translations or /es/working-translations
        </p>
      </div>
    </div>
  );
}