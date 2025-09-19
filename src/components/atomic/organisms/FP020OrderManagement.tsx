'use client';

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { ChevronRight, Database, Link, Sliders, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { createElement, useCallback, useEffect, useRef, useState } from 'react';

// TypeScript Interfaces
interface OrderData {
  id: string;
  value: string;
  status: 'FLAGGED' | 'PROCESSED' | 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  timestamp: Date;
  isNew?: boolean;
}

interface FeaturePillar {
  id: 'validation' | 'workflow' | 'sync' | 'integration';
  Icon: React.ComponentType<{ className?: string }>;
  gridArea: string;
}

interface ThemeConfig {
  background: string;
  textPrimary: string;
  textSecondary: string;
  glassBg: string;
  border: string;
  sparkColor: string;
  blueprintLine: string;
}

interface FP020OrderManagementProps {
  className?: string;
  initialOrderCount?: number;
  theme?: 'light' | 'dark';
}

// Configuration & Data
const featurePillars: FeaturePillar[] = [
  { id: 'validation', Icon: Database, gridArea: '1 / 1 / 3 / 3' },
  { id: 'workflow', Icon: Sliders, gridArea: '3 / 1 / 5 / 3' },
  { id: 'sync', Icon: Zap, gridArea: '1 / 7 / 3 / 9' },
  { id: 'integration', Icon: Link, gridArea: '3 / 7 / 5 / 9' },
];

// System design token integration
const systemTheme: ThemeConfig = {
  background: 'hsl(var(--background))',
  textPrimary: 'text-foreground',
  textSecondary: 'text-muted-foreground',
  glassBg: 'bg-background/80 backdrop-blur-sm',
  border: 'border-border',
  sparkColor: 'hsl(var(--primary))',
  blueprintLine: 'hsl(var(--primary) / 0.3)',
};

// Generate mock orders with deterministic data for SSR
const generateMockOrders = (count: number = 20): OrderData[] => {
  const statuses: OrderData['status'][] = ['FLAGGED', 'PROCESSED', 'RECEIVED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const baseValues = [63.71, 124.5, 89.23, 156.78, 91.45, 203.12, 75.89, 142.34, 68.9, 187.56];

  return Array.from({ length: count }, (_, i) => ({
    id: `CF-78${365 + i}`,
    value: `$${baseValues[i % baseValues.length]}`,
    status: i % 5 === 0 ? 'FLAGGED' : statuses[i % statuses.length],
    timestamp: new Date(Date.now() - i * 3600000), // 1 hour intervals
    isNew: i < 3, // Mark first 3 as new for demo
  }));
};

// Advanced motion variants with viral-ready interactions
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    rotateX: 5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const pillarHoverVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: 'none',
    rotateY: 0,
    z: 0,
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    z: 50,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

const orderItemVariants: Variants = {
  inactive: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    scale: 1,
    transition: { duration: 0.3 },
  },
  workflow: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    scale: 1.02,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 300,
    },
  },
  integration: {
    boxShadow: '0 0 15px rgba(45, 212, 191, 0.4), 0 0 30px rgba(45, 212, 191, 0.2)',
    scale: 1.03,
    transition: { duration: 0.3 },
  },
  validation: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    scale: 1.01,
    transition: { duration: 0.2 },
  },
};

