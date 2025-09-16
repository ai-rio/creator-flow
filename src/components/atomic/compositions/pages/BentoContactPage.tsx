'use client';

import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, Zap } from 'lucide-react';
import React, { useState } from 'react';

// Magic UI imports
import Particles from '@/components/magicui/particles';
// UI component imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/utils/cn';

// Atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

// ==================== TYPE DEFINITIONS ====================

export interface ContactMethod {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  value: string;
  action?: string;
}

export interface BentoContactPageProps {
  className?: string;
}

// ==================== CONTACT DATA ====================

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email Support',
    description: 'General inquiries and support',
    value: 'hello@creatorflow.com',
    action: 'mailto:hello@creatorflow.com',
  },
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant help during business hours',
    value: 'Available 9 AM - 6 PM PST',
    action: '/chat',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Phone Support',
    description: 'For enterprise customers',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
  },
];

const officeInfo = {
  address: '123 Creator Street, San Francisco, CA 94105',
  hours: 'Monday - Friday, 9 AM - 6 PM PST',
  timezone: 'Pacific Standard Time',
};

// ==================== CONTACT HERO BENTO ====================

const ContactHeroBento: React.FC = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0'>
        <Particles className='absolute inset-0' quantity={30} ease={80} color='#0d9488' />
        <div className='absolute inset-0 bg-gradient-to-br from-brand-teal-500/10 via-transparent to-brand-purple-500/10' />
      </div>

      {/* Hero content */}
      <div className='relative z-10 flex h-full flex-col justify-center p-8 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className='mb-4 text-4xl font-bold text-foreground lg:text-6xl'>
            Get in
            <br />
            <span className='bg-gradient-to-r from-brand-teal-500 to-brand-purple-500 bg-clip-text text-transparent'>
              Touch
            </span>
          </h1>
          <p className='mx-auto mb-8 max-w-md text-lg text-muted-foreground'>
            We&apos;re here to help you scale your TikTok Shop. Reach out anytime.
          </p>
          <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
            <Clock className='h-4 w-4' />
            <span>Response time: Under 2 hours</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== CONTACT FORM ====================

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    // Reset form or show success message
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name *</Label>
          <Input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Your full name'
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email *</Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='your@email.com'
            required
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='company'>Company</Label>
        <Input
          id='company'
          name='company'
          value={formData.company}
          onChange={handleInputChange}
          placeholder='Your company or TikTok handle'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subject'>Subject *</Label>
        <Input
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleInputChange}
          placeholder='What can we help you with?'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Message *</Label>
        <Textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleInputChange}
          placeholder='Tell us more about your needs...'
          rows={4}
          required
        />
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent' />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className='ml-2 h-4 w-4' />
          </>
        )}
      </Button>

      <p className='text-xs text-muted-foreground'>
        By submitting this form, you agree to our privacy policy. We&apos;ll never spam you.
      </p>
    </form>
  );
};

// ==================== CONTACT METHODS GRID ====================

