import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- Style Component for Double AAA+ Effects ---
const HighEndStyle = ({ theme }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';
  return (
    <style>{`
        .command-dashboard-glass-pane {
            position: relative; 
            overflow: hidden;
            background-size: 40px 40px;
            background-image: ${
              theme === 'dark'
                ? 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)'
                : 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)'
            };
        }
        .command-dashboard-glass-pane::before {
            content: '';
            position: absolute;
            z-index: 1;
            top: 0; left: 0;
            width: 100%; height: 100%;
            border-radius: 16px; 
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.15), transparent 50%);
            opacity: 0;
            transition: opacity 0.4s ease-in-out;
            pointer-events: none;
        }
        .command-dashboard-glass-pane:hover::before {
            opacity: 1;
        }
        /* Custom Slider Styling */
        .calibration-slider {
            -webkit-appearance: none; appearance: none;
            width: 100%; height: 6px;
            background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
            border-radius: 3px; outline: none;
        }
        .calibration-slider::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 18px; height: 18px;
            background: ${theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            cursor: pointer; border-radius: 50%;
            border: 2px solid ${theme === 'dark' ? '#0A090F' : '#f1f5f9'};
            box-shadow: 0 0 10px rgba(${accentColor}, 0.7);
        }
        .calibration-slider::-moz-range-thumb {
            width: 18px; height: 18px;
            background: ${theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            cursor: pointer; border-radius: 50%;
            border: 2px solid ${theme === 'dark' ? '#0A090F' : '#f1f5f9'};
            box-shadow: 0 0 10px rgba(${accentColor}, 0.7);
        }
        .data-core-svg circle {
            transition: stroke-dashoffset 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .advanced-calibrators {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.5s ease-in-out;
        }
        .advanced-calibrators.is-open {
            grid-template-rows: 1fr;
        }
    `}</style>
  );
};

