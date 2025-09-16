'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Brain, CheckCircle, ChevronDown, Moon, Plus, Search, Sun, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { createClient } from '@/libs/supabase/supabase-client-client';

// Status Indicator Component
const StatusIndicator = ({
  icon: Icon,
  variant,
  pulse = false,
}: {
  icon: React.ElementType;
  variant: 'warning' | 'success' | 'info';
  pulse?: boolean;
}) => (
  <div
    className={`
    relative flex h-8 w-8 items-center justify-center 
    rounded-full border-2 bg-background/50 backdrop-blur-sm
    ${variant === 'warning' ? 'border-amber-500/50 text-amber-500' : ''}
    ${variant === 'success' ? 'border-emerald-500/50 text-emerald-500' : ''}
    ${variant === 'info' ? 'border-purple-500/50 text-purple-500' : ''}
  `}
  >
    {pulse && <div className='absolute inset-0 animate-ping rounded-full bg-current opacity-50' />}
    <Icon className='relative h-4 w-4' />
  </div>
);

export const Header = () => {
  const [time, setTime] = useState(new Date());
  const [isActionsOpen, setActionsOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const tDashboard = useTranslations('dashboard');
  const tHeader = useTranslations('header');
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='w-full rounded-lg border-2 bg-background/50 p-4 backdrop-blur-xl md:p-6'>
      {/* Mobile Layout */}
      <div className='flex items-center justify-between md:hidden'>
        <div className='min-w-0 flex-1'>
          <h1 className='truncate text-lg font-bold text-foreground'>CreatorFlow</h1>
          <p className='text-xs text-muted-foreground'>{formattedTime}</p>
        </div>

        <div className='flex items-center gap-2'>
          <Button onClick={() => setSearchOpen(!isSearchOpen)} size='icon' variant='ghost' className='h-8 w-8'>
            <Search className='h-4 w-4' />
          </Button>

          <Button onClick={() => setActionsOpen(!isActionsOpen)} size='icon' variant='ghost' className='h-8 w-8'>
            <Plus className='h-4 w-4' />
          </Button>

          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant='outline'
            size='icon'
            className='h-8 w-8 rounded-full border-2'
          >
            {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden items-center justify-between md:flex'>
        <div className='flex-shrink-0'>
          <h1 className='text-2xl font-bold text-foreground'>{tDashboard('title')}</h1>
          <p className='text-sm text-muted-foreground'>
            {formattedDate} • {formattedTime}
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <Button
            onClick={() => setSearchOpen(!isSearchOpen)}
            size='icon'
            variant='ghost'
            className='h-8 w-8 rounded-full'
          >
            <Search className='h-4 w-4' />
          </Button>

          <div className='relative'>
            <Button
              onClick={() => setActionsOpen(!isActionsOpen)}
              size='icon'
              className='h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90'
            >
              <Plus className='h-4 w-4' />
            </Button>
            <AnimatePresence>
              {isActionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border-2 bg-background/95 p-2 backdrop-blur-xl'
                >
                  <div className='space-y-1'>
                    <Button variant='ghost' className='w-full justify-start'>
                      {tHeader('actions.newReport')}
                    </Button>
                    <Button variant='ghost' className='w-full justify-start'>
                      {tHeader('actions.createWorkflow')}
                    </Button>
                    <Button variant='ghost' className='w-full justify-start'>
                      {tHeader('actions.addTeamMember')}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className='flex flex-shrink-0 items-center gap-4'>
          <div className='hidden items-center gap-2 lg:flex'>
            <StatusIndicator icon={Zap} variant='warning' pulse={true} />
            <StatusIndicator icon={CheckCircle} variant='success' />
            <StatusIndicator icon={Brain} variant='info' />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center gap-2 p-2'>
                <img
                  className='h-8 w-8 rounded-full border-2 border-border object-cover'
                  src='https://placehold.co/100x100/8466D3/FFFFFF?text=C'
                  alt='Creator Avatar'
                />
                <div className='hidden text-left lg:block'>
                  <p className='text-sm font-bold text-foreground'>{tHeader('user.username')}</p>
                  <p className='text-xs text-muted-foreground'>{tHeader('user.tier')}</p>
                </div>
                <ChevronDown className='h-4 w-4 text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48 rounded-lg border-2'>
              <DropdownMenuItem asChild>
                <Link href='/account'>{tHeader('userMenu.accountSettings')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/manage-subscription'>{tHeader('userMenu.billingSubscription')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/help'>{tHeader('userMenu.helpCenter')}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>{tHeader('userMenu.signOut')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant='outline'
            size='icon'
            className='h-10 w-10 rounded-full border-2'
          >
            {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
          </Button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='mt-4 overflow-hidden'
          >
            <div className='rounded-lg border-2 bg-background/50 p-4'>
              <div className='relative flex items-center'>
                <Search className='absolute left-3 h-4 w-4 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder={tHeader('search.placeholder')}
                  className='w-full rounded-lg border-0 bg-transparent pl-10 pr-4 text-foreground focus-visible:ring-2 focus-visible:ring-purple-500'
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Actions Dropdown */}
      <AnimatePresence>
        {isActionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='mt-4 rounded-lg border-2 bg-background/95 p-2 backdrop-blur-xl md:hidden'
          >
            <div className='space-y-1'>
              <Button variant='ghost' className='w-full justify-start'>
                {tHeader('actions.newReport')}
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                {tHeader('actions.createWorkflow')}
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                {tHeader('actions.addTeamMember')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
