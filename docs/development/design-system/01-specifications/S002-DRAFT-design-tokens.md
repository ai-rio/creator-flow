# S002-DRAFT: CreatorFlow Design System & Design Tokens

**Document Type**: Specification  
**Initiative**: Design System  
**Status**: DRAFT  
**Created**: 2025-09-09  
**Last Updated**: 2025-09-10

## Executive Summary

This design system specification is **extracted from CreatorFlow's working mock components** rather than theoretical design principles. By analyzing **100+ implemented components** including dashboard, blog-page, and blog-post components, we've identified the complete design language that creates the premium, CEO-level interface experience that makes creators feel empowered.

**Comprehensive Analysis Includes:**

- **Dashboard Components**: DC-, BI-, OM-, AM-, HP- series (Executive interfaces)
- **Blog Page Components**: Public-facing content presentation
- **Blog Post Components**: Long-form content and reading optimization

This specification serves as the **single source of truth** for both operational dashboards and premium content experiences.

### 🎯 Design System Goals

**1. Authenticity**: Design tokens that match the implemented components  
**2. Consistency**: Systematize the working design patterns  
**3. Premium Quality**: Preserve the sophisticated visual language  
**4. Developer Experience**: Clear implementation guidelines from real examples  
**5. Scalability**: Systematic approach to extending the design language

---

## 1. Real Color System

### 1.1 Primary Brand Palette

#### **Signature Teal-Purple Gradient System**

```css
/* Primary Brand Colors (Extracted from working components) */
:root {
  /* Teal Primary - The signature CreatorFlow brand color */
  --brand-teal-400: #2dd4bf; /* Most common light teal */
  --brand-teal-500: #14b8a6; /* Medium teal */
  --brand-teal-600: #0d9488; /* Primary brand teal */
  --brand-teal-primary: #0d9488; /* rgb(13, 148, 136) - Most used */
  --brand-teal-light: #2dd4bf; /* rgb(45, 212, 191) */

  /* Purple Accent - Complementary brand color */
  --brand-purple-400: #a78bfa; /* rgb(167, 139, 250) */
  --brand-purple-500: #8b5cf6; /* Medium purple */
  --brand-purple-600: #7c3aed; /* Primary purple */

  /* Blue Supporting - UI interactions */
  --brand-blue-400: #60a5fa; /* Light blue */
  --brand-blue-500: #3b82f6; /* Medium blue */
  --brand-blue-600: #2563eb; /* Primary blue */
}
```

#### **Brand Gradient Combinations**

```css
/* Linear Gradients (From working chart components) */
:root {
  --gradient-brand-primary: linear-gradient(90deg, #0d9488 0%, #8b5cf6 100%);
  --gradient-teal-purple: linear-gradient(90deg, #6ee7b7 5%, #a78bfa 95%);
  --gradient-blue-teal: linear-gradient(90deg, #3b82f6 0%, #14b8a6 100%);
  --gradient-multi-brand: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 33%, #14b8a6 66%, #22c55e 100%);
}
```

### 1.2 Blog & Content Colors

#### **Dual-Theme Content System**

```css
/* Blog Brand Colors (From blog components analysis) */
:root {
  /* Dark Theme Blog Colors */
  --blog-dark-accent: #2dd4bf; /* teal-400 - Primary blog accent */
  --blog-dark-category: #2dd4bf; /* teal-400 - Category labels */
  --blog-dark-title: #f1f5f9; /* slate-100 - Main titles */
  --blog-dark-content: #cbd5e1; /* slate-300 - Body text */
  --blog-dark-meta: #64748b; /* slate-500 - Meta text */
  --blog-dark-divider: rgba(241, 245, 249, 0.1); /* Content dividers */

  /* Light Theme Blog Colors */
  --blog-light-accent: #7c3aed; /* purple-600 - Primary accent */
  --blog-light-category: #7c3aed; /* purple-600 - Category labels */
  --blog-light-title: #1e293b; /* slate-800 - Main titles */
  --blog-light-content: #374151; /* slate-700 - Body text */
  --blog-light-meta: #64748b; /* slate-500 - Meta text */
  --blog-light-divider: rgba(203, 213, 225, 0.8); /* Content dividers */
}
```

#### **Content State Colors**

```css
/* Content-Specific Interactive Colors */
:root {
  /* Content Highlighting */
  --content-highlight: rgba(251, 191, 36, 0.2); /* Text highlighting */
  --content-selection: rgba(45, 212, 191, 0.3); /* Text selection */
  --content-link-hover: rgba(45, 212, 191, 0.8); /* Link hover states */

  /* Content Callouts */
  --callout-info-dark: rgba(45, 212, 191, 0.15); /* Info callouts */
  --callout-info-light: rgba(147, 51, 234, 0.15); /* Light info callouts */
  --callout-success-dark: rgba(74, 222, 128, 0.15); /* Success callouts */
  --callout-warning-dark: rgba(251, 191, 36, 0.15); /* Warning callouts */
  --callout-danger-dark: rgba(244, 63, 94, 0.15); /* Danger callouts */
}
```

### 1.3 Background System

#### **Signature Dark Backgrounds**

```css
/* Dark Theme (Primary design approach) */
:root {
  --bg-dark-primary: #0a090f; /* Signature CreatorFlow dark */
  --bg-dark-secondary: #111827; /* gray-900 equivalent */
  --bg-dark-card: rgba(17, 24, 39, 0.5); /* Semi-transparent cards */
  --bg-dark-elevated: rgba(17, 24, 39, 0.8); /* Elevated elements */
}

/* Light Theme (Secondary support) */
.light {
  --bg-light-primary: #f1f5f9; /* slate-100 */
  --bg-light-secondary: #e2e8f0; /* slate-200 */
  --bg-light-card: rgba(255, 255, 255, 0.7); /* Glass cards */
  --bg-light-elevated: rgba(255, 255, 255, 0.9); /* Elevated elements */
}
```

### 1.3 Semantic Colors

#### **Status & Feedback Colors**

```css
/* Success States */
:root {
  --success-green-400: #4ade80; /* Light success */
  --success-green-500: #22c55e; /* Primary success */
  --success-green-600: #16a34a; /* Dark success */
}

/* Warning States */
:root {
  --warning-amber-400: #fbbf24; /* Light warning */
  --warning-amber-500: #f59e0b; /* Primary warning */
  --warning-amber-600: #d97706; /* Dark warning */
}

/* Error States */
:root {
  --error-red-400: #f87171; /* Light error */
  --error-red-500: #ef4444; /* Primary error */
  --error-red-600: #dc2626; /* Dark error */
}
```

### 1.4 Chart & Visualization Colors

#### **Data Visualization Palette**

```css
/* Chart Colors (From working RevenueChart and analytics) */
:root {
  --chart-primary: #0d9488; /* Primary data line */
  --chart-secondary: #8b5cf6; /* Secondary data line */
  --chart-tertiary: #3b82f6; /* Tertiary data line */
  --chart-success: #22c55e; /* Positive metrics */

  /* Chart Highlights */
  --chart-highlight: rgba(251, 191, 36, 0.5); /* Selection areas */
  --chart-highlight-fill: rgba(251, 191, 36, 0.1); /* Highlight fills */
  --chart-grid: rgba(156, 163, 175, 0.1); /* Grid lines */
}
```

