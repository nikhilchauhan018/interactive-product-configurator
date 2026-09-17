import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { SIZE_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check, TentTree } from 'lucide-react';

export function SizeOption() {
  const { configuration, setSize } = useConfigurator();

  return (
    <div className="space-y-2.5">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#625F58]">
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
              className={`relative rounded-[8px] border p-3 text-left transition-all ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5] hover:bg-[#FBFAF7]'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#FBFAF7] text-[#625F58]">
                  <TentTree className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 text-[12px] font-semibold leading-[18px] text-[#171717]">{opt.label}</span>
                {isSelected && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#183C34]" />}
              </div>
              <p className="mt-1 text-[11px] leading-[16px] text-[#625F58]">{opt.sublabel}</p>
              {opt.badge && (
                <span className="mt-2 inline-flex rounded-[6px] bg-[#183C34]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#183C34]">
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
