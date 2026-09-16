import { ConfiguratorState } from '../storeTypes.js';
import { SurfaceId } from '@shared/constants/surfaces.js';
import { SurfaceCustomization, EditorElement } from '@shared/types/configuration.js';

export const selectCurrentSurface = (state: ConfiguratorState): SurfaceCustomization | undefined => {
  return state.configuration.surfaces[state.currentSurfaceId];
};

export const selectSurfaceById = (state: ConfiguratorState, surfaceId: SurfaceId): SurfaceCustomization | undefined => {
  return state.configuration.surfaces[surfaceId];
};

export const selectSelectedElement = (state: ConfiguratorState): EditorElement | undefined => {
  if (!state.selectedElementId) return undefined;
  const current = state.configuration.surfaces[state.currentSurfaceId];
  return current?.elements.find((el) => el.id === state.selectedElementId);
};

export const selectTotalElementsCount = (state: ConfiguratorState): number => {
  let count = 0;
  for (const s of Object.values(state.configuration.surfaces) as SurfaceCustomization[]) {
    count += s.elements.length;
  }
  return count;
};