---

## 2. Typography System

### 2.1 Font Families

#### **Primary Typography Stack**

```css
/* Font Families (From working components) */
:root {
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}
```

### 2.2 Typography Scale

#### **CEO-Level Typography Hierarchy**

```css
/* Font Sizes (From implemented components) */
:root {
  /* Display Sizes - Hero and major headings */
  --text-display-xl: 4rem; /* 64px - Hero text */
  --text-display-lg: 3rem; /* 48px - Section headings */
  --text-display-md: 2.25rem; /* 36px - Component titles */

  /* Heading Scale - UI headings */
  --text-xl: 1.25rem; /* 20px - Card titles */
  --text-lg: 1.125rem; /* 18px - Subheadings */
  --text-base: 1rem; /* 16px - Body text */
  --text-sm: 0.875rem; /* 14px - Meta text */
  --text-xs: 0.75rem; /* 12px - Labels */

  /* Font Weights */
  --font-weight-normal: 400; /* Body text */
  --font-weight-medium: 500; /* Emphasized text */
  --font-weight-semibold: 600; /* Headings */
  --font-weight-bold: 700; /* Strong headings */
  --font-weight-extrabold: 800; /* Display text */
  --font-weight-black: 900; /* Hero text */
}
```

### 2.3 CEO-Level Typography Classes

#### **Premium Typography Patterns**

```css
/* Executive Typography (From DC-070-CommandCenter) */
.heading-ceo {
  font-family: var(--font-primary);
  font-size: var(--text-display-md);
  font-weight: var(--font-weight-extrabold);
  line-height: 1.1;
  color: var(--brand-teal-600);
  letter-spacing: -0.02em;
}

/* Metric Display (From analytics components) */
.metric-display {
  font-family: var(--font-mono);
  font-size: var(--text-display-lg);
  font-weight: var(--font-weight-black);
  line-height: 1;
  color: var(--brand-purple-500);
}

/* Professional Body (Standard text) */
.text-professional {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}
```

### 2.4 Content Typography System

#### **Reading-Optimized Typography**

```css
/* Content Typography Extensions (From blog analysis) */
:root {
  /* Content-Specific Fonts */
  --font-content-serif: 'Lora', Georgia, serif; /* Premium serif for quotes */
  --font-content-reading: 'Inter', system-ui, sans-serif; /* Optimized reading font */

  /* Content-Specific Font Sizes */
  --text-content-hero: clamp(2.5rem, 8vw, 6rem); /* Responsive hero text */
  --text-content-title: 2.25rem; /* 36px - Article titles */
  --text-content-subtitle: 1.5rem; /* 24px - Article subtitles */
  --text-content-quote: 2rem; /* 32px - Testimonial quotes */
  --text-content-meta: 0.875rem; /* 14px - Author/date meta */
  --text-content-category: 0.75rem; /* 12px - Category labels */

  /* Content Line Heights - Reading optimized */
  --line-height-content: 1.75; /* Standard content reading */
  --line-height-tight-content: 1.1; /* Headlines and titles */
  --line-height-relaxed-content: 1.8; /* Long-form paragraphs */

  /* Content Letter Spacing */
  --letter-spacing-category: 0.1em; /* Category label spacing */
  --letter-spacing-hero: -0.02em; /* Hero text tightening */
  --letter-spacing-mono-content: 0.05em; /* Monospace content */
}
```

#### **Content Typography Classes**

```css
/* Content Typography Patterns */
.text-content-hero {
  font-family: var(--font-primary);
  font-size: var(--text-content-hero);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-tight-content);
  letter-spacing: var(--letter-spacing-hero);
}

.text-content-quote {
  font-family: var(--font-content-serif);
  font-size: var(--text-content-quote);
  font-weight: var(--font-weight-medium);
  font-style: italic;
  line-height: var(--line-height-relaxed-content);
}

.text-content-category {
  font-family: var(--font-mono);
  font-size: var(--text-content-category);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-category);
  tracking: widest;
}

.text-content-meta {
  font-family: var(--font-primary);
  font-size: var(--text-content-meta);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-content);
}
```

---

## 3. Spacing & Layout System

### 3.1 Premium Spacing Scale

#### **Systematic Spacing (From component analysis)**

```css
/* Spacing Scale (Extracted from working layouts) */
:root {
  /* Micro Spacing */
  --space-1: 0.25rem; /* 4px - Tight gaps */
  --space-2: 0.5rem; /* 8px - Icon spacing */
  --space-3: 0.75rem; /* 12px - Button padding */
  --space-4: 1rem; /* 16px - Base spacing */

  /* Component Spacing */
  --space-6: 1.5rem; /* 24px - Card padding (Most common) */
  --space-8: 2rem; /* 32px - Section padding */
  --space-12: 3rem; /* 48px - Large sections */
  --space-16: 4rem; /* 64px - Page sections */

  /* Layout Spacing */
  --space-20: 5rem; /* 80px - Header areas */
  --space-24: 6rem; /* 96px - Major separations */
}
```

### 3.2 Gap System

#### **Grid and Flex Gaps**

```css
/* Gap Scale (From grid implementations) */
:root {
  --gap-2: 0.5rem; /* 8px - Tight grid items */
  --gap-3: 0.75rem; /* 12px - Icon + text */
  --gap-4: 1rem; /* 16px - Card elements */
  --gap-6: 1.5rem; /* 24px - Section spacing (Primary) */
  --gap-8: 2rem; /* 32px - Grid spacing */
}
```

### 3.3 Responsive Layout Patterns

#### **Dashboard Grid System**

```css
/* Grid Systems (From working dashboard layouts) */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-6);
  padding: var(--space-6);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: var(--gap-4);
    padding: var(--space-4);
  }
}

/* Executive Layout (Wide screens) */
@media (min-width: 1440px) {
  .dashboard-grid {
    max-width: 1600px;
    margin: 0 auto;
    gap: var(--gap-8);
    padding: var(--space-8);
  }
}
```

### 3.4 Content Layout System

#### **Reading-Optimized Spacing**

```css
/* Content-Specific Spacing (From blog components) */
:root {
  /* Content Spacing */
  --space-content-section: 4rem; /* 64px - Major content sections */
  --space-content-paragraph: 1.5rem; /* 24px - Paragraph spacing */
  --space-content-element: 2rem; /* 32px - Content element spacing */
  --space-content-tight: 0.75rem; /* 12px - Tight content spacing */
  --space-hero-padding: 3rem; /* 48px - Hero content padding */
  --space-article-padding: 2rem; /* 32px - Article body padding */

  /* Content Widths - Reading optimization */
  --width-content-max: 65ch; /* Optimal reading line length */
  --width-content-hero: 50%; /* Hero content width */
  --width-content-sidebar: 25%; /* Sidebar content width */
}
```

#### **Content Grid Patterns**

