import { CheckCircle2 } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

interface AC_KeyTakeawaysProps {
  title?: string;
  takeaways?: string[];
}

export const AC_KeyTakeaways: React.FC<AC_KeyTakeawaysProps> = ({
  title = 'Key Takeaways',
  takeaways = [
    "Generative Engine Optimization (GEO) requires structuring content as modular, high-value 'answer blocks'.",
    'Key Takeaways sections are magnets for AI-powered summaries and featured snippets, establishing authority.',
    'Modular component architecture is not just a design choice; it is a core SEO/GEO strategy.',
  ],
}) => {
  return (
    <div className='my-strategic rounded-executive border bg-card/60 p-strategic backdrop-blur-xl'>
      <h3 className='mb-4 flex items-center text-lg font-bold text-foreground'>{title}</h3>
      <ul className='space-y-4'>
        {takeaways.map((point, index) => (
          <li key={index} className='flex items-start text-base'>
            <CheckCircle2 size={20} className='mr-4 mt-1 flex-shrink-0 text-primary' />
            <span className='text-muted-foreground'>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_KeyTakeaways />;
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
