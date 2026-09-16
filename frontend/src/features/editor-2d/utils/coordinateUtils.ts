export function normalizedToPixel(normalized: number, dimension: number): number {
  return normalized * dimension;
}

export function pixelToNormalized(pixel: number, dimension: number): number {
  if (dimension === 0) return 0;
  return Math.max(0.05, Math.min(0.95, pixel / dimension));
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
