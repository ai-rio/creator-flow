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
  // Enhanced CreatorFlow features
  variant?: 'default' | 'tiktok' | 'revenue' | 'data' | 'viral';
  enablePulse?: boolean;
  enableParticles?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  enableCreatorFlowEffects?: boolean;
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
  // Enhanced CreatorFlow features
  variant = 'default',
  enablePulse = false,
  enableParticles = false,
  intensity = 'medium',
  enableCreatorFlowEffects = false,
}) => {
  const id = useId();
  const particleId = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // CreatorFlow variant configurations
  const variantConfigs = {
    default: {
      gradientStart: gradientStartColor,
      gradientStop: gradientStopColor,
      pathColor: pathColor,
      pathWidth: pathWidth,
    },
    tiktok: {
      gradientStart: '#ff0050',
      gradientStop: '#25f4ee',
      pathColor: '#ff0050',
      pathWidth: 3,
    },
    revenue: {
      gradientStart: '#22c55e',
      gradientStop: '#14b8a6',
      pathColor: '#22c55e',
      pathWidth: 4,
    },
    data: {
      gradientStart: '#3b82f6',
      gradientStop: '#8b5cf6',
      pathColor: '#3b82f6',
      pathWidth: 2,
    },
    viral: {
      gradientStart: '#ff0050',
      gradientStop: '#fbbf24',
      pathColor: '#ff0050',
      pathWidth: 5,
    },
  };

  const config = variantConfigs[variant];

  // Intensity-based settings
  const intensitySettings = {
    low: { particleCount: 2, animationSpeed: 0.5, opacity: 0.6 },
    medium: { particleCount: 4, animationSpeed: 1, opacity: 0.8 },
    high: { particleCount: 8, animationSpeed: 1.5, opacity: 1 },
  };

  const settings = intensitySettings[intensity];

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
      {/* Base path */}
      <path
        d={pathD}
        stroke={config.pathColor}
        strokeWidth={config.pathWidth}
        strokeOpacity={pathOpacity}
        fill='none'
      />

      {/* Main animated beam */}
      <path
        d={pathD}
        strokeWidth={config.pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity={settings.opacity}
        fill='none'
        strokeLinecap='round'
        strokeDasharray='0 9999'
        className={enablePulse ? 'animate-pulse' : ''}
      >
        <animate
          attributeName='stroke-dasharray'
          values={reverse ? '0 9999;75 9999;0 9999' : '0 9999;75 9999;0 9999'}
          dur={`${duration / settings.animationSpeed}s`}
          begin={`${delay}s`}
          repeatCount='indefinite'
        />
      </path>

      {/* Enhanced pulse effect for CreatorFlow */}
      {enableCreatorFlowEffects && enablePulse && (
        <path
          d={pathD}
          strokeWidth={config.pathWidth + 2}
          stroke={config.gradientStart}
          strokeOpacity='0.3'
          fill='none'
          strokeLinecap='round'
        >
          <animate
            attributeName='stroke-opacity'
            values='0.1;0.5;0.1'
            dur={`${duration * 0.7}s`}
            begin={`${delay}s`}
            repeatCount='indefinite'
          />
        </path>
      )}

      {/* Particle effects */}
      {enableParticles &&
        Array.from({ length: settings.particleCount }).map((_, i) => (
          <circle
            key={i}
            r={variant === 'viral' ? '4' : '2'}
            fill={config.gradientStart}
            opacity={settings.opacity * 0.8}
          >
            <animateMotion
              dur={`${(duration + i) / settings.animationSpeed}s`}
              begin={`${delay + i * 0.5}s`}
              repeatCount='indefinite'
              path={pathD}
            />
            <animate
              attributeName='opacity'
              values={`0;${settings.opacity * 0.8};0`}
              dur={`${duration / settings.animationSpeed}s`}
              begin={`${delay + i * 0.5}s`}
              repeatCount='indefinite'
            />
          </circle>
        ))}

      {/* Gradient definitions */}
      <defs>
        <linearGradient className={cn('transform-gpu')} id={id} x1='0%' x2='100%' y1='0%' y2='0%'>
          <stop stopColor={config.gradientStart} stopOpacity='0' />
          <stop stopColor={config.gradientStart} />
          <stop offset='32.5%' stopColor={config.gradientStop} />
          <stop offset='100%' stopColor={config.gradientStop} stopOpacity='0' />
        </linearGradient>

        {/* Enhanced glow gradient for CreatorFlow */}
        {enableCreatorFlowEffects && (
          <filter id={`glow-${id}`}>
            <feGaussianBlur stdDeviation='3' result='coloredBlur' />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        )}
      </defs>
    </svg>
  );
};

export default AnimatedBeam;