const statusPulseVariants: Variants = {
  idle: { opacity: 1 },
  syncing: {
    opacity: [1, 0.4, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Main Component
export default function FP020OrderManagement({
  className = '',
  initialOrderCount = 25,
  theme = 'dark',
}: FP020OrderManagementProps) {
  const t = useTranslations('components.atomic.organisms.FPOrderManagement');
  const tOrders = useTranslations('orders');

  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderData[]>(() => generateMockOrders(initialOrderCount));
  const [metrics, setMetrics] = useState({
    processed: 0,
    flagged: 0,
    totalValue: 0,
  });

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: '-100px' });

  const currentTheme = systemTheme;

  // Simulate real-time order updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) => {
        const updated = [...prev];
        // Randomly update a few order statuses
        for (let i = 0; i < 2; i++) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          const statuses: OrderData['status'][] = ['PROCESSING', 'SHIPPED', 'DELIVERED'];
          updated[randomIndex] = {
            ...updated[randomIndex],
            status: statuses[Math.floor(Math.random() * statuses.length)],
          };
        }
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate metrics for viral effect
  useEffect(() => {
    const processed = orders.filter((o) => o.status === 'PROCESSED').length;
    const flagged = orders.filter((o) => o.status === 'FLAGGED').length;
    const totalValue = orders.reduce((sum, o) => sum + parseFloat(o.value.replace('$', '')), 0);

    setMetrics({ processed, flagged, totalValue });
  }, [orders]);

  const handlePillarInteraction = useCallback((pillarId: string | null) => {
    setActivePillar(pillarId);
  }, []);

  return createElement(
    'div',
    {
      className: `flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-8 bg-background ${
        className || ''
      }`,
      ref: heroRef,
    },
    // Floating metrics overlay
    createElement(FloatingMetrics, {
      metrics,
      theme: currentTheme,
      isVisible: isInView,
    }),

    // Hero Section with enhanced animations
    createElement(
      'div',
      { className: 'text-center max-w-6xl mb-8' },
      createElement(
        motion.h2,
        {
          className: `text-4xl font-black md:text-6xl lg:text-7xl ${currentTheme.textPrimary} mb-6 bg-gradient-to-r from-brand-teal-400 to-brand-purple-400 bg-clip-text text-transparent`,
          variants: heroTextVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
        },
        t('title')
      ),
      createElement(
        motion.p,
        {
          className: `mx-auto max-w-4xl text-lg md:text-xl ${currentTheme.textSecondary} leading-relaxed`,
          variants: heroTextVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
          transition: { delay: 0.2 },
        },
        t('subtitle')
      )
    ),

    // Interactive Command Grid with enhanced 3D effects
    createElement(
      'div',
      {
        className: 'relative mt-16 h-[600px] w-full max-w-7xl',
        style: { perspective: '2000px' },
        onMouseLeave: () => handlePillarInteraction(null),
      },
      createElement(
        motion.div,
        {
          className: 'grid h-full w-full grid-cols-8 grid-rows-4 gap-6',
          variants: containerVariants,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
        },
        // Live Order Stream (Center) with enhanced scroll
        createElement(LiveOrderStream, {
          orders,
          activePillar,
          theme: currentTheme,
          t: tOrders,
        }),

        // Enhanced Feature Pillars with viral interactions
        ...featurePillars.map((pillar) =>
          createElement(FeaturePillar, {
            key: pillar.id,
            pillar,
            activePillar,
            onPillarHover: handlePillarInteraction,
            theme: currentTheme,
            t,
          })
        ),

        // Enhanced Blueprint Connection System
        createElement(BlueprintSparks, {
          activePillar,
          theme: currentTheme,
        })
      )
    )
  );
}

// Floating Metrics Component with viral-ready animations
function FloatingMetrics({
  metrics,
  theme,
  isVisible,
}: {
  metrics: { processed: number; flagged: number; totalValue: number };
  theme: ThemeConfig;
  isVisible: boolean;
}) {
  return createElement(
    motion.div,
    {
      className: `fixed top-20 right-6 z-50 space-y-3 ${theme.glassBg} ${theme.border} border backdrop-blur-xl rounded-2xl p-4`,
      initial: { x: 100, opacity: 0 },
      animate: isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 },
      transition: { delay: 1, duration: 0.5 },
    },
    createElement(MetricItem, {
      label: 'Processed',
      value: metrics.processed,
      icon: TrendingUp,
      color: 'text-success-green-400',
      theme,
    }),
    createElement(MetricItem, {
      label: 'Revenue',
      value: `$${(metrics.totalValue / 1000).toFixed(0)}k`,
      icon: Sparkles,
      color: 'text-brand-teal-400',
      theme,
    })
  );
}

function MetricItem({
  label,
  value,
  icon: Icon,
  color,
  theme,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  theme: ThemeConfig;
}) {
  return createElement(
    motion.div,
    {
      className: 'flex items-center gap-3',
      whileHover: { scale: 1.05 },
      transition: { type: 'spring', stiffness: 400 },
    },
    createElement(Icon, { className: `h-4 w-4 ${color}` }),
    createElement(
      'div',
      { className: 'flex-1' },
      createElement('div', { className: `text-xs ${theme.textSecondary}` }, label),
      createElement('div', { className: `text-sm font-bold ${theme.textPrimary}` }, value)
    )
  );
}

