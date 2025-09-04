import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-4">{t('pageNotFound')}</p>
      <Link href="/" className="text-blue-600 hover:underline">
        {t('goHome')}
      </Link>
    </div>
  );
}