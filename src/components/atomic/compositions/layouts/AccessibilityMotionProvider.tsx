'use client';

import { MotionConfig } from 'framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';

// ==================== MOTION PREFERENCES CONTEXT ====================

interface MotionPreferences {
  prefersReducedMotion: boolean;
  enableAnimations: boolean;
  animationDuration: number;
  enableHoverEffects: boolean;
  enableParticles: boolean;
  enableCelebrations: boolean;
  performanceMode: 'auto' | 'high' | 'balanced' | 'low';
}

interface MotionPreferencesContextType extends MotionPreferences {
  updatePreferences: (preferences: Partial<MotionPreferences>) => void;
  resetToDefaults: () => void;
}

const MotionPreferencesContext = createContext<MotionPreferencesContextType | undefined>(undefined);

// ==================== MOTION PROVIDER COMPONENT ====================

interface AccessibilityMotionProviderProps {
  children: React.ReactNode;
  respectSystemPreferences?: boolean;
  enableUserPreferences?: boolean;
}

export const AccessibilityMotionProvider: React.FC<AccessibilityMotionProviderProps> = ({
  children,
  respectSystemPreferences = true,
  enableUserPreferences = true,
}) => {
  const [preferences, setPreferences] = useState<MotionPreferences>({
    prefersReducedMotion: false,
    enableAnimations: true,
    animationDuration: 1,
    enableHoverEffects: true,
    enableParticles: true,
    enableCelebrations: true,
    performanceMode: 'auto',
  });

  // Detect system motion preferences
  useEffect(() => {
    if (!respectSystemPreferences) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
      const prefersReduced = event.matches;

      setPreferences((prev) => ({
        ...prev,
        prefersReducedMotion: prefersReduced,
        enableAnimations: !prefersReduced,
        enableHoverEffects: !prefersReduced,
        enableParticles: !prefersReduced,
        enableCelebrations: !prefersReduced,
        animationDuration: prefersReduced ? 0.1 : 1,
      }));
    };

    // Initial check
    updateMotionPreference(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, [respectSystemPreferences]);

  // Detect device performance capabilities
  useEffect(() => {
    if (preferences.performanceMode !== 'auto') return;

    const detectPerformance = () => {
      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 2;

      // Check memory (if available)
      // @ts-expect-error - Non-standard API
      const memory = navigator.deviceMemory || 4;

      // Check connection (if available)
      // @ts-expect-error - Non-standard API
      const connection = navigator.connection?.effectiveType || '4g';

      let performanceLevel: 'high' | 'balanced' | 'low' = 'balanced';

      if (cores >= 8 && memory >= 8 && (connection === '4g' || !connection)) {
        performanceLevel = 'high';
      } else if (cores <= 2 || memory <= 2 || connection === '2g' || connection === 'slow-2g') {
        performanceLevel = 'low';
      }

      setPreferences((prev) => ({
        ...prev,
        performanceMode: performanceLevel,
        enableParticles: performanceLevel !== 'low',
        enableCelebrations: performanceLevel === 'high',
      }));
    };

    detectPerformance();
  }, [preferences.performanceMode]);

  // Load user preferences from localStorage
  useEffect(() => {
    if (!enableUserPreferences) return;

    const savedPreferences = localStorage.getItem('creatorflow-motion-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse motion preferences from localStorage:', error);
      }
    }
  }, [enableUserPreferences]);

  // Save preferences to localStorage
  const updatePreferences = (newPreferences: Partial<MotionPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPreferences };

      if (enableUserPreferences) {
        localStorage.setItem('creatorflow-motion-preferences', JSON.stringify(updated));
      }

      return updated;
    });
  };

  const resetToDefaults = () => {
    const defaults: MotionPreferences = {
      prefersReducedMotion: false,
      enableAnimations: true,
      animationDuration: 1,
      enableHoverEffects: true,
      enableParticles: true,
      enableCelebrations: true,
      performanceMode: 'auto',
    };

    setPreferences(defaults);

    if (enableUserPreferences) {
      localStorage.removeItem('creatorflow-motion-preferences');
    }
  };

  // Create motion config based on preferences
  const motionConfig = {
    transition: {
      duration: preferences.enableAnimations ? 0.3 * preferences.animationDuration : 0.01,
      ease: 'easeInOut' as const,
    },
    reducedMotion: preferences.prefersReducedMotion ? ('always' as const) : ('never' as const),
  };

  const contextValue: MotionPreferencesContextType = {
    ...preferences,
    updatePreferences,
    resetToDefaults,
  };

  return (
    <MotionPreferencesContext.Provider value={contextValue}>
      <MotionConfig {...motionConfig}>{children}</MotionConfig>
    </MotionPreferencesContext.Provider>
  );
};

// ==================== MOTION PREFERENCES HOOK ====================

export const useMotionPreferences = (): MotionPreferencesContextType => {
  const context = useContext(MotionPreferencesContext);

  if (context === undefined) {
    throw new Error('useMotionPreferences must be used within an AccessibilityMotionProvider');
  }

  return context;
};

