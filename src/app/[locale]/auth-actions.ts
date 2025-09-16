import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { getURL } from '@/utils/get-url';

export type ActionResponse = {
  data: any;
  error: any;
};

export async function signInWithOAuth(provider: 'google' | 'github', locale: string = 'en'): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getURL(`/${locale}/auth/callback`),
    },
  });

  if (error) {
    console.error(error);
    return { data: null, error: error };
  }

  return redirect(data.url);
}

export async function signInWithEmail(formData: FormData, locale: string = 'en'): Promise<ActionResponse> {
  const email = formData.get('email') as string;

  if (!email || !email.trim()) {
    return { data: null, error: { message: 'Email is required' } };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      emailRedirectTo: getURL(`/${locale}/auth/callback`),
    },
  });

  if (error) {
    console.error(error);
    return { data: null, error: error };
  }

  return { data: null, error: null };
}

export async function signOut(): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return { data: null, error: error };
  }

  return redirect('/');
}
