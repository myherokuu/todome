export type WorkspaceType = 'whiteboard' | 'checklist' | 'kanban' | 'mindmap' | 'meeting';
export type ToolType = 'select' | 'pen' | 'highlighter' | 'eraser' | 'text' | 'sticky' | 'rectangle' | 'circle' | 'arrow' | 'image' | 'checklist' | 'kanban' | 'mindmap';
export type ObjectType = 'shape' | 'text' | 'sticky' | 'image' | 'checklist' | 'kanban' | 'mindmap' | 'arrow';

export interface Point {
  x: number;
  y: number;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
  isShared: boolean;
  workspaces: Workspace[];
  owner: string;
  sharedWith: string[];
}

export interface Workspace {
  id: string;
  boardId: string;
  type: WorkspaceType;
  title: string;
  position: number;
  objects: CanvasObject[];
}

export interface CanvasObject {
  id: string;
  type: ObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  data?: Record<string, unknown>;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
  notes?: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: Date;
  checklist?: ChecklistItem[];
  comments?: string[];
  attachments?: string[];
  columnId: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  children: MindMapNode[];
  color?: string;
}

export interface MeetingNote {
  id: string;
  title: string;
  agenda: string;
  discussion: string;
  decisions: string;
  issues: string;
  actionItems: ActionItem[];
  nextSteps: string;
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}
