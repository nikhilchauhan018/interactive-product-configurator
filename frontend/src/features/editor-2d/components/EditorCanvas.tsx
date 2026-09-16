import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useConfigurator } from '../../../store/configuratorStore.js';
import { renderSurfaceToCanvas } from '../canvas/canvasRenderer.js';
import { pixelToNormalized, normalizedToPixel } from '../utils/coordinateUtils.js';

export function EditorCanvas() {
  const { currentSurfaceId, selectedElementId, configuration, setSelectedElementId, updateElement } =
    useConfigurator();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 700, height: 420 });

  const currentSurface = configuration.surfaces[currentSurfaceId];
  const elements = currentSurface?.elements || [];
  const backgroundColor = currentSurface?.backgroundColor || '#183C34';

  // Responsive canvas dimension sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(w * 0.6); // 1.6:1 aspect ratio
        setDimensions({ width: Math.max(320, w), height: Math.max(220, h) });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Redraw canvas on state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onImageLoaded = () => {
      if (!canvasRef.current) return;
      const c = canvasRef.current.getContext('2d');
      if (c) {
        renderSurfaceToCanvas(
          c,
          dimensions.width,
          dimensions.height,
          backgroundColor,
          elements,
          currentSurfaceId,
          selectedElementId,
          true
        );
      }
    };

    renderSurfaceToCanvas(
      ctx,
      dimensions.width,
      dimensions.height,
      backgroundColor,
      elements,
      currentSurfaceId,
      selectedElementId,
      true,
      onImageLoaded
    );
  }, [dimensions, backgroundColor, elements, currentSurfaceId, selectedElementId]);

  // Drag interaction
  const [isDragging, setIsDragging] = useState(false);
  const dragTargetId = useRef<string | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Hit-test elements from top to bottom
      let hitId: string | null = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        const elX = normalizedToPixel(el.x, dimensions.width);
        const elY = normalizedToPixel(el.y, dimensions.height);
        const hitRadius = (el.type === 'text' ? (el.fontSize || 32) : 60) * (el.scale || 1);

        const dist = Math.hypot(clickX - elX, clickY - elY);
        if (dist <= hitRadius) {
          hitId = el.id;
          break;
        }
      }

      if (hitId) {
        setSelectedElementId(hitId);
        dragTargetId.current = hitId;
        setIsDragging(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } else {
        setSelectedElementId(null);
      }
    },
    [dimensions, elements, setSelectedElementId]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDragging || !dragTargetId.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      const normX = pixelToNormalized(pointerX, dimensions.width);
      const normY = pixelToNormalized(pointerY, dimensions.height);

      updateElement(currentSurfaceId, dragTargetId.current, {
        x: normX,
        y: normY,
      });
    },
    [isDragging, dimensions, currentSurfaceId, updateElement]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    dragTargetId.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center p-2 relative">
      <div className="relative shadow-sm border border-[#E5E1D8] rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="cursor-crosshair touch-none block"
        />

        {/* Overlay instruction */}
        <div className="absolute bottom-2 left-2 text-[10px] text-[#8A867E] bg-white/85 px-2 py-0.5 rounded-sm backdrop-blur-xs pointer-events-none">
          Click & drag text/logo to position • Dashed line shows printable boundary
        </div>
      </div>
    </div>
  );
}
