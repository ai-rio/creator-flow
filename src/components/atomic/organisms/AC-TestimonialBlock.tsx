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

interface Author {
  name: string;
  title: string;
  avatarUrl: string;
}

interface AC_TestimonialBlockProps {
  quote?: string;
  author?: Author;
}

export const AC_TestimonialBlock: React.FC<AC_TestimonialBlockProps> = ({
  quote = "CreatorFlow is not a tool; it's a force multiplier. It took our operations from chaotic to clinical, allowing us to scale past seven figures without sacrificing sanity.",
  author = {
    name: 'Helena Carter',
    title: 'Founder, Apex Creators',
    avatarUrl: 'https://placehold.co/64x64/0A090F/FFFFFF?text=HC',
  },
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400;1,500&display=swap');
        .testimonial-quote-text {
          font-family: 'Lora', serif;
        }
        .testimonial-glass-pane {
          position: relative;
          overflow: hidden;
        }
        .testimonial-glass-pane::before {
          content: '';
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.2),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
          pointer-events: none;
        }
        .testimonial-glass-pane:hover::before {
          opacity: 1;
        }
        .author-avatar-container {
          position: relative;
        }
        .author-aura {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(${
            theme === 'dark' ? '45, 212, 191' : '147, 51, 234'
          }, 0.3) 0%, transparent 60%);
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.4s ease, transform 0.4s ease;
          z-index: -1;
        }
        .testimonial-glass-pane:hover .author-aura {
          opacity: 1;
          transform: scale(1);
        }
        .testimonial-glass-pane:hover .author-avatar {
          transform: scale(1.05);
        }
      `}</style>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='testimonial-glass-pane my-strategic rounded-executive border bg-card/60 backdrop-blur-xl'
      >
        <div className='relative p-strategic'>
          <div
            className='absolute left-4 top-0 font-serif text-[12rem] font-bold leading-none text-foreground/5'
            aria-hidden='true'
          >
            &quot;
          </div>
          <div className='relative z-10'>
            <p className='testimonial-quote-text text-2xl font-medium italic leading-relaxed text-foreground'>
              &quot;{quote}&quot;
            </p>
            <div className='mt-6 flex items-center gap-4'>
              <div className='author-avatar-container flex-shrink-0'>
                <div className='author-aura'></div>
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className='author-avatar h-16 w-16 rounded-full border-2 border-border/20 transition-transform duration-300'
                />
              </div>
              <div>
                <p className='text-lg font-bold text-foreground'>{author.name}</p>
                <p className='text-sm font-semibold tracking-wide text-primary'>{author.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_TestimonialBlock />;
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
