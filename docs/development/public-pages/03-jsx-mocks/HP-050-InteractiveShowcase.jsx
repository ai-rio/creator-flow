import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Repeat, Zap, Sun, Moon } from 'lucide-react';

// --- Configuration ---
const brandColor = '#2DD4BF';
const darkThemeColor = '#0A090F';
const lightThemeGradient = 'linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 100%)';

// --- Mock Data ---
const kpiData = [
    { title: "Total Revenue", value: "$128,430", Icon: DollarSign },
    { title: "Today's Orders", value: "3,152", Icon: ShoppingCart },
    { title: "Repeat Customers", value: "28.9%", Icon: Repeat },
];

const revenueData = Array.from({ length: 20 }, (_, i) => ({
    name: `Day ${i + 1}`,
    revenue: 3000 + Math.random() * 4000 + Math.sin(i / 3) * 1500,
}));

// --- Main Component ---
export default function InteractiveShowcaseLightspeed() {
    const [theme, setTheme] = useState('dark');
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    });

    const headlineOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [0, 1, 0]);
    const headlineY = useTransform(scrollYProgress, [0.05, 0.1], [50, 0]);

    const subheadlineOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25], [0, 1, 0]);
    const subheadlineY = useTransform(scrollYProgress, [0.15, 0.2], [50, 0]);

    const gridScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
    const gridOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
    const gridRotateX = useTransform(scrollYProgress, [0.25, 0.5], [15, 0]);

    return (
        <div 
            className="font-sans transition-colors duration-500"
            style={{ background: theme === 'dark' ? darkThemeColor : lightThemeGradient }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');
                /* Dark Theme Katana Heading */
                .katana-heading-lightspeed {
                    font-weight: 900;
                    letter-spacing: -0.05em;
                    background: linear-gradient(90deg, #ffffff 50%, ${brandColor} 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% auto;
                    animation: sheen-lightspeed 3s linear infinite;
                }
                
                /* Light Theme Katana Heading */
                [data-theme='light'] .katana-heading-lightspeed {
                    background: linear-gradient(90deg, #1e293b 50%, #0d9488 100%);
                    -webkit-background-clip: text;
                }

                @keyframes sheen-lightspeed {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
            
            <ThemeToggleButton theme={theme} setTheme={setTheme} />

            <div ref={targetRef} className="relative h-[300vh]">
                <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden" data-theme={theme}>
                    <ParticleCanvas theme={theme} />
                    
                    {/* Headlines */}
                    <motion.div
                        className="absolute text-center z-10"
                        style={{ opacity: headlineOpacity, y: headlineY }}
                    >
                        <h2 className="katana-heading-lightspeed text-6xl md:text-8xl">
                            The Data Weave.
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        className="absolute text-center z-10 max-w-2xl"
                         style={{ opacity: subheadlineOpacity, y: subheadlineY }}
                    >
                        <h3 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                           Where data threads are woven into a tapestry of command.
                        </h3>
                    </motion.div>

                    {/* 2.5D Bento Grid */}
                    <motion.div
                        style={{
                            scale: gridScale,
                            opacity: gridOpacity,
                            rotateX: gridRotateX,
                            transformStyle: 'preserve-3d',
                        }}
                        className="w-full max-w-5xl p-8"
                    >
                        <div 
                            style={{ perspective: '2000px' }} 
                            className="grid grid-cols-3 grid-rows-2 gap-6 h-[500px]"
                        >
                            {kpiData.map((kpi, i) => (
                                <KPI_Card key={kpi.title} scrollYProgress={scrollYProgress} i={i} theme={theme} {...kpi} />
                            ))}
                            <Revenue_Card scrollYProgress={scrollYProgress} theme={theme} />
                            <Automation_Card scrollYProgress={scrollYProgress} theme={theme} />
                        </div>
                    </motion.div>
                </div>
            </div>
             <div className="h-screen" />
        </div>
    );
}


// --- Bento Grid Cards ---

const KPI_Card = ({ title, value, Icon, i, scrollYProgress, theme }) => {
    const z = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [1000, 0]);
    const opacity = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [0, 1]);
    const cardClasses = theme === 'dark'
        ? "bg-black/20 border-slate-100/10 text-white"
        : "bg-white/40 border-slate-900/10 text-slate-800";
    return (
        <motion.div 
            style={{ translateZ: z, opacity }}
            className={`row-span-1 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between ${cardClasses}`}
        >
            <div>
                <Icon className={`w-6 h-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} />
                <p className={`mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{title}</p>
            </div>
            <p className="text-4xl font-black">{value}</p>
        </motion.div>
    );
};

const Revenue_Card = ({ scrollYProgress, theme }) => {
    const [pathD, setPathD] = useState('');
    const chartContainerRef = useRef(null);

    const z = useTransform(scrollYProgress, [0.35, 0.45], [1000, 0]);
    const opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
    const pathLength = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

    useEffect(() => {
        if (chartContainerRef.current) {
            const observer = new MutationObserver(() => {
                const pathEl = chartContainerRef.current.querySelector('.recharts-line-curve path');
                if (pathEl) {
                    const d = pathEl.getAttribute('d');
                    if(d) {
                       setPathD(d);
                       observer.disconnect();
                    }
                }
            });
            observer.observe(chartContainerRef.current, { childList: true, subtree: true });
            return () => observer.disconnect();
        }
    }, []);
    
    const cardClasses = theme === 'dark'
        ? "bg-black/20 border-slate-100/10 text-white"
        : "bg-white/40 border-slate-900/10 text-slate-800";
        
    const lineColor = theme === 'dark' ? brandColor : '#0d9488'; // Darker teal for light theme contrast

    return (
        <motion.div 
            style={{ translateZ: z, opacity }}
            className={`col-span-2 row-span-2 backdrop-blur-md border rounded-2xl p-6 ${cardClasses}`}
        >
            <h3 className="font-bold">Revenue Masterpiece</h3>
            <div className="w-full h-[90%] mt-2" ref={chartContainerRef}>
                <ResponsiveContainer>
                    <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -30, bottom: 5 }}>
                        <Line type="monotone" dataKey="revenue" stroke={lineColor} strokeWidth={3} dot={false} />
                        {pathD && (
                             <motion.path 
                               d={pathD}
                               fill="transparent"
                               stroke={lineColor}
                               strokeWidth="3"
                               style={{ pathLength, filter: `drop-shadow(0 0 5px ${lineColor})` }}
                               initial={{ pathLength: 0 }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

const Automation_Card = ({ scrollYProgress, theme }) => {
    const z = useTransform(scrollYProgress, [0.38, 0.48], [1000, 0]);
    const opacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
    const cardClasses = theme === 'dark'
        ? "bg-black/20 border-slate-100/10 text-white"
        : "bg-white/40 border-slate-900/10 text-slate-800";

    return (
        <motion.div 
            style={{ translateZ: z, opacity }}
            className={`col-span-1 row-span-1 backdrop-blur-md border rounded-2xl p-6 ${cardClasses}`}
        >
             <Zap className="w-8 h-8 text-purple-400" />
             <p className="text-xl font-bold mt-4">Automation Liberation</p>
             <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-2`}>Saving an average of <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-bold`}>12 hours</span> per week.</p>
        </motion.div>
    );
};


// --- Background Particle Canvas ---
const ParticleCanvas = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        };
        
        let particles = [];
        const particleCount = 100;
        const particleColorDark = `rgba(45, 212, 191, 0.7)`;
        const particleColorLight = `rgba(13, 148, 136, 0.7)`;

        const createParticles = () => {
            particles = [];
             for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 * window.devicePixelRatio,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.fillStyle = theme === 'dark' ? particleColorDark : particleColorLight;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();
        
        const handleResize = () => {
            resizeCanvas();
            createParticles();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

// --- Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme }) => {
    const buttonClasses = theme === 'dark'
        ? "bg-white/5 border-slate-100/10 text-slate-200"
        : "bg-slate-800/5 border-slate-900/10 text-slate-800";
    return(
        <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`fixed bottom-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${buttonClasses}`}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: -15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};