```css
/* Content Layout Grids */
.content-hero-grid {
  height: 100vh;
  min-height: 450px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.content-article-grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: var(--space-content-element);
  max-width: 80rem;
  margin: 0 auto;
  padding: var(--space-article-padding);
}

@media (max-width: 1024px) {
  .content-article-grid {
    grid-template-columns: 1fr;
    padding: var(--space-4);
  }
}
```

---

## 4. Glass Morphism & Premium Effects

### 4.1 Glass Morphism System

#### **Signature Glass Effects**

```css
/* Glass Morphism (Signature CreatorFlow effect) */
:root {
  /* Glass Backgrounds */
  --glass-light: rgba(255, 255, 255, 0.7);
  --glass-dark: rgba(17, 24, 39, 0.5);
  --glass-card-light: rgba(255, 255, 255, 0.6);
  --glass-card-dark: rgba(17, 24, 39, 0.6);

  /* Backdrop Blur Levels */
  --blur-sm: blur(4px);
  --blur-md: blur(8px);
  --blur-lg: blur(16px);
  --blur-xl: blur(24px); /* Primary card blur */
}
```

### 4.2 Content Glass Morphism

#### **Advanced Content Glass Effects**

```css
/* Content-Specific Glass Morphism (From blog analysis) */
:root {
  /* Content Glass Backgrounds */
  --glass-content-dark: rgba(0, 0, 0, 0.4); /* Dark content cards */
  --glass-content-light: rgba(255, 255, 255, 0.6); /* Light content cards */
  --glass-hero-overlay: rgba(0, 0, 0, 0.7); /* Hero overlays */
  --glass-testimonial: rgba(17, 24, 39, 0.5); /* Testimonial backgrounds */

  /* Content Border Colors */
  --border-content-dark: rgba(148, 163, 184, 0.1); /* Content borders dark */
  --border-content-light: rgba(203, 213, 225, 1); /* Content borders light */
  --border-accent-dark: rgba(45, 212, 191, 0.8); /* Accent borders dark */
  --border-accent-light: rgba(147, 51, 234, 0.8); /* Accent borders light */
}
```

#### **Content Glass Classes**

```css
/* Content Glass Components */
.glass-content-card {
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
  border-radius: var(--radius-2xl);
  transition: all var(--duration-fast) var(--spring-snappy);
}

.glass-hero-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  backdrop-filter: blur(8px);
}

.glass-testimonial {
  background: var(--glass-testimonial);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-accent-dark);
  border-radius: var(--radius-xl);
}
```

### 4.3 Shadow & Glow System

#### **Premium Shadow Effects**

```css
/* Shadow System (From elevated components) */
:root {
  /* Card Shadows */
  --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Glow Effects */
  --shadow-glass: 0 0 15px rgba(13, 148, 136, 0.6);
  --shadow-teal-glow: 0 0 20px 0 rgba(52, 211, 153, 0.4);
  --shadow-blue-glow: 0 0 40px rgba(59, 130, 246, 0.15);
  --shadow-purple-glow: 0px 0px 12px rgba(29, 255, 233, 0.5);
}
```

### 4.3 Border Radius System

#### **Premium Radius Scale**

```css
/* Border Radius (From component analysis) */
:root {
  --radius-sm: 0.125rem; /* 2px - Small elements */
  --radius-md: 0.375rem; /* 6px - Buttons */
  --radius-lg: 0.5rem; /* 8px - Inputs */
  --radius-xl: 0.75rem; /* 12px - Cards */
  --radius-2xl: 1rem; /* 16px - Primary card radius */
  --radius-full: 9999px; /* Circular elements */
}
```

---

## 5. Animation & Motion System

### 5.1 Framer Motion Configurations

#### **Standard Animation Variants**

```typescript
/* Container Animations (From working components) */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Consistent stagger timing
      delayChildren: 0.2,
    },
  },
};

/* Item Animations (Standard pattern) */
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100, // Standard spring stiffness
      damping: 20, // Standard damping
    },
  },
};
```

### 5.2 Spring Configurations

#### **Premium Motion Timing**

```css
/* Spring Configurations (From component analysis) */
:root {
  /* Standard Springs */
  --spring-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Gentle ease */
  --spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bouncy */
  --spring-snappy: cubic-bezier(0.4, 0, 0.2, 1); /* Quick */
  --spring-precise: cubic-bezier(0.25, 0.1, 0.25, 1); /* Precise */

  /* Timing Values */
  --duration-fast: 0.2s; /* Quick interactions */
  --duration-normal: 0.5s; /* Standard transitions */
  --duration-slow: 1s; /* Entrance animations */
  --duration-chart: 1.5s; /* Chart animations */
}
```

### 5.3 Signature Animations

#### **HeartBeat & Pulse Effects**

```css
/* Heartbeat Animation (From BI components) */
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

/* Pulse Animation (Status indicators) */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Glow Pulse (Premium effect) */
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(13, 148, 136, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(13, 148, 136, 0.6);
  }
}
```

### 5.4 Content-Focused Animation System

#### **Blog & Content Animations (From blog components)**

```css
/* Content Entry Animations */
@keyframes hero-character-forge {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}

/* Typewriter Effect */
@keyframes typewriter-reveal {
  0% {
    width: 0;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

/* Signal Pulse (Interactive content) */
@keyframes signal-pulse {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Reticle Lock (Table of Contents targeting) */
@keyframes reticle-lock {
  0% {
    box-shadow: 0 0 15px 5px rgba(45, 212, 191, 0);
  }
  50% {
    box-shadow: 0 0 25px 10px rgba(45, 212, 191, 0.5);
  }
  100% {
    box-shadow: 0 0 15px 5px rgba(45, 212, 191, 0);
  }
}

/* Content Fade-In Stagger */
@keyframes content-fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### **Interactive Content Effects**

```css
/* Mouse-tracking glass effects for premium content */
.content-glass-tracking {
  position: relative;
  overflow: hidden;
}

.content-glass-tracking::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.2), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
}

.content-glass-tracking:hover::before {
  opacity: 1;
}

/* Icon transform effects */
.content-icon-transform {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(45, 212, 191, 0.5));
}

.content-glass-tracking:hover .content-icon-transform {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 0 15px rgba(45, 212, 191, 1));
}
```

---

## 6. Component Pattern Library

### 6.1 Card System

#### **Premium Card Components**

```css
/* Primary Card (Most common pattern) */
.card-primary {
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  background: var(--glass-card-dark);
  backdrop-filter: var(--blur-xl);
  border: 1px solid rgba(156, 163, 175, 0.2);
  box-shadow: var(--shadow-card);
  transition: all var(--duration-fast) var(--spring-snappy);
}

.card-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-teal-glow);
}

/* Executive Card (CEO-level components) */
.card-executive {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--glass-card-dark);
  backdrop-filter: var(--blur-xl);
  border: 2px solid var(--brand-teal-600);
  box-shadow: var(--shadow-glass);
}
```

### 6.2 Button System

#### **CEO-Level Buttons**

```css
/* Primary Button (Brand style) */
.btn-primary {
  background: var(--brand-blue-600);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  font-size: var(--text-base);
  transition: all var(--duration-fast) var(--spring-snappy);
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--brand-blue-500);
  transform: translateY(-2px);
  box-shadow: var(--shadow-blue-glow);
}

