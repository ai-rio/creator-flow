import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/language-switcher';

export default function HomePage() {
  const t = useTranslations('navigation');

  return (
    <div className="p-8">
      <div className="mb-4">
        <LanguageSwitcher />
      </div>
      
      <h1 className="text-2xl font-bold mb-4">CreatorFlow</h1>
      
      <nav className="space-x-4">
        <a href="#" className="text-blue-600 hover:underline">
          {t('dashboard')}
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          {t('orders')}
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          {t('analytics')}
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          {t('settings')}
        </a>
      </nav>
    </div>
  );
}