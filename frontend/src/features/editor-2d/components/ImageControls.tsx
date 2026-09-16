import React, { useRef, useState } from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { ImageElement } from '@shared/types/configuration.js';
import { uploadImageFile } from '../../../services/upload/uploadService.js';
import { UploadCloud, Image as ImageIcon, Trash2, Loader2 } from 'lucide-react';

export function ImageControls() {
  const { currentSurfaceId, selectedElementId, configuration, addElementToSurface, removeElement, updateElement, setNotification } =
    useConfigurator();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const currentSurface = configuration.surfaces[currentSurfaceId];
  const selectedImage = currentSurface?.elements.find((el) => el.id === selectedElementId && el.type === 'image') as
    | ImageElement
    | undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadRes = await uploadImageFile(file);

      // Create an image object to calculate natural aspect ratio
      const img = new Image();
      img.onload = () => {
        const aspect = img.naturalWidth / (img.naturalHeight || 1);
        const newImgElement: ImageElement = {
          id: `img_${Date.now().toString(36)}`,
          type: 'image',
          surfaceId: currentSurfaceId,
          src: uploadRes.url,
          fileName: file.name,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          aspectRatio: aspect,
          x: 0.5,
          y: 0.5,
          scale: 1,
          rotation: 0,
        };
        addElementToSurface(currentSurfaceId, newImgElement);
        setNotification('success', `Logo "${file.name}" added to ${currentSurfaceId}.`);
      };
      img.src = uploadRes.url;
    } catch (err: any) {
      setNotification('error', err.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Button Area */}
      <button
        id="btn-upload-logo-graphic"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full py-2.5 px-3 border border-dashed border-[#D6D0C5] hover:border-[#183C34] bg-white hover:bg-[#FBFAF7] rounded-md transition text-center cursor-pointer flex flex-col items-center justify-center gap-1 group"
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 text-[#183C34] animate-spin" />
        ) : (
          <UploadCloud className="w-4 h-4 text-[#625F58] group-hover:text-[#183C34] transition" />
        )}
        <span className="text-xs font-semibold text-[#171717]">
          {isUploading ? 'Uploading Logo...' : '+ Add Logo or Graphic'}
        </span>
        <span className="text-[10px] text-[#8A867E]">PNG, JPG, SVG, WebP (Max 15MB)</span>
      </button>

      {/* Selected Image Controls */}
      {selectedImage && (
        <div className="p-3 bg-[#FBFAF7] border border-[#E5E1D8] rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#183C34] flex items-center gap-1.5 truncate max-w-[160px]">
              <ImageIcon className="w-3.5 h-3.5 shrink-0" />
              {selectedImage.fileName || 'Custom Logo'}
            </span>
            <button
              onClick={() => removeElement(currentSurfaceId, selectedImage.id)}
              className="text-xs text-[#B5473C] hover:text-red-700 flex items-center gap-1 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#625F58] mb-1 block">
              Scale / Size ({Math.round((selectedImage.scale || 1) * 100)}%)
            </label>
            <input
              type="range"
              min="0.3"
              max="2.5"
              step="0.05"
              value={selectedImage.scale || 1}
              onChange={(e) => updateElement(currentSurfaceId, selectedImage.id, { scale: Number(e.target.value) })}
              className="w-full accent-[#183C34]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#625F58] mb-1 block">
              Rotation ({selectedImage.rotation || 0}°)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedImage.rotation || 0}
              onChange={(e) => updateElement(currentSurfaceId, selectedImage.id, { rotation: Number(e.target.value) })}
              className="w-full accent-[#183C34]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
