'use server';

import { redirect } from 'next/navigation';
import { authenticate } from '@/services/admin/auth/authenticationService';

export interface LoginActionState {
  error?: string;
}

/**
 * Server action to log in an admin user
 */
export async function loginAction(
  prevState: LoginActionState | null,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const result = await authenticate(email, password);

    if (!result.success) {
      return { error: result.error || 'Invalid credentials' };
    }

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }

  redirect('/admin/dashboard');
}