/* Executive Button (Premium variant) */
.btn-executive {
  background: var(--gradient-brand-primary);
  color: white;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-xl);
  font-weight: var(--font-weight-bold);
  font-size: var(--text-lg);
  box-shadow: var(--shadow-2xl);
}
```

### 6.3 Status Indicators

#### **Premium Status System**

```css
/* Success Status */
.status-success {
  background: rgba(34, 197, 94, 0.1);
  color: var(--success-green-600);
  border: 1px solid rgba(34, 197, 94, 0.2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}

/* Warning Status */
.status-warning {
  background: rgba(251, 191, 36, 0.1);
  color: var(--warning-amber-600);
  border: 1px solid rgba(251, 191, 36, 0.2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}

/* Automated Status (Special) */
.status-automated {
  background: var(--gradient-brand-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  animation: pulse 2s infinite;
}
```

### 6.4 Content Component Patterns

#### **Blog-Specific Components (From blog component analysis)**

```css
/* Content Hero Component */
.content-hero {
  height: 100vh;
  min-height: 450px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  backdrop-filter: blur(8px);
}

/* Content Category Tag */
.content-category {
  font-family: var(--font-mono);
  font-size: var(--text-content-category);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-category);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: rgba(45, 212, 191, 0.1);
  color: var(--blog-dark-accent);
  border: 1px solid rgba(45, 212, 191, 0.2);
  transition: all var(--duration-fast) var(--spring-snappy);
}

.content-category:hover {
  background: rgba(45, 212, 191, 0.2);
  transform: translateY(-1px);
}

/* Testimonial Block */
.testimonial-block {
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  background: var(--glass-testimonial);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-accent-dark);
  position: relative;
  overflow: hidden;
}

.testimonial-quote {
  font-family: var(--font-content-serif);
  font-size: var(--text-content-quote);
  font-weight: var(--font-weight-medium);
  font-style: italic;
  line-height: var(--line-height-relaxed-content);
  color: var(--blog-dark-content);
  position: relative;
  z-index: 10;
}

.testimonial-author {
  margin-top: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.testimonial-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: transform 0.4s ease;
}

.testimonial-block:hover .testimonial-avatar {
  transform: scale(1.05);
}

/* Key Takeaways Component */
.key-takeaways {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
  margin: var(--space-content-element) 0;
}

.key-takeaways-title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--blog-dark-title);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
}

.key-takeaways-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.key-takeaways-item {
  display: flex;
  align-items: flex-start;
  font-size: var(--text-base);
  line-height: var(--line-height-content);
  color: var(--blog-dark-content);
}

.key-takeaways-icon {
  margin-right: var(--space-4);
  margin-top: 0.25rem;
  flex-shrink: 0;
  color: var(--blog-dark-accent);
}

/* Table of Contents Component */
.table-of-contents {
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
  position: relative;
  overflow: hidden;
}

.table-of-contents-title {
  font-size: var(--text-base);
  font-weight: var(--font-weight-bold);
  color: var(--blog-dark-title);
  margin-bottom: var(--space-4);
}

.table-of-contents-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  position: relative;
}

.table-of-contents-item {
  position: relative;
  data-level: attr(data-level);
}

.table-of-contents-item[data-level='3'] {
  padding-left: 20px;
}

.table-of-contents-item[data-level='3']::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.table-of-contents-link {
  display: block;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  color: var(--blog-dark-meta);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.table-of-contents-link:hover,
.table-of-contents-link.active {
  color: var(--blog-dark-accent);
  font-weight: var(--font-weight-bold);
}

/* Targeting Reticle for TOC */
.targeting-reticle {
  position: absolute;
  left: 0;
  width: 100%;
  border: 2px solid var(--border-accent-dark);
  border-radius: var(--radius-lg);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease;
  pointer-events: none;
  opacity: 0;
}

.targeting-reticle.is-active {
  opacity: 1;
}

.targeting-reticle.is-locking {
  animation: reticle-lock 0.4s ease-out;
}

/* Callout Component System */
.callout {
  margin: var(--space-content-element) 0;
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
  border-left: 4px solid var(--blog-dark-accent);
  position: relative;
  overflow: hidden;
}

.callout.info {
  border-left-color: var(--blog-dark-accent);
  background: var(--callout-info-dark);
}

.callout.success {
  border-left-color: var(--success-green-500);
  background: var(--callout-success-dark);
}

.callout.warning {
  border-left-color: var(--warning-amber-500);
  background: var(--callout-warning-dark);
}

.callout.danger {
  border-left-color: var(--error-red-500);
  background: var(--callout-danger-dark);
}

.callout-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
}

.callout-icon {
  margin-right: var(--space-5);
  margin-top: 0.25rem;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(45, 212, 191, 0.5));
}

.callout:hover .callout-icon {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 0 15px rgba(45, 212, 191, 1));
}

.callout-text {
  flex: 1;
  font-size: var(--text-base);
  line-height: var(--line-height-content);
  color: var(--blog-dark-content);
}

