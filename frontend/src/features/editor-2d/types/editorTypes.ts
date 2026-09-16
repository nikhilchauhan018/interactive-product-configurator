import { EditorElement } from '@shared/types/configuration.js';
import { SurfaceId } from '@shared/constants/surfaces.js';

export interface EditorCanvasProps {
  surfaceId: SurfaceId;
  backgroundColor: string;
  elements: EditorElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
}

export interface DragState {
  elementId: string;
  startX: number;
  startY: number;
  initialElemX: number;
  initialElemY: number;
}
