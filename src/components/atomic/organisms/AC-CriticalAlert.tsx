/* eslint-disable */
'use client';

import { XOctagon } from 'lucide-react';
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

// Component Props Interface
interface CriticalAlertProps {
  children: React.ReactNode;
  className?: string;
}

// Style Component for Effects
const CriticalAlertStyles: React.FC = () => (
  <style>{`
        @keyframes critical-pulse {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        .critical-alert-pane {
            position: relative; 
            overflow: hidden;
        }
        .critical-alert-pane::before {
            content: '';
            position: absolute; z-index: 0; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 16px; 
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(244, 63, 94, 0.15), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease-in-out;
            pointer-events: none;
        }
        .critical-alert-pane:hover::before {
            opacity: 1;
        }
        .critical-alert-icon {
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
            filter: drop-shadow(0 0 5px rgba(244, 63, 94, 0.5));
        }
        .critical-alert-pane:hover .critical-alert-icon {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgb(244, 63, 94));
        }
        .critical-signal-pulse {
            position: absolute;
            left: 2rem; top: 2rem;
            width: 40px; height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, rgb(244, 63, 94) 0%, transparent 70%);
            opacity: 0;
            transform-origin: center;
            pointer-events: none;
            z-index: 0;
        }
        .critical-alert-pane:hover .critical-signal-pulse {
            animation: critical-pulse 0.6s ease-out forwards;
        }
    `}</style>
);

// Main Component
const AC_CriticalAlert: React.FC<CriticalAlertProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <CriticalAlertStyles />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`critical-alert-pane my-strategic rounded-executive border border-border/20 bg-card/60 backdrop-blur-xl ${className}`}
        style={{
          borderLeft: '4px solid rgb(244, 63, 94)',
        }}
      >
        <div className='critical-signal-pulse'></div>
        <div className='relative z-10 flex items-start p-strategic'>
          <XOctagon
            size={28}
            className='critical-alert-icon mr-tactical mt-1 flex-shrink-0'
            style={{ color: 'rgb(244, 63, 94)' }}
          />
          <div className='w-full text-body-md text-foreground'>
            <h4 className='mb-tactical mt-0 text-heading-md font-bold text-foreground'>
              Critical Alert: Action Required
            </h4>
            <div className='text-muted-foreground'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='space-y-strategic p-strategic'>
      <AC_CriticalAlert>
        <p>
          A signal of maximum importance. The crimson pulse is an unmissable warning, reserved for non-negotiable risks
          and critical directives.
        </p>
      </AC_CriticalAlert>
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <div className='min-h-screen bg-background'>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </div>
  );
}
