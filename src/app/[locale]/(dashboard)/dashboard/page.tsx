import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Import our new bento CEO dashboard system
import { BentoCEODashboard } from '@/components/atomic/compositions/dashboard/BentoCEODashboard';
import { getSession } from '@/features/account/controllers/get-session';

export const metadata: Metadata = {
  title: 'CreatorFlow CEO Dashboard - Business Intelligence & Automation Control',
  description:
    'Real-time TikTok Shop business intelligence with cross-system automation controls. Monitor orders, inventory, and revenue from one unified command center.',
  robots: 'noindex, nofollow', // Private authenticated page
};

/**
 * CreatorFlow CEO Dashboard with Enhanced Bento Grid Layout
 *
 * Features:
 * - Mobile CEO command center with desktop expansion
 * - Real-time business intelligence from all systems
 * - Cross-system integration with 96 enhanced touchpoints
 * - Enhanced wireframes implementation from S003-DRAFT
 * - Localization-ready with NextIntl integration
 * - Performance-optimized for <2 second mobile load times
 */
export default async function DashboardPage() {
  // Check authentication
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // Real-time business metrics - in production these would come from API
  const dashboardStats = {
    todayRevenue: 18420, // Today's revenue in dollars
    monthlyRevenue: 347890, // Monthly revenue in dollars
    ordersProcessed: 156, // Orders processed today
    automationSavings: 47, // Time saved by automation (percentage)
    systemHealth: 'excellent' as const, // Overall system health status
  };

  return <BentoCEODashboard stats={dashboardStats} userId={session.user.id} className='min-h-screen' />;
}