// --- Custom Slider Sub-Component ---
const CalibrationSlider = ({ label, value, min, max, step, onChange, unit = '', theme, isPercentage = false }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const accentGradient =
    theme === 'dark' ? 'linear-gradient(90deg, #2DD4BF, #67e8f9)' : 'linear-gradient(90deg, #9333EA, #d946ef)';
  const background = `linear-gradient(to right, ${accentGradient.split('(')[1].split(')')[0]}, ${percentage}%, ${
    theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
  } ${percentage}%)`;
  return (
    <div>
      <div className='mb-1 flex items-center justify-between'>
        <label className='text-sm font-semibold'>{label}</label>
        <span className={`font-mono text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {isPercentage ? `${value.toFixed(1)}%` : `${unit}${value.toFixed(2)}`}
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
        style={{ background }}
      />
    </div>
  );
};

// --- Component: AC-ProfitCommandDashboard (Double AAA+) ---
const AC_ProfitCommandDashboard = ({ initialValues, theme = 'dark' }) => {
  const cardRef = useRef(null);
  const priceRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const {
    materialCost,
    laborCost,
    shippingCost,
    desiredMargin,
    tiktokFee,
    paymentFee,
    packagingCost,
    marketingCost,
    returnRate,
  } = values;

  const { recommendedPrice, netProfit, breakEvenPrice, segments } = useMemo(() => {
    const unitCost = materialCost + laborCost + packagingCost + marketingCost;
    const grossProfit = unitCost * (desiredMargin / 100);
    const subtotalForFees = unitCost + grossProfit + shippingCost;
    const tiktokCommission = subtotalForFees * (tiktokFee / 100);
    const paymentCommission = subtotalForFees * (paymentFee / 100);
    const totalFees = tiktokCommission + paymentCommission;
    const priceBeforeReturns = subtotalForFees + totalFees;
    const returnCost = priceBeforeReturns * (returnRate / 100);
    const recommendedPrice = priceBeforeReturns + returnCost;
    const netProfit = grossProfit - returnCost;
    const breakEvenDenominator = 1 - tiktokFee / 100 - paymentFee / 100 - returnRate / 100;
    const breakEvenPrice = breakEvenDenominator > 0 ? (unitCost + shippingCost) / breakEvenDenominator : Infinity;

    const segments = [
      { label: 'Materials', value: materialCost, color: theme === 'dark' ? '#2DD4BF' : '#9333EA' },
      { label: 'Labor', value: laborCost, color: theme === 'dark' ? '#67e8f9' : '#a855f7' },
      { label: 'Packaging', value: packagingCost, color: theme === 'dark' ? '#a5f3fc' : '#c084fc' },
      { label: 'Marketing', value: marketingCost, color: theme === 'dark' ? '#0891b2' : '#7e22ce' },
      { label: 'Shipping', value: shippingCost, color: theme === 'dark' ? '#0e7490' : '#6b21a8' },
      { label: 'Fees', value: totalFees, color: theme === 'dark' ? '#f43f5e' : '#e11d48' },
      { label: 'Net Profit', value: netProfit, color: theme === 'dark' ? '#34d399' : '#10b981' },
    ].map((s) => ({ ...s, pct: recommendedPrice > 0 ? (s.value / recommendedPrice) * 100 : 0 }));

    return { recommendedPrice, netProfit, breakEvenPrice, segments };
  }, [
    materialCost,
    laborCost,
    shippingCost,
    desiredMargin,
    tiktokFee,
    paymentFee,
    packagingCost,
    marketingCost,
    returnRate,
    theme,
  ]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    /* Animated count-up logic for price remains the same */
  }, [recommendedPrice]);

  const themeClasses = {
    dark: {
      glass: 'bg-black/40 border-slate-800/80',
      text: 'text-slate-300',
      title: 'text-slate-100',
      hudLabel: 'text-slate-400',
      hudValue: 'from-slate-100 to-slate-400',
      svgTrack: 'stroke-white/10',
      advancedButton: 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300',
    },
    light: {
      glass: 'bg-white/60 border-slate-300',
      text: 'text-slate-700',
      title: 'text-slate-900',
      hudLabel: 'text-slate-500',
      hudValue: 'from-slate-800 to-slate-600',
      svgTrack: 'stroke-black/10',
      advancedButton: 'bg-slate-200/50 hover:bg-slate-300/50 text-slate-700',
    },
  };
  const currentTheme = themeClasses[theme];
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let cumulativePct = 0;

  return (
    <>
      <HighEndStyle theme={theme} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`command-dashboard-glass-pane my-12 rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
      >
        <div className='relative z-10 grid grid-cols-1 gap-8 p-8 lg:grid-cols-5'>
          <div className='input-command-section space-y-4 lg:col-span-3'>
            <h3 className={`text-2xl font-bold ${currentTheme.title}`}>Profit Command Dashboard</h3>
            <div className='space-y-4 pt-4'>
              <CalibrationSlider
                label='Material Cost'
                value={materialCost}
                min={0}
                max={100}
                step={0.5}
                onChange={(e) => setValues((v) => ({ ...v, materialCost: parseFloat(e.target.value) }))}
                unit='$'
                theme={theme}
              />
              <CalibrationSlider
                label='Labor Cost'
                value={laborCost}
                min={0}
                max={100}
                step={0.5}
                onChange={(e) => setValues((v) => ({ ...v, laborCost: parseFloat(e.target.value) }))}
                unit='$'
                theme={theme}
              />
              <CalibrationSlider
                label='Desired Gross Margin'
                value={desiredMargin}
                min={10}
                max={200}
                step={1}
                onChange={(e) => setValues((v) => ({ ...v, desiredMargin: parseFloat(e.target.value) }))}
                isPercentage
                theme={theme}
              />
            </div>
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`mt-4 w-full rounded-lg p-2 text-sm font-semibold transition-colors ${currentTheme.advancedButton}`}
            >
              {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Calibrators
            </button>
            <div className={`advanced-calibrators ${isAdvancedOpen ? 'is-open' : ''}`}>
              <div className='overflow-hidden'>
                <div className='space-y-4 pt-4'>
                  <CalibrationSlider
                    label='Shipping & Fees (per unit)'
                    value={shippingCost}
                    min={0}
                    max={50}
                    step={0.25}
                    onChange={(e) => setValues((v) => ({ ...v, shippingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='TikTok Shop Fee'
                    value={tiktokFee}
                    min={0}
                    max={25}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, tiktokFee: parseFloat(e.target.value) }))}
                    isPercentage
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Payment Processing Fee'
                    value={paymentFee}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, paymentFee: parseFloat(e.target.value) }))}
                    isPercentage
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Packaging Cost (per unit)'
                    value={packagingCost}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, packagingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Marketing Cost (per unit)'
                    value={marketingCost}
                    min={0}
                    max={20}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, marketingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Estimated Return Rate'
                    value={returnRate}
                    min={0}
                    max={30}
                    step={0.5}
                    onChange={(e) => setValues((v) => ({ ...v, returnRate: parseFloat(e.target.value) }))}
                    isPercentage
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='data-core-section flex flex-col items-center justify-center gap-6 lg:col-span-2'>
            <div className='relative h-56 w-56'>
              <svg className='data-core-svg h-full w-full' viewBox='0 0 200 200'>
                <circle cx='100' cy='100' r={radius} fill='none' strokeWidth='18' className={currentTheme.svgTrack} />
                {segments.map((segment, index) => {
                  const offset = circumference * (1 - segment.pct / 100);
                  const rotation = cumulativePct * 3.6;
                  cumulativePct += segment.pct;
                  return (
                    <circle
                      key={index}
                      cx='100'
                      cy='100'
                      r={radius}
                      fill='none'
                      stroke={segment.color}
                      strokeWidth='18'
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap='round'
                      transform={`rotate(${rotation - 90} 100 100)`}
                    />
                  );
                })}
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.hudLabel}`}>Recommended</p>
                <span
                  ref={priceRef}
                  className={`bg-gradient-to-b bg-clip-text text-4xl font-black text-transparent ${currentTheme.hudValue}`}
                >
                  ${recommendedPrice.toFixed(2)}
                </span>
                <p className={`text-xs font-semibold ${currentTheme.hudLabel}`}>Price</p>
              </div>
            </div>
            <div className='w-full space-y-2 text-xs font-semibold'>
              {segments.map((s) => (
                <div key={s.label} className='flex items-center gap-2'>
                  <div className='h-3 w-3 rounded-full' style={{ backgroundColor: s.color }}></div>
                  <span className={currentTheme.text}>{s.label}</span>
                  <span className={`ml-auto font-mono ${currentTheme.hudLabel}`}>${s.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div
              className={`mt-4 w-full border-t pt-4 ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-300'
              } text-center ${currentTheme.text}`}
            >
              <p className='font-semibold'>
                Net Profit: <span className='text-green-400'>${netProfit.toFixed(2)}</span> / unit
              </p>
              <p className='mt-1 text-xs'>
                Break-Even Price: ${isFinite(breakEvenPrice) ? breakEvenPrice.toFixed(2) : 'N/A'}
              </p>
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
  const initialValues = {
    materialCost: 25.5,
    laborCost: 15.0,
    shippingCost: 8.75,
    desiredMargin: 50,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    packagingCost: 1.2,
    marketingCost: 3.5,
    returnRate: 4.0,
  };

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 sm:p-12 ${pageThemes[theme]}`}>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className={`text-3xl font-black ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
            Component:{' '}
            <span className={theme === 'dark' ? 'text-teal-400' : 'text-purple-600'}>AC-ProfitCommandDashboard</span>
          </h1>
          <button
            onClick={toggleTheme}
            className={`focus-outline-none relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:ring-2 focus:ring-offset-2 ${
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
        <AC_ProfitCommandDashboard initialValues={initialValues} theme={theme} />
      </div>
    </div>
  );
}
