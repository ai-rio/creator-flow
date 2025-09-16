'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Lightbulb, Shield, Target, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

// Magic UI imports
import NumberTicker from '@/components/magicui/number-ticker';
import Particles from '@/components/magicui/particles';
// UI component imports
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// Atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

// ==================== TYPE DEFINITIONS ====================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  tiktokHandle?: string;
  followers?: number;
  background: 'creator' | 'tech' | 'business';
}

export interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
  metric?: string;
}

export interface BentoAboutPageProps {
  className?: string;
}

// ==================== MOCK DATA ====================

const teamMembers: TeamMember[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former TikTok creator with 2.3M followers. Built and scaled 3 successful TikTok Shops before founding CreatorFlow.',
    avatar: 'SC',
    tiktokHandle: '@sarahcreates',
    followers: 2300000,
    background: 'creator',
  },
  {
    id: 'marcus',
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Shopify engineer who helped scale e-commerce infrastructure. Passionate about creator economy technology.',
    avatar: 'MR',
    background: 'tech',
  },
  {
    id: 'alex',
    name: 'Alex Kim',
    role: 'Head of Creator Success',
    bio: 'Multi-platform creator who scaled from 0 to 1M followers in 18 months. Now helps creators automate their success.',
    avatar: 'AK',
    tiktokHandle: '@alexbuildsbiz',
    followers: 1200000,
    background: 'creator',
  },
];

const companyValues = [
  {
    icon: Heart,
    title: 'Creator-First',
    description: 'Every decision we make prioritizes creator success and sustainability.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously push the boundaries of what&apos;s possible in automation.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Your business depends on us. We take that responsibility seriously.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We measure success by the growth and freedom we enable for creators.',
  },
];

const milestones: CompanyMilestone[] = [
  {
    year: '2022',
    title: 'Founded',
    description: 'Started by creators frustrated with manual fulfillment processes',
    metric: '2 Founders',
  },
  {
    year: '2023',
    title: 'First 100 Creators',
    description: 'Reached 100 active creator customers processing 10K orders/month',
    metric: '100 Creators',
  },
  {
    year: '2024',
    title: 'Scale & Growth',
    description: 'Now serving 2,500+ creators processing 850K orders monthly',
    metric: '2,500+ Creators',
  },
];

// ==================== ABOUT HERO BENTO ====================

