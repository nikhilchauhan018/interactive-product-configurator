import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { PRINT_TYPE_OPTIONS } from '../../../products/canopy-10x10/options.js';
import { Check } from 'lucide-react';

export function PrintTypeOptions() {
  const { configuration, setPrintType } = useConfigurator();

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-[#625F58] uppercase tracking-wider block">
        5. Print Technology & Method
      </label>
      <div className="space-y-1.5">
        {PRINT_TYPE_OPTIONS.map((opt) => {
          const isSelected = configuration.printType === opt.id;
          return (
            <button
              key={opt.id}
              id={`print-opt-${opt.id}`}
              onClick={() => setPrintType(opt.id)}
              className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-start justify-between ${
                isSelected
                  ? 'border-[#183C34] bg-[#183C34]/5 ring-1 ring-[#183C34]'
                  : 'border-[#E5E1D8] bg-white hover:border-[#D6D0C5]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#171717]">{opt.label}</span>
                  {opt.badge && (
                    <span className="text-[9px] font-semibold text-[#183C34] bg-[#183C34]/10 px-1.5 py-0.2 rounded-sm">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#8A867E] mt-0.5">{opt.sublabel}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#171717]">
                  {opt.priceDelta < 0 ? `-$${Math.abs(opt.priceDelta)}` : 'Standard'}
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
