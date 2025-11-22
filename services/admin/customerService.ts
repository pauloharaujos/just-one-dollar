import * as customerRepository from '@/repository/customerRepository';

/**
 * List customers with filters and pagination
 */
export async function listCustomers(filters: {
  search?: string;
} = {}, pagination: {
  page?: number;
  limit?: number;
} = {}) {
  return customerRepository.getAllCustomers(filters, pagination);
}

/**
 * Get a single customer by ID
 */
export async function getCustomer(id: string) {
  return customerRepository.getCustomerByIdWithOrders(id);
}

/**
 * Get customer count
 */
export async function getCustomerCount(filters: {
  search?: string;
} = {}) {
  return customerRepository.getCustomersCount(filters);
}

