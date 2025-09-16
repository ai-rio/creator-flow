import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen'>
      <Header />
      <main className='pt-6'>{children}</main>
    </div>
  );
}
