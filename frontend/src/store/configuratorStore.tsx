import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { ConfiguratorState, ConfiguratorTab, ViewportMode } from './storeTypes.js';
import { createDefaultConfiguration } from '../products/canopy-10x10/defaults.js';
import { SurfaceId, DEFAULT_SURFACE_ID } from '@shared/constants/surfaces.js';
import { EditorElement, ProductConfiguration, SurfaceCustomization } from '@shared/types/configuration.js';
import { PricingQuote, PricingCalculationRequest } from '@shared/types/pricing.js';
import { fetchCalculatedPrice } from '../services/pricing/pricingService.js';
import { saveRemoteConfiguration } from '../services/configuration/configurationService.js';

const ConfiguratorContext = createContext<ConfiguratorState | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [configuration, setConfiguration] = useState<ProductConfiguration>(() => createDefaultConfiguration());
  const [currentSurfaceId, setCurrentSurfaceId] = useState<SurfaceId>(DEFAULT_SURFACE_ID);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ConfiguratorTab>('setup');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('3d');
  const [pricing, setPricing] = useState<PricingQuote | null>(null);
  const [isPricingLoading, setIsPricingLoading] = useState<boolean>(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [savedConfigurationId, setSavedConfigurationId] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [notification, setNotificationState] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const setNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotificationState({ type, message });
    setTimeout(() => {
      setNotificationState((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  const dismissNotification = useCallback(() => setNotificationState(null), []);

  // Compute pricing quote via pricing service
  const refreshPricing = useCallback(async () => {
    setIsPricingLoading(true);
    setPricingError(null);

    let totalImages = 0;
    let totalTextElements = 0;
    let totalSurfacesCustomized = 0;

    for (const surf of Object.values(configuration.surfaces) as SurfaceCustomization[]) {
      if (surf.elements.length > 0) totalSurfacesCustomized++;
      for (const el of surf.elements) {
        if (el.type === 'image') totalImages++;
        if (el.type === 'text') totalTextElements++;
      }
    }

    const payload: PricingCalculationRequest = {
      productId: configuration.productId,
      size: configuration.size,
      includeFrame: configuration.includeFrame,
      walls: configuration.walls,
      halfWalls: configuration.halfWalls,
      printType: configuration.printType,
      customization: {
        totalSurfacesCustomized,
        totalImages,
        totalTextElements,
      },
    };

    try {
      const quote = await fetchCalculatedPrice(payload);
      setPricing(quote);
    } catch (err: any) {
      console.error('Pricing error:', err);
      setPricingError(err.message || 'Unable to fetch dynamic pricing.');
    } finally {
      setIsPricingLoading(false);
    }
  }, [configuration]);

  // Recalculate pricing on configuration changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      refreshPricing();
    }, 280);
    return () => clearTimeout(timer);
  }, [
    configuration.size,
    configuration.includeFrame,
    configuration.walls,
    configuration.halfWalls,
    configuration.printType,
    configuration.surfaces,
    refreshPricing,
  ]);

  // Option Setters
  const setSize = useCallback((size: '10x10' | '8x8' | '6.5x6.5' | '5x5') => {
    setConfiguration((prev) => ({
      ...prev,
      size,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setIncludeFrame = useCallback((includeFrame: boolean) => {
    setConfiguration((prev) => ({
      ...prev,
      includeFrame,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setWalls = useCallback((walls: 'none' | '1_single' | '3_single' | '1_double' | '3_double') => {
    setConfiguration((prev) => ({
      ...prev,
      walls,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setHalfWalls = useCallback((halfWalls: 'none' | '2_single' | '2_double') => {
    setConfiguration((prev) => ({
      ...prev,
      halfWalls,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setPrintType = useCallback((printType: 'full_digital_dye_sub' | 'standard_spot') => {
    setConfiguration((prev) => ({
      ...prev,
      printType,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // Surface and Elements operations
  const setSurfaceBackgroundColor = useCallback((surfaceId: SurfaceId, color: string) => {
    setConfiguration((prev) => {
      const existing = prev.surfaces[surfaceId] || { surfaceId, backgroundColor: '#FFFFFF', elements: [] };
      return {
        ...prev,
        surfaces: {
          ...prev.surfaces,
          [surfaceId]: {
            ...existing,
            backgroundColor: color,
            lastModified: new Date().toISOString(),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const addElementToSurface = useCallback((surfaceId: SurfaceId, element: EditorElement) => {
    setConfiguration((prev) => {
      const existing = prev.surfaces[surfaceId] || { surfaceId, backgroundColor: '#FFFFFF', elements: [] };
      return {
        ...prev,
        surfaces: {
          ...prev.surfaces,
          [surfaceId]: {
            ...existing,
            elements: [...existing.elements, element],
            lastModified: new Date().toISOString(),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
    setSelectedElementId(element.id);
  }, []);

  const updateElement = useCallback((surfaceId: SurfaceId, elementId: string, updates: Partial<EditorElement>) => {
    setConfiguration((prev) => {
      const surface = prev.surfaces[surfaceId];
      if (!surface) return prev;
      return {
        ...prev,
        surfaces: {
          ...prev.surfaces,
          [surfaceId]: {
            ...surface,
            elements: surface.elements.map((el) => (el.id === elementId ? ({ ...el, ...updates } as EditorElement) : el)),
            lastModified: new Date().toISOString(),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const removeElement = useCallback((surfaceId: SurfaceId, elementId: string) => {
    setConfiguration((prev) => {
      const surface = prev.surfaces[surfaceId];
      if (!surface) return prev;
      return {
        ...prev,
        surfaces: {
          ...prev.surfaces,
          [surfaceId]: {
            ...surface,
            elements: surface.elements.filter((el) => el.id !== elementId),
            lastModified: new Date().toISOString(),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
    setSelectedElementId((cur) => (cur === elementId ? null : cur));
  }, []);

  const reorderElement = useCallback((surfaceId: SurfaceId, elementId: string, direction: 'up' | 'down') => {
    setConfiguration((prev) => {
      const surface = prev.surfaces[surfaceId];
      if (!surface) return prev;
      const elements = [...surface.elements];
      const index = elements.findIndex((el) => el.id === elementId);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index + 1 : index - 1;
      if (targetIndex < 0 || targetIndex >= elements.length) return prev;

      const [removed] = elements.splice(index, 1);
      elements.splice(targetIndex, 0, removed);

      return {
        ...prev,
        surfaces: {
          ...prev.surfaces,
          [surfaceId]: {
            ...surface,
            elements,
            lastModified: new Date().toISOString(),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const saveCurrentConfiguration = useCallback(async (): Promise<string> => {
    setIsSaving(true);
    try {
      const res = await saveRemoteConfiguration(configuration);
      setSavedConfigurationId(res.configurationId);
      setLastSavedAt(new Date().toLocaleTimeString());
      setNotification('success', `Configuration saved (ID: ${res.configurationId})`);
      return res.configurationId;
    } catch (err: any) {
      setNotification('error', `Failed to save configuration: ${err.message}`);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [configuration, setNotification]);

  const loadConfiguration = useCallback((loaded: ProductConfiguration) => {
    setConfiguration(loaded);
    setSavedConfigurationId(loaded.id);
    setSelectedElementId(null);
    setNotification('info', `Configuration loaded (${loaded.id})`);
  }, [setNotification]);

  const resetConfiguration = useCallback(() => {
    setConfiguration(createDefaultConfiguration());
    setSelectedElementId(null);
    setSavedConfigurationId(null);
    setNotification('info', 'Configuration reset to defaults.');
  }, [setNotification]);

  const value = useMemo(
    () => ({
      configuration,
      currentSurfaceId,
      selectedElementId,
      activeTab,
      viewportMode,
      pricing,
      isPricingLoading,
      pricingError,
      isSaving,
      isAddingToCart,
      isGeneratingPdf,
      savedConfigurationId,
      lastSavedAt,
      notification,
      setSize,
      setIncludeFrame,
      setWalls,
      setHalfWalls,
      setPrintType,
      setCurrentSurfaceId,
      setSelectedElementId,
      setActiveTab,
      setViewportMode,
      setSurfaceBackgroundColor,
      addElementToSurface,
      updateElement,
      removeElement,
      reorderElement,
      refreshPricing,
      saveCurrentConfiguration,
      loadConfiguration,
      resetConfiguration,
      dismissNotification,
      setNotification,
    }),
    [
      configuration,
      currentSurfaceId,
      selectedElementId,
      activeTab,
      viewportMode,
      pricing,
      isPricingLoading,
      pricingError,
      isSaving,
      isAddingToCart,
      isGeneratingPdf,
      savedConfigurationId,
      lastSavedAt,
      notification,
      setSize,
      setIncludeFrame,
      setWalls,
      setHalfWalls,
      setPrintType,
      setCurrentSurfaceId,
      setSelectedElementId,
      setActiveTab,
      setViewportMode,
      setSurfaceBackgroundColor,
      addElementToSurface,
      updateElement,
      removeElement,
      reorderElement,
      refreshPricing,
      saveCurrentConfiguration,
      loadConfiguration,
      resetConfiguration,
      dismissNotification,
      setNotification,
    ]
  );

  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator(): ConfiguratorState {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
}
