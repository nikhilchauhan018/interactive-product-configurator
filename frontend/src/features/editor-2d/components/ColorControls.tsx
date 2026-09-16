import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { POPULAR_CANOPY_COLORS } from '../../../assets/textureRegistry.js';

export function ColorControls() {
  const { currentSurfaceId, setSurfaceBackgroundColor, configuration } = useConfigurator();
  const currentSurface = configuration.surfaces[currentSurfaceId];
  const currentColor = currentSurface?.backgroundColor || '#183C34';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#625F58] uppercase tracking-wider">Surface Canvas Color</label>
        <span className="font-mono text-xs text-[#8A867E] uppercase">{currentColor}</span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {POPULAR_CANOPY_COLORS.map((col) => {
          const isSelected = currentColor.toLowerCase() === col.hex.toLowerCase();
          return (
            <button
              key={col.hex}
              id={`color-swatch-${col.hex.replace('#', '')}`}
              title={col.name}
              onClick={() => setSurfaceBackgroundColor(currentSurfaceId, col.hex)}
              className={`w-6 h-6 rounded-md border transition-all ${
                isSelected
                  ? 'ring-2 ring-[#183C34] ring-offset-1 scale-105 border-white'
                  : 'border-[#D6D0C5] hover:scale-105'
              }`}
              style={{ backgroundColor: col.hex }}
            />
          );
        })}

        {/* Custom Color Input */}
        <label className="relative cursor-pointer w-6 h-6 rounded-md border border-[#D6D0C5] flex items-center justify-center bg-white overflow-hidden hover:border-[#183C34]">
          <span className="text-[10px] font-bold text-[#625F58]">+</span>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setSurfaceBackgroundColor(currentSurfaceId, e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
