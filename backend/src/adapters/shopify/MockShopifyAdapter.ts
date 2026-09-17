import { IShopifyAdapter } from './ShopifyAdapter.js';
import { AddToCartRequest, AddToCartResponse, ShopifyCartItem } from '@shared/types/cart.js';
import { ENV } from '../../config/environment.js';

export class MockShopifyAdapter implements IShopifyAdapter {
  async addItemToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    if (!request.pricing) {
      throw new Error('A pricing quote is required to create a cart item.');
    }
    const pricing = request.pricing;
    const cartId = `cart_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const lineItemId = `item_${Date.now().toString(36)}`;
    const variantId = `gid://shopify/ProductVariant/canopy-10x10-${pricing.total}`;

    // Properties adhering strictly to Shopify cart line item property specs
    const properties: Record<string, string> = {
      '_Configuration ID': request.configurationId,
      'Canopy Package': `$${(pricing.total || 0).toFixed(2)} Complete Custom Kit`,
      'Calculated Base Price': `$${(pricing.basePrice || 0).toFixed(2)}`,
      'Options & Hardware': `$${(pricing.optionAdjustments || 0).toFixed(2)}`,
      'Prepress & Artwork Proof': (pricing.customizationCost || 0) > 0 ? `$${(pricing.customizationCost || 0).toFixed(2)}` : 'Included',
      'Quote Verification Time': pricing.calculatedAt || new Date().toISOString(),
    };

    if (request.pdfDataUrl) {
      properties['_Production Specsheet PDF'] = `Attached (${request.configurationId}.pdf)`;
    }

    if (request.customerNotes) {
      properties['Customer Production Notes'] = request.customerNotes;
    }

    const item: ShopifyCartItem = {
      id: lineItemId,
      variantId,
      title: "10' × 10' Custom Logo Canopy Tent (Configured)",
      quantity: request.quantity || 1,
      price: pricing.total,
      properties,
      configurationId: request.configurationId,
      pdfUrl: request.pdfDataUrl,
      thumbnailUrl: request.thumbnailUrl,
    };

    const checkoutUrl = `https://${ENV.SHOPIFY_STORE_DOMAIN}/cart/${variantId}:${request.quantity || 1}?ref=configurator&cfg=${request.configurationId}`;

    return {
      success: true,
      cartId,
      checkoutUrl,
      item,
      message: `Successfully added ${request.quantity || 1} customized canopy kit to Shopify cart.`,
    };
  }

  async createDraftOrder(request: AddToCartRequest): Promise<{ draftOrderId: string; invoiceUrl: string }> {
    const draftOrderId = `gid://shopify/DraftOrder/${Date.now()}`;
    return {
      draftOrderId,
      invoiceUrl: `https://${ENV.SHOPIFY_STORE_DOMAIN}/checkout/drafts/${draftOrderId}`,
    };
  }
}

export const mockShopifyAdapter = new MockShopifyAdapter();
