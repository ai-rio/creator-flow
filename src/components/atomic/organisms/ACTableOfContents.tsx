'use client';

import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// --- TypeScript Interfaces ---
interface HeadingData {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5 | 6;
}

interface IntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

interface ReticleStyle {
  transform: string;
  height: string;
}

interface TableOfContentsProps {
  headings: HeadingData[];
  className?: string;
  title?: string;
  'aria-label'?: string;
}

interface ThemeStyles {
  glass: string;
  title: string;
  link: string;
  activeLink: string;
  connector: string;
}

// --- Performance-Optimized IntersectionObserver Hook ---
const useIntersectionObserver = (setActiveId: (id: string) => void, options: IntersectionObserverOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported (graceful degradation)
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported');
      return;
    }

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

    return () => {
      observer.current?.disconnect();
    };
  }, [setActiveId, options]);

  return observer;
};

// --- Advanced CSS-in-JS Animation Styles ---
const createAdvancedStyles = (resolvedTheme: string | undefined, prefersReducedMotion: boolean): string => {
  const isDark = resolvedTheme === 'dark';
  const accentColor = isDark ? '45, 212, 191' : '147, 51, 234'; // teal-400 / purple-600

  const animationDuration = prefersReducedMotion ? '0s' : '0.4s';
  const transitionDuration = prefersReducedMotion ? '0s' : '0.3s';

  return `
    @keyframes reticle-lock {
      0% {
        box-shadow: 0 0 15px 5px rgba(${accentColor}, 0);
        transform: translateZ(0); /* GPU acceleration */
      }
      50% {
        box-shadow: 0 0 25px 10px rgba(${accentColor}, 0.5);
        transform: translateZ(0);
      }
      100% {
        box-shadow: 0 0 15px 5px rgba(${accentColor}, 0);
        transform: translateZ(0);
      }
    }

    .toc-glass-pane {
      position: relative;
      overflow: hidden;
      will-change: transform; /* GPU acceleration hint */
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
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(${accentColor}, 0.15),
        transparent 50%
      );
      opacity: 0;
      transition: opacity ${transitionDuration} ease-in-out;
      pointer-events: none;
    }

    @media (hover: hover) and (pointer: fine) {
      .toc-glass-pane:hover::before {
        opacity: ${prefersReducedMotion ? 0.5 : 1};
      }
    }

    .targeting-reticle {
      position: absolute;
      left: 0;
      width: 100%;
      border: 2px solid rgba(${accentColor}, 0.8);
      border-radius: 8px;
      transition: transform ${animationDuration} cubic-bezier(0.22, 1, 0.36, 1),
                  height ${animationDuration} cubic-bezier(0.22, 1, 0.36, 1),
                  opacity ${transitionDuration} ease;
      pointer-events: none;
      opacity: 0;
      will-change: transform, height, opacity;
      transform: translateZ(0); /* GPU acceleration */
    }

    .targeting-reticle.is-active {
      opacity: 1;
    }

    .targeting-reticle.is-locking {
      animation: ${prefersReducedMotion ? 'none' : `reticle-lock ${animationDuration} ease-out`};
    }

    .toc-link-item {
      position: relative;
    }

    .toc-link-item[data-level='3'],
    .toc-link-item[data-level='4'],
    .toc-link-item[data-level='5'],
    .toc-link-item[data-level='6'] {
      padding-left: ${20 + (parseInt('3') - 3) * 12}px;
    }

    .toc-link-item[data-level='3']::before,
    .toc-link-item[data-level='4']::before,
    .toc-link-item[data-level='5']::before,
    .toc-link-item[data-level='6']::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    }

    .toc-link {
      transition: all ${transitionDuration} ease;
      transform: translateZ(0); /* GPU acceleration */
    }

    @media (hover: hover) and (pointer: fine) {
      .toc-link:hover {
        transform: translateX(2px);
      }
    }

    /* Accessibility: Focus styles */
    .toc-link:focus-visible {
      outline: 2px solid rgba(${accentColor}, 0.8);
      outline-offset: 2px;
    }
  `;
};

