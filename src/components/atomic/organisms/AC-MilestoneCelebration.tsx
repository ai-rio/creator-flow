import { Award } from 'lucide-react';
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

// Particle Burst Component
const Particles: React.FC<{ isBursting: boolean; theme: string }> = ({ isBursting, theme }) => {
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
            className={`absolute rounded-full opacity-0 will-change-transform ${isBursting ? 'animate-burst' : ''}`}
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
              } as React.CSSProperties & { [key: string]: string }
            }
          />
        );
      })}
    </div>
  );
};

interface AC_MilestoneCelebrationProps {
  metric?: string;
  metricLabel?: string;
  title?: string;
  children?: React.ReactNode;
}

export const AC_MilestoneCelebration: React.FC<AC_MilestoneCelebrationProps> = ({
  metric = '10,000',
  metricLabel = 'Followers',
  title = 'Community Command',
  children = "You've officially surpassed the 10k follower threshold. Your voice is now a significant force in the market, capable of shaping trends and commanding attention.",
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const metricRef = useRef<HTMLSpanElement>(null);
  const [containerRef, isInView] = useInView({ threshold: 0.5 });
  const [isBursting, setIsBursting] = useState<boolean>(false);

  useEffect(() => {
    if (isInView && metricRef.current) {
      setIsBursting(true);
      const target = parseInt(metric.replace(/,/g, ''), 10);
      let current = 0;
      const duration = 2000;
      const startTime = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(easeOutCubic(progress) * target);
        if (metricRef.current) metricRef.current.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
        else if (metricRef.current) metricRef.current.textContent = target.toLocaleString();
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, metric]);

  return (
    <>
      <style>{`
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
        .animate-burst {
          animation: burst 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <div
        ref={containerRef}
        className='relative my-strategic overflow-hidden rounded-executive border bg-card/60 p-strategic text-center shadow-[inset_0_0_40px_rgba(var(--primary-rgb),0.1)] backdrop-blur-xl'
      >
        <Particles isBursting={isBursting} theme={theme} />
        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10'>
          <Award size={32} className='text-primary' />
        </div>
        <div>
          <span
            ref={metricRef}
            className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-7xl font-black text-transparent'
          >
            0
          </span>
          <span className='ml-2 text-4xl font-bold text-primary'>{metricLabel}</span>
        </div>
        <h4 className='mt-2 text-xl font-bold text-foreground'>{title}</h4>
        <div className='mx-auto mt-2 max-w-md text-base text-muted-foreground'>{children}</div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <AC_MilestoneCelebration />
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
