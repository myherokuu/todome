import React from 'react'
import { useBoardStore } from '@/store/boardStore'
import { ToolType } from '@/types'
import {
  Pointer,
  Pen,
  Highlighter,
  Eraser,
  Type,
  MessageSquare,
  Square,
  Circle,
  ArrowRight,
  Image,
  CheckSquare,
  LayoutGrid,
  GitBranch,
} from 'lucide-react'

const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
  { id: 'select', icon: <Pointer size={20} />, label: 'Select' },
  { id: 'pen', icon: <Pen size={20} />, label: 'Pen' },
  { id: 'highlighter', icon: <Highlighter size={20} />, label: 'Highlighter' },
  { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
  { id: 'text', icon: <Type size={20} />, label: 'Text' },
  { id: 'sticky', icon: <MessageSquare size={20} />, label: 'Sticky Note' },
  { id: 'rectangle', icon: <Square size={20} />, label: 'Rectangle' },
  { id: 'circle', icon: <Circle size={20} />, label: 'Circle' },
  { id: 'arrow', icon: <ArrowRight size={20} />, label: 'Arrow' },
  { id: 'image', icon: <Image size={20} />, label: 'Image' },
  { id: 'checklist', icon: <CheckSquare size={20} />, label: 'Checklist' },
  { id: 'kanban', icon: <LayoutGrid size={20} />, label: 'Kanban' },
  { id: 'mindmap', icon: <GitBranch size={20} />, label: 'Mind Map' },
]

export default function Toolbar() {
  const { selectedTool, setSelectedTool } = useBoardStore()

  return (
    <div className="w-16 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-4 gap-2 overflow-y-auto">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setSelectedTool(tool.id)}
          className={`p-3 rounded-lg transition-all ${
            selectedTool === tool.id
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  )
}
