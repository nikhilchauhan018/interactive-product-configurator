export interface ProductAssetMap {
  modelUrl: string;
  scaleMultiplier: number;
  displayName: string;
}

export const CANOPY_MODEL_ASSETS: Record<string, ProductAssetMap> = {
  '5x5': {
    modelUrl: '/models/Tent_5_5.glb',
    scaleMultiplier: 1.0,
    displayName: '5x5 Compact Event Canopy',
  },
  '6.5x6.5': {
    modelUrl: '/models/Tent_6.5_6.5.glb',
    scaleMultiplier: 1.0,
    displayName: '6.5x6.5 Promotional Canopy',
  },
  '8x8': {
    modelUrl: '/models/Tent_8_8.glb',
    scaleMultiplier: 1.0,
    displayName: '8x8 Commercial Canopy',
  },
  '10x10': {
    // 10x10 reference product utilizes verified high-detail 8x8 GLB chassis scaled to exact 10ft proportional footprint
    modelUrl: '/models/Tent_8_8.glb',
    scaleMultiplier: 1.25,
    displayName: "10x10 Custom Logo Canopy Tent (Reference MVP)",
  },
};
