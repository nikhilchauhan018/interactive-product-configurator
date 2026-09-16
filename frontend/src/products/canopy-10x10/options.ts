import { ProductOptionChoice } from '@shared/types/product.js';

export const SIZE_OPTIONS: ProductOptionChoice<'10x10' | '8x8' | '6.5x6.5' | '5x5'>[] = [
  {
    id: '10x10',
    label: "10' × 10' Flagship Canopy",
    sublabel: 'Most Popular / Trade Shows & Festivals',
    badge: 'Popular',
    priceDelta: 200,
    description: '100 sq ft covered area. Heavy-duty 50mm hex aluminum legs.',
  },
  {
    id: '8x8',
    label: "8' × 8' Medium Canopy",
    sublabel: 'Standard Booths & Street Fairs',
    priceDelta: 100,
    description: '64 sq ft covered footprint. Fits tight 10x10 market spaces.',
  },
  {
    id: '6.5x6.5',
    label: "6.5' × 6.5' Compact Canopy",
    sublabel: 'Point-of-Sale & Sampling',
    priceDelta: 50,
    description: '42 sq ft footprint for tight indoor or outdoor activation.',
  },
  {
    id: '5x5',
    label: "5' × 5' Kiosk Canopy",
    sublabel: 'Information Booth & Check-in',
    priceDelta: 0,
    description: '25 sq ft footprint. Ultra compact transport and fast setup.',
  },
];

export const FRAME_OPTIONS: ProductOptionChoice<boolean>[] = [
  {
    id: true,
    label: 'Canopy + Commercial Frame',
    sublabel: 'Complete Ready-to-Deploy Kit',
    badge: 'Recommended',
    priceDelta: 280,
    description: 'Commercial-grade anodized aluminum frame with wheel bag & stakes.',
  },
  {
    id: false,
    label: 'Canopy Top Only (No Frame)',
    sublabel: 'Replacement or Existing Hardware',
    priceDelta: 0,
    description: 'Direct replacement custom printed canopy skin only.',
  },
];

export const WALL_OPTIONS: ProductOptionChoice<'none' | '1_single' | '3_single' | '1_double' | '3_double'>[] = [
  {
    id: 'none',
    label: 'No Walls',
    sublabel: 'Open 4-sided airflow & visibility',
    priceDelta: 0,
  },
  {
    id: '1_single',
    label: '1 Full Back Wall (Single Sided)',
    sublabel: 'Printed exterior facing backdrop',
    priceDelta: 145,
  },
  {
    id: '3_single',
    label: '3 Full Walls (Single Sided)',
    sublabel: 'Back + Left + Right printed exterior',
    priceDelta: 395,
  },
  {
    id: '1_double',
    label: '1 Full Back Wall (Double Sided)',
    sublabel: 'Interior & exterior full color graphics',
    priceDelta: 215,
  },
  {
    id: '3_double',
    label: '3 Full Walls (Double Sided)',
    sublabel: 'Full enclosure with dual-sided print',
    priceDelta: 580,
  },
];

export const HALF_WALL_OPTIONS: ProductOptionChoice<'none' | '2_single' | '2_double'>[] = [
  {
    id: 'none',
    label: 'No Half Walls',
    priceDelta: 0,
  },
  {
    id: '2_single',
    label: 'Set of 2 Half Walls (Single Sided)',
    sublabel: '38" high with support bars',
    priceDelta: 190,
  },
  {
    id: '2_double',
    label: 'Set of 2 Half Walls (Double Sided)',
    sublabel: 'Interior & exterior custom print',
    priceDelta: 275,
  },
];

export const PRINT_TYPE_OPTIONS: ProductOptionChoice<'full_digital_dye_sub' | 'standard_spot'>[] = [
  {
    id: 'full_digital_dye_sub',
    label: 'Full Digital Dye-Sublimation',
    sublabel: 'Unlimited colors, photographic fidelity, UV & weather resistant',
    badge: 'Best Quality',
    priceDelta: 0,
  },
  {
    id: 'standard_spot',
    label: 'Spot Color Thermal Heat Transfer',
    sublabel: 'Simpler vector logos on solid color canvas background',
    priceDelta: -45,
  },
];
