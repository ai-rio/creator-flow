'use client';

import { CheckIcon, PlayCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TradingHeroProps {
  title?: string;
  subtitle?: string;
  features?: string[];
  cta?: {
    primary: string;
    secondary: string;
  };
  socialProof?: string;
  className?: string;
}

export function TradingHero({
  subtitle = "The only fulfillment automation platform built for viral TikTok creators. Transform chaos into profit with CEO-grade automation.",
  features = [
    "🎯 TikTok Shop Integration - Direct API connection",
    "🚚 Automated Fulfillment - 30-second order processing", 
    "📊 CEO-Grade Analytics - Real-time business intelligence",
    "⚡ Viral-Ready Scaling - Handle 10x order spikes instantly"
  ],
  cta = {
    primary: "Start Free Trial",
    secondary: "Watch Demo"
  },
  socialProof = "Trusted by 2,000+ TikTok creators processing $50M+ in sales",
  className = ""
}: TradingHeroProps) {
  return (
    <section className={`mvp-trading-hero relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="text-center mb-16 animate-executive-entrance">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gradient-to-r from-tiktok-pink to-tiktok-blue rounded-full border-2 border-white/20" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">{socialProof}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Scale Your TikTok Shop
              </span>
              <br />
              <span className="bg-gradient-to-r from-executive-400 via-executive-300 to-executive-500 bg-clip-text text-transparent">
                from 50 to 500+ Orders
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="button-tiktok text-lg px-8 py-4 animate-authority-glow">
                {cta.primary}
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                {cta.secondary}
              </Button>
            </div>
          </div>

          {/* Trading Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            {/* Dashboard Frame */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl">
              <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden">
                
                {/* Dashboard Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-executive-400 to-executive-600 rounded-lg" />
                    <h3 className="text-white font-semibold text-lg">CreatorFlow Command Center</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-tiktok-connected">
                      TikTok Shop Connected
                    </div>
                  </div>
                </div>

                {/* Key Metrics Dashboard */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Today's Orders", value: "247", change: "+23%", color: "from-automation-400 to-automation-600" },
                      { label: "Revenue", value: "$12,847", change: "+18%", color: "from-executive-400 to-executive-600" },
                      { label: "Fulfillment Rate", value: "99.2%", change: "+0.8%", color: "from-data-art-400 to-data-art-600" },
                      { label: "Time Saved", value: "4.2hrs", change: "Daily", color: "from-clarity-400 to-clarity-600" }
                    ].map((metric, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover-lift">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-sm">{metric.label}</span>
                          <span className="text-automation-400 text-xs">{metric.change}</span>
                        </div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-white/90">
                        <div className="w-6 h-6 bg-automation-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-tiktok-pink/20 to-tiktok-blue/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-executive-400/20 to-executive-600/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-gradient-to-r from-executive-500/10 to-data-art-500/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-gradient-to-r from-automation-500/10 to-clarity-500/10 rounded-full blur-3xl opacity-20" />
    </section>
  );
}