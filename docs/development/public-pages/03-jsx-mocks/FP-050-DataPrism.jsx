import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, Clock, TrendingUp, MapPin } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    glassBg: 'bg-black/20',
    border: 'border-slate-100/10',
    sparkColor: '#2DD4BF',
    prismBg: 'rgba(0, 0, 0, 0.1)',
    activeFacetBg: 'bg-indigo-500/20',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    glassBg: 'bg-white/40',
    border: 'border-slate-900/10',
    sparkColor: '#0d9488',
    prismBg: 'rgba(255, 255, 255, 0.2)',
    activeFacetBg: 'bg-indigo-100',
};

// --- Data ---
const facets = [
    { id: 'bestseller', Icon: TrendingUp, title: "What's my next bestseller?" },
    { id: 'golden_hour', Icon: Clock, title: 'When is my "golden hour"?' },
    { id: 'customers', Icon: MapPin, title: 'Where are my new customers?' },
];

const forecastData = [
    { name: 'Aug', forecast: 400 }, { name: 'Sep', forecast: 450 },
    { name: 'Oct', forecast: 600 }, { name: 'Nov', forecast: 800 },
    { name: 'Dec', forecast: 1100 },
];

const heatmapData = Array.from({ length: 7 * 12 }, (_, i) => Math.random()); // 7 days, 12 hours

