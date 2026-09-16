import { PricingQuote } from './pricing.js';

export interface ShopifyLineItemProperty {
  name: string;
  value: string;
}

export interface ShopifyCartItem {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  price: number;
  properties: Record<string, string>;
  configurationId: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
}

export interface AddToCartRequest {
  configurationId: string;
  quantity: number;
  pricing: PricingQuote;
  pdfDataUrl?: string;
  thumbnailUrl?: string;
  customerNotes?: string;
}

export interface AddToCartResponse {
  success: boolean;
  checkoutUrl: string;
  cartId: string;
  item: ShopifyCartItem;
  message: string;
}
