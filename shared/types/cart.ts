import { PricingQuote } from './pricing.js';

export interface ShopifyCartItem {
  id?: string;
  variantId: string;
  quantity: number;
  title?: string;
  price?: number;
  properties?: Record<string, string>;
  configurationId?: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
}

export interface AddToCartRequest {
  configurationId: string;
  productId: string;
  variantId?: string;
  quantity?: number;
  pricing?: PricingQuote;
  customerNotes?: string;
  pdfDataUrl?: string;
  thumbnailUrl?: string;
}

export interface AddToCartResponse {
  success: boolean;
  cartId?: string;
  checkoutUrl?: string;
  item?: ShopifyCartItem;
  message?: string;
}
