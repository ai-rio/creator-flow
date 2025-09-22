import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { SignupClient } from './signup-client';

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [session, subscription] = await Promise.all([getSession(), getSubscription()]);

  // Redirect authenticated users
  if (session && subscription) {
    redirect('/dashboard');
  }

  if (session && !subscription) {
    redirect('/dashboard');
  }

  return <SignupClient locale={locale} />;
}
