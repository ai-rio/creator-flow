'use client';

import { ArrowRightIcon, CheckIcon, MailIcon, RocketIcon, TrendingUpIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FooterNewsletterProps {
  companyName?: string;
  description?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  socialLinks?: {
    platform: string;
    url: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}

export function FooterNewsletter({
  companyName = "CreatorFlow",
  description = "The only fulfillment automation platform built for viral TikTok creators.",
  newsletterTitle = "Scale Your TikTok Shop",
  newsletterDescription = "Get weekly insights, automation tips, and success stories from top TikTok creators.",
  socialLinks = [
    {
      platform: "TikTok",
      url: "https://tiktok.com/@creatorflow",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43V7.83a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.04.74z"/>
        </svg>
      )
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/creatorflow",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/creatorflow",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/@creatorflow",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ],
  className = ""
}: FooterNewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const quickLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '#testimonials' },
    { name: 'API Documentation', href: '/docs' }
  ];

  const resourceLinks = [
    { name: 'TikTok Shop Setup Guide', href: '/resources/tiktok-setup' },
    { name: 'Automation Best Practices', href: '/resources/automation' },
    { name: 'Creator Case Studies', href: '/resources/case-studies' },
    { name: 'Video Tutorials', href: '/resources/tutorials' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Creator Community', href: '/community' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <footer className={`footer-newsletter bg-slate-900 text-white ${className}`}>
      
      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-executive-500 via-executive-600 to-executive-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <MailIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {newsletterTitle}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {newsletterDescription}
            </p>

            {/* Newsletter Form */}
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white focus:ring-white/20"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-executive-600 hover:bg-white/90 font-semibold px-6 shrink-0"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-executive-600/30 border-t-executive-600 rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-automation-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">Welcome to CreatorFlow!</div>
                    <div className="text-white/80 text-sm">Check your email for TikTok automation tips</div>
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <TrendingUpIcon className="w-6 h-6" />,
                  title: "Weekly Success Stories",
                  description: "Real creator case studies & growth strategies"
                },
                {
                  icon: <ZapIcon className="w-6 h-6" />,
                  title: "Automation Tips",
                  description: "Expert insights to optimize your fulfillment"
                },
                {
                  icon: <RocketIcon className="w-6 h-6" />,
                  title: "Early Access",
                  description: "New features & beta program invitations"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <div className="text-white mb-2">{benefit.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{benefit.title}</div>
                  <div className="text-white/70 text-xs">{benefit.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🚀</span>
                <span className="text-2xl font-bold">{companyName}</span>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                {description}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mb-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    href={social.url}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>

              {/* TikTok Stats Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-tiktok-pink/20 to-tiktok-blue/20 border border-tiktok-blue/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-tiktok-blue rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium">
                  Live: 2,000+ Creators Processing Orders
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-3">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company & Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-3 mb-6">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/50 text-sm">
              © 2024 {companyName}. All rights reserved. Built for TikTok creators by creators.
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-automation-500 rounded-full" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-executive-500 rounded-full" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-data-art-500 rounded-full" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}