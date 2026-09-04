import { create } from 'zustand'
import { Board, Workspace, CanvasObject, ToolType, User } from '@/types'

interface BoardState {
  boards: Board[]
  currentBoard: Board | null
  currentWorkspace: Workspace | null
  selectedTool: ToolType
  selectedObject: CanvasObject | null
  currentUser: User
  isLoading: boolean
  isMeetingMode: boolean

  setCurrentBoard: (board: Board | null) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  setSelectedTool: (tool: ToolType) => void
  setSelectedObject: (object: CanvasObject | null) => void
  setMeetingMode: (enabled: boolean) => void

  addBoard: (board: Board) => void
  updateBoard: (boardId: string, updates: Partial<Board>) => void
  deleteBoard: (boardId: string) => void
  toggleFavorite: (boardId: string) => void

  addWorkspace: (boardId: string, workspace: Workspace) => void
  updateWorkspace: (workspaceId: string, updates: Partial<Workspace>) => void
  deleteWorkspace: (workspaceId: string) => void

  addObject: (workspaceId: string, object: CanvasObject) => void
  updateObject: (workspaceId: string, objectId: string, updates: Partial<CanvasObject>) => void
  deleteObject: (workspaceId: string, objectId: string) => void

  getBoardById: (id: string) => Board | undefined
  getWorkspaceById: (id: string) => Workspace | undefined
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  currentBoard: null,
  currentWorkspace: null,
  selectedTool: 'select',
  selectedObject: null,
  currentUser: {
    id: 'user-1',
    email: 'smh',
    name: 'User',
  },
  isLoading: false,
  isMeetingMode: false,

  setCurrentBoard: (board) => set({ currentBoard: board }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setMeetingMode: (enabled) => set({ isMeetingMode: enabled }),

  addBoard: (board) => set((state) => ({
    boards: [...state.boards, board],
  })),

  updateBoard: (boardId, updates) => set((state) => ({
    boards: state.boards.map((b) => b.id === boardId ? { ...b, ...updates } : b),
    currentBoard: state.currentBoard?.id === boardId
      ? { ...state.currentBoard, ...updates }
      : state.currentBoard,
  })),

  deleteBoard: (boardId) => set((state) => ({
    boards: state.boards.filter((b) => b.id !== boardId),
    currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard,
  })),

  toggleFavorite: (boardId) => set((state) => ({
    boards: state.boards.map((b) =>
      b.id === boardId ? { ...b, isFavorite: !b.isFavorite } : b
    ),
  })),

  addWorkspace: (boardId, workspace) => set((state) => ({
    boards: state.boards.map((b) =>
      b.id === boardId
        ? { ...b, workspaces: [...b.workspaces, workspace], updatedAt: new Date() }
        : b
    ),
  })),

  updateWorkspace: (workspaceId, updates) => set((state) => ({
    boards: state.boards.map((b) => ({
      ...b,
      workspaces: b.workspaces.map((w) =>
        w.id === workspaceId ? { ...w, ...updates } : w
      ),
    })),
  })),

  deleteWorkspace: (workspaceId) => set((state) => ({
    boards: state.boards.map((b) => ({
      ...b,
      workspaces: b.workspaces.filter((w) => w.id !== workspaceId),
    })),
  })),

  addObject: (workspaceId, object) => set((state) => ({
    boards: state.boards.map((b) => ({
      ...b,
      workspaces: b.workspaces.map((w) =>
        w.id === workspaceId
          ? { ...w, objects: [...w.objects, object] }
          : w
      ),
    })),
  })),

  updateObject: (workspaceId, objectId, updates) => set((state) => ({
    boards: state.boards.map((b) => ({
      ...b,
      workspaces: b.workspaces.map((w) =>
        w.id === workspaceId
          ? {
              ...w,
              objects: w.objects.map((o) =>
                o.id === objectId ? { ...o, ...updates } : o
              ),
            }
          : w
      ),
    })),
  })),

  deleteObject: (workspaceId, objectId) => set((state) => ({
    boards: state.boards.map((b) => ({
      ...b,
      workspaces: b.workspaces.map((w) =>
        w.id === workspaceId
          ? {
              ...w,
              objects: w.objects.filter((o) => o.id !== objectId),
            }
          : w
      ),
    })),
  })),

  getBoardById: (id) => get().boards.find((b) => b.id === id),
  getWorkspaceById: (id) => {
    for (const board of get().boards) {
      const workspace = board.workspaces.find((w) => w.id === id)
      if (workspace) return workspace
    }
    return undefined
  },
}))
