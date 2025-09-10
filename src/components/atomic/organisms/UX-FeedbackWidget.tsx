/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bug, CheckCircle, Lightbulb, MessageSquare, X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { type: string; message: string }) => void;
}

const feedbackTypes = [
  {
    id: 'bug',
    label: 'Bug Report',
    icon: Bug,
    description: 'Report a problem or issue',
    color: 'text-red-500',
  },
  {
    id: 'feature',
    label: 'Feature Request',
    icon: Lightbulb,
    description: 'Suggest a new feature',
    color: 'text-yellow-500',
  },
  {
    id: 'general',
    label: 'General Feedback',
    icon: MessageSquare,
    description: 'Share your thoughts',
    color: 'text-blue-500',
  },
];

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState<number>(0); // 0: category, 1: form, 2: success
  const [feedbackType, setFeedbackType] = useState<string>('');

  const handleCategorySelect = (type: string) => {
    setFeedbackType(type);
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    onSubmit?.({ type: feedbackType, message });
    setStep(2);

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setStep(0);
        setFeedbackType('');
      }, 300);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-modal flex items-center justify-center p-strategic'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='absolute inset-0 bg-background/80 backdrop-blur-sm' onClick={onClose} />

          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='relative w-full max-w-md'
          >
            <div className='rounded-executive border border-border bg-background/95 p-strategic shadow-xl backdrop-blur-lg'>
              <AnimatePresence mode='wait'>
                {step === 0 && (
                  <motion.div
                    key='category'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className='mb-strategic flex items-center justify-between'>
                      <h2 className='text-heading-lg font-semibold text-foreground'>Send Feedback</h2>
                      <Button variant='ghost' size='sm' onClick={onClose} className='h-auto p-1'>
                        <X className='h-icon-sm w-icon-sm' />
                      </Button>
                    </div>

                    <p className='mb-strategic text-body-md text-muted-foreground'>
                      What type of feedback would you like to share?
                    </p>

                    <div className='space-y-tactical'>
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleCategorySelect(type.id)}
                          className='w-full rounded-premium border border-border bg-muted/50 p-tactical text-left transition-all hover:bg-muted hover:shadow-md'
                        >
                          <div className='flex items-center gap-tactical'>
                            <type.icon className={`h-icon-md w-icon-md ${type.color}`} />
                            <div>
                              <div className='font-medium text-foreground'>{type.label}</div>
                              <div className='text-sm text-muted-foreground'>{type.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key='form'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className='mb-strategic flex items-center justify-between'>
                      <h2 className='text-heading-lg font-semibold text-foreground'>
                        {feedbackTypes.find((t) => t.id === feedbackType)?.label}
                      </h2>
                      <Button variant='ghost' size='sm' onClick={onClose} className='h-auto p-1'>
                        <X className='h-icon-sm w-icon-sm' />
                      </Button>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-strategic'>
                      <div>
                        <label htmlFor='message' className='mb-tactical block text-body-md font-medium text-foreground'>
                          Your feedback
                        </label>
                        <Textarea
                          id='message'
                          name='message'
                          placeholder='Please describe your feedback in detail...'
                          required
                          className='min-h-[120px] resize-none'
                        />
                      </div>

                      <div className='flex justify-end gap-tactical'>
                        <Button type='button' variant='outline' onClick={() => setStep(0)}>
                          Back
                        </Button>
                        <Button type='submit'>Send Feedback</Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className='py-strategic text-center'
                  >
                    <CheckCircle className='mx-auto mb-tactical h-12 w-12 text-green-500' />
                    <h2 className='mb-tactical text-heading-lg font-semibold text-foreground'>Thank you!</h2>
                    <p className='text-body-md text-muted-foreground'>Your feedback has been sent successfully.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { FeedbackWidget };
export type { FeedbackWidgetProps };
