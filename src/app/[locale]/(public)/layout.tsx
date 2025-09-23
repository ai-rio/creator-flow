import { HomepageHeader } from '@/components/layout/HomepageHeader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomepageHeader />
      {children}
    </>
  );
}
