'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/**
 * HOMEPAGE TESTIMONIALS SECTION
 *
 * Extracted from HP-040-TestimonialsReel mock - clean, focused testimonials component
 * for the actual CreatorFlow homepage.
 *
 * UPDATED: Now uses CreatorFlow theme system with proper theme awareness
 */

// --- Mock Data for Creator Testimonials ---
const testimonials = [
  {
    handle: '@viral_creator',
    quote: "CreatorFlow didn't just organize my business, it unlocked a new level of growth I never thought possible.",
    metric: '500+ Orders/Day',
    img: 'https://placehold.co/100x100/1e293b/ffffff?text=VC',
  },
  {
    handle: '@ecom_queen',
    quote: "The automation saved me over 40 hours a week. It's like having a full-time operations manager.",
    metric: '$27k Saved/Mo',
    img: 'https://placehold.co/100x100/475569/ffffff?text=EQ',
  },
  {
    handle: '@tiktok_hustler',
    quote: "Inventory syncing is flawless. I haven't oversold a single item since switching.",
    metric: '99.9% Accuracy',
    img: 'https://placehold.co/100x100/64748b/ffffff?text=TH',
  },
  {
    handle: '@gadget_guru',
    quote: 'My order processing went from 15 minutes to literally 15 seconds. Game changer.',
    metric: '60x Faster',
    img: 'https://placehold.co/100x100/1e293b/ffffff?text=GG',
  },
  {
    handle: '@style_sensei',
    quote: 'The CEO dashboard gives me the clarity to make real, data-driven decisions. My revenue is up 40%.',
    metric: '+40% Revenue',
    img: 'https://placehold.co/100x100/475569/ffffff?text=SS',
  },
  {
    handle: '@crafty_creator',
    quote: 'I can finally focus on creating, not logistics. CreatorFlow handles everything.',
    metric: '100% Focus',
    img: 'https://placehold.co/100x100/64748b/ffffff?text=CC',
  },
];

// Extend testimonials for seamless infinite scroll
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

// --- Testimonial Card Component ---
const TestimonialCard = ({ handle, quote, metric, img }: any) => {
  return (
    <div className='aspect-[4/3] w-[350px] flex-shrink-0 rounded-2xl bg-gradient-to-b from-muted/50 to-transparent p-1'>
      <div className='flex h-full w-full flex-col justify-between rounded-[15px] border border-border bg-card/30 p-6 shadow-lg backdrop-blur-2xl'>
        <div>
          <div className='flex items-center gap-4'>
            <img src={img} alt={handle} className='h-12 w-12 rounded-full border-2 border-border' />
            <div>
              <p className='font-bold text-card-foreground'>{handle}</p>
              <div className='flex text-yellow-400'>
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
                <Star size={14} fill='currentColor' />
              </div>
            </div>
          </div>
          <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>&ldquo;{quote}&rdquo;</p>
        </div>
        <motion.div
          className='mt-4 rounded-lg bg-accent/50 p-2 text-center'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className='bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-lg font-bold text-transparent'>
            {metric}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Testimonials Section ---
export function TestimonialsSection() {
  return (
    <section className='-mx-4 w-screen bg-background py-24 transition-colors duration-300'>
      <style jsx>{`
        .autoscroll-container {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        .scroller {
          animation: scroll 120s linear infinite;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
        <div className='mb-12 px-4 text-center'>
          <motion.h2
            className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            The Wall of Growth
          </motion.h2>
          <motion.p
            className='mx-auto mt-4 max-w-2xl text-base text-muted-foreground'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Join the creators who turned chaos into command. Their success is our foundation.
          </motion.p>
        </div>

        <motion.div
          className='autoscroll-container w-full'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className='scroller flex gap-8'>
            {extendedTestimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