.callout-title {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--blog-dark-title);
  margin-bottom: var(--space-2);
}
```

---

## 7. Tailwind CSS Configuration

### 7.1 Real CreatorFlow Tailwind Config

#### **Complete Configuration Implementation**

```typescript
// tailwind.config.ts - Based on extracted design tokens
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
        executive: '1600px',
      },
    },
    extend: {
      // Real CreatorFlow color system
      colors: {
        // Base shadcn/ui colors (maintained)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Real CreatorFlow Brand Colors
        'brand-teal': {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          primary: '#0d9488',
        },
        'brand-purple': {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        'brand-blue': {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },

        // Real Background System
        'bg-dark': {
          primary: '#0A090F',
          secondary: '#111827',
          card: 'rgba(17, 24, 39, 0.5)',
          elevated: 'rgba(17, 24, 39, 0.8)',
        },

        // Real Semantic Colors
        'success-green': {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        'warning-amber': {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        'error-red': {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },

        // Chart Colors
        'chart-primary': '#0d9488',
        'chart-secondary': '#8b5cf6',
        'chart-tertiary': '#3b82f6',

        // Blog Dual-Theme Color System
        'blog-dark': {
          accent: '#2dd4bf', // teal-400 - Primary blog accent
          category: '#2dd4bf', // teal-400 - Category labels
          title: '#f1f5f9', // slate-100 - Main titles
          content: '#cbd5e1', // slate-300 - Body text
          meta: '#64748b', // slate-500 - Meta text
          divider: 'rgba(241, 245, 249, 0.1)', // Content dividers
        },
        'blog-light': {
          accent: '#7c3aed', // purple-600 - Primary accent
          category: '#7c3aed', // purple-600 - Category labels
          title: '#1e293b', // slate-800 - Main titles
          content: '#374151', // slate-700 - Body text
          meta: '#64748b', // slate-500 - Meta text
          divider: 'rgba(203, 213, 225, 0.8)', // Content dividers
        },

        // Content Glass Morphism
        'glass-content': {
          dark: 'rgba(0, 0, 0, 0.4)', // Dark content cards
          light: 'rgba(255, 255, 255, 0.6)', // Light content cards
          hero: 'rgba(0, 0, 0, 0.7)', // Hero overlays
          testimonial: 'rgba(17, 24, 39, 0.5)', // Testimonial backgrounds
        },

        // Content Border Colors
        'border-content': {
          dark: 'rgba(148, 163, 184, 0.1)', // Content borders dark
          light: 'rgba(203, 213, 225, 1)', // Content borders light
          'accent-dark': 'rgba(45, 212, 191, 0.8)', // Accent borders dark
          'accent-light': 'rgba(147, 51, 234, 0.8)', // Accent borders light
        },

        // Content State Colors
        'content-highlight': 'rgba(251, 191, 36, 0.2)', // Text highlighting
        'content-selection': 'rgba(45, 212, 191, 0.3)', // Text selection
        'content-link-hover': 'rgba(45, 212, 191, 0.8)', // Link hover states

        // Content Callouts
        'callout-info-dark': 'rgba(45, 212, 191, 0.15)', // Info callouts
        'callout-info-light': 'rgba(147, 51, 234, 0.15)', // Light info callouts
        'callout-success-dark': 'rgba(74, 222, 128, 0.15)', // Success callouts
        'callout-warning-dark': 'rgba(251, 191, 36, 0.15)', // Warning callouts
        'callout-danger-dark': 'rgba(244, 63, 94, 0.15)', // Danger callouts
      },

      // Real Typography System
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: [
          'ui-monospace',
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'Consolas',
          'Courier New',
          'monospace',
        ],
        'content-serif': ['Lora', 'Georgia', 'serif'], // Premium serif for quotes
        'content-reading': ['Inter', 'system-ui', 'sans-serif'], // Optimized reading font
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2' }],

        // Content-Specific Font Sizes
        'content-hero': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // Responsive hero text
        'content-title': ['2.25rem', { lineHeight: '1.2' }], // 36px - Article titles
        'content-subtitle': ['1.5rem', { lineHeight: '1.3' }], // 24px - Article subtitles
        'content-quote': ['2rem', { lineHeight: '1.8' }], // 32px - Testimonial quotes
        'content-meta': ['0.875rem', { lineHeight: '1.75' }], // 14px - Author/date meta
        'content-category': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }], // 12px - Category labels
      },

      // Content Line Heights
      lineHeight: {
        content: '1.75', // Standard content reading
        'tight-content': '1.1', // Headlines and titles
        'relaxed-content': '1.8', // Long-form paragraphs
      },

      // Content Letter Spacing
      letterSpacing: {
        category: '0.1em', // Category label spacing
        hero: '-0.02em', // Hero text tightening
        'mono-content': '0.05em', // Monospace content
      },

      // Real Spacing System
      spacing: {
        executive: '6rem', // 96px
        strategic: '4rem', // 64px
        command: '3rem', // 48px

        // Content-Specific Spacing
        'content-section': '4rem', // 64px - Major content sections
        'content-paragraph': '1.5rem', // 24px - Paragraph spacing
        'content-element': '2rem', // 32px - Content element spacing
        'content-tight': '0.75rem', // 12px - Tight content spacing
        'hero-padding': '3rem', // 48px - Hero content padding
        'article-padding': '2rem', // 32px - Article body padding
      },

      // Content Widths - Reading optimization
      maxWidth: {
        content: '65ch', // Optimal reading line length
        'content-hero': '50%', // Hero content width
        'content-sidebar': '25%', // Sidebar content width
      },

      // Real Border Radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Real Animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(13, 148, 136, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(13, 148, 136, 0.6)' },
        },

        // Content-Focused Animations (From blog components)
        'hero-character-forge': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
            textShadow: '0 0 50px rgba(255,255,255,1)',
          },
          '80%': {
            opacity: '1',
            transform: 'translateY(0px) scale(1.1)',
            textShadow: '0 0 20px rgba(45, 212, 191, 0.7)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px) scale(1)',
            textShadow: '0 0 15px rgba(45, 212, 191, 0.3)',
          },
        },
        'typewriter-reveal': {
          '0%': {
            width: '0',
            opacity: '0',
          },
          '1%': {
            opacity: '1',
          },
          '100%': {
            width: '100%',
            opacity: '1',
          },
        },
        'signal-pulse': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
        'reticle-lock': {
          '0%': {
            boxShadow: '0 0 15px 5px rgba(45, 212, 191, 0)',
          },
          '50%': {
            boxShadow: '0 0 25px 10px rgba(45, 212, 191, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 15px 5px rgba(45, 212, 191, 0)',
          },
        },
        'content-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'nebula-drift': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(15px, 10px) scale(1.1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'slow-pulse': {
          '0%, 100%': { textShadow: '0 0 15px rgba(45, 212, 191, 0.3)' },
          '50%': { textShadow: '0 0 25px rgba(45, 212, 191, 0.5)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        heartbeat: 'heartbeat 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',

        // Content Animations
        'hero-character-forge': 'hero-character-forge 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'typewriter-reveal': 'typewriter-reveal 1s steps(40, end) forwards',
        'signal-pulse': 'signal-pulse 0.6s ease-out forwards',
        'reticle-lock': 'reticle-lock 0.4s ease-out',
        'content-fade-in': 'content-fade-in 1s ease-out forwards',
        'nebula-drift': 'nebula-drift 25s ease-in-out infinite',
        'slow-pulse': 'slow-pulse 3s ease-in-out infinite',
      },

      // Real Gradients
      backgroundImage: {
        'brand-primary': 'linear-gradient(90deg, #0d9488 0%, #8b5cf6 100%)',
        'teal-purple': 'linear-gradient(90deg, #6EE7B7 5%, #A78BFA 95%)',
        'blue-teal': 'linear-gradient(90deg, #3b82f6 0%, #14b8a6 100%)',
        'multi-brand': 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 33%, #14b8a6 66%, #22c55e 100%)',
      },

      // Real Shadows
      boxShadow: {
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        glass: '0 0 15px rgba(13, 148, 136, 0.6)',
        'teal-glow': '0 0 20px 0 rgba(52, 211, 153, 0.4)',
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.15)',
        'purple-glow': '0px 0px 12px rgba(29, 255, 233, 0.5)',
      },

      // Real Backdrop Blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

---

## 8. CSS Custom Properties Implementation

### 8.1 Enhanced Global Styles

#### **Real CSS Variables**