// --- Main Component: AC Table of Contents ---
export const ACTableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  className = '',
  title = 'Table of Contents',
  'aria-label': ariaLabel = 'Table of contents navigation',
}) => {
  const { resolvedTheme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState<string>('');
  const [reticleStyle, setReticleStyle] = useState<ReticleStyle>({
    transform: 'translateY(0px)',
    height: '0px',
  });

  // Detect user's motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Memoized observer options for performance
  const observerOptions = useMemo<IntersectionObserverOptions>(
    () => ({
      rootMargin: '0px 0px -75% 0px',
      threshold: 0.1,
    }),
    []
  );

  // Performance-optimized IntersectionObserver
  const observer = useIntersectionObserver(setActiveId, observerOptions);

  // Memoized theme styles
  const themeStyles = useMemo<Record<string, ThemeStyles>>(() => {
    const isDark = resolvedTheme === 'dark';
    return {
      dark: {
        glass: 'bg-black/40 border-slate-800/80',
        title: 'text-slate-100',
        link: 'text-slate-400',
        activeLink: 'text-teal-300',
        connector: 'rgba(255,255,255,0.1)',
      },
      light: {
        glass: 'bg-white/60 border-slate-300',
        title: 'text-slate-900',
        link: 'text-slate-600',
        activeLink: 'text-purple-600',
        connector: 'rgba(0,0,0,0.1)',
      },
    };
  }, [resolvedTheme]);

  const currentTheme = themeStyles[resolvedTheme || 'dark'];

  // Setup intersection observation for headings
  useEffect(() => {
    if (!observer.current || headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length > 0) {
      headingElements.forEach((el) => observer.current?.observe(el));
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [headings, observer]);

  // Performance-optimized reticle positioning
  useEffect(() => {
    if (!activeId || !listRef.current) return;

    const activeLink = listRef.current.querySelector(`a[href="#${activeId}"]`) as HTMLAnchorElement;
    if (activeLink) {
      const listItem = activeLink.parentElement as HTMLLIElement;
      const newStyle: ReticleStyle = {
        transform: `translateY(${listItem.offsetTop}px)`,
        height: `${listItem.offsetHeight}px`,
      };

      setReticleStyle(newStyle);

      // Add lock animation class
      const reticleEl = listRef.current.querySelector('.targeting-reticle');
      if (reticleEl && !prefersReducedMotion) {
        reticleEl.classList.add('is-locking');
        const timeoutId = setTimeout(() => {
          reticleEl.classList.remove('is-locking');
        }, 400);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [activeId, prefersReducedMotion]);

  // Performance-optimized mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  // Smooth scroll handler with error handling
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
      e.preventDefault();

      const targetElement = document.getElementById(headingId);
      if (!targetElement) {
        console.warn(`Element with id "${headingId}" not found`);
        return;
      }

      try {
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });

        // Update URL without triggering navigation
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', `#${headingId}`);
        }
      } catch (error) {
        console.error('Error scrolling to element:', error);
      }
    },
    [prefersReducedMotion]
  );

  // Generate dynamic styles
  const dynamicStyles = useMemo(
    () => createAdvancedStyles(resolvedTheme, prefersReducedMotion),
    [resolvedTheme, prefersReducedMotion]
  );

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <style>{dynamicStyles}</style>
      <nav
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`toc-glass-pane rounded-2xl border p-6 backdrop-blur-xl ${currentTheme.glass} ${className}`}
        aria-label={ariaLabel}
        role='navigation'
      >
        <h3 className={`mb-4 text-base font-bold ${currentTheme.title}`} id='table-of-contents-heading'>
          {title}
        </h3>

        <ul ref={listRef} className='relative space-y-2 font-mono text-sm' aria-labelledby='table-of-contents-heading'>
          <div className={`targeting-reticle ${activeId ? 'is-active' : ''}`} style={reticleStyle} aria-hidden='true' />

          {headings.map((heading) => (
            <li key={heading.id} data-level={heading.level} className='toc-link-item'>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`
                  toc-link block rounded-md p-2 transition-colors duration-300
                  ${activeId === heading.id ? `${currentTheme.activeLink} font-bold` : currentTheme.link}
                `}
                aria-current={activeId === heading.id ? 'location' : undefined}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ACTableOfContents;
