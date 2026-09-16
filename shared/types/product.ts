import { SurfaceId } from '../constants/surfaces.js';

export interface ProductOptionChoice<T = string> {
  id: T;
  label: string;
  sublabel?: string;
  badge?: string;
  priceDelta: number; // In USD
  description?: string;
}

export interface CanopyProductDefinition {
  id: string;
  title: string;
  headline: string;
  description: string;
  leadTime: string;
  availableSizes: ProductOptionChoice<'10x10' | '8x8' | '6.5x6.5' | '5x5'>[];
  frameOptions: ProductOptionChoice<boolean>[];
  wallOptions: ProductOptionChoice<'none' | '1_single' | '3_single' | '1_double' | '3_double'>[];
  halfWallOptions: ProductOptionChoice<'none' | '2_single' | '2_double'>[];
  printTypeOptions: ProductOptionChoice<'full_digital_dye_sub' | 'standard_spot'>[];
  supportedSurfaces: SurfaceId[];
  defaultModelId: string;
}
