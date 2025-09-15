/**
 * ThreeJSLoader - CreatorFlow Three.js Integration
 *
 * Atomic component for loading Three.js library with proper error handling
 * and loading states. Provides WebGL detection and fallback support.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

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
const detectWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(context && (context as WebGLRenderingContext).getParameter);
  } catch (e) {
    return false;
  }
};

/**
 * Loads Three.js library from CDN with proper error handling
 */
const loadThreeJS = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Three.js is already loaded
    if (typeof window !== 'undefined' && (window as any).THREE) {
      resolve();
      return;
    }

    // Check if script is already loading
    const existingScript = document.getElementById('three-js-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Three.js')));
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.id = 'three-js-script';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Three.js from CDN'));

    document.head.appendChild(script);
  });
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

        // Load Three.js
        await loadThreeJS();

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

      await loadThreeJS();

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