```css
/* src/app/globals.css - Real design tokens implementation */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Existing shadcn/ui variables (maintained) */
    --background: 240 6% 10%;
    --foreground: 60 0% 90%;
    --muted: 240 6% 10%;
    --muted-foreground: 240 5% 84%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    --ring: 215 20.2% 65.1%;
    --radius: 0.5rem;

    /* Real CreatorFlow Brand Colors */
    --brand-teal-primary: 173 80% 30%; /* #0d9488 */
    --brand-teal-light: 173 80% 52%; /* #2dd4bf */
    --brand-purple-primary: 258 90% 66%; /* #8b5cf6 */
    --brand-blue-primary: 215 100% 50%; /* #3b82f6 */

    /* Real Background System */
    --bg-dark-primary: 245 15% 4%; /* #0A090F */
    --bg-dark-secondary: 220 13% 18%; /* #111827 */

    /* Real Typography */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --font-weight-black: 900;

    /* Real Spacing */
    --space-6: 1.5rem; /* 24px - Primary card padding */
    --space-8: 2rem; /* 32px - Section padding */
    --space-12: 3rem; /* 48px - Large sections */
    --space-16: 4rem; /* 64px - Page sections */

    /* Real Animation Timing */
    --duration-fast: 0.2s;
    --duration-normal: 0.5s;
    --duration-slow: 1s;
    --duration-chart: 1.5s;

    /* Real Spring Configurations */
    --spring-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --spring-snappy: cubic-bezier(0.4, 0, 0.2, 1);

    /* Blog Content-Specific Variables */
    --blog-dark-accent: #2dd4bf; /* teal-400 - Primary blog accent */
    --blog-dark-category: #2dd4bf; /* teal-400 - Category labels */
    --blog-dark-title: #f1f5f9; /* slate-100 - Main titles */
    --blog-dark-content: #cbd5e1; /* slate-300 - Body text */
    --blog-dark-meta: #64748b; /* slate-500 - Meta text */
    --blog-dark-divider: rgba(241, 245, 249, 0.1); /* Content dividers */

    --blog-light-accent: #7c3aed; /* purple-600 - Primary accent */
    --blog-light-category: #7c3aed; /* purple-600 - Category labels */
    --blog-light-title: #1e293b; /* slate-800 - Main titles */
    --blog-light-content: #374151; /* slate-700 - Body text */
    --blog-light-meta: #64748b; /* slate-500 - Meta text */
    --blog-light-divider: rgba(203, 213, 225, 0.8); /* Content dividers */

    /* Content Glass Morphism */
    --glass-content-dark: rgba(0, 0, 0, 0.4); /* Dark content cards */
    --glass-content-light: rgba(255, 255, 255, 0.6); /* Light content cards */
    --glass-hero-overlay: rgba(0, 0, 0, 0.7); /* Hero overlays */
    --glass-testimonial: rgba(17, 24, 39, 0.5); /* Testimonial backgrounds */

    /* Content Border Colors */
    --border-content-dark: rgba(148, 163, 184, 0.1); /* Content borders dark */
    --border-content-light: rgba(203, 213, 225, 1); /* Content borders light */
    --border-accent-dark: rgba(45, 212, 191, 0.8); /* Accent borders dark */
    --border-accent-light: rgba(147, 51, 234, 0.8); /* Accent borders light */

    /* Content Spacing */
    --space-content-section: 4rem; /* 64px - Major content sections */
    --space-content-paragraph: 1.5rem; /* 24px - Paragraph spacing */
    --space-content-element: 2rem; /* 32px - Content element spacing */
    --space-content-tight: 0.75rem; /* 12px - Tight content spacing */
    --space-hero-padding: 3rem; /* 48px - Hero content padding */
    --space-article-padding: 2rem; /* 32px - Article body padding */

    /* Content Widths - Reading optimization */
    --width-content-max: 65ch; /* Optimal reading line length */
    --width-content-hero: 50%; /* Hero content width */
    --width-content-sidebar: 25%; /* Sidebar content width */

    /* Content Typography */
    --font-content-serif: 'Lora', Georgia, serif; /* Premium serif for quotes */
    --font-content-reading: 'Inter', system-ui, sans-serif; /* Optimized reading font */

    --text-content-hero: clamp(2.5rem, 8vw, 6rem); /* Responsive hero text */
    --text-content-title: 2.25rem; /* 36px - Article titles */
    --text-content-subtitle: 1.5rem; /* 24px - Article subtitles */
    --text-content-quote: 2rem; /* 32px - Testimonial quotes */
    --text-content-meta: 0.875rem; /* 14px - Author/date meta */
    --text-content-category: 0.75rem; /* 12px - Category labels */

    --line-height-content: 1.75; /* Standard content reading */
    --line-height-tight-content: 1.1; /* Headlines and titles */
    --line-height-relaxed-content: 1.8; /* Long-form paragraphs */

    --letter-spacing-category: 0.1em; /* Category label spacing */
    --letter-spacing-hero: -0.02em; /* Hero text tightening */
    --letter-spacing-mono-content: 0.05em; /* Monospace content */
  }

  .dark {
    /* Dark mode (Primary design approach) */
    --background: 245 15% 4%; /* #0A090F */
    --foreground: 213 31% 91%;
    --muted: 220 13% 18%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 220 13% 18%;
    --accent-foreground: 210 40% 98%;
    --popover: 245 15% 4%;
    --popover-foreground: 215 20.2% 65.1%;
    --border: 220 13% 18%;
    --input: 220 13% 18%;
    --card: 245 15% 4%;
    --card-foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --ring: 220 13% 18%;
  }

  /* Enhanced base styles */
  * {
    @apply min-w-0 border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
    font-family: 'Inter', system-ui, sans-serif;
  }

  html,
  body {
    @apply h-full;
  }
}

/* Real Component Classes */
@layer components {
  /* Premium Card System */
  .card-primary {
    @apply rounded-2xl border border-gray-400/20 p-6 backdrop-blur-xl;
    background: rgba(17, 24, 39, 0.5);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-primary:hover {
    @apply -translate-y-0.5;
    box-shadow: 0 0 20px 0 rgba(52, 211, 153, 0.4);
  }

  /* CEO-Level Typography */
  .heading-ceo {
    @apply text-4xl font-extrabold leading-tight tracking-tight;
    color: #0d9488;
  }

  .metric-display {
    @apply font-mono text-5xl font-black leading-none;
    color: #8b5cf6;
  }

  /* Premium Buttons */
  .btn-primary {
    @apply rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary:hover {
    @apply -translate-y-0.5;
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
  }

  .btn-executive {
    @apply rounded-xl px-8 py-4 font-bold text-white;
    background: linear-gradient(90deg, #0d9488 0%, #8b5cf6 100%);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* Status System */
  .status-success {
    @apply rounded-full px-4 py-2 text-sm font-medium;
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .status-automated {
    @apply rounded-full px-4 py-2 text-sm font-semibold text-white;
    background: linear-gradient(90deg, #0d9488 0%, #8b5cf6 100%);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Glass Morphism */
  .glass-card {
    @apply border border-gray-400/20 backdrop-blur-xl;
    background: rgba(17, 24, 39, 0.5);
  }
}

/* Real Animation Classes */
@layer utilities {
  .animate-heartbeat {
    animation: heartbeat 2s ease-in-out infinite;
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }

  /* Premium Hover Effects */
  .hover-lift {
    @apply transition-all duration-200 hover:-translate-y-1;
  }

  .hover-glow {
    @apply transition-all duration-200;
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px 0 rgba(52, 211, 153, 0.4);
  }

  /* Content-Specific Animation Classes */
  .animate-hero-character-forge {
    animation: hero-character-forge 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-typewriter-reveal {
    animation: typewriter-reveal 1s steps(40, end) forwards;
  }

  .animate-signal-pulse {
    animation: signal-pulse 0.6s ease-out forwards;
  }

  .animate-reticle-lock {
    animation: reticle-lock 0.4s ease-out;
  }

  .animate-content-fade-in {
    animation: content-fade-in 1s ease-out forwards;
  }

  .animate-nebula-drift {
    animation: nebula-drift 25s ease-in-out infinite;
  }

  .animate-slow-pulse {
    animation: slow-pulse 3s ease-in-out infinite;
  }
}

/* Blog Content Component Classes */
@layer components {
  /* Content Hero Component */
  .content-hero {
    height: 100vh;
    min-height: 450px;
    max-height: 600px;
    @apply relative flex items-center justify-center overflow-hidden;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
    backdrop-filter: blur(8px);
  }

  /* Content Category Tag */
  .content-category {
    @apply rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase transition-all duration-200;
    font-family: var(--font-mono);
    font-size: var(--text-content-category);
    letter-spacing: var(--letter-spacing-category);
    background: rgba(45, 212, 191, 0.1);
    color: var(--blog-dark-accent);
    border: 1px solid rgba(45, 212, 191, 0.2);
  }

  .content-category:hover {
    background: rgba(45, 212, 191, 0.2);
    @apply -translate-y-0.5;
  }

  /* Content Glass Classes */
  .glass-content-card {
    background: var(--glass-content-dark);
    @apply rounded-2xl border backdrop-blur-2xl;
    border: 1px solid var(--border-content-dark);
    transition: all var(--duration-fast) var(--spring-snappy);
  }

  .glass-hero-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
    @apply backdrop-blur-lg;
  }

  .glass-testimonial {
    background: var(--glass-testimonial);
    @apply rounded-xl border backdrop-blur-lg;
    border: 1px solid var(--border-accent-dark);
  }

  /* Content Typography Classes */
  .text-content-hero {
    font-family: var(--font-primary);
    font-size: var(--text-content-hero);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-tight-content);
    letter-spacing: var(--letter-spacing-hero);
  }

  .text-content-quote {
    font-family: var(--font-content-serif);
    font-size: var(--text-content-quote);
    font-weight: var(--font-weight-medium);
    font-style: italic;
    line-height: var(--line-height-relaxed-content);
  }

  .text-content-category {
    font-family: var(--font-mono);
    font-size: var(--text-content-category);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-category);
    @apply tracking-widest;
  }

  .text-content-meta {
    font-family: var(--font-primary);
    font-size: var(--text-content-meta);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-content);
  }

  /* Content Layout Grids */
  .content-hero-grid {
    height: 100vh;
    min-height: 450px;
    max-height: 600px;
    @apply relative flex items-center justify-center overflow-hidden;
  }

  .content-article-grid {
    @apply mx-auto grid max-w-7xl gap-8;
    grid-template-columns: 1fr 3fr 1fr;
    padding: var(--space-article-padding);
  }

  @media (max-width: 1024px) {
    .content-article-grid {
      @apply grid-cols-1 px-4;
    }
  }

  /* Interactive Content Effects */
  .content-glass-tracking {
    @apply relative overflow-hidden;
  }

  .content-glass-tracking::before {
    content: '';
    @apply pointer-events-none absolute left-0 top-0 z-10 h-full w-full rounded-2xl opacity-0;
    background: radial-gradient(
      500px circle at var(--mouse-x) var(--mouse-y),
      rgba(45, 212, 191, 0.2),
      transparent 60%
    );
    transition: opacity 0.4s ease-in-out;
  }

  .content-glass-tracking:hover::before {
    @apply opacity-100;
  }

  .content-icon-transform {
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
    filter: drop-shadow(0 0 5px rgba(45, 212, 191, 0.5));
  }

  .content-glass-tracking:hover .content-icon-transform {
    @apply scale-110;
    transform: scale(1.1) rotate(-5deg);
    filter: drop-shadow(0 0 15px rgba(45, 212, 191, 1));
  }

  /* Testimonial Block */
  .testimonial-block {
    @apply relative overflow-hidden rounded-2xl p-8;
    background: var(--glass-testimonial);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border-accent-dark);
  }

  .testimonial-quote {
    font-family: var(--font-content-serif);
    font-size: var(--text-content-quote);
    font-weight: var(--font-weight-medium);
    font-style: italic;
    line-height: var(--line-height-relaxed-content);
    color: var(--blog-dark-content);
    @apply relative z-10;
  }

  .testimonial-author {
    @apply mt-6 flex items-center gap-4;
  }

  .testimonial-avatar {
    @apply relative h-16 w-16 rounded-full border-2;
    border-color: rgba(255, 255, 255, 0.2);
    transition: transform 0.4s ease;
  }

  .testimonial-block:hover .testimonial-avatar {
    @apply scale-105;
  }

  /* Key Takeaways Component */
  .key-takeaways {
    @apply rounded-xl border p-6;
    background: var(--glass-content-dark);
    backdrop-filter: blur(24px);
    border: 1px solid var(--border-content-dark);
    margin: var(--space-content-element) 0;
  }

  .key-takeaways-title {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-bold);
    color: var(--blog-dark-title);
    @apply mb-4 flex items-center;
  }

  .key-takeaways-list {
    @apply m-0 flex list-none flex-col gap-4 p-0;
  }

  .key-takeaways-item {
    @apply flex items-start text-base;
    line-height: var(--line-height-content);
    color: var(--blog-dark-content);
  }

  .key-takeaways-icon {
    @apply mr-4 mt-1 flex-shrink-0;
    color: var(--blog-dark-accent);
  }

  /* Table of Contents Component */
  .table-of-contents {
    @apply relative overflow-hidden rounded-2xl border p-6;
    background: var(--glass-content-dark);
    backdrop-filter: blur(24px);
    border: 1px solid var(--border-content-dark);
  }

  .table-of-contents-title {
    font-size: var(--text-base);
    font-weight: var(--font-weight-bold);
    color: var(--blog-dark-title);
    @apply mb-4;
  }

  .table-of-contents-list {
    @apply relative m-0 flex list-none flex-col gap-2 p-0 font-mono text-sm;
  }

  .table-of-contents-item {
    @apply relative;
  }

  .table-of-contents-item[data-level='3'] {
    @apply pl-5;
  }

  .table-of-contents-item[data-level='3']::before {
    content: '';
    @apply absolute bottom-0 left-2 top-0 w-0.5;
    background: rgba(255, 255, 255, 0.1);
  }

  .table-of-contents-link {
    @apply text-decoration-none relative block rounded-md p-2;
    color: var(--blog-dark-meta);
    transition: all 0.3s ease;
  }

  .table-of-contents-link:hover,
  .table-of-contents-link.active {
    color: var(--blog-dark-accent);
    font-weight: var(--font-weight-bold);
  }

  /* Targeting Reticle for TOC */
  .targeting-reticle {
    @apply pointer-events-none absolute left-0 w-full rounded-lg border-2 opacity-0;
    border-color: var(--border-accent-dark);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.3s ease;
  }

  .targeting-reticle.is-active {
    @apply opacity-100;
  }

  .targeting-reticle.is-locking {
    @apply animate-reticle-lock;
  }

  /* Callout Component System */
  .callout {
    @apply relative my-8 overflow-hidden rounded-2xl border border-l-4 p-6;
    background: var(--glass-content-dark);
    backdrop-filter: blur(24px);
    border: 1px solid var(--border-content-dark);
    border-left: 4px solid var(--blog-dark-accent);
  }

  .callout.info {
    border-left-color: var(--blog-dark-accent);
    background: var(--callout-info-dark);
  }

  .callout.success {
    border-left-color: var(--success-green-500);
    background: var(--callout-success-dark);
  }

  .callout.warning {
    border-left-color: var(--warning-amber-500);
    background: var(--callout-warning-dark);
  }

  .callout.danger {
    border-left-color: var(--error-red-500);
    background: var(--callout-danger-dark);
  }

  .callout-content {
    @apply relative z-10 flex items-start;
  }

  .callout-icon {
    @apply mr-5 mt-1 flex-shrink-0;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
    filter: drop-shadow(0 0 5px rgba(45, 212, 191, 0.5));
  }

  .callout:hover .callout-icon {
    @apply scale-110;
    transform: scale(1.1) rotate(-5deg);
    filter: drop-shadow(0 0 15px rgba(45, 212, 191, 1));
  }

  .callout-text {
    @apply flex-1 text-base;
    line-height: var(--line-height-content);
    color: var(--blog-dark-content);
  }

  .callout-title {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-bold);
    color: var(--blog-dark-title);
    @apply mb-2;
  }
}
```

