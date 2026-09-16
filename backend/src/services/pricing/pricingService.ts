import { PricingCalculationRequest, PricingQuote } from '@shared/types/pricing.js';
import { calculatePricingQuote } from './pricingCalculator.js';

export interface IPricingService {
  calculate(request: PricingCalculationRequest): Promise<PricingQuote>;
}

export class PricingService implements IPricingService {
  async calculate(request: PricingCalculationRequest): Promise<PricingQuote> {
    // Validation of mandatory fields
    if (!request.size || !request.productId) {
      throw new Error('Invalid pricing request: missing product or size.');
    }
    return calculatePricingQuote(request);
  }
}

export const pricingService = new PricingService();
