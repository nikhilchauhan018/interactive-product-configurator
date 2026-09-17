import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { FRAME_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check, Frame } from 'lucide-react';

export function FrameOption() {
  const { configuration, setIncludeFrame } = useConfigurator();

  return (
    <div className="space-y-2.5">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#625F58]">
        2. Hardware Frame Kit
      </label>
      <div className="space-y-2">
        {FRAME_OPTIONS.map((opt) => {
          const isSelected = configuration.includeFrame === opt.id;
          return (
            <button
              key={String(opt.id)}
              id={`frame-opt-${opt.id}`}
              onClick={() => setIncludeFrame(opt.id)}
              className={`flex w-full items-start justify-between rounded-[8px] border p-3 text-left transition-all ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5] hover:bg-[#FBFAF7]'
              }`}
            >
              <div className="flex min-w-0 gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#FBFAF7] text-[#625F58]"><Frame className="h-4 w-4" /></span>
                <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#171717]">{opt.label}</span>
                  {opt.badge && (
                    <span className="rounded-[6px] bg-[#183C34]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#183C34]">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-[16px] text-[#625F58]">{opt.description}</p>
              </div>
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                <span className="text-[12px] font-semibold text-[#171717]">
                  {(opt.priceDelta || 0) > 0 ? `+$${opt.priceDelta || 0}` : 'Included'}
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
