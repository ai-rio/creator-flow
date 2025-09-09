import React, { useState } from 'react';

// --- Lucide Icons (Self-Contained) ---
const Info = ({ size = 24, className = '' }) => (
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
const CheckCircle2 = ({ size = 24, className = '' }) => (
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
const AlertTriangle = ({ size = 24, className = '' }) => (
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
const XOctagon = ({ size = 24, className = '' }) => (
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

// --- Component: AC-Callout ---
// A multi-variant component to emphasize information and create semantic blocks for GEO.
const AC_Callout = ({ children, title, variant = 'info', theme = 'dark' }) => {
  const variantConfig = {
    info: { Icon: Info, dark: 'border-teal-400/50 text-teal-400', light: 'border-purple-600/50 text-purple-600' },
    success: {
      Icon: CheckCircle2,
      dark: 'border-green-500/50 text-green-500',
      light: 'border-green-600/50 text-green-600',
    },
    warning: {
      Icon: AlertTriangle,
      dark: 'border-amber-400/50 text-amber-400',
      light: 'border-amber-500/50 text-amber-500',
    },
    danger: { Icon: XOctagon, dark: 'border-red-500/50 text-red-500', light: 'border-red-600/50 text-red-600' },
  };

  const themeClasses = {
    dark: { glass: 'bg-black/40 border-slate-800/80', title: 'text-slate-100', content: 'text-slate-300' },
    light: { glass: 'bg-white/60 border-slate-300', title: 'text-slate-900', content: 'text-slate-700' },
  };

  const { Icon, ...variantClasses } = variantConfig[variant];
  const currentVariantClass = variantClasses[theme];
  const currentTheme = themeClasses[theme];

  return (
    <div
      className={`my-8 flex items-start rounded-xl border border-l-4 p-6 backdrop-blur-xl ${currentTheme.glass} ${currentVariantClass}`}
    >
      <Icon size={24} className={`mr-4 mt-1 flex-shrink-0`} />
      <div className={`w-full text-base ${currentTheme.content}`}>
        {title && <h4 className={`!mb-2 !mt-0 text-lg font-bold ${currentTheme.title}`}>{title}</h4>}
        {children}
      </div>
    </div>
  );
};

// --- Visualization App ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
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

        <AC_Callout variant='info' title='Informational Briefing' theme={theme}>
          This callout uses the theme's primary accent color. It's designed to provide helpful context or supplementary
          details that support the main content.
        </AC_Callout>

        <AC_Callout variant='success' title='Mission Accomplished' theme={theme}>
          Use this variant to confirm a successful outcome or highlight a key achievement. It provides positive
          reinforcement to the reader.
        </AC_Callout>

        <AC_Callout variant='warning' title='Advisory: Proceed with Caution' theme={theme}>
          This variant signals that the reader should pay close attention. It's ideal for prerequisites, potential
          gotchas, or information that requires careful consideration.
        </AC_Callout>

        <AC_Callout variant='danger' title='Critical Alert: Action Required' theme={theme}>
          Reserved for the most critical information. This callout indicates a non-negotiable warning, a destructive
          action, or a significant risk. Use sparingly for maximum impact.
        </AC_Callout>
      </div>
    </div>
  );
}
