'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import React, { ReactNode } from 'react';

import { useWebGLSupport } from '@/hooks/use-webgl-support';

interface ShaderWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

/**
 * Wrapper component that ensures shader components only render on the client
 * with proper WebGL support detection and graceful fallbacks
 */
export const ShaderWrapper: React.FC<ShaderWrapperProps> = ({ children, fallback, className = '', theme = 'dark' }) => {
  const { isClient, hasWebGL, isChecking, isReady } = useWebGLSupport();

  // Show loading state during initial check
  if (!isClient || isChecking) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`} />
        <div className='relative z-10 flex flex-col items-center justify-center text-center'>
          <Loader2 className={`mb-4 h-8 w-8 animate-spin ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`} />
          <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
            Loading shader environment...
          </p>
        </div>
      </div>
    );
  }

  // Show WebGL not supported fallback
  if (isReady && !hasWebGL) {
    return <div className={`relative h-full w-full ${className}`}>{fallback || <DefaultFallback theme={theme} />}</div>;
  }

  // Render shader component with smooth fade-in
  if (isReady && hasWebGL) {
    return (
      <motion.div
        className={`relative h-full w-full ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  // Fallback for any edge cases
  return <DefaultFallback theme={theme} className={className} />;
};

/**
 * Default fallback component when WebGL is not supported
 */
const DefaultFallback: React.FC<{
  theme?: 'light' | 'dark';
  className?: string;
}> = ({ theme = 'dark', className = '' }) => {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      {/* Static gradient background as fallback */}
      <div
        className='absolute inset-0'
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle at center, #1a1a2e 0%, #000000 50%, #0a0a0f 100%)'
              : 'radial-gradient(circle at center, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
        }}
      />

      {/* Subtle animated gradient overlay */}
      <motion.div
        className='absolute inset-0 opacity-50'
        animate={{
          background:
            theme === 'dark'
              ? [
                  'linear-gradient(45deg, #8B5CF6 0%, #A855F7 100%)',
                  'linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%)',
                  'linear-gradient(225deg, #8B5CF6 0%, #A855F7 100%)',
                  'linear-gradient(315deg, #A855F7 0%, #8B5CF6 100%)',
                ]
              : [
                  'linear-gradient(45deg, #7C3AED 0%, #8B5CF6 100%)',
                  'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  'linear-gradient(225deg, #7C3AED 0%, #8B5CF6 100%)',
                  'linear-gradient(315deg, #8B5CF6 0%, #7C3AED 100%)',
                ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* WebGL not supported message */}
      <div className='relative z-10 mx-auto max-w-sm px-6 text-center'>
        <AlertCircle className={`mx-auto mb-4 h-12 w-12 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
        <h3 className={`mb-2 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          WebGL Not Available
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
          Your browser doesn&apos;t support WebGL or it&apos;s disabled. Showing a static background instead.
        </p>
        <p className={`mt-3 text-xs ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
          Try updating your browser or enabling hardware acceleration.
        </p>
      </div>
    </div>
  );
};
