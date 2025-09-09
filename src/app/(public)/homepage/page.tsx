import type { Metadata } from 'next';

import { FooterNewsletter } from '../components/mvpblocks/FooterNewsletter';
import { Header2 } from '../components/mvpblocks/Header2';
import { Pricing5 } from '../components/mvpblocks/Pricing5';
import { TestimonialsMarquee } from '../components/mvpblocks/TestimonialsMarquee';
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

      {/* Social Proof - Enhanced Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* Pricing Section */}
      <Pricing5 />

      {/* Additional Features Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-executive text-4xl md:text-5xl mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From your first sale to your millionth order, CreatorFlow grows with your TikTok Shop success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* TikTok Shop Integration */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover-executive">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">🔗</span>
                </div>
                <h3 className="text-xl font-semibold">TikTok Shop Native</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Direct API integration with TikTok Shop. Orders sync instantly, no delays, no manual work.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Real-time order synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Automatic inventory updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Viral spike protection</span>
                </li>
              </ul>
            </div>

            {/* Smart Fulfillment */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover-executive">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-automation-400 to-automation-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">🚚</span>
                </div>
                <h3 className="text-xl font-semibold">Smart Fulfillment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-powered shipping optimization. Always choose the fastest, cheapest option automatically.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Multi-carrier optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Bulk label generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Tracking automation</span>
                </li>
              </ul>
            </div>

            {/* CEO Analytics */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover-executive">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-executive-400 to-executive-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">📈</span>
                </div>
                <h3 className="text-xl font-semibold">CEO-Grade Analytics</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Business intelligence that helps you make million-dollar decisions with confidence.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Profit margin analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Viral content correlation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-automation-500 rounded-full"></div>
                  <span>Predictive forecasting</span>
                </li>
              </ul>
            </div>

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

      {/* Enhanced Footer with Newsletter */}
      <FooterNewsletter />
    </>
  );
}