const ContactMethodsGrid: React.FC = () => {
  return (
    <div className='space-y-4 p-6'>
      {contactMethods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className='flex items-start gap-4 rounded-lg bg-muted/30 p-4 transition-colors hover:bg-muted/50'
        >
          <div className='bg-brand-teal-100 dark:bg-brand-teal-900 mt-1 rounded-lg p-2'>
            <method.icon className='h-5 w-5 text-brand-teal-600 dark:text-brand-teal-400' />
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-foreground'>{method.title}</h3>
            <p className='text-sm text-muted-foreground'>{method.description}</p>
            <p className='mt-1 text-sm font-medium text-foreground'>{method.value}</p>
          </div>
          {method.action && (
            <Button variant='ghost' size='sm' asChild>
              <a href={method.action}>Contact</a>
            </Button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ==================== OFFICE INFO ====================

const OfficeInfo: React.FC = () => {
  return (
    <div className='space-y-6 p-6'>
      <div className='text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Visit Our Office</h3>
        <p className='text-muted-foreground'>Located in the heart of San Francisco</p>
      </div>

      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <MapPin className='mt-0.5 h-5 w-5 text-brand-teal-600' />
          <div>
            <p className='font-medium text-foreground'>Address</p>
            <p className='text-sm text-muted-foreground'>{officeInfo.address}</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Clock className='mt-0.5 h-5 w-5 text-brand-teal-600' />
          <div>
            <p className='font-medium text-foreground'>Business Hours</p>
            <p className='text-sm text-muted-foreground'>{officeInfo.hours}</p>
            <p className='text-xs text-muted-foreground'>{officeInfo.timezone}</p>
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-muted/30 p-4'>
        <p className='text-sm text-muted-foreground'>
          <strong>Note:</strong> We&apos;re primarily a remote-first company, but our SF office is open for meetings by
          appointment.
        </p>
      </div>
    </div>
  );
};

// ==================== FAQ SHORTCUTS ====================

const FAQShortcuts: React.FC = () => {
  const faqs = [
    {
      question: 'How quickly can I get started?',
      answer: 'Most creators are up and running within 24 hours of signup.',
    },
    {
      question: 'Do you integrate with my existing tools?',
      answer: 'Yes, we integrate with TikTok Shop, Shopify, and most major platforms.',
    },
    {
      question: 'What support do you offer?',
      answer: 'We provide email, chat, and phone support with dedicated success managers.',
    },
  ];

  return (
    <div className='space-y-4 p-6'>
      <div className='text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Quick Answers</h3>
        <p className='text-muted-foreground'>Common questions from creators</p>
      </div>

      <div className='space-y-3'>
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className='rounded-lg bg-muted/30 p-4'
          >
            <h4 className='mb-2 font-semibold text-foreground'>{faq.question}</h4>
            <p className='text-sm text-muted-foreground'>{faq.answer}</p>
          </motion.div>
        ))}
      </div>

      <Button variant='outline' className='w-full'>
        View Full FAQ
      </Button>
    </div>
  );
};

// ==================== MAIN CONTACT PAGE COMPONENT ====================

/**
 * Bento grid contact page layout for CreatorFlow
 * Includes contact form, methods, office info, and FAQ shortcuts
 */
export const BentoContactPage: React.FC<BentoContactPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Zap className='h-6 w-6 text-brand-teal-600 dark:text-brand-teal-400' />
              <span className='text-lg font-bold text-foreground'>CreatorFlow</span>
            </div>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='sm'>
                Login
              </Button>
              <Button size='sm'>Sign Up</Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Bento Grid */}
      <BentoSection title='Contact Us' subtitle="We're here to help you succeed" className='container mx-auto px-4'>
        <BentoGrid>
          {/* Contact Hero */}
          <BentoCard size='hero' className='lg:col-span-2' delay={0.1}>
            <ContactHeroBento />
          </BentoCard>

          {/* Contact Methods */}
          <BentoCard
            name='Ways to Reach Us'
            description='Choose your preferred method'
            size='medium'
            delay={0.2}
            icon={MessageCircle}
          >
            <ContactMethodsGrid />
          </BentoCard>

          {/* Contact Form */}
          <BentoCard
            name='Send us a Message'
            description='Tell us how we can help'
            size='large'
            className='lg:col-span-2'
            delay={0.3}
          >
            <ContactForm />
          </BentoCard>

          {/* Office Info */}
          <BentoCard name='Visit Us' description='Our San Francisco office' size='medium' delay={0.4} icon={MapPin}>
            <OfficeInfo />
          </BentoCard>

          {/* FAQ Shortcuts */}
          <BentoCard name='Quick Help' description='Common questions answered' size='medium' delay={0.5}>
            <FAQShortcuts />
          </BentoCard>
        </BentoGrid>
      </BentoSection>

      {/* Call to Action Section */}
      <section className='container mx-auto px-4 py-16 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>Ready to Automate Your Success?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground'>
            Don&apos;t wait to scale your TikTok Shop. Start your free trial today.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='bg-brand-teal-500 hover:bg-brand-teal-600'>
              Start Free Trial
              <Send className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg'>
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BentoContactPage;
