import React, { useState, useRef } from 'react';

// --- Lucide Icons ---
const Droplets = ({ size = 24, className = '' }) => (
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
    <path d='M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.7-3.3C8.27 7.81 7 6.22 7 4.5c0-1.42 1.5-2.5 3-2.5s3 1.08 3 2.5c0 1.72-1.27 3.31-2.3 4.45-1.13 1.04-1.7 2.14-1.7 3.3 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.7-3.3C18.27 7.81 17 6.22 17 4.5c0-1.42 1.5-2.5 3-2.5s3 1.08 3 2.5c0 1.72-1.27 3.31-2.3 4.45-1.13 1.04-1.7 2.14-1.7 3.3 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.7-3.3C18.27 7.81 17 6.22 17 4.5'></path>
  </svg>
);

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        @keyframes pulse-swatch { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes shimmer-gradient { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .command-palette-pane { position: relative; overflow: hidden; }
        .command-palette-pane::before { content: ''; position: absolute; z-index: 1; top: 0; left: 0; width: 100%; height: 100%; border-radius: 16px; background: radial-gradient(1000px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.1), transparent 50%); opacity: 0; transition: opacity 0.4s ease-in-out; pointer-events: none; }
        .command-palette-pane:hover::before { opacity: 1; }
        .contextual-header-icon { color: var(--contextual-accent, rgba(${accentColor}, 1)); transition: color 0.3s ease; }
        .living-swatch { position: relative; width: 64px; height: 64px; border-radius: 50%; cursor: pointer; transition: transform 0.3s ease; }
        .living-swatch-core { animation: pulse-swatch 4s ease-in-out infinite; }
        .living-swatch:hover { transform: scale(1.1); }
        .living-swatch::after { content: ''; position: absolute; inset: -8px; border-radius: 50%; border: 2px solid; opacity: 0; transform: scale(0.8); transition: all 0.3s ease; }
        .living-swatch:hover::after { opacity: 1; transform: scale(1); }
        .calibration-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; background-color: ${
          theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        }; border-radius: 3px; outline: none; }
        .calibration-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: ${
          theme === 'dark' ? '#f1f5f9' : '#1e293b'
        }; cursor: pointer; border-radius: 50%; border: 2px solid ${
      theme === 'dark' ? '#0A090F' : '#f1f5f9'
    }; box-shadow: 0 0 10px rgba(${accentColor}, 0.7); }
        .gradient-swatch { background-size: 200% auto; animation: shimmer-gradient 3s linear infinite; }
    `}</style>
  );
};

// --- Sub-Components ---
const SectionHeader = ({ icon, title }) => (
  <div className='mb-4 flex items-center gap-3'>
    <div className='contextual-header-icon'>{icon}</div>
    <h3 className='text-xl font-bold'>{title}</h3>
  </div>
);
const LivingSwatch = ({ color, name, hex, onHover }) => (
  <div
    className='flex flex-col items-center gap-2 text-center'
    onMouseEnter={() => onHover(hex)}
    onMouseLeave={() => onHover(null)}
  >
    <div className='living-swatch' style={{ borderColor: hex }}>
      <div className='living-swatch-core h-full w-full rounded-full' style={{ backgroundColor: color }}></div>
    </div>
    <div className='text-sm font-semibold'>{name}</div>
    <div className='font-mono text-xs opacity-70'>{hex}</div>
  </div>
);
const CalibrationSlider = ({ label, value, min, max, step, onChange, unit = '', theme }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const accentGradient =
    theme === 'dark' ? 'linear-gradient(90deg, #2DD4BF, #67e8f9)' : 'linear-gradient(90deg, #9333EA, #d946ef)';
  const backgroundStyle = `linear-gradient(to right, ${accentGradient.substring(
    accentGradient.indexOf('(') + 1,
    accentGradient.lastIndexOf(')')
  )}, ${percentage}%, ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} ${percentage}%)`;

  return (
    <div>
      <div className='mb-1 flex items-center justify-between'>
        <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </label>
        <span className={`font-mono text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className='calibration-slider'
        style={{ backgroundImage: backgroundStyle }}
      />
    </div>
  );
};

