/**
 * LoadingIndicator - CreatorFlow Three.js Integration
 *
 * Molecular component for professional loading states with enhanced animations.
 * Provides multiple loading patterns for different use cases.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles, Zap } from 'lucide-react';

export interface LoadingIndicatorProps {
  variant?: 'default' | 'threejs' | 'sparkle' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  position?: 'center' | 'top-right' | 'bottom-center';
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
} as const;

const positionClasses = {
  center: 'inset-0 flex items-center justify-center',
  'top-right': 'top-4 right-4',
  'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
} as const;

/**
 * Default spinner loading indicator
 */
const DefaultLoader: React.FC<{ size: keyof typeof sizeClasses }> = ({ size }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <Loader2 className={`${sizeClasses[size]} text-primary`} />
  </motion.div>
);

/**
 * Three.js themed loading indicator
 */
const ThreeJSLoader: React.FC<{ size: keyof typeof sizeClasses }> = ({ size }) => (
  <div className='flex items-center space-x-1'>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`rounded-full bg-gradient-to-r from-violet-500 to-purple-500 ${
          size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

/**
 * Sparkle loading indicator
 */
const SparkleLoader: React.FC<{ size: keyof typeof sizeClasses }> = ({ size }) => (
  <motion.div
    animate={{
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <Sparkles className={`${sizeClasses[size]} text-violet-500`} />
  </motion.div>
);

/**
 * Minimal loading indicator
 */
const MinimalLoader: React.FC<{ size: keyof typeof sizeClasses }> = ({ size }) => (
  <motion.div
    className={`rounded-full border-2 border-muted border-t-primary ${sizeClasses[size]}`}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

/**
 * LoadingIndicator Component
 *
 * Professional loading states with multiple variants and animations
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  variant = 'default',
  size = 'md',
  message,
  className = '',
  position = 'center',
}) => {
  const renderLoader = () => {
    switch (variant) {
      case 'threejs':
        return <ThreeJSLoader size={size} />;
      case 'sparkle':
        return <SparkleLoader size={size} />;
      case 'minimal':
        return <MinimalLoader size={size} />;
      default:
        return <DefaultLoader size={size} />;
    }
  };

  const containerClasses =
    position === 'center'
      ? 'fixed inset-0 flex items-center justify-center z-50'
      : `fixed ${positionClasses[position]} z-50`;

  return (
    <motion.div
      className={`${containerClasses} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      <div className='flex items-center gap-3 rounded-lg border border-border/20 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm'>
        {renderLoader()}
        {message && (
          <motion.span
            className='text-sm text-foreground/80'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Inline loading indicator for component states
 */
export const InlineLoadingIndicator: React.FC<{
  variant?: LoadingIndicatorProps['variant'];
  size?: LoadingIndicatorProps['size'];
  className?: string;
}> = ({ variant = 'minimal', size = 'sm', className = '' }) => {
  const renderLoader = () => {
    switch (variant) {
      case 'threejs':
        return <ThreeJSLoader size={size} />;
      case 'sparkle':
        return <SparkleLoader size={size} />;
      case 'minimal':
        return <MinimalLoader size={size} />;
      default:
        return <DefaultLoader size={size} />;
    }
  };

  return <div className={`inline-flex items-center ${className}`}>{renderLoader()}</div>;
};

/**
 * Full-screen loading overlay
 */
export const FullScreenLoader: React.FC<{
  message?: string;
  variant?: LoadingIndicatorProps['variant'];
}> = ({ message = 'Loading...', variant = 'threejs' }) => (
  <motion.div
    className='fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className='flex flex-col items-center gap-4 rounded-lg border border-border/20 bg-card/95 p-8 shadow-xl backdrop-blur-sm'
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <LoadingIndicator variant={variant} size='lg' />
      <p className='text-sm text-muted-foreground'>{message}</p>
    </motion.div>
  </motion.div>
);

/**
 * Three.js specific loading states
 */
export const ThreeJSLoadingStates = {
  Loading: () => <LoadingIndicator variant='threejs' message='Loading Three.js...' position='top-right' />,
  Initializing: () => <LoadingIndicator variant='sparkle' message='Initializing 3D Scene...' position='top-right' />,
  Error: ({ message = 'Failed to load 3D graphics' }: { message?: string }) => (
    <motion.div
      className='fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm shadow-lg'
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
    >
      <Zap className='h-4 w-4 text-destructive' />
      <span className='text-destructive'>{message}</span>
    </motion.div>
  ),
};

export default LoadingIndicator;
