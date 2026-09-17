import 'dotenv/config';

export const ENV = {
  PORT: Number(process.env.PORT || 3000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGINS: (process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean),
  SHOPIFY_MODE: process.env.SHOPIFY_MODE || 'mock',
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN || '',
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || '2024-01',
};
