'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Droplets, Flame, Palette, Snowflake, Sparkles, Square, TreePine } from 'lucide-react';
import React from 'react';

import { GlassPane } from '@/components/atomic/atoms/GlassPane';
import { COLOR_PALETTES, ColorPaletteName } from '@/components/atomic/atoms/shader-backgrounds';

interface ColorPaletteSwitcherProps {
  currentPalette: ColorPaletteName;
  onPaletteChange: (palette: ColorPaletteName) => void;
  theme?: 'light' | 'dark';
  className?: string;
  compact?: boolean;
}

const paletteIcons: Record<ColorPaletteName, React.ComponentType<any>> = {
  'creatorflow-default': Palette,
  'ocean-depths': Droplets,
  'sunset-ember': Flame,
  'forest-mystique': TreePine,
  'arctic-aurora': Snowflake,
  'cosmic-nebula': Sparkles,
  'monochrome-steel': Square,
};

// Enhanced preview showing both primary and wireframe colors in layered composition
const PalettePreview: React.FC<{
  palette: ColorPaletteName;
  theme: 'light' | 'dark';
  isActive: boolean;
  compact?: boolean;
}> = ({ palette, theme, isActive, compact = false }) => {
  const paletteData = COLOR_PALETTES[palette];
  const primaryColors = paletteData.primaryColors[theme].slice(0, 3);
  const wireframeColors = paletteData.wireframeColors[theme].slice(0, 2);

  if (compact) {
    return (
      <div className='mb-1 flex gap-0.5'>
        {primaryColors.map((color, index) => (
          <motion.div
            key={index}
            className='h-2 w-2 rounded-full border border-white/20'
            style={{ backgroundColor: color }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='relative mb-3'>
      {/* Primary Color Layer */}
      <div className='mb-1 flex gap-1'>
        {primaryColors.map((color, index) => (
          <motion.div
            key={`primary-${index}`}
            className='h-4 w-4 rounded-lg border border-white/10 shadow-sm'
            style={{ backgroundColor: color }}
            animate={{
              scale: isActive ? 1.05 : 1,
              rotate: isActive ? [0, 2, -2, 0] : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              rotate: { duration: 0.6, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      {/* Wireframe Layer Preview */}
      <div className='flex gap-1 opacity-70'>
        {wireframeColors.map((color, index) => (
          <motion.div
            key={`wireframe-${index}`}
            className='h-1.5 w-3 rounded-sm border border-white/10'
            style={{ backgroundColor: color }}
            animate={{
              opacity: isActive ? 0.9 : 0.6,
              scaleX: isActive ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </div>

      {/* Layered indicator */}
      <div className='absolute -right-1 -top-1'>
        <div className='h-2 w-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-40' />
      </div>
    </div>
  );
};

const ColorPaletteSwitcher: React.FC<ColorPaletteSwitcherProps> = ({
  currentPalette,
  onPaletteChange,
  theme = 'dark',
  className = '',
  compact = false,
}) => {
  const paletteEntries = Object.entries(COLOR_PALETTES) as [
    ColorPaletteName,
    (typeof COLOR_PALETTES)[ColorPaletteName]
  ][];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative ${className}`}
      >
        <GlassPane variant='elevated' className='p-3'>
          <div className='mb-2 flex items-center gap-2'>
            <motion.div
              className='h-1.5 w-1.5 rounded-full bg-purple-400'
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className='text-xs font-medium text-foreground'>Palette</span>
          </div>

          <div className='grid grid-cols-2 gap-1.5'>
            {paletteEntries.map(([paletteName, paletteData]) => {
              const Icon = paletteIcons[paletteName];
              const isActive = currentPalette === paletteName;

              return (
                <motion.button
                  key={paletteName}
                  onClick={() => onPaletteChange(paletteName)}
                  className={`relative flex min-h-[44px] flex-col items-center justify-center rounded-lg border p-1.5 transition-all duration-200 ${
                    isActive
                      ? 'border-purple-400/50 bg-purple-500/20 text-purple-100'
                      : 'border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={paletteData.name}
                >
                  <PalettePreview palette={paletteName} theme={theme} isActive={isActive} compact={true} />
                  <Icon size={10} className='mx-auto mt-0.5' />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className='absolute -right-1 -top-1'
                      >
                        <Check size={10} className='rounded-full bg-black/50 p-0.5 text-purple-400' />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </GlassPane>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      }}
      className={`relative ${className}`}
    >
      <GlassPane variant='premium' blur='xl' className='p-6'>
        <div className='mb-5 flex items-center gap-3'>
          <motion.div
            className='h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <h3 className='text-base font-semibold text-foreground'>Color Palette System</h3>
          <div className='flex-1' />
          <motion.div
            className='rounded-full bg-muted/50 px-2 py-1 text-xs text-muted-foreground'
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            LayeredMeshFluid
          </motion.div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {paletteEntries.map(([paletteName, paletteData]) => {
            const Icon = paletteIcons[paletteName];
            const isActive = currentPalette === paletteName;

            return (
              <motion.div key={paletteName} layout className='relative'>
                <motion.button
                  onClick={() => onPaletteChange(paletteName)}
                  className={`group relative w-full overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                    isActive
                      ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-foreground shadow-lg shadow-purple-500/10'
                      : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-border/70 hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Background gradient overlay for active state */}
                  {isActive && (
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className='relative z-10 flex flex-col items-center gap-3'>
                    <PalettePreview palette={paletteName} theme={theme} isActive={isActive} />

                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                        scale: { type: 'spring', stiffness: 300, damping: 20 },
                      }}
                    >
                      <Icon size={24} className={isActive ? 'text-purple-300' : ''} />
                    </motion.div>

                    <div className='text-center'>
                      <div
                        className={`mb-1 text-sm font-semibold ${isActive ? 'text-foreground' : 'text-foreground/80'}`}
                      >
                        {paletteData.name}
                      </div>
                      <div
                        className={`text-xs leading-tight ${isActive ? 'text-foreground/70' : 'text-muted-foreground'}`}
                      >
                        {paletteData.description}
                      </div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <>
                        <motion.div
                          layoutId='active-palette-border'
                          className='absolute inset-0 rounded-xl border-2 border-purple-400/40'
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className='absolute right-3 top-3'
                        >
                          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg'>
                            <Check size={14} className='text-white' />
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced footer with real-time palette info */}
        <motion.div
          className='mt-6 border-t border-border/50 pt-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-medium text-foreground'>Active Palette:</span>
              <motion.div
                className='flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5'
                key={currentPalette}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className='h-1.5 w-1.5 rounded-full bg-purple-400'
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className='text-xs font-semibold text-foreground'>{COLOR_PALETTES[currentPalette].name}</span>
              </motion.div>
            </div>

            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <span>Real-time Color System</span>
              <motion.div
                className='h-1 w-1 rounded-full bg-green-400'
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </GlassPane>
    </motion.div>
  );
};

export default ColorPaletteSwitcher;
