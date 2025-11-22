import * as orderRepository from '@/repository/orderRepository';
import type { OrderStatus } from '@/prisma/generated';

/**
 * List orders with filters and pagination
 */
export async function listOrders(filters: {
  status?: OrderStatus;
  search?: string;
  userId?: string;
} = {}, pagination: {
  page?: number;
  limit?: number;
} = {}) {
  return orderRepository.getAllOrders(filters, pagination);
}

/**
 * Get a single order by ID
 */
export async function getOrder(id: number) {
  return orderRepository.getOrderById(id);
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: number, status: OrderStatus) {
  const order = await orderRepository.getOrderById(id);
  
  if (!order) {
    throw new Error('Order not found');
  }

  // Validate status transition if needed
  const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'REFUNDED'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid order status');
  }

  return orderRepository.updateOrderStatus(id, status);
}

/**
 * Get order count
 */
export async function getOrderCount(filters: {
  status?: OrderStatus;
  search?: string;
  userId?: string;
} = {}) {
  return orderRepository.getOrdersCount(filters);
}

