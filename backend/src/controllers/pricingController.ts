import { Request, Response, NextFunction } from 'express';
import { pricingService } from '../services/pricing/pricingService.js';
import { PricingCalculationRequest } from '@shared/types/pricing.js';

export async function calculatePrice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload: PricingCalculationRequest = req.body;
    const quote = await pricingService.calculate(payload);
    res.json({
      success: true,
      data: quote,
    });
  } catch (error) {
    next(error);
  }
}
