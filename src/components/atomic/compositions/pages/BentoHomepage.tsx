'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

// Magic UI imports
import NumberTicker from '@/components/magicui/number-ticker';
// UI component imports
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import HPHero from '../../../../design-system/prototypes/homepage/HP-Hero';
import HPPricingTiersApp from '../../../../design-system/prototypes/homepage/HP-PricingTiers';
import HPTestimonialsShowcaseApp from '../../../../design-system/prototypes/homepage/HP-TestimonialsShowcase';
import { EnhancedCTA, MagneticButton } from '../../molecules/BentoInteractions';
import { LikeButton } from '../../molecules/ConversionMicroInteractions';
import DataFlowVisualization from '../../organisms/DataFlowVisualization';
import { AccessibilityMotionProvider, useMotionPreferences } from '../layouts/AccessibilityMotionProvider';
// Enhanced atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

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

// ==================== STATS SHOWCASE COMPONENT ====================

const StatsShowcase: React.FC<{ stats: HomepageStats }> = ({ stats }) => {
  const { enableCelebrations } = useMotionPreferences();

  return (
    <div className='grid grid-cols-2 gap-6 p-8'>
      <div className='text-center'>
        <div className='mb-2'>
          <NumberTicker
            value={stats.creatorsServed}
            variant='metric'
            enableCreatorFlowEffects={true}
            enableCelebration={enableCelebrations}
            milestoneValues={[1000, 5000, 10000]}
            suffix='+'
          />
        </div>
        <p className='text-sm text-muted-foreground'>Creators Served</p>
      </div>
      <div className='text-center'>
        <div className='mb-2'>
          <NumberTicker
            value={stats.ordersProcessed}
            variant='metric'
            enableCreatorFlowEffects={true}
            suffix='K+'
            className='text-brand-purple-600 dark:text-brand-purple-400'
          />
        </div>
        <p className='text-sm text-muted-foreground'>Orders Processed</p>
      </div>
      <div className='text-center'>
        <div className='mb-2'>
          <NumberTicker
            value={stats.automationSavings}
            variant='metric'
            enableCreatorFlowEffects={true}
            suffix='%'
            className='text-success-green-600 dark:text-success-green-400'
          />
        </div>
        <p className='text-sm text-muted-foreground'>Time Saved</p>
      </div>
      <div className='text-center'>
        <div className='mb-2'>
          <NumberTicker
            value={stats.satisfactionRate}
            variant='metric'
            enableCreatorFlowEffects={true}
            decimalPlaces={1}
            suffix='%'
            className='text-warning-amber-600 dark:text-warning-amber-400'
            enableCelebration={enableCelebrations}
            milestoneValues={[95, 98, 99]}
          />
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

// ==================== ORGANISM WRAPPERS FOR BENTO CARDS ====================

// Wrapper for HP-PricingTiers that adapts it to bento card size
const HPPricingTiersBento: React.FC = () => {
  return (
    <div className='pricing-bento-wrapper relative h-full w-full overflow-hidden'>
      <style jsx global>{`
        .pricing-bento-wrapper .min-h-screen {
          height: 100% !important;
          min-height: 300px !important;
        }
        .pricing-bento-wrapper [class*='h-[420px]'] {
          height: auto !important;
          min-height: 300px !important;
        }
        .pricing-bento-wrapper [class*='w-[320px]'] {
          width: 100% !important;
          max-width: 280px !important;
        }
        .pricing-bento-wrapper .fixed {
          position: absolute !important;
        }
        .pricing-bento-wrapper .grid {
          gap: 1rem !important;
        }
      `}</style>
      <HPPricingTiersApp />
    </div>
  );
};

// Wrapper for HP-TestimonialsShowcase that adapts it to bento card
const HPTestimonialsShowcaseBento: React.FC = () => {
  return (
    <div className='testimonials-bento-container relative h-full w-full overflow-hidden'>
      <style jsx global>{`
        .testimonials-bento-container .aspect-\\[4\\/3\\] {
          height: 200px !important;
          aspect-ratio: unset !important;
        }
        .testimonials-bento-container .scroller {
          animation-duration: 60s !important;
        }
        .testimonials-bento-container .autoscroll-container {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent) !important;
        }
      `}</style>
      <HPTestimonialsShowcaseApp />
    </div>
  );
};

// ==================== DATA FLOW SHOWCASE COMPONENT ====================

const DataFlowShowcase: React.FC = () => {
  return (
    <div className='p-6'>
      <div className='mb-4 text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Live System Integration</h3>
        <p className='text-sm text-muted-foreground'>Watch your business flow in real-time</p>
      </div>

      <DataFlowVisualization
        variant='homepage'
        enableRealTimeEffects={true}
        showMetrics={false}
        interactive={true}
        className='h-64'
      />
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
    <AccessibilityMotionProvider respectSystemPreferences={true} enableUserPreferences={true}>
      <div className={cn('min-h-screen bg-background', className)}>
        {/* Hero Section with Enhanced Bento Grid */}
        <BentoSection
          title='The Future of TikTok Shop Automation'
          subtitle="Join thousands of creators who've automated their fulfillment"
          className='container mx-auto px-4'
        >
          <BentoGrid enableAdvancedMotion={true} motionVariant='cascade'>
            {/* Hero Bento - Now using HP-Hero organism */}
            <BentoCard
              size='hero'
              className='lg:col-span-2 lg:row-span-2'
              delay={0.1}
              motionVariant='hero'
              interactionType='magnetic'
              magneticStrength={0.5}
            >
              <HPHero />
            </BentoCard>

            {/* Stats Showcase */}
            <BentoCard
              name='Trusted by Creators'
              description='Real numbers from real creators'
              size='medium'
              delay={0.2}
              icon={TrendingUp}
              interactionType='premium'
              hoverScale={1.05}
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
              interactionType='magnetic'
              magneticStrength={0.3}
            >
              <FeaturesGrid />
            </BentoCard>

            {/* Data Flow Visualization */}
            <BentoCard
              name='Live System Flow'
              description='See your automation in action'
              size='large'
              delay={0.4}
              icon={TrendingUp}
              interactionType='premium'
            >
              <DataFlowShowcase />
            </BentoCard>

            {/* Testimonial */}
            <BentoCard
              name='Creator Success'
              description='See what creators are saying'
              size='medium'
              delay={0.5}
              icon={Users}
              interactionType='standard'
            >
              <HPTestimonialsShowcaseBento />
            </BentoCard>

            {/* Pricing Preview */}
            <BentoCard
              name='Simple Pricing'
              description="Start free, upgrade when you're ready"
              size='medium'
              delay={0.6}
              interactionType='premium'
              hoverScale={1.04}
            >
              <HPPricingTiersBento />
            </BentoCard>
          </BentoGrid>
        </BentoSection>

        {/* Enhanced Call to Action Section */}
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
              <EnhancedCTA
                text='Start Your Free Trial'
                description='Join 10,000+ creators'
                variant='conversion'
                enableMagnetic={true}
                enableParticles={true}
              />
              <MagneticButton variant='secondary' size='lg' magneticStrength={0.3}>
                Book a Demo
              </MagneticButton>
            </div>

            {/* Like button for engagement */}
            <div className='mt-8 flex justify-center'>
              <LikeButton variant='heart' size='lg' count={1247} liked={false} />
            </div>
          </motion.div>
        </section>
      </div>
    </AccessibilityMotionProvider>
  );
};

export default BentoHomepage;
