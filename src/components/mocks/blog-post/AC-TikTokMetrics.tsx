import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Custom Hook for In-View Detection ---
const useInView = (options: any) => {
  const containerRef = useRef(null);
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
  }, [containerRef, options]);
  return [containerRef, isInView];
};

// --- Style Component for High-End Effects ---
const HighEndStyle: React.FC<any> = ({ theme }: any) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  const accentGradient =
    theme === 'dark' ? 'linear-gradient(90deg, #2DD4BF, #67e8f9)' : 'linear-gradient(90deg, #9333EA, #d946ef)';

  return (
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
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            border-radius: 16px; 
            background: radial-gradient(
                450px circle at var(--mouse-x) var(--mouse-y),
                rgba(${accentColor}, 0.2),
                transparent 70%
            );
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .metrics-glass-pane:hover::before {
            opacity: 1;
        }
        .bar-track {
            background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
        }
        .bar-fill {
            background: ${accentGradient};
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
  );
};

// --- Component: AC-TikTokMetrics (AAA+) ---
const AC_TikTokMetrics: React.FC<any> = ({ title, primaryMetric, secondaryMetrics, theme = 'dark' }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const primaryMetricRef = useRef<HTMLSpanElement>(null);
  const [containerRef, isInView] = useInView({ threshold: 0.3 });

  const handleMouseMove = (e: any) => {
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
      const easeOutCubic = (t: any) => 1 - Math.pow(1 - t, 4);

      const animate = (timestamp: any) => {
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

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      primaryMetricGradient: 'from-slate-100 to-slate-400',
      primaryMetricLabel: 'text-slate-400',
      barLabel: 'text-slate-300',
      barValue: 'text-slate-400',
      tooltipGlass: 'bg-slate-900/80 border-slate-700',
      tooltipText: 'text-slate-200',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      primaryMetricGradient: 'from-slate-800 to-slate-600',
      primaryMetricLabel: 'text-slate-500',
      barLabel: 'text-slate-700',
      barValue: 'text-slate-500',
      tooltipGlass: 'bg-white/80 border-slate-300',
      tooltipText: 'text-slate-700',
    },
  };
  const currentTheme = (themeClasses as any)[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`metrics-glass-pane my-12 rounded-2xl border backdrop-blur-xl`}
      >
        <div ref={containerRef as any} className='p-8'>
          <h4 className={`text-xl font-bold ${currentTheme.title}`}>{title}</h4>
          <div className='mt-6 text-center'>
            <span
              ref={primaryMetricRef}
              className={`bg-gradient-to-b bg-clip-text text-7xl font-black text-transparent ${currentTheme.primaryMetricGradient}`}
            >
              0.0
            </span>
            <span
              className={`bg-gradient-to-b bg-clip-text text-5xl font-bold text-transparent ${currentTheme.primaryMetricGradient}`}
            >
              %
            </span>
            <p className={`mt-1 text-sm font-semibold uppercase tracking-wider ${currentTheme.primaryMetricLabel}`}>
              {primaryMetric.label}
            </p>
          </div>
          <div className='mt-8 space-y-4'>
            {secondaryMetrics.map((metric: any) => (
              <div key={metric.label} className='bar-container group relative'>
                <div className='mb-1 flex items-center justify-between'>
                  <span className={`text-sm font-semibold ${currentTheme.barLabel}`}>{metric.label}</span>
                  <span className={`text-sm ${currentTheme.barValue}`}>{metric.value}%</span>
                </div>
                <div className='bar-track h-2 w-full overflow-hidden rounded-full'>
                  <div
                    className='bar-fill h-full rounded-full'
                    style={{ width: isInView ? `${metric.value}%` : '0%' }}
                  ></div>
                </div>
                <div
                  className={`bar-tooltip absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border p-2 text-xs font-semibold backdrop-blur-sm ${currentTheme.tooltipGlass} ${currentTheme.tooltipText}`}
                >
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

// --- Visualization App ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  const metricsData = {
    title: 'Post-Performance Analysis',
    primaryMetric: { value: '4.7', label: 'Engagement Rate' },
    secondaryMetrics: [
      { label: 'Share Rate', value: 78, tooltip: 'Shares per 1000 views. Target: >50' },
      { label: 'Comment Velocity', value: 92, tooltip: 'Comments in first hour. Target: >80' },
      { label: 'Watch Completion', value: 65, tooltip: 'Avg. % of video watched. Target: >60%' },
    ],
  };

  return (
    <div className={`min-h-[200vh] p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-TikTokMetrics</span>
          </h1>
          <button
            onClick={toggleTheme}
            className={`focus-outline-none relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:ring-2 focus:ring-offset-2 ${
              theme === 'dark'
                ? 'bg-teal-500 focus:ring-teal-400 focus:ring-offset-[#0A090F]'
                : 'bg-purple-600 focus:ring-purple-500 focus:ring-offset-gray-100'
            }`}
            aria-label='Toggle theme'
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-1' : 'translate-x-7'
              }`}
            />
          </button>
        </div>
        <p className={`text-center text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Scroll down to activate the data prism...
        </p>
        <div className='h-[100vh]'></div>
        <AC_TikTokMetrics
          title={metricsData.title}
          primaryMetric={metricsData.primaryMetric}
          secondaryMetrics={metricsData.secondaryMetrics}
          theme={theme}
        />
        <div className='h-[50vh]'></div>
      </div>
    </div>
  );
}
