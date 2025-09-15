import { ChevronDown } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface AC_FAQAccordionProps {
  items?: FAQItem[];
}

export const AC_FAQAccordion: React.FC<AC_FAQAccordionProps> = ({
  items = [
    {
      q: 'What is Generative Engine Optimization (GEO)?',
      a: 'GEO is the practice of structuring and creating content to be the definitive, authoritative source for AI-driven generative search engines. The goal is for your content to be chosen by an AI to construct its answer, positioning you as the primary source.',
    },
    {
      q: 'How does this component help with SEO and GEO?',
      a: 'By formatting content in a direct question-and-answer format, we create perfect "answer blocks." This structure mirrors the "People Also Ask" feature in search and is easily parsable by AI, increasing the likelihood of being featured in search results and AI summaries.',
    },
    {
      q: 'Can the answer section contain more than just text?',
      a: 'Absolutely. The answer prop accepts full React components. This means you can include lists, links, and even other custom components inside.',
    },
  ],
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='my-strategic rounded-executive border bg-card/60 p-strategic backdrop-blur-xl'>
      <div className='divide-y divide-border'>
        {items.map((item, index) => (
          <Collapsible key={index} open={openIndex === index} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger className='flex w-full items-center justify-between p-6 text-left'>
              <h4 className='pr-4 text-lg font-semibold text-foreground'>{item.q}</h4>
              <ChevronDown
                size={24}
                className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'>
              <div className='px-6 pb-6 text-base leading-relaxed text-muted-foreground'>{item.a}</div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_FAQAccordion />;
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
