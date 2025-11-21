import prisma from '@/prisma/prismaClient';
import type { User } from '@/prisma/generated';

export async function getCustomerById(customerId: string): Promise<User | null> {
    try {
        const data = await prisma.user.findUnique({
            where: { id: customerId }
        });

        return data;
    } catch (err) {
        console.log(`Error while loading customer by id ${err}`);
        throw new Error(`Error while loading customer by id ${err}`);
    }
}

export async function getCustomerByEmail(email: string): Promise<User | null> {
    try {
        const data = await prisma.user.findUnique({
            where: { email }
        });

        return data;
    } catch (err) {
        console.log(`Error while loading customer by email ${err}`);
        throw new Error(`Error while loading customer by email ${err}`);
    }
}

export async function updateCustomerInfo(
    email: string,
    data: { 
        name?: string; 
        cpf?: string; 
        phone?: string; 
        age?: number 
    }
): Promise<boolean> {
    try {
        await prisma.user.update({
            where: { email: email },
            data,
        });

        return true;
    } catch (err) {
        console.log(`Error while updating customer info: ${err}`);
        throw new Error(`Error while updating customer info: ${err}`);
    }
}

/**
 * Get all customers with filters and pagination
 */
export async function getAllCustomers(filters: {
  search?: string;
} = {}, pagination: {
  page?: number;
  limit?: number;
} = {}) {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      { phone: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        orders: {
          select: {
            id: true,
            orderNumber: true,
            total: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        _count: {
          select: {
            orders: true,
            addresses: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    customers,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Get customer by ID with orders
 */
export async function getCustomerByIdWithOrders(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: true,
          orderPayment: true,
        },
      },
      addresses: {
        orderBy: { isDefault: 'desc' },
      },
    },
  });
}

/**
 * Get customers count
 */
export async function getCustomersCount(filters: {
  search?: string;
} = {}) {
  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      { phone: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return prisma.user.count({ where });
}