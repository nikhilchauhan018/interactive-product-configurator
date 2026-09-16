export const ENV = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SHOPIFY_STORE_DOMAIN: process.env.VITE_SHOPIFY_STORE_DOMAIN || 'mvp-visuals-demo.myshopify.com',
  SHOPIFY_PUBLIC_TOKEN: process.env.VITE_SHOPIFY_PUBLIC_TOKEN || 'mock_public_token',
};
