import { ProductConfiguration, EditorElement, SurfaceCustomization } from '@shared/types/configuration.js';
import { SurfaceId } from '@shared/constants/surfaces.js';
import { PricingQuote } from '@shared/types/pricing.js';

export type ConfiguratorTab = 'setup' | 'design' | 'review';
export type ViewportMode = '3d' | '2d' | 'split';

export interface ConfiguratorState {
  configuration: ProductConfiguration;
  currentSurfaceId: SurfaceId;
  selectedElementId: string | null;
  activeTab: ConfiguratorTab;
  viewportMode: ViewportMode;
  pricing: PricingQuote | null;
  isPricingLoading: boolean;
  pricingError: string | null;
  isSaving: boolean;
  isAddingToCart: boolean;
  isGeneratingPdf: boolean;
  savedConfigurationId: string | null;
  lastSavedAt: string | null;
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;

  // Actions
  setSize: (size: '10x10' | '8x8' | '6.5x6.5' | '5x5') => void;
  setIncludeFrame: (include: boolean) => void;
  setWalls: (walls: 'none' | '1_single' | '3_single' | '1_double' | '3_double') => void;
  setHalfWalls: (halfWalls: 'none' | '2_single' | '2_double') => void;
  setPrintType: (printType: 'full_digital_dye_sub' | 'standard_spot') => void;
  setCurrentSurfaceId: (surfaceId: SurfaceId) => void;
  setSelectedElementId: (elementId: string | null) => void;
  setActiveTab: (tab: ConfiguratorTab) => void;
  setViewportMode: (mode: ViewportMode) => void;
  setSurfaceBackgroundColor: (surfaceId: SurfaceId, color: string) => void;
  addElementToSurface: (surfaceId: SurfaceId, element: EditorElement) => void;
  updateElement: (surfaceId: SurfaceId, elementId: string, updates: Partial<EditorElement>) => void;
  removeElement: (surfaceId: SurfaceId, elementId: string) => void;
  reorderElement: (surfaceId: SurfaceId, elementId: string, direction: 'up' | 'down') => void;
  refreshPricing: () => Promise<void>;
  saveCurrentConfiguration: () => Promise<string>;
  loadConfiguration: (config: ProductConfiguration) => void;
  resetConfiguration: () => void;
  dismissNotification: () => void;
  setNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}
