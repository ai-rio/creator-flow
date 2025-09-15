/**
 * useThemePersistence Hook - CreatorFlow Three.js Integration
 *
 * Enhanced React hook for managing theme state with persistence, system preference detection,
 * and smooth transition handling for Three.js animations.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface UseThemePersistenceConfig {
  storageKey?: string;
  enableTransitions?: boolean;
  transitionDuration?: number;
  defaultTheme?: Theme;
  systemPreferenceEnabled?: boolean;
}

export interface UseThemePersistenceReturn {
  theme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
  systemPreference: ResolvedTheme;
  actualTheme: Theme; // The raw theme value (including 'system')
}

const DEFAULT_CONFIG: Required<UseThemePersistenceConfig> = {
  storageKey: 'creatorflow-theme',
  enableTransitions: true,
  transitionDuration: 500,
  defaultTheme: 'system',
  systemPreferenceEnabled: true,
};

/**
 * Detects system theme preference
 */
const getSystemPreference = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Resolves theme value to actual theme (handles 'system' theme)
 */
const resolveTheme = (theme: Theme, systemPreference: ResolvedTheme): ResolvedTheme => {
  return theme === 'system' ? systemPreference : theme;
};

/**
 * Enhanced Theme Persistence Hook
 *
 * Manages theme state with persistence, system preference detection, and transitions
 */
export const useThemePersistence = (config: UseThemePersistenceConfig = {}): UseThemePersistenceReturn => {
  const { storageKey, enableTransitions, transitionDuration, defaultTheme, systemPreferenceEnabled } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [actualTheme, setActualTheme] = useState<Theme>(defaultTheme);
  const [systemPreference, setSystemPreference] = useState<ResolvedTheme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initialSystemPreference = getSystemPreference();

    setSystemPreference(initialSystemPreference);

    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setActualTheme(savedTheme);
    } else {
      setActualTheme(defaultTheme);
    }
  }, [storageKey, defaultTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (!systemPreferenceEnabled) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemPreference = e.matches ? 'dark' : 'light';
      setSystemPreference(newSystemPreference);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [systemPreferenceEnabled]);

  // Resolve actual theme
  const theme = resolveTheme(actualTheme, systemPreference);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    const resolvedTheme = resolveTheme(actualTheme, systemPreference);

    // Update document class
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');

    // Update localStorage
    localStorage.setItem(storageKey, actualTheme);

    // Add transition class for smooth theme changes
    if (enableTransitions) {
      document.documentElement.style.setProperty('--theme-transition-duration', `${transitionDuration}ms`);
      document.documentElement.classList.add('theme-transitioning');

      const timeoutId = setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, transitionDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [actualTheme, systemPreference, storageKey, enableTransitions, transitionDuration]);

  // Set theme with transition handling
  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (enableTransitions) {
        setIsTransitioning(true);

        setTimeout(() => {
          setIsTransitioning(false);
        }, transitionDuration);
      }

      setActualTheme(newTheme);
    },
    [enableTransitions, transitionDuration]
  );

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    const currentResolved = resolveTheme(actualTheme, systemPreference);
    const newTheme: ResolvedTheme = currentResolved === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [actualTheme, systemPreference, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isTransitioning,
    systemPreference,
    actualTheme,
  };
};

/**
 * Hook for Three.js theme management
 * Provides optimized theme switching for 3D animations
 */
export const useThreeJSTheme = (config?: UseThemePersistenceConfig) => {
  const { theme, setTheme, toggleTheme, isTransitioning, systemPreference, actualTheme } = useThemePersistence({
    enableTransitions: true,
    transitionDuration: 700, // Longer transition for 3D elements
    ...config,
  });

  // Pre-compute theme colors for Three.js
  const themeColors = {
    primary: theme === 'dark' ? '#8B5CF6' : '#5B21B6',
    secondary: theme === 'dark' ? '#7C3AED' : '#6D28D9',
    accent: theme === 'dark' ? '#A78BFA' : '#8B5CF6',
    background: theme === 'dark' ? '#000000' : '#FFFFFF',
    foreground: theme === 'dark' ? '#FFFFFF' : '#000000',
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isTransitioning,
    systemPreference,
    actualTheme,
    themeColors,
    isDark: theme === 'dark',
  };
};

/**
 * Global theme styles for smooth transitions
 */
export const injectThemeStyles = () => {
  if (typeof document === 'undefined') return;

  const existingStyles = document.getElementById('theme-transition-styles');
  if (existingStyles) return;

  const styles = document.createElement('style');
  styles.id = 'theme-transition-styles';
  styles.textContent = `
    :root {
      --theme-transition-duration: 500ms;
    }

    html.theme-transitioning,
    html.theme-transitioning *,
    html.theme-transitioning *::before,
    html.theme-transitioning *::after {
      transition:
        background-color var(--theme-transition-duration) ease-out,
        border-color var(--theme-transition-duration) ease-out,
        color var(--theme-transition-duration) ease-out,
        fill var(--theme-transition-duration) ease-out,
        stroke var(--theme-transition-duration) ease-out,
        opacity var(--theme-transition-duration) ease-out,
        box-shadow var(--theme-transition-duration) ease-out,
        transform var(--theme-transition-duration) ease-out !important;
    }

    html.theme-transitioning canvas {
      transition: opacity var(--theme-transition-duration) ease-out !important;
    }

    /* Preserve Three.js animations during theme transitions */
    html.theme-transitioning canvas[data-engine="three.js"] {
      transition: none !important;
    }
  `;

  document.head.appendChild(styles);
};

/**
 * Initialize theme system
 */
export const initializeThemeSystem = () => {
  if (typeof window !== 'undefined') {
    injectThemeStyles();
  }
};

export default useThemePersistence;
