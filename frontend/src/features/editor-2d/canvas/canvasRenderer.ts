import { EditorElement } from '@shared/types/configuration.js';
import { SurfaceId } from '@shared/constants/surfaces.js';
import { normalizedToPixel } from '../utils/coordinateUtils.js';

const imageCache = new Map<string, HTMLImageElement>();

export function getCachedImage(src: string, onLoaded?: () => void): HTMLImageElement {
  if (imageCache.has(src)) {
    const existing = imageCache.get(src)!;
    if (!existing.complete && onLoaded) {
      existing.addEventListener('load', onLoaded, { once: true });
    }
    return existing;
  }
  const img = new Image();
  img.crossOrigin = 'anonymous';
  if (onLoaded) {
    img.addEventListener('load', onLoaded, { once: true });
  }
  img.src = src;
  imageCache.set(src, img);
  return img;
}

export function renderSurfaceToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  backgroundColor: string,
  elements: EditorElement[],
  surfaceId: SurfaceId,
  selectedElementId: string | null = null,
  showGuides: boolean = true,
  onImageLoaded?: () => void
): void {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Surface Background
  ctx.fillStyle = backgroundColor || '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // 2. Printable Safety Margin Guide (Editorial Subtle Dash)
  if (showGuides) {
    ctx.save();
    const margin = 24;
    ctx.strokeStyle = 'rgba(214, 208, 197, 0.7)'; // #D6D0C5
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

    // Valance boundary guideline if roof surface
    if (surfaceId.startsWith('roof_')) {
      const valanceY = height * 0.75;
      ctx.strokeStyle = 'rgba(182, 106, 69, 0.4)'; // #B66A45 subtle warm clay
      ctx.beginPath();
      ctx.moveTo(margin, valanceY);
      ctx.lineTo(width - margin, valanceY);
      ctx.stroke();

      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(138, 134, 126, 0.8)';
      ctx.fillText('Peak / Valance Fold Line', margin + 6, valanceY - 5);
    }
    ctx.restore();
  }

  // 3. Render Elements in layer order
  for (const el of elements) {
    const cx = normalizedToPixel(el.x, width);
    const cy = normalizedToPixel(el.y, height);
    const isSelected = el.id === selectedElementId;

    ctx.save();
    ctx.translate(cx, cy);
    if (el.rotation) {
      ctx.rotate((el.rotation * Math.PI) / 180);
    }
    const scale = el.scale || 1;
    ctx.scale(scale, scale);

    if (el.type === 'text') {
      const fontSize = el.fontSize || 32;
      const weight = el.fontWeight || 'bold';
      ctx.font = `${weight} ${fontSize}px ${el.fontFamily || 'Inter'}, sans-serif`;
      ctx.fillStyle = el.fill || '#171717';
      ctx.textAlign = (el.textAlign as CanvasTextAlign) || 'center';
      ctx.textBaseline = 'middle';

      // Measure bounding for selection box
      const metrics = ctx.measureText(el.text);
      const textWidth = metrics.width;
      const textHeight = fontSize * 1.2;

      ctx.fillText(el.text, 0, 0);

      if (isSelected && showGuides) {
        ctx.strokeStyle = '#183C34'; // Deep forest
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        const pad = 8;
        ctx.strokeRect(-textWidth / 2 - pad, -textHeight / 2 - pad, textWidth + pad * 2, textHeight + pad * 2);
      }
    } else if (el.type === 'image') {
      const img = getCachedImage(el.src, onImageLoaded);
      // Pre-cached or drawn if loaded
      const targetWidth = 140;
      const aspect = el.aspectRatio || 1;
      const targetHeight = targetWidth / aspect;

      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
      } else {
        // Placeholder box while rendering
        ctx.fillStyle = '#E5E1D8';
        ctx.fillRect(-targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
        ctx.fillStyle = '#171717';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(el.fileName || 'Logo', 0, 0);
      }

      if (isSelected && showGuides) {
        ctx.strokeStyle = '#183C34';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        const pad = 6;
        ctx.strokeRect(-targetWidth / 2 - pad, -targetHeight / 2 - pad, targetWidth + pad * 2, targetHeight + pad * 2);
      }
    }

    ctx.restore();
  }

  ctx.restore();
}
