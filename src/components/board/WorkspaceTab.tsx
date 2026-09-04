import React from 'react'
import { Workspace } from '@/types'
import { X } from 'lucide-react'

interface WorkspaceTabProps {
  workspace: Workspace
  isActive: boolean
  onClick: () => void
}

const typeIcons: Record<string, string> = {
  whiteboard: '✏️',
  checklist: '✓',
  kanban: '📋',
  mindmap: '🧠',
  meeting: '📅',
}

export default function WorkspaceTab({ workspace, isActive, onClick }: WorkspaceTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
      }`}
    >
      <span>{typeIcons[workspace.type]}</span>
      <span className="text-sm font-medium">{workspace.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="p-1 hover:bg-white/20 rounded transition-colors"
      >
        <X size={14} />
      </button>
    </button>
  )
}