// Enhanced Live Order Stream with viral scroll effects
function LiveOrderStream({
  orders,
  activePillar,
  theme,
  t,
}: {
  orders: OrderData[];
  activePillar: string | null;
  theme: ThemeConfig;
  t: any;
}) {
  const streamRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const scrollVelocity = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;

    let scrollAmount = 0;
    const animateScroll = () => {
      const maxScroll = stream.scrollHeight - stream.clientHeight;
      if (maxScroll <= 0) return;

      // Variable scroll speed based on active pillar
      const baseSpeed = activePillar ? 1.2 : 0.8;
      scrollAmount += baseSpeed;

      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }

      stream.scrollTop = scrollAmount;
      scrollProgress.set(scrollAmount / maxScroll);
      requestAnimationFrame(animateScroll);
    };

    const animationId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationId);
  }, [scrollProgress, activePillar]);

  return createElement(
    motion.div,
    {
      className: `order-stream relative col-span-full row-span-full h-full w-full overflow-y-scroll rounded-2xl border p-6 backdrop-blur-md md:col-span-4 md:col-start-3 md:row-span-4 ${theme.glassBg} ${theme.border}`,
      ref: streamRef,
      style: {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      },
      whileHover: { scale: 1.01 },
      transition: { type: 'spring', stiffness: 300 },
    },
    // Enhanced Header with glow effect
    createElement(
      motion.div,
      {
        className: 'flex justify-between text-sm font-bold mb-6 sticky top-0 bg-inherit z-10 py-2',
        animate: activePillar
          ? {
              textShadow: `0 0 10px ${theme.sparkColor}60`,
            }
          : {},
      },
      createElement('span', { className: theme.textSecondary }, t('orderStream.headers.orderId')),
      createElement('span', { className: theme.textSecondary }, t('orderStream.headers.value')),
      createElement('span', { className: theme.textSecondary }, t('orderStream.headers.status'))
    ),

    // Enhanced Order Items with stagger animation
    createElement(
      motion.div,
      {
        className: 'space-y-3',
        variants: {
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        },
      },
      ...orders.map((order, index) =>
        createElement(OrderItem, {
          key: order.id,
          order,
          activePillar,
          theme,
          t,
          index,
        })
      )
    )
  );
}

// Enhanced Individual Order Item with viral interactions
function OrderItem({
  order,
  activePillar,
  theme,
  t,
  index,
}: {
  order: OrderData;
  activePillar: string | null;
  theme: ThemeConfig;
  t: any;
  index: number;
}) {
  const getStatusTranslation = (status: string) => {
    const statusMap: Record<string, string> = {
      FLAGGED: t('status.flagged') || 'FLAGGED',
      PROCESSED: t('status.processed') || 'PROCESSED',
      RECEIVED: t('status.received') || 'RECEIVED',
      PROCESSING: t('status.processing') || 'PROCESSING',
      SHIPPED: t('status.shipped') || 'SHIPPED',
      DELIVERED: t('status.delivered') || 'DELIVERED',
    };
    return statusMap[status] || status;
  };

  const getAnimationVariant = (): string => {
    if (!activePillar) return 'inactive';

    switch (activePillar) {
      case 'workflow':
        return 'workflow';
      case 'integration':
        return 'integration';
      case 'validation':
        return order.status === 'FLAGGED' ? 'validation' : 'inactive';
      default:
        return 'inactive';
    }
  };

  const orderMotionProps = order.isNew
    ? {
        initial: { x: 100, opacity: 0, scale: 0.8, rotateZ: 5 },
        animate: { x: 0, opacity: 1, scale: 1, rotateZ: 0 },
        transition: {
          delay: index * 0.1,
          type: 'spring' as const,
          stiffness: 500,
          damping: 30,
          mass: 0.8,
        },
      }
    : {};

  return createElement(
    motion.div,
    {
      className: 'flex justify-between rounded-lg p-3 transition-all duration-300 hover:bg-white/5 cursor-pointer',
      variants: orderItemVariants,
      animate: getAnimationVariant(),
      whileHover: { scale: 1.02, x: 5 },
      whileTap: { scale: 0.98 },
      layout: true,
      ...orderMotionProps,
    },
    // Order ID with hover effect
    createElement(
      motion.span,
      {
        className: `font-mono text-sm ${theme.textPrimary} flex-1`,
        whileHover: { color: theme.sparkColor },
      },
      order.id
    ),

    // Order Value with counter animation
    createElement(
      motion.span,
      {
        className: `font-mono text-sm ${theme.textPrimary} flex-1 text-center`,
        whileHover: { scale: 1.1 },
      },
      order.value
    ),

    // Enhanced Status with multiple indicators
    createElement(
      'div',
      { className: 'flex items-center gap-2 flex-1 justify-end' },
      // Validation indicator for flagged orders
      activePillar === 'validation' &&
        order.status === 'FLAGGED' &&
        createElement(motion.span, {
          className: 'h-2 w-2 rounded-full bg-error-red-500',
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0, opacity: 0 },
          transition: { type: 'spring', stiffness: 500 },
        }),

      // New order indicator
      order.isNew &&
        createElement(motion.span, {
          className: 'h-1.5 w-1.5 rounded-full bg-brand-teal-400',
          animate: { opacity: [1, 0.3, 1] },
          transition: { duration: 2, repeat: Infinity },
        }),

      // Status text with enhanced animations
      createElement(
        motion.span,
        {
          className: `text-sm font-bold ${order.status === 'FLAGGED' ? 'text-error-red-500' : theme.textSecondary}`,
          variants: statusPulseVariants,
          animate: activePillar === 'sync' ? 'syncing' : 'idle',
        },
        getStatusTranslation(order.status)
      ),

      // Enhanced status arrow with flow animation
      createElement(
        motion.div,
        {
          animate: activePillar === 'workflow' ? { x: [0, 8, 0], opacity: [0.5, 1, 0.5] } : { x: 0, opacity: 0.5 },
          transition: { duration: 2, repeat: Infinity },
        },
        createElement(ChevronRight, {
          className: `h-4 w-4 ${theme.textSecondary}`,
        })
      )
    )
  );
}

