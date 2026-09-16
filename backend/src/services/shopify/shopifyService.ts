import { IShopifyAdapter } from '../../adapters/shopify/ShopifyAdapter.js';
import { mockShopifyAdapter } from '../../adapters/shopify/MockShopifyAdapter.js';
import { realShopifyAdapter } from '../../adapters/shopify/RealShopifyAdapter.js';
import { AddToCartRequest, AddToCartResponse } from '@shared/types/cart.js';

export class ShopifyService {
  private adapter: IShopifyAdapter;

  constructor() {
    // If public token is active and non-mock, use real adapter; otherwise mock
    const token = process.env.VITE_SHOPIFY_PUBLIC_TOKEN;
    if (token && !token.startsWith('mock_')) {
      this.adapter = realShopifyAdapter;
    } else {
      this.adapter = mockShopifyAdapter;
    }
  }

  async addToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    if (!request.configurationId) {
      throw new Error('Cannot add to cart: Configuration ID is missing.');
    }
    if (!request.pricing || request.pricing.total <= 0) {
      throw new Error('Cannot add to cart: Valid pricing quote is required.');
    }
    return this.adapter.addItemToCart(request);
  }
}

export const shopifyService = new ShopifyService();
