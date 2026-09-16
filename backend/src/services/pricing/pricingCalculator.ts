import { PricingCalculationRequest, PricingQuote, PricingLineItem } from '@shared/types/pricing.js';
import {
  BASE_PRICES,
  FRAME_PRICES,
  WALL_PRICES,
  HALF_WALL_PRICES,
  PRINT_TYPE_DISCOUNT,
  CUSTOMIZATION_RULES,
} from './pricingRules.js';

export function calculatePricingQuote(request: PricingCalculationRequest): PricingQuote {
  const lineItems: PricingLineItem[] = [];

  // 1. Base canopy top
  const basePrice = BASE_PRICES[request.size] ?? 799;
  lineItems.push({
    id: 'item-base',
    category: 'base',
    name: `${request.size} Custom Printed Canopy Top`,
    description: '600D UV50+ polyester canopy with full dye-sublimation print',
    unitPrice: basePrice,
    quantity: 1,
    total: basePrice,
  });

  let optionAdjustments = 0;

  // 2. Commercial Frame
  if (request.includeFrame) {
    const framePrice = FRAME_PRICES['true'];
    optionAdjustments += framePrice;
    lineItems.push({
      id: 'item-frame',
      category: 'frame',
      name: `${request.size} Commercial Hex-Leg Aluminum Frame`,
      description: '50mm anodized aluminum hardware with wheeled transit case',
      unitPrice: framePrice,
      quantity: 1,
      total: framePrice,
    });
  }

  // 3. Walls
  const wallPrice = WALL_PRICES[request.walls] ?? 0;
  if (wallPrice > 0) {
    optionAdjustments += wallPrice;
    const wallName = request.walls.includes('3') ? '3 Full Enclosure Walls' : '1 Full Backdrop Wall';
    const isDouble = request.walls.includes('double');
    lineItems.push({
      id: 'item-walls',
      category: 'walls',
      name: wallName,
      description: isDouble ? 'Double-sided full vibrant print' : 'Single-sided exterior print with neutral interior',
      unitPrice: wallPrice,
      quantity: 1,
      total: wallPrice,
    });
  }

  // 4. Half Walls
  const halfWallPrice = HALF_WALL_PRICES[request.halfWalls] ?? 0;
  if (halfWallPrice > 0) {
    optionAdjustments += halfWallPrice;
    const isDouble = request.halfWalls.includes('double');
    lineItems.push({
      id: 'item-half-walls',
      category: 'half_walls',
      name: 'Set of 2 Side Half Walls with Support Bars',
      description: isDouble ? 'Double-sided printed rail skirts' : 'Single-sided exterior print rail skirts',
      unitPrice: halfWallPrice,
      quantity: 1,
      total: halfWallPrice,
    });
  }

  // 5. Print type adjustment (discount for standard spot)
  const printDiscount = PRINT_TYPE_DISCOUNT[request.printType] ?? 0;
  if (printDiscount !== 0) {
    optionAdjustments += printDiscount;
    lineItems.push({
      id: 'item-print-type',
      category: 'discount',
      name: 'Print Method Adjustment (Spot Color)',
      description: 'Standard spot transfer option adjustment',
      unitPrice: printDiscount,
      quantity: 1,
      total: printDiscount,
    });
  }

  // 6. Customization element fees (if extra artwork complexity beyond standard included)
  let customizationCost = 0;
  const customization = request.customization || {
    totalSurfacesCustomized: 0,
    totalImages: 0,
    totalTextElements: 0,
  };
  const totalImages = customization.totalImages ?? 0;
  const totalText = customization.totalTextElements ?? 0;

  const extraImages = Math.max(0, totalImages - CUSTOMIZATION_RULES.freeImagesThreshold);
  if (extraImages > 0) {
    const cost = extraImages * CUSTOMIZATION_RULES.perAdditionalImageCost;
    customizationCost += cost;
    lineItems.push({
      id: 'item-extra-images',
      category: 'customization',
      name: `High-Resolution Artwork Proofing (${extraImages} extra)`,
      description: 'Multi-logo prepress digital color check',
      unitPrice: CUSTOMIZATION_RULES.perAdditionalImageCost,
      quantity: extraImages,
      total: cost,
    });
  }

  const extraText = Math.max(0, totalText - CUSTOMIZATION_RULES.freeTextThreshold);
  if (extraText > 0) {
    const cost = extraText * CUSTOMIZATION_RULES.perAdditionalTextCost;
    customizationCost += cost;
    lineItems.push({
      id: 'item-extra-text',
      category: 'customization',
      name: `Extended Typography Layout (${extraText} extra)`,
      description: 'Custom lettering and typesetting alignment',
      unitPrice: CUSTOMIZATION_RULES.perAdditionalTextCost,
      quantity: extraText,
      total: cost,
    });
  }

  const subtotal = basePrice + optionAdjustments + customizationCost;
  const tax = 0; // Configured at checkout
  const total = subtotal + tax;

  const now = new Date();
  const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14-day quote guarantee

  return {
    currency: 'USD',
    basePrice,
    optionAdjustments,
    customizationCost,
    subtotal,
    tax,
    total,
    lineItems,
    calculatedAt: now.toISOString(),
    validUntil: validUntil.toISOString(),
  };
}
