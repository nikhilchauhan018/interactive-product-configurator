import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { SIZE_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check } from 'lucide-react';

export function SizeOption() {
  const { configuration, setSize } = useConfigurator();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#625F58] uppercase tracking-wider block">
        1. Select Canopy Size
      </label>
      <div className="grid grid-cols-2 gap-2">
        {SIZE_OPTIONS.map((opt) => {
          const isSelected = configuration.size === opt.id;
          return (
            <button
              key={opt.id}
              id={`size-opt-${opt.id}`}
              onClick={() => setSize(opt.id)}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5] hover:bg-[#FBFAF7]'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-[#171717]">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#183C34]" />}
              </div>
              <p className="text-[11px] text-[#625F58] mt-1 leading-tight">{opt.sublabel}</p>
              {opt.badge && (
                <span className="inline-block mt-1.5 text-[9px] font-semibold text-[#183C34] bg-[#183C34]/10 px-1.5 py-0.5 rounded-sm">
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