// ==================== ACCESSIBLE MOTION WRAPPER ====================

interface AccessibleMotionWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresMotion?: boolean;
  className?: string;
}

export const AccessibleMotionWrapper: React.FC<AccessibleMotionWrapperProps> = ({
  children,
  fallback,
  requiresMotion = false,
  className,
}) => {
  const { prefersReducedMotion, enableAnimations } = useMotionPreferences();

  // If motion is required but disabled, show fallback
  if (requiresMotion && (prefersReducedMotion || !enableAnimations)) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  // If motion is disabled, render without motion features
  if (prefersReducedMotion || !enableAnimations) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
};

// ==================== PERFORMANCE MONITOR ====================

interface PerformanceMonitorProps {
  onPerformanceChange?: (level: 'high' | 'balanced' | 'low') => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onPerformanceChange }) => {
  const { updatePreferences } = useMotionPreferences();

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let isMonitoring = true;

    const measurePerformance = () => {
      if (!isMonitoring) return;

      frameCount++;
      const currentTime = performance.now();

      // Measure FPS over 1 second intervals
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        let performanceLevel: 'high' | 'balanced' | 'low' = 'balanced';

        if (fps >= 55) {
          performanceLevel = 'high';
        } else if (fps <= 30) {
          performanceLevel = 'low';
        }

        // Update preferences based on performance
        updatePreferences({
          performanceMode: performanceLevel,
          enableParticles: performanceLevel !== 'low',
          enableCelebrations: performanceLevel === 'high',
          animationDuration: performanceLevel === 'low' ? 0.5 : 1,
        });

        onPerformanceChange?.(performanceLevel);

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measurePerformance);
    };

    requestAnimationFrame(measurePerformance);

    return () => {
      isMonitoring = false;
    };
  }, [updatePreferences, onPerformanceChange]);

  return null; // This is a monitoring component with no UI
};

// ==================== MOTION SETTINGS PANEL ====================

interface MotionSettingsPanelProps {
  className?: string;
  onClose?: () => void;
}

export const MotionSettingsPanel: React.FC<MotionSettingsPanelProps> = ({ className, onClose }) => {
  const {
    prefersReducedMotion,
    enableAnimations,
    animationDuration,
    enableHoverEffects,
    enableParticles,
    enableCelebrations,
    performanceMode,
    updatePreferences,
    resetToDefaults,
  } = useMotionPreferences();

  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Motion Preferences</h3>
        {onClose && (
          <button onClick={onClose} className='rounded-lg p-2 transition-colors hover:bg-muted'>
            ×
          </button>
        )}
      </div>

      <div className='space-y-4'>
        {/* System preference indicator */}
        <div className='rounded-lg bg-muted/50 p-3'>
          <p className='text-sm text-muted-foreground'>
            System preference: {prefersReducedMotion ? 'Reduced motion' : 'Full motion'}
          </p>
        </div>

        {/* Animation toggles */}
        <div className='space-y-3'>
          <label className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Enable Animations</span>
            <input
              type='checkbox'
              checked={enableAnimations}
              onChange={(e) => updatePreferences({ enableAnimations: e.target.checked })}
              className='rounded'
            />
          </label>

          <label className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Hover Effects</span>
            <input
              type='checkbox'
              checked={enableHoverEffects}
              onChange={(e) => updatePreferences({ enableHoverEffects: e.target.checked })}
              className='rounded'
            />
          </label>

          <label className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Particle Effects</span>
            <input
              type='checkbox'
              checked={enableParticles}
              onChange={(e) => updatePreferences({ enableParticles: e.target.checked })}
              className='rounded'
            />
          </label>

          <label className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Celebration Animations</span>
            <input
              type='checkbox'
              checked={enableCelebrations}
              onChange={(e) => updatePreferences({ enableCelebrations: e.target.checked })}
              className='rounded'
            />
          </label>
        </div>

        {/* Animation duration slider */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Animation Speed</label>
          <input
            type='range'
            min='0.1'
            max='2'
            step='0.1'
            value={animationDuration}
            onChange={(e) => updatePreferences({ animationDuration: parseFloat(e.target.value) })}
            className='w-full'
          />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>Faster</span>
            <span>Slower</span>
          </div>
        </div>

        {/* Performance mode */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Performance Mode</label>
          <select
            value={performanceMode}
            onChange={(e) => updatePreferences({ performanceMode: e.target.value as any })}
            className='w-full rounded-lg border border-border bg-background p-2'
          >
            <option value='auto'>Auto-detect</option>
            <option value='high'>High Performance</option>
            <option value='balanced'>Balanced</option>
            <option value='low'>Low Performance</option>
          </select>
        </div>

        {/* Reset button */}
        <button
          onClick={resetToDefaults}
          className='w-full rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80'
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

// ==================== EXPORTS ====================

export default {
  AccessibilityMotionProvider,
  useMotionPreferences,
  AccessibleMotionWrapper,
  PerformanceMonitor,
  MotionSettingsPanel,
};
