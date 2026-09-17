export type ProductSize = '10x10' | '8x8' | '6.5x6.5' | '5x5';
export type ProductOptionValue = string | number | boolean;

export interface ProductOptionChoice<T = ProductOptionValue> {
  id: T;
  label: string;
  sublabel?: string;
  badge?: string;
  priceDelta?: number;
  description?: string;
}

export interface ProductDefinition {
  id: string;
  title: string;
  headline: string;
  description: string;
  leadTime: string;
  availableSizes: ProductOptionChoice<ProductSize>[];
  frameOptions: ProductOptionChoice<boolean>[];
  wallOptions: ProductOptionChoice<'none' | '1_single' | '3_single' | '1_double' | '3_double'>[];
  halfWallOptions: ProductOptionChoice<'none' | '2_single' | '2_double'>[];
  printTypeOptions: ProductOptionChoice<'full_digital_dye_sub' | 'standard_spot'>[];
  supportedSurfaces: string[];
  defaultModelId: string;
}

export type CanopyProductDefinition = ProductDefinition;
