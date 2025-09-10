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
      // Real CreatorFlow color system (extracted from 100+ components)
      colors: {
        // Base shadcn/ui colors (maintained for compatibility)
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        // Real CreatorFlow Brand Colors (extracted from working components)
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

        // Real Background System (from dark theme components)
        'bg-dark': {
          primary: '#0A090F',
          secondary: '#111827',
          card: 'rgba(17, 24, 39, 0.5)',
          elevated: 'rgba(17, 24, 39, 0.8)',
        },

        // Real Semantic Colors (from working status indicators)
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

        // Chart Colors (from EvilCharts integration)
        'chart-primary': '#0d9488',
        'chart-secondary': '#8b5cf6',
        'chart-tertiary': '#3b82f6',

        // Blog Dual-Theme Color System (from blog components analysis)
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

        // Content Glass Morphism (from glass morphism system)
        'glass-content': {
          dark: 'rgba(0, 0, 0, 0.4)', // Dark content cards
          light: 'rgba(255, 255, 255, 0.6)', // Light content cards
          hero: 'rgba(0, 0, 0, 0.7)', // Hero overlays
          testimonial: 'rgba(17, 24, 39, 0.5)', // Testimonial backgrounds
        },

        // Content Border Colors (from component analysis)
        'border-content': {
          dark: 'rgba(148, 163, 184, 0.1)', // Content borders dark
          light: 'rgba(203, 213, 225, 1)', // Content borders light
          'accent-dark': 'rgba(45, 212, 191, 0.8)', // Accent borders dark
          'accent-light': 'rgba(147, 51, 234, 0.8)', // Accent borders light
        },

        // Content State Colors (from interactive elements)
        'content-highlight': 'rgba(251, 191, 36, 0.2)', // Text highlighting
        'content-selection': 'rgba(45, 212, 191, 0.3)', // Text selection
        'content-link-hover': 'rgba(45, 212, 191, 0.8)', // Link hover states

        // Content Callouts (from blog callout components)
        'callout-info-dark': 'rgba(45, 212, 191, 0.15)', // Info callouts
        'callout-info-light': 'rgba(147, 51, 234, 0.15)', // Light info callouts
        'callout-success-dark': 'rgba(74, 222, 128, 0.15)', // Success callouts
        'callout-warning-dark': 'rgba(251, 191, 36, 0.15)', // Warning callouts
        'callout-danger-dark': 'rgba(244, 63, 94, 0.15)', // Danger callouts

        // TikTok Integration Colors (preserved from current system)
        tiktok: {
          pink: '#ff0050', // TikTok brand pink
          blue: '#25f4ee', // TikTok brand blue
          black: '#161823', // TikTok brand black
          viral: '#ff0050', // Viral content alerts
          trending: '#25f4ee', // Trending indicators
        },

        // Legacy color system (maintained for backward compatibility)
        clarity: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        'data-art': {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#581c87',
        },
        automation: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          900: '#064e3b',
        },
        executive: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          900: '#92400e',
        },
      },

      // Real Typography System (from component analysis)
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
        display: ['Montserrat', ...fontFamily.sans],
        creative: ['Poppins', ...fontFamily.sans],
      },
      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2' }],

        // Content-Specific Font Sizes (from blog components)
        'content-hero': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // Responsive hero text
        'content-title': ['2.25rem', { lineHeight: '1.2' }], // 36px - Article titles
        'content-subtitle': ['1.5rem', { lineHeight: '1.3' }], // 24px - Article subtitles
        'content-quote': ['2rem', { lineHeight: '1.8' }], // 32px - Testimonial quotes
        'content-meta': ['0.875rem', { lineHeight: '1.75' }], // 14px - Author/date meta
        'content-category': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }], // 12px - Category labels

        // Legacy sizes (maintained for compatibility)
        'heading-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['2rem', { lineHeight: '1.25', fontWeight: '500' }],
        'heading-md': ['1.5rem', { lineHeight: '1.35', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.45', fontWeight: '400' }],
        'metric-lg': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'metric-md': ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
      },

      // Content Line Heights (from blog analysis)
      lineHeight: {
        content: '1.75', // Standard content reading
        'tight-content': '1.1', // Headlines and titles
        'relaxed-content': '1.8', // Long-form paragraphs
      },

      // Content Letter Spacing (from typography analysis)
      letterSpacing: {
        category: '0.1em', // Category label spacing
        hero: '-0.02em', // Hero text tightening
        'mono-content': '0.05em', // Monospace content
      },

      // Real Spacing System (extracted from component padding/margins)
      spacing: {
        // Legacy spacing (maintained for compatibility)
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        tactical: '1rem', // 16px - Tactical spacing
        strategic: '1.5rem', // 24px - Strategic spacing
        command: '2rem', // 32px - Command spacing
        executive: '3rem', // 48px - Executive spacing
        presidential: '4rem', // 64px - Presidential spacing
        imperial: '6rem', // 96px - Imperial spacing

        // Content-Specific Spacing (from blog components)
        'content-section': '4rem', // 64px - Major content sections
        'content-paragraph': '1.5rem', // 24px - Paragraph spacing
        'content-element': '2rem', // 32px - Content element spacing
        'content-tight': '0.75rem', // 12px - Tight content spacing
        'hero-padding': '3rem', // 48px - Hero content padding
        'article-padding': '2rem', // 32px - Article body padding
      },

      // Content Widths - Reading optimization (from blog layouts)
      maxWidth: {
        content: '65ch', // Optimal reading line length
        'content-hero': '50%', // Hero content width
        'content-sidebar': '25%', // Sidebar content width
        // Sidebar widths (from component analysis)
        'sidebar-expanded': '16rem', // 256px - Expanded sidebar
        'sidebar-collapsed': '4.5rem', // 72px - Collapsed sidebar
      },

      // Component Dimensions (from UI component analysis)
      width: {
        'sidebar-expanded': '16rem', // 256px - Expanded sidebar
        'sidebar-collapsed': '4.5rem', // 72px - Collapsed sidebar
        'icon-sm': '1.25rem', // 20px - Small icons
        'icon-md': '1.5rem', // 24px - Medium icons
        'icon-lg': '2rem', // 32px - Large icons
      },

      height: {
        'icon-sm': '1.25rem', // 20px - Small icons
        'icon-md': '1.5rem', // 24px - Medium icons
        'icon-lg': '2rem', // 32px - Large icons
      },

      // Z-Index System (from component layering)
      zIndex: {
        sidebar: '40', // Sidebar layer
        header: '50', // Header/navigation layer
        modal: '60', // Modal/overlay layer
        tooltip: '70', // Tooltip layer
      },

      // Real Border Radius (from component analysis)
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        premium: '0.75rem', // 12px - Premium elements
        executive: '1rem', // 16px - Executive elements
      },

      // Real Animation System (from working components)
      keyframes: {
        // Existing shadcn/ui animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },

        // Real CreatorFlow animations (from component analysis)
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

        // Content-Focused Animations (from blog components)
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

        // Legacy animations (maintained for compatibility)
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },
        'revenue-flow': {
          '0%': {
            backgroundPosition: '0% 50%',
            transform: 'translateX(0)',
          },
          '50%': {
            backgroundPosition: '50% 50%',
            transform: 'translateX(5px)',
          },
          '100%': {
            backgroundPosition: '100% 50%',
            transform: 'translateX(10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        // shadcn/ui animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        // Real CreatorFlow animations
        heartbeat: 'heartbeat 2s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',

        // Content Animations (from blog components)
        'hero-character-forge': 'hero-character-forge 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'typewriter-reveal': 'typewriter-reveal 1s steps(40, end) forwards',
        'signal-pulse': 'signal-pulse 0.6s ease-out forwards',
        'reticle-lock': 'reticle-lock 0.4s ease-out',
        'content-fade-in': 'content-fade-in 1s ease-out forwards',
        'nebula-drift': 'nebula-drift 25s ease-in-out infinite',
        'slow-pulse': 'slow-pulse 3s ease-in-out infinite',

        // Legacy animations (maintained for compatibility)
        'spin-slow': 'spin-slow 10s linear infinite',
        'revenue-flow': 'revenue-flow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      // Real Gradients (from working components)
      backgroundImage: {
        'brand-primary': 'linear-gradient(90deg, #0d9488 0%, #8b5cf6 100%)',
        'teal-purple': 'linear-gradient(90deg, #6EE7B7 5%, #A78BFA 95%)',
        'blue-teal': 'linear-gradient(90deg, #3b82f6 0%, #14b8a6 100%)',
        'multi-brand': 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 33%, #14b8a6 66%, #22c55e 100%)',

        // TikTok integration gradients (preserved)
        'tiktok-brand': 'linear-gradient(45deg, #ff0050 0%, #25f4ee 100%)',
        'viral-energy': 'linear-gradient(90deg, #ff0050 0%, #ff6b6b 100%)',

        // Legacy gradients (maintained for compatibility)
        'revenue-flow': 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
        'executive-shine': 'linear-gradient(45deg, #f59e0b 0%, #fcd34d 100%)',
        shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
      },

      // Real Shadows (from working components)
      boxShadow: {
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        glass: '0 0 15px rgba(13, 148, 136, 0.6)',
        'teal-glow': '0 0 20px 0 rgba(52, 211, 153, 0.4)',
        'blue-glow': '0 0 40px rgba(59, 130, 246, 0.15)',
        'purple-glow': '0px 0px 12px rgba(29, 255, 233, 0.5)',

        // Legacy shadows (maintained for compatibility)
        premium: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        executive: '0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)',
        artistic: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
        automation: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
        'clarity-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'authority-glow': '0 0 30px rgba(245, 158, 11, 0.4)',
        'viral-glow': '0 0 25px rgba(255, 0, 80, 0.3)',
        'success-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
      },

      // Real Backdrop Blur (from glass morphism system)
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },

      // Enhanced transition timing (maintained for compatibility)
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '250': '250ms',
        fast: '200ms',
        medium: '300ms',
        slow: '500ms',
        cinematic: '800ms',
        epic: '1200ms',
      },

      // Custom transition timing (maintained for compatibility)
      transitionTimingFunction: {
        executive: 'cubic-bezier(0.4, 0, 0.2, 1)',
        cinematic: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // Animation Spring Constants (from component analysis)
      animationDelay: {
        'spring-fast': '0.1s',
        'spring-medium': '0.2s',
        'spring-slow': '0.3s',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
  ],
};

export default config;
