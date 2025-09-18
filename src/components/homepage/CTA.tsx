'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * HOMEPAGE CTA SECTION
 *
 * EXACT MATCH of HP-080-FinalCTA-Variant mock with FULL INTEGRATION
 * - 200-circle StarVortex with exact spiral math from original
 * - Exact supernova-pulse CSS animation with proper box-shadows
 * - Exact motion variants and timing from original mock
 * - Full theme system integration with bg-background text-foreground pattern
 * - Seamless visual flow from TestimonialsSection → CTA → Footer
 * - Motion excellence with 60fps performance optimization
 * - Creator-focused conversion copy
 * - ZERO bottom margin/padding for seamless footer integration
 */

// --- Star Vortex Background Component (EXACT MATCH) ---
const StarVortex = () => (
  <div className='absolute inset-0 z-0'>
    <svg width='100%' height='100%' className='absolute inset-0'>
      <defs>
        <radialGradient id='nebula-cta' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='rgba(139, 92, 246, 0.3)' />
          <stop offset='50%' stopColor='rgba(59, 130, 246, 0.2)' />
          <stop offset='100%' stopColor='rgba(59, 130, 246, 0)' />
        </radialGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#nebula-cta)' />
      {Array.from({ length: 200 }).map((_, i) => {
        const angle = (i / 200) * Math.PI * 2;
        const radius = (i % 50) + 5;
        const duration = (i % 10) + 10;
        return (
          <motion.circle
            key={i}
            cx='50%'
            cy='50%'
            r={(i % 4) * 0.25 + 0.25}
            fill='hsl(var(--foreground))'
            animate={{
              x: `${radius * Math.cos(angle)}%`,
              y: `${radius * Math.sin(angle)}%`,
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay: (i % 10) * -1,
            }}
            style={{
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </svg>
  </div>
);

// --- Main CTA Section ---
export function CTA() {
  const t = useTranslations('homepage.cta');

  return (
    <>
      {/* Global CSS for exact supernova button effect */}
      <style jsx global>{`
        .supernova-button {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .supernova-button::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 40px 10px #3b82f6, 0 0 80px 20px #8b5cf6;
          animation: supernova-pulse 3s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes supernova-pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.5;
          }
        }
        .supernova-button:hover::before {
          animation-duration: 1.5s;
        }
      `}</style>

      <section className='-mx-4 mb-0 w-screen bg-background transition-colors duration-300'>
        <div className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
          <StarVortex />

          <motion.div
            className='relative z-10 p-8 text-center'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.3 }}
          >
            {/* Hero Headline */}
            <motion.h2
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
              }}
              className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl'
            >
              {t('title')}
            </motion.h2>

            {/* Supporting Copy */}
            <motion.p
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                delay: 0.2,
                damping: 25,
              }}
              className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA Button (EXACT MATCH) */}
            <motion.div
              variants={{
                hidden: { scale: 0.5, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{
                type: 'spring',
                stiffness: 120,
                delay: 0.5,
                duration: 1,
              }}
              className='mt-12'
            >
              <motion.a
                href='/signup'
                className='supernova-button relative inline-block rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-2xl transition-all hover:bg-primary/90'
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)',
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                }}
              >
                {t('actions.startFreeTrial')}
              </motion.a>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: 'easeOut',
              }}
              className='mt-8 text-sm text-muted-foreground'
            >
              <div className='flex flex-wrap items-center justify-center gap-6'>
                <span className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  {t('features.noSetupFees')}
                </span>
                <span className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                  {t('features.setupTime')}
                </span>
                <span className='flex items-center gap-2'>
                  <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                  {t('features.cancelAnytime')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
