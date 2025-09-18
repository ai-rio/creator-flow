'use client';

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Clock, DollarSign, Repeat, ShoppingCart, TrendingDown, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

/**
 * ENHANCED INTERACTIVE SHOWCASE SECTION
 *
 * Features:
 * - Fixed hydration errors with proper SSR handling
 * - Advanced motion effects with stagger animations
 * - Evil chart integration with CreatorFlow TikTok Shop metrics
 * - Popper chart overlay for detailed analytics
 * - Performance-optimized particle system
 * - Enhanced hover effects and micro-interactions
 */

// CreatorFlow TikTok Shop Metrics Data
const kpiData = [
  { title: 'Total Revenue', value: '$128,430', trend: 12.5, Icon: DollarSign, color: 'hsl(142 76% 36%)' },
  { title: "Today's Orders", value: '3,152', trend: 8.3, Icon: ShoppingCart, color: 'hsl(217 91% 60%)' },
  { title: 'Repeat Customers', value: '28.9%', trend: -2.1, Icon: Repeat, color: 'hsl(262 83% 58%)' },
];

// TikTok Shop Analytics Data
const revenueData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  revenue: 3000 + Math.random() * 4000 + Math.sin(i / 3) * 1500,
  orders: 120 + Math.random() * 200 + Math.sin(i / 4) * 50,
  automation: 75 + Math.random() * 20,
}));

const evilChartData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  revenue: 15000 + Math.random() * 25000 + Math.sin(i / 2) * 8000,
  orders: 500 + Math.random() * 800 + Math.sin(i / 3) * 200,
}));

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--primary))',
  },
  orders: {
    label: 'Orders',
    color: 'hsl(217 91% 60%)',
  },
} satisfies ChartConfig;

export function InteractiveShowcase() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeChart, setActiveChart] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Always call hooks unconditionally to avoid React hooks rules violations
  const fallbackScrollYProgress = useMotionValue(0);
  const scrollData = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Use fallback during SSR/before mounting, real scroll data after mounting
  const scrollYProgress = isMounted ? scrollData.scrollYProgress : fallbackScrollYProgress;

  // Prevent hydration issues - only mount client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced scroll-based animations with stagger
  const headlineOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [0, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.05, 0.1], [50, 0]);

  const subheadlineOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25], [0, 1, 0]);
  const subheadlineY = useTransform(scrollYProgress, [0.15, 0.2], [50, 0]);

  const gridScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const gridRotateX = useTransform(scrollYProgress, [0.25, 0.5], [15, 0]);

  // Component renders immediately - hydration issues fixed with proper hook usage

  return (
    <section ref={targetRef} className='relative -mx-4 h-[300vh] w-screen'>
      <div className='sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background transition-colors duration-300'>
        <EnhancedParticleCanvas />

        {/* Headlines */}
        <motion.div className='absolute z-10 text-center' style={{ opacity: headlineOpacity, y: headlineY }}>
          <h2 className='katana-heading text-6xl font-black tracking-tight md:text-8xl'>The Data Weave.</h2>
        </motion.div>

        <motion.div
          className='absolute z-10 max-w-2xl text-center'
          style={{ opacity: subheadlineOpacity, y: subheadlineY }}
        >
          <h3 className='text-xl font-bold text-muted-foreground md:text-2xl'>
            Where TikTok Shop data threads are woven into a tapestry of command.
          </h3>
        </motion.div>

        {/* Enhanced 2.5D Bento Grid */}
        <motion.div
          style={{
            scale: gridScale,
            opacity: gridOpacity,
            rotateX: gridRotateX,
            transformStyle: 'preserve-3d',
          }}
          className='w-full max-w-5xl p-8'
        >
          <div style={{ perspective: '2000px' }} className='grid h-[500px] grid-cols-3 grid-rows-2 gap-6'>
            {kpiData.map((kpi, i) => (
              <Enhanced_KPI_Card key={kpi.title} scrollYProgress={scrollYProgress} i={i} {...kpi} />
            ))}
            <Enhanced_Revenue_Card scrollYProgress={scrollYProgress} onChartClick={() => setActiveChart('revenue')} />
            <Enhanced_Automation_Card scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>

        {/* Evil Chart Popper Overlay */}
        <AnimatePresence>
          {activeChart && <EvilChartPopper chartType={activeChart} onClose={() => setActiveChart(null)} />}
        </AnimatePresence>
      </div>

      {/* Enhanced katana heading effect */}
      <style jsx>{`
        .katana-heading {
          background: linear-gradient(
            90deg,
            hsl(var(--foreground)) 30%,
            hsl(var(--primary)) 50%,
            hsl(262 83% 58%) 70%,
            hsl(var(--foreground)) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 300% auto;
          animation: sheen 4s ease-in-out infinite;
        }

        @keyframes sheen {
          0%,
          100% {
            background-position: 200% center;
          }
          50% {
            background-position: -200% center;
          }
        }
      `}</style>
    </section>
  );
}

