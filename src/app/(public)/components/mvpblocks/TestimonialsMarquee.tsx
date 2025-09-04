'use client';

import { QuoteIcon, StarIcon } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  name: string;
  handle: string;
  metric: string;
  quote: string;
  avatar: string;
  verified?: boolean;
  category?: 'creator' | 'business' | 'agency';
}

interface TestimonialsMarqueeProps {
  testimonials?: Testimonial[];
  speed?: 'slow' | 'medium' | 'fast';
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    handle: "@sarahstyle",
    metric: "10x Revenue Growth",
    quote: "CreatorFlow turned my TikTok Shop from a side hustle into a $50K/month business. The automation is incredible.",
    avatar: "SC",
    verified: true,
    category: 'creator'
  },
  {
    name: "Marcus Rodriguez", 
    handle: "@fitnessmarc",
    metric: "500+ Orders/Day",
    quote: "When my workout videos went viral, CreatorFlow handled the order surge seamlessly. No stressed nights anymore.",
    avatar: "MR",
    verified: true,
    category: 'creator'
  },
  {
    name: "Emma Thompson",
    handle: "@homestyle", 
    metric: "99.8% Fulfillment Rate",
    quote: "The CEO-grade analytics help me make data-driven decisions. I feel like I&apos;m running a real business now.",
    avatar: "ET",
    verified: true,
    category: 'creator'
  },
  {
    name: "David Kim",
    handle: "@techreviews",
    metric: "$2M+ Processed",
    quote: "CreatorFlow scaled with my viral tech reviews. From 10 to 1000+ orders without hiring anyone.",
    avatar: "DK",
    verified: true,
    category: 'creator'
  },
  {
    name: "Priya Patel", 
    handle: "@beautybypriya",
    metric: "85% Time Saved",
    quote: "I used to spend 6 hours daily on orders. Now it&apos;s 30 minutes. CreatorFlow gave me my life back.",
    avatar: "PP",
    verified: true,
    category: 'creator'
  },
  {
    name: "Alex Johnson",
    handle: "@cookingwithalex",
    metric: "300% Growth",
    quote: "My cooking videos exploded and so did orders. CreatorFlow handled everything while I focused on content.",
    avatar: "AJ",
    verified: true,
    category: 'creator'
  },
  {
    name: "Lisa Wang",
    handle: "@fashionforward",
    metric: "Zero Order Errors",
    quote: "Perfect fulfillment every time. My customers are happy and my stress levels are at zero.",
    avatar: "LW",
    verified: true,
    category: 'creator'
  },
  {
    name: "Mike Chen",
    handle: "@gadgetguru",
    metric: "20x Scale",
    quote: "From 50 to 1000+ daily orders. CreatorFlow&apos;s automation is like having a team of 20 people.",
    avatar: "MC",
    verified: true,
    category: 'business'
  }
];

export function TestimonialsMarquee({
  testimonials = defaultTestimonials,
  speed = 'medium',
  pauseOnHover = true,
  direction = 'left',
  className = ""
}: TestimonialsMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  const speedClass = {
    slow: 'animate-marquee-slow',
    medium: 'animate-marquee-medium', 
    fast: 'animate-marquee-fast'
  }[speed];

  const directionClass = direction === 'right' ? 'reverse' : '';

  return (
    <section className={`mvp-testimonials-marquee py-20 bg-artistic-canvas/10 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            Trusted by Top TikTok Creators
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of creators who&apos;ve scaled from chaos to CEO-level operations
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Testimonials */}
        <div 
          className={`flex gap-6 ${speedClass} ${directionClass} ${isPaused && pauseOnHover ? 'paused' : ''}`}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          style={{
            width: 'fit-content',
            animationDirection: direction === 'right' ? 'reverse' : 'normal'
          }}
        >
          {/* First set of testimonials */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
          ))}
          
          {/* Duplicate for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="min-w-[120px]">
            <div className="text-3xl font-bold text-amber-600">2,000+</div>
            <div className="text-sm text-slate-600">Active Creators</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-3xl font-bold text-purple-600">$50M+</div>
            <div className="text-sm text-slate-600">Sales Processed</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-3xl font-bold text-green-600">99.2%</div>
            <div className="text-sm text-slate-600">Fulfillment Rate</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-slate-600">Automation</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const categoryColor = {
    creator: 'from-pink-500 to-blue-400',
    business: 'from-amber-400 to-orange-600', 
    agency: 'from-purple-400 to-purple-600'
  }[testimonial.category || 'creator'];

  return (
    <div className="testimonial-card bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-w-[350px] max-w-[350px] flex-shrink-0">
      {/* Header with Avatar and Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${categoryColor} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
          {testimonial.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-slate-900">{testimonial.name}</div>
            {testimonial.verified && (
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="text-sm text-slate-500">{testimonial.handle}</div>
        </div>
      </div>

      {/* Metric */}
      <div className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
        <StarIcon className="w-5 h-5 text-green-500" />
        {testimonial.metric}
      </div>

      {/* Quote */}
      <div className="relative">
        <QuoteIcon className="absolute -top-2 -left-2 w-8 h-8 text-slate-300" />
        <p className="text-slate-600 italic leading-relaxed pl-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* TikTok-style interaction hint */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-pink-500/20" />
            <span>Viral Success</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-500/20" />
            <span>Automated</span>
          </div>
        </div>
      </div>
    </div>
  );
}