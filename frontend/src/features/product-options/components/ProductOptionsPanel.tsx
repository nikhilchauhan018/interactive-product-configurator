import React from 'react';
import { SizeOption } from './SizeOption.js';
import { FrameOption } from './FrameOption.js';
import { WallOptions } from './WallOptions.js';
import { HalfWallOptions } from './HalfWallOptions.js';
import { PrintTypeOptions } from './PrintTypeOptions.js';

export function ProductOptionsPanel() {
  return (
    <div className="space-y-5 p-1">
      <SizeOption />
      <FrameOption />
      <WallOptions />
      <HalfWallOptions />
      <PrintTypeOptions />
    </div>
  );
}
