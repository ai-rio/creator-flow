'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if we're running on the client side
 * Prevents hydration mismatches during SSR
 */
export function useClientSide() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to detect WebGL support in the browser
 * Returns both client-side status and WebGL capabilities
 */
export function useWebGLSupport() {
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsClient(true);

    // Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl =
          canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
        return !!(gl && typeof gl.getExtension === 'function');
      } catch (e) {
        return false;
      }
    };

    const webglSupported = checkWebGL();
    setHasWebGL(webglSupported);
    setIsChecking(false);
  }, []);

  return {
    isClient,
    hasWebGL,
    isChecking,
    isReady: isClient && !isChecking,
  };
}

/**
 * Hook to detect device capabilities for performance optimization
 */
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    prefersReducedMotion: false,
    devicePixelRatio: 1,
    hardwareConcurrency: 1,
  });

  useEffect(() => {
    const updateCapabilities = () => {
      setCapabilities({
        isMobile: window.innerWidth < 768,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        devicePixelRatio: window.devicePixelRatio || 1,
        hardwareConcurrency: navigator.hardwareConcurrency || 1,
      });
    };

    updateCapabilities();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleResize = () => updateCapabilities();

    window.addEventListener('resize', handleResize);
    mediaQuery.addListener(updateCapabilities);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeListener(updateCapabilities);
    };
  }, []);

  return capabilities;
}
