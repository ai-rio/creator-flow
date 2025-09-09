import React, { useState } from 'react';

// --- Lucide Icon (Self-Contained) ---
const ChevronDown = ({ size = 24, className = '' }) => (
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
    <path d='m6 9 6 6 6-6'></path>
  </svg>
);

// --- Component: AC-FAQAccordion ---
// An interactive, collapsible FAQ component optimized for GEO.
const AC_FAQAccordion = ({ items, theme = 'dark' }) => {
  // MODIFIED: State now holds a single index or null, not an array.
  const [openIndex, setOpenIndex] = useState(null);

  // MODIFIED: Logic now ensures only one item can be open at a time.
  const toggleItem = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      questionText: 'text-slate-100',
      answerText: 'text-slate-300',
      divider: 'border-slate-800',
      icon: 'text-slate-400',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      questionText: 'text-slate-900',
      answerText: 'text-slate-700',
      divider: 'border-slate-200/80',
      icon: 'text-slate-500',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <div className={`my-12 rounded-xl border backdrop-blur-xl ${currentTheme.glass}`}>
      <div className={`divide-y ${currentTheme.divider}`}>
        {items.map((item, index) => {
          // MODIFIED: Check is now against the single openIndex.
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                onClick={() => toggleItem(index)}
                className='flex w-full items-center justify-between p-6 text-left'
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h4 className={`pr-4 text-lg font-semibold ${currentTheme.questionText}`}>{item.q}</h4>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 transition-transform duration-300 ${currentTheme.icon} ${
                    isOpen ? 'rotate-180 transform' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className='overflow-hidden'>
                  <div className={`px-6 pb-6 text-base leading-relaxed ${currentTheme.answerText}`}>{item.a}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Visualization App ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = {
    dark: 'bg-[#0A090F]',
    light: 'bg-gradient-to-b from-indigo-100 to-white',
  };

  const faqItems = [
    {
      q: 'What is Generative Engine Optimization (GEO)?',
      a: (
        <p>
          GEO is the practice of structuring and creating content to be the definitive, authoritative source for
          AI-driven generative search engines. The goal is for your content to be chosen by an AI to construct its
          answer, positioning you as the primary source.
        </p>
      ),
    },
    {
      q: 'How does this component help with SEO and GEO?',
      a: (
        <p>
          By formatting content in a direct question-and-answer format, we create perfect "answer blocks." This
          structure mirrors the "People Also Ask" feature in search and is easily parsable by AI, increasing the
          likelihood of being featured in search results and AI summaries.
        </p>
      ),
    },
    {
      q: 'Can the answer section contain more than just text?',
      a: (
        <ul>
          <li>Absolutely. The answer prop accepts full React components.</li>
          <li>This means you can include lists, links, and even other custom components inside.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-3xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-FAQAccordion</span>
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
        <AC_FAQAccordion items={faqItems} theme={theme} />
      </div>
    </div>
  );
}
