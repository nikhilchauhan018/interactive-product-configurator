import { CanopyProductDefinition } from '@shared/types/product.js';
import { SIZE_OPTIONS, FRAME_OPTIONS, WALL_OPTIONS, HALF_WALL_OPTIONS, PRINT_TYPE_OPTIONS } from './options.js';
import { CANOPY_SURFACE_DEFINITIONS } from './surfaces.js';
import { SurfaceId } from '@shared/constants/surfaces.js';

export const CANOPY_10X10_DEFINITION: CanopyProductDefinition = {
  id: 'canopy-10x10',
  title: "10' × 10' Custom Logo Canopy Tent",
  headline: "Commercial-Grade Event Canopy with Vivid 360° Custom Printing",
  description: "Durable 600D water-repellent, UV50+ polyester roof with commercial anodized aluminum frame. Full-bleed, edge-to-edge dye-sublimation print.",
  leadTime: "3–5 Business Days + Production Proof Included",
  availableSizes: SIZE_OPTIONS,
  frameOptions: FRAME_OPTIONS,
  wallOptions: WALL_OPTIONS,
  halfWallOptions: HALF_WALL_OPTIONS,
  printTypeOptions: PRINT_TYPE_OPTIONS,
  supportedSurfaces: Object.keys(CANOPY_SURFACE_DEFINITIONS) as SurfaceId[],
  defaultModelId: '10x10',
};
