import { apiRequest } from '../api/apiClient.js';
import { ProductConfiguration } from '@shared/types/configuration.js';
import { PricingQuote } from '@shared/types/pricing.js';

export interface GeneratePdfOptions {
  configuration: ProductConfiguration;
  pricing: PricingQuote;
  previewImageBase64?: string;
  customerNote?: string;
}

export async function requestProductionPdf(
  options: GeneratePdfOptions
): Promise<{ dataUrl: string; fileName: string; sizeBytes: number }> {
  return apiRequest<{ dataUrl: string; fileName: string; sizeBytes: number }>('/api/pdf', {
    method: 'POST',
    body: JSON.stringify(options),
  });
}
