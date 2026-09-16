import { Router } from 'express';
import { pricingRoutes } from './pricingRoutes.js';
import { configurationRoutes } from './configurationRoutes.js';
import { shopifyRoutes } from './shopifyRoutes.js';
import { uploadRoutes } from './uploadRoutes.js';
import { pdfRoutes } from './pdfRoutes.js';
import { productRoutes } from './productRoutes.js';

export const apiRouter = Router();

apiRouter.use('/pricing', pricingRoutes);
apiRouter.use('/configurations', configurationRoutes);
apiRouter.use('/shopify', shopifyRoutes);
apiRouter.use('/uploads', uploadRoutes);
apiRouter.use('/pdf', pdfRoutes);
apiRouter.use('/products', productRoutes);

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'interactive-product-configurator-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});
