import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook for In-View Detection (RE-ARCHITECTED) ---
const useIntersectionObserver = (setActiveId, options) => {
  const observer = useRef(null);
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      // Find all entries that are currently intersecting the viewport
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Of the visible entries, find the one that is physically highest on the screen.
        // This is a more robust method for determining the "active" section.
        const topmostEntry = visibleEntries.reduce((prev, current) => {
          return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
        });
        setActiveId(topmostEntry.target.id);
      }
    }, options);
    return () => observer.current?.disconnect();
  }, [setActiveId, options]);
  return observer;
};

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        @keyframes reticle-lock {
            0% { box-shadow: 0 0 15px 5px rgba(${accentColor}, 0); }
            50% { box-shadow: 0 0 25px 10px rgba(${accentColor}, 0.5); }
            100% { box-shadow: 0 0 15px 5px rgba(${accentColor}, 0); }
        }
        .toc-glass-pane {
            position: relative; 
            overflow: hidden;
        }
        .toc-glass-pane::before {
            content: '';
            position: absolute; z-index: -1; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 16px; 
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.15), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease-in-out;
        }
        .toc-glass-pane:hover::before {
            opacity: 1;
        }
        .targeting-reticle {
            position: absolute;
            left: 0;
            width: 100%;
            border: 2px solid rgba(${accentColor}, 0.8);
            border-radius: 8px;
            transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
            pointer-events: none;
            opacity: 0;
        }
        .targeting-reticle.is-active {
            opacity: 1;
        }
        .targeting-reticle.is-locking {
            animation: reticle-lock 0.4s ease-out;
        }
        .toc-link-item {
            position: relative;
        }
        .toc-link-item[data-level='3'] {
            padding-left: 20px;
        }
        .toc-link-item[data-level='3']::before {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
        }
    `}</style>
  );
};

// --- Component: AC-TableOfContents (Double AAA+) ---
const AC_TableOfContents = ({ headings, theme = 'dark' }) => {
  const cardRef = useRef(null);
  const listRef = useRef(null);
  const [activeId, setActiveId] = useState('');
  const [reticleStyle, setReticleStyle] = useState({});

  // RE-ARCHITECTED: Using the more robust IntersectionObserver hook.
  const observer = useIntersectionObserver(setActiveId, { rootMargin: '0px 0px -75% 0px', threshold: 0.1 });

  useEffect(() => {
    // CORRECTED: Simplified and more robust element observation logic.
    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (headingElements.length > 0 && observer.current) {
      headingElements.forEach((el) => observer.current.observe(el));
    }
    return () => observer.current?.disconnect();
  }, [headings, observer]);

  useEffect(() => {
    if (!activeId || !listRef.current) return;

    const activeLink = listRef.current.querySelector(`a[href="#${activeId}"]`);
    if (activeLink) {
      const listItem = activeLink.parentElement;
      setReticleStyle({
        transform: `translateY(${listItem.offsetTop}px)`,
        height: `${listItem.offsetHeight}px`,
      });

      const reticleEl = listRef.current.querySelector('.targeting-reticle');
      if (reticleEl) {
        reticleEl.classList.add('is-locking');
        setTimeout(() => reticleEl.classList.remove('is-locking'), 400);
      }
    }
  }, [activeId]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      link: 'text-slate-400',
      activeLink: 'text-teal-300',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      link: 'text-slate-600',
      activeLink: 'text-purple-600',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`toc-glass-pane rounded-2xl border p-6 backdrop-blur-xl ${currentTheme.glass}`}
      >
        <h3 className={`mb-4 text-base font-bold ${currentTheme.title}`}>TARGETING ARRAY</h3>
        <ul ref={listRef} className='relative space-y-2 font-mono text-sm'>
          <div className={`targeting-reticle ${activeId ? 'is-active' : ''}`} style={reticleStyle}></div>
          {headings.map((heading) => (
            <li key={heading.id} data-level={heading.level} className='toc-link-item'>
              <a
                href={`#${heading.id}`}
                className={`block rounded-md p-2 transition-colors duration-300 ${
                  activeId === heading.id ? currentTheme.activeLink + ' font-bold' : currentTheme.link
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// --- Visualization App ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = {
    dark: 'bg-[#0A090F] text-slate-300',
    light: 'bg-gradient-to-b from-indigo-100 to-white text-slate-700',
  };
  const headings = [
    { id: 'section-1', text: 'Deconstructing the Core Problem', level: 2 },
    { id: 'section-2', text: 'The GEO Mandate', level: 2 },
    { id: 'subsection-2-1', text: 'Structuring for AI', level: 3 },
    { id: 'subsection-2-2', text: 'Semantic Signaling', level: 3 },
    { id: 'section-3', text: 'Forging the Right Instruments', level: 2 },
    { id: 'section-4', text: 'Assembly and Deployment', level: 2 },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${pageThemes[theme]}`}>
      <div className='flex justify-center p-4'>
        <div
          className={`fixed top-4 z-20 flex items-center gap-4 rounded-xl border p-4 backdrop-blur-xl ${
            theme === 'dark' ? 'border-slate-800 bg-black/40' : 'border-slate-300 bg-white/60'
          }`}
        >
          <h1 className={`text-xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-TableOfContents</span>
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
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:py-24'>
        <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
          <aside className='hidden lg:col-span-3 lg:block'>
            <div className='sticky top-24'>
              <AC_TableOfContents headings={headings} theme={theme} />
            </div>
          </aside>
          <main className='lg:col-span-9'>
            <article className='prose prose-lg prose-headings:scroll-mt-24 max-w-none'>
              <h2 id='section-1' className='text-4xl font-bold'>
                Deconstructing the Core Problem
              </h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <div className='h-screen'></div>
              <h2 id='section-2' className='text-4xl font-bold'>
                The GEO Mandate
              </h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <h3 id='subsection-2-1' className='text-3xl font-bold'>
                Structuring for AI
              </h3>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
              <div className='h-screen'></div>
              <h3 id='subsection-2-2' className='text-3xl font-bold'>
                Semantic Signaling
              </h3>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <div className='h-screen'></div>
              <h2 id='section-3' className='text-4xl font-bold'>
                Forging the Right Instruments
              </h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <div className='h-screen'></div>
              <h2 id='section-4' className='text-4xl font-bold'>
                Assembly and Deployment
              </h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <div className='h-screen'></div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
