import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { WALL_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check } from 'lucide-react';

export function WallOptions() {
  const { configuration, setWalls } = useConfigurator();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#625F58] uppercase tracking-wider block">
        3. Full Enclosure Walls
      </label>
      <div className="space-y-1.5">
        {WALL_OPTIONS.map((opt) => {
          const isSelected = configuration.walls === opt.id;
          return (
            <button
              key={opt.id}
              id={`wall-opt-${opt.id}`}
              onClick={() => setWalls(opt.id)}
              className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5]'
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-[#171717] block">{opt.label}</span>
                {opt.sublabel && <span className="text-[10px] text-[#8A867E] block">{opt.sublabel}</span>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#171717]">
                  {opt.priceDelta > 0 ? `+$${opt.priceDelta}` : 'None'}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#183C34]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
