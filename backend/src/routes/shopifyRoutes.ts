import { Router } from 'express';
import { addToCart } from '../controllers/shopifyController.js';

export const shopifyRoutes = Router();

shopifyRoutes.post('/cart', addToCart);
