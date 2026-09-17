export const CANOPY_SURFACES = [
  { id: 'roof_front', label: 'Front peak & valance', type: 'roof' },
  { id: 'roof_back', label: 'Back peak & valance', type: 'roof' },
  { id: 'roof_left', label: 'Left peak & valance', type: 'roof' },
  { id: 'roof_right', label: 'Right peak & valance', type: 'roof' },
  { id: 'wall_back', label: 'Back wall', type: 'wall' },
  { id: 'wall_left', label: 'Left wall', type: 'wall' },
  { id: 'wall_right', label: 'Right wall', type: 'wall' },
  { id: 'halfwall_left', label: 'Left half wall', type: 'halfwall' },
  { id: 'halfwall_right', label: 'Right half wall', type: 'halfwall' },
] as const;

export type SurfaceId = (typeof CANOPY_SURFACES)[number]['id'];

export const DEFAULT_SURFACE_ID: SurfaceId = 'roof_front';