const AboutHeroBento: React.FC = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0'>
        <Particles className='absolute inset-0' quantity={40} ease={80} color='#7c3aed' />
        <div className='absolute inset-0 bg-gradient-to-br from-brand-purple-500/10 via-transparent to-brand-teal-500/10' />
      </div>

      {/* Hero content */}
      <div className='relative z-10 flex h-full flex-col justify-center p-8 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className='mb-4 text-4xl font-bold text-foreground lg:text-6xl'>
            Built by
            <br />
            <span className='bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 bg-clip-text text-transparent'>
              Creators
            </span>
          </h1>
          <p className='mx-auto mb-8 max-w-md text-lg text-muted-foreground'>
            We&apos;ve been where you are. We built CreatorFlow to solve our own problems.
          </p>
          <Badge variant='secondary' className='text-sm'>
            Founded in 2022 • San Francisco, CA
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== TEAM MEMBER CARD ====================

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className='rounded-lg border border-border bg-card p-6'
    >
      <div className='mb-4 flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-teal-500 font-bold text-white'>
          {member.avatar}
        </div>
        <div>
          <h3 className='font-semibold text-foreground'>{member.name}</h3>
          <p className='text-sm text-muted-foreground'>{member.role}</p>
        </div>
      </div>

      <p className='mb-4 text-sm text-foreground'>{member.bio}</p>

      {member.tiktokHandle && (
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-brand-purple-600'>{member.tiktokHandle}</span>
          {member.followers && (
            <span className='text-sm text-muted-foreground'>
              <NumberTicker value={member.followers / 1000000} decimalPlaces={1} />M followers
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

// ==================== COMPANY VALUES GRID ====================

const ValuesGrid: React.FC = () => {
  return (
    <div className='grid gap-6 p-6 sm:grid-cols-2'>
      {companyValues.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className='rounded-lg bg-muted/30 p-4'
        >
          <div className='bg-brand-purple-100 dark:bg-brand-purple-900 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg'>
            <value.icon className='h-5 w-5 text-brand-purple-600 dark:text-brand-purple-400' />
          </div>
          <h3 className='mb-2 font-semibold text-foreground'>{value.title}</h3>
          <p className='text-sm text-muted-foreground'>{value.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ==================== COMPANY STATS ====================

const CompanyStats: React.FC = () => {
  return (
    <div className='grid grid-cols-2 gap-6 p-6'>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-brand-purple-600'>
          <NumberTicker value={2500} />+
        </div>
        <p className='text-sm text-muted-foreground'>Active Creators</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-brand-teal-600'>
          <NumberTicker value={850} />
          K+
        </div>
        <p className='text-sm text-muted-foreground'>Orders/Month</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-emerald-600'>
          <NumberTicker value={92} />%
        </div>
        <p className='text-sm text-muted-foreground'>Time Saved</p>
      </div>
      <div className='text-center'>
        <div className='mb-2 text-3xl font-bold text-amber-600'>
          <NumberTicker value={98.7} decimalPlaces={1} />%
        </div>
        <p className='text-sm text-muted-foreground'>Uptime</p>
      </div>
    </div>
  );
};

// ==================== MISSION STATEMENT ====================

const MissionStatement: React.FC = () => {
  return (
    <div className='space-y-6 p-6 text-center'>
      <h3 className='text-xl font-bold text-foreground'>Our Mission</h3>
      <blockquote className='text-lg font-medium text-foreground'>
        &ldquo;To liberate creators from the operational complexity of e-commerce, so they can focus on what they do
        best: creating content that moves the world.&rdquo;
      </blockquote>
      <div className='space-y-4 text-left'>
        <div className='flex items-start gap-3'>
          <div className='mt-1 h-2 w-2 rounded-full bg-brand-purple-500' />
          <p className='text-sm text-muted-foreground'>
            We believe creators shouldn&apos;t have to choose between creativity and business growth
          </p>
        </div>
        <div className='flex items-start gap-3'>
          <div className='mt-1 h-2 w-2 rounded-full bg-brand-teal-500' />
          <p className='text-sm text-muted-foreground'>Technology should amplify human potential, not complicate it</p>
        </div>
        <div className='flex items-start gap-3'>
          <div className='mt-1 h-2 w-2 rounded-full bg-emerald-500' />
          <p className='text-sm text-muted-foreground'>
            The creator economy is the future of work, and we&apos;re building its infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPANY TIMELINE ====================

const CompanyTimeline: React.FC = () => {
  return (
    <div className='space-y-6 p-6'>
      <h3 className='text-center text-xl font-bold text-foreground'>Our Journey</h3>
      <div className='space-y-4'>
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className='flex gap-4'
          >
            <div className='flex flex-col items-center'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple-500 text-xs font-bold text-white'>
                {milestone.year.slice(-2)}
              </div>
              {index < milestones.length - 1 && <div className='mt-2 h-8 w-0.5 bg-border' />}
            </div>
            <div className='flex-1 pb-6'>
              <div className='flex items-center gap-2'>
                <h4 className='font-semibold text-foreground'>{milestone.title}</h4>
                {milestone.metric && (
                  <Badge variant='secondary' className='text-xs'>
                    {milestone.metric}
                  </Badge>
                )}
              </div>
              <p className='mt-1 text-sm text-muted-foreground'>{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN ABOUT PAGE COMPONENT ====================

/**
 * Bento grid about page layout for CreatorFlow
 * Showcases team, mission, values, and company story
 */
export const BentoAboutPage: React.FC<BentoAboutPageProps> = ({ className }) => {
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
        title='About CreatorFlow'
        subtitle='Our story, team, and mission'
        className='container mx-auto px-4'
      >
        <BentoGrid>
          {/* About Hero */}
          <BentoCard size='hero' className='lg:col-span-2' delay={0.1}>
            <AboutHeroBento />
          </BentoCard>

          {/* Company Stats */}
          <BentoCard
            name='By the Numbers'
            description='Our impact in the creator economy'
            size='medium'
            delay={0.2}
            icon={TrendingUp}
          >
            <CompanyStats />
          </BentoCard>

          {/* Mission Statement */}
          <BentoCard name='Our Mission' description='Why we exist' size='large' className='lg:col-span-2' delay={0.3}>
            <MissionStatement />
          </BentoCard>

          {/* Company Values */}
          <BentoCard name='Our Values' description='What drives us every day' size='medium' delay={0.4} icon={Heart}>
            <ValuesGrid />
          </BentoCard>
        </BentoGrid>
      </BentoSection>

      {/* Team Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>Meet Our Team</h2>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Creators, engineers, and business leaders united by a shared vision
          </p>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <BentoSection title='Our Journey' className='container mx-auto px-4'>
        <BentoGrid>
          <BentoCard
            name='Company Timeline'
            description='From startup to scale'
            size='large'
            className='lg:col-span-2'
            delay={0.1}
          >
            <CompanyTimeline />
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
          <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>Ready to Join Our Community?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground'>
            Join thousands of creators who have automated their TikTok Shop fulfillment and scaled their businesses.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='bg-brand-purple-500 hover:bg-brand-purple-600'>
              Start Your Free Trial
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg'>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BentoAboutPage;
