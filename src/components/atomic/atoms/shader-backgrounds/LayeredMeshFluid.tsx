'use client';

import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

import { ShaderWrapper } from './shader-wrapper';

interface LayeredMeshFluidProps {
  theme: 'light' | 'dark';
  speed: number;
  className?: string;
  colorPalette?: ColorPaletteName;
  opacity?: number;
}

// Color palette system for LayeredMeshFluid
export type ColorPaletteName =
  | 'creatorflow-default'
  | 'ocean-depths'
  | 'sunset-ember'
  | 'forest-mystique'
  | 'arctic-aurora'
  | 'cosmic-nebula'
  | 'monochrome-steel';

export interface ColorPalette {
  name: string;
  description: string;
  primaryColors: {
    dark: string[];
    light: string[];
  };
  wireframeColors: {
    dark: string[];
    light: string[];
  };
}

// Comprehensive color palette system designed to contrast with CreatorFlow's violet-based theme
export const COLOR_PALETTES: Record<ColorPaletteName, ColorPalette> = {
  'creatorflow-default': {
    name: 'CreatorFlow Default',
    description: 'Original CreatorFlow violet and black aesthetic',
    primaryColors: {
      dark: ['#000000', '#8B5CF6', '#A855F7', '#000000'],
      light: ['#0A0A0A', '#7C3AED', '#8B5CF6', '#1A1A1A'],
    },
    wireframeColors: {
      dark: ['#FFFFFF', '#C084FC', '#DDD6FE', '#8B5CF6'],
      light: ['#F8FAFC', '#A855F7', '#C084FC', '#7C3AED'],
    },
  },
  'ocean-depths': {
    name: 'Ocean Depths',
    description: 'Deep blues and teals for strong contrast against violet themes',
    primaryColors: {
      dark: ['#0F172A', '#0891B2', '#06B6D4', '#164E63'],
      light: ['#F0F9FF', '#0369A1', '#0284C7', '#075985'],
    },
    wireframeColors: {
      dark: ['#E0F7FA', '#4DD0E1', '#80DEEA', '#26C6DA'],
      light: ['#0F172A', '#155E75', '#0891B2', '#0E7490'],
    },
  },
  'sunset-ember': {
    name: 'Sunset Ember',
    description: 'Warm oranges and reds creating vibrant contrast with cool violets',
    primaryColors: {
      dark: ['#1C1917', '#EA580C', '#DC2626', '#92400E'],
      light: ['#FEF7ED', '#C2410C', '#DC2626', '#EA580C'],
    },
    wireframeColors: {
      dark: ['#FED7AA', '#FB923C', '#FDBA74', '#F97316'],
      light: ['#1C1917', '#9A3412', '#C2410C', '#EA580C'],
    },
  },
  'forest-mystique': {
    name: 'Forest Mystique',
    description: 'Deep greens and emeralds providing natural contrast to synthetic violets',
    primaryColors: {
      dark: ['#14532D', '#059669', '#10B981', '#166534'],
      light: ['#F0FDF4', '#047857', '#065F46', '#064E3B'],
    },
    wireframeColors: {
      dark: ['#DCFCE7', '#4ADE80', '#86EFAC', '#22C55E'],
      light: ['#14532D', '#166534', '#15803D', '#16A34A'],
    },
  },
  'arctic-aurora': {
    name: 'Arctic Aurora',
    description: 'Cool mint and ice blues with ethereal highlights',
    primaryColors: {
      dark: ['#0F172A', '#0891B2', '#06B6D4', '#164E63'],
      light: ['#F0FDFA', '#0D9488', '#14B8A6', '#0F766E'],
    },
    wireframeColors: {
      dark: ['#CCFBF1', '#5EEAD4', '#7DD3FC', '#22D3EE'],
      light: ['#134E4A', '#115E59', '#0F766E', '#0D9488'],
    },
  },
  'cosmic-nebula': {
    name: 'Cosmic Nebula',
    description: 'Deep space purples and magentas with celestial highlights',
    primaryColors: {
      dark: ['#1E1B4B', '#7C3AED', '#A855F7', '#4C1D95'],
      light: ['#FAF5FF', '#6D28D9', '#8B5CF6', '#7C3AED'],
    },
    wireframeColors: {
      dark: ['#E9D5FF', '#C084FC', '#DDD6FE', '#A78BFA'],
      light: ['#1E1B4B', '#4C1D95', '#6D28D9', '#7C3AED'],
    },
  },
  'monochrome-steel': {
    name: 'Monochrome Steel',
    description: 'Professional industrial grayscale with sophisticated depth and contrast',
    primaryColors: {
      dark: ['#303030', '#616161', '#797979', '#000000'],
      light: ['#F2F2F2', '#DADADA', '#C2C2C2', '#AAAAAA'],
    },
    wireframeColors: {
      dark: ['#919191', '#AAAAAA', '#C2C2C2', '#DADADA'],
      light: ['#181818', '#303030', '#494949', '#616161'],
    },
  },
};

