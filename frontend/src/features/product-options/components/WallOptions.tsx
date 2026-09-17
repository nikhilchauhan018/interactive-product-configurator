import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { WALL_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check, PanelsTopLeft } from 'lucide-react';

export function WallOptions() {
  const { configuration, setWalls } = useConfigurator();

  return (
    <div className="space-y-2.5">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#625F58]">
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
              className={`flex w-full items-center justify-between rounded-[8px] border p-2.5 text-left transition-all ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5] hover:bg-[#FBFAF7]'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-[#FBFAF7] text-[#625F58]"><PanelsTopLeft className="h-3.5 w-3.5" /></span>
                <div>
                <span className="block text-[12px] font-semibold text-[#171717]">{opt.label}</span>
                {opt.sublabel && <span className="mt-0.5 block text-[10px] text-[#8A867E]">{opt.sublabel}</span>}
              </div>
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                <span className="text-[12px] font-medium text-[#171717]">
                  {(opt.priceDelta || 0) > 0 ? `+$${opt.priceDelta || 0}` : 'None'}
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 text-[#183C34]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
