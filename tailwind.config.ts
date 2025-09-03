import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
        'executive': '1600px' // Premium executive displays
      },
    },
    extend: {
      // CDH Manifesto color system
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

        // CDH Manifesto Tenet 1: Clarity Over Chaos
        clarity: {
          50: '#eff6ff',   // Light clarity
          100: '#dbeafe',  // Soft focus
          500: '#3b82f6',  // Clear blue (primary)
          600: '#2563eb',  // Deep focus
          900: '#1e3a8a'   // Authority blue
        },
        'clarity-neutral': {
          50: '#f8fafc',   // Clean background
          100: '#f1f5f9',  // Light surface
          500: '#64748b',  // Balanced gray
          700: '#334155',  // Professional text
          900: '#0f172a'   // High contrast
        },

        // CDH Manifesto Tenet 2: Data is Art
        'data-art': {
          50: '#faf5ff',   // Light canvas
          100: '#f3e8ff',  // Soft artistic
          500: '#8b5cf6',  // Creative purple (primary)
          600: '#7c3aed',  // Deep creativity
          900: '#581c87'   // Rich artistic depth
        },
        artistic: {
          creativity: '#a855f7',     // Creative highlights
          inspiration: '#ec4899',    // Inspiration moments
          visualization: '#06b6d4',  // Data visualization
          masterpiece: '#f59e0b'     // Achievement highlights
        },

        // CDH Manifesto Tenet 3: Empowerment Through Automation
        automation: {
          50: '#f0fdf4',   // Light liberation
          100: '#dcfce7',  // Soft automation
          500: '#10b981',  // Success green (primary)
          600: '#059669',  // Active automation
          900: '#064e3b'   // Deep automation
        },
        liberation: {
          automated: '#10b981',      // Fully automated
          processing: '#3b82f6',     // Auto-processing
          liberated: '#34d399',      // Time liberated
          celebrating: '#6ee7b7'     // Achievement celebration
        },

        // CDH Manifesto Tenet 4: Creator is the CEO
        executive: {
          50: '#fffbeb',   // Light executive
          100: '#fef3c7',  // Soft authority
          500: '#f59e0b',  // Executive gold (primary)
          600: '#d97706',  // Deep authority
          900: '#92400e'   // Commanding presence
        },
        authority: {
          strategic: '#f59e0b',      // Strategic decisions
          commanding: '#d97706',     // Commanding presence
          prestigious: '#92400e',    // Prestigious status
          platinum: '#e5e4e2'        // Premium platinum
        },

        // TikTok Integration Colors
        tiktok: {
          pink: '#ff0050',           // TikTok brand pink
          blue: '#25f4ee',           // TikTok brand blue
          black: '#161823',          // TikTok brand black
          viral: '#ff0050',          // Viral content alerts
          trending: '#25f4ee'        // Trending indicators
        },

        // Enhanced System Colors with full scale
        'success-enhanced': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',  // Primary success
          600: '#059669',
          900: '#064e3b'
        },
        'warning-enhanced': {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',  // Primary warning
          600: '#d97706',
          900: '#92400e'
        },
        'error-enhanced': {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',  // Primary error
          600: '#dc2626',
          900: '#991b1b'
        },
        'info-enhanced': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',  // Primary info
          600: '#2563eb',
          900: '#1e3a8a'
        }
      },

      // Premium typography system
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Montserrat', ...fontFamily.sans],
        mono: ['JetBrains Mono', ...fontFamily.mono],
        creative: ['Poppins', ...fontFamily.sans]
      },
      fontSize: {
        // Executive display sizes
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        
        // Strategic heading sizes
        'heading-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['2rem', { lineHeight: '1.25', fontWeight: '500' }],
        'heading-md': ['1.5rem', { lineHeight: '1.35', fontWeight: '500' }],
        
        // Body text sizes
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.45', fontWeight: '400' }],
        
        // Metric display sizes
        'metric-lg': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'metric-md': ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }]
      },

      // Enhanced spacing scale
      spacing: {
        'xs': '0.25rem',      // 4px
        'sm': '0.5rem',       // 8px
        'tactical': '1rem',   // 16px - Tactical spacing
        'strategic': '1.5rem', // 24px - Strategic spacing
        'command': '2rem',    // 32px - Command spacing
        'executive': '3rem',  // 48px - Executive spacing
        'presidential': '4rem', // 64px - Presidential spacing
        'imperial': '6rem'    // 96px - Imperial spacing
      },

      // Premium border radius
      borderRadius: {
        'premium': '0.75rem',  // 12px - Premium elements
        'executive': '1rem',   // 16px - Executive elements
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // CDH Manifesto animations and keyframes
      keyframes: {
        // Existing animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },

        // Data is Art animations
        'revenue-flow': {
          '0%': { 
            backgroundPosition: '0% 50%',
            transform: 'translateX(0)' 
          },
          '50%': {
            backgroundPosition: '50% 50%',
            transform: 'translateX(5px)'
          },
          '100%': { 
            backgroundPosition: '100% 50%',
            transform: 'translateX(10px)' 
          }
        },
        'data-aurora': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1) rotate(0deg)' 
          },
          '25%': {
            opacity: '0.6',
            transform: 'scale(1.02) rotate(1deg)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05) rotate(2deg)' 
          },
          '75%': {
            opacity: '0.6',
            transform: 'scale(1.02) rotate(1deg)'
          }
        },
        'profit-landscape': {
          '0%': { 
            transform: 'translateY(10px)', 
            opacity: '0',
            filter: 'blur(4px)'
          },
          '50%': { 
            transform: 'translateY(-2px)', 
            opacity: '0.7',
            filter: 'blur(1px)'
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1',
            filter: 'blur(0)'
          }
        },

        // Automation Empowerment animations
        'automation-flow': {
          '0%': { 
            backgroundPosition: '0% 0%',
            transform: 'scaleX(0)' 
          },
          '50%': {
            backgroundPosition: '50% 50%',
            transform: 'scaleX(0.5)'
          },
          '100%': { 
            backgroundPosition: '100% 100%',
            transform: 'scaleX(1)' 
          }
        },
        'liberation-celebration': {
          '0%': { 
            transform: 'scale(1)', 
            filter: 'hue-rotate(0deg) brightness(1)' 
          },
          '25%': { 
            transform: 'scale(1.05)', 
            filter: 'hue-rotate(90deg) brightness(1.1)' 
          },
          '50%': { 
            transform: 'scale(1.1)', 
            filter: 'hue-rotate(180deg) brightness(1.2)' 
          },
          '75%': { 
            transform: 'scale(1.05)', 
            filter: 'hue-rotate(270deg) brightness(1.1)' 
          },
          '100%': { 
            transform: 'scale(1)', 
            filter: 'hue-rotate(360deg) brightness(1)' 
          }
        },
        'stress-elimination': {
          '0%': { 
            opacity: '1', 
            transform: 'translateX(0) scale(1)' 
          },
          '25%': {
            opacity: '0.8',
            transform: 'translateX(5px) scale(0.98)'
          },
          '50%': { 
            opacity: '0.5', 
            transform: 'translateX(10px) scale(0.95)' 
          },
          '75%': {
            opacity: '0.2',
            transform: 'translateX(15px) scale(0.9)'
          },
          '100%': { 
            opacity: '0', 
            transform: 'translateX(20px) scale(0.8)' 
          }
        },

        // Clarity Over Chaos animations
        'priority-highlight': {
          '0%': { 
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' 
          },
          '70%': { 
            boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' 
          },
          '100%': { 
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' 
          }
        },
        'focus-flow': {
          '0%, 100%': { 
            transform: 'translateX(0)' 
          },
          '25%': {
            transform: 'translateX(2px)'
          },
          '50%': { 
            transform: 'translateX(5px)' 
          },
          '75%': {
            transform: 'translateX(3px)'
          }
        },

        // Creator is the CEO animations
        'executive-entrance': {
          '0%': { 
            transform: 'translateY(-20px) scale(0.95)', 
            opacity: '0' 
          },
          '25%': {
            transform: 'translateY(-15px) scale(0.97)',
            opacity: '0.2'
          },
          '50%': { 
            transform: 'translateY(-10px) scale(1.02)', 
            opacity: '0.5' 
          },
          '75%': {
            transform: 'translateY(-5px) scale(1.01)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          }
        },
        'authority-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' 
          },
          '25%': {
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)' 
          },
          '75%': {
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)'
          }
        },
        'strategic-pulse': {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
          '25%': {
            transform: 'scale(1.02)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'scale(1.05)', 
            opacity: '0.8' 
          },
          '75%': {
            transform: 'scale(1.02)',
            opacity: '0.9'
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          }
        },

        // Special effects
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        }
      },
      animation: {
        // Existing animations
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin-slow 10s linear infinite',

        // Data is Art animations
        'revenue-flow': 'revenue-flow 3s ease-in-out infinite',
        'data-aurora': 'data-aurora 4s ease-in-out infinite',
        'profit-landscape': 'profit-landscape 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',

        // Automation Empowerment animations
        'automation-flow': 'automation-flow 2s ease-in-out infinite',
        'liberation-celebration': 'liberation-celebration 2s ease-in-out',
        'stress-elimination': 'stress-elimination 0.8s ease-in forwards',

        // Clarity Over Chaos animations
        'priority-highlight': 'priority-highlight 2s infinite',
        'focus-flow': 'focus-flow 2s ease-in-out infinite',

        // Creator is the CEO animations
        'executive-entrance': 'executive-entrance 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'authority-glow': 'authority-glow 1.5s ease-in-out infinite',
        'strategic-pulse': 'strategic-pulse 2s ease-in-out infinite',

        // Utility animations
        'shimmer': 'shimmer 2s linear infinite'
      },

      // Premium gradients
      backgroundImage: {
        // Data Art gradients
        'revenue-flow': 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
        'profit-landscape': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
        'viral-aurora': 'linear-gradient(180deg, #a855f7 0%, #ec4899 35%, #f97316 70%, #eab308 100%)',
        'data-canvas': 'linear-gradient(45deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',

        // Executive gradients
        'executive-shine': 'linear-gradient(45deg, #f59e0b 0%, #fcd34d 100%)',
        'authority-flow': 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
        'strategic-depth': 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',

        // Automation gradients
        'automation-glow': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'liberation-flow': 'linear-gradient(90deg, #10b981 0%, #6ee7b7 100%)',

        // TikTok integration gradients
        'tiktok-brand': 'linear-gradient(45deg, #ff0050 0%, #25f4ee 100%)',
        'viral-energy': 'linear-gradient(90deg, #ff0050 0%, #ff6b6b 100%)',

        // Clarity gradients
        'clarity-focus': 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
        'clarity-calm': 'linear-gradient(135deg, #dbeafe 0%, #f8fafc 100%)',

        // Shimmer effect
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
      },

      // Enhanced box shadows
      boxShadow: {
        // Premium shadows
        'premium': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'executive': '0 20px 25px -5px rgba(245, 158, 11, 0.1), 0 10px 10px -5px rgba(245, 158, 11, 0.04)',
        'artistic': '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
        'automation': '0 25px 50px -12px rgba(16, 185, 129, 0.25)',

        // Glow effects
        'clarity-glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'authority-glow': '0 0 30px rgba(245, 158, 11, 0.4)',
        'viral-glow': '0 0 25px rgba(255, 0, 80, 0.3)',
        'success-glow': '0 0 20px rgba(16, 185, 129, 0.3)',

        // Elevation shadows
        'elevation-1': '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
      },

      // Animation timing functions
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '250': '250ms',
        'fast': '200ms',
        'medium': '300ms',
        'slow': '500ms',
        'cinematic': '800ms',
        'epic': '1200ms'
      },

      // Custom transition timing
      transitionTimingFunction: {
        'executive': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'cinematic': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elastic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate')
  ],
};

export default config;