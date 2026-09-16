export interface ModelAssetInfo {
  id: string;
  sizeKey: '10x10' | '8x8' | '6.5x6.5' | '5x5';
  path: string;
  displayName: string;
  scale: [number, number, number];
  rotation: [number, number, number];
  position: [number, number, number];
}

export interface TextureAssetInfo {
  id: string;
  name: string;
  path: string;
  category: 'swatch' | 'pattern' | 'template';
}
