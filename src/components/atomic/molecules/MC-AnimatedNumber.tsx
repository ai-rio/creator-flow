'use client';

import { animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// ==================== TYPE DEFINITIONS ====================

interface AnimatedNumberProps {
  value: number;
  isCurrency?: boolean;
  duration?: number;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Animated number component with smooth count-up animation
 * Supports currency formatting and customizable duration
 */
export function AnimatedNumber({ value, isCurrency = false, duration = 1.5, className = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const animation = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => animation.stop();
  }, [value, duration]);

  return (
    <span className={className}>
      {isCurrency && '$'}
      {displayValue.toLocaleString()}
    </span>
  );
}

export default AnimatedNumber;
