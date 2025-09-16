/* eslint-disable */
'use client';

import { AlertTriangle } from 'lucide-react';
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
interface ProceedWithCautionProps {
  children: React.ReactNode;
  className?: string;
}

// Style Component for Effects
const ProceedWithCautionStyles: React.FC = () => (
  <style>{`
        @keyframes warning-pulse {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        .proceed-caution-pane {
            position: relative; 
            overflow: hidden;
        }
        .proceed-caution-pane::before {
            content: '';
            position: absolute; z-index: 0; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 16px; 
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(251, 191, 36, 0.15), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease-in-out;
            pointer-events: none;
        }
        .proceed-caution-pane:hover::before {
            opacity: 1;
        }
        .proceed-caution-icon {
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
            filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.5));
        }
        .proceed-caution-pane:hover .proceed-caution-icon {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px rgb(251, 191, 36));
        }
        .warning-signal-pulse {
            position: absolute;
            left: 2rem; top: 2rem;
            width: 40px; height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, rgb(251, 191, 36) 0%, transparent 70%);
            opacity: 0;
            transform-origin: center;
            pointer-events: none;
            z-index: 0;
        }
        .proceed-caution-pane:hover .warning-signal-pulse {
            animation: warning-pulse 0.6s ease-out forwards;
        }
    `}</style>
);

// Main Component
const AC_ProceedWithCaution: React.FC<ProceedWithCautionProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <ProceedWithCautionStyles />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`proceed-caution-pane my-strategic rounded-executive border border-border/20 bg-card/60 backdrop-blur-xl ${className}`}
        style={{
          borderLeft: '4px solid rgb(251, 191, 36)',
        }}
      >
        <div className='warning-signal-pulse'></div>
        <div className='relative z-10 flex items-start p-strategic'>
          <AlertTriangle
            size={28}
            className='proceed-caution-icon mr-tactical mt-1 flex-shrink-0'
            style={{ color: 'rgb(251, 191, 36)' }}
          />
          <div className='w-full text-body-md text-foreground'>
            <h4 className='mb-tactical mt-0 text-heading-md font-bold text-foreground'>
              Advisory: Proceed with Caution
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
      <AC_ProceedWithCaution>
        <p>
          This signal demands attention. The amber pulse reinforces the need for careful consideration of the critical
          data contained within.
        </p>
      </AC_ProceedWithCaution>
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
