import * as React from 'react';
import { useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Lucide Icon for Unordered Lists ---
const ChevronRight = ({ size = 24, className = '' }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='m9 18 6-6-6-6'></path>
  </svg>
);

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle: React.FC<any> = ({ theme }: any) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  const accentGradient =
    theme === 'dark' ? 'linear-gradient(to bottom, #2DD4BF, #67e8f9)' : 'linear-gradient(to bottom, #9333EA, #d946ef)';

  return (
    <style>{`
        @keyframes conduit-flow {
            from { background-position: 0 0; }
            to { background-position: 0 100%; }
        }
        .command-list-container {
            position: relative;
            padding-left: 40px; /* Space for the conduit */
        }
        .power-conduit {
            position: absolute;
            left: 11px; /* (24px node width / 2) - (2px conduit width / 2) */
            top: 0;
            bottom: 0;
            width: 2px;
            background-size: 100% 200%;
            background-image: ${accentGradient};
            animation: conduit-flow 5s linear infinite;
        }
        .command-list-item {
            position: relative;
            padding-left: 30px; /* Space for the node and trace */
            padding-bottom: 2.5rem; /* 40px */
        }
        .command-list-item:last-child {
            padding-bottom: 0;
        }
        .item-node {
            position: absolute;
            left: -12px; /* (24px node width / 2) */
            top: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid rgba(${accentColor}, 0.5);
            background: ${theme === 'dark' ? '#0A090F' : '#f1f5f9'};
            transition: all 0.3s ease;
        }
        .command-list-item:hover .item-node {
            background: rgba(${accentColor}, 0.2);
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(${accentColor}, 0.5);
        }
        .energy-trace {
            position: absolute;
            left: 12px;
            top: 11px;
            height: 2px;
            width: 18px; /* 30px padding-left - 12px node */
            background: rgba(${accentColor}, 0.8);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .command-list-item:hover .energy-trace {
            transform: scaleX(1);
        }
        .item-identifier {
            transition: color 0.3s ease;
        }
        .command-list-item:hover .item-identifier {
            color: rgba(${accentColor}, 1);
            text-shadow: 0 0 10px rgba(${accentColor}, 0.5);
        }
        .item-content {
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        .command-list-item:hover .item-content {
            transform: translateY(-2px);
        }
    `}</style>
  );
};

// --- Component: AC-CommandList (Double AAA+) ---
const AC_CommandList: React.FC<any> = ({ items, ordered = true, theme = 'dark' }: any) => {
  const themeClasses = {
    dark: { title: 'text-slate-100', text: 'text-slate-400', identifier: 'text-slate-500' },
    light: { title: 'text-slate-900', text: 'text-slate-600', identifier: 'text-slate-400' },
  };
  const currentTheme = (themeClasses as any)[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div className='my-12'>
        <div className='command-list-container'>
          <div className='power-conduit'></div>
          <div className='space-y-0'>
            {items.map((item: any, index: any) => (
              <div key={index} className='command-list-item'>
                <div className='item-node'></div>
                <div className='energy-trace'></div>
                <div className='item-content'>
                  <div className='flex items-center gap-3'>
                    <span className={`item-identifier text-2xl font-black ${currentTheme.identifier}`}>
                      {ordered ? `${String(index + 1).padStart(2, '0')}` : <ChevronRight size={20} />}
                    </span>
                    <h4 className={`text-xl font-bold ${currentTheme.title}`}>{item.title}</h4>
                  </div>
                  <p className={`mt-1 pl-10 text-base ${currentTheme.text}`}>{item.description}</p>
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

  const pageThemes = { dark: 'bg-[#0A090F]', light: 'bg-gradient-to-b from-indigo-100 to-white' };

  const listItems = [
    {
      title: 'Define the Mission',
      description: 'Establish the absolute, non-negotiable objective. Clarity of purpose is the bedrock of command.',
    },
    {
      title: 'Forge the Instruments',
      description: 'Architect and build the necessary tools and systems. Each component must meet the standard.',
    },
    {
      title: 'Execute with Precision',
      description: 'Deploy the strategy. Monitor feedback. Calibrate in real-time. The standard is flawless execution.',
    },
    {
      title: 'Analyze the Aftermath',
      description:
        'Review all operational data. Integrate learnings. Prepare for the next engagement, stronger and smarter.',
    },
  ];

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-CommandList</span>
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
        <AC_CommandList items={listItems} ordered={true} theme={theme} />
      </div>
    </div>
  );
}
