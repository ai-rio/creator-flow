'use client';

import { motion, useReducedMotion } from 'framer-motion';
// Note: AnimationFeature, DomKeyframesFeature imports removed due to framer-motion version compatibility
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useMotionPreferences } from './AccessibilityMotionProvider';

// ==================== PERFORMANCE MONITORING TYPES ====================

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  cpuUsage: number;
  batteryLevel?: number;
  networkSpeed?: string;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  gpuAcceleration: boolean;
}

interface MotionBudget {
  maxConcurrentAnimations: number;
  particleLimit: number;
  complexAnimationLimit: number;
  enableGpuAcceleration: boolean;
  frameRateTarget: 30 | 60;
  memoryThreshold: number; // MB
}

interface AdaptiveMotionConfig {
  performanceMode: 'maximum' | 'high' | 'balanced' | 'battery-saver' | 'minimal';
  automaticAdjustment: boolean;
  monitoringInterval: number;
  degradationThreshold: {
    fps: number;
    memory: number;
  };
}

// ==================== PERFORMANCE CONTEXT ====================

interface PerformanceMotionContextType {
  metrics: PerformanceMetrics;
  budget: MotionBudget;
  config: AdaptiveMotionConfig;
  updateConfig: (config: Partial<AdaptiveMotionConfig>) => void;
  getOptimizedProps: (baseProps: any) => any;
  shouldRenderMotion: (complexity: 'low' | 'medium' | 'high') => boolean;
  reportPerformanceIssue: (issue: string, severity: 'low' | 'medium' | 'high') => void;
}

const PerformanceMotionContext = createContext<PerformanceMotionContextType | undefined>(undefined);

// ==================== PERFORMANCE MOTION PROVIDER ====================

interface PerformanceMotionProviderProps {
  children: React.ReactNode;
  initialConfig?: Partial<AdaptiveMotionConfig>;
  enableMonitoring?: boolean;
}

