import { Request, Response, NextFunction } from 'express';
import { getProductDefinition } from '../../../frontend/src/products/productRegistry.js';

export function getProduct(req: Request, res: Response, next: NextFunction): void {
  try {
    const productId = String(req.params.productId);
    const def = getProductDefinition(productId);
    res.json({
      success: true,
      data: def,
    });
  } catch (err) {
    next(err);
  }
}
