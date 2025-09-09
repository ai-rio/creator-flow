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

// --- Lucide Icon for Emblem ---
const CommandIcon = ({ size = 24, className = '' }: any) => (
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
    <path d='M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z'></path>
  </svg>
);

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle: React.FC<any> = ({ theme }: any) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
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
            background: radial-gradient(ellipse at center, rgba(${accentColor}, 0.15) 0%, transparent 50%);
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
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.2), transparent 50%);
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
            background: rgba(${accentColor}, 0.5);
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
  );
};

// --- Component: AC-SummonsToTheForge (Double AAA+) ---
const AC_SummonsToTheForge: React.FC<any> = ({ cta, theme = 'dark' }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      headline: 'text-slate-100',
      text: 'text-slate-300',
      emblemBg: 'bg-slate-900',
      ctaBg: 'bg-teal-500 hover:bg-teal-400',
      ctaText: 'text-white',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      headline: 'text-slate-900',
      text: 'text-slate-700',
      emblemBg: 'bg-slate-200',
      ctaBg: 'bg-purple-600 hover:bg-purple-500',
      ctaText: 'text-white',
    },
  };
  const currentTheme = (themeClasses as any)[theme];
  const accentColor = theme === 'dark' ? '#2DD4BF' : '#9333EA';

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`summons-artifact my-12 rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
      >
        <div className='summons-nebula-bg'></div>
        <div className='summons-grid-overlay'></div>
        <svg className='summons-circuitry' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M1 1H100V100' stroke={accentColor} strokeOpacity='0.3' />
          <path d='M1 200V100H200' stroke={accentColor} strokeOpacity='0.3' />
        </svg>

        <div className='relative z-10 flex flex-col items-center p-8 text-center'>
          <div
            className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-full ${currentTheme.emblemBg}`}
          >
            <div className='summons-emblem-pulse'></div>
            <CommandIcon
              size={40}
              className={`relative transition-transform duration-500 group-hover:scale-110 ${
                theme === 'dark' ? 'text-teal-400' : 'text-purple-500'
              }`}
            />
          </div>
          <h3 className={`text-3xl font-black ${currentTheme.headline}`}>The Summons to the Forge</h3>
          <p className={`mx-auto mt-2 max-w-md ${currentTheme.text}`}>
            You&apos;ve seen the theory. Now it&apos;s time to command the practice. This is the entry point to the
            operational command center.
          </p>
          <a
            href={cta.href}
            className={`summons-cta-button mt-6 inline-block transform rounded-lg px-8 py-3 font-bold transition-all duration-300 hover:scale-105 ${currentTheme.ctaBg} ${currentTheme.ctaText}`}
          >
            <span className='summons-cta-sheen'></span>
            <span className='relative'>{cta.text}</span>
          </a>
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

  const ctaData = { text: 'Enter the Command Center', href: '#' };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-SummonsToTheForge</span>
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
        <AC_SummonsToTheForge cta={ctaData} theme={theme} />
      </div>
    </div>
  );
}
