'use client';

import { motion } from 'framer-motion';
import { BarChart3, Bot, LayoutDashboard, Package, Plus } from 'lucide-react';
import React, { useState } from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface NavItem {
  id: string;
  icon: any;
  isFab?: boolean;
  label?: string;
}

interface MobileNavBarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onCreateAction?: () => void;
  className?: string;
}

// ==================== CONSTANTS ====================

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'orders', icon: Package, label: 'Orders' },
  { id: 'create', icon: Plus, isFab: true, label: 'Create' },
  { id: 'automation', icon: Bot, label: 'Automation' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
];

// ==================== SUPPORTING COMPONENTS ====================

/**
 * Glass morphism pane with proper design system tokens
 */
const GlassPane = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'border border-border/10 bg-background/30 shadow-lg backdrop-blur-xl',
      'dark:border-border/10 dark:bg-background/20',
      className
    )}
  >
    {children}
  </div>
);

/**
 * Floating Action Button with elevated design
 */
const FloatingActionButton = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    className={cn(
      '-translate-y-6 rounded-full p-4 shadow-lg',
      'bg-primary text-primary-foreground',
      'shadow-primary/50'
    )}
  >
    {children}
  </motion.button>
);

/**
 * Regular navigation button with active state indicator
 */
const NavButton = ({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    className={cn(
      'relative z-10 rounded-full p-3 transition-colors',
      isActive ? 'text-primary dark:text-primary' : 'text-muted-foreground hover:text-foreground'
    )}
  >
    <item.icon size={24} />

    {/* Active indicator with layout animation */}
    {isActive && (
      <motion.div
        layoutId='active-nav-indicator'
        className={cn('absolute inset-0 -z-10 rounded-full', 'bg-primary/10 dark:bg-primary/20')}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      />
    )}
  </motion.button>
);

// ==================== MAIN COMPONENT ====================

/**
 * Mobile navigation bar with FAB (Floating Action Button) and nav items
 * Features glass morphism design, smooth animations, and layout transitions
 */
export function MobileNavBar({ activeTab = 'dashboard', onTabChange, onCreateAction, className }: MobileNavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab);

  // Use controlled or uncontrolled state
  const currentActiveTab = onTabChange ? activeTab : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.5 }}
      className={cn('fixed bottom-2 left-2 right-2 z-40', className)}
    >
      <GlassPane className='rounded-2xl p-2'>
        <div className='flex items-center justify-around'>
          {DEFAULT_NAV_ITEMS.map((item) => (
            <div key={item.id} className='relative flex flex-1 justify-center'>
              {item.isFab ? (
                <FloatingActionButton onClick={onCreateAction}>
                  <Plus size={32} />
                </FloatingActionButton>
              ) : (
                <NavButton
                  item={item}
                  isActive={currentActiveTab === item.id}
                  onClick={() => handleTabChange(item.id)}
                />
              )}
            </div>
          ))}
        </div>
      </GlassPane>
    </motion.div>
  );
}

export default MobileNavBar;
