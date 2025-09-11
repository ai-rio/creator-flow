/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

/**
 * IM-StockAlert - Molecule component for AI-generated stock suggestions
 *
 * A specialized alert component that displays AI-generated inventory
 * suggestions with proper visual hierarchy, animations, and accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <IMStockAlert
 *   suggestion={500}
 *   reason="Based on viral video trend and current velocity"
 *   confidence={0.92}
 * />
 * ```
 */

interface IMStockAlertProps {
  /** Suggested quantity to reorder */
  suggestion: number;
  /** AI reasoning for the suggestion */
  reason?: string;
  /** Confidence level (0-1) */
  confidence?: number;
  /** Alert severity */
  severity?: 'info' | 'warning' | 'critical';
  /** Additional CSS classes */
  className?: string;
  /** Optional action handler */
  onAccept?: () => void;
  /** Optional dismiss handler */
  onDismiss?: () => void;
}

const severityConfig = {
  info: {
    bgColor: 'bg-brand-blue-primary/10',
    borderColor: 'border-brand-blue-primary/20',
    iconColor: 'text-brand-blue-primary',
    textColor: 'text-brand-blue-primary',
  },
  warning: {
    bgColor: 'bg-warning-amber-500/10',
    borderColor: 'border-warning-amber-500/20',
    iconColor: 'text-warning-amber-500',
    textColor: 'text-warning-amber-500',
  },
  critical: {
    bgColor: 'bg-brand-purple-primary/10',
    borderColor: 'border-brand-purple-primary/20',
    iconColor: 'text-brand-purple-primary',
    textColor: 'text-brand-purple-primary',
  },
};

const IM_StockAlert: React.FC<IMStockAlertProps> = ({
  suggestion,
  reason = 'AI recommendation based on current trends',
  confidence = 0.85,
  severity = 'warning',
  className = '',
  onAccept,
  onDismiss,
}) => {
  const config = severityConfig[severity];

  const formattedSuggestion = suggestion.toLocaleString();
  const confidencePercent = Math.round(confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={className}
    >
      <Card
        className={`
        rounded-premium border ${config.borderColor} ${config.bgColor} p-tactical
        backdrop-blur-sm
      `}
      >
        <div className='flex items-start gap-tactical'>
          {/* AI Icon */}
          <motion.div
            className={`rounded-full bg-background/50 p-2 ${config.iconColor}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Zap className='h-5 w-5' />
          </motion.div>

          {/* Content */}
          <div className='flex-1 space-y-2'>
            <div className='flex items-center gap-2'>
              <p className={`text-body-sm font-semibold ${config.textColor}`}>AI Suggestion</p>
              <Badge variant='secondary' className='text-xs'>
                {confidencePercent}% confidence
              </Badge>
            </div>

            <p className='text-body-md font-medium text-foreground'>
              Auto-reorder <span className='text-metric-md font-bold'>{formattedSuggestion}</span> units
            </p>

            {reason && <p className='text-body-sm text-muted-foreground'>{reason}</p>}
          </div>
        </div>

        {/* Action buttons */}
        {(onAccept || onDismiss) && (
          <div className='mt-tactical flex gap-2 border-t border-border/20 pt-2'>
            {onAccept && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAccept}
                className={`
                  rounded-premium px-3 py-1.5 text-body-sm font-medium
                  ${config.bgColor.replace('/10', '/80')} ${config.textColor}
                  transition-colors hover:bg-opacity-90
                `}
              >
                Accept
              </motion.button>
            )}
            {onDismiss && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDismiss}
                className='rounded-premium px-3 py-1.5 text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Dismiss
              </motion.button>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default IM_StockAlert;
