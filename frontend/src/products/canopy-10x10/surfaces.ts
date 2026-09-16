import { CANOPY_SURFACES, SurfaceId } from '@shared/constants/surfaces.js';

export interface SurfaceDefinition {
  id: SurfaceId;
  name: string;
  category: 'roof' | 'wall' | 'halfwall';
  aspectRatio: number;
  widthMeters: number;
  heightMeters: number;
  templateGuideUrl?: string;
  defaultColor: string;
}

export const CANOPY_SURFACE_DEFINITIONS: Record<SurfaceId, SurfaceDefinition> = {
  roof_front: {
    id: 'roof_front',
    name: 'Front Peak & Valance',
    category: 'roof',
    aspectRatio: 1.33,
    widthMeters: 3.0,
    heightMeters: 2.2,
    defaultColor: '#183C34', // Brand deep forest default
  },
  roof_back: {
    id: 'roof_back',
    name: 'Back Peak & Valance',
    category: 'roof',
    aspectRatio: 1.33,
    widthMeters: 3.0,
    heightMeters: 2.2,
    defaultColor: '#183C34',
  },
  roof_left: {
    id: 'roof_left',
    name: 'Left Peak & Valance',
    category: 'roof',
    aspectRatio: 1.33,
    widthMeters: 3.0,
    heightMeters: 2.2,
    defaultColor: '#183C34',
  },
  roof_right: {
    id: 'roof_right',
    name: 'Right Peak & Valance',
    category: 'roof',
    aspectRatio: 1.33,
    widthMeters: 3.0,
    heightMeters: 2.2,
    defaultColor: '#183C34',
  },
  wall_back: {
    id: 'wall_back',
    name: 'Back Enclosure Wall',
    category: 'wall',
    aspectRatio: 1.45,
    widthMeters: 3.0,
    heightMeters: 2.1,
    defaultColor: '#FFFFFF',
  },
  wall_left: {
    id: 'wall_left',
    name: 'Left Enclosure Wall',
    category: 'wall',
    aspectRatio: 1.45,
    widthMeters: 3.0,
    heightMeters: 2.1,
    defaultColor: '#FFFFFF',
  },
  wall_right: {
    id: 'wall_right',
    name: 'Right Enclosure Wall',
    category: 'wall',
    aspectRatio: 1.45,
    widthMeters: 3.0,
    heightMeters: 2.1,
    defaultColor: '#FFFFFF',
  },
  halfwall_left: {
    id: 'halfwall_left',
    name: 'Left Half Rail Wall',
    category: 'halfwall',
    aspectRatio: 3.1,
    widthMeters: 3.0,
    heightMeters: 0.95,
    defaultColor: '#FFFFFF',
  },
  halfwall_right: {
    id: 'halfwall_right',
    name: 'Right Half Rail Wall',
    category: 'halfwall',
    aspectRatio: 3.1,
    widthMeters: 3.0,
    heightMeters: 0.95,
    defaultColor: '#FFFFFF',
  },
};
