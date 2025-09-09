import React, { useState } from 'react';

// --- Lucide Icons ---
// In a real app, you'd import these. Here, we'll define them as simple SVG components
// to keep everything in one file.
const Search = ({ size = 24, className = '' }) => (
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
    <circle cx='11' cy='11' r='8'></circle>
    <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
  </svg>
);

// --- Component 1: Themed PostCard ---
// This is the core reusable component for displaying an article summary.
const PostCard = ({ imageUrl, category, title, excerpt, author, date, href, theme = 'dark' }) => {
  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80 group-hover:border-teal-400/80',
      category: 'text-teal-400',
      title: 'text-slate-100',
      excerpt: 'text-slate-400',
      authorName: 'text-slate-200',
      date: 'text-slate-500',
      divider: 'border-slate-800',
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
  const currentTheme = themeClasses[theme];
  return (
    <a
      href={href}
      className={`group block transform overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-4 ${currentTheme.focusRing}`}
      aria-label={`Read article: ${title}`}
    >
      <div className={`relative flex h-full flex-col rounded-xl backdrop-blur-xl ${currentTheme.glass}`}>
        <div className='relative h-48 w-full'>
          <img src={imageUrl} alt={`Featured image for ${title}`} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>
        <div className='flex flex-grow flex-col p-6'>
          <p className={`text-xs uppercase tracking-wider ${currentTheme.category}`}>{category}</p>
          <h3 className={`mt-2 flex-grow text-xl font-black ${currentTheme.title}`}>{title}</h3>
          <p className={`mt-2 text-base ${currentTheme.excerpt}`}>{excerpt}</p>
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

// --- Component 2: Content Toolbar ---
// A centralized control panel for content discovery (filtering and searching).
const ContentToolbar = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  theme = 'dark',
}) => {
  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      btnInactive: 'border-slate-700 text-slate-400 hover:text-slate-100 hover:border-slate-500',
      btnActive: 'bg-teal-500 text-white border-teal-500',
      searchInput: 'bg-slate-900/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-teal-500',
      searchIcon: 'text-slate-400',
      focusRingOffset: 'focus:ring-offset-[#0A090F]',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      btnInactive: 'border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400',
      btnActive: 'bg-purple-600 text-white border-purple-600',
      searchInput: 'bg-white/80 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-purple-600',
      searchIcon: 'text-slate-500',
      focusRingOffset: 'focus:ring-offset-gray-100',
    },
  };
  const currentTheme = themeClasses[theme];
  const allCategories = ['All', ...categories];

  return (
    <div className={`rounded-xl border p-4 backdrop-blur-xl ${currentTheme.glass} mb-12`}>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <div className='flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat ? currentTheme.btnActive : currentTheme.btnInactive
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className='relative w-full sm:ml-auto sm:w-auto'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <Search size={18} className={currentTheme.searchIcon} />
          </div>
          <input
            type='text'
            placeholder='Search dispatches...'
            value={searchTerm}
            onChange={onSearchChange}
            className={`w-full rounded-md border py-2 pl-10 pr-4 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-64 ${currentTheme.searchInput} ${currentTheme.focusRingOffset}`}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App Component for Visualization ---
// This component now manages the state for the theme, filters, and search.
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 via-white to-gray-50',
  };

  const mockPosts = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      category: 'Operations',
      title: 'The Definitive Guide to Scaling Your TikTok Shop',
      excerpt:
        'Deconstructing the operational bottlenecks that prevent growth and architecting a command center for scale.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Sep 09, 2025',
      href: '#',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop',
      category: 'Growth',
      title: 'Identifying Undersaturated Niches in the Creator Economy',
      excerpt:
        'A first-principles approach to discovering and dominating new market segments before they become mainstream.',
      author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=S&font=inter' },
      date: 'Sep 02, 2025',
      href: '#',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=1471&auto=format&fit=crop',
      category: 'Market Intelligence',
      title: 'The Trinity of Doctrine: A Framework for Content',
      excerpt:
        'How to establish thought leadership through a rigorous, principle-driven content strategy that builds trust.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Aug 28, 2025',
      href: '#',
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop',
      category: 'Growth',
      title: 'Advanced Analytics for Viral Content Loops',
      excerpt: 'Moving beyond vanity metrics to build sustainable, data-driven growth engines for your content.',
      author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=S&font=inter' },
      date: 'Aug 21, 2025',
      href: '#',
    },
  ];

  const categories = [...new Set(mockPosts.map((p) => p.category))];

  const filteredPosts = mockPosts
    .filter((post) => activeCategory === 'All' || post.category === activeCategory)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 md:p-16 ${pageThemes[theme]}`}>
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

        <ContentToolbar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          theme={theme}
        />

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} theme={theme} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className={`col-span-full py-16 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              No Dispatches Found
            </h3>
            <p className='mt-2'>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
