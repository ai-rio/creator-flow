import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Custom Hook for Intersection Observer
const useIntersectionObserver = (setActiveId: (id: string) => void, options: IntersectionObserverInit) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
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

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface AC_TableOfContentsProps {
  headings?: Heading[];
}

export const AC_TableOfContents: React.FC<AC_TableOfContentsProps> = ({
  headings = [
    { id: 'section-1', text: 'Deconstructing the Core Problem', level: 2 },
    { id: 'section-2', text: 'The GEO Mandate', level: 2 },
    { id: 'subsection-2-1', text: 'Structuring for AI', level: 3 },
    { id: 'subsection-2-2', text: 'Semantic Signaling', level: 3 },
    { id: 'section-3', text: 'Forging the Right Instruments', level: 2 },
    { id: 'section-4', text: 'Assembly and Deployment', level: 2 },
  ],
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string>('');
  const [reticleStyle, setReticleStyle] = useState<React.CSSProperties>({});

  const observer = useIntersectionObserver(setActiveId, {
    rootMargin: '0px 0px -75% 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (headingElements.length > 0 && observer.current) {
      headingElements.forEach((el) => observer.current?.observe(el!));
    }
    return () => observer.current?.disconnect();
  }, [headings, observer]);

  useEffect(() => {
    if (!activeId || !listRef.current) return;

    const activeLink = listRef.current.querySelector(`a[href="#${activeId}"]`);
    if (activeLink) {
      const listItem = activeLink.parentElement as HTMLElement;
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <style>{`
        @keyframes reticle-lock {
          0% { box-shadow: 0 0 15px 5px rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0); }
          50% { box-shadow: 0 0 25px 10px rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.5); }
          100% { box-shadow: 0 0 15px 5px rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0); }
        }
        .toc-glass-pane {
          position: relative;
          overflow: hidden;
        }
        .toc-glass-pane::before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${
            theme === 'dark' ? '45, 212, 191' : '147, 51, 234'
          }, 0.15), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
        }
        .toc-glass-pane:hover::before {
          opacity: 1;
        }
        .targeting-reticle {
          position: absolute;
          left: 0;
          width: 100%;
          border: 2px solid rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.8);
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
          background: hsl(var(--muted-foreground) / 0.3);
        }
      `}</style>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='toc-glass-pane rounded-executive border bg-card/60 p-strategic backdrop-blur-xl'
      >
        <h3 className='mb-4 text-base font-bold text-foreground'>TARGETING ARRAY</h3>
        <ul ref={listRef} className='relative space-y-2 font-mono text-sm'>
          <div className={`targeting-reticle ${activeId ? 'is-active' : ''}`} style={reticleStyle}></div>
          {headings.map((heading) => (
            <li key={heading.id} data-level={heading.level} className='toc-link-item'>
              <a
                href={`#${heading.id}`}
                className={`block rounded-md p-2 transition-colors duration-300 ${
                  activeId === heading.id ? 'font-bold text-primary' : 'text-muted-foreground hover:text-foreground'
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

// Export wrapper for component browser
const AppContent = () => {
  return (
    <div className='max-w-sm'>
      <AC_TableOfContents />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background p-strategic'>
        <AppContent />
      </div>
    </ThemeProvider>
  );
}
