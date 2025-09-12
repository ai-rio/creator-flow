'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import React, { useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const defaultTestimonials = [
  {
    text: 'MVPBlocks has completely changed the way I build UIs. Copy-paste, done. No more design stress.',
    imageSrc: 'https://i.pravatar.cc/150?img=1',
    name: 'Arjun Mehta',
    username: '@arjdev',
    role: 'Frontend Developer',
  },
  {
    text: 'Honestly shocked at how smooth the animations and styling are out of the box. Just works.',
    imageSrc: 'https://i.pravatar.cc/150?img=2',
    name: 'Sara Lin',
    username: '@sara.codes',
    role: 'UX Designer',
  },
  {
    text: 'Our team launched a client site in 2 days using MVPBlocks. Saved so much time.',
    imageSrc: 'https://i.pravatar.cc/150?img=3',
    name: 'Devon Carter',
    username: '@devninja',
    role: 'Product Manager',
  },
  {
    text: 'Plugged a few blocks into our existing codebase and everything blended perfectly. Massive W.',
    imageSrc: 'https://i.pravatar.cc/150?img=4',
    name: 'Priya Shah',
    username: '@priyacodes',
    role: 'Full Stack Developer',
  },
  {
    text: 'Found a beautiful hero section, dropped it into V0, tweaked copy, and shipped in 15 minutes.',
    imageSrc: 'https://i.pravatar.cc/150?img=5',
    name: 'Leo Martin',
    username: '@leobuilds',
    role: 'Startup Founder',
  },
  {
    text: 'MVPBlocks helped us prototype multiple landing pages without writing CSS once.',
    imageSrc: 'https://i.pravatar.cc/150?img=6',
    name: 'Chloe Winters',
    username: '@chloewinters',
    role: 'UI Designer',
  },
];

