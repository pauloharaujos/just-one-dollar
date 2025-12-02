import { comparePassword } from './passwordService';
import { createSession, getSession, destroySession } from './jwtService';
import { findAdminByEmail } from '@/repository/adminUserRepository';

/**
 * Authenticates an admin user with email and password
 */
export async function authenticate(email: string, password: string) {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    return {
      success: false,
      error: 'Invalid credentials',
    };
  }

  if (!admin.isActive) {
    return {
      success: false,
      error: 'Account is inactive',
    };
  }

  const isValid = await comparePassword(password, admin.password);

  if (!isValid) {
    return {
      success: false,
      error: 'Invalid credentials',
    };
  }

  await createSession({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  return {
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  };
}

/**
 * Validates the current session
 */
export async function validateSession() {
  return await getSession();
}

/**
 * Logs out the current admin user
 */
export async function logout() {
  await destroySession();
  return { success: true };
}

