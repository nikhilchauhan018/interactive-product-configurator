import { ConfiguratorState } from '../storeTypes.js';
import { ConfigurationSummary, SurfaceCustomization } from '@shared/types/configuration.js';
import { selectTotalElementsCount } from './surfaceSelectors.js';

export const selectConfigurationSummary = (state: ConfiguratorState): ConfigurationSummary => {
  const { configuration, pricing } = state;
  const elementsCount = selectTotalElementsCount(state);
  const customizedSurfaces = (Object.values(configuration.surfaces) as SurfaceCustomization[]).filter(
    (s) => s.elements.length > 0 || (s.backgroundColor && s.backgroundColor !== '#183C34' && s.backgroundColor !== '#FFFFFF')
  ).length;

  return {
    id: configuration.id,
    productName: configuration.title,
    sizeLabel: `${configuration.size} Footprint`,
    frameLabel: configuration.includeFrame ? 'Commercial Aluminum Hex Frame Included' : 'Canopy Top Skin Only',
    wallsLabel: configuration.walls.replace('_', ' ').toUpperCase(),
    halfWallsLabel: configuration.halfWalls.replace('_', ' ').toUpperCase(),
    printTypeLabel: configuration.printType === 'full_digital_dye_sub' ? 'Edge-to-Edge Full Dye-Sublimation' : 'Spot Color',
    customizedSurfacesCount: customizedSurfaces,
    totalElementsCount: elementsCount,
    totalPriceFormatted: pricing ? `$${pricing.total.toFixed(2)}` : '$...',
    createdAt: configuration.createdAt,
  };
};
