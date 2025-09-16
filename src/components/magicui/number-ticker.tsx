'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

export interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  isCurrency?: boolean;
}

export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  isCurrency = false,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const updateCounter = () => {
      if (!ref.current) return;

      const counter = ref.current;
      const target = value;
      const increment = target / 200;
      let current = direction === 'down' ? target : 0;

      const timer = setInterval(() => {
        if (direction === 'down') {
          current -= increment;
          if (current <= 0) {
            current = 0;
            clearInterval(timer);
          }
        } else {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
        }

        const formattedValue = current.toFixed(decimalPlaces);
        counter.textContent = isCurrency && !formattedValue.startsWith('$') ? `$${formattedValue}` : formattedValue;
      }, 10);

      return () => clearInterval(timer);
    };

    const timeoutId = setTimeout(updateCounter, delay);
    return () => clearTimeout(timeoutId);
  }, [value, direction, delay, decimalPlaces, isCurrency]);

  const initialValue = direction === 'down' ? value : 0;
  const displayValue =
    isCurrency && !initialValue.toString().startsWith('$')
      ? `$${initialValue.toFixed(decimalPlaces)}`
      : initialValue.toFixed(decimalPlaces);

  return (
    <span ref={ref} className={cn('inline-block tabular-nums text-foreground transition-all duration-300', className)}>
      {displayValue}
    </span>
  );
}
