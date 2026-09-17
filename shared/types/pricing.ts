export interface PricingLineItem {
  id: string;
  category: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PricingQuote {
  basePrice: number;
  optionAdjustments: number;
  customizationCost: number;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  lineItems: PricingLineItem[];
  calculatedAt: string;
  validUntil: string;
}

export interface PricingCalculationRequest {
  productId: string;
  size: '10x10' | '8x8' | '6.5x6.5' | '5x5';
  includeFrame: boolean;
  walls: 'none' | '1_single' | '3_single' | '1_double' | '3_double';
  halfWalls: 'none' | '2_single' | '2_double';
  printType: 'full_digital_dye_sub' | 'standard_spot';
  customization?: {
    totalSurfacesCustomized: number;
    totalImages: number;
    totalTextElements: number;
  };
}
