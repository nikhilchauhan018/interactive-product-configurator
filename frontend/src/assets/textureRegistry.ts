import { TextureAssetInfo } from './assetTypes.js';

export const POPULAR_CANOPY_COLORS = [
  { name: 'Deep Forest', hex: '#183C34', isBrand: true },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Midnight Black', hex: '#1A1A1A' },
  { name: 'Royal Navy', hex: '#1B365D' },
  { name: 'Crimson Red', hex: '#B22222' },
  { name: 'Warm Clay', hex: '#B66A45' },
  { name: 'Solar Yellow', hex: '#EAA221' },
  { name: 'Slate Gray', hex: '#58595B' },
  { name: 'Kelly Green', hex: '#00843D' },
  { name: 'Desert Sand', hex: '#D8C3A5' },
] as const;

export const TEXTURE_REGISTRY: Record<string, TextureAssetInfo> = {};