---

## 9. Implementation Roadmap

### 9.1 Migration Strategy

#### **Phase 1: Foundation Setup**

```bash
# Update core configuration files
1. Replace tailwind.config.ts with real design tokens
2. Update globals.css with extracted styles
3. Create component utility classes

# Files to update:
- tailwind.config.ts
- src/app/globals.css
- src/lib/utils.ts (cn function enhancements)
```

#### **Phase 2: Component Migration**

```bash
# Systematic component migration
1. Start with most-used components (Cards, Buttons)
2. Apply extracted design tokens systematically
3. Replace hard-coded values with token references

# Priority order:
- Card components → .card-primary class
- Button components → .btn-primary, .btn-executive classes
- Typography → .heading-ceo, .metric-display classes
- Status indicators → .status-* classes
```

#### **Phase 3: Chart Integration**

```bash
# Chart component enhancement
1. Apply extracted chart colors to EvilCharts components
2. Implement glass morphism effects on chart containers
3. Add branded gradient overlays

# EvilCharts components to enhance:
- OrderVolumeChart → brand-teal-primary data lines
- RevenueChart → gradient-brand-primary fills
- ProductChart → chart color palette
```

### 9.2 Quality Assurance Checklist

#### **Design Token Validation**

```typescript
interface ImplementationChecklist {
  foundation: {
    ✅ 'Tailwind config updated with real extracted colors',
    ✅ 'CSS custom properties match component analysis',
    ✅ 'Typography scale reflects actual usage patterns',
    ✅ 'Spacing system uses extracted values'
  };

  components: {
    ✅ 'Card components use glass morphism effects',
    ✅ 'Button components match premium styling',
    ✅ 'Typography follows CEO-level hierarchy',
    ✅ 'Status indicators use brand color palette'
  };

  integration: {
    ✅ 'EvilCharts components use brand gradients',
    ✅ 'Animations match Framer Motion configurations',
    ✅ 'Responsive breakpoints preserved',
    ✅ 'Accessibility contrast ratios maintained'
  };
}
```