interface TestimonialProps {
  testimonials?: {
    text: string;
    imageSrc: string;
    name: string;
    username: string;
    role?: string;
  }[];
  title?: string;
  subtitle?: string;
  autoplaySpeed?: number;
  className?: string;
}

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  title = 'What our users say',
  subtitle = 'From intuitive design to powerful features, our components have become essential tools for developers around the world.',
  autoplaySpeed = 4000,
  className,
}: TestimonialProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    dragFree: false,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  useEffect(() => {
    if (!emblaApi) return;

    // Continuous autoplay functionality - no manual controls
    let autoplayTimer: NodeJS.Timeout;

    const startAutoplay = () => {
      autoplayTimer = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0); // Smooth loop back to start
        }
      }, autoplaySpeed);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    };

    // Start continuous autoplay immediately
    startAutoplay();

    // Pause on user interaction, resume after interaction ends
    let resumeTimer: NodeJS.Timeout;

    const handlePointerDown = () => {
      stopAutoplay();
    };

    const handlePointerUp = () => {
      // Resume autoplay after a short delay when user stops interacting
      resumeTimer = setTimeout(() => {
        startAutoplay();
      }, 1000);
    };

    emblaApi.on('pointerDown', handlePointerDown);
    emblaApi.on('pointerUp', handlePointerUp);

    return () => {
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      emblaApi.off('pointerDown', handlePointerDown);
      emblaApi.off('pointerUp', handlePointerUp);
    };
  }, [emblaApi, autoplaySpeed]);

  return (
    <section
      className={cn('relative overflow-hidden py-16 md:py-24', className)}
      role='region'
      aria-label='Customer testimonials'
    >
      {/* Theme-aware enhanced background with design system glassmorphism */}
      <div className='absolute inset-0 -z-10' aria-hidden='true'>
        {/* Theme-adaptive radial gradient */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.1),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.15),transparent_60%)]' />

        {/* Theme-aware brand accent gradients following design system */}
        <div className='absolute left-1/4 top-1/4 h-32 w-32 animate-nebula-drift rounded-full bg-brand-teal-primary/5 blur-3xl dark:bg-brand-teal-600/10' />
        <div className='absolute bottom-1/4 right-1/4 h-40 w-40 animate-slow-pulse rounded-full bg-brand-teal-600/10 blur-3xl dark:bg-brand-teal-400/15' />
        <div className='absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple-500/5 blur-2xl dark:bg-brand-purple-400/10' />
      </div>

      <div className='container mx-auto px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='relative mb-12 text-center md:mb-16'
        >
          {/* Theme-aware design system compliant typography with brand gradient */}
          <h1 className='mb-4 bg-gradient-to-b from-brand-teal-600 to-brand-teal-primary/60 bg-clip-text text-3xl font-bold text-transparent dark:from-brand-teal-400 dark:to-brand-teal-600/70 md:text-5xl lg:text-6xl'>
            {title}
          </h1>

          <motion.p
            className='mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Testimonials carousel - continuous scroll only */}
        <div className='relative'>
          <div className='overflow-hidden' ref={emblaRef} role='tabpanel' aria-label='Testimonials carousel'>
            <div className='flex'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className='min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]'
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      'testimonial-block relative h-full rounded-2xl p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
                      // Theme-aware background and borders
                      'border border-slate-200/50 bg-white/70 hover:shadow-brand-teal-500/20',
                      'dark:border-slate-700/30 dark:bg-slate-900/60 dark:hover:shadow-brand-teal-400/20'
                    )}
                    role='article'
                    aria-labelledby={`testimonial-author-${index}`}
                  >
                    {/* Theme-aware enhanced decorative gradients with brand colors from design system */}
                    <div
                      className='absolute -left-3 -top-3 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-brand-teal-500/10 to-transparent blur-2xl dark:from-brand-teal-400/15'
                      aria-hidden='true'
                    />
                    <div
                      className='absolute -bottom-6 -right-6 -z-10 h-24 w-24 rounded-full bg-gradient-to-tl from-brand-purple-500/5 to-transparent opacity-70 blur-xl dark:from-brand-purple-400/10'
                      aria-hidden='true'
                    />

                    {/* Theme-aware quote icon with brand color */}
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className='mb-4 text-brand-teal-600 dark:text-brand-teal-400'
                      aria-hidden='true'
                    >
                      <Quote className='h-8 w-8 opacity-60' />
                    </motion.div>

                    {/* Theme-aware testimonial text with design system typography */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className='relative mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-200 md:text-base'
                    >
                      {testimonial.text}
                    </motion.blockquote>

                    {/* Theme-aware enhanced user info with design system colors */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                      className='mt-auto flex items-center gap-3 border-t border-slate-200/50 pt-4 dark:border-slate-700/30'
                    >
                      <Avatar className='h-10 w-10 border border-brand-teal-500/30 ring-1 ring-brand-teal-500/20 ring-offset-1 ring-offset-background dark:border-brand-teal-400/30 dark:ring-brand-teal-400/20'>
                        <AvatarImage
                          src={testimonial.imageSrc}
                          alt={`Profile picture of ${testimonial.name}`}
                          className='object-cover'
                        />
                        <AvatarFallback className='dark:text-brand-teal-300 bg-brand-teal-500/10 text-sm font-medium text-brand-teal-600 dark:bg-brand-teal-400/20'>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex min-w-0 flex-col'>
                        <h4
                          id={`testimonial-author-${index}`}
                          className='truncate text-sm font-medium text-slate-800 dark:text-slate-200'
                        >
                          {testimonial.name}
                        </h4>
                        <div className='flex items-center gap-1 text-xs'>
                          <p className='truncate text-brand-teal-600/70 dark:text-brand-teal-400/70'>
                            {testimonial.username}
                          </p>
                          {testimonial.role && (
                            <>
                              <span className='text-slate-500 dark:text-slate-400' aria-hidden='true'>
                                •
                              </span>
                              <p className='truncate text-slate-600 dark:text-slate-300'>{testimonial.role}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
