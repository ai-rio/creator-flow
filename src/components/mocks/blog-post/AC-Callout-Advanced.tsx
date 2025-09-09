'use client';

import * as React from 'react';
import { useRef, useState } from 'react';

// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  theme?: 'dark' | 'light';
}

interface IconProps {
  size?: number;
  className?: string;
  style?: any;
}

// --- Lucide Icons (Self-Contained) ---
const Info: React.FC<IconProps> = ({ size = 24, className = '' }) => (
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
    <circle cx='12' cy='12' r='10'></circle>
    <line x1='12' y1='16' x2='12' y2='12'></line>
    <line x1='12' y1='8' x2='12.01' y2='8'></line>
  </svg>
);

const CheckCircle2: React.FC<IconProps> = ({ size = 24, className = '' }) => (
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
    <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'></path>
    <path d='m9 12 2 2 4-4'></path>
  </svg>
);

const AlertTriangle: React.FC<IconProps> = ({ size = 24, className = '' }) => (
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
    <path d='m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'></path>
    <line x1='12' y1='9' x2='12' y2='13'></line>
    <line x1='12' y1='17' x2='12.01' y2='17'></line>
  </svg>
);

const XOctagon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
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
    <polygon points='7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2'></polygon>
    <line x1='15' y1='9' x2='9' y2='15'></line>
    <line x1='9' y1='9' x2='15' y2='15'></line>
  </svg>
);

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle: React.FC = () => (
  <style>{`
        @keyframes signal-pulse {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        .callout-glass-pane {
            position: relative; 
            overflow: hidden;
        }
        .callout-glass-pane::before {
            content: '';
            position: absolute; z-index: 0; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 16px; 
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--highlight-color), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease-in-out;
            pointer-events: none;
        }
        .callout-glass-pane:hover::before {
            opacity: 1;
        }
        .callout-icon {
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
            filter: drop-shadow(0 0 5px var(--variant-color-transparent));
        }
        .callout-glass-pane:hover .callout-icon {
            transform: scale(1.1) rotate(-5deg);
            filter: drop-shadow(0 0 15px var(--variant-color));
        }
        .signal-pulse-effect {
            position: absolute;
            left: 2rem; top: 2rem;
            width: 40px; height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--variant-color) 0%, transparent 70%);
            opacity: 0;
            transform-origin: center;
            pointer-events: none;
            z-index: 0;
        }
        .callout-glass-pane:hover .signal-pulse-effect {
            animation: signal-pulse 0.6s ease-out forwards;
        }
    `}</style>
);

// --- Component: AC-Callout (Double AAA+) ---
const AC_Callout: React.FC<CalloutProps> = ({ children, title, variant = 'info', theme = 'dark' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const variantConfig = {
    info: { Icon: Info, dark: '45, 212, 191', light: '147, 51, 234' },
    success: { Icon: CheckCircle2, dark: '74, 222, 128', light: '34, 197, 94' },
    warning: { Icon: AlertTriangle, dark: '251, 191, 36', light: '245, 158, 11' },
    danger: { Icon: XOctagon, dark: '244, 63, 94', light: '220, 38, 38' },
  };

  const { Icon, ...colors } = variantConfig[variant];
  const variantColor = (colors as any)[theme];
  const highlightColor = `rgba(${variantColor}, 0.15)`;
  const variantColorOpaque = `rgb(${variantColor})`;
  const variantColorTransparent = `rgba(${variantColor}, 0.5)`;

  const themeClasses = {
    dark: { glass: 'bg-black/40 border-slate-800/80', title: 'text-slate-100', content: 'text-slate-300' },
    light: { glass: 'bg-white/60 border-slate-300', title: 'text-slate-900', content: 'text-slate-700' },
  };
  const currentTheme = themeClasses[theme];

  return (
    <>
      <HighEndStyle />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`callout-glass-pane my-8 rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
        style={
          {
            '--highlight-color': highlightColor,
            '--variant-color': variantColorOpaque,
            '--variant-color-transparent': variantColorTransparent,
            borderLeft: `4px solid ${variantColorOpaque}`,
          } as any
        }
      >
        <div className='signal-pulse-effect'></div>
        <div className='relative z-10 flex items-start p-6'>
          <Icon size={28} className='callout-icon mr-5 mt-1 flex-shrink-0' style={{ color: variantColorOpaque }} />
          <div className={`w-full text-base ${currentTheme.content}`}>
            {title && <h4 className={`!mb-2 !mt-0 text-lg font-bold ${currentTheme.title}`}>{title}</h4>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// --- Visualization App ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const toggleTheme = () => setTheme((prev: any) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-Callout</span>
          </h1>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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

        <AC_Callout variant='info' title='Informational Briefing' theme={theme as any}>
          <p>
            This is a living signal. Hover to witness the icon ignition and a volumetric pulse of energy, confirming the
            importance of this intelligence.
          </p>
        </AC_Callout>

        <AC_Callout variant='success' title='Mission Accomplished' theme={theme as any}>
          <p>
            The &quot;Double AAA+&quot; standard has been achieved. The signal pulse confirms a successful outcome with
            a vibrant, energetic cascade of light.
          </p>
        </AC_Callout>

        <AC_Callout variant='warning' title='Advisory: Proceed with Caution' theme={theme as any}>
          <p>
            This signal demands attention. The amber pulse reinforces the need for careful consideration of the critical
            data contained within.
          </p>
        </AC_Callout>

        <AC_Callout variant='danger' title='Critical Alert: Action Required' theme={theme as any}>
          <p>
            A signal of maximum importance. The crimson pulse is an unmissable warning, reserved for non-negotiable
            risks and critical directives.
          </p>
        </AC_Callout>
      </div>
    </div>
  );
}
