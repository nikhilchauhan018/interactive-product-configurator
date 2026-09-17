import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { Product3DPreview } from '../../preview-3d/components/Product3DPreview.js';
import { Editor2D } from '../../editor-2d/components/Editor2D.js';

export function ConfiguratorWorkspace() {
  const { viewportMode } = useConfigurator();

  // If mode is split, show both side-by-side; if 2d, show 2D editor; default shows 3D
  if (viewportMode === 'split') {
    return (
      <div className="grid min-h-[550px] w-full grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <div className="flex h-full flex-col">
          <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#625F58]">
            Live 3D Rendering
          </span>
          <div className="flex-1 overflow-hidden rounded-[12px] border border-[#E5E1D8] bg-[#FBFAF7]">
            <Product3DPreview />
          </div>
        </div>
        <div className="flex h-full flex-col">
          <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#625F58]">
            Printable Surface Editor
          </span>
          <div className="flex-1 overflow-y-auto rounded-[12px] border border-[#E5E1D8] bg-white">
            <Editor2D />
          </div>
        </div>
      </div>
    );
  }

  if (viewportMode === '2d') {
    return (
      <div className="min-h-[550px] w-full p-4">
        <div className="h-full rounded-[12px] border border-[#E5E1D8] bg-white overflow-hidden">
          <Editor2D />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[550px] h-full w-full flex-col p-4">
      <div className="flex-1 overflow-hidden rounded-[12px] border border-[#E5E1D8] bg-[#FBFAF7] shadow-[0_6px_18px_rgba(23,23,23,0.04)]">
        <Product3DPreview />
      </div>
    </div>
  );
}
