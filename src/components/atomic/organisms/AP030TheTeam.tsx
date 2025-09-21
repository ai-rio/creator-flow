'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  philosophy: string;
  imageUrl: string;
}

// Animation variants with GPU acceleration
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Team member card component
const TeamMemberCard = React.memo(({ member }: { member: TeamMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className='relative h-[450px] w-80 rounded-3xl p-px will-change-transform'
      style={{
        perspective: '1000px',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <motion.div
        className='absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 to-purple-500/10 dark:from-teal-500/20 dark:to-purple-500/20'
        variants={glowVariants}
        animate={isHovered ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.div
        style={{ rotateY: isHovered ? 0 : -15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className='relative h-full w-full rounded-[23px] border border-slate-300 bg-white/50 p-6 backdrop-blur-xl dark:border-slate-100/10 dark:bg-black/30'
      >
        <div className='flex h-full flex-col'>
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={160}
            height={160}
            className='h-40 w-40 rounded-full border-2 border-slate-300 object-cover dark:border-slate-100/10'
          />
          <h3 className='mt-4 text-2xl font-bold text-slate-900 dark:text-white'>{member.name}</h3>
          <p className='font-semibold text-teal-400'>{member.role}</p>
          <div className='my-4 h-px flex-shrink-0 bg-slate-300 dark:bg-slate-100/10' />
          <p className='flex-grow text-lg italic text-slate-600 dark:text-slate-400'>
            &ldquo;{member.philosophy}&rdquo;
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

// Main component
export function AP030TheTeam() {
  const t = useTranslations('components.atomic.organisms.AP030TheTeam');

  // Team members data with translations
  const teamMembers: TeamMember[] = [
    {
      name: t('members.alex.name', { fallback: 'Alex Thorne' }),
      role: t('members.alex.role', { fallback: 'Lead Systems Architect' }),
      philosophy: t('members.alex.philosophy', {
        fallback:
          "A system's elegance is measured by its resilience under maximum pressure. We built CreatorFlow to be unbreakable during a viral storm.",
      }),
      imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=AT',
    },
    {
      name: t('members.lena.name', { fallback: 'Dr. Lena Petrova' }),
      role: t('members.lena.role', { fallback: 'Growth Intelligence' }),
      philosophy: t('members.lena.philosophy', {
        fallback:
          'Data is useless noise. Actionable wisdom is the only metric that matters. My work is to turn raw data into your next strategic move.',
      }),
      imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=LP',
    },
    {
      name: t('members.marcus.name', { fallback: 'Marcus Cole' }),
      role: t('members.marcus.role', { fallback: 'Creator Experience Lead' }),
      philosophy: t('members.marcus.philosophy', {
        fallback:
          'Every click, every pixel, every interaction is either adding to the chaos or contributing to command. There is no middle ground.',
      }),
      imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=MC',
    },
    {
      name: t('members.sofia.name', { fallback: 'Sofia Chen' }),
      role: t('members.sofia.role', { fallback: 'Automation & Fulfillment' }),
      philosophy: t('members.sofia.philosophy', {
        fallback:
          'We automate the predictable so our creators can master the unpredictable. Repetitive tasks are the enemy of creative growth.',
      }),
      imageUrl: 'https://placehold.co/500x500/0A090F/FFF?text=SC',
    },
  ];

  return (
    <section className='relative bg-gradient-to-br from-background via-muted/5 to-background py-16 sm:py-24'>
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-8 overflow-hidden px-4 py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-center'
        >
          <h2 className='text-5xl font-black text-foreground md:text-7xl'>
            {t('hero.title', { fallback: 'The Minds Behind the Machine.' })}
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl'>
            {t('hero.description', {
              fallback:
                'CreatorFlow is the product of a collective obsession. Meet the architects who fused enterprise-grade engineering with an intimate understanding of the creator economy.',
            })}
          </p>
        </motion.div>

        <motion.div
          className='flex w-full justify-center pt-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AP030TheTeam;
