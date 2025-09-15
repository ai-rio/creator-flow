/* eslint-disable */
'use client';

import { ChevronRight } from 'lucide-react';
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

// Component Props Interface
interface CommandListProps {
  items?: Array<{
    title: string;
    description: string;
  }>;
  ordered?: boolean;
  className?: string;
}

// Style Component for Command List Effects
const CommandListStyles: React.FC<{ theme: string }> = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  const accentGradient =
    theme === 'dark' ? 'linear-gradient(to bottom, #2DD4BF, #67e8f9)' : 'linear-gradient(to bottom, #9333EA, #d946ef)';

  return (
    <style>{`
        @keyframes conduit-flow {
            from { background-position: 0 0; }
            to { background-position: 0 100%; }
        }
        .command-list-container {
            position: relative;
            padding-left: 40px;
        }
        .power-conduit {
            position: absolute;
            left: 11px;
            top: 0;
            bottom: 0;
            width: 2px;
            background-size: 100% 200%;
            background-image: ${accentGradient};
            animation: conduit-flow 5s linear infinite;
        }
        .command-list-item {
            position: relative;
            padding-left: 30px;
            padding-bottom: 2.5rem;
        }
        .command-list-item:last-child {
            padding-bottom: 0;
        }
        .item-node {
            position: absolute;
            left: -12px;
            top: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid rgba(${accentColor}, 0.5);
            background: ${theme === 'dark' ? '#0A090F' : '#f1f5f9'};
            transition: all 0.3s ease;
        }
        .command-list-item:hover .item-node {
            background: rgba(${accentColor}, 0.2);
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(${accentColor}, 0.5);
        }
        .energy-trace {
            position: absolute;
            left: 12px;
            top: 11px;
            height: 2px;
            width: 18px;
            background: rgba(${accentColor}, 0.8);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .command-list-item:hover .energy-trace {
            transform: scaleX(1);
        }
        .item-identifier {
            transition: color 0.3s ease;
        }
        .command-list-item:hover .item-identifier {
            color: rgba(${accentColor}, 1);
            text-shadow: 0 0 10px rgba(${accentColor}, 0.5);
        }
        .item-content {
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        .command-list-item:hover .item-content {
            transform: translateY(-2px);
        }
    `}</style>
  );
};

// Main Component
const AC_CommandList: React.FC<CommandListProps> = ({
  items = [
    {
      title: 'Define the Mission',
      description: 'Establish the absolute, non-negotiable objective. Clarity of purpose is the bedrock of command.',
    },
    {
      title: 'Forge the Instruments',
      description: 'Architect and build the necessary tools and systems. Each component must meet the standard.',
    },
    {
      title: 'Execute with Precision',
      description: 'Deploy the strategy. Monitor feedback. Calibrate in real-time. The standard is flawless execution.',
    },
    {
      title: 'Analyze the Aftermath',
      description:
        'Review all operational data. Integrate learnings. Prepare for the next engagement, stronger and smarter.',
    },
  ],
  ordered = true,
  className = '',
}) => {
  const { theme } = useTheme();

  return (
    <>
      <CommandListStyles theme={theme} />
      <div className={`my-command ${className}`}>
        <div className='command-list-container'>
          <div className='power-conduit'></div>
          <div className='space-y-0'>
            {items.map((item, index) => (
              <div key={index} className='command-list-item'>
                <div className='item-node'></div>
                <div className='energy-trace'></div>
                <div className='item-content'>
                  <div className='flex items-center gap-tactical'>
                    <span className='item-identifier text-heading-xl font-black text-muted-foreground'>
                      {ordered ? `${String(index + 1).padStart(2, '0')}` : <ChevronRight size={20} />}
                    </span>
                    <h4 className='text-heading-lg font-bold text-foreground'>{item.title}</h4>
                  </div>
                  <p className='mt-1 pl-10 text-body-md text-muted-foreground'>{item.description}</p>
                </div>
              </div>
            ))}
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
      <AC_CommandList ordered={true} />

      <AC_CommandList
        ordered={false}
        items={[
          {
            title: 'Strategic Planning',
            description: 'Develop comprehensive strategies for market dominance and operational excellence.',
          },
          {
            title: 'System Architecture',
            description: 'Design robust, scalable systems that can handle exponential growth.',
          },
          {
            title: 'Performance Optimization',
            description: 'Fine-tune every component for maximum efficiency and reliability.',
          },
        ]}
      />
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
