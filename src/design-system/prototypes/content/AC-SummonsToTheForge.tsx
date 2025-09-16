import { Command } from 'lucide-react';
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

interface CTAData {
  text: string;
  href: string;
}

interface AC_SummonsToTheForgeProps {
  cta?: CTAData;
}

export const AC_SummonsToTheForge: React.FC<AC_SummonsToTheForgeProps> = ({
  cta = { text: 'Enter the Command Center', href: '#' },
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const accentColor = theme === 'dark' ? '#2DD4BF' : '#9333EA';

  return (
    <>
      <style>{`
        @keyframes nebula-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes cta-sheen {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        @keyframes draw-circuit {
          to { stroke-dashoffset: 0; }
        }
        .summons-artifact {
          position: relative;
          overflow: hidden;
          transition: transform 0.5s ease-out;
        }
        .summons-nebula-bg {
          position: absolute;
          inset: -100%;
          background: radial-gradient(ellipse at center, rgba(${
            theme === 'dark' ? '45, 212, 191' : '147, 51, 234'
          }, 0.15) 0%, transparent 50%);
          animation: nebula-flow 20s linear infinite;
          transition: opacity 0.5s ease;
        }
        .summons-circuitry {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          stroke-width: 1;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
        .summons-artifact:hover .summons-circuitry {
          animation: draw-circuit 2s ease-in-out forwards;
        }
        .summons-grid-overlay {
          position: absolute;
          inset: 0;
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
        .summons-artifact::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${
            theme === 'dark' ? '45, 212, 191' : '147, 51, 234'
          }, 0.2), transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
        .summons-artifact:hover::before {
          opacity: 1;
        }
        .summons-emblem-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.5);
          animation: pulse 3s ease-in-out infinite;
          transition: all 0.5s ease;
        }
        .summons-artifact:hover .summons-emblem-pulse {
          animation-duration: 1.5s;
          transform: scale(1.2);
        }
        .summons-cta-button {
          position: relative;
          overflow: hidden;
        }
        .summons-cta-sheen {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          animation: cta-sheen 2.5s infinite linear;
          animation-delay: 1s;
        }
      `}</style>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='summons-artifact my-strategic rounded-executive border bg-card/60 backdrop-blur-xl'
      >
        <div className='summons-nebula-bg'></div>
        <div className='summons-grid-overlay'></div>
        <svg className='summons-circuitry' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M1 1H100V100' stroke={accentColor} strokeOpacity='0.3' />
          <path d='M1 200V100H200' stroke={accentColor} strokeOpacity='0.3' />
        </svg>

        <div className='relative z-10 flex flex-col items-center p-strategic text-center'>
          <div className='relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
            <div className='summons-emblem-pulse'></div>
            <Command
              size={40}
              className='relative text-primary transition-transform duration-500 group-hover:scale-110'
            />
          </div>
          <h3 className='text-3xl font-black text-foreground'>The Summons to the Forge</h3>
          <p className='mx-auto mt-2 max-w-md text-muted-foreground'>
            You&apos;ve seen the theory. Now it&apos;s time to command the practice. This is the entry point to the
            operational command center.
          </p>
          <a
            href={cta.href}
            className='summons-cta-button mt-6 inline-block transform rounded-lg bg-primary px-8 py-3 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90'
          >
            <span className='summons-cta-sheen'></span>
            <span className='relative'>{cta.text}</span>
          </a>
        </div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_SummonsToTheForge />;
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
