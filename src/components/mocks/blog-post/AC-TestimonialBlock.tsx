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

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle: React.FC<any> = ({ theme }: any) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
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
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            border-radius: 16px; 
            background: radial-gradient(
                500px circle at var(--mouse-x) var(--mouse-y),
                rgba(${accentColor}, 0.2),
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
            background: radial-gradient(circle, rgba(${accentColor}, 0.3) 0%, transparent 60%);
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
  );
};

// --- Component: AC-TestimonialBlock (Double AAA+) ---
const AC_TestimonialBlock: React.FC<any> = ({ quote, author, theme = 'dark' }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      quoteMark: 'text-white/5',
      quoteText: 'text-slate-200',
      authorName: 'text-slate-100',
      authorTitle: 'text-teal-400',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      quoteMark: 'text-black/5',
      quoteText: 'text-slate-700',
      authorName: 'text-slate-900',
      authorTitle: 'text-purple-600',
    },
  };
  const currentTheme = (themeClasses as any)[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`testimonial-glass-pane my-12 rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
      >
        <div className='relative p-8'>
          <div
            className={`absolute left-4 top-0 font-serif text-[12rem] font-bold leading-none ${currentTheme.quoteMark}`}
            aria-hidden='true'
          >
            “
          </div>
          <div className='relative z-10'>
            <p
              className={`testimonial-quote-text text-2xl font-medium italic leading-relaxed ${currentTheme.quoteText}`}
            >
              &quot;{quote}&quot;
            </p>
            <div className='mt-6 flex items-center gap-4'>
              <div className='author-avatar-container flex-shrink-0'>
                <div className='author-aura'></div>
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className='author-avatar duration-400 h-16 w-16 rounded-full border-2 border-white/20 transition-transform'
                />
              </div>
              <div>
                <p className={`text-lg font-bold ${currentTheme.authorName}`}>{author.name}</p>
                <p className={`text-sm font-semibold tracking-wide ${currentTheme.authorTitle}`}>{author.title}</p>
              </div>
            </div>
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

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  const testimonialData = {
    quote:
      "CreatorFlow is not a tool; it's a force multiplier. It took our operations from chaotic to clinical, allowing us to scale past seven figures without sacrificing sanity.",
    author: {
      name: 'Helena Carter',
      title: 'Founder, Apex Creators',
      avatarUrl: 'https://placehold.co/64x64/0A090F/FFFFFF?text=HC',
    },
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${(pageThemes as any)[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-TestimonialBlock</span>
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
        <AC_TestimonialBlock quote={testimonialData.quote} author={testimonialData.author} theme={theme} />
      </div>
    </div>
  );
}
