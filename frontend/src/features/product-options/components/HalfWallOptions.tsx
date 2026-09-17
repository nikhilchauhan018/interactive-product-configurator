import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { HALF_WALL_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check, PanelBottom } from 'lucide-react';

export function HalfWallOptions() {
  const { configuration, setHalfWalls } = useConfigurator();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#625F58] uppercase tracking-wider block">
        4. Rail Half Walls (Skirts)
      </label>
      <div className="space-y-1.5">
        {HALF_WALL_OPTIONS.map((opt) => {
          const isSelected = configuration.halfWalls === opt.id;
          return (
            <button
              key={opt.id}
              id={`halfwall-opt-${opt.id}`}
              onClick={() => setHalfWalls(opt.id)}
              className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5]'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-[#FBFAF7] text-[#625F58]"><PanelBottom className="h-3.5 w-3.5" /></span>
                <div>
                <span className="text-xs font-semibold text-[#171717] block">{opt.label}</span>
                {opt.sublabel && <span className="text-[10px] text-[#8A867E] block">{opt.sublabel}</span>}
              </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#171717]">
                  {(opt.priceDelta || 0) > 0 ? `+$${opt.priceDelta || 0}` : 'None'}
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
