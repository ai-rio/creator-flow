import React, { useState, useEffect } from 'react';

// --- Lucide Icons (Self-Contained) ---
const TwitterX = ({ size = 24, className = '' }) => (
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
    <path d='M18 6 6 18'></path>
    <path d='m6 6 12 12'></path>
  </svg>
);
const Linkedin = ({ size = 24, className = '' }) => (
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
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
    <rect x='2' y='9' width='4' height='12'></rect>
    <circle cx='4' cy='4' r='2'></circle>
  </svg>
);
const Link = ({ size = 24, className = '' }) => (
  <svg
    xmlns='http://www.w.w3.org/2000/svg'
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
    <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72'></path>
    <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72'></path>
  </svg>
);
const Check = ({ size = 24, className = '' }) => (
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
    <polyline points='20 6 9 17 4 12'></polyline>
  </svg>
);

// --- Style Component for Sparkle Animation ---
const SparkleStyle = () => (
  <style>{`
        @keyframes spark {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
            80% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }

        .sparkle-button {
            position: relative;
            overflow: hidden;
        }

        .sparkle-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 120%;
            height: 120%;
            background-image: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            pointer-events: none;
        }

        .sparkle-button:hover::before {
            animation: spark 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        
        .sparkle-icon {
            transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            will-change: transform;
        }
        
        .sparkle-button:hover .sparkle-icon {
            transform: scale(1.2) rotate(-10deg);
        }
    `}</style>
);

// --- Component: AC-ShareDossier ---
const AC_ShareDossier = ({ articleTitle, theme = 'dark' }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
      articleTitle
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      button: 'text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      button: 'text-slate-600 hover:text-slate-900 bg-slate-100/50 hover:bg-slate-200',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <>
      <SparkleStyle />
      <div className={`my-12 rounded-xl border p-4 backdrop-blur-xl sm:p-6 ${currentTheme.glass}`}>
        <div className='flex flex-col items-center justify-between sm:flex-row'>
          <h4 className={`mb-4 text-lg font-semibold sm:mb-0 ${currentTheme.title}`}>Share This Dossier</h4>
          <div className='flex items-center gap-2'>
            <a
              href={shareLinks.twitter}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Share on Twitter'
              className={`sparkle-button rounded-full p-3 transition-colors duration-200 ${currentTheme.button}`}
            >
              <TwitterX size={20} className='sparkle-icon' />
            </a>
            <a
              href={shareLinks.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Share on LinkedIn'
              className={`sparkle-button rounded-full p-3 transition-colors duration-200 ${currentTheme.button}`}
            >
              <Linkedin size={20} className='sparkle-icon' />
            </a>
            <button
              onClick={handleCopy}
              className={`sparkle-button flex items-center gap-2 rounded-full p-3 transition-colors duration-200 ${currentTheme.button}`}
            >
              {isCopied ? <Check size={20} className='text-green-500' /> : <Link size={20} className='sparkle-icon' />}
              <span className='text-sm font-semibold'>{isCopied ? 'Copied!' : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </>
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

  const articleTitle = 'Architecting the Definitive Command Center';

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-ShareDossier</span>
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
        <AC_ShareDossier articleTitle={articleTitle} theme={theme} />
      </div>
    </div>
  );
}
