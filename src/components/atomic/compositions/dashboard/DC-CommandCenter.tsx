'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, BrainCircuit, DollarSign, Eye, Repeat, ShoppingCart, Zap } from 'lucide-react';
import * as React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface KPIData {
  title: string;
  value: string;
  change: string;
  Icon: React.ComponentType<{ className?: string }>;
  positive: boolean;
}

interface ChartDataPoint {
  name: string;
  revenue: number;
  pv: number;
  amt: number;
}

// Mock Data for the chart and KPIs
const kpiData: KPIData[] = [
  { title: 'Total Revenue', value: '$128,430', change: '+12.5%', Icon: DollarSign, positive: true },
  { title: "Today's Orders", value: '3,152', change: '+8.2%', Icon: ShoppingCart, positive: true },
  { title: 'Conversion Rate', value: '4.72%', change: '-0.3%', Icon: Eye, positive: false },
  { title: 'Repeat Customer Rate', value: '28.9%', change: '+1.1%', Icon: Repeat, positive: true },
];

const revenueData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  revenue: 3000 + Math.random() * 4000 + Math.sin(i / 3) * 1500 + (i > 20 && i < 25 ? 5000 : 0),
  pv: 2400,
  amt: 2400,
}));

// Particle Canvas for the background effect of the main chart
const ParticleCanvas = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
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

  return <canvas ref={canvasRef} className='absolute left-0 top-0 z-0 h-full w-full' />;
};

// Custom Tooltip for the Recharts graph with a glowing effect
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className='rounded-lg border border-teal-500/50 bg-background/80 p-3 shadow-lg backdrop-blur-sm'
        style={{ boxShadow: '0 0 15px rgba(13, 148, 136, 0.6)' }}
      >
        <p className='label text-sm text-foreground/70'>{`${label}`}</p>
        <p className='intro text-lg font-bold text-teal-600 dark:text-teal-300'>{`Revenue : $${payload[0].value.toFixed(
          2
        )}`}</p>
      </div>
    );
  }
  return null;
};

