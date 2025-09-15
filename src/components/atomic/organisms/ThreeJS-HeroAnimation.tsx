/**
 * ThreeJS-HeroAnimation - CreatorFlow Three.js Integration
 *
 * Organism component for the sophisticated Aortic Vessel animation system.
 * Provides the main Three.js animation with WebGL fallback and performance optimization.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';

import WebGLFallback from '@/components/atomic/atoms/three-js/WebGLFallback';
import { ThreeJSLoadingStates } from '@/components/atomic/molecules/LoadingIndicator';
import { useThreeJS } from '@/hooks/use-three-js';

export interface ThreeJSHeroAnimationProps {
  theme: 'light' | 'dark';
  className?: string;
  showLoadingIndicator?: boolean;
  showWebGLFallback?: boolean;
  performanceMode?: 'high' | 'medium' | 'low';
  particleCount?: number;
}

/**
 * ThreeJS-HeroAnimation Component
 *
 * Main Three.js animation component with full error handling and performance optimization
 */
export const ThreeJSHeroAnimation: React.FC<ThreeJSHeroAnimationProps> = ({
  theme,
  className = '',
  showLoadingIndicator = true,
  showWebGLFallback = true,
  performanceMode = 'high',
  particleCount,
}) => {
  const { containerRef, isLoading, isLoaded, error, hasWebGL, retry } = useThreeJS(theme, {
    enabled: true,
    autoResize: true,
    performanceMonitoring: true,
    performanceMode,
    particleCount,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.05,
    },
  } as const;

  return (
    <motion.div
      className={`absolute inset-0 z-0 ${className}`}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className='absolute inset-0 h-full w-full'
        data-engine='three.js'
        style={{
          minHeight: '100vh',
          background: 'transparent',
        }}
      />

      {/* Loading States */}
      <AnimatePresence mode='wait'>
        {showLoadingIndicator && isLoading && <ThreeJSLoadingStates.Loading key='loading' />}

        {showLoadingIndicator && isLoaded && (
          <motion.div
            key='loaded'
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <ThreeJSLoadingStates.Initializing />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error States */}
      <AnimatePresence>
        {error && !hasWebGL && showWebGLFallback && (
          <motion.div
            key='webgl-fallback'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WebGLFallback
              showTechnicalDetails={false}
              onDismiss={() => {
                // Optional: Could hide the fallback if user dismisses
                console.log('WebGL fallback dismissed');
              }}
            />
          </motion.div>
        )}

        {error && hasWebGL && <ThreeJSLoadingStates.Error key='error' message={`Three.js Error: ${error}`} />}
      </AnimatePresence>

      {/* Performance Indicator (Development) */}
      {process.env.NODE_ENV === 'development' && isLoaded && (
        <motion.div
          className='absolute left-2 top-2 z-10 rounded bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div>Three.js Active</div>
          <div className='text-[10px] opacity-60'>
            Mode: {performanceMode} | Particles: {particleCount || 'auto'}
          </div>
        </motion.div>
      )}

      {/* Retry Button for Errors */}
      {error && (
        <motion.button
          className='absolute bottom-4 right-4 z-10 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-primary/90'
          onClick={retry}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          Retry 3D Animation
        </motion.button>
      )}

      {/* Canvas Attribution */}
      {isLoaded && (
        <motion.div
          className='pointer-events-none absolute bottom-2 right-2 z-10 text-[10px] text-foreground/30'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Powered by Three.js
        </motion.div>
      )}
    </motion.div>
  );
};

/**
 * Simplified Three.js Hero Animation for basic usage
 */
export const SimpleThreeJSHeroAnimation: React.FC<{
  theme: 'light' | 'dark';
  className?: string;
}> = ({ theme, className = '' }) => {
  return (
    <ThreeJSHeroAnimation
      theme={theme}
      className={className}
      showLoadingIndicator={false}
      showWebGLFallback={false}
      performanceMode='medium'
    />
  );
};

/**
 * Performance-optimized Three.js Hero Animation for mobile
 */
export const MobileThreeJSHeroAnimation: React.FC<{
  theme: 'light' | 'dark';
  className?: string;
}> = ({ theme, className = '' }) => {
  return (
    <ThreeJSHeroAnimation
      theme={theme}
      className={className}
      performanceMode='low'
      particleCount={300}
      showLoadingIndicator={true}
      showWebGLFallback={true}
    />
  );
};

export default ThreeJSHeroAnimation;
