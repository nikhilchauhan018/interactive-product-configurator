export type SurfaceId =
  | 'roof_front'
  | 'roof_back'
  | 'roof_left'
  | 'roof_right'
  | 'wall_back'
  | 'wall_left'
  | 'wall_right'
  | 'halfwall_left'
  | 'halfwall_right';

export interface SurfaceCustomization {
  surfaceId: SurfaceId;
  backgroundColor: string;
  elements: EditorElement[];
}

export interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  surfaceId: SurfaceId;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  fill?: string;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  imageUrl?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export type TextElement = EditorElement & {
  type: 'text';
  text: string;
};

export type ImageElement = EditorElement & {
  type: 'image';
  src: string;
  fileName?: string;
  naturalWidth?: number;
  naturalHeight?: number;
  aspectRatio?: number;
};

export interface ConfigurationSummary {
  id: string;
  productName: string;
  sizeLabel: string;
  frameLabel: string;
  wallsLabel: string;
  halfWallsLabel: string;
  printTypeLabel: string;
  customizedSurfacesCount: number;
  totalElementsCount: number;
  totalPriceFormatted: string;
  createdAt: string;
}

export interface ProductConfiguration {
  id: string;
  productId: string;
  title: string;
  size: '10x10' | '8x8' | '6.5x6.5' | '5x5';
  includeFrame: boolean;
  walls: 'none' | '1_single' | '3_single' | '1_double' | '3_double';
  halfWalls: 'none' | '2_single' | '2_double';
  printType: 'full_digital_dye_sub' | 'standard_spot';
  surfaces: Record<SurfaceId, SurfaceCustomization>;
  pricing: unknown | null;
  createdAt: string;
  updatedAt: string;
}