// --- Main Demo Component ---
export default function App() {
    const [theme, setTheme] = React.useState('dark');
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    return (
        <div className="font-sans" style={{ background: currentTheme.background, color: currentTheme.textPrimary }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
            <FP050DataPrism theme={currentTheme} />
            <ThemeToggleButton currentTheme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- The Definitive FP-050 "Data Prism" ---
const FP050DataPrism = ({ theme }) => {
    const [activeFacet, setActiveFacet] = React.useState(facets[0].id);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <div className="text-center">
                 <h2 className={`text-6xl font-black md:text-8xl ${theme.textPrimary}`}>The Oracle of Growth.</h2>
                 <p className={`mx-auto mt-4 max-w-3xl text-lg ${theme.textSecondary}`}>
                    Our analytics engine deciphers your past to predict your future, revealing the hidden trends that will drive your next wave of growth.
                 </p>
            </div>
            
            <div className="mt-16 w-full max-w-6xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Facet Selection */}
                    <div className="flex flex-row justify-center gap-4 lg:flex-col lg:justify-start">
                        {facets.map(facet => (
                            <FacetButton 
                                key={facet.id}
                                facet={facet}
                                isActive={activeFacet === facet.id}
                                onClick={() => setActiveFacet(facet.id)}
                                theme={theme}
                            />
                        ))}
                    </div>

                    {/* Revelation Display */}
                    <div className="relative min-h-[400px] rounded-2xl border p-6 backdrop-blur-md lg:col-span-2"
                         style={{ backgroundColor: theme.prismBg, borderColor: theme.border }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFacet}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeFacet === 'bestseller' && <BestsellerChart theme={theme} />}
                                {activeFacet === 'golden_hour' && <GoldenHourHeatmap theme={theme} />}
                                {activeFacet === 'customers' && <CustomerInsight theme={theme} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Components ---

const FacetButton = ({ facet, isActive, onClick, theme }) => (
    <motion.button
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors ${isActive ? theme.activeFacetBg : ''}`}
        whileHover={{ scale: 1.05 }}
    >
        <facet.Icon className="h-6 w-6 flex-shrink-0" style={{ color: theme.sparkColor }}/>
        <span className={`font-bold ${theme.textPrimary}`}>{facet.title}</span>
    </motion.button>
);

const BestsellerChart = ({ theme }) => (
    <div>
        <h3 className={`font-bold text-xl ${theme.textPrimary}`}>Demand Forecast: Creator Hoodie</h3>
        <p className={`mt-1 text-sm ${theme.textSecondary}`}>Predictive analysis suggests a 175% increase in demand over the next quarter.</p>
        <div className="mt-4 h-80 w-full">
            <ResponsiveContainer>
                <AreaChart data={forecastData}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.sparkColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={theme.sparkColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke={theme.textSecondary} fontSize={12} />
                    <YAxis stroke={theme.textSecondary} fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: theme.glassBg, border: `1px solid ${theme.border}`, borderRadius: '0.5rem' }}/>
                    <Area type="monotone" dataKey="forecast" stroke={theme.sparkColor} strokeWidth={2} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const GoldenHourHeatmap = ({ theme }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
    <div>
        <h3 className={`font-bold text-xl ${theme.textPrimary}`}>Golden Hour Identified</h3>
        <p className={`mt-1 text-sm ${theme.textSecondary}`}>Your peak sales activity consistently occurs between 7-9 PM on Thursdays.</p>
        <div className="mt-4">
            <div className="flex">
                <div className="w-10 shrink-0" />
                <div className="grid grid-cols-12 flex-grow">
                    {Array.from({length: 12}).map((_, i) => (
                        <span key={i} className={`text-xs text-center ${theme.textSecondary}`}>{i * 2 + 1}h</span>
                    ))}
                </div>
            </div>
            <div className="flex mt-1">
                <div className="flex flex-col w-10 shrink-0">
                    {days.map(day => <span key={day} className={`text-xs h-6 flex items-center ${theme.textSecondary}`}>{day}</span>)}
                </div>
                <div className="relative grid grid-cols-12 grid-rows-7 gap-1 flex-grow">
                    {heatmapData.map((intensity, i) => (
                        <div 
                            key={i} 
                            className="h-6 w-full rounded"
                            style={{ backgroundColor: theme.sparkColor, opacity: intensity }}
                        />
                    ))}
                    <motion.div
                        className="absolute border-2 rounded"
                        style={{
                            borderColor: theme.sparkColor,
                            boxShadow: `0 0 10px ${theme.sparkColor}`,
                            gridRow: '4 / span 1',
                            gridColumn: '9 / span 3',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

const CustomerInsight = ({ theme }) => (
     <div>
        <h3 className={`font-bold text-xl ${theme.textPrimary}`}>New Customer Hotspot</h3>
        <p className={`mt-1 text-sm ${theme.textSecondary}`}>A significant pocket of new customers has emerged in the Pacific Northwest.</p>
        <div className={`mt-4 flex h-80 w-full items-center justify-center rounded-lg relative overflow-hidden ${theme === darkTheme ? 'bg-black/10' : 'bg-slate-200/50'}`}>
            <WorldMapIllustration color={theme.sparkColor} />
            <div className="relative z-10 flex items-center">
                <MapPin size={64} className="animate-pulse" style={{color: theme.sparkColor, filter: `drop-shadow(0 0 10px ${theme.sparkColor})`}}/>
                <p className={`ml-4 font-black text-4xl ${theme.textPrimary}`} style={{textShadow: `0 0 10px ${theme.background === '#0A090F' ? '#0A090F' : 'rgba(255,255,255,0.7)'}`}}>PNW Region</p>
            </div>
        </div>
    </div>
);

const WorldMapIllustration = ({ color }) => (
    <svg className="absolute w-full h-full opacity-20" viewBox="0 0 1000 500">
        <path d="M100,250 C150,200 250,150 300,200 S400,300 500,250 S600,150 700,200 S800,300 900,250" stroke={color} fill="none" strokeWidth="2" />
        <path d="M50,150 C100,100 200,120 250,180 S350,280 450,200 S550,100 650,150 S750,250 850,200" stroke={color} fill="none" strokeWidth="2" />
        <path d="M200,350 C250,300 350,320 400,380 S500,450 600,380 S700,300 800,350" stroke={color} fill="none" strokeWidth="2" />
    </svg>
);


// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ currentTheme, setTheme }) => (
    <motion.button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} className={`fixed top-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${currentTheme === 'dark' ? 'bg-white/5 border-slate-100/10 text-slate-200' : 'bg-slate-800/5 border-slate-900/10 text-slate-800'}`} aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={currentTheme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

