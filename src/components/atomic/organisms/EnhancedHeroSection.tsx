/**
 * EnhancedHeroSection - CreatorFlow Three.js Integration
 *
 * Organism component combining Three.js animation with sophisticated underlay system.
 * Provides enhanced content readability and premium visual effects.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import HPHero from '../../../design-system/prototypes/homepage/HP-Hero';
import ThreeJSHeroAnimation from './ThreeJS-HeroAnimation';

export interface EnhancedHeroSectionProps {
  theme: 'light' | 'dark';
  className?: string;
  showThreeJS?: boolean;
  showFloatingElements?: boolean;
  performanceMode?: 'high' | 'medium' | 'low';
}

/**
 * Enhanced Hero Section Component
 *
 * Combines Three.js background animation with sophisticated content overlay system
 */
export const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({
  theme,
  className = '',
  showThreeJS = true,
  showFloatingElements = true,
  performanceMode = 'high',
}) => {
  const sectionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  } as const;

  const elementVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  } as const;

  return (
    <motion.section
      className={`relative min-h-screen overflow-hidden ${className}`}
      variants={sectionVariants}
      initial='hidden'
      animate='visible'
      transition={{
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }}
    >
      {/* Three.js Animation Background - Hero Section Only */}
      {showThreeJS && (
        <motion.div
          className='absolute inset-0 z-0'
          variants={elementVariants}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <ThreeJSHeroAnimation
            theme={theme}
            performanceMode={performanceMode}
            showLoadingIndicator={true}
            showWebGLFallback={true}
          />
        </motion.div>
      )}

      {/* Sophisticated Underlay System for Enhanced Visibility */}
      <motion.div className='absolute inset-0 z-10' variants={elementVariants}>
        {/* Base Gradient Overlay */}
        <div
          className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-black/40 via-transparent to-black/60'
              : 'bg-gradient-to-br from-white/20 via-transparent to-white/35'
          }`}
        />

        {/* Light Theme Enhanced Underlay System - Optimized for Three.js Visibility */}
        {theme === 'light' && (
          <>
            {/* Primary Strategic Backdrop - Balanced for Three.js Elements */}
            <div className='bg-gradient-radial-hero from-white/8 will-change-opacity absolute inset-0 via-white/15 to-white/35' />

            {/* Content Area Lightening - Top and Bottom Zones */}
            <div className='via-white/28 absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-white/45 to-transparent contain-paint' />
            <div className='via-white/32 absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/50 to-transparent contain-paint' />

            {/* Refined Noise Texture for Depth */}
            <div
              className='absolute inset-0 opacity-[0.08] mix-blend-soft-light will-change-transform'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
              }}
            />

            {/* Central Three.js Zone - Minimal Interference */}
            <div className='inset-x-1/5 bg-gradient-radial to-white/12 absolute bottom-1/4 top-1/4 from-transparent via-white/5 backdrop-blur-[0.1px] contain-layout' />

            {/* Enhanced Vignette - Softer Edges */}
            <div className='bg-gradient-radial-vignette will-change-opacity absolute inset-0 from-transparent via-transparent to-slate-200/20' />

            {/* Header and Footer Content Zones - Strong Contrast */}
            <div className='from-white/48 absolute left-0 right-0 top-8 h-48 bg-gradient-to-b via-white/25 to-transparent opacity-90 contain-paint' />
            <div className='left-1/6 right-1/6 absolute bottom-8 h-40 bg-gradient-to-t from-white/45 via-white/25 to-transparent opacity-85 contain-paint' />

            {/* Edge Blending for Natural Transitions */}
            <div className='absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/45 to-transparent' />
            <div className='absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/50 to-transparent' />

            {/* Side Content Enhancement */}
            <div className='absolute bottom-1/4 left-0 top-1/4 w-1/6 bg-gradient-to-r from-white/25 to-transparent opacity-70' />
            <div className='absolute bottom-1/4 right-0 top-1/4 w-1/6 bg-gradient-to-l from-white/25 to-transparent opacity-70' />
          </>
        )}

        {/* Dark Theme Enhancements (Subtle) */}
        {theme === 'dark' && (
          <>
            {/* Enhanced depth and atmosphere for dark mode */}
            <div className='bg-gradient-radial-hero from-violet-950/12 will-change-opacity absolute inset-0 via-transparent to-black/25' />
            <div className='via-black/12 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent contain-paint' />

            {/* Subtle violet glow enhancement for Three.js elements */}
            <div className='bg-gradient-radial absolute inset-0 from-violet-900/[0.03] via-transparent to-transparent' />

            {/* Edge enhancement for better contrast */}
            <div className='absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent' />
          </>
        )}
      </motion.div>

      {/* Hero Content */}
      <motion.div className='relative z-20' variants={elementVariants}>
        <HPHero />
      </motion.div>

      {/* Floating Elements for Enhanced UX */}
      {showFloatingElements && (
        <>
          <motion.div
            className='absolute left-8 top-1/4 z-30'
            variants={elementVariants}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className='h-2 w-2 rounded-full bg-violet-400 blur-sm' />
          </motion.div>

          <motion.div
            className='absolute bottom-1/4 right-12 z-30'
            variants={elementVariants}
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <Sparkles className='h-4 w-4 text-violet-300/50' />
          </motion.div>

          <motion.div
            className='absolute right-1/4 top-1/3 z-30'
            variants={elementVariants}
            animate={{
              x: [0, 10, 0],
              y: [0, -5, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className='h-1.5 w-1.5 rounded-full bg-purple-400 blur-sm' />
          </motion.div>
        </>
      )}

      {/* Performance Indicator for Development */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          className='absolute bottom-4 left-4 z-50 rounded-lg border border-border/20 bg-background/80 px-3 py-2 text-xs backdrop-blur-sm'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className='font-medium text-foreground'>Enhanced Hero Section</div>
          <div className='text-muted-foreground'>
            Theme: {theme} | Three.js: {showThreeJS ? 'Active' : 'Disabled'}
          </div>
        </motion.div>
      )}

      {/* Global Styles for Advanced Gradients */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        .bg-gradient-radial-hero {
          background: radial-gradient(ellipse 120% 80% at 50% 30%, var(--tw-gradient-stops));
        }

        .bg-gradient-radial-vignette {
          background: radial-gradient(ellipse 150% 100% at 50% 50%, var(--tw-gradient-stops));
        }

        .mix-blend-soft-light {
          mix-blend-mode: soft-light;
        }

        .will-change-transform {
          will-change: transform;
        }

        .will-change-opacity {
          will-change: opacity;
        }

        .contain-layout {
          contain: layout;
        }

        .contain-paint {
          contain: paint;
        }
      `}</style>
    </motion.section>
  );
};

/**
 * Simplified Enhanced Hero Section for basic usage
 */
export const SimpleEnhancedHeroSection: React.FC<{
  theme: 'light' | 'dark';
  className?: string;
}> = ({ theme, className = '' }) => {
  return (
    <EnhancedHeroSection
      theme={theme}
      className={className}
      showThreeJS={true}
      showFloatingElements={false}
      performanceMode='medium'
    />
  );
};

export default EnhancedHeroSection;
