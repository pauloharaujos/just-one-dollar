'use server';

import { redirect } from 'next/navigation';
import { logout } from '@/services/admin/auth/authenticationService';

/**
 * Server action to log out the admin user
 */
export async function logoutAction() {
  try {
    await logout();
  } catch (error) {
    console.error('Logout error:', error);
  }

  redirect('/admin/login');
}

