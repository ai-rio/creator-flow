'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import React, { useState } from 'react';

// Glass morphism component using design tokens
const GlassPane: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-border bg-glass-content-light backdrop-blur-xl dark:bg-glass-content-dark ${className}`}
  >
    {children}
  </div>
);

// Control button with proper contrast design tokens
const ControlButton = ({
  tooltip,
  isDanger = false,
  onAction,
  children,
}: {
  tooltip?: string;
  isDanger?: boolean;
  onAction?: () => void;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='relative w-full' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onAction}
        className={`w-full rounded-lg px-3 py-2 text-center text-sm font-bold transition-colors ${
          isDanger
            ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:hover:bg-destructive/20'
            : 'bg-muted/50 text-foreground hover:bg-muted dark:text-foreground dark:hover:bg-muted'
        }`}
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className='absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 p-0'
          >
            <GlassPane className='px-3 py-1.5'>
              <p className='text-xs font-semibold text-foreground'>{tooltip}</p>
            </GlassPane>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hold-to-confirm button with proper contrast
const HoldToConfirmButton = ({ tooltip }: { tooltip?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHoldStart = () => {
    controls
      .start({
        width: '100%',
        transition: { duration: 1.5, ease: 'linear' },
      })
      .then(() => {
        // Emergency action confirmed - replace console.log with actual action
        // Add actual action dispatch here
      });
  };

  const handleHoldEnd = () => {
    controls.stop();
    controls.set({ width: '0%' });
  };

  return (
    <div className='relative w-full' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.button
        onTapStart={handleHoldStart}
        onTapCancel={handleHoldEnd}
        onTap={handleHoldEnd}
        className='relative w-full overflow-hidden rounded-lg bg-destructive/10 px-3 py-2 text-center text-sm font-bold text-destructive transition-colors hover:bg-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:hover:bg-destructive/20'
      >
        <motion.div
          className='absolute left-0 top-0 h-full bg-destructive/50 dark:bg-destructive/50'
          initial={{ width: '0%' }}
          animate={controls}
        />
        <span className='relative z-10'>Hold to Stop</span>
      </motion.button>
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className='absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 p-0'
          >
            <GlassPane className='px-3 py-1.5'>
              <p className='text-xs font-semibold text-foreground'>{tooltip}</p>
            </GlassPane>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main emergency controls component
export const EmergencySystemControlsCard = () => {
  const controlGroups = [
    {
      title: 'CRISIS MANAGEMENT',
      controls: [
        { label: 'Hold to Stop', isDanger: true, tooltip: 'Press and hold to halt all system automations.' },
        { label: 'Traffic Routing', tooltip: 'Redirect incoming user traffic.' },
      ],
    },
    {
      title: 'BULK OPERATIONS',
      controls: [
        { label: 'Mass Order Update', tooltip: 'Apply a status update to a batch of orders.' },
        { label: 'Force Inventory Sync', tooltip: 'Initiate a full sync across all inventory.' },
      ],
    },
    {
      title: 'SYSTEM SCALING',
      controls: [
        { label: 'Auto-Scale Up', tooltip: 'Provision additional resources for 1 hour.' },
        { label: 'Performance Mode', tooltip: 'Prioritize system speed over background tasks.' },
      ],
    },
    {
      title: 'DATA OPERATIONS',
      controls: [
        { label: 'Trigger Backup', tooltip: 'Create a manual snapshot of the database.' },
        { label: 'Sync Validation', tooltip: 'Run a checksum on all connected data.' },
      ],
    },
  ];

  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 0px 0px hsla(0, 100%, 50%, 0)',
          '0 0 0px 4px hsla(0, 100%, 50%, 0.3)',
          '0 0 0px 0px hsla(0, 100%, 50%, 0)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className='space-y-4 rounded-3xl'
    >
      <div className='flex items-center gap-3 px-2 pt-4 sm:pt-0'>
        <ShieldAlert className='text-destructive' />
        <h2 className='text-xl font-bold text-foreground'>EMERGENCY SYSTEM CONTROLS</h2>
      </div>
      <GlassPane className='p-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {controlGroups.map((group) => (
            <div key={group.title} className='space-y-2'>
              <h3 className='text-sm font-bold tracking-wider text-foreground/70'>{group.title}</h3>
              <div className='flex flex-col gap-2 sm:flex-row'>
                {group.controls.map((control) =>
                  control.isDanger ? (
                    <HoldToConfirmButton key={control.label} tooltip={control.tooltip} />
                  ) : (
                    <ControlButton key={control.label} tooltip={control.tooltip}>
                      {control.label}
                    </ControlButton>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassPane>
    </motion.div>
  );
};

export default EmergencySystemControlsCard;
