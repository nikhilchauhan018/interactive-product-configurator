import { ShopifyCartItem, AddToCartRequest, AddToCartResponse } from '@shared/types/cart.js';

export interface IShopifyAdapter {
  addItemToCart(request: AddToCartRequest): Promise<AddToCartResponse>;
  createDraftOrder(request: AddToCartRequest): Promise<{ draftOrderId: string; invoiceUrl: string }>;
}
