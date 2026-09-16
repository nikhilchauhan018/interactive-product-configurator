import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { CANOPY_SURFACES, SurfaceId } from '@shared/constants/surfaces.js';

export function SurfaceSelector() {
  const { currentSurfaceId, setCurrentSurfaceId, configuration } = useConfigurator();

  // Filter surfaces based on enabled walls
  const availableSurfaces = CANOPY_SURFACES.filter((s) => {
    if (s.type === 'roof') return true;
    if (s.type === 'wall') {
      if (configuration.walls === 'none') return false;
      if (configuration.walls.startsWith('1_')) return s.id === 'wall_back';
      return true; // 3_single or 3_double has back, left, right
    }
    if (s.type === 'halfwall') {
      return configuration.halfWalls !== 'none';
    }
    return true;
  });

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {availableSurfaces.map((surface) => {
        const isSelected = currentSurfaceId === surface.id;
        const customization = configuration.surfaces[surface.id];
        const elementsCount = customization?.elements?.length || 0;

        return (
          <button
            key={surface.id}
            id={`surface-btn-${surface.id}`}
            onClick={() => setCurrentSurfaceId(surface.id)}
            className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md transition-all duration-150 flex items-center gap-1.5 ${
              isSelected
                ? 'bg-[#183C34] text-white shadow-xs'
                : 'bg-white text-[#625F58] hover:text-[#171717] hover:bg-[#FBFAF7] border border-[#E5E1D8]'
            }`}
          >
            <span>{surface.label}</span>
            {elementsCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#183C34]/10 text-[#183C34]'
                }`}
              >
                {elementsCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
