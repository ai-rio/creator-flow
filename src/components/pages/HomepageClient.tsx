'use client';

import { HP070PricingTiers } from '@/components/atomic/organisms/HP070PricingTiers';
import { Benefits } from '@/components/homepage/Benefits';
import { CTA } from '@/components/homepage/CTA';
import { Hero } from '@/components/homepage/Hero';
import { InteractiveShowcase } from '@/components/homepage/InteractiveShowcase';
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection';

/**
 * CLIENT HOMEPAGE COMPONENT
 *
 * Clean homepage using extracted sections with complete conversion funnel.
 * Uses smart extraction instead of full mock stacking.
 * Ensures seamless visual flow between sections.
 *
 * COMPLETE CONVERSION FLOW:
 * Hero → Benefits → InteractiveShowcase → Testimonials → Pricing → CTA → [Seamless Footer]
 *
 * SEAMLESS INTEGRATION:
 * - Zero gaps between CTA and Footer
 * - All sections use -mx-4 w-screen for full-width consistency
 * - Perfect theme integration throughout
 * - Scroll-based animations for engaging user experience
 */
export function HomepageClient() {
  return (
    <div className='relative'>
      <Hero />
      <Benefits />
      <InteractiveShowcase />
      <TestimonialsSection />
      <HP070PricingTiers />
      <CTA />
      {/* Footer handled by ConditionalFooter in layout - seamlessly connects */}
    </div>
  );
}