// Main Component: The CEO Command Center Content
export const CEOCommandCenter = () => {
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
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className='flex-1 overflow-y-auto p-8'>
      <header className='mb-8'>
        <div>
          <h1 className='text-4xl font-bold text-foreground'>CEO Command Center</h1>
          <p className='mt-1 text-foreground/70'>Welcome back, Alex. Here&apos;s your enterprise at a glance.</p>
        </div>
      </header>

      <motion.div className='grid grid-cols-12 gap-6' variants={containerVariants} initial='hidden' animate='visible'>
        {/* KPI Cards */}
        {kpiData.map((kpi) => (
          <motion.div
            key={kpi.title}
            className='col-span-12 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:col-span-6 lg:col-span-3'
            variants={itemVariants}
          >
            <div className='flex items-center justify-between'>
              <p className='text-foreground/80'>{kpi.title}</p>
              <kpi.Icon className='h-6 w-6 text-foreground/60' />
            </div>
            <p className='mt-2 text-3xl font-bold text-foreground'>{kpi.value}</p>
            <p
              className={`mt-1 text-sm ${
                kpi.positive ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`}
            >
              {kpi.change}
            </p>
          </motion.div>
        ))}

        {/* Revenue Masterpiece Chart */}
        <motion.div
          className='relative col-span-12 row-span-2 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm lg:col-span-8'
          variants={itemVariants}
        >
          <ParticleCanvas />
          <div className='relative z-10'>
            <h2 className='mb-4 text-xl font-semibold text-foreground'>Revenue Masterpiece</h2>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
                  <XAxis dataKey='name' stroke='hsl(var(--foreground))' opacity={0.7} />
                  <YAxis stroke='hsl(var(--foreground))' opacity={0.7} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(13, 148, 136, 0.5)', strokeWidth: 1 }} />
                  <Line type='monotone' dataKey='revenue' stroke='url(#colorRevenue)' strokeWidth={3} dot={false} />
                  <defs>
                    <linearGradient id='colorRevenue' x1='0' y1='0' x2='1' y2='0'>
                      <stop offset='5%' stopColor='#6EE7B7' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#A78BFA' stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <ReferenceArea
                    x1='Day 22'
                    x2='Day 25'
                    stroke='rgba(251, 191, 36, 0.5)'
                    fill='rgba(251, 191, 36, 0.1)'
                    label={{ value: 'Viral Spike', position: 'insideTop', fill: '#FBBF24' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Crisis Command */}
        <motion.div
          className='col-span-12 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm lg:col-span-4'
          variants={itemVariants}
        >
          <h2 className='mb-4 flex items-center text-xl font-semibold text-foreground'>
            <AlertTriangle className='mr-2 text-amber-500 dark:text-amber-400' />
            Crisis Command
          </h2>
          <div className='space-y-4'>
            <div className='relative overflow-hidden rounded-lg border border-amber-500/50 bg-amber-500/10 p-4'>
              <div className='absolute -right-2 -top-2 h-16 w-16 animate-ping rounded-full bg-amber-500/20' />
              <p className='font-bold text-amber-600 dark:text-amber-300'>High-Risk Orders</p>
              <p className='text-foreground/80'>3 orders flagged for review.</p>
              <button className='mt-2 text-sm font-semibold text-amber-700 hover:text-amber-900 dark:text-amber-200 dark:hover:text-white'>
                Review Now &rarr;
              </button>
            </div>
            <div className='rounded-lg border border-red-500/50 bg-red-500/10 p-4'>
              <p className='font-bold text-red-600 dark:text-red-400'>Inventory Alert</p>
              <p className='text-foreground/80'>&ldquo;Creator T-Shirt&rdquo; is low stock.</p>
              <button className='mt-2 text-sm font-semibold text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-white'>
                Reorder &rarr;
              </button>
            </div>
          </div>
        </motion.div>

        {/* Automation Liberation */}
        <motion.div
          className='col-span-12 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm lg:col-span-4'
          variants={itemVariants}
        >
          <h2 className='mb-4 flex items-center text-xl font-semibold text-foreground'>
            <Zap className='mr-2 text-purple-500 dark:text-purple-400' />
            Automation Liberation
          </h2>
          <div className='space-y-4'>
            <div>
              <p className='text-foreground/80'>Automated fraud analysis saved</p>
              <p className='mt-1 text-2xl font-bold text-purple-600 dark:text-purple-300'>12 hours</p>
              <p className='text-xs text-foreground/60'>in the last 30 days</p>
            </div>
            <div>
              <p className='text-foreground/80'>Automated fulfillment processed</p>
              <p className='mt-1 text-2xl font-bold text-purple-600 dark:text-purple-300'>8,921 orders</p>
              <p className='text-xs text-foreground/60'>flawlessly</p>
            </div>
          </div>
        </motion.div>

        {/* Executive Business Intelligence */}
        <motion.div
          className='col-span-12 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm'
          variants={itemVariants}
        >
          <h2 className='mb-4 flex items-center text-xl font-semibold text-foreground'>
            <BrainCircuit className='mr-2 text-teal-500 dark:text-teal-400' />
            Executive Business Intelligence
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='rounded-lg bg-muted/50 p-4'>
              <p className='font-semibold text-teal-600 dark:text-teal-300'>Growth Opportunity</p>
              <p className='mt-1 text-foreground/80'>
                Repeat customers are 3x more likely to buy &ldquo;Creator Hoodie&rdquo;. Recommend a targeted email
                campaign.
              </p>
            </div>
            <div className='rounded-lg bg-muted/50 p-4'>
              <p className='font-semibold text-teal-600 dark:text-teal-300'>Performance Insight</p>
              <p className='mt-1 text-foreground/80'>
                Your conversion rate peaks between 7-9 PM. Consider running ads during this window.
              </p>
            </div>
            <div className='rounded-lg bg-muted/50 p-4'>
              <p className='font-semibold text-teal-600 dark:text-teal-300'>Product Trend</p>
              <p className='mt-1 text-foreground/80'>
                The &ldquo;Limited Edition Cap&rdquo; has a 35% higher AOV than other products. Feature it on the
                homepage.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CEOCommandCenter;
