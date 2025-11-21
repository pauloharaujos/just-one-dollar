import { Order, OrderStatus, Prisma } from '@/prisma/generated';
import prisma from '@/prisma/prismaClient';

type OrderCreateInput = Prisma.OrderCreateInput;

export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
    billingAddress: true;
    shippingAddress: true;
    user: true;
  };
}>;

/**
 * Generate a unique order number
 */
export async function generateOrderNumber(): Promise<string> {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const orderNumber = `${prefix}-${timestamp}-${random}`;

  return orderNumber;
}

/**
 * Create a new order
 */
export async function createOrder(data: OrderCreateInput): Promise<OrderWithDetails> {
  return await prisma.order.create({
    data,
    include: {
      orderItems: {
        include: {
          product: true
        }
      },
      billingAddress: true,
      shippingAddress: true,
      user: true
    }
  });
}

/**
 * Get order by ID
 */
export async function getOrderById(id: number): Promise<OrderWithDetails | null> {
  return await prisma.order.findFirst({
    where: { 
      id
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      },
      billingAddress: true,
      shippingAddress: true,
      user: true
    }
  });
}

/**
 * Get order by order number
 */
export async function getOrderByOrderNumber(orderNumber: string): Promise<OrderWithDetails | null> {
  return await prisma.order.findFirst({
    where: { 
      orderNumber
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      },
      billingAddress: true,
      shippingAddress: true,
      user: true
    }
  });
}

/**
 * Get orders by user ID
 */
export async function getOrdersByUserId(
  userId: string,
  limit = 20,
  offset = 0
): Promise<OrderWithDetails[] | null> {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: true
        }
      },
      billingAddress: true,
      shippingAddress: true,
      user: true
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset
  });
}

/**
 * Get total count of orders by user ID
 */
export async function getOrdersCountByUserId(userId: string): Promise<number> {
  return await prisma.order.count({
    where: { userId }
  });
}

/**
 * Get all orders with filters and pagination
 */
export async function getAllOrders(filters: {
  status?: OrderStatus;
  search?: string;
  userId?: string;
} = {}, pagination: {
  page?: number;
  limit?: number;
} = {}) {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.search) {
    where.OR = [
      { orderNumber: { contains: filters.search, mode: 'insensitive' } },
      { user: { name: { contains: filters.search, mode: 'insensitive' } } },
      { user: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        billingAddress: true,
        shippingAddress: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: number, status: OrderStatus) {
  return prisma.order.update({
    where: { id },
    data: { status, updatedAt: new Date() },
  });
}

/**
 * Get order count
 */
export async function getOrdersCount(filters: {
  status?: OrderStatus;
  search?: string;
  userId?: string;
} = {}) {
  const where: any = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.search) {
    where.OR = [
      { orderNumber: { contains: filters.search, mode: 'insensitive' } },
      { user: { name: { contains: filters.search, mode: 'insensitive' } } },
      { user: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  return prisma.order.count({ where });
}
