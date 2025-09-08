import { motion } from 'framer-motion';
import { AlertTriangle, BarChart2, BrainCircuit, ChevronLeft, ChevronRight, DollarSign, Eye, HelpCircle, LogOut, Moon,Repeat, Settings, ShoppingCart, Sun, Users, Zap } from 'lucide-react';
import React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceArea,ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock Data for the chart and KPIs
const kpiData = [
    { title: "Total Revenue", value: "$128,430", change: "+12.5%", Icon: DollarSign, positive: true },
    { title: "Today's Orders", value: "3,152", change: "+8.2%", Icon: ShoppingCart, positive: true },
    { title: "Conversion Rate", value: "4.72%", change: "-0.3%", Icon: Eye, positive: false },
    { title: "Repeat Customer Rate", value: "28.9%", change: "+1.1%", Icon: Repeat, positive: true },
];

const revenueData = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    revenue: 3000 + Math.random() * 4000 + Math.sin(i / 3) * 1500 + (i > 20 && i < 25 ? 5000 : 0),
    pv: 2400,
    amt: 2400,
}));

// --- Sub-Components ---

// Particle Canvas for the background effect of the main chart
const ParticleCanvas = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(13, 148, 136, ${p.opacity})`; // Teal particle color for both themes
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

// Custom Tooltip for the Recharts graph with a glowing effect
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-teal-500/50 rounded-lg p-3 shadow-lg" style={{ boxShadow: '0 0 15px rgba(13, 148, 136, 0.6)' }}>
                <p className="label text-sm text-gray-600 dark:text-gray-300">{`${label}`}</p>
                <p className="intro text-lg font-bold text-teal-600 dark:text-teal-300">{`Revenue : $${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};

