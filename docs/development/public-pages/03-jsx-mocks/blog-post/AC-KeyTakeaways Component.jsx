import React, { useState } from 'react';

// --- Lucide Icon ---
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

// --- Component: AC-KeyTakeaways ---
// A modular component designed for high scannability and SEO/GEO value.
// It presents a summary of the article's core thesis.
const AC_KeyTakeaways = ({ title = 'Key Takeaways', takeaways, theme = 'dark' }) => {
  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      listItem: 'text-slate-300',
      icon: 'text-teal-400',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      listItem: 'text-slate-700',
      icon: 'text-purple-600',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <div className={`my-8 rounded-xl border p-6 backdrop-blur-xl ${currentTheme.glass}`}>
      <h3 className={`mb-4 flex items-center text-lg font-bold ${currentTheme.title}`}>{title}</h3>
      <ul className='space-y-4'>
        {takeaways.map((point, index) => (
          <li key={index} className='flex items-start text-base'>
            <CheckCircle2 size={20} className={`mr-4 mt-1 flex-shrink-0 ${currentTheme.icon}`} />
            <span className={currentTheme.listItem}>{point}</span>
          </li>
        ))}
      </ul>
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

  const mockTakeaways = [
    "Generative Engine Optimization (GEO) requires structuring content as modular, high-value 'answer blocks'.",
    'Key Takeaways sections are magnets for AI-powered summaries and featured snippets, establishing authority.',
    'Modular component architecture is not just a design choice; it is a core SEO/GEO strategy.',
  ];

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-KeyTakeaways</span>
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

        <AC_KeyTakeaways title='The Briefing' takeaways={mockTakeaways} theme={theme} />

        <p className={`mt-12 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          This component is designed to be placed at the top of an article. It provides immediate value to the reader
          and presents a perfect, crawlable summary for search engines and AI. This is a primary weapon in our SEO and
          Generative Engine Optimization (GEO) arsenal.
        </p>
      </div>
    </div>
  );
}