// Enhanced Bento Grid Cards with Advanced Motion Effects
const Enhanced_KPI_Card: React.FC<any> = ({ title, value, trend, Icon, color, i, scrollYProgress }: any) => {
  const z = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [0, 1]);
  const rotateY = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.5 + i * 0.03], [10, 0]);

  return (
    <motion.div
      style={{ translateZ: z, opacity, rotateY }}
      className='group relative row-span-1 overflow-hidden'
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className='relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card/20 p-6 backdrop-blur-md'
        whileHover={{
          borderColor: color,
          boxShadow: `0 0 20px ${color}20`,
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10'
          style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className='relative z-10'>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Icon className='h-6 w-6 text-muted-foreground' style={{ color }} />
          </motion.div>
          <p className='mt-2 text-muted-foreground'>{title}</p>
          <Badge variant={trend > 0 ? 'default' : 'secondary'} className='mt-2'>
            {trend > 0 ? <TrendingUp className='mr-1 h-3 w-3' /> : <TrendingDown className='mr-1 h-3 w-3' />}
            <span>{Math.abs(trend)}%</span>
          </Badge>
        </div>
        <motion.p
          className='relative z-10 text-4xl font-black text-foreground'
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
        >
          {value}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Enhanced_Revenue_Card: React.FC<any> = ({ scrollYProgress, onChartClick }: any) => {
  const [pathD, setPathD] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const chartContainerRef = useRef(null);

  const z = useTransform(scrollYProgress, [0.35, 0.45], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const pathLength = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

  // Spring animations for enhanced interactivity
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const borderGlow = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    scale.set(isHovered ? 1.02 : 1);
    borderGlow.set(isHovered ? 1 : 0);
  }, [isHovered, scale, borderGlow]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const observer = new MutationObserver(() => {
        const pathEl = (chartContainerRef.current as any)!.querySelector('.recharts-line-curve path');
        if (pathEl) {
          const d = pathEl.getAttribute('d');
          if (d) {
            setPathD(d);
            observer.disconnect();
          }
        }
      });
      observer.observe(chartContainerRef.current, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <motion.div
      style={{ translateZ: z, opacity, scale }}
      className='relative col-span-2 row-span-2 cursor-pointer overflow-hidden'
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onChartClick}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className='relative h-full rounded-2xl border border-border bg-card/20 p-6 backdrop-blur-md'
        style={{
          borderColor: useTransform(borderGlow, [0, 1], ['hsl(var(--border))', 'hsl(var(--primary))']),
          boxShadow: useTransform(borderGlow, [0, 1], ['none', '0 0 30px hsl(var(--primary) / 0.3)']),
        }}
      >
        {/* Pulse effect on hover */}
        <motion.div
          className='absolute inset-0 rounded-2xl bg-primary/5'
          animate={{ opacity: isHovered ? [0, 0.5, 0] : 0 }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />

        <div className='relative z-10'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='flex items-center gap-2 font-bold text-foreground'>
              Revenue Masterpiece
              <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
                <TrendingUp className='h-4 w-4 text-primary' />
              </motion.div>
            </h3>
            <Badge variant='default'>Click to expand</Badge>
          </div>

          <div className='mt-2 h-[90%] w-full' ref={chartContainerRef}>
            <ResponsiveContainer>
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -30, bottom: 5 }}>
                <Line type='monotone' dataKey='revenue' stroke='hsl(var(--primary))' strokeWidth={3} dot={false} />
                {pathD && (
                  <motion.path
                    d={pathD}
                    fill='transparent'
                    stroke='hsl(var(--primary))'
                    strokeWidth='3'
                    style={{
                      pathLength,
                      filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))',
                    }}
                    initial={{ pathLength: 0 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Enhanced_Automation_Card: React.FC<any> = ({ scrollYProgress }: any) => {
  const z = useTransform(scrollYProgress, [0.38, 0.48], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <motion.div
      style={{ translateZ: z, opacity }}
      className='group relative col-span-1 row-span-1 overflow-hidden'
      onHoverStart={() => setIsAnimating(true)}
      onHoverEnd={() => setIsAnimating(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className='relative h-full rounded-2xl border border-border bg-card/20 p-6 backdrop-blur-md'
        whileHover={{
          borderColor: 'hsl(262 83% 58%)',
          boxShadow: '0 0 20px hsl(262 83% 58% / 0.3)',
        }}
      >
        <motion.div
          className='absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent'
          animate={{ opacity: isAnimating ? [0, 0.3, 0] : 0 }}
          transition={{ duration: 2, repeat: isAnimating ? Infinity : 0 }}
        />

        <div className='relative z-10'>
          <motion.div
            animate={{
              rotate: isAnimating ? [0, 5, -5, 0] : 0,
              scale: isAnimating ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1, repeat: isAnimating ? Infinity : 0 }}
          >
            <Zap className='h-8 w-8 text-primary' />
          </motion.div>

          <p className='mt-4 text-xl font-bold text-foreground'>Automation Liberation</p>
          <p className='mt-2 flex items-center gap-2 text-muted-foreground'>
            <Clock className='h-4 w-4' />
            Saving an average of <span className='font-bold text-foreground'>12 hours</span> per week.
          </p>

          <motion.div
            className='mt-3 flex items-center gap-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Badge variant='secondary' className='text-xs'>
              <Users className='mr-1 h-3 w-3' />
              98% satisfaction
            </Badge>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Evil Chart Popper Component
const EvilChartPopper: React.FC<{ chartType: string; onClose: () => void }> = ({ chartType, onClose }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Spring animations for the popper
  const springX = useSpring(0, { damping: 30, stiffness: 100 });
  const springY = useSpring(0, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chartRef.current && !chartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
    >
      <motion.div
        ref={chartRef}
        initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className='max-h-[80vh] w-full max-w-4xl overflow-hidden'
      >
        <Card className='border-primary/30 shadow-2xl'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='flex items-center gap-2 text-2xl'>
                  <TrendingUp className='h-6 w-6 text-primary' />
                  TikTok Shop Analytics
                  <Badge variant='default' className='ml-2'>
                    Live Data
                  </Badge>
                </CardTitle>
                <CardDescription>Real-time CreatorFlow performance metrics and trends</CardDescription>
              </div>
              <button onClick={onClose} className='rounded-full p-2 transition-colors hover:bg-muted'>
                ✕
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Monthly Revenue</span>
                  <span className='text-2xl font-bold text-primary'>${springY.get().toFixed(0)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge variant='default'>
                    <TrendingUp className='mr-1 h-3 w-3' />
                    +24.5%
                  </Badge>
                  <span className='text-sm text-muted-foreground'>vs last month</span>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Order Volume</span>
                  <span className='text-2xl font-bold text-blue-500'>{Math.round(springY.get() / 50)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge variant='secondary'>
                    <ShoppingCart className='mr-1 h-3 w-3' />
                    Processing
                  </Badge>
                  <span className='text-sm text-muted-foreground'>automated fulfillment</span>
                </div>
              </div>
            </div>

            <ChartContainer config={chartConfig} className='h-80 w-full'>
              <AreaChart
                className='overflow-visible'
                accessibilityLayer
                data={evilChartData}
                onMouseMove={(state) => {
                  const x = state.activeCoordinate?.x;
                  const dataValue = state.activePayload?.[0]?.value;
                  if (x && dataValue !== undefined) {
                    springX.set(x);
                    springY.set(dataValue);
                  }
                }}
                onMouseLeave={() => {
                  springX.set(chartRef.current?.getBoundingClientRect().width || 0);
                  springY.jump(evilChartData[evilChartData.length - 1].revenue);
                }}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} strokeDasharray='3 3' className='opacity-30' />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className='text-muted-foreground'
                />
                <Area
                  dataKey='revenue'
                  type='monotone'
                  fill='url(#gradient-evil-chart)'
                  fillOpacity={0.6}
                  stroke='var(--color-revenue)'
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id='gradient-evil-chart' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='var(--color-revenue)' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='var(--color-revenue)' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Performance-Optimized Particle Canvas
const EnhancedParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const particleCount = Math.min(80, Math.floor(canvas.width / 15));

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: (Math.random() * canvas.width) / window.devicePixelRatio,
          y: (Math.random() * canvas.height) / window.devicePixelRatio,
          radius: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.8 + 0.2,
          hue: Math.random() * 360,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.hue += 0.5;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width / window.devicePixelRatio) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height / window.devicePixelRatio) {
          particle.vy *= -1;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width / window.devicePixelRatio, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height / window.devicePixelRatio, particle.y));

        // Draw particle with enhanced glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue % 360}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${particle.hue % 360}, 70%, 60%)`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections to nearby particles
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = `hsl(var(--primary))`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute left-0 top-0 z-0 h-full w-full opacity-60' />;
};
