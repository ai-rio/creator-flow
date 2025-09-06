import ASeries from '@/components/mocks/ASeries';

export default function ASeriesPage() {
  return (
    <div className="min-h-screen">
      <ASeries mode="individual" initialComponent="a1" />
    </div>
  );
}