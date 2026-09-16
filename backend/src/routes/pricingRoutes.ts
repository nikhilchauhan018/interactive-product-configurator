import { Router } from 'express';
import { calculatePrice } from '../controllers/pricingController.js';

export const pricingRoutes = Router();

pricingRoutes.post('/calculate', calculatePrice);
