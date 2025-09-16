'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils/cn';

export interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const BlurIn: React.FC<BlurInProps> = ({ children, className, variant, duration = 1 }) => {
  const defaultVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      transition={{ duration }}
      variants={combinedVariants}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
};

export default BlurIn;
