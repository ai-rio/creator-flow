/**
 * EnhancedContentSection - CreatorFlow Three.js Integration
 *
 * Organism component for enhanced content sections with improved animations
 * and staggered reveal effects. Optimized for use with Three.js backgrounds.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface EnhancedContentSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'stagger';
  animationDelay?: number;
  viewportMargin?: string;
  backgroundStyle?: 'transparent' | 'subtle' | 'enhanced';
  enableParallax?: boolean;
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
} as const;

const backgroundStyles = {
  transparent: '',
  subtle: 'bg-background/30 backdrop-blur-sm',
  enhanced:
    'bg-gradient-to-br from-background/40 via-background/20 to-background/40 backdrop-blur-md border border-border/10 rounded-lg',
};

/**
 * Enhanced Content Section Component
 *
 * Provides enhanced animations and visual effects for content sections
 */
export const EnhancedContentSection: React.FC<EnhancedContentSectionProps> = ({
  children,
  className = '',
  animationType = 'slide',
  animationDelay = 0,
  viewportMargin = '-10%',
  backgroundStyle = 'transparent',
  enableParallax = false,
}) => {
  const sectionVariants = animationVariants[animationType];

  const parallaxVariants = enableParallax
    ? {
        hidden: { y: 0 },
        visible: { y: -20 },
        scrolled: { y: 20 },
      }
    : undefined;

  const getTransition = () => {
    switch (animationType) {
      case 'stagger':
        return {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1] as any,
          staggerChildren: 0.1,
          delayChildren: 0.2,
        };
      default:
        return {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1] as any,
        };
    }
  };

  return (
    <motion.section
      className={`relative ${backgroundStyles[backgroundStyle]} ${className}`}
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: viewportMargin }}
      transition={getTransition()}
      style={{
        // Add parallax transform if enabled
        ...(enableParallax && {
          willChange: 'transform',
        }),
      }}
    >
      {/* Parallax Container */}
      {enableParallax && parallaxVariants ? (
        <motion.div
          variants={parallaxVariants}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as any,
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}

      {/* Enhanced Background Effects */}
      {backgroundStyle === 'enhanced' && (
        <>
          {/* Subtle glow effect */}
          <motion.div
            className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-secondary/5'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: animationDelay }}
            viewport={{ once: true }}
          />

          {/* Animated border effect */}
          <motion.div
            className='absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-secondary/20'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: animationDelay + 0.2,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
          />
        </>
      )}
    </motion.section>
  );
};

/**
 * Staggered Content Wrapper
 * Provides staggered animations for child elements
 */
export const StaggeredContentWrapper: React.FC<{
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  const staggerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  } as const;

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-5%' }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1] as any,
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

/**
 * Fade-in Content Section
 */
export const FadeInContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <EnhancedContentSection animationType='fade' animationDelay={delay} className={className}>
      {children}
    </EnhancedContentSection>
  );
};

/**
 * Slide-in Content Section
 */
export const SlideInContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <EnhancedContentSection animationType='slide' animationDelay={delay} className={className}>
      {children}
    </EnhancedContentSection>
  );
};

/**
 * Scale-in Content Section
 */
export const ScaleInContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <EnhancedContentSection animationType='scale' animationDelay={delay} className={className}>
      {children}
    </EnhancedContentSection>
  );
};

/**
 * Parallax Content Section
 */
export const ParallaxContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  backgroundStyle?: EnhancedContentSectionProps['backgroundStyle'];
}> = ({ children, className = '', backgroundStyle = 'subtle' }) => {
  return (
    <EnhancedContentSection
      animationType='slide'
      enableParallax={true}
      backgroundStyle={backgroundStyle}
      className={className}
    >
      {children}
    </EnhancedContentSection>
  );
};

/**
 * Enhanced Section with Three.js Optimizations
 */
export const ThreeJSOptimizedContentSection: React.FC<{
  children: ReactNode;
  className?: string;
  theme: 'light' | 'dark';
}> = ({ children, className = '', theme }) => {
  return (
    <EnhancedContentSection
      animationType='stagger'
      backgroundStyle='subtle'
      className={`${className} ${theme === 'dark' ? 'border-white/5 bg-black/20' : 'border-black/5 bg-white/30'}`}
      viewportMargin='-15%'
    >
      {children}
    </EnhancedContentSection>
  );
};

export default EnhancedContentSection;
