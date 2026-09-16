import { apiRequest } from '../api/apiClient.js';
import { AddToCartRequest, AddToCartResponse } from '@shared/types/cart.js';

export async function addConfigurationToShopifyCart(request: AddToCartRequest): Promise<AddToCartResponse> {
  return apiRequest<AddToCartResponse>('/api/shopify/cart', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
