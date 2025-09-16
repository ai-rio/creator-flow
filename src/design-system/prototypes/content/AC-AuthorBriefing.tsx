/* eslint-disable */
'use client';

import { Twitter, Linkedin } from 'lucide-react';
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

// Component Props Interface
interface AuthorBriefingProps {
  author?: {
    name: string;
    avatarUrl: string;
    bio: string;
    socials: Array<{
      platform: 'twitter' | 'linkedin';
      url: string;
    }>;
  };
  className?: string;
}

// Style Component for Author Effects
const AuthorBriefingStyles: React.FC<{ theme: string }> = ({ theme }) => {
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
            position: relative;
            background-size: 3px 3px;
            background-image: ${
              theme === 'dark'
                ? 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 0)'
                : 'radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)'
            };
        }
        .author-glass-pane::before {
            content: '';
            position: absolute;
            z-index: 1;
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
            pointer-events: none;
        }
        .author-glass-pane:hover::before {
            opacity: 1;
        }
    `}</style>
  );
};

// Main Component
const AC_AuthorBriefing: React.FC<AuthorBriefingProps> = ({
  author = {
    name: 'Commander Alex Thorne',
    avatarUrl: 'https://placehold.co/112x112/0A090F/FFFFFF?text=AT',
    bio: 'Forging definitive strategies at the intersection of creator economics and operational command. Commander Thorne architects the systems that transform ambitious creators into market-defining forces.',
    socials: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  className = '',
}) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const socialIconMap = {
    twitter: <Twitter size={20} className='author-social-icon' />,
    linkedin: <Linkedin size={20} className='author-social-icon' />,
  };

  return (
    <>
      <AuthorBriefingStyles theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`author-glass-pane my-command rounded-executive border border-border/20 bg-card/60 p-strategic backdrop-blur-xl ${className}`}
      >
        <div className='relative z-10 flex flex-col items-center gap-strategic sm:flex-row'>
          <div className='author-avatar-container flex-shrink-0'>
            <div
              className={`author-avatar-ring absolute inset-0 rounded-full border-2 ${
                theme === 'dark' ? 'border-brand-teal-primary/50' : 'border-brand-purple-600/50'
              }`}
            ></div>
            <img
              src={author.avatarUrl}
              alt={author.name}
              className='author-avatar-image h-24 w-24 rounded-full border-2 border-border/10 sm:h-28 sm:w-28'
            />
          </div>

          <div className='text-center sm:text-left'>
            <h4 className='text-heading-xl font-bold text-foreground'>{author.name}</h4>
            <p className='mt-tactical text-body-md leading-relaxed text-muted-foreground'>{author.bio}</p>
            <div className='mt-tactical flex items-center justify-center gap-tactical sm:justify-start'>
              {author.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Follow ${author.name} on ${social.platform}`}
                  className='author-social-link p-tactical text-muted-foreground transition-colors duration-200 hover:text-foreground'
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

// Export wrapper
const AppContent = () => {
  return (
    <div className='space-y-strategic p-strategic'>
      <AC_AuthorBriefing />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <div className='min-h-screen bg-background'>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </div>
  );
}
