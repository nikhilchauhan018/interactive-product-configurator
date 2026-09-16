import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { Product3DPreview } from '../../preview-3d/components/Product3DPreview.js';
import { Editor2D } from '../../editor-2d/components/Editor2D.js';

export function ConfiguratorWorkspace() {
  const { viewportMode } = useConfigurator();

  // If mode is split, show both side-by-side; if 2d, show 2D editor; default shows 3D
  if (viewportMode === 'split') {
    return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-[550px]">
        <div className="h-full flex flex-col">
          <span className="text-[11px] font-semibold text-[#625F58] mb-1">Live 3D Rendering</span>
          <div className="flex-1 rounded-xl overflow-hidden border border-[#E5E1D8]">
            <Product3DPreview />
          </div>
        </div>
        <div className="h-full flex flex-col">
          <span className="text-[11px] font-semibold text-[#625F58] mb-1">Printable Surface Editor</span>
          <div className="flex-1 overflow-y-auto">
            <Editor2D />
          </div>
        </div>
      </div>
    );
  }

  if (viewportMode === '2d') {
    return (
      <div className="w-full h-full p-4 min-h-[550px]">
        <Editor2D />
      </div>
    );
  }

  // Default: 3D Preview
  return (
    <div className="w-full h-full p-4 min-h-[550px] flex flex-col">
      <div className="flex-1 rounded-xl overflow-hidden border border-[#E5E1D8] shadow-xs">
        <Product3DPreview />
      </div>
    </div>
  );
}
