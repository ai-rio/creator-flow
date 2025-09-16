import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { signInWithEmail, signInWithOAuth } from '../../../(auth)/auth-actions';
import { AuthUI } from '../../../(auth)/auth-ui';

export default async function SignupPage() {
  const [session, subscription] = await Promise.all([getSession(), getSubscription()]);

  // Redirect authenticated users
  if (session && subscription) {
    redirect('/dashboard');
  }

  if (session && !subscription) {
    redirect('/dashboard');
  }

  return (
    <div className='flex min-h-screen items-center justify-center py-12'>
      <div className='w-full max-w-md'>
        <AuthUI mode='signup' signInWithOAuth={signInWithOAuth} signInWithEmail={signInWithEmail} />
      </div>
    </div>
  );
}