// Enhanced Feature Pillar with viral-ready 3D effects
function FeaturePillar({
  pillar,
  activePillar,
  onPillarHover,
  theme,
  t,
}: {
  pillar: FeaturePillar;
  activePillar: string | null;
  onPillarHover: (id: string | null) => void;
  theme: ThemeConfig;
  t: any;
}) {
  const isActive = activePillar === pillar.id;

  return createElement(
    motion.div,
    {
      style: { gridArea: pillar.gridArea },
      className: `hidden flex-col justify-between rounded-2xl border p-6 backdrop-blur-md md:flex cursor-pointer ${theme.glassBg} ${theme.border}`,
      variants: pillarHoverVariants,
      initial: 'idle',
      animate: 'idle',
      whileHover: 'hover',
      onMouseEnter: () => onPillarHover(pillar.id),
      whileTap: { scale: 0.95, rotateY: -5 },
    },

    // Icon and Title with enhanced interactions
    createElement(
      'div',
      { className: 'flex items-center gap-3' },
      createElement(
        motion.div,
        {
          animate: isActive ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 },
          transition: { duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 2 },
        },
        createElement(pillar.Icon, {
          className: `h-6 w-6 ${theme.textPrimary}`,
        })
      ),
      createElement(
        motion.h3,
        {
          className: `text-lg font-bold ${theme.textPrimary}`,
          animate: isActive
            ? {
                textShadow: `0 0 20px ${theme.sparkColor}80`,
              }
            : {},
        },
        t(`pillars.${pillar.id}`)
      )
    ),

    // Enhanced Status Indicator with glow
    createElement(
      'div',
      { className: 'text-right' },
      createElement(
        motion.span,
        {
          className: `text-sm font-bold`,
          animate: isActive
            ? {
                color: theme.sparkColor,
                opacity: [0.5, 1, 0.5],
                textShadow: `0 0 15px ${theme.sparkColor}60`,
              }
            : { color: theme.textSecondary, opacity: 1 },
          transition: { duration: 2, repeat: Infinity },
        },
        t('orderStream.status.active')
      )
    )
  );
}

// Enhanced Blueprint Connection System with particle effects
function BlueprintSparks({ activePillar, theme }: { activePillar: string | null; theme: ThemeConfig }) {
  const pillarCoords: Record<string, { x1: string; y1: string; x2: string; y2: string }> = {
    validation: { x1: '20%', y1: '25%', x2: '37.5%', y2: '25%' },
    workflow: { x1: '20%', y1: '75%', x2: '37.5%', y2: '75%' },
    sync: { x1: '80%', y1: '25%', x2: '62.5%', y2: '25%' },
    integration: { x1: '80%', y1: '75%', x2: '62.5%', y2: '75%' },
  };

  const coords = activePillar ? pillarCoords[activePillar] : null;

  return createElement(
    'svg',
    {
      className: 'pointer-events-none absolute inset-0 hidden h-full w-full md:block',
      style: { zIndex: 1 },
    },
    createElement(
      AnimatePresence,
      null,
      coords &&
        createElement(
          motion.g,
          { key: activePillar },
          // Main connection line
          createElement(motion.line, {
            x1: coords.x1,
            y1: coords.y1,
            x2: coords.x2,
            y2: coords.y2,
            stroke: theme.sparkColor,
            strokeWidth: '3',
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 },
            exit: { pathLength: 0, opacity: 0 },
            transition: {
              pathLength: { duration: 0.6, ease: 'easeInOut' },
              opacity: { duration: 0.3 },
            },
            style: {
              filter: `drop-shadow(0 0 12px ${theme.sparkColor})`,
              strokeLinecap: 'round',
            },
          }),
          // Animated particles along the line
          ...Array.from({ length: 3 }, (_, i) =>
            createElement(motion.circle, {
              key: i,
              r: '2',
              fill: theme.sparkColor,
              initial: { opacity: 0 },
              animate: {
                cx: [coords.x1, coords.x2],
                cy: [coords.y1, coords.y2],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              },
              transition: {
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2,
              },
              style: {
                filter: `drop-shadow(0 0 8px ${theme.sparkColor})`,
              },
            })
          )
        )
    )
  );
}
