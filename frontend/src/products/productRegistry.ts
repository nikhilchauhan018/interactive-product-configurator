import { CanopyProductDefinition } from '@shared/types/product.js';
import { CANOPY_10X10_DEFINITION } from './canopy-10x10/index.js';

export const PRODUCT_REGISTRY: Record<string, CanopyProductDefinition> = {
  'canopy-10x10': CANOPY_10X10_DEFINITION,
};

export function getProductDefinition(productId: string): CanopyProductDefinition {
  const product = PRODUCT_REGISTRY[productId] || PRODUCT_REGISTRY['canopy-10x10'];
  return product;
}
