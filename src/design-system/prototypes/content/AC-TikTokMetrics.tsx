import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Custom Hook for In-View Detection
const useInView = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [options]);

  return [containerRef, isInView] as const;
};

interface PrimaryMetric {
  value: string;
  label: string;
}

interface SecondaryMetric {
  label: string;
  value: number;
  tooltip: string;
}

interface AC_TikTokMetricsProps {
  title?: string;
  primaryMetric?: PrimaryMetric;
  secondaryMetrics?: SecondaryMetric[];
}

export const AC_TikTokMetrics: React.FC<AC_TikTokMetricsProps> = ({
  title = 'Post-Performance Analysis',
  primaryMetric = { value: '4.7', label: 'Engagement Rate' },
  secondaryMetrics = [
    { label: 'Share Rate', value: 78, tooltip: 'Shares per 1000 views. Target: >50' },
    { label: 'Comment Velocity', value: 92, tooltip: 'Comments in first hour. Target: >80' },
    { label: 'Watch Completion', value: 65, tooltip: 'Avg. % of video watched. Target: >60%' },
  ],
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const cardRef = useRef<HTMLDivElement>(null);
  const primaryMetricRef = useRef<HTMLSpanElement>(null);
  const [containerRef, isInView] = useInView({ threshold: 0.3 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    if (isInView && primaryMetricRef.current) {
      const target = parseFloat(primaryMetric.value);
      const duration = 2000;
      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 4);

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = (easeOutCubic(progress) * target).toFixed(1);
        if (primaryMetricRef.current) primaryMetricRef.current.textContent = current;
        if (progress < 1) requestAnimationFrame(animate);
        else if (primaryMetricRef.current) primaryMetricRef.current.textContent = target.toFixed(1);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, primaryMetric.value]);

  return (
    <>
      <style>{`
        .metrics-glass-pane {
          position: relative;
          background-size: 3px 3px;
          background-image: ${
            theme === 'dark'
              ? 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0)'
              : 'radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)'
          };
        }
        .metrics-glass-pane::before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: radial-gradient(
            450px circle at var(--mouse-x) var(--mouse-y),
            rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.2),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .metrics-glass-pane:hover::before {
          opacity: 1;
        }
        .bar-track {
          background: hsl(var(--muted));
        }
        .bar-fill {
          background: ${
            theme === 'dark' ? 'linear-gradient(90deg, #2DD4BF, #67e8f9)' : 'linear-gradient(90deg, #9333EA, #d946ef)'
          };
          transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bar-tooltip {
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .bar-container:hover .bar-tooltip {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='metrics-glass-pane my-strategic rounded-executive border bg-card/60 backdrop-blur-xl'
      >
        <div ref={containerRef} className='p-strategic'>
          <h4 className='text-xl font-bold text-foreground'>{title}</h4>
          <div className='mt-6 text-center'>
            <span
              ref={primaryMetricRef}
              className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-7xl font-black text-transparent'
            >
              0.0
            </span>
            <span className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl font-bold text-transparent'>
              %
            </span>
            <p className='mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
              {primaryMetric.label}
            </p>
          </div>
          <div className='mt-8 space-y-4'>
            {secondaryMetrics.map((metric) => (
              <div key={metric.label} className='bar-container group relative'>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-sm font-semibold text-foreground'>{metric.label}</span>
                  <span className='text-sm text-muted-foreground'>{metric.value}%</span>
                </div>
                <div className='bar-track h-2 w-full overflow-hidden rounded-full'>
                  <div
                    className='bar-fill h-full rounded-full'
                    style={{ width: isInView ? `${metric.value}%` : '0%' }}
                  ></div>
                </div>
                <div className='bar-tooltip absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover p-2 text-xs font-semibold text-popover-foreground backdrop-blur-sm'>
                  {metric.tooltip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return (
    <div className='max-w-xl'>
      <AC_TikTokMetrics />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background p-strategic'>
        <AppContent />
      </div>
    </ThemeProvider>
  );
}
