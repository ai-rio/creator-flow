/**
 * ThreeJSLoader - CreatorFlow Three.js Integration
 *
 * Atomic component for WebGL detection and loading indicator for Three.js scenes.
 * Uses bundled Three.js package for security and reliability.
 *
 * @author CreatorFlow Team
 * @version 2.0.0
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export interface ThreeJSLoaderProps {
  onLoad: () => void;
  onError: (error: string) => void;
  className?: string;
  showLoadingIndicator?: boolean;
}

export interface ThreeJSLoadingState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  hasWebGL: boolean;
}

/**
 * Detects WebGL support in the browser
 */
export const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(context && (context as WebGLRenderingContext).getParameter);
  } catch (e) {
    return false;
  }
};

/**
 * Validates Three.js is properly loaded and available
 */
const validateThreeJS = (): boolean => {
  try {
    // Check if bundled Three.js is available
    return !!(THREE && THREE.WebGLRenderer && THREE.Scene && THREE.Camera);
  } catch (e) {
    return false;
  }
};

/**
 * ThreeJSLoader Component
 *
 * Handles loading Three.js library and provides loading states
 */
export const ThreeJSLoader: React.FC<ThreeJSLoaderProps> = ({
  onLoad,
  onError,
  className = '',
  showLoadingIndicator = true,
}) => {
  const [state, setState] = useState<ThreeJSLoadingState>({
    isLoading: false,
    isLoaded: false,
    error: null,
    hasWebGL: false,
  });

  useEffect(() => {
    const initializeThreeJS = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // Check WebGL support
        const webGLSupported = detectWebGL();
        setState((prev) => ({ ...prev, hasWebGL: webGLSupported }));

        if (!webGLSupported) {
          throw new Error('WebGL is not supported in this browser');
        }

        // Validate bundled Three.js is available
        if (!validateThreeJS()) {
          throw new Error('Three.js library is not properly loaded');
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));

        onLoad();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isLoaded: false,
          error: errorMessage,
        }));

        onError(errorMessage);
      }
    };

    initializeThreeJS();
  }, [onLoad, onError]);

  if (!showLoadingIndicator) {
    return null;
  }

  return (
    <AnimatePresence>
      {state.isLoading && (
        <motion.div
          className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg border border-border/20 bg-background/95 px-4 py-3 text-sm shadow-lg backdrop-blur-sm ${className}`}
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Loader2 className='h-4 w-4 text-primary' />
          </motion.div>
          <span className='text-foreground/80'>Loading Three.js...</span>
        </motion.div>
      )}

      {state.error && (
        <motion.div
          className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm shadow-lg ${className}`}
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <AlertTriangle className='h-4 w-4 text-destructive' />
          </motion.div>
          <div className='text-destructive'>
            <div className='font-medium'>Three.js Loading Failed</div>
            <div className='text-xs opacity-80'>{state.error}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook for managing Three.js loading state
 */
export const useThreeJSLoader = () => {
  const [state, setState] = useState<ThreeJSLoadingState>({
    isLoading: false,
    isLoaded: false,
    error: null,
    hasWebGL: false,
  });

  const loadThreeJS = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const webGLSupported = detectWebGL();
      setState((prev) => ({ ...prev, hasWebGL: webGLSupported }));

      if (!webGLSupported) {
        throw new Error('WebGL is not supported in this browser');
      }

      // Validate bundled Three.js is available
      if (!validateThreeJS()) {
        throw new Error('Three.js library is not properly loaded');
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: false,
        error: errorMessage,
      }));
    }
  };

  return {
    ...state,
    loadThreeJS,
  };
};

export default ThreeJSLoader;
