import type { Metadata } from 'next';

import { Header2 } from '../components/mvpblocks/Header2';
import { Pricing5 } from '../components/mvpblocks/Pricing5';
import { TradingHero } from '../components/mvpblocks/TradingHero';

export const metadata: Metadata = {
  title: 'CreatorFlow - Scale Your TikTok Shop from 50 to 500+ Orders per Day',
  description: 'The only fulfillment automation platform built for viral TikTok creators. Transform chaos into profit with CEO-grade automation.',
  openGraph: {
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description: 'Scale your TikTok Shop from 50 to 500+ orders per day. Built for viral moments, designed for sustainable growth.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description: 'The only platform that keeps up with TikTok&apos;s pace',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <Header2 />

      {/* Hero Section */}
      <TradingHero 
        title="Scale Your TikTok Shop from 50 to 500+ Orders per Day"
        subtitle="The only fulfillment automation platform built for viral TikTok creators. Transform chaos into profit with CEO-grade automation."
        features={[
          "🎯 TikTok Shop Integration - Direct API connection",
          "🚚 Automated Fulfillment - 30-second order processing", 
          "📊 CEO-Grade Analytics - Real-time business intelligence",
          "⚡ Viral-Ready Scaling - Handle 10x order spikes instantly"
        ]}
        cta={{
          primary: "Start Free Trial",
          secondary: "Watch Demo"
        }}
        socialProof="Trusted by 2,000+ TikTok creators processing $50M+ in sales"
      />

      {/* Features Section - CDH InfoSections */}
      <section id="features" className="py-20 bg-clarity-background/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-executive text-4xl md:text-5xl mb-4">
              Built for TikTok&apos;s Pace
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From viral moments to sustainable growth - CreatorFlow handles every aspect of your TikTok Shop fulfillment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Clarity Over Chaos */}
            <div className="card-executive p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-clarity-400 to-clarity-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h3 className="heading-clarity text-xl mb-4">Order Orchestration</h3>
              <p className="text-muted-foreground">
                Transform TikTok Shop chaos into organized fulfillment. Every order processed in under 30 seconds with zero manual intervention.
              </p>
            </div>

            {/* Data is Art */}
            <div className="card-executive p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-data-art-400 to-data-art-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎨</span>
              </div>
              <h3 className="heading-artistic text-xl mb-4">Revenue Intelligence</h3>
              <p className="text-muted-foreground">
                Beautiful analytics that turn your TikTok Shop data into actionable business intelligence. See profit patterns in real-time.
              </p>
            </div>

            {/* Empowerment Through Automation */}
            <div className="card-executive p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-automation-400 to-automation-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="heading-automation text-xl mb-4">Fulfillment Automation</h3>
              <p className="text-muted-foreground">
                Complete automation from order to doorstep. Handle viral spikes without breaking a sweat or hiring more staff.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing5 />

      {/* Social Proof Section */}
      <section id="testimonials" className="py-20 bg-artistic-canvas/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-artistic text-4xl md:text-5xl mb-4">
            Trusted by Top TikTok Creators
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Join thousands of creators who&apos;ve scaled from chaos to CEO-level operations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                handle: "@sarahstyle",
                metric: "10x Revenue Growth",
                quote: "CreatorFlow turned my TikTok Shop from a side hustle into a $50K/month business. The automation is incredible.",
                avatar: "SC"
              },
              {
                name: "Marcus Rodriguez",
                handle: "@fitnessmarc",
                metric: "500+ Orders/Day",
                quote: "When my workout videos went viral, CreatorFlow handled the order surge seamlessly. No stressed nights anymore.",
                avatar: "MR"
              },
              {
                name: "Emma Thompson",
                handle: "@homestyle",
                metric: "99.8% Fulfillment Rate",
                quote: "The CEO-grade analytics help me make data-driven decisions. I feel like I&apos;m running a real business now.",
                avatar: "ET"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover-executive">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.handle}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-automation-600 mb-4">
                  {testimonial.metric}
                </div>
                <p className="text-muted-foreground italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-executive-500 via-executive-600 to-executive-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Scale Your TikTok Shop?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join 2,000+ creators who&apos;ve transformed their TikTok Shop chaos into CEO-level operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-executive-600 hover:bg-white/90 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-1 shadow-lg">
              Start Free Trial
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 font-semibold px-8 py-4 rounded-lg text-lg transition-all">
              Schedule Demo
            </button>
          </div>
          <div className="mt-8 text-white/70 text-sm">
            No credit card required • 30-day free trial • Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🚀</span>
                <span className="text-xl font-bold">CreatorFlow</span>
              </div>
              <p className="text-white/70 mb-6">
                The only fulfillment automation platform built for viral TikTok creators.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-white/70">
                <div>Features</div>
                <div>Pricing</div>
                <div>Integrations</div>
                <div>API</div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-white/70">
                <div>Documentation</div>
                <div>Success Stories</div>
                <div>Blog</div>
                <div>Support</div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-white/70">
                <div>About</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50">
            © 2024 CreatorFlow. All rights reserved. Built for TikTok creators by creators.
          </div>
        </div>
      </footer>
    </>
  );
}