export interface ProductCapabilities {
  supportsText: boolean;
  supportsImages: boolean;
  supportsCustomColors: boolean;
  supportsSurfaceNavigation: boolean;
  supportsWalls: boolean;
  supportsHalfWalls: boolean;
  supportsFramelessVariant: boolean;
  maxElementsPerSurface: number;
  maxImageUploadSizeBytes: number;
}

export const CANOPY_CAPABILITIES: ProductCapabilities = {
  supportsText: true,
  supportsImages: true,
  supportsCustomColors: true,
  supportsSurfaceNavigation: true,
  supportsWalls: true,
  supportsHalfWalls: true,
  supportsFramelessVariant: true,
  maxElementsPerSurface: 20,
  maxImageUploadSizeBytes: 15 * 1024 * 1024, // 15MB
};
