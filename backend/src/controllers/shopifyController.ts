import { Request, Response, NextFunction } from 'express';
import { shopifyService } from '../services/shopify/shopifyService.js';

export async function addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await shopifyService.addToCart(req.body);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
