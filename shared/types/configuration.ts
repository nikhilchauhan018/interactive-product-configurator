import { SurfaceId } from '../constants/surfaces.js';
import { PricingQuote } from './pricing.js';

export type ElementType = 'text' | 'image';

export interface BaseElement {
  id: string;
  type: ElementType;
  surfaceId: SurfaceId;
  x: number; // Normalized coordinate 0..1
  y: number; // Normalized coordinate 0..1
  scale: number; // Default 1
  rotation: number; // In degrees 0..360
  opacity?: number; // 0..1
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number; // in pixels at base resolution
  fontFamily: string;
  fill: string; // hex color
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string; // URL or data URL
  fileName: string;
  naturalWidth: number;
  naturalHeight: number;
  aspectRatio: number;
}

export type EditorElement = TextElement | ImageElement;

export interface SurfaceCustomization {
  surfaceId: SurfaceId;
  backgroundColor: string; // Hex color (e.g. #FFFFFF or custom)
  elements: EditorElement[];
  thumbnailUrl?: string;
  lastModified?: string;
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
  pricing: PricingQuote | null;
  createdAt: string;
  updatedAt: string;
  customerNote?: string;
}

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
