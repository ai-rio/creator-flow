'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

import ThemeToggleButton from '@/components/atomic/molecules/ThemeToggleButton';
import { ThreeJSOptimizedContentSection } from '@/components/atomic/organisms/EnhancedContentSection';
// Import Three.js enhanced components
import EnhancedHeroSection from '@/components/atomic/organisms/EnhancedHeroSection';
// Import enhanced HP components
import HPBenefitsReel from '@/components/atomic/organisms/HP-BenefitsReel';
import HPHeaderVariant from '@/components/atomic/organisms/HP-HeaderVariant';
import HPInteractiveShowcase from '@/components/atomic/organisms/HP-InteractiveShowcase';
import HPManifesto from '@/components/atomic/organisms/HP-Manifesto';
import HPTestimonialsShowcase from '@/components/atomic/organisms/HP-TestimonialsShowcase';
// Import theme management
import { initializeThemeSystem, useThreeJSTheme } from '@/hooks/use-theme-persistence';

const HomePage = () => {
  const { theme, toggleTheme, isTransitioning } = useThreeJSTheme({
    defaultTheme: 'dark',
    enableTransitions: true,
    transitionDuration: 700,
  });

  // Initialize theme system on mount
  useEffect(() => {
    initializeThemeSystem();
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] as any,
      },
    },
  };

  return (
    <motion.div
      className={`relative min-h-screen font-sans transition-all duration-700 ease-out ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-black via-slate-950 to-black text-white'
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
      }`}
      variants={pageVariants}
      initial='initial'
      animate='animate'
    >
      {/* Fixed Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
      >
        <HPHeaderVariant />
      </motion.div>

      {/* Page Content */}
      <main className='relative'>
        {/* Enhanced Hero Section with Three.js Animation */}
        <EnhancedHeroSection theme={theme} showThreeJS={true} showFloatingElements={true} performanceMode='high' />

        {/* Content Sections with Three.js Optimized Animations */}
        <ThreeJSOptimizedContentSection theme={theme} className='py-16'>
          <HPBenefitsReel />
        </ThreeJSOptimizedContentSection>

        <ThreeJSOptimizedContentSection theme={theme} className='py-24'>
          <HPManifesto />
        </ThreeJSOptimizedContentSection>

        <ThreeJSOptimizedContentSection theme={theme} className='py-16'>
          <HPInteractiveShowcase />
        </ThreeJSOptimizedContentSection>

        <ThreeJSOptimizedContentSection theme={theme} className='py-16'>
          <HPTestimonialsShowcase />
        </ThreeJSOptimizedContentSection>

        {/* Footer Spacing */}
        <div className='h-24' />
      </main>

      {/* Premium Theme Toggle */}
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} position='bottom-left' showLabel={true} size='md' />

      {/* Global Styles for Advanced Gradients and Transitions */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          transition: background-color 0.7s ease-out;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        .bg-gradient-radial-hero {
          background: radial-gradient(ellipse 120% 80% at 50% 30%, var(--tw-gradient-stops));
        }

        .bg-gradient-radial-vignette {
          background: radial-gradient(ellipse 150% 100% at 50% 50%, var(--tw-gradient-stops));
        }

        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        .backdrop-blur-micro {
          backdrop-filter: blur(0.5px);
          -webkit-backdrop-filter: blur(0.5px);
        }

        .mix-blend-luminosity {
          mix-blend-mode: luminosity;
        }

        .mix-blend-soft-light {
          mix-blend-mode: soft-light;
        }

        .will-change-transform {
          will-change: transform;
        }

        .will-change-opacity {
          will-change: opacity;
        }

        .contain-layout {
          contain: layout;
        }

        .contain-paint {
          contain: paint;
        }
      `}</style>
    </motion.div>
  );
};

export default HomePage;
