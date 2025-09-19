'use client';

import {
  BarChart3,
  Check,
  ChevronDown,
  ChevronUp,
  LucideIcon,
  Package,
  Settings,
  Smartphone,
  Truck,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { cn } from '@/lib/utils';

// Icon rendering function
const renderIcon = (iconName: string, className?: string) => {
  const iconProps = { className };
  switch (iconName) {
    case 'zap':
      return <Zap {...iconProps} />;
    case 'truck':
      return <Truck {...iconProps} />;
    case 'chart-column':
      return <BarChart3 {...iconProps} />;
    case 'smartphone':
      return <Smartphone {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};

export interface FP010FeatureCardProps {
  iconName: string; // Changed from icon: LucideIcon
  title: string;
  description: string;
  benefits: string[];
  metrics: string[];
  color?: string;
  bgColor?: string;
}

/**
 * FP010FeatureCard - Feature Card Molecule
 *
 * Interactive card component showcasing individual features with expandable content.
 * Client-side component for interactivity and translation access.
 *
 * Features:
 * - Expandable benefits and metrics sections
 * - Icon-based visual identity
 * - Hover effects and smooth animations
 * - Accessibility support
 */
export function FP010FeatureCard({
  iconName,
  title,
  description,
  benefits,
  metrics,
  color = 'text-primary',
  bgColor = 'bg-primary/10',
}: FP010FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('components.atomic.molecules.FP010FeatureCard');

  return (
    <div className='group relative rounded-executive border border-border/20 bg-card p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
      {/* Icon */}
      <div className='mb-6 flex justify-center'>
        <div className={cn('rounded-premium p-4', bgColor)}>{renderIcon(iconName, cn('h-8 w-8', color))}</div>
      </div>

      {/* Title */}
      <h3 className='mb-4 text-center text-xl font-bold text-foreground'>{title}</h3>

      {/* Description */}
      <p className='mb-6 text-center leading-relaxed text-muted-foreground'>{description}</p>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex w-full items-center justify-center gap-2 rounded-premium border border-border/20 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted'
        aria-expanded={isExpanded}
        aria-controls={`feature-details-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {isExpanded ? t('collapse') : t('moreDetails')}
        {isExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div
          id={`feature-details-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className='mt-6 space-y-6 duration-300 animate-in slide-in-from-top-2'
        >
          {/* Benefits */}
          <div>
            <h4 className='mb-3 text-sm font-semibold text-foreground'>Key Benefits</h4>
            <ul className='space-y-2'>
              {benefits.map((benefit, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <Check className='text-success-emerald-500 mt-0.5 h-4 w-4 flex-shrink-0' />
                  <span className='text-sm text-muted-foreground'>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div>
            <h4 className='mb-3 text-sm font-semibold text-foreground'>Performance Metrics</h4>
            <div className='space-y-2'>
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={cn('rounded-premium px-3 py-2 text-center text-sm font-medium', bgColor, color)}
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background gradient effect */}
      <div className='absolute inset-0 -z-10 rounded-executive bg-gradient-to-br from-background via-transparent to-muted/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    </div>
  );
}
