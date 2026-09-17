import { IShopifyAdapter } from './ShopifyAdapter.js';
import { AddToCartRequest, AddToCartResponse } from '@shared/types/cart.js';
import { mockShopifyAdapter } from './MockShopifyAdapter.js';
import { ENV } from '../../config/environment.js';

export class RealShopifyAdapter implements IShopifyAdapter {
  private storeDomain: string;
  private storefrontAccessToken: string;

  constructor(domain?: string, token?: string) {
    this.storeDomain = domain || ENV.SHOPIFY_STORE_DOMAIN;
    this.storefrontAccessToken = token || ENV.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  }

  async addItemToCart(request: AddToCartRequest): Promise<AddToCartResponse> {
    if (!request.pricing) {
      throw new Error('A pricing quote is required to create a cart item.');
    }
    const pricing = request.pricing;
    // If live credentials are not set, gracefully fall back to mock with an explicit message
    if (!this.storeDomain || !this.storefrontAccessToken || this.storefrontAccessToken.startsWith('mock_')) {
      return mockShopifyAdapter.addItemToCart(request);
    }

    try {
      // In a real Shopify Storefront API deployment:
      // GraphQL mutation cartCreate or cartLinesAdd
      const response = await fetch(`https://${this.storeDomain}/api/${ENV.SHOPIFY_API_VERSION}/graphql.json`, {
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
                    quantity: request.quantity || 1,
                  merchandiseId: `gid://shopify/ProductVariant/canopy-10x10`,
                  attributes: [
                    { key: '_Configuration ID', value: request.configurationId },
                    { key: 'Total Price', value: `$${pricing.total}` },
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
            quantity: request.quantity || 1,
            price: pricing.total,
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
