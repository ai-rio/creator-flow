/**
 * useThreeJS Hook - CreatorFlow Three.js Integration
 *
 * Enhanced React hook for managing Three.js instances with proper lifecycle management,
 * performance optimization, and error handling.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type AorticVesselConfig,
  type AorticVesselInstance,
  createAorticVesselAnimation,
  detectDeviceType,
  getOptimalParticleCount,
} from '@/utils/three-js/animations/aorticVessel';

export interface UseThreeJSConfig extends Omit<AorticVesselConfig, 'theme'> {
  enabled?: boolean;
  autoResize?: boolean;
  performanceMonitoring?: boolean;
}

export interface UseThreeJSReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  hasWebGL: boolean;
  instance: AorticVesselInstance | null;
  handleThemeChange: (theme: 'light' | 'dark') => void;
  handleMouseMove: (event: MouseEvent) => void;
  retry: () => void;
  dispose: () => void;
}

/**
 * Detects WebGL support
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
 * Loads Three.js dynamically
 */
const loadThreeJS = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).THREE) {
      resolve();
      return;
    }

    const existingScript = document.getElementById('three-js-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Three.js')));
      return;
    }

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
 * Enhanced Three.js Hook
 *
 * Manages Three.js lifecycle with performance optimization and error handling
 */
export const useThreeJS = (theme: 'light' | 'dark', config: UseThreeJSConfig = {}): UseThreeJSReturn => {
  const {
    enabled = true,
    autoResize = true,
    performanceMonitoring = true,
    particleCount,
    cameraDistance,
    performanceMode = 'high',
  } = config;

  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<AorticVesselInstance | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasWebGL, setHasWebGL] = useState(false);

  // Initialize Three.js
  const initializeThreeJS = useCallback(async () => {
    if (!enabled || !containerRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check WebGL support
      const webGLSupported = detectWebGL();
      setHasWebGL(webGLSupported);

      if (!webGLSupported) {
        throw new Error('WebGL is not supported in this browser');
      }

      // Load Three.js
      await loadThreeJS();

      // Get optimal configuration
      const deviceType = detectDeviceType();
      const optimalParticleCount = particleCount ?? getOptimalParticleCount(deviceType);

      // Create animation instance
      const animationConfig: AorticVesselConfig = {
        theme,
        particleCount: optimalParticleCount,
        cameraDistance,
        performanceMode,
      };

      const instance = createAorticVesselAnimation(containerRef.current, animationConfig);
      instanceRef.current = instance;

      setIsLoading(false);
      setIsLoaded(true);

      // Performance monitoring
      if (performanceMonitoring) {
        console.log('Three.js initialized with config:', {
          deviceType,
          particleCount: optimalParticleCount,
          performanceMode,
          theme,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);
      setIsLoaded(false);

      console.error('Three.js initialization error:', err);
    }
  }, [enabled, theme, particleCount, cameraDistance, performanceMode, performanceMonitoring]);

  // Handle theme changes
  const handleThemeChange = useCallback((newTheme: 'light' | 'dark') => {
    if (instanceRef.current) {
      instanceRef.current.handleThemeChange(newTheme);
    }
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (instanceRef.current) {
      instanceRef.current.handleMouseMove(event.clientX, event.clientY);
    }
  }, []);

  // Retry initialization
  const retry = useCallback(() => {
    dispose();
    initializeThreeJS();
  }, [initializeThreeJS]);

  // Dispose instance
  const dispose = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.dispose();
      instanceRef.current = null;
    }

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    setIsLoaded(false);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeThreeJS();

    return () => {
      dispose();
    };
  }, [initializeThreeJS, dispose]);

  // Handle theme changes
  useEffect(() => {
    handleThemeChange(theme);
  }, [theme, handleThemeChange]);

  // Auto-resize handling
  useEffect(() => {
    if (!autoResize || !containerRef.current || !instanceRef.current) return;

    const container = containerRef.current;

    const handleResize = () => {
      if (instanceRef.current) {
        const { camera, renderer } = instanceRef.current;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    let cleanupFunction: (() => void) | undefined;

    // Use ResizeObserver for better performance
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(container);
      cleanupFunction = () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    } else if (typeof window !== 'undefined') {
      // Fallback to window resize
      const win = window as Window;
      win.addEventListener('resize', handleResize);
      cleanupFunction = () => win.removeEventListener('resize', handleResize);
    }

    return cleanupFunction;
  }, [autoResize, isLoaded]);

  // Mouse event handling
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, isLoaded]);

  return {
    containerRef,
    isLoading,
    isLoaded,
    error,
    hasWebGL,
    instance: instanceRef.current,
    handleThemeChange,
    handleMouseMove,
    retry,
    dispose,
  };
};

/**
 * Simplified Three.js hook for basic usage
 */
export const useThreeJSBasic = (theme: 'light' | 'dark') => {
  const { containerRef, isLoaded, error } = useThreeJS(theme, {
    performanceMode: 'medium',
    autoResize: true,
  });

  return {
    containerRef,
    isLoaded,
    hasError: !!error,
  };
};

export default useThreeJS;
