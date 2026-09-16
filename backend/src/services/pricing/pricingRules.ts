export const BASE_PRICES: Record<string, number> = {
  '10x10': 799,
  '8x8': 699,
  '6.5x6.5': 649,
  '5x5': 599,
};

export const FRAME_PRICES: Record<string, number> = {
  true: 280,  // Aluminum commercial frame kit
  false: 0,   // Canopy top only
};

export const WALL_PRICES: Record<string, number> = {
  none: 0,
  '1_single': 145,
  '3_single': 395,
  '1_double': 215,
  '3_double': 580,
};

export const HALF_WALL_PRICES: Record<string, number> = {
  none: 0,
  '2_single': 190,
  '2_double': 275,
};

export const PRINT_TYPE_DISCOUNT: Record<string, number> = {
  full_digital_dye_sub: 0, // Reference MVP standard is full dye-sub
  standard_spot: -45,
};

export const CUSTOMIZATION_RULES = {
  freeImagesThreshold: 4,
  perAdditionalImageCost: 15,
  freeTextThreshold: 6,
  perAdditionalTextCost: 10,
  dyeSubCustomSurfaceSurcharge: 0, // Included in full digital package
};
