import React from 'react';
import { SurfaceSelector } from './SurfaceSelector.js';
import { EditorCanvas } from './EditorCanvas.js';
import { TextControls } from './TextControls.js';
import { ImageControls } from './ImageControls.js';
import { ColorControls } from './ColorControls.js';
import { useConfigurator } from '../../../store/configuratorStore.js';

export function Editor2D() {
  const { currentSurfaceId } = useConfigurator();

  return (
    <div className="flex min-h-full flex-col bg-[#FBFAF7] p-4 space-y-4">
      {/* Surface Selector Navigation */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-[16px] font-semibold leading-[22px] text-[#171717]">Customize your branding</h2>
            <p className="mt-0.5 text-[12px] leading-[16px] text-[#625F58]">Choose a printable surface, then add text, color, or a logo.</p>
          </div>
          <span className="text-[11px] font-medium text-[#8A867E]">Active: {currentSurfaceId.replace('_', ' ')}</span>
        </div>
        <SurfaceSelector />
      </div>

      {/* Main 2D Canvas */}
      <div className="flex-1 flex items-center justify-center min-h-[300px] bg-[#F6F4EF] rounded-lg border border-[#E5E1D8]">
        <EditorCanvas />
      </div>

      {/* Editor Controls Bar (Color, Text, Logo Upload) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#E5E1D8]">
        <ColorControls />
        <TextControls />
        <ImageControls />
      </div>
    </div>
  );
}
