import React, { useState } from 'react'
import { useBoardStore } from '@/store/boardStore'
import WhiteboardCanvas from './workspaces/WhiteboardCanvas'
import ChecklistCanvas from './workspaces/ChecklistCanvas'
import KanbanCanvas from './workspaces/KanbanCanvas'
import MindMapCanvas from './workspaces/MindMapCanvas'
import MeetingCanvas from './workspaces/MeetingCanvas'
import MeetingMode from './MeetingMode'

export default function Canvas() {
  const { currentWorkspace, isMeetingMode, currentBoard } = useBoardStore()

  if (!currentBoard) return null

  if (isMeetingMode) {
    return <MeetingMode />
  }

  if (!currentWorkspace) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Select a workspace to begin</p>
        </div>
      </div>
    )
  }

  switch (currentWorkspace.type) {
    case 'whiteboard':
      return <WhiteboardCanvas workspace={currentWorkspace} />
    case 'checklist':
      return <ChecklistCanvas workspace={currentWorkspace} />
    case 'kanban':
      return <KanbanCanvas workspace={currentWorkspace} />
    case 'mindmap':
      return <MindMapCanvas workspace={currentWorkspace} />
    case 'meeting':
      return <MeetingCanvas workspace={currentWorkspace} />
    default:
      return (
        <div className="flex-1 flex items-center justify-center bg-slate-900">
          <p className="text-slate-400">Unknown workspace type</p>
        </div>
      )
  }
}