export const PerformanceMotionProvider: React.FC<PerformanceMotionProviderProps> = ({
  children,
  initialConfig = {},
  enableMonitoring = true,
}) => {
  const { performanceMode: userPerformanceMode, prefersReducedMotion } = useMotionPreferences();
  const systemReducedMotion = useReducedMotion();

  // Performance metrics state
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    cpuUsage: 0,
    deviceType: 'desktop',
    gpuAcceleration: true,
  });

  // Adaptive configuration
  const [config, setConfig] = useState<AdaptiveMotionConfig>({
    performanceMode: 'balanced',
    automaticAdjustment: true,
    monitoringInterval: 1000,
    degradationThreshold: {
      fps: 45,
      memory: 100,
    },
    ...initialConfig,
  });

  // Dynamic motion budget based on performance
  const budget = useMemo((): MotionBudget => {
    const baseConfig = {
      maximum: {
        maxConcurrentAnimations: 50,
        particleLimit: 200,
        complexAnimationLimit: 20,
        enableGpuAcceleration: true,
        frameRateTarget: 60 as const,
        memoryThreshold: 200,
      },
      high: {
        maxConcurrentAnimations: 30,
        particleLimit: 100,
        complexAnimationLimit: 12,
        enableGpuAcceleration: true,
        frameRateTarget: 60 as const,
        memoryThreshold: 150,
      },
      balanced: {
        maxConcurrentAnimations: 20,
        particleLimit: 50,
        complexAnimationLimit: 8,
        enableGpuAcceleration: true,
        frameRateTarget: 60 as const,
        memoryThreshold: 100,
      },
      'battery-saver': {
        maxConcurrentAnimations: 10,
        particleLimit: 20,
        complexAnimationLimit: 4,
        enableGpuAcceleration: false,
        frameRateTarget: 30 as const,
        memoryThreshold: 50,
      },
      minimal: {
        maxConcurrentAnimations: 5,
        particleLimit: 0,
        complexAnimationLimit: 2,
        enableGpuAcceleration: false,
        frameRateTarget: 30 as const,
        memoryThreshold: 30,
      },
    };

    return baseConfig[config.performanceMode];
  }, [config.performanceMode]);

  // Device and capability detection
  useEffect(() => {
    const detectCapabilities = () => {
      const deviceType = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';

      // Check for GPU acceleration
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const gpuAcceleration = !!gl;

      // Get memory info if available (non-standard API)
      const memoryInfo = (performance as any).memory;
      const memoryUsage = memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) : 0;

      // Get battery info if available
      // @ts-expect-error - Non-standard API
      navigator.getBattery?.().then((battery: any) => {
        setMetrics((prev) => ({
          ...prev,
          batteryLevel: Math.round(battery.level * 100),
        }));
      });

      setMetrics((prev) => ({
        ...prev,
        deviceType,
        gpuAcceleration,
        memoryUsage,
      }));
    };

    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    return () => window.removeEventListener('resize', detectCapabilities);
  }, []);

  // Performance monitoring
  useEffect(() => {
    if (!enableMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let monitoringActive = true;

    const measureFrameRate = () => {
      if (!monitoringActive) return;

      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= config.monitoringInterval) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        setMetrics((prev) => ({ ...prev, fps }));

        // Automatic performance adjustment
        if (config.automaticAdjustment) {
          if (fps < config.degradationThreshold.fps) {
            // Degrade performance mode
            const modes: AdaptiveMotionConfig['performanceMode'][] = [
              'maximum',
              'high',
              'balanced',
              'battery-saver',
              'minimal',
            ];
            const currentIndex = modes.indexOf(config.performanceMode);
            if (currentIndex < modes.length - 1) {
              setConfig((prev) => ({
                ...prev,
                performanceMode: modes[currentIndex + 1],
              }));
            }
          } else if (fps > 55 && config.performanceMode !== 'maximum') {
            // Upgrade performance mode
            const modes: AdaptiveMotionConfig['performanceMode'][] = [
              'maximum',
              'high',
              'balanced',
              'battery-saver',
              'minimal',
            ];
            const currentIndex = modes.indexOf(config.performanceMode);
            if (currentIndex > 0) {
              setConfig((prev) => ({
                ...prev,
                performanceMode: modes[currentIndex - 1],
              }));
            }
          }
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFrameRate);
    };

    requestAnimationFrame(measureFrameRate);

    return () => {
      monitoringActive = false;
    };
  }, [config, enableMonitoring]);

  // Motion optimization functions
  const getOptimizedProps = useCallback(
    (baseProps: any) => {
      if (prefersReducedMotion || systemReducedMotion) {
        return {
          ...baseProps,
          animate: { opacity: 1 },
          initial: { opacity: 0 },
          transition: { duration: 0.1 },
        };
      }

      const optimizedProps = { ...baseProps };

      // Adjust animation duration based on performance
      if (optimizedProps.transition) {
        optimizedProps.transition = {
          ...optimizedProps.transition,
          duration: optimizedProps.transition.duration * (budget.frameRateTarget === 30 ? 0.7 : 1),
        };
      }

      // Remove complex animations on low performance
      if (config.performanceMode === 'battery-saver' || config.performanceMode === 'minimal') {
        // Simplify complex transforms
        if (optimizedProps.animate && typeof optimizedProps.animate === 'object') {
          const simplified: any = {};
          Object.keys(optimizedProps.animate).forEach((key) => {
            if (['x', 'y', 'scale', 'opacity'].includes(key)) {
              simplified[key] = optimizedProps.animate[key];
            }
          });
          optimizedProps.animate = simplified;
        }
      }

      return optimizedProps;
    },
    [prefersReducedMotion, systemReducedMotion, budget, config.performanceMode]
  );

  const shouldRenderMotion = useCallback(
    (complexity: 'low' | 'medium' | 'high') => {
      if (prefersReducedMotion || systemReducedMotion) return false;

      switch (complexity) {
        case 'low':
          return true;
        case 'medium':
          return config.performanceMode !== 'minimal';
        case 'high':
          return ['maximum', 'high', 'balanced'].includes(config.performanceMode);
        default:
          return false;
      }
    },
    [prefersReducedMotion, systemReducedMotion, config.performanceMode]
  );

  const reportPerformanceIssue = useCallback(
    (issue: string, severity: 'low' | 'medium' | 'high') => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Motion Performance Issue [${severity}]:`, issue, {
          currentMode: config.performanceMode,
          fps: metrics.fps,
          memory: metrics.memoryUsage,
        });
      }

      // In production, this could send telemetry data
      if (severity === 'high' && config.automaticAdjustment) {
        setConfig((prev) => ({
          ...prev,
          performanceMode: 'minimal',
        }));
      }
    },
    [config.performanceMode, metrics, config.automaticAdjustment]
  );

  const updateConfig = useCallback((newConfig: Partial<AdaptiveMotionConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const contextValue: PerformanceMotionContextType = {
    metrics,
    budget,
    config,
    updateConfig,
    getOptimizedProps,
    shouldRenderMotion,
    reportPerformanceIssue,
  };

  return (
    <PerformanceMotionContext.Provider value={contextValue}>
      {children}
      {/* Performance monitoring overlay in development */}
      {process.env.NODE_ENV === 'development' && <PerformanceDebugOverlay />}
    </PerformanceMotionContext.Provider>
  );
};

// ==================== PERFORMANCE HOOKS ====================

export const usePerformanceMotion = (): PerformanceMotionContextType => {
  const context = useContext(PerformanceMotionContext);
  if (context === undefined) {
    throw new Error('usePerformanceMotion must be used within a PerformanceMotionProvider');
  }
  return context;
};

// ==================== OPTIMIZED MOTION COMPONENTS ====================

interface OptimizedMotionDivProps {
  children: React.ReactNode;
  complexity?: 'low' | 'medium' | 'high';
  fallback?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const OptimizedMotionDiv: React.FC<OptimizedMotionDivProps> = ({
  children,
  complexity = 'medium',
  fallback,
  className,
  ...motionProps
}) => {
  const { getOptimizedProps, shouldRenderMotion } = usePerformanceMotion();

  if (!shouldRenderMotion(complexity)) {
    return fallback ? <div className={className}>{fallback}</div> : <div className={className}>{children}</div>;
  }

  const optimizedProps = getOptimizedProps(motionProps);

  return (
    <motion.div className={className} {...optimizedProps}>
      {children}
    </motion.div>
  );
};

// ==================== PARTICLE SYSTEM OPTIMIZATION ====================

interface OptimizedParticleSystemProps {
  particleCount?: number;
  complexity?: 'low' | 'medium' | 'high';
  className?: string;
  children?: React.ReactNode;
}

export const OptimizedParticleSystem: React.FC<OptimizedParticleSystemProps> = ({
  particleCount = 50,
  complexity = 'high',
  className,
  children,
}) => {
  const { budget, shouldRenderMotion, reportPerformanceIssue } = usePerformanceMotion();

  if (!shouldRenderMotion(complexity)) {
    return <div className={className}>{children}</div>;
  }

  // Limit particles based on budget
  const optimizedParticleCount = Math.min(particleCount, budget.particleLimit);

  if (optimizedParticleCount < particleCount) {
    reportPerformanceIssue(`Particle count reduced from ${particleCount} to ${optimizedParticleCount}`, 'low');
  }

  return (
    <div className={className}>
      {Array.from({ length: optimizedParticleCount }).map((_, i) => (
        <OptimizedParticle key={i} delay={i * 0.1} />
      ))}
      {children}
    </div>
  );
};

interface OptimizedParticleProps {
  delay: number;
}

const OptimizedParticle: React.FC<OptimizedParticleProps> = ({ delay }) => {
  const { budget, getOptimizedProps } = usePerformanceMotion();

  const particleProps = getOptimizedProps({
    className: 'absolute h-1 w-1 bg-blue-400 rounded-full',
    animate: {
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    },
    transition: {
      duration: 2,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    },
  });

  return <motion.div {...particleProps} />;
};

// ==================== ADAPTIVE ANIMATION WRAPPER ====================

interface AdaptiveAnimationProps {
  children: React.ReactNode;
  highPerformanceVariant: any;
  balancedVariant: any;
  lowPerformanceVariant: any;
  className?: string;
}

export const AdaptiveAnimation: React.FC<AdaptiveAnimationProps> = ({
  children,
  highPerformanceVariant,
  balancedVariant,
  lowPerformanceVariant,
  className,
}) => {
  const { config, getOptimizedProps } = usePerformanceMotion();

  const getVariantByPerformanceMode = () => {
    switch (config.performanceMode) {
      case 'maximum':
      case 'high':
        return highPerformanceVariant;
      case 'balanced':
        return balancedVariant;
      case 'battery-saver':
      case 'minimal':
        return lowPerformanceVariant;
      default:
        return balancedVariant;
    }
  };

  const optimizedProps = getOptimizedProps(getVariantByPerformanceMode());

  return (
    <motion.div className={className} {...optimizedProps}>
      {children}
    </motion.div>
  );
};

// ==================== PERFORMANCE DEBUG OVERLAY ====================

const PerformanceDebugOverlay: React.FC = () => {
  const { metrics, budget, config } = usePerformanceMotion();
  const [isVisible, setIsVisible] = useState(false);

  // Toggle with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible) {
    return (
      <div className='fixed bottom-4 right-4 z-50'>
        <button
          onClick={() => setIsVisible(true)}
          className='rounded-full bg-blue-600 p-2 text-xs text-white'
          title='Show Performance Debug (Ctrl+Shift+P)'
        >
          🎭
        </button>
      </div>
    );
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 rounded-lg bg-black/90 p-4 text-xs text-white backdrop-blur-sm'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='font-bold'>Motion Performance</h3>
        <button onClick={() => setIsVisible(false)} className='ml-4 rounded px-2 py-1 hover:bg-white/20'>
          ×
        </button>
      </div>

      <div className='grid grid-cols-2 gap-4 text-xs'>
        <div>
          <h4 className='mb-1 font-semibold'>Metrics</h4>
          <div>FPS: {metrics.fps}</div>
          <div>Memory: {metrics.memoryUsage}MB</div>
          <div>Device: {metrics.deviceType}</div>
          <div>GPU: {metrics.gpuAcceleration ? '✓' : '✗'}</div>
          {metrics.batteryLevel && <div>Battery: {metrics.batteryLevel}%</div>}
        </div>

        <div>
          <h4 className='mb-1 font-semibold'>Budget</h4>
          <div>Mode: {config.performanceMode}</div>
          <div>Animations: {budget.maxConcurrentAnimations}</div>
          <div>Particles: {budget.particleLimit}</div>
          <div>Target FPS: {budget.frameRateTarget}</div>
          <div>Memory Limit: {budget.memoryThreshold}MB</div>
        </div>
      </div>

      <div className='mt-2 text-xs opacity-75'>Press Ctrl+Shift+P to toggle</div>
    </div>
  );
};

// ==================== PERFORMANCE REPORTER ====================

export const PerformanceReporter: React.FC = () => {
  const { metrics, reportPerformanceIssue } = usePerformanceMotion();

  useEffect(() => {
    // Report critical performance issues
    if (metrics.fps < 30) {
      reportPerformanceIssue('FPS dropped below 30', 'high');
    } else if (metrics.fps < 45) {
      reportPerformanceIssue('FPS dropped below 45', 'medium');
    }

    if (metrics.memoryUsage > 150) {
      reportPerformanceIssue('Memory usage exceeds 150MB', 'medium');
    } else if (metrics.memoryUsage > 200) {
      reportPerformanceIssue('Memory usage exceeds 200MB', 'high');
    }
  }, [metrics, reportPerformanceIssue]);

  return null; // This is a monitoring component with no UI
};

// ==================== EXPORTS ====================

export default {
  PerformanceMotionProvider,
  usePerformanceMotion,
  OptimizedMotionDiv,
  OptimizedParticleSystem,
  AdaptiveAnimation,
  PerformanceReporter,
};