// --- Component: AC-ColorCommandPalette (Double AAA+) ---
const AC_ColorCommandPalette = ({ theme = 'dark' }) => {
  const cardRef = useRef(null);
  const [activeHoverColor, setActiveHoverColor] = useState(null);
  const [glassConfig, setGlassConfig] = useState({ blur: 24, opacity: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      title: 'text-slate-100',
      text: 'text-slate-300',
      subPane: 'bg-black/20 border-slate-800/50',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      title: 'text-slate-900',
      text: 'text-slate-700',
      subPane: 'bg-white/40 border-slate-300/50',
    },
  };
  const currentTheme = themeClasses[theme];
  const defaultAccent = theme === 'dark' ? '#2DD4BF' : '#9333EA';

  const colorPalette = [
    { name: 'Accent', hex: theme === 'dark' ? '#2DD4BF' : '#9333EA' },
    { name: 'Success', hex: '#22C55E' },
    { name: 'Warning', hex: '#F59E0B' },
    { name: 'Danger', hex: '#EF4444' },
  ];

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`command-palette-pane my-12 rounded-2xl border backdrop-blur-xl ${currentTheme.glass} ${currentTheme.title}`}
        style={{ '--contextual-accent': activeHoverColor || defaultAccent }}
      >
        <div className='grid grid-cols-1 gap-8 p-8 lg:grid-cols-2'>
          {/* LEFT COLUMN */}
          <div className='space-y-8'>
            {/* Core Systems */}
            <div className={`rounded-xl border p-6 ${currentTheme.subPane}`}>
              <SectionHeader icon={<Droplets />} title='Core Systems' />
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className={currentTheme.text}>Background</span>
                  <div
                    className='h-10 w-10 rounded-lg'
                    style={{ backgroundColor: theme === 'dark' ? '#0A090F' : '#FAFAFA' }}
                  ></div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className={currentTheme.text}>Primary Text</span>
                  <div
                    className='h-10 w-10 rounded-lg border'
                    style={{ borderColor: theme === 'dark' ? '#FFFFFF' : '#000000' }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Material Lab */}
            <div className={`rounded-xl border p-6 ${currentTheme.subPane}`}>
              <SectionHeader icon={<Droplets />} title='Material Lab' />
              <div
                className='relative h-48 overflow-hidden rounded-lg border border-white/10'
                style={{
                  backgroundImage: `url(https://source.unsplash.com/random/300x200?abstract&t=${theme})`,
                  backgroundSize: 'cover',
                }}
              >
                <div
                  className='absolute inset-0'
                  style={{
                    backdropFilter: `blur(${glassConfig.blur}px)`,
                    WebkitBackdropFilter: `blur(${glassConfig.blur}px)`,
                    backgroundColor: `rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, ${
                      glassConfig.opacity / 100
                    })`,
                  }}
                ></div>
                <div className='absolute inset-0 flex items-center justify-center text-lg font-bold'>GlassPane</div>
              </div>
              <div className='mt-4 space-y-4'>
                <CalibrationSlider
                  label='Backdrop Blur'
                  value={glassConfig.blur}
                  min={0}
                  max={40}
                  step={1}
                  onChange={(e) => setGlassConfig((v) => ({ ...v, blur: parseFloat(e.target.value) }))}
                  unit='px'
                  theme={theme}
                />
                <CalibrationSlider
                  label='BG Opacity'
                  value={glassConfig.opacity}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(e) => setGlassConfig((v) => ({ ...v, opacity: parseFloat(e.target.value) }))}
                  unit='%'
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className='space-y-8'>
            {/* Accent Palette */}
            <div className={`rounded-xl border p-6 ${currentTheme.subPane}`}>
              <SectionHeader icon={<Droplets />} title='Accent & Semantic Palette' />
              <div className='grid grid-cols-2 gap-6 pt-4 sm:grid-cols-4'>
                {colorPalette.map((c) => (
                  <LivingSwatch key={c.name} color={c.hex} name={c.name} hex={c.hex} onHover={setActiveHoverColor} />
                ))}
              </div>
            </div>
            {/* Gradient Command */}
            <div className={`rounded-xl border p-6 ${currentTheme.subPane}`}>
              <SectionHeader icon={<Droplets />} title='Gradient Command' />
              <div className='space-y-4 pt-4'>
                <div className='text-sm font-semibold'>Primary Accent</div>
                <div
                  className='gradient-swatch h-16 w-full rounded-lg'
                  style={{
                    backgroundImage:
                      theme === 'dark'
                        ? 'linear-gradient(90deg, #2DD4BF, #67e8f9)'
                        : 'linear-gradient(90deg, #9333EA, #d946ef)',
                  }}
                ></div>
                <div className='text-sm font-semibold'>Metallic Text</div>
                <div
                  className='gradient-swatch flex h-16 w-full items-center justify-center rounded-lg bg-gradient-to-b from-slate-100 to-slate-400 bg-clip-text text-4xl font-black text-transparent'
                  style={{
                    backgroundImage:
                      theme === 'dark'
                        ? 'linear-gradient(to bottom, #f1f5f9, #94a3b8)'
                        : 'linear-gradient(to bottom, #1e293b, #475569)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  Aa
                </div>
              </div>
            </div>
          </div>
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

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-ColorCommandPalette</span>
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
        <AC_ColorCommandPalette theme={theme} />
      </div>
    </div>
  );
}
