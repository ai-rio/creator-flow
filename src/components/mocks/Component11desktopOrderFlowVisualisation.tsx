/* eslint-disable */
import { motion } from 'framer-motion';
import { Bot, Inbox, Package, PackageCheck } from 'lucide-react';
import React, { useState } from 'react';

// --- Helper Components & Data ---

const flowStages = [
  { name: 'RECEIVED', value: 47, Icon: Inbox, color: 'text-blue-500 dark:text-blue-400' },
  { name: 'PROCESS', value: 127, Icon: Bot, color: 'text-teal-500 dark:text-teal-400', automated: true },
  { name: 'SHIPPED', value: 89, Icon: Package, color: 'text-purple-500 dark:text-purple-400' },
  { name: 'DELIVERED', value: 156, Icon: PackageCheck, color: 'text-green-500 dark:text-green-400' },
];

const StressBar = ({ percentage }: { percentage: any }) => {
  return (
    <div className='h-2.5 w-full overflow-hidden rounded-full bg-gray-200/50 dark:bg-gray-800/50'>
      <motion.div
        className='h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-purple-500'
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

// --- Main Visualization Component ---
export default function OrderFlowVisualization(): React.JSX.Element {
  const [theme, setTheme] = useState<any>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme: any) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={theme}>
      <div className='flex min-h-screen items-center justify-center bg-gray-100 p-8 font-sans transition-colors duration-300 dark:bg-[#111827]'>
        <div className='w-full max-w-4xl'>
          <button
            onClick={toggleTheme}
            className='mb-4 rounded-full border border-gray-200 bg-white/60 p-2 text-gray-800 backdrop-blur-md transition-colors hover:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-gray-800'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <span className='text-2xl'>☀️</span> : <span className='text-2xl'>🌙</span>}
          </button>
          <motion.div
            className='rounded-2xl border border-gray-200 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.h2 variants={itemVariants} className='mb-2 text-xl font-bold text-gray-900 dark:text-white'>
              Order Flow Visualization
            </motion.h2>
            <motion.p variants={itemVariants} className='mb-8 text-sm text-gray-500 dark:text-gray-400'>
              Your entire operation, automated and clarified.
            </motion.p>

            {/* Flow Stages */}
            <div className='relative mb-4 flex items-center justify-between'>
              {/* The animated flow line */}
              <div className='absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 dark:bg-gray-800'>
                <motion.div
                  className='h-full bg-gradient-to-r from-blue-500 via-purple-500 via-teal-500 to-green-500'
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'circOut', delay: 0.5 }}
                >
                  <motion.div
                    className='h-2 w-2 animate-pulse rounded-full bg-white'
                    style={{
                      boxShadow: '0 0 10px 2px #fff',
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </motion.div>
              </div>

              {flowStages.map((stage, index) => (
                <motion.div key={stage.name} variants={itemVariants} className='z-10 text-center'>
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900`}
                  >
                    <stage.Icon size={32} className={stage.color} />
                  </div>
                  <p className='mt-3 font-semibold text-gray-800 dark:text-gray-200'>{stage.name}</p>
                  <p className='font-mono text-2xl font-bold text-gray-900 dark:text-white'>{stage.value}</p>
                  {stage.automated && <p className='text-xs text-teal-500 dark:text-teal-400'>(automated)</p>}
                </motion.div>
              ))}
            </div>

            {/* Value Metrics */}
            <div className='mt-12 space-y-6 border-t border-gray-200 pt-8 dark:border-gray-800'>
              <motion.div variants={itemVariants}>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>🎭 Stress Eliminated</h3>
                  <p className='font-mono text-xl font-bold text-teal-500 dark:text-teal-300'>89%</p>
                </div>
                <StressBar percentage={89} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>⏱️ Time Liberation</h3>
                <p className='mt-1 text-gray-600 dark:text-gray-300'>
                  Average <span className='font-mono line-through'>15min</span> →{' '}
                  <span className='font-mono text-2xl font-bold text-purple-500 dark:text-purple-400'>2min</span> per
                  order
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