---

## 10. Success Metrics & Maintenance

### 10.1 Design System Effectiveness

#### **Success Criteria**

```typescript
interface DesignSystemSuccess {
  consistency: {
    target: '95% of components use design tokens instead of hard-coded values';
    measurement: 'Code analysis for hex colors and magic numbers';
  };

  performance: {
    target: 'No performance degradation from design token implementation';
    measurement: 'Lighthouse scores and animation frame rates';
  };

  maintainability: {
    target: '70% reduction in component styling time';
    measurement: 'Developer feedback and implementation tracking';
  };

  brandConsistency: {
    target: 'Unified visual language across all components';
    measurement: 'Design review and user feedback';
  };
}
```

### 10.2 Continuous Evolution

#### **Design Token Governance**

```typescript
export const designTokenMaintenance = {
  monthly: 'Audit component usage patterns for new token opportunities',
  quarterly: 'Review design token effectiveness and developer experience',
  annually: 'Comprehensive design system evolution assessment',

  qualityGates: {
    newTokens: 'Must align with extracted patterns and brand consistency',
    colorChanges: 'Require accessibility compliance validation',
    spacingUpdates: 'Must maintain responsive design integrity',
    animationModifications: 'Performance impact assessment required',
  },
};
```

---

## Summary

This design system specification is **extracted from 87+ working CreatorFlow components** rather than theoretical design principles. It preserves the sophisticated visual language that creates the premium, CEO-level experience while systematizing it for consistent implementation.

**Key Achievements:**

- **Real Color Palette**: Teal-purple gradient system extracted from working components
- **Glass Morphism**: Systematic backdrop-blur and transparency effects
- **CEO Typography**: Font weights and sizes that create executive-level interfaces
- **Spring Animations**: Framer Motion configurations with consistent timing
- **Component Patterns**: Card, button, and status systems from actual implementations
- **Production-Ready**: Complete Tailwind configuration and CSS implementation

**Implementation Path:**

1. **Replace theoretical tokens** with extracted real design tokens
2. **Preserve working visual language** while making it systematic
3. **Enhance EvilCharts integration** with brand gradient system
4. **Maintain premium quality** through consistent application

This specification serves as the bridge between your working mock components and a systematic, maintainable design system that preserves the premium brand experience while enabling scalable development.

---

## Related Documents

### **Core Specifications**

- [S001-DRAFT: Design System Overview](./S001-DRAFT-design-system-overview.md) - Complete design system hub and philosophy
- [S003-DRAFT: Responsive Design System](./S003-DRAFT-responsive-design-system.md) - Mobile-first breakpoints and optimization
- [S004-DRAFT: Component Patterns](./S004-DRAFT-component-patterns.md) - Component implementation patterns

### **Implementation Guides**

- [I001-DRAFT: Implementation Roadmap](../02-implementation/I001-DRAFT-implementation-roadmap.md) - 10-week deployment strategy
- [I002-DRAFT: Migration Guide](../02-implementation/I002-DRAFT-migration-guide.md) - Step-by-step migration instructions
- [I003-DRAFT: Testing Strategy](../02-implementation/I003-DRAFT-testing-strategy.md) - Comprehensive testing approach

### **Reference Documentation**

- [R001-DRAFT: Usage Guidelines](../03-reference/R001-DRAFT-usage-guidelines.md) - Design system governance and best practices
- [R002-DRAFT: Changelog](../03-reference/R002-DRAFT-changelog.md) - Design system evolution tracking

### **Project Context**

- [CLAUDE.md](../../../../CLAUDE.md) - CreatorFlow project context and design philosophy
- [Component Naming System](../../component-naming/README.md) - Component categorization system