// LayeredMeshFluid with color palette system
export const LayeredMeshFluid: React.FC<LayeredMeshFluidProps> = ({
  theme,
  speed,
  className = '',
  colorPalette = 'creatorflow-default',
  opacity = 60,
}) => {
  // Get selected palette and memoize colors for performance
  const palette = COLOR_PALETTES[colorPalette];
  const { primaryColors, wireframeColors } = useMemo(
    () => ({
      primaryColors: palette.primaryColors[theme],
      wireframeColors: palette.wireframeColors[theme],
    }),
    [palette, theme]
  );

  return (
    <ShaderWrapper theme={theme} className={className}>
      <div className={`relative h-full w-full overflow-hidden bg-black`}>
        {/* Primary Layer - CSS-based animated gradient */}
        <motion.div
          className='absolute inset-0'
          animate={{
            background: [
              `radial-gradient(circle at 20% 80%, ${primaryColors[0]} 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, ${primaryColors[1]} 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, ${primaryColors[2]} 0%, transparent 50%),
               linear-gradient(135deg, ${primaryColors[0]}, ${primaryColors[3] || primaryColors[1]})`,
              `radial-gradient(circle at 80% 20%, ${primaryColors[1]} 0%, transparent 50%),
               radial-gradient(circle at 20% 80%, ${primaryColors[2]} 0%, transparent 50%),
               radial-gradient(circle at 60% 60%, ${primaryColors[0]} 0%, transparent 50%),
               linear-gradient(225deg, ${primaryColors[1]}, ${primaryColors[3] || primaryColors[2]})`,
              `radial-gradient(circle at 40% 40%, ${primaryColors[2]} 0%, transparent 50%),
               radial-gradient(circle at 60% 60%, ${primaryColors[0]} 0%, transparent 50%),
               radial-gradient(circle at 20% 80%, ${primaryColors[1]} 0%, transparent 50%),
               linear-gradient(315deg, ${primaryColors[2]}, ${primaryColors[3] || primaryColors[0]})`,
            ],
          }}
          transition={{
            duration: 10 / speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Wireframe Overlay - CSS-based animated gradient */}
        <motion.div
          className='absolute inset-0'
          style={{
            opacity: opacity / 100,
            mixBlendMode: 'overlay',
          }}
          animate={{
            background: [
              `radial-gradient(circle at 60% 40%, ${wireframeColors[0]} 0%, transparent 40%),
               radial-gradient(circle at 40% 60%, ${wireframeColors[1]} 0%, transparent 40%)`,
              `radial-gradient(circle at 40% 60%, ${wireframeColors[1]} 0%, transparent 40%),
               radial-gradient(circle at 60% 40%, ${wireframeColors[0]} 0%, transparent 40%)`,
              `radial-gradient(circle at 80% 80%, ${wireframeColors[0]} 0%, transparent 40%),
               radial-gradient(circle at 20% 20%, ${wireframeColors[1]} 0%, transparent 40%)`,
            ],
          }}
          transition={{
            duration: 15 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </ShaderWrapper>
  );
};
