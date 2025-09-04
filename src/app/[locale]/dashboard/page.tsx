import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('orders');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">{t('status.received')}</h3>
          <p className="text-2xl">12</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">{t('status.processing')}</h3>
          <p className="text-2xl">8</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">{t('status.shipped')}</h3>
          <p className="text-2xl">25</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="font-semibold">{t('status.delivered')}</h3>
          <p className="text-2xl">156</p>
        </div>
      </div>
    </div>
  );
}