import prisma from '@/prisma/prismaClient';

export interface AdminUserData {
  email: string;
  password: string;
  name: string;
  role?: 'SUPER_ADMIN' | 'ADMIN';
}

export async function findAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({
    where: { email },
  });
}

export async function findAdminById(id: string) {
  return prisma.adminUser.findUnique({
    where: { id },
  });
}

export async function createAdminUser(data: AdminUserData) {
  return prisma.adminUser.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role || 'ADMIN',
    },
  });
}

export async function updateAdminUser(id: string, data: Partial<AdminUserData>) {
  return prisma.adminUser.update({
    where: { id },
    data: {
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
      ...(data.name && { name: data.name }),
      ...(data.role && { role: data.role }),
      updatedAt: new Date(),
    },
  });
}

export async function toggleAdminStatus(id: string, isActive: boolean) {
  return prisma.adminUser.update({
    where: { id },
    data: { isActive },
  });
}

export async function getAllAdmins() {
  return prisma.adminUser.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

