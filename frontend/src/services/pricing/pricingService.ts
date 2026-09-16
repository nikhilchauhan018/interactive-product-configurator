import { apiRequest } from '../api/apiClient.js';
import { PricingCalculationRequest, PricingQuote } from '@shared/types/pricing.js';

export async function fetchCalculatedPrice(request: PricingCalculationRequest): Promise<PricingQuote> {
  return apiRequest<PricingQuote>('/api/pricing/calculate', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
