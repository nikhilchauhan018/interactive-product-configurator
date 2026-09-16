export const CANOPY_SURFACES = [
  { id: 'roof_front', label: 'Front Valance & Peak', type: 'roof', order: 1 },
  { id: 'roof_back', label: 'Back Valance & Peak', type: 'roof', order: 2 },
  { id: 'roof_left', label: 'Left Valance & Peak', type: 'roof', order: 3 },
  { id: 'roof_right', label: 'Right Valance & Peak', type: 'roof', order: 4 },
  { id: 'wall_back', label: 'Back Full Wall', type: 'wall', order: 5 },
  { id: 'wall_left', label: 'Left Full Wall', type: 'wall', order: 6 },
  { id: 'wall_right', label: 'Right Full Wall', type: 'wall', order: 7 },
  { id: 'halfwall_left', label: 'Left Half Wall', type: 'halfwall', order: 8 },
  { id: 'halfwall_right', label: 'Right Half Wall', type: 'halfwall', order: 9 },
] as const;

export type SurfaceId = typeof CANOPY_SURFACES[number]['id'];

export const DEFAULT_SURFACE_ID: SurfaceId = 'roof_front';

export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 600;
