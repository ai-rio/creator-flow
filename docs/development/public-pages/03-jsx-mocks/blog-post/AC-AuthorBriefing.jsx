import React, { useState, useRef, useEffect } from 'react';

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

// --- Style Component for High-End Effects ---
const HighEndStyle = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        .author-avatar-container {
            position: relative;
        }
        .author-avatar-ring {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
            transform: scale(0.9);
            opacity: 0;
            z-index: -1;
        }
        .author-avatar-container:hover .author-avatar-ring {
            transform: scale(1.1);
            opacity: 1;
        }
        .author-avatar-container:hover .author-avatar-image {
            transform: scale(1.05);
        }
        .author-avatar-image {
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .author-social-icon {
            transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .author-social-link:hover .author-social-icon {
            transform: scale(1.2) rotate(-10deg);
        }
        .author-glass-pane {
            position: relative; /* Needed for the glow pseudo-element */
            background-size: 3px 3px;
            background-image: ${
              theme === 'dark'
                ? 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0)'
                : 'radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)'
            };
        }
        /* RE-FORGED: Magnetic Edge Highlight */
        .author-glass-pane::before {
            content: '';
            position: absolute;
            z-index: 1; /* Place it above the content but below the text */
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            border-radius: 16px; 
            background: radial-gradient(
                350px circle at var(--mouse-x) var(--mouse-y),
                rgba(${accentColor}, 0.2),
                transparent 80%
            );
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none; /* Allows clicks to go through */
        }
        .author-glass-pane:hover::before {
            opacity: 1;
        }
    `}</style>
  );
};

// --- Component: AC-AuthorBriefing (High-End) ---
const AC_AuthorBriefing = ({ author, theme = 'dark' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      name: 'text-slate-100',
      bio: 'text-slate-300',
      socialLink: 'text-slate-400 hover:text-white',
      avatarRing: 'border-teal-400/50',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      name: 'text-slate-900',
      bio: 'text-slate-700',
      socialLink: 'text-slate-500 hover:text-slate-900',
      avatarRing: 'border-purple-600/50',
    },
  };
  const currentTheme = themeClasses[theme];

  const socialIconMap = {
    twitter: <TwitterX size={20} className='author-social-icon' />,
    linkedin: <Linkedin size={20} className='author-social-icon' />,
  };

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`author-glass-pane my-12 rounded-2xl border p-8 backdrop-blur-xl ${currentTheme.glass}`}
      >
        <div className='relative z-10 flex flex-col items-center gap-8 sm:flex-row'>
          <div className='author-avatar-container flex-shrink-0'>
            <div
              className={`author-avatar-ring absolute inset-0 rounded-full border-2 ${currentTheme.avatarRing}`}
            ></div>
            <img
              src={author.avatarUrl}
              alt={author.name}
              className='author-avatar-image h-24 w-24 rounded-full border-2 border-white/10 sm:h-28 sm:w-28'
            />
          </div>

          <div className='text-center sm:text-left'>
            <h4 className={`text-2xl font-bold ${currentTheme.name}`}>{author.name}</h4>
            <p className={`mt-2 text-base leading-relaxed ${currentTheme.bio}`}>{author.bio}</p>
            <div className='mt-4 flex items-center justify-center gap-4 sm:justify-start'>
              {author.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Follow ${author.name} on ${social.platform}`}
                  className={`author-social-link p-2 transition-colors duration-200 ${currentTheme.socialLink}`}
                >
                  {socialIconMap[social.platform]}
                </a>
              ))}
            </div>
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

  const authorData = {
    name: 'Commander Alex Thorne',
    avatarUrl: 'https://placehold.co/112x112/0A090F/FFFFFF?text=AT',
    bio: 'Forging definitive strategies at the intersection of creator economics and operational command. Commander Thorne architects the systems that transform ambitious creators into market-defining forces.',
    socials: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-AuthorBriefing</span>
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
        <AC_AuthorBriefing author={authorData} theme={theme} />
      </div>
    </div>
  );
}
