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
    <div className="flex flex-col h-full bg-[#FBFAF7] rounded-xl border border-[#E5E1D8] p-4 space-y-4">
      {/* Surface Selector Navigation */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#171717]">Select Surface to Customize</span>
          <span className="text-[11px] text-[#8A867E]">Active: {currentSurfaceId}</span>
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
