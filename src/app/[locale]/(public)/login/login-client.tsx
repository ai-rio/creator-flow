'use client';

import { signInWithEmail, signInWithOAuth } from '../../auth-actions';
import { AuthUI } from '../../auth-ui';

export function LoginClient({ locale }: { locale: string }) {
  return (
    <div className='flex min-h-screen items-center justify-center py-12'>
      <div className='w-full max-w-md'>
        <AuthUI
          mode='login'
          locale={locale}
          signInWithOAuth={(provider) => signInWithOAuth(provider, locale)}
          signInWithEmail={(formData) => signInWithEmail(formData, locale)}
        />
      </div>
    </div>
  );
}
