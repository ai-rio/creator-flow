/**
 * Magic UI Components
 *
 * Enhanced UI components with animations and effects
 * Based on Magic UI library with CreatorFlow integration
 */

// Animation components
export { default as AnimatedBeam } from './animated-beam';
export { default as BlurIn } from './blur-in';
export { default as NumberTicker } from './number-ticker';
export { default as Particles } from './particles';

// Export types
export type { AnimatedBeamProps } from './animated-beam';
export type { BlurInProps } from './blur-in';
export type { NumberTickerProps } from './number-ticker';
export type { ParticlesProps } from './particles';

// Import components for grouped exports
import AnimatedBeam from './animated-beam';
import BlurIn from './blur-in';
import NumberTicker from './number-ticker';
import Particles from './particles';

// Grouped exports for convenience
export const MagicUIComponents = {
  AnimatedBeam,
  BlurIn,
  NumberTicker,
  Particles,
};
