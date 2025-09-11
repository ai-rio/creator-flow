/* eslint-disable */
'use client';

import React from 'react';

import IMActionButton from '../atoms/IM-ActionButton';

/**
 * IM-ActionGroup - Molecule component for grouped inventory actions
 *
 * A flexible container for grouping related action buttons with
 * consistent spacing and responsive layout. Provides keyboard
 * navigation and proper touch targets for mobile devices.
 *
 * @component
 * @example
 * ```tsx
 * <IMActionGroup
 *   actions={[
 *     { label: 'Auto-Order', onClick: handleAutoOrder, variant: 'primary' },
 *     { label: 'Manual', onClick: handleManual, variant: 'secondary' },
 *     { label: 'Defer', onClick: handleDefer, variant: 'outline' }
 *   ]}
 * />
 * ```
 */

interface ActionConfig {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

interface IMActionGroupProps {
  /** Array of action configurations */
  actions: ActionConfig[];
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Size variant for buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const IM_ActionGroup: React.FC<IMActionGroupProps> = ({
  actions,
  direction = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const containerClasses = direction === 'horizontal' ? 'flex flex-wrap gap-tactical' : 'flex flex-col gap-tactical';

  return (
    <div className={`${containerClasses} ${className}`} role='group' aria-label='Inventory actions'>
      {actions.map((action, index) => (
        <div key={`${action.label}-${index}`} className={direction === 'horizontal' ? 'min-w-20 flex-1' : ''}>
          <IMActionButton
            variant={action.variant || 'secondary'}
            onClick={action.onClick}
            disabled={action.disabled}
            loading={action.loading}
            className={`
              w-full
              ${size === 'sm' ? 'px-3 py-1.5 text-sm' : ''}
              ${size === 'md' ? 'px-4 py-2 text-base' : ''}
              ${size === 'lg' ? 'px-6 py-3 text-lg' : ''}
            `}
          >
            {action.label}
          </IMActionButton>
        </div>
      ))}
    </div>
  );
};

export default IM_ActionGroup;
