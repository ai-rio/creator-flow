import React, { useState, useEffect, useRef } from 'react';

// --- Style Component for Genesis Artifact Effects (Self-Contained) ---
const HighEndStyle = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        @keyframes nebula-drift {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(15px, 10px) scale(1.1); }
            100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes slow-pulse {
            0%, 100% { text-shadow: 0 0 15px rgba(${accentColor}, 0.3); }
            50% { text-shadow: 0 0 25px rgba(${accentColor}, 0.5); }
        }
        @keyframes final-flash {
            0% { opacity: 0.7; }
            100% { opacity: 0; }
        }
        @keyframes type-writer {
            from { width: 0; }
            to { width: 100%; }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes forge-char {
            0% { opacity: 0; transform: translateY(20px) scale(0.5); text-shadow: 0 0 50px rgba(255,255,255,1); }
            80% { opacity: 1; transform: translateY(0) scale(1.1); text-shadow: 0 0 20px rgba(${accentColor}, 0.7); }
            100% { opacity: 1; transform: translateY(0) scale(1); text-shadow: 0 0 15px rgba(${accentColor}, 0.3); }
        }

        .hero-artifact {
            position: relative;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .hero-layer {
            position: absolute;
            inset: 0;
            opacity: 0;
        }
        .is-initializing .hero-layer {
            animation: fade-in 1s ease-out forwards;
        }
        .hero-grid-layer {
            background-size: 50px 50px;
            background-image: linear-gradient(to right, rgba(${accentColor}, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(${accentColor}, 0.1) 1px, transparent 1px);
        }
        .hero-nebula-layer {
            background: radial-gradient(ellipse at 50% 50%, rgba(${accentColor}, 0.1) 0%, transparent 60%);
            animation: nebula-drift 25s ease-in-out infinite;
        }
        .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            color: ${theme === 'dark' ? '#fff' : '#000'};
        }
        .hero-category {
            opacity: 0;
            font-family: monospace;
            overflow: hidden;
            white-space: nowrap;
            border-right: .1em solid rgba(${accentColor}, 0.7);
        }
        .is-initializing .hero-category {
            opacity: 1;
            animation: type-writer 1s steps(40, end) 1s forwards;
        }
        .hero-title-char {
            opacity: 0;
            display: inline-block;
        }
        .is-initializing .hero-title-char {
            animation: forge-char 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-meta {
            opacity: 0;
        }
        .is-initializing .hero-meta {
            animation: fade-in 1s ease-out 3.5s forwards;
        }
        .hero-title {
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 900;
            letter-spacing: -0.02em;
            margin: 1rem 0;
        }
        .is-initializing .hero-title {
            animation: slow-pulse 4s ease-in-out infinite 4s;
        }
        .final-flash {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.8);
            opacity: 0;
            pointer-events: none;
            z-index: 100;
        }
         .is-initializing .final-flash {
            animation: final-flash 0.6s ease-out 3s forwards;
        }
    `}</style>
  );
};

// --- Component: AC-ArticleHero (Genesis Artifact - Reforged) ---
const AC_ArticleHero = ({ category, title, author, date, theme = 'dark' }) => {
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    // Trigger the animation sequence shortly after the component mounts.
    const timer = setTimeout(() => setIsInitializing(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const themeClasses = {
    dark: { text: 'text-slate-300', title: 'text-white' },
    light: { text: 'text-slate-700', title: 'text-black' },
  };
  const currentTheme = themeClasses[theme];

  // Split title into characters for the forging animation
  const titleChars = title.split('').map((char, index) => (
    <span key={index} className='hero-title-char' style={{ animationDelay: `${2 + index * 0.05}s` }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <>
      <HighEndStyle theme={theme} />
      <div className={`hero-artifact ${isInitializing ? 'is-initializing' : ''}`}>
        <div className='hero-layer hero-grid-layer'></div>
        <div className='hero-layer hero-nebula-layer'></div>
        <div className='final-flash'></div>

        <div className={`hero-content ${currentTheme.text}`}>
          <p
            className={`hero-category font-mono text-lg font-bold uppercase tracking-widest ${
              theme === 'dark' ? 'text-teal-400' : 'text-purple-600'
            }`}
          >
            {category}
          </p>
          <h1 className={`hero-title ${currentTheme.title}`}>{titleChars}</h1>
          <div className='hero-meta font-semibold'>
            <span>By {author}</span>
            <span className='mx-2'>&bull;</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Visualization App ---
export default function App() {
  const [theme, setTheme] = useState('dark');

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  const heroData = {
    category: 'Master Implementation Plan',
    title: 'The Genesis Artifact',
    author: 'Commander Thorne',
    date: '2025-09-09',
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${pageThemes[theme]}`}>
      {/* A key is used here to force re-mount and re-play the animation */}
      <AC_ArticleHero key={theme} {...heroData} theme={theme} />

      <div className='fixed right-4 top-4 z-20'>
        <button
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
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
    </div>
  );
}
