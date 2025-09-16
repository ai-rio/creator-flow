'use client';

import { AnimatePresence, motion, MotionProps, useAnimation, useMotionValue, Variants } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { useMotionPreferences } from './AccessibilityMotionProvider';
import { MOTION_CONFIG, useMagnetic, useParallax } from './BentoMotion';

// ==================== MOTION ENHANCEMENT TYPES ====================

export type MotionVariant = 'hero' | 'dashboard' | 'conversion' | 'data-viz' | 'celebration';

export interface MotionEnhancementConfig {
  variant: MotionVariant;
  enableMagneticHover?: boolean;
  enableParallax?: boolean;
  enableDataFlow?: boolean;
  enableCelebration?: boolean;
  enableHoverLift?: boolean;
  enableEntranceAnimation?: boolean;
  magneticStrength?: number;
  parallaxFactor?: number;
  staggerDelay?: number;
  performanceMode?: 'high' | 'balanced' | 'low';
  celebrationTriggers?: number[];
  className?: string;
}

export interface DataFlowConfig {
  sourceElement?: string;
  targetElement?: string;
  dataType: 'order' | 'inventory' | 'revenue' | 'analytics' | 'automation';
  visualStyle: 'particle-stream' | 'energy-pulse' | 'data-beam' | 'connection-line';
  intensity: 'subtle' | 'moderate' | 'dramatic';
  duration?: number;
}

export interface CelebrationConfig {
  triggers: {
    revenue?: number[];
    orders?: number[];
    automation?: number[];
    conversion?: number[];
  };
  intensity: 'subtle' | 'moderate' | 'dramatic';
  duration: number;
  enableParticles: boolean;
  enableScreenEffect: boolean;
}

// ==================== MOTION ENHANCEMENT VARIANTS ====================

const enhancementVariants: Record<MotionVariant, Variants> = {
  hero: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...MOTION_CONFIG.springs.heroic,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: -2,
      boxShadow: '0 25px 50px -10px rgba(168, 85, 247, 0.3)',
      transition: MOTION_CONFIG.springs.energetic,
    },
  },
  dashboard: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...MOTION_CONFIG.springs.gentle,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      y: -2,
      boxShadow: '0 15px 35px -5px rgba(13, 148, 136, 0.2)',
      transition: MOTION_CONFIG.springs.responsive,
    },
  },
  conversion: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: MOTION_CONFIG.springs.energetic,
    },
    hover: {
      scale: 1.05,
      y: -6,
      boxShadow: '0 20px 40px -5px rgba(168, 85, 247, 0.4)',
      transition: MOTION_CONFIG.springs.energetic,
    },
    tap: {
      scale: 0.95,
      transition: MOTION_CONFIG.timing.quick,
    },
  },
  'data-viz': {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ...MOTION_CONFIG.springs.gentle,
        staggerChildren: 0.1,
      },
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  celebration: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: MOTION_CONFIG.springs.energetic,
    },
    celebrate: {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0],
      boxShadow: ['0 0 0px rgba(168, 85, 247, 0)', '0 0 30px rgba(168, 85, 247, 0.6)', '0 0 0px rgba(168, 85, 247, 0)'],
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
  },
};

// ==================== PARTICLE EFFECTS ====================

