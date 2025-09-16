'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';

import { cn } from '@/utils/cn';

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = 'gray',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#ffaa40',
  gradientStopColor = '#9c40ff',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const updatePath = useCallback(() => {
    if (containerRef.current && fromRef.current && toRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlX = startX + curvature;
      const controlY = startY - curvature;

      const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
      setPathD(d);
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  useEffect(() => {
    updatePath();
    const resizeObserver = new ResizeObserver(() => updatePath());

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [updatePath]);

  return (
    <svg
      fill='none'
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns='http://www.w3.org/2000/svg'
      className={cn('pointer-events-none absolute left-0 top-0 transform-gpu', className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} fill='none' />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity='1'
        fill='none'
        strokeLinecap='round'
        strokeDasharray='0 9999'
        className='animate-pulse'
      >
        <animate
          attributeName='stroke-dasharray'
          values={reverse ? '0 9999;75 9999;0 9999' : '0 9999;75 9999;0 9999'}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount='indefinite'
        />
      </path>
      <defs>
        <linearGradient className={cn('transform-gpu')} id={id} x1='0%' x2='100%' y1='0%' y2='0%'>
          <stop stopColor={gradientStartColor} stopOpacity='0' />
          <stop stopColor={gradientStartColor} />
          <stop offset='32.5%' stopColor={gradientStopColor} />
          <stop offset='100%' stopColor={gradientStopColor} stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedBeam;
