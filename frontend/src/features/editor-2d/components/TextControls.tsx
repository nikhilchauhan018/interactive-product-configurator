import React from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { TextElement } from '@shared/types/configuration.js';
import { Type, AlignLeft, AlignCenter, AlignRight, Trash2 } from 'lucide-react';

export function TextControls() {
  const { currentSurfaceId, selectedElementId, configuration, updateElement, removeElement, addElementToSurface } =
    useConfigurator();

  const currentSurface = configuration.surfaces[currentSurfaceId];
  const selectedElement = currentSurface?.elements.find((el) => el.id === selectedElementId) as TextElement | undefined;

  const handleAddText = () => {
    const newText: TextElement = {
      id: `text_${Date.now().toString(36)}`,
      type: 'text',
      surfaceId: currentSurfaceId,
      text: 'BRAND NAME',
      fontSize: 32,
      fontFamily: 'Inter',
      fill: '#FFFFFF',
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0,
      fontWeight: '700',
      textAlign: 'center',
    };
    addElementToSurface(currentSurfaceId, newText);
  };

  if (!selectedElement || selectedElement.type !== 'text') {
    return (
      <button
        id="btn-add-text-element"
        onClick={handleAddText}
        className="w-full py-2 px-3 text-xs font-semibold text-[#183C34] bg-white border border-[#D6D0C5] rounded-md hover:bg-[#FBFAF7] hover:border-[#183C34] transition flex items-center justify-center gap-2"
      >
        <Type className="w-4 h-4 text-[#183C34]" />
        Add Text / Heading
      </button>
    );
  }

  return (
    <div className="p-3 bg-[#FBFAF7] border border-[#E5E1D8] rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#183C34] flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" /> Text Settings
        </span>
        <button
          onClick={() => removeElement(currentSurfaceId, selectedElement.id)}
          className="text-xs text-[#B5473C] hover:text-red-700 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>

      {/* Text Input */}
      <div>
        <label className="text-[11px] font-medium text-[#625F58] mb-1 block">Lettering Content</label>
        <input
          type="text"
          value={selectedElement.text}
          onChange={(e) => updateElement(currentSurfaceId, selectedElement.id, { text: e.target.value })}
          className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#D6D0C5] rounded-md focus:border-[#183C34] focus:outline-hidden"
          placeholder="Enter text..."
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Font Size */}
        <div>
          <label className="text-[11px] font-medium text-[#625F58] mb-1 block">Font Size ({selectedElement.fontSize}px)</label>
          <input
            type="range"
            min="14"
            max="72"
            value={selectedElement.fontSize}
            onChange={(e) => updateElement(currentSurfaceId, selectedElement.id, { fontSize: Number(e.target.value) })}
            className="w-full accent-[#183C34]"
          />
        </div>

        {/* Text Color */}
        <div>
          <label className="text-[11px] font-medium text-[#625F58] mb-1 block">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedElement.fill}
              onChange={(e) => updateElement(currentSurfaceId, selectedElement.id, { fill: e.target.value })}
              className="w-7 h-7 rounded-sm border border-[#D6D0C5] cursor-pointer"
            />
            <span className="font-mono text-xs text-[#8A867E] uppercase">{selectedElement.fill}</span>
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div className="flex items-center justify-between pt-1">
        <label className="text-[11px] font-medium text-[#625F58]">Alignment</label>
        <div className="inline-flex border border-[#D6D0C5] rounded-md overflow-hidden bg-white">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => updateElement(currentSurfaceId, selectedElement.id, { textAlign: align })}
              className={`px-2 py-1 text-xs transition ${
                selectedElement.textAlign === align ? 'bg-[#183C34] text-white' : 'text-[#625F58] hover:bg-neutral-100'
              }`}
            >
              {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
              {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
              {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
