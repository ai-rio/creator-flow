import { TPCookiePolicyBar } from '@/components/atomic/organisms';

export default function CookieDemoPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-primary'>Cookie Policy Bar Demo</h1>
        <p className='mb-8 text-muted-foreground'>
          The cookie policy bar will appear at the bottom of the screen after 2 seconds.
        </p>
        <p className='text-sm text-muted-foreground'>Clear localStorage and refresh to see it again.</p>
      </div>
      <TPCookiePolicyBar />
    </div>
  );
}
