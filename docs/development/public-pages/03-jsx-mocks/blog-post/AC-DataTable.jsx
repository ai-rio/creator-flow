import React, { useState, useMemo, useRef, useEffect } from 'react';

// --- Lucide Icons ---
const ChevronUp = ({ size = 16, className = '' }) => (
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
    <path d='m18 15-6-6-6 6'></path>
  </svg>
);
const ChevronDown = ({ size = 16, className = '' }) => (
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

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle = ({ theme }) => {
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
            height: 48px; /* Approx row height */
            background: linear-gradient(to right, transparent, rgba(${accentColor}, 0.1), transparent);
            border-top: 1px solid rgba(${accentColor}, 0.3);
            border-bottom: 1px solid rgba(${accentColor}, 0.3);
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.05s linear;
            pointer-events: none;
            z-index: 0;
        }
        /* REMOVED .datatable-tbody:hover .magnetic-scanline */
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

        /* Responsive Card Layout */
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

// --- Component: AC-DataTable (Double AAA+) ---
const AC_DataTable = ({ columns, data, theme = 'dark' }) => {
  const cardRef = useRef(null);
  const tbodyRef = useRef(null);
  const scanlineRef = useRef(null); // Ref for the scanline
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleTbodyMouseMove = (e) => {
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
  }, [data]); // Recalculate if data changes

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
    return sortConfig.direction === 'ascending' ? sorted : sorted.reverse();
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      header: 'border-b border-slate-800 text-slate-400',
      row: 'border-b border-slate-800/50',
      cell: 'text-slate-200',
      activeHeader: 'text-teal-400',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      header: 'border-b border-slate-300 text-slate-500',
      row: 'border-b border-slate-200/50',
      cell: 'text-slate-800',
      activeHeader: 'text-purple-600',
    },
  };
  const currentTheme = themeClasses[theme];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`datatable-glass-pane my-12 rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
      >
        <div className='relative p-4 sm:p-6'>
          <div ref={scanlineRef} className='magnetic-scanline'></div>
          <table className='datatable-table relative z-10 w-full text-left'>
            <thead className='datatable-thead'>
              <tr className={`datatable-tr ${currentTheme.header}`}>
                {columns.map((col) => (
                  <th
                    key={col.accessor}
                    onClick={() => requestSort(col.accessor)}
                    className={`datatable-th datatable-header-cell p-4 text-xs font-semibold uppercase tracking-wider ${
                      sortConfig.key === col.accessor ? 'is-active ' + currentTheme.activeHeader : ''
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
                <tr key={rowIndex} className={`datatable-tr ${currentTheme.row}`}>
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      data-label={col.header}
                      className={`datatable-td p-4 font-mono text-sm ${currentTheme.cell}`}
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

// --- Visualization App ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const pageThemes = { dark: 'bg-[#0A090F]', light: 'bg-gradient-to-b from-indigo-100 to-white' };

  const tableColumns = [
    { header: 'Metric', accessor: 'metric' },
    { header: 'Value', accessor: 'value' },
    { header: 'Change', accessor: 'change' },
    { header: 'Benchmark', accessor: 'benchmark' },
  ];
  const tableData = [
    { metric: 'Engagement Rate', value: 4.7, change: 0.5, benchmark: 3.5 },
    { metric: 'Share Rate', value: 78, change: -12, benchmark: 50 },
    { metric: 'Watch Completion', value: 65, change: 8, benchmark: 60 },
    { metric: 'Follower Growth', value: 2310, change: 540, benchmark: 1500 },
  ];

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component: <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-DataTable</span>
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
        <AC_DataTable columns={tableColumns} data={tableData} theme={theme} />
      </div>
    </div>
  );
}