// Main Component: The CEO Command Center
export default function CreatorFlowDashboard(): React.JSX.Element {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);
    const [theme, setTheme] = React.useState('dark');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    // --- JSX ---
    return (
        <div className={theme}>
        <div className="bg-gray-100 dark:bg-[#111827] text-gray-800 dark:text-gray-300 font-sans flex min-h-screen transition-colors duration-300">
            {/* Sidebar */}
            <motion.div
                className="flex flex-col bg-white dark:bg-[#111827] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-20"
                onMouseEnter={() => setSidebarCollapsed(false)}
                onMouseLeave={() => setSidebarCollapsed(true)}
                animate={{ width: sidebarCollapsed ? '5rem' : '16rem' }}
            >
                <div className="flex items-center justify-center h-20 border-b border-gray-800">
                    <motion.div animate={{ rotate: sidebarCollapsed ? 0 : 360 }} transition={{ duration: 0.5 }}>
                       <BrainCircuit className="h-8 w-8 text-teal-400" />
                    </motion.div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-4">
                    <a href="#" className="flex items-center p-3 rounded-lg text-gray-900 dark:text-gray-300 bg-gray-200/50 dark:bg-gray-800">
                        <BarChart2 className="h-6 w-6" />
                        {!sidebarCollapsed && <span className="ml-4 font-semibold">Dashboard</span>}
                    </a>
                     <a href="#" className="flex items-center p-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200">
                        <ShoppingCart className="h-6 w-6" />
                        {!sidebarCollapsed && <span className="ml-4 font-semibold">Orders</span>}
                    </a>
                     <a href="#" className="flex items-center p-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200">
                        <Users className="h-6 w-6" />
                        {!sidebarCollapsed && <span className="ml-4 font-semibold">Customers</span>}
                    </a>
                </nav>
                <div className="px-4 py-6 space-y-4 border-t border-gray-200 dark:border-gray-800">
                     <a href="#" className="flex items-center p-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200">
                        <Settings className="h-6 w-6" />
                        {!sidebarCollapsed && <span className="ml-4 font-semibold">Settings</span>}
                    </a>
                     <a href="#" className="flex items-center p-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200">
                        <LogOut className="h-6 w-6" />
                        {!sidebarCollapsed && <span className="ml-4 font-semibold">Logout</span>}
                    </a>
                </div>
            </motion.div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">CEO Command Center</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Alex. Here's your enterprise at a glance.</p>
                    </div>
                    <button 
                        onClick={toggleTheme} 
                        className="p-3 rounded-full bg-gray-200/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>
                </header>

                <motion.div
                    className="grid grid-cols-12 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* KPI Cards */}
                    {kpiData.map(kpi => (
                        <motion.div key={kpi.title} className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6" variants={itemVariants}>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 dark:text-gray-400">{kpi.title}</p>
                                <kpi.Icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{kpi.value}</p>
                            <p className={`text-sm mt-1 ${kpi.positive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{kpi.change}</p>
                        </motion.div>
                    ))}

                    {/* Revenue Masterpiece Chart */}
                    <motion.div className="col-span-12 lg:col-span-8 row-span-2 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 relative overflow-hidden" variants={itemVariants}>
                        <ParticleCanvas />
                        <div className="relative z-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Revenue Masterpiece</h2>
                            <div style={{ width: '100%', height: 400 }}>
                                <ResponsiveContainer>
                                    <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                                        <XAxis dataKey="name" stroke={theme === 'dark' ? '#6b7280' : '#6b7280'} />
                                        <YAxis stroke={theme === 'dark' ? '#6b7280' : '#6b7280'} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(13, 148, 136, 0.5)', strokeWidth: 1 }} />
                                        <Line type="monotone" dataKey="revenue" stroke="url(#colorRevenue)" strokeWidth={3} dot={false} />
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.8}/>
                                            </linearGradient>
                                        </defs>
                                        <ReferenceArea x1="Day 22" x2="Day 25" stroke="rgba(251, 191, 36, 0.5)" fill="rgba(251, 191, 36, 0.1)" label={{ value: "Viral Spike", position: "insideTop", fill: '#FBBF24' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>

                    {/* Crisis Command */}
                    <motion.div className="col-span-12 lg:col-span-4 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6" variants={itemVariants}>
                         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><AlertTriangle className="mr-2 text-amber-500 dark:text-amber-400"/>Crisis Command</h2>
                         <div className="space-y-4">
                             <div className="bg-amber-500/10 border border-amber-500/50 rounded-lg p-4 relative overflow-hidden">
                                <div className="absolute -top-2 -right-2 w-16 h-16 bg-amber-500/20 rounded-full animate-ping"/>
                                <p className="font-bold text-amber-600 dark:text-amber-300">High-Risk Orders</p>
                                <p className="text-gray-600 dark:text-gray-300">3 orders flagged for review.</p>
                                <button className="mt-2 text-sm font-semibold text-amber-700 dark:text-amber-200 hover:text-amber-900 dark:hover:text-white">Review Now &rarr;</button>
                             </div>
                             <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                                <p className="font-bold text-red-600 dark:text-red-400">Inventory Alert</p>
                                <p className="text-gray-600 dark:text-gray-300">"Creator T-Shirt" is low stock.</p>
                                 <button className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-white">Reorder &rarr;</button>
                             </div>
                         </div>
                    </motion.div>
                    
                    {/* Automation Liberation */}
                     <motion.div className="col-span-12 lg:col-span-4 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6" variants={itemVariants}>
                         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Zap className="mr-2 text-purple-500 dark:text-purple-400"/>Automation Liberation</h2>
                         <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-300">Automated fraud analysis saved</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">12 hours</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">in the last 30 days</p>
                            </div>
                             <div>
                                <p className="text-gray-600 dark:text-gray-300">Automated fulfillment processed</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-300 mt-1">8,921 orders</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">flawlessly</p>
                            </div>
                         </div>
                    </motion.div>

                     {/* Executive Business Intelligence */}
                    <motion.div className="col-span-12 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6" variants={itemVariants}>
                         <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><BrainCircuit className="mr-2 text-teal-500 dark:text-teal-400"/>Executive Business Intelligence</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-200/50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <p className="font-semibold text-teal-600 dark:text-teal-300">Growth Opportunity</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">Repeat customers are 3x more likely to buy "Creator Hoodie". Recommend a targeted email campaign.</p>
                            </div>
                             <div className="bg-gray-200/50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <p className="font-semibold text-teal-600 dark:text-teal-300">Performance Insight</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">Your conversion rate peaks between 7-9 PM. Consider running ads during this window.</p>
                            </div>
                            <div className="bg-gray-200/50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <p className="font-semibold text-teal-600 dark:text-teal-300">Product Trend</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">The "Limited Edition Cap" has a 35% higher AOV than other products. Feature it on the homepage.</p>
                            </div>
                         </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
        </div>
    );
}

