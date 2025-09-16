'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

// Magic UI imports
import NumberTicker from '@/components/magicui/number-ticker';
import Particles from '@/components/magicui/particles';
// UI component imports
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// Atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

// Organism imports (we'll use placeholders for now, can be enhanced with actual organisms)
// import { Hero } from '../../organisms/HP-Hero';
// import { BenefitsReel } from '../../organisms/HP-BenefitsReel';
// import { PricingTiers } from '../../organisms/HP-PricingTiers';
// import { TestimonialsShowcase } from '../../organisms/HP-TestimonialsShowcase';

// ==================== TYPE DEFINITIONS ====================

export interface HomepageStats {
  creatorsServed: number;
  ordersProcessed: number;
  automationSavings: number;
  satisfactionRate: number;
}

export interface BentoHomepageProps {
  stats?: HomepageStats;
  className?: string;
}

// ==================== HERO BENTO COMPONENT ====================

const HeroBento: React.FC = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0'>
        <Particles className='absolute inset-0' quantity={50} ease={80} color='#2dd4bf' />
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
            TikTok Shop
            <br />
            <span className='bg-gradient-to-r from-brand-teal-500 to-brand-purple-500 bg-clip-text text-transparent'>
              Automation
            </span>
          </h1>
          <p className='mx-auto mb-8 max-w-md text-lg text-muted-foreground'>
            Automate your entire fulfillment process. From viral videos to delivered packages.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='hover:bg-brand-teal-700 bg-brand-teal-600'>
              Start Free Trial
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg' className='group'>
              <Play className='mr-2 h-4 w-4 transition-transform group-hover:scale-110' />
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== STATS SHOWCASE COMPONENT ====================

const StatsShowcase: React.FC<{ stats: HomepageStats }> = ({ stats }) => {
  return (
    <div className='grid grid-cols-2 gap-6 p-8'>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-brand-teal-600 dark:text-brand-teal-400'>
          <NumberTicker value={stats.creatorsServed} />+
        </div>
        <p className='text-sm text-muted-foreground'>Creators Served</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-brand-purple-600 dark:text-brand-purple-400'>
          <NumberTicker value={stats.ordersProcessed} />
          K+
        </div>
        <p className='text-sm text-muted-foreground'>Orders Processed</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400'>
          <NumberTicker value={stats.automationSavings} />%
        </div>
        <p className='text-sm text-muted-foreground'>Time Saved</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-amber-600 dark:text-amber-400'>
          <NumberTicker value={stats.satisfactionRate} decimalPlaces={1} />%
        </div>
        <p className='text-sm text-muted-foreground'>Satisfaction</p>
      </div>
    </div>
  );
};

// ==================== FEATURES GRID COMPONENT ====================

const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Viral Tracking',
      description: 'Automatically scale inventory when videos go viral',
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'End-to-end fulfillment without manual intervention',
    },
    {
      icon: Users,
      title: 'Creator-First',
      description: 'Built specifically for TikTok Shop creators',
    },
  ];

  return (
    <div className='space-y-6 p-6'>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className='flex items-start gap-4 rounded-lg bg-muted/30 p-4 transition-colors hover:bg-muted/50'
        >
          <div className='rounded-lg bg-primary/10 p-2'>
            <feature.icon className='h-5 w-5 text-primary' />
          </div>
          <div>
            <h3 className='mb-1 font-semibold text-foreground'>{feature.title}</h3>
            <p className='text-sm text-muted-foreground'>{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ==================== TESTIMONIAL COMPONENT ====================

const TestimonialBento: React.FC = () => {
  return (
    <div className='p-8 text-center'>
      <div className='mb-6'>
        <div className='mb-4 flex justify-center gap-1'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className='h-5 w-5 fill-amber-400 text-amber-400' />
          ))}
        </div>
        <blockquote className='mb-4 text-lg font-medium text-foreground'>
          &ldquo;CreatorFlow turned my chaotic fulfillment into a smooth machine. Now I focus on creating, not
          shipping.&rdquo;
        </blockquote>
        <div className='flex items-center justify-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-gradient-to-br from-brand-teal-400 to-brand-purple-400' />
          <div className='text-left'>
            <p className='font-semibold text-foreground'>Sarah Chen</p>
            <p className='text-sm text-muted-foreground'>@sarahcreates • 2.3M followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PRICING PREVIEW COMPONENT ====================

const PricingPreview: React.FC = () => {
  return (
    <div className='p-6'>
      <div className='mb-6 text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Simple Pricing</h3>
        <p className='text-muted-foreground'>Start free, scale as you grow</p>
      </div>

      <div className='space-y-4'>
        <div className='rounded-lg border border-border bg-card/50 p-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='font-semibold text-foreground'>Starter</span>
            <span className='text-2xl font-bold text-foreground'>Free</span>
          </div>
          <p className='mb-3 text-sm text-muted-foreground'>Up to 100 orders/month</p>
          <Button variant='outline' size='sm' className='w-full'>
            Get Started
          </Button>
        </div>

        <div className='rounded-lg border-2 border-primary bg-primary/5 p-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='font-semibold text-foreground'>Pro</span>
            <div className='text-right'>
              <span className='text-2xl font-bold text-foreground'>$49</span>
              <span className='text-sm text-muted-foreground'>/month</span>
            </div>
          </div>
          <p className='mb-3 text-sm text-muted-foreground'>Up to 5,000 orders/month</p>
          <Button size='sm' className='w-full'>
            Start Free Trial
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN HOMEPAGE COMPONENT ====================

/**
 * Bento grid homepage layout for CreatorFlow
 * Mobile-first responsive design with Magic UI animations
 * Showcases key features, testimonials, and pricing
 */
export const BentoHomepage: React.FC<BentoHomepageProps> = ({
  stats = {
    creatorsServed: 10000,
    ordersProcessed: 2400,
    automationSavings: 89,
    satisfactionRate: 98.5,
  },
  className,
}) => {
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
      <BentoSection
        title='The Future of TikTok Shop Automation'
        subtitle="Join thousands of creators who've automated their fulfillment"
        className='container mx-auto px-4'
      >
        <BentoGrid>
          {/* Hero Bento - Takes center stage */}
          <BentoCard size='hero' className='lg:col-span-2 lg:row-span-2' delay={0.1}>
            <HeroBento />
          </BentoCard>

          {/* Stats Showcase */}
          <BentoCard
            name='Trusted by Creators'
            description='Real numbers from real creators'
            size='medium'
            delay={0.2}
            icon={TrendingUp}
          >
            <StatsShowcase stats={stats} />
          </BentoCard>

          {/* Features Overview */}
          <BentoCard
            name='Key Features'
            description='Everything you need to automate your shop'
            size='medium'
            delay={0.3}
            icon={Zap}
          >
            <FeaturesGrid />
          </BentoCard>

          {/* Testimonial */}
          <BentoCard
            name='Creator Success'
            description='See what creators are saying'
            size='large'
            delay={0.4}
            icon={Users}
          >
            <TestimonialBento />
          </BentoCard>

          {/* Pricing Preview */}
          <BentoCard
            name='Simple Pricing'
            description="Start free, upgrade when you're ready"
            size='medium'
            delay={0.5}
          >
            <PricingPreview />
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
            Join the automation revolution. Start free and scale your TikTok Shop without the headaches.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='hover:bg-brand-teal-700 bg-brand-teal-600'>
              Start Your Free Trial
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg'>
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BentoHomepage;
