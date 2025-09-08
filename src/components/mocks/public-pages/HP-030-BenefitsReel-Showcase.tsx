import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShieldCheck, Zap, PackageCheck } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Data for the Benefits Reel ---
const benefits = [
    {
        Icon: ShieldCheck,
        title: "Automation Savings",
        description: "Save an average of $27,000/month in operational costs with a fully automated order and shipping workflow.",
        value: 27000,
        prefix: "$",
        suffix: "/mo",
        color: "green",
    },
    {
        Icon: PackageCheck,
        title: "Inventory Accuracy",
        description: "Prevent $8,400/month in costly oversells with real-time, sub-5-second inventory tracking.",
        value: 8400,
        prefix: "$",
        suffix: "/mo",
        color: "purple",
    },
    {
        Icon: Zap,
        title: "Processing Speed",
        description: "Reduce order import times from 12 minutes down to 30 seconds.",
        value: 24, // Represents 12m -> 30s as a multiplier
        prefix: "24x",
        suffix: "Faster",
        color: "blue",
    },
];

// --- Main Showcase Component ---
export default function BenefitsReelShowcase(): React.JSX.Element {
    const [theme, setTheme] = useState<string>('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className="font-sans bg-slate-100 dark:bg-[#0A090F] transition-colors duration-300">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap'); body { font-family: 'Inter', sans-serif; }`}</style>
            <div className="h-[50vh]" /> {/* Spacer to allow scrolling into the component */}
            <HP030BenefitsReel />
            <div className="h-[50vh]" /> {/* Spacer to allow scrolling out */}
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- HP-030-BenefitsReel Component ---
const HP030BenefitsReel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const newIndex = Math.min(Math.floor(latest * benefits.length), benefits.length - 1);
            if(newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeIndex]);

    const colors = {
        green: "rgba(74, 222, 128, 0.15)",
        purple: "rgba(168, 85, 247, 0.15)",
        blue: "rgba(59, 130, 246, 0.15)",
    };
    
    const backgroundGlow = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [colors.green, colors.purple, colors.blue]
    );

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                {/* Background Glow */}
                <motion.div
                    style={{
                        boxShadow: `0 0 150px 70px ${backgroundGlow.get()}`,
                        transition: 'box-shadow 0.5s ease-out'
                    }}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Content */}
                <div className="relative flex flex-col items-center text-center px-4">
                     <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 tracking-tight mb-4">
                        Automate Operations. Amplify Revenue.
                    </h2>
                    <p className="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400 mb-16">
                        CreatorFlow isn&apos;t just a tool—it&apos;s a measurable competitive advantage. See the real-world impact on your bottom line.
                    </p>
                    <AnimatePresence mode="wait">
                        <BenefitCard key={activeIndex} data={benefits[activeIndex]} />
                    </AnimatePresence>
                </div>
                
                {/* Progress Indicator */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    {benefits.map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors">
                            <motion.div 
                                className="w-full h-full rounded-full bg-slate-700 dark:bg-slate-300"
                                initial={{ scale: 0 }}
                                animate={{ scale: activeIndex === i ? 1 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Benefit Card Sub-Component ---
const BenefitCard: React.FC<any> = ({ data  }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="w-full max-w-sm md:max-w-md p-1 rounded-2xl bg-gradient-to-b from-slate-300/50 to-transparent dark:from-slate-800/50 dark:to-transparent"
        >
            <div className="p-8 rounded-[15px] backdrop-blur-2xl bg-slate-200/80 dark:bg-black/30 border border-slate-900/10 dark:border-slate-100/10 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-${data.color}-500/10`}>
                        <data.Icon className={`w-6 h-6 text-${data.color}-500`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{data.title}</h3>
                </div>
                <div className="my-6 text-left">
                    <p className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-800 dark:from-slate-200 to-slate-600 dark:to-slate-500">
                        {data.prefix}
                        <AnimatedNumber n={data.value} />
                        <span className="text-2xl">{data.suffix}</span>
                    </p>
                </div>
                <p className="text-base text-slate-600 dark:text-slate-400 text-left">{data.description}</p>
            </div>
        </motion.div>
    );
};

// --- Helper: Animated Number ---
function AnimatedNumber({ n }) {
    const [number, setNumber] = useState<number>(0);

    useEffect(() => {
        const controls = animate(number, n, {
            type: "spring",
            stiffness: 100,
            damping: 20,
            onUpdate(value) {
                setNumber(value);
            }
        });
        return () => controls.stop();
    }, [n]);

    const formatNumber = (val) => {
        if (n >= 1000) return Math.round(val).toLocaleString();
        return Math.round(val);
    };

    return <span>{formatNumber(number)}</span>
}


// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme  }: any) => (
    <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-4 right-4 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl bg-slate-200/50 dark:bg-white/5 border border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200" aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
);

