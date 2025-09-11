'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { DollarSign, Repeat, ShoppingCart, Zap } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

// --- TypeScript Interfaces ---
interface KPICardProps {
  title: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  i: number;
  scrollYProgress: any;
}

interface ChartCardProps {
  scrollYProgress: any;
}

interface AutomationCardProps {
  scrollYProgress: any;
}

interface ParticleCanvasProps {
  className?: string;
}

// --- Mock Data ---
const kpiData = [
  { title: 'Total Revenue', value: '$128,430', Icon: DollarSign },
  { title: "Today's Orders", value: '3,152', Icon: ShoppingCart },
  { title: 'Repeat Customers', value: '28.9%', Icon: Repeat },
];

const revenueData = Array.from({ length: 20 }, (_, i) => ({
  name: `Day ${i + 1}`,
  revenue: 3000 + Math.random() * 4000 + Math.sin(i / 3) * 1500,
}));

// --- Main Component ---
export default function HPInteractiveShowcase(): React.JSX.Element {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [0, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.05, 0.1], [50, 0]);

  const subheadlineOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25], [0, 1, 0]);
  const subheadlineY = useTransform(scrollYProgress, [0.15, 0.2], [50, 0]);

  const gridScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const gridRotateX = useTransform(scrollYProgress, [0.25, 0.5], [15, 0]);

  return (
    <div className='bg-gradient-to-b from-background to-muted font-sans transition-colors duration-500'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .katana-heading-showcase {
          font-weight: 900;
          letter-spacing: -0.05em;
          background: linear-gradient(90deg, hsl(var(--foreground)) 50%, hsl(var(--primary)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: sheen-showcase 3s linear infinite;
        }

        @keyframes sheen-showcase {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <div ref={targetRef} className='h-showcase-scroll-height relative'>
        <div className='sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
          <ParticleCanvas />

          {/* Headlines */}
          <motion.div className='absolute z-10 text-center' style={{ opacity: headlineOpacity, y: headlineY }}>
            <h2 className='katana-heading-showcase text-showcase-headline md:text-showcase-headline-desktop'>
              The Data Weave.
            </h2>
          </motion.div>

          <motion.div
            className='max-w-showcase-subheadline absolute z-10 text-center'
            style={{ opacity: subheadlineOpacity, y: subheadlineY }}
          >
            <h3 className='text-showcase-subheadline md:text-showcase-subheadline-desktop font-bold text-muted-foreground'>
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
            className='max-w-showcase-grid p-showcase-grid-padding w-full'
          >
            <div
              style={{ perspective: '2000px' }}
              className='h-showcase-grid-height gap-showcase-grid-gap grid grid-cols-3 grid-rows-2'
            >
              {kpiData.map((kpi, i) => (
                <KPICard key={kpi.title} scrollYProgress={scrollYProgress} i={i} {...kpi} />
              ))}
              <RevenueCard scrollYProgress={scrollYProgress} />
              <AutomationCard scrollYProgress={scrollYProgress} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className='h-screen' />
    </div>
  );
}

// --- Bento Grid Cards ---
const KPICard: React.FC<KPICardProps> = ({ title, value, Icon, i, scrollYProgress }) => {
  const z = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.3 + i * 0.03, 0.4 + i * 0.03], [0, 1]);

  return (
    <motion.div
      style={{ translateZ: z, opacity }}
      className='rounded-showcase-card p-showcase-card-padding row-span-1 flex flex-col justify-between border border-border/20 bg-card/40 backdrop-blur-md'
    >
      <div>
        <Icon className='h-6 w-6 text-muted-foreground' />
        <p className='mt-2 text-muted-foreground'>{title}</p>
      </div>
      <p className='text-showcase-kpi-value text-foreground'>{value}</p>
    </motion.div>
  );
};

const RevenueCard: React.FC<ChartCardProps> = ({ scrollYProgress }) => {
  const [pathD, setPathD] = useState<string>('');
  const chartContainerRef = useRef(null);

  const z = useTransform(scrollYProgress, [0.35, 0.45], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const pathLength = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);

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
      style={{ translateZ: z, opacity }}
      className='rounded-showcase-card p-showcase-card-padding col-span-2 row-span-2 border border-border/20 bg-card/40 backdrop-blur-md'
    >
      <h3 className='font-bold text-foreground'>Revenue Masterpiece</h3>
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
                  filter: `drop-shadow(0 0 5px hsl(var(--primary)))`,
                }}
                initial={{ pathLength: 0 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const AutomationCard: React.FC<AutomationCardProps> = ({ scrollYProgress }) => {
  const z = useTransform(scrollYProgress, [0.38, 0.48], [1000, 0]);
  const opacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 1]);

  return (
    <motion.div
      style={{ translateZ: z, opacity }}
      className='rounded-showcase-card p-showcase-card-padding col-span-1 row-span-1 border border-border/20 bg-card/40 backdrop-blur-md'
    >
      <Zap className='h-8 w-8 text-purple-400' />
      <p className='mt-4 text-xl font-bold text-foreground'>Automation Liberation</p>
      <p className='mt-2 text-muted-foreground'>
        Saving an average of <span className='font-bold text-foreground'>12 hours</span> per week.
      </p>
    </motion.div>
  );
};

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
    }> = [];
    const particleCount = 100;

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 * window.devicePixelRatio,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = 'hsl(var(--primary) / 0.7)';
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
  }, []);

  return <canvas ref={canvasRef} className={`absolute left-0 top-0 z-0 h-full w-full ${className || ''}`} />;
};
