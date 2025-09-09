import * as React from 'react';
import { useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Themed PostCard Component ---
// This is the core reusable component for displaying an article summary.
// It now supports a dual-theme system ('light' and 'dark') via a `theme` prop.
const PostCard: React.FC<any> = ({ imageUrl, category, title, excerpt, author, date, href, theme = 'dark' }: any) => {
  // Theme-specific Tailwind CSS classes for high contrast and brand alignment.
  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-100/10 group-hover:border-teal-400/80',
      category: 'text-teal-400',
      title: 'text-slate-100',
      excerpt: 'text-slate-400',
      authorName: 'text-slate-200',
      date: 'text-slate-500',
      divider: 'border-slate-100/10',
      focusRing: 'focus:ring-teal-400 focus:ring-offset-[#0A090F]',
    },
    light: {
      glass: 'bg-white/60 border-slate-300 group-hover:border-purple-500/80',
      category: 'text-purple-600 font-bold',
      title: 'text-slate-800',
      excerpt: 'text-slate-600',
      authorName: 'text-slate-700',
      date: 'text-slate-500',
      divider: 'border-slate-300/80',
      focusRing: 'focus:ring-purple-500 focus:ring-offset-white',
    },
  };

  const currentTheme = (themeClasses as any)[theme];

  return (
    <a
      href={href}
      className={`group block transform overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-4 ${currentTheme.focusRing}`}
      aria-label={`Read article: ${title}`}
    >
      <div className={`relative flex h-full flex-col rounded-xl backdrop-blur-xl ${currentTheme.glass}`}>
        {/* Image */}
        <div className='relative h-48 w-full'>
          <img src={imageUrl} alt={`Featured image for ${title}`} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>

        {/* Content */}
        <div className='flex flex-grow flex-col p-6'>
          <p className={`text-xs uppercase tracking-wider ${currentTheme.category}`}>{category}</p>
          <h3 className={`mt-2 flex-grow text-xl font-black ${currentTheme.title}`}>{title}</h3>
          <p className={`mt-2 text-base ${currentTheme.excerpt}`}>{excerpt}</p>

          {/* Author Meta */}
          <div className={`mt-6 flex items-center border-t pt-4 ${currentTheme.divider}`}>
            <img
              src={author.avatarUrl}
              alt={`Avatar for ${author.name}`}
              width={40}
              height={40}
              className='rounded-full'
            />
            <div className='ml-4'>
              <p className={`font-semibold ${currentTheme.authorName}`}>{author.name}</p>
              <p className={`text-sm ${currentTheme.date}`}>{date}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Main App Component for Visualization ---
// This component now includes a state toggle to switch between light and dark themes.
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 via-white to-gray-50',
  };

  // UPDATED: Mock data now uses curated Unsplash images.
  const mockPosts = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      category: 'Operations',
      title: 'The Definitive Guide to Scaling Your TikTok Shop from 50 to 500 Orders',
      excerpt:
        'Deconstructing the operational bottlenecks that prevent growth and architecting a command center for scale.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Sep 09, 2025',
      href: '#',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop',
      category: 'Growth',
      title: 'Market Intelligence: Identifying Undersaturated Niches in the Creator Economy',
      excerpt:
        'A first-principles approach to discovering and dominating new market segments before they become mainstream.',
      author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=S&font=inter' },
      date: 'Sep 02, 2025',
      href: '#',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=1471&auto=format&fit=crop',
      category: 'Market Intelligence',
      title: 'The Trinity of Doctrine: A Framework for "Definitive" Content Creation',
      excerpt:
        'How to establish thought leadership through a rigorous, principle-driven content strategy that builds trust.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Aug 28, 2025',
      href: '#',
    },
  ];

  return (
    <div
      className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 md:p-16 ${
        (pageThemes as any)[theme]
      }`}
    >
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12 flex flex-wrap items-center justify-between gap-4'>
          <div className='text-left'>
            <h1 className={`text-4xl font-black md:text-5xl ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              Recent <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>Dispatches</span>
            </h1>
            <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Strategic insights from the CreatorFlow command center.
            </p>
          </div>
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'dark'
                ? 'bg-teal-500 focus:ring-teal-400 focus:ring-offset-gray-800'
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

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {mockPosts.map((post, index) => (
            <PostCard key={index} {...post} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}
