import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Eye, Brush, ArrowUpRight, X } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Data for the Manifesto Cards ---
const manifestoData = [
    {
        id: "clarity",
        Icon: Eye,
        title: "Clarity",
        tagline: "From Chaos to Cohesion.",
        detail: "We believe in transforming overwhelming data into a clear, actionable narrative. Our interface is meticulously designed to eliminate noise, providing you with the pure insight needed to make confident, strategic decisions.",
        color: "blue",
    },
    {
        id: "data_as_art",
        Icon: Brush,
        title: "Data as Art",
        tagline: "Wisdom Made Visible.",
        detail: "Data is more than numbers; it's the story of your business. We present your analytics not as spreadsheets, but as beautiful, intuitive visualizations that allow you to grasp complex trends in a single, elegant glance.",
        color: "purple",
    },
    {
        id: "empowerment",
        Icon: ArrowUpRight,
        title: "Empowerment",
        tagline: "Your Vision, Amplified.",
        detail: "Our platform is not just a tool, it's a force multiplier. By automating the mundane and illuminating the crucial, we give you back the time and control to focus on what truly matters: building your brand and commanding your growth.",
        color: "teal",
    },
];

// --- Main Showcase Component ---
export default function ManifestoShowcase(): React.JSX.Element {
    const [theme, setTheme] = useState<string>('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="font-sans bg-slate-100 dark:bg-[#0A090F] transition-colors duration-300 flex items-center justify-center min-h-screen p-4 overflow-hidden">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); body { font-family: 'Inter', sans-serif; }`}</style>
            <HP040Manifesto />
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- HP-040-Manifesto Component ---
const HP040Manifesto = () => {
    const [selectedId, setSelectedId] = useState<any>(null);

    return (
        <section className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {manifestoData.map((item) => (
                    <ManifestoCard key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
                ))}
            </div>
            <DeepDiveView selectedId={selectedId} setSelectedId={setSelectedId} />
        </section>
    );
};

// --- Manifesto Card Sub-Component ---
const ManifestoCard: React.FC<any> = ({ item, onClick  }: any) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const colors = {
        blue: { dark: '#60a5fa' },
        purple: { dark: '#c084fc' },
        teal: { dark: '#2dd4bf' },
    };

    return (
        <motion.div
            layoutId={item.id}
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative p-8 aspect-[3/4] rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden bg-slate-200/50 dark:bg-black/20 border border-slate-900/10 dark:border-slate-100/10"
        >
            <motion.div 
                className="absolute inset-0 -z-10"
                style={{ background: `radial-gradient(circle at 50% 50%, ${colors[item.color].dark}40, transparent 80%)` }}
                animate={{ scale: isHovered ? [1, 1.3, 1] : 1, opacity: isHovered ? 1 : 0.5 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="z-10" layoutId={`icon-${item.id}`}>
                <item.Icon className="w-12 h-12 text-slate-700 dark:text-slate-300" />
            </motion.div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.1 }} className="mt-6 text-center">
                        <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-bold text-slate-900 dark:text-slate-100">{item.title}</motion.h3>
                        <motion.p layoutId={`tagline-${item.id}`} className="mt-2 text-slate-600 dark:text-slate-400">{item.tagline}</motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>{isHovered && <SharpEdgeAndSpark color={colors[item.color].dark} />}</AnimatePresence>
        </motion.div>
    );
};

// --- Deep Dive Modal View ---
const DeepDiveView: React.FC<any> = ({ selectedId, setSelectedId  }: any) => {
    const selectedItem = manifestoData.find(item => item.id === selectedId);

    return (
        <AnimatePresence>
            {selectedItem && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelectedId(null)} />
                    <motion.div layoutId={selectedId} className="relative w-full max-w-2xl p-8 rounded-2xl bg-slate-200/80 dark:bg-black/50 border border-slate-900/10 dark:border-slate-100/10">
                        <motion.button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-slate-600 dark:text-slate-400" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                            <X size={24} />
                        </motion.button>
                        <div className="flex items-start gap-6">
                             <motion.div layoutId={`icon-${selectedId}`} className="p-2 rounded-lg">
                                <selectedItem.Icon className="w-12 h-12 text-slate-700 dark:text-slate-300" />
                            </motion.div>
                            <div>
                                <motion.h3 layoutId={`title-${selectedId}`} className="text-3xl font-bold text-slate-900 dark:text-slate-100">{selectedItem.title}</motion.h3>
                                <motion.p layoutId={`tagline-${selectedId}`} className="text-lg mt-1 text-slate-600 dark:text-slate-400">{selectedItem.tagline}</motion.p>
                            </div>
                        </div>
                        <motion.p 
                            className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {selectedItem.detail}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const SharpEdgeAndSpark = ({ color  }: any) => (
    <>
        <svg className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="15" stroke={color} strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "circOut" }} />
        </svg>
        <div className="absolute top-[1px] right-[1px]">
             {Array.from({ length: 15 }).map((_, i) => (
                <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full" style={{ background: color, top: 0, left: 0 }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                    animate={{ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50, scale: Math.random() * 0.5 + 0.5, opacity: [0, 1, 0] }}
                    transition={{ delay: 0.4, duration: 0.4 + Math.random() * 0.3, ease: "easeOut" }} />
            ))}
        </div>
    </>
);

const ThemeToggleButton = ({ theme, setTheme  }: any) => (
    <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-4 right-4 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl bg-slate-200/50 dark:bg-white/5 border border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200" aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

