import { ArrowRight } from 'lucide-react';
import * as React from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

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

interface RelatedArticle {
  category: string;
  title: string;
  href: string;
}

interface AC_ExploreFurtherProps {
  relatedArticles?: RelatedArticle[];
}

export const AC_ExploreFurther: React.FC<AC_ExploreFurtherProps> = ({
  relatedArticles = [
    { category: 'Operations', title: 'Scaling from 50 to 500 Orders', href: '#' },
    { category: 'Market Intelligence', title: 'Identifying Untapped Product Niches', href: '#' },
    { category: 'Growth', title: 'The Viral Coefficient: A Deep Dive', href: '#' },
  ],
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -10;
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

  return (
    <>
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
            rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.15),
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
        .explore-arrow {
          transition: transform 0.3s ease;
        }
        .explore-card:hover .explore-arrow {
          transform: translateX(5px);
        }
      `}</style>
      <div className='perspective-container my-strategic rounded-executive border bg-card/60 p-strategic backdrop-blur-xl'>
        <h3 className='mb-6 text-2xl font-bold text-foreground'>Explore Further</h3>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className='explore-container grid grid-cols-1 gap-6 md:grid-cols-3'
        >
          {relatedArticles.map((article, index) => (
            <a
              href={article.href}
              key={index}
              className='explore-card group flex flex-col justify-between rounded-executive border bg-card/50 p-6'
            >
              <div>
                <p className='text-sm font-bold uppercase tracking-wider text-primary'>{article.category}</p>
                <h4 className='mt-2 text-lg font-bold text-foreground'>{article.title}</h4>
              </div>
              <div className='mt-4 flex justify-end text-muted-foreground'>
                <ArrowRight size={20} className='explore-arrow' />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_ExploreFurther />;
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
