/**
 * ThemeToggleButton - CreatorFlow Three.js Integration
 *
 * Molecular component for premium theme switching with ambient glow effects.
 * Features enhanced UX animations and accessibility compliance.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export interface ThemeToggleButtonProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const positionClasses = {
  'bottom-left': 'bottom-8 left-8',
  'bottom-right': 'bottom-8 right-8',
  'top-left': 'top-8 left-8',
  'top-right': 'top-8 right-8',
} as const;

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20',
} as const;

const iconSizes = {
  sm: 20,
  md: 26,
  lg: 32,
} as const;

/**
 * ThemeToggleButton Component
 *
 * Premium floating theme toggle with ambient glow and sparkle effects
 */
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  theme,
  onToggle,
  className = '',
  position = 'bottom-left',
  showLabel = true,
  size = 'md',
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const buttonVariants = {
    initial: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
    },
    hover: {
      scale: 1.05,
      y: -2,
    },
    tap: {
      scale: 0.95,
      y: 0,
    },
  } as const;

  const iconVariants = {
    hidden: {
      y: theme === 'dark' ? -30 : 30,
      opacity: 0,
      rotate: theme === 'dark' ? -180 : 180,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: {
      y: theme === 'dark' ? 30 : -30,
      opacity: 0,
      rotate: theme === 'dark' ? 180 : -180,
      scale: 0.5,
    },
  } as const;

  const labelPosition = position.includes('left') ? 'right' : 'left';

  return (
    <motion.div
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      variants={buttonVariants}
      initial='initial'
      animate='animate'
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1.2,
      }}
    >
      {/* Ambient Glow Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-violet-600/20'
            : 'bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-violet-400/30'
        }`}
        animate={{
          scale: isHovering ? [1, 1.3, 1] : 1,
          opacity: isHovering ? [0.3, 0.6, 0.3] : 0.2,
        }}
        transition={{
          duration: isHovering ? 2 : 0.3,
          repeat: isHovering ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Main Button */}
      <motion.button
        onClick={onToggle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative flex ${
          sizeClasses[size]
        } items-center justify-center rounded-full border-2 backdrop-blur-2xl transition-all duration-300 ${
          theme === 'dark'
            ? 'border-violet-400/30 bg-gradient-to-br from-black/40 via-violet-950/30 to-black/40 text-violet-300 shadow-[0_8px_32px_rgba(139,92,246,0.15)]'
            : 'border-violet-300/40 bg-gradient-to-br from-white/60 via-violet-50/40 to-white/60 text-violet-700 shadow-[0_8px_32px_rgba(109,40,217,0.12)]'
        } hover:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-background`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        variants={buttonVariants}
        whileHover='hover'
        whileTap='tap'
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Inner Glow */}
        <motion.div
          className={`absolute inset-1 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-violet-600/10 via-transparent to-purple-600/10'
              : 'bg-gradient-to-br from-violet-400/15 via-transparent to-purple-400/15'
          }`}
          animate={{
            opacity: isHovering ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{
            duration: 2,
            repeat: isHovering ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Icon Container */}
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={theme}
            className='relative z-10'
            variants={iconVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {theme === 'dark' ? (
              <motion.div
                animate={{
                  rotate: isHovering ? [0, 360] : 0,
                }}
                transition={{
                  duration: isHovering ? 8 : 0,
                  repeat: isHovering ? Infinity : 0,
                  ease: 'linear',
                }}
              >
                <Sun size={iconSizes[size]} strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                animate={{
                  rotate: isHovering ? [0, -15, 15, 0] : 0,
                }}
                transition={{
                  duration: isHovering ? 2 : 0,
                  repeat: isHovering ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                <Moon size={iconSizes[size]} strokeWidth={1.5} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sparkle Effects */}
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.div
                className={`absolute -right-1 -top-1 h-2 w-2 rounded-full ${
                  theme === 'dark' ? 'bg-violet-400' : 'bg-violet-600'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className={`absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full ${
                  theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, -3, 0],
                  y: [0, 3, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Theme Label */}
      {showLabel && (
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 ${
            labelPosition === 'right' ? '-right-20' : '-left-20'
          } ${
            theme === 'dark'
              ? 'border border-violet-500/20 bg-black/30 text-violet-300'
              : 'border border-violet-300/30 bg-white/30 text-violet-700'
          }`}
          initial={{ opacity: 0, x: labelPosition === 'right' ? -10 : 10 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            x: isHovering ? 0 : labelPosition === 'right' ? -10 : 10,
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'none' }}
        >
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ThemeToggleButton;
