import { ModelAssetInfo } from './assetTypes.js';

export const MODEL_REGISTRY: Record<string, ModelAssetInfo> = {
  '5x5': {
    id: 'model-5x5',
    sizeKey: '5x5',
    path: '/models/Tent_5_5.glb',
    displayName: "5' × 5' Canopy Tent",
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, -0.9, 0],
  },
  '6.5x6.5': {
    id: 'model-6.5x6.5',
    sizeKey: '6.5x6.5',
    path: '/models/Tent_6.5_6.5.glb',
    displayName: "6.5' × 6.5' Canopy Tent",
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, -0.9, 0],
  },
  '8x8': {
    id: 'model-8x8',
    sizeKey: '8x8',
    path: '/models/Tent_8_8.glb',
    displayName: "8' × 8' Canopy Tent",
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, -1.0, 0],
  },
  '10x10': {
    id: 'model-10x10',
    sizeKey: '10x10',
    path: '/models/Tent_8_8.glb',
    displayName: "10' × 10' Flagship Canopy Tent (Reference MVP)",
    scale: [1.25, 1.25, 1.25],
    rotation: [0, 0, 0],
    position: [0, -1.2, 0],
  },
};

export function getModelAssetForSize(size: '10x10' | '8x8' | '6.5x6.5' | '5x5'): ModelAssetInfo {
  return MODEL_REGISTRY[size] || MODEL_REGISTRY['10x10'];
}