interface ParticleEffectProps {
  type: 'celebration' | 'data-flow' | 'success';
  intensity: 'subtle' | 'moderate' | 'dramatic';
  duration: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ type, intensity, duration, className }) => {
  const particleCount = intensity === 'subtle' ? 6 : intensity === 'moderate' ? 12 : 24;
  const particleSize = intensity === 'subtle' ? 2 : intensity === 'moderate' ? 3 : 4;

  const getParticleColor = () => {
    switch (type) {
      case 'celebration':
        return 'bg-gradient-to-r from-brand-purple-400 to-brand-teal-400';
      case 'success':
        return 'bg-gradient-to-r from-success-green-400 to-brand-teal-400';
      case 'data-flow':
        return 'bg-gradient-to-r from-brand-blue-400 to-brand-purple-400';
      default:
        return 'bg-brand-teal-400';
    }
  };

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)}>
      <AnimatePresence>
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className={cn('absolute rounded-full', getParticleColor())}
            style={{
              width: particleSize,
              height: particleSize,
              left: '50%',
              top: '50%',
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: duration,
              delay: i * 0.05,
              ease: 'easeOut',
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// ==================== DATA FLOW VISUALIZATION ====================

interface DataFlowVisualizationProps {
  config: DataFlowConfig;
  isActive: boolean;
}

const DataFlowVisualization: React.FC<DataFlowVisualizationProps> = ({ config, isActive }) => {
  const { visualStyle, intensity, duration = 2, dataType } = config;

  const getFlowColor = () => {
    switch (dataType) {
      case 'order':
        return '#8B5CF6'; // Purple
      case 'inventory':
        return '#0D94A6'; // Teal
      case 'revenue':
        return '#10B981'; // Green
      case 'analytics':
        return '#3B82F6'; // Blue
      case 'automation':
        return '#F59E0B'; // Amber
      default:
        return '#8B5CF6';
    }
  };

  if (!isActive) return null;

  if (visualStyle === 'energy-pulse') {
    return (
      <motion.div
        className='absolute inset-0 rounded-lg'
        initial={{ opacity: 0 }}
        animate={{
          boxShadow: [`0 0 0px ${getFlowColor()}00`, `0 0 20px ${getFlowColor()}80`, `0 0 0px ${getFlowColor()}00`],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  if (visualStyle === 'particle-stream') {
    return <ParticleEffect type='data-flow' intensity={intensity} duration={duration} />;
  }

  return null;
};

// ==================== MAIN MOTION ENHANCEMENT WRAPPER ====================

interface MotionEnhancementWrapperProps {
  children: React.ReactNode;
  config: MotionEnhancementConfig;
  dataFlowConfig?: DataFlowConfig;
  celebrationConfig?: CelebrationConfig;
  onAnimationComplete?: () => void;
  className?: string;
}

export const MotionEnhancementWrapper: React.FC<MotionEnhancementWrapperProps> = ({
  children,
  config,
  dataFlowConfig,
  celebrationConfig,
  onAnimationComplete,
  className,
}) => {
  const {
    variant,
    enableMagneticHover = false,
    enableParallax = false,
    enableDataFlow = false,
    enableCelebration = false,
    enableHoverLift = true,
    enableEntranceAnimation = true,
    magneticStrength = 1,
    parallaxFactor = 0.5,
    staggerDelay = 0,
    performanceMode = 'balanced',
  } = config;

  // Motion preferences and performance
  const motionPrefs = useMotionPreferences();
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [dataFlowActive, setDataFlowActive] = useState(false);

  // Motion hooks
  const magnetic = useMagnetic(magneticStrength);
  const parallax = useParallax();
  const controls = useAnimation();

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection observer for entrance animations
  useEffect(() => {
    if (!enableEntranceAnimation || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(wrapperRef.current);
    return () => observer.unobserve(wrapperRef.current!);
  }, [enableEntranceAnimation, controls, isInView]);

  // Data flow activation
  useEffect(() => {
    if (!enableDataFlow) return;

    const interval = setInterval(() => {
      setDataFlowActive(true);
      setTimeout(() => setDataFlowActive(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, [enableDataFlow]);

  // Performance optimization
  const shouldUseReducedMotion =
    motionPrefs.prefersReducedMotion || (performanceMode === 'low' && !motionPrefs.enableAnimations);

  // Simplified variants for reduced motion
  const finalVariants = shouldUseReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : enhancementVariants[variant];

  // Motion values based on enabled features
  const motionStyle = {
    x: enableMagneticHover && !shouldUseReducedMotion ? magnetic.x : undefined,
    y: enableParallax && !shouldUseReducedMotion ? parallax.y : undefined,
  };

  // Event handlers
  const handleCelebration = useCallback(() => {
    if (!enableCelebration || shouldUseReducedMotion) return;

    setIsCelebrating(true);
    controls.start('celebrate');
    setTimeout(() => {
      setIsCelebrating(false);
      controls.start('visible');
    }, 1200);
  }, [enableCelebration, controls, shouldUseReducedMotion]);

  // Trigger celebration on milestone (this would typically be triggered by parent)
  useEffect(() => {
    // This would be connected to actual metric changes in real implementation
    // For demo purposes, we can trigger celebration periodically
    if (enableCelebration && celebrationConfig) {
      // Implementation would monitor actual metrics and trigger celebration
    }
  }, [enableCelebration, celebrationConfig]);

  return (
    <motion.div
      ref={wrapperRef}
      className={cn('relative', config.className, className)}
      variants={finalVariants}
      initial={enableEntranceAnimation ? 'hidden' : 'visible'}
      animate={controls}
      whileHover={
        enableHoverLift && !shouldUseReducedMotion && enhancementVariants[variant].hover ? 'hover' : undefined
      }
      whileTap={variant === 'conversion' && !shouldUseReducedMotion ? 'tap' : undefined}
      style={motionStyle}
      transition={{
        delay: staggerDelay,
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Enhanced children with motion context */}
      <motion.div
        className='relative z-10'
        variants={
          shouldUseReducedMotion
            ? undefined
            : {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }
        }
      >
        {children}
      </motion.div>

      {/* Data flow visualization overlay */}
      {enableDataFlow && dataFlowConfig && <DataFlowVisualization config={dataFlowConfig} isActive={dataFlowActive} />}

      {/* Celebration particle effects */}
      {isCelebrating && celebrationConfig?.enableParticles && (
        <ParticleEffect
          type='celebration'
          intensity={celebrationConfig.intensity}
          duration={celebrationConfig.duration}
        />
      )}

      {/* Performance monitoring overlay (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className='absolute -top-6 right-0 text-xs opacity-50'>
          {variant} | {performanceMode} | {shouldUseReducedMotion ? 'reduced' : 'full'}
        </div>
      )}
    </motion.div>
  );
};

// ==================== HIGHER ORDER COMPONENT ====================

export function withMotionEnhancement<P extends object>(
  Component: React.ComponentType<P>,
  config: MotionEnhancementConfig
) {
  const EnhancedComponent = (props: P) => (
    <MotionEnhancementWrapper config={config}>
      <Component {...props} />
    </MotionEnhancementWrapper>
  );

  // Preserve component name for debugging
  EnhancedComponent.displayName = `withMotionEnhancement(${Component.displayName || Component.name})`;

  return EnhancedComponent;
}

// ==================== MOTION ENHANCEMENT HOOKS ====================

export function useMotionEnhancement() {
  const motionPrefs = useMotionPreferences();

  const createEnhancementConfig = (
    variant: MotionVariant,
    overrides?: Partial<MotionEnhancementConfig>
  ): MotionEnhancementConfig => ({
    variant,
    performanceMode: motionPrefs.performanceMode as 'high' | 'balanced' | 'low',
    enableMagneticHover: motionPrefs.enableHoverEffects,
    enableCelebration: motionPrefs.enableCelebrations,
    enableParallax: motionPrefs.performanceMode !== 'low',
    ...overrides,
  });

  const triggerCelebration = (metrics: { [key: string]: number }) => {
    // Implementation for triggering celebrations based on metric changes
    // This would integrate with the actual business metrics system
  };

  return {
    createEnhancementConfig,
    triggerCelebration,
    isReducedMotion: motionPrefs.prefersReducedMotion,
    performanceMode: motionPrefs.performanceMode,
  };
}

// ==================== EXPORTS ====================

export default {
  MotionEnhancementWrapper,
  withMotionEnhancement,
  useMotionEnhancement,
  ParticleEffect,
  DataFlowVisualization,
};
