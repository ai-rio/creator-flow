'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Megaphone, MessageSquare, Share2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Types
interface TriageOption {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  subtitleKey: string;
  content: string;
}

interface TP010ContactProps {
  className?: string;
}

// Triage Options Configuration
const triageOptions: TriageOption[] = [
  {
    id: 'support',
    Icon: HelpCircle,
    titleKey: 'triage.support.title',
    subtitleKey: 'triage.support.subtitle',
    content: 'supportForm',
  },
  {
    id: 'press',
    Icon: Megaphone,
    titleKey: 'triage.press.title',
    subtitleKey: 'triage.press.subtitle',
    content: 'pressForm',
  },
  {
    id: 'partnerships',
    Icon: Share2,
    titleKey: 'triage.partnerships.title',
    subtitleKey: 'triage.partnerships.subtitle',
    content: 'partnershipInfo',
  },
  {
    id: 'general',
    Icon: MessageSquare,
    titleKey: 'triage.general.title',
    subtitleKey: 'triage.general.subtitle',
    content: 'generalForm',
  },
];

// Content Renderer Component
const ContentRenderer: React.FC<{ contentId: string }> = ({ contentId }) => {
  const t = useTranslations('components.atomic.organisms.TP010Contact');

  switch (contentId) {
    case 'supportForm':
      return (
        <div>
          <p className='mb-4 text-muted-foreground'>{t('content.support.description')}</p>
          <Button className='w-full'>{t('content.support.button')}</Button>
        </div>
      );

    case 'pressForm':
      return (
        <div className='space-y-4'>
          <Input type='text' placeholder={t('content.press.publication')} className='w-full' />
          <Input type='text' placeholder={t('content.press.subject')} className='w-full' />
          <Textarea placeholder={t('content.press.message')} rows={4} className='w-full resize-none' />
          <Button className='w-full'>{t('content.press.button')}</Button>
        </div>
      );

    case 'partnershipInfo':
      return (
        <div className='text-center'>
          <p className='mb-2 text-muted-foreground'>{t('content.partnerships.description')}</p>
          <a
            href='mailto:partnerships@creatorflow.com'
            className='text-xl font-bold text-primary transition-colors hover:text-primary/80'
          >
            partnerships@creatorflow.com
          </a>
        </div>
      );

    case 'generalForm':
      return (
        <div className='space-y-4'>
          <Input type='email' placeholder={t('content.general.email')} className='w-full' />
          <Textarea placeholder={t('content.general.message')} rows={5} className='w-full resize-none' />
          <Button className='w-full'>{t('content.general.button')}</Button>
        </div>
      );

    default:
      return null;
  }
};

// Main Component
export const TP010Contact: React.FC<TP010ContactProps> = ({ className }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { theme } = useTheme();
  const t = useTranslations('components.atomic.organisms.TP010Contact');

  const selectedOption = triageOptions.find((opt) => opt.id === selectedId);

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-4 font-sans antialiased ${className}`}>
      {/* Hero Section */}
      <div className='mb-12 w-full max-w-4xl text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-black text-primary md:text-7xl'
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'
        >
          {t('hero.description')}
        </motion.p>
      </div>

      {/* Triage Options Grid */}
      <div className='w-full max-w-4xl'>
        <motion.div layout className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {triageOptions.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              whileHover={{ scale: 1.03 }}
              className='cursor-pointer'
            >
              <Card className='p-6 transition-shadow hover:shadow-lg'>
                <motion.div layout='position' className='flex items-center gap-4'>
                  <item.Icon className='h-8 w-8 text-primary' />
                  <div>
                    <h3 className='text-xl font-bold text-primary'>{t(item.titleKey)}</h3>
                    <p className='text-muted-foreground'>{t(item.subtitleKey)}</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedOption && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
          >
            <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' onClick={() => setSelectedId(null)} />
            <motion.div layout>
              <Card className='relative w-full max-w-lg p-8'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setSelectedId(null)}
                  className='absolute right-4 top-4 p-2'
                >
                  <X size={20} />
                </Button>
                <div className='mb-6 flex items-center gap-4'>
                  <selectedOption.Icon className='h-8 w-8 text-primary' />
                  <h3 className='text-2xl font-bold text-primary'>{t(selectedOption.titleKey)}</h3>
                </div>
                <ContentRenderer contentId={selectedOption.content} />
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TP010Contact;
