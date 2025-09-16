'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';

import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { HeaderThemeToggle } from '@/components/ui/theme-toggle';
import { createClient } from '@/libs/supabase/supabase-client-client';
import { ActionResponse } from '@/types/action-response';

export function ClientNavigation() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const signOut = async (): Promise<ActionResponse> => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setSession(null);
      router.push('/');
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to sign out' };
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className='relative flex items-center gap-4'>
        <HeaderThemeToggle className='flex-shrink-0' />
        <div className='h-10 w-20 animate-pulse rounded bg-muted' />
      </div>
    );
  }

  return (
    <div className='relative flex items-center gap-4'>
      {/* Theme toggle - always visible */}
      <HeaderThemeToggle className='flex-shrink-0' />

      {/* Desktop Navigation */}
      <div className='hidden items-center gap-4 md:flex'>
        {session ? (
          <AccountMenu signOut={signOut} />
        ) : (
          <div className='flex items-center gap-2'>
            <Button variant='ghost' asChild>
              <Link href='/login'>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <IoMenu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-80'>
            <SheetHeader>
              <Logo />
              <SheetDescription>Navigate CreatorFlow</SheetDescription>
            </SheetHeader>
            <div className='mt-8 flex flex-col gap-4'>
              {session ? (
                <AccountMenu signOut={signOut} />
              ) : (
                <div className='flex flex-col gap-2'>
                  <Button variant='ghost' asChild>
                    <Link href='/login'>Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href='/signup'>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
