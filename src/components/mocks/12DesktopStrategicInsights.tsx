/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Eye, ShieldCheck, TrendingUp, Trophy } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Helper Components & Data ---

const insightsData = [
  {
    Icon: Trophy,
    text: 'Top Performing Creator: ',
    highlight: '@viral_creator (+$12k this week)',
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    Icon: ShieldCheck,
    text: 'Automation ROI: ',
    highlight: '$4,567 saved in labor costs',
    color: 'text-green-600 dark:text-green-400',
    isHeartbeat: true,
  },
  {
    Icon: TrendingUp,
    text: 'Growth Opportunity: ',
    highlight: 'Phone grips trending (+67% demand)',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    Icon: Eye,
    text: 'Market Intelligence: ',
    highlight: 'Competitors struggling with fulfillment',
    color: 'text-purple-600 dark:text-purple-400',
  },
];

const aiRecommendation = {
  Icon: Bot,
  text: 'AI Recommendation: ',
  highlight: 'Scale phone grip inventory by 200%',
  color: 'text-teal-600 dark:text-teal-400',
};

// --- Main Insights Component ---
export default function StrategicInsights(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Slightly adjusted stagger for the new motion
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, rotate: -5, scale: 0.9 }, // Start from an angle
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring' as any, stiffness: 260, damping: 25 }, // Retuned spring for an orbital feel
    },
  };

  return (
    <div className={theme}>
      <div className='flex min-h-screen items-center justify-center bg-gray-100 p-8 font-sans transition-colors duration-300 dark:bg-[#111827]'>
        <div className='w-full max-w-2xl'>
          <button
            onClick={toggleTheme}
            className='mb-4 rounded-full border border-gray-200 bg-white/60 p-2 text-gray-800 backdrop-blur-md transition-colors hover:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-gray-800'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <span className='text-2xl'>☀️</span> : <span className='text-2xl'>🌙</span>}
          </button>
          <motion.div
            className='rounded-2xl border border-gray-200 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
          >
            {/* This extra motion.div creates the continuous orbital float */}
            <motion.div
              animate={{ y: [-2, 2, -2], rotate: [-0.3, 0.3, -0.3] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className='flex items-center gap-4 border-b border-gray-200 p-6 dark:border-gray-800'>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Trophy className='h-8 w-8 text-amber-600 dark:text-amber-400' />
                </motion.div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white'>CEO Strategic Insights</h2>
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>Your automated competitive edge.</p>
                </div>
              </div>
              <motion.ul className='space-y-4 p-6' variants={containerVariants} initial='hidden' animate='visible'>
                {insightsData.map((insight, index) => {
                  const HeartbeatWrapper = ({ children }: any) =>
                    insight.isHeartbeat ? (
                      <motion.div
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} // Quicker pulse
                        className='rounded-lg'
                        style={{
                          boxShadow:
                            theme === 'dark'
                              ? '0 0 20px 0 rgba(52, 211, 153, 0.4)'
                              : '0 0 20px 0 rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        {children}
                      </motion.div>
                    ) : (
                      <>{children}</>
                    );

                  return (
                    <HeartbeatWrapper key={index}>
                      <motion.li className='flex items-start gap-4 rounded-lg p-3' variants={itemVariants}>
                        <insight.Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${insight.color}`} />
                        <p className='text-gray-700 dark:text-gray-300'>
                          {insight.text}
                          <span className='font-semibold text-gray-900 dark:text-white'>{insight.highlight}</span>
                        </p>
                      </motion.li>
                    </HeartbeatWrapper>
                  );
                })}
              </motion.ul>
              <motion.div
                className='overflow-hidden'
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Adjusted delay
              >
                <div className='border-t border-gray-200/50 bg-gray-200/20 p-6 dark:border-gray-800/50 dark:bg-gray-800/20'>
                  <motion.div
                    className='flex items-start gap-4'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }} // Adjusted delay
                  >
                    <aiRecommendation.Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${aiRecommendation.color}`} />
                    <p className='text-gray-800 dark:text-gray-200'>
                      <span className='font-bold'>{aiRecommendation.text}</span>
                      <span className='font-semibold text-teal-700 dark:text-teal-300'>
                        {aiRecommendation.highlight}
                      </span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
