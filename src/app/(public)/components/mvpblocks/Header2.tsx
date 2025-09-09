'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

interface Header2Props {
  logo?: {
    text: string;
    href: string;
    icon?: string;
  };
  navigation?: NavigationItem[];
  cta?: {
    text: string;
    href: string;
    variant?: 'default' | 'tiktok' | 'executive';
  };
  sticky?: boolean;
  mobileOptimized?: boolean;
  className?: string;
}

export function Header2({
  logo = {
    text: 'CreatorFlow',
    href: '/',
    icon: '🚀'
  },
  navigation = [
    { name: 'Features', href: '#features', description: 'TikTok Shop automation tools' },
    { name: 'Pricing', href: '/pricing', description: 'Plans that scale with your growth' },
    { name: 'Success Stories', href: '#testimonials', description: 'Creator case studies' },
    { name: 'Resources', href: '/resources', description: 'Guides and documentation' }
  ],
  cta = {
    text: 'Start Free Trial',
    href: '/signup',
    variant: 'tiktok'
  },
  sticky = true,
  mobileOptimized = true,
  className = ""
}: Header2Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ctaClassName = {
    default: 'bg-primary hover:bg-primary/90',
    tiktok: 'button-tiktok',
    executive: 'button-executive'
  }[cta.variant || 'default'];

  return (
    <header className={`mvp-header-2 ${sticky ? 'sticky top-0 z-50' : ''} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href={logo.href} className="flex items-center gap-2 hover-lift">
            {logo.icon && (
              <span className="text-2xl" role="img" aria-label="CreatorFlow">
                {logo.icon}
              </span>
            )}
            <span className="text-2xl font-display font-bold text-foreground">
              {logo.text}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link group relative px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
                {item.description && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="text-xs text-gray-600 whitespace-nowrap">
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </Link>
            <Button asChild className={ctaClassName}>
              <Link href={cta.href}>
                {cta.text}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {mobileOptimized && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-foreground/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {mobileOptimized && isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-4 space-y-4">
              
              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-foreground/80 hover:bg-muted/50 rounded-md transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div>{item.name}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-border space-y-3">
                <Link 
                  href="/login" 
                  className="block w-full text-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Button asChild className={`w-full ${ctaClassName}`}>
                  <Link href={cta.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {cta.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}