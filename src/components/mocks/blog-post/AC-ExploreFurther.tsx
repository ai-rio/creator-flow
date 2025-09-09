import * as React from 'react';
import { useRef, useState } from 'react';

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
const ArrowRight = ({ size = 24, className = '' }: any) => (
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
    <line x1='5' y1='12' x2='19' y2='12'></line>
    <polyline points='12 5 19 12 12 19'></polyline>
  </svg>
);

// --- Style Component for High-End 3D Effects ---
const HighEndStyle: React.FC<any> = ({ theme }: any) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        .perspective-container {
            perspective: 1000px;
        }
        .explore-container {
            position: relative;
            transition: transform 0.1s linear;
            transform-style: preserve-3d;
            transform: rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0));
        }
        .explore-container::before {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            border-radius: 16px;
            background: radial-gradient(
                400px circle at var(--mouse-x) var(--mouse-y),
                rgba(${accentColor}, 0.15),
                transparent 70%
            );
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
        }
        .explore-container:hover::before {
            opacity: 1;
        }
        .explore-card {
            transform: translateZ(40px);
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
            box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3);
        }
        .explore-container:hover .explore-card {
           box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
        }
        .explore-card:hover {
            transform: translateZ(60px) scale(1.05);
        }
        .explore-card .explore-arrow {
            transition: transform 0.3s ease;
        }
        .explore-card:hover .explore-arrow {
            transform: translateX(5px);
        }
    `}</style>
  );
};

// --- Component: AC-ExploreFurther (AAA+) ---
const AC_ExploreFurther: React.FC<any> = ({ relatedArticles, theme = 'dark' }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -10; // Reduced rotation for subtlety
    const rotateY = (x / rect.width - 0.5) * 10;

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    containerRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    containerRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--rotate-x', '0deg');
    containerRef.current.style.setProperty('--rotate-y', '0deg');
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      cardGlass: 'bg-slate-900/50 border-slate-800',
      cardCategory: 'text-teal-400',
      cardTitle: 'text-slate-100',
      cardIcon: 'text-slate-400',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      cardGlass: 'bg-white/70 border-slate-300',
      cardCategory: 'text-purple-600',
      cardTitle: 'text-slate-900',
      cardIcon: 'text-slate-500',
    },
  };
  const currentTheme = (themeClasses as any)[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div className={`perspective-container my-12 rounded-2xl border p-8 backdrop-blur-xl ${currentTheme.glass}`}>
        <h3 className={`mb-6 text-2xl font-bold ${currentTheme.title}`}>Explore Further</h3>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className='explore-container grid grid-cols-1 gap-6 md:grid-cols-3'
        >
          {relatedArticles.map((article: any, index: any) => (
            <a
              href={article.href}
              key={index}
              className={`explore-card group flex flex-col justify-between rounded-xl border p-6 ${currentTheme.cardGlass}`}
            >
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider ${currentTheme.cardCategory}`}>
                  {article.category}
                </p>
                <h4 className={`mt-2 text-lg font-bold ${currentTheme.cardTitle}`}>{article.title}</h4>
              </div>
              <div className={`mt-4 flex justify-end ${currentTheme.cardIcon}`}>
                <ArrowRight size={20} className='explore-arrow' />
              </div>
            </a>
          ))}
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

  const relatedArticlesData = [
    { category: 'Operations', title: 'Scaling from 50 to 500 Orders', href: '#' },
    { category: 'Market Intelligence', title: 'Identifying Untapped Product Niches', href: '#' },
    { category: 'Growth', title: 'The Viral Coefficient: A Deep Dive', href: '#' },
  ];

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-ExploreFurther</span>
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
        <AC_ExploreFurther relatedArticles={relatedArticlesData} theme={theme} />
      </div>
    </div>
  );
}
