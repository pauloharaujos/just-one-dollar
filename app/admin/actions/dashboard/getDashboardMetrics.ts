'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getDashboardMetrics } from '@/services/admin/dashboardService';
import type { DashboardMetrics } from '@/services/admin/dashboardService';

/**
 * Server action to get dashboard metrics
 */
export async function getDashboardMetricsAction(): Promise<{ 
  success: boolean;
  metrics?: DashboardMetrics;
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const metrics = await getDashboardMetrics();

    return { success: true, metrics };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      success: false,
      error: 'An error occurred while fetching dashboard metrics',
    };
  }
}

