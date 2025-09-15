/* eslint-disable */
'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

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
interface DataTableProps {
  columns?: Array<{
    header: string;
    accessor: string;
  }>;
  data?: Array<Record<string, any>>;
  className?: string;
}

// Style Component for DataTable Effects
const DataTableStyles: React.FC<{ theme: string }> = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        .datatable-glass-pane {
            position: relative; 
            overflow: hidden;
        }
        .datatable-glass-pane::before {
            content: '';
            position: absolute; z-index: 1; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 16px; 
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.1), transparent 50%);
            opacity: 0; transition: opacity 0.4s ease-in-out; pointer-events: none;
        }
        .datatable-glass-pane:hover::before {
            opacity: 1;
        }
        .magnetic-scanline {
            position: absolute;
            left: 0; right: 0;
            height: 48px;
            background: linear-gradient(to right, transparent, rgba(${accentColor}, 0.1), transparent);
            border-top: 1px solid rgba(${accentColor}, 0.3);
            border-bottom: 1px solid rgba(${accentColor}, 0.3);
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.05s linear;
            pointer-events: none;
            z-index: 0;
        }
        .datatable-header-cell {
            cursor: pointer;
            user-select: none;
        }
        .sort-icon {
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        .datatable-header-cell.is-active .sort-icon,
        .datatable-header-cell:hover .sort-icon {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .datatable-table, .datatable-thead, .datatable-tbody, .datatable-th, .datatable-td, .datatable-tr { 
                display: block; 
            }
            .datatable-thead .datatable-tr { 
                position: absolute;
                top: -9999px;
                left: -9999px;
            }
            .datatable-tr {
                border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
                padding: 1rem 0;
            }
             .datatable-tbody .datatable-tr:last-child {
                border-bottom: none;
             }
            .datatable-td {
                position: relative;
                padding-left: 50%;
                text-align: right;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .datatable-td::before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                width: 45%;
                padding-right: 10px;
                white-space: nowrap;
                font-weight: bold;
                text-align: left;
            }
            .magnetic-scanline { display: none; }
        }
    `}</style>
  );
};

// Main Component
const AC_DataTable: React.FC<DataTableProps> = ({
  columns = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Value', accessor: 'value' },
    { header: 'Change', accessor: 'change' },
    { header: 'Benchmark', accessor: 'benchmark' },
  ],
  data = [
    { metric: 'Engagement Rate', value: 4.7, change: 0.5, benchmark: 3.5 },
    { metric: 'Share Rate', value: 78, change: -12, benchmark: 50 },
    { metric: 'Watch Completion', value: 65, change: 8, benchmark: 60 },
    { metric: 'Follower Growth', value: 2310, change: 540, benchmark: 1500 },
  ],
  className = '',
}) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleTbodyMouseMove = (e: React.MouseEvent) => {
    if (!tbodyRef.current || !scanlineRef.current) return;
    const rect = tbodyRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    scanlineRef.current.style.transform = `translateY(${y - 24}px)`;
    scanlineRef.current.style.opacity = '1';
  };

  const handleTbodyMouseLeave = () => {
    if (scanlineRef.current) {
      scanlineRef.current.style.opacity = '0';
    }
  };

  useEffect(() => {
    if (tbodyRef.current && scanlineRef.current) {
      scanlineRef.current.style.top = `${tbodyRef.current.offsetTop}px`;
    }
  }, [data]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.key!];
      const valB = b[sortConfig.key!];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
    return sortConfig.direction === 'ascending' ? sorted : sorted.reverse();
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <DataTableStyles theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`datatable-glass-pane my-command rounded-executive border border-border/20 bg-card/60 backdrop-blur-xl ${className}`}
      >
        <div className='relative p-tactical sm:p-strategic'>
          <div ref={scanlineRef} className='magnetic-scanline'></div>
          <table className='datatable-table relative z-10 w-full text-left'>
            <thead className='datatable-thead'>
              <tr className='datatable-tr border-b border-border text-muted-foreground'>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    onClick={() => requestSort(col.accessor)}
                    className={`datatable-th datatable-header-cell p-tactical text-xs font-semibold uppercase tracking-wider ${
                      sortConfig.key === col.accessor ? 'is-active text-brand-teal-primary' : ''
                    }`}
                  >
                    <div className='flex items-center gap-2'>
                      {col.header}
                      <span className='sort-icon'>
                        {sortConfig.key === col.accessor &&
                          (sortConfig.direction === 'ascending' ? <ChevronUp /> : <ChevronDown />)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              ref={tbodyRef}
              onMouseMove={handleTbodyMouseMove}
              onMouseLeave={handleTbodyMouseLeave}
              className='datatable-tbody'
            >
              {sortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className='datatable-tr border-b border-border/50'>
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      data-label={col.header}
                      className='datatable-td p-tactical font-mono text-sm text-foreground'
                    >
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='space-y-strategic p-strategic'>
      <AC_DataTable />

      <AC_DataTable
        columns={[
          { header: 'Platform', accessor: 'platform' },
          { header: 'Followers', accessor: 'followers' },
          { header: 'Growth', accessor: 'growth' },
        ]}
        data={[
          { platform: 'TikTok', followers: 125000, growth: '+15%' },
          { platform: 'Instagram', followers: 89000, growth: '+8%' },
          { platform: 'YouTube', followers: 45000, growth: '+22%' },
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
