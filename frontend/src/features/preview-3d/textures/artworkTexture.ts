import * as THREE from 'three';
import { SurfaceCustomization } from '@shared/types/configuration.js';
import { renderSurfaceToCanvas } from '../../editor-2d/canvas/canvasRenderer.js';

export function createSurfaceCanvasTexture(
  surface: SurfaceCustomization,
  width: number = 1024,
  height: number = 1024
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    renderSurfaceToCanvas(
      ctx,
      width,
      height,
      surface.backgroundColor,
      surface.elements,
      surface.surfaceId,
      null,
      false // No dashed guides on 3D model!
    );
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
