import { ProductConfiguration } from '@shared/types/configuration.js';
import { CANOPY_SURFACES, SurfaceId } from '@shared/constants/surfaces.js';
import { CANOPY_SURFACE_DEFINITIONS } from './surfaces.js';

export function createDefaultConfiguration(id: string = 'cfg_default_01'): ProductConfiguration {
  const surfaces = {} as Record<SurfaceId, {
    surfaceId: SurfaceId;
    backgroundColor: string;
    elements: any[];
  }>;

  for (const s of CANOPY_SURFACES) {
    surfaces[s.id] = {
      surfaceId: s.id,
      backgroundColor: CANOPY_SURFACE_DEFINITIONS[s.id].defaultColor,
      elements: [],
    };
  }

  // Add default demo graphic element on front peak to immediately show power
  surfaces.roof_front.elements = [
    {
      id: 'demo-logo-1',
      type: 'text',
      surfaceId: 'roof_front',
      text: 'SUMMIT APEX',
      fontSize: 36,
      fontFamily: 'Inter',
      fill: '#FFFFFF',
      x: 0.5,
      y: 0.52,
      scale: 1,
      rotation: 0,
      fontWeight: '700',
      textAlign: 'center',
      letterSpacing: 2,
    },
    {
      id: 'demo-logo-sub',
      type: 'text',
      surfaceId: 'roof_front',
      text: 'OUTDOOR EQUIPMENT',
      fontSize: 16,
      fontFamily: 'Inter',
      fill: '#D6D0C5',
      x: 0.5,
      y: 0.65,
      scale: 1,
      rotation: 0,
      fontWeight: '500',
      textAlign: 'center',
      letterSpacing: 4,
    }
  ];

  return {
    id,
    productId: 'canopy-10x10',
    title: "10' × 10' Custom Logo Canopy Tent",
    size: '10x10',
    includeFrame: true,
    walls: 'none',
    halfWalls: 'none',
    printType: 'full_digital_dye_sub',
    surfaces,
    pricing: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
