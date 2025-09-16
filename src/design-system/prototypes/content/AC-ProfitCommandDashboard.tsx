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

// Calibration Slider Component
const CalibrationSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  theme: string;
  isPercentage?: boolean;
}> = ({ label, value, min, max, step, onChange, unit = '', theme, isPercentage = false }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const accentColor = theme === 'dark' ? '#2DD4BF' : '#9333EA';

  return (
    <div>
      <div className='mb-1 flex items-center justify-between'>
        <label className='text-sm font-semibold text-foreground'>{label}</label>
        <span className='font-mono text-sm font-semibold text-muted-foreground'>
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
        className='slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted'
        style={{
          background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
        }}
      />
    </div>
  );
};

interface ProfitValues {
  materialCost: number;
  laborCost: number;
  shippingCost: number;
  desiredMargin: number;
  tiktokFee: number;
  paymentFee: number;
  packagingCost: number;
  marketingCost: number;
  returnRate: number;
}

interface AC_ProfitCommandDashboardProps {
  initialValues?: ProfitValues;
}

export const AC_ProfitCommandDashboard: React.FC<AC_ProfitCommandDashboardProps> = ({
  initialValues = {
    materialCost: 25.5,
    laborCost: 15.0,
    shippingCost: 8.75,
    desiredMargin: 50,
    tiktokFee: 5.0,
    paymentFee: 2.9,
    packagingCost: 1.2,
    marketingCost: 3.5,
    returnRate: 4.0,
  },
}) => {
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const cardRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ProfitValues>(initialValues);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  const { recommendedPrice, netProfit, breakEvenPrice, segments } = useMemo(() => {
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
  }, [values, theme]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let cumulativePct = 0;

  return (
    <>
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
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(${
            theme === 'dark' ? '45, 212, 191' : '147, 51, 234'
          }, 0.15), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
          pointer-events: none;
        }
        .command-dashboard-glass-pane:hover::before {
          opacity: 1;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: hsl(var(--foreground));
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid hsl(var(--background));
          box-shadow: 0 0 10px rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.7);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: hsl(var(--foreground));
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid hsl(var(--background));
          box-shadow: 0 0 10px rgba(${theme === 'dark' ? '45, 212, 191' : '147, 51, 234'}, 0.7);
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
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className='command-dashboard-glass-pane my-strategic rounded-executive border bg-card/60 backdrop-blur-xl'
      >
        <div className='relative z-10 grid grid-cols-1 gap-8 p-strategic lg:grid-cols-5'>
          <div className='space-y-4 lg:col-span-3'>
            <h3 className='text-2xl font-bold text-foreground'>Profit Command Dashboard</h3>
            <div className='space-y-4 pt-4'>
              <CalibrationSlider
                label='Material Cost'
                value={values.materialCost}
                min={0}
                max={100}
                step={0.5}
                onChange={(e) => setValues((v) => ({ ...v, materialCost: parseFloat(e.target.value) }))}
                unit='$'
                theme={theme}
              />
              <CalibrationSlider
                label='Labor Cost'
                value={values.laborCost}
                min={0}
                max={100}
                step={0.5}
                onChange={(e) => setValues((v) => ({ ...v, laborCost: parseFloat(e.target.value) }))}
                unit='$'
                theme={theme}
              />
              <CalibrationSlider
                label='Desired Gross Margin'
                value={values.desiredMargin}
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
              className='mt-4 w-full rounded-lg bg-muted/50 p-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70'
            >
              {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Calibrators
            </button>
            <div className={`advanced-calibrators ${isAdvancedOpen ? 'is-open' : ''}`}>
              <div className='overflow-hidden'>
                <div className='space-y-4 pt-4'>
                  <CalibrationSlider
                    label='Shipping & Fees (per unit)'
                    value={values.shippingCost}
                    min={0}
                    max={50}
                    step={0.25}
                    onChange={(e) => setValues((v) => ({ ...v, shippingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='TikTok Shop Fee'
                    value={values.tiktokFee}
                    min={0}
                    max={25}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, tiktokFee: parseFloat(e.target.value) }))}
                    isPercentage
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Payment Processing Fee'
                    value={values.paymentFee}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, paymentFee: parseFloat(e.target.value) }))}
                    isPercentage
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Packaging Cost (per unit)'
                    value={values.packagingCost}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, packagingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Marketing Cost (per unit)'
                    value={values.marketingCost}
                    min={0}
                    max={20}
                    step={0.1}
                    onChange={(e) => setValues((v) => ({ ...v, marketingCost: parseFloat(e.target.value) }))}
                    unit='$'
                    theme={theme}
                  />
                  <CalibrationSlider
                    label='Estimated Return Rate'
                    value={values.returnRate}
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

          <div className='flex flex-col items-center justify-center gap-6 lg:col-span-2'>
            <div className='relative h-56 w-56'>
              <svg className='h-full w-full' viewBox='0 0 200 200'>
                <circle cx='100' cy='100' r={radius} fill='none' strokeWidth='18' className='stroke-muted/20' />
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
                      className='transition-all duration-500'
                    />
                  );
                })}
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Recommended</p>
                <span className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-black text-transparent'>
                  ${recommendedPrice.toFixed(2)}
                </span>
                <p className='text-xs font-semibold text-muted-foreground'>Price</p>
              </div>
            </div>
            <div className='w-full space-y-2 text-xs font-semibold'>
              {segments.map((s) => (
                <div key={s.label} className='flex items-center gap-2'>
                  <div className='h-3 w-3 rounded-full' style={{ backgroundColor: s.color }}></div>
                  <span className='text-foreground'>{s.label}</span>
                  <span className='ml-auto font-mono text-muted-foreground'>${s.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className='mt-4 w-full border-t border-border pt-4 text-center text-foreground'>
              <p className='font-semibold'>
                Net Profit: <span className='text-green-400'>${netProfit.toFixed(2)}</span> / unit
              </p>
              <p className='mt-1 text-xs text-muted-foreground'>
                Break-Even Price: ${isFinite(breakEvenPrice) ? breakEvenPrice.toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export wrapper for component browser
const AppContent = () => {
  return <AC_ProfitCommandDashboard />;
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
