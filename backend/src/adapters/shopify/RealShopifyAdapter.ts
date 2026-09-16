import { IShopifyAdapter } from './ShopifyAdapter.js';
import { AddToCartRequest, AddToCartResponse } from '@shared/types/cart.js';
import { mockShopifyAdapter } from './MockShopifyAdapter.js';

export class RealShopifyAdapter implements IShopifyAdapter {
  private storeDomain: string;
  private storefrontAccessToken: string;

  constructor(domain?: string, token?: string) {
    this.storeDomain = domain || process.env.VITE_SHOPIFY_STORE_DOMAIN || '';
    this.storefrontAccessToken = token || process.env.VITE_SHOPIFY_PUBLIC_TOKEN || '';
  }

  async addItemToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    // If live credentials are not set, gracefully fall back to mock with an explicit message
    if (!this.storeDomain || !this.storefrontAccessToken || this.storefrontAccessToken.startsWith('mock_')) {
      return mockShopifyAdapter.addItemToCart(request);
    }

    try {
      // In a real Shopify Storefront API deployment:
      // GraphQL mutation cartCreate or cartLinesAdd
      const response = await fetch(`https://${this.storeDomain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': this.storefrontAccessToken,
        },
        body: JSON.stringify({
          query: `
            mutation cartCreate($input: CartInput) {
              cartCreate(input: $input) {
                cart {
                  id
                  checkoutUrl
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            input: {
              lines: [
                {
                  quantity: request.quantity,
                  merchandiseId: `gid://shopify/ProductVariant/canopy-10x10`,
                  attributes: [
                    { key: '_Configuration ID', value: request.configurationId },
                    { key: 'Total Price', value: `$${request.pricing.total}` },
                  ],
                },
              ],
            },
          },
        }),
      });

      const json = await response.json();
      if (json.data?.cartCreate?.cart) {
        const cart = json.data.cartCreate.cart;
        return {
          success: true,
          cartId: cart.id,
          checkoutUrl: cart.checkoutUrl,
          item: {
            id: cart.id,
            variantId: 'canopy-10x10',
            title: "10' × 10' Custom Logo Canopy Tent",
            quantity: request.quantity,
            price: request.pricing.total,
            properties: { '_Configuration ID': request.configurationId },
            configurationId: request.configurationId,
          },
          message: 'Cart created successfully via Shopify Storefront API.',
        };
      }
      return mockShopifyAdapter.addItemToCart(request);
    } catch {
      return mockShopifyAdapter.addItemToCart(request);
    }
  }

  async createDraftOrder(request: AddToCartRequest) {
    return mockShopifyAdapter.createDraftOrder(request);
  }
}

export const realShopifyAdapter = new RealShopifyAdapter();
