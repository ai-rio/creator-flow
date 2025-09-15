import { Check, Link, Linkedin } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Twitter X Icon (custom since not in Lucide)
const TwitterX = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
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

interface AC_ShareDossierProps {
  articleTitle?: string;
}

export const AC_ShareDossier: React.FC<AC_ShareDossierProps> = ({
  articleTitle = 'Architecting the Definitive Command Center',
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

  return (
    <>
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
      <div className='my-strategic rounded-executive border bg-card/60 p-strategic backdrop-blur-xl sm:p-6'>
        <div className='flex flex-col items-center justify-between sm:flex-row'>
          <h4 className='mb-4 text-lg font-semibold text-foreground sm:mb-0'>Share This Dossier</h4>
          <div className='flex items-center gap-2'>
            <a
              href={shareLinks.twitter}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Share on Twitter'
              className='sparkle-button rounded-full bg-muted/50 p-3 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground'
            >
              <TwitterX size={20} className='sparkle-icon' />
            </a>
            <a
              href={shareLinks.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Share on LinkedIn'
              className='sparkle-button rounded-full bg-muted/50 p-3 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground'
            >
              <Linkedin size={20} className='sparkle-icon' />
            </a>
            <button
              onClick={handleCopy}
              className='sparkle-button flex items-center gap-2 rounded-full bg-muted/50 p-3 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground'
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

// Export wrapper for component browser
const AppContent = () => {
  return <AC_ShareDossier />;
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
