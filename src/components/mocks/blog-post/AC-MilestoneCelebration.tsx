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

// --- Lucide Icon (Self-Contained) ---
const Award = ({ size = 24, className = '' }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <circle cx='12' cy='8' r='7'></circle>
    <polyline points='8.21 13.89 7 23 12 17 17 23 15.79 13.88'></polyline>
  </svg>
);

// --- Style Component for Particle Animation ---
const ParticleStyle = () => (
  <style>{`
        .particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            will-change: transform, opacity;
        }
        .particle.animate {
            animation: burst 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes burst {
            0% {
                transform: scale(0.5) translate(0, 0);
                opacity: 1;
            }
            100% {
                transform: scale(1) translate(var(--x), var(--y));
                opacity: 0;
            }
        }
    `}</style>
);

// --- Particle Burst Component ---
const Particles: React.FC<any> = ({ isBursting, theme }: any) => {
  const accentColor = theme === 'dark' ? '#2DD4BF' : '#9333EA';
  const particles = Array.from({ length: 20 });
  return (
    <div className='pointer-events-none absolute inset-0'>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const distance = 80 + Math.random() * 40;
        const size = 2 + Math.random() * 4;
        const delay = Math.random() * 200;
        return (
          <div
            key={i}
            className={`particle ${isBursting ? 'animate' : ''}`}
            style={
              {
                '--x': `${Math.cos((angle * Math.PI) / 180) * distance}px`,
                '--y': `${Math.sin((angle * Math.PI) / 180) * distance}px`,
                width: `${size}px`,
                height: `${size}px`,
                top: '50%',
                left: '50%',
                background: accentColor,
                animationDelay: `${delay}ms`,
              } as any
            }
          />
        );
      })}
    </div>
  );
};

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

// --- Component: AC-MilestoneCelebration (AAA+) ---
const AC_MilestoneCelebration: React.FC<any> = ({ metric, metricLabel, title, children, theme = 'dark' }: any) => {
  const metricRef = useRef(null);
  const [containerRef, isInView] = useInView({ threshold: 0.5 });
  const [isBursting, setIsBursting] = useState<boolean>(false);

  useEffect(() => {
    if (isInView && metricRef.current) {
      setIsBursting(true);
      const target = parseInt(metric.replace(/,/g, ''), 10);
      let current = 0;
      const duration = 2000;
      const startTime = performance.now();
      const easeOutCubic = (t: any) => 1 - Math.pow(1 - t, 3);

      const animate = (timestamp: any) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(easeOutCubic(progress) * target);
        if (metricRef.current) (metricRef.current as any).textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
        else if (metricRef.current) (metricRef.current as any).textContent = target.toLocaleString();
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, metric]);

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      glow: 'shadow-[inset_0_0_40px_rgba(45,212,191,0.1)]',
      metricGradient: 'from-slate-100 to-slate-400',
      label: 'text-teal-400',
      title: 'text-slate-100',
      text: 'text-slate-300',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      glow: 'shadow-[inset_0_0_40px_rgba(147,51,234,0.1)]',
      metricGradient: 'from-slate-800 to-slate-600',
      label: 'text-purple-600',
      title: 'text-slate-900',
      text: 'text-slate-700',
    },
  };
  const currentTheme = (themeClasses as any)[theme];

  return (
    <>
      <ParticleStyle />
      <div
        ref={containerRef as any}
        className={`relative my-12 overflow-hidden rounded-2xl border p-8 text-center backdrop-blur-xl ${currentTheme.glass} ${currentTheme.glow}`}
      >
        <Particles isBursting={isBursting} theme={theme} />
        <div
          className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${
            theme === 'dark' ? 'from-teal-900 to-slate-800' : 'from-purple-200 to-indigo-100'
          }`}
        >
          <Award size={32} className={currentTheme.label} />
        </div>
        <div>
          <span
            ref={metricRef}
            className={`bg-gradient-to-b bg-clip-text text-7xl font-black text-transparent ${currentTheme.metricGradient}`}
          >
            0
          </span>
          <span className={`ml-2 text-4xl font-bold ${currentTheme.label}`}>{metricLabel}</span>
        </div>
        <h4 className={`mt-2 text-xl font-bold ${currentTheme.title}`}>{title}</h4>
        <div className={`mx-auto mt-2 max-w-md text-base ${currentTheme.text}`}>{children}</div>
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

  return (
    <div className={`min-h-[200vh] p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-MilestoneCelebration</span>
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
          Scroll down to trigger the celebration...
        </p>
        <div className='h-[100vh]'></div>
        <AC_MilestoneCelebration metric='10,000' metricLabel='Followers' title='Community Command' theme={theme}>
          <p>
            You&apos;ve officially surpassed the 10k follower threshold. Your voice is now a significant force in the
            market, capable of shaping trends and commanding attention.
          </p>
        </AC_MilestoneCelebration>
        <div className='h-[50vh]'></div>
      </div>
    </div>
  );
}
