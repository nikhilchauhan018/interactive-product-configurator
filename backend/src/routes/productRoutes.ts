import { Router } from 'express';
import { getProduct } from '../controllers/productController.js';

export const productRoutes = Router();

productRoutes.get('/:productId', getProduct);
