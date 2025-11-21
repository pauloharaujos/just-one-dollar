'use server';

import { getSession } from '@/services/admin/auth/jwtService';

/**
 * Server action to get current session
 */
export async function getSessionAction(): Promise<{ success: boolean; authenticated: boolean; admin?: any; error?: string }> {
  try {
    const session = await getSession();

    if (!session) {
      return { success: true, authenticated: false };
    }

    return {
      success: true,
      authenticated: true,
      admin: session,
    };
  } catch (error: any) {
    console.error('Session error:', error);
    return {
      success: false,
      authenticated: false,
      error: error.message || 'An error occurred while checking session',
    };
  }
}

