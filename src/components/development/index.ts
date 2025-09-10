/**
 * Development Tools and Testing Utilities
 *
 * This module provides development and testing tools for the atomic design system.
 * These tools are available in development environment to aid component creation and testing.
 */

// Component development tools (will be uncommented as they are implemented)
// export { ComponentPlayground } from './ComponentPlayground';
// export { AtomicDesignBrowser } from './AtomicDesignBrowser';
// export { DesignTokenInspector } from './DesignTokenInspector';

// Testing utilities
// export { VisualRegressionTester } from './visual-regression';
// export { AccessibilityTester } from './accessibility-tester';
// export { PerformanceTester } from './performance-tester';

// Mock and fixture utilities
// export { MockRenderer } from './MockRenderer';
// export { ComponentFixtures } from './ComponentFixtures';
// export { TestDataGenerator } from './TestDataGenerator';

// Storybook utilities
// export { StorybookDecorators } from './storybook';
// export { StorybookControls } from './storybook';
// export { StorybookThemes } from './storybook';

// Development utility categories
export const DevelopmentCategories = {
  COMPONENT_TOOLS: 'component-tools',
  TESTING: 'testing',
  MOCKS: 'mocks',
  STORYBOOK: 'storybook',
  VISUAL_REGRESSION: 'visual-regression',
} as const;

export type DevelopmentCategory = (typeof DevelopmentCategories)[keyof typeof DevelopmentCategories];

// Environment detection for development-only exports
export const isDevelopment = process.env.NODE_ENV === 'development';

// Conditional exports based on environment
if (isDevelopment) {
  // Development-only exports will be added here
  console.log('Development tools loaded');
}

// Note: Individual development tool exports will be uncommented as they are implemented
