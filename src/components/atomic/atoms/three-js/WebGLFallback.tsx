/**
 * WebGLFallback - CreatorFlow Three.js Integration
 *
 * Atomic component providing graceful fallback when WebGL is not supported.
 * Displays informative message with alternative options and maintains visual hierarchy.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, Monitor, Smartphone } from 'lucide-react';

export interface WebGLFallbackProps {
  className?: string;
  showTechnicalDetails?: boolean;
  onDismiss?: () => void;
}

/**
 * WebGLFallback Component
 *
 * Provides user-friendly fallback UI when WebGL is not available
 */
export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  className = '',
  showTechnicalDetails = false,
  onDismiss,
}) => {
  const fallbackVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  } as const;

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  } as const;

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {/* Background Overlay */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-background/95 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <motion.div
        className='relative z-10 mx-4 max-w-md rounded-lg border border-border/20 bg-card/95 p-6 text-center shadow-lg backdrop-blur-sm'
        variants={fallbackVariants}
        initial='hidden'
        animate='visible'
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          staggerChildren: 0.1,
          delayChildren: 0.2,
        }}
      >
        {/* Icon */}
        <motion.div
          variants={itemVariants}
          className='bg-warning/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <AlertTriangle className='text-warning h-8 w-8' />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3 variants={itemVariants} className='mb-2 text-lg font-semibold text-foreground'>
          3D Animation Unavailable
        </motion.h3>

        {/* Description */}
        <motion.p variants={itemVariants} className='mb-4 text-sm text-muted-foreground'>
          Your browser doesn&apos;t support WebGL, which is required for our advanced 3D animations. The core
          functionality of CreatorFlow remains fully available.
        </motion.p>

        {/* Recommendations */}
        <motion.div variants={itemVariants} className='mb-4 rounded-md bg-muted/50 p-3'>
          <div className='mb-2 flex items-center gap-2'>
            <Info className='h-4 w-4 text-primary' />
            <span className='text-sm font-medium text-foreground'>Recommended browsers:</span>
          </div>
          <div className='grid grid-cols-2 gap-2 text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Monitor className='h-3 w-3' />
              Chrome 57+
            </div>
            <div className='flex items-center gap-1'>
              <Monitor className='h-3 w-3' />
              Firefox 51+
            </div>
            <div className='flex items-center gap-1'>
              <Monitor className='h-3 w-3' />
              Safari 11+
            </div>
            <div className='flex items-center gap-1'>
              <Smartphone className='h-3 w-3' />
              Mobile browsers
            </div>
          </div>
        </motion.div>

        {/* Technical Details (Optional) */}
        {showTechnicalDetails && (
          <motion.div variants={itemVariants} className='mb-4 rounded-md bg-destructive/5 p-3 text-left'>
            <div className='text-xs text-muted-foreground'>
              <div className='mb-1 font-medium'>Technical Details:</div>
              <ul className='list-inside list-disc space-y-1'>
                <li>WebGL context creation failed</li>
                <li>Hardware acceleration may be disabled</li>
                <li>Graphics drivers may need updating</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div variants={itemVariants} className='flex flex-col gap-2 sm:flex-row'>
          <motion.button
            className='flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retry
          </motion.button>
          {onDismiss && (
            <motion.button
              className='flex-1 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50'
              onClick={onDismiss}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className='absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-primary/20'
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-secondary/30'
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

/**
 * Minimal WebGL fallback for inline use
 */
export const MinimalWebGLFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className='text-center text-muted-foreground'>
        <AlertTriangle className='text-warning mx-auto mb-2 h-8 w-8' />
        <p className='text-sm'>3D animation requires WebGL support</p>
      </div>
    </div>
  );
};

export default WebGLFallback;
