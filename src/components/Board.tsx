import React, { useState } from 'react'
import { useBoardStore } from '@/store/boardStore'
import { ChevronLeft, Share2, Settings, MoreVertical, Eye, Download } from 'lucide-react'
import Button from './common/Button'
import Toolbar from './board/Toolbar'
import Canvas from './board/Canvas'
import WorkspaceTab from './board/WorkspaceTab'

export default function Board() {
  const { currentBoard, setCurrentBoard, currentWorkspace, setCurrentWorkspace, isMeetingMode, setMeetingMode } =
    useBoardStore()
  const [showSave, setShowSave] = useState(false)

  if (!currentBoard) return null

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900">
      {/* Top Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentBoard(null)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <input
              type="text"
              defaultValue={currentBoard.title}
              className="text-lg font-bold text-white bg-transparent border-0 focus:outline-none max-w-md"
            />
          </div>
          {showSave && <span className="text-xs text-green-400">✓ Saved</span>}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isMeetingMode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setMeetingMode(!isMeetingMode)}
            className="text-white hover:bg-slate-700"
          >
            <Eye size={16} className="mr-1" />
            {isMeetingMode ? 'Exit Meeting' : 'Meeting Mode'}
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <Share2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <Download size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <Settings size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Toolbar */}
        <Toolbar />

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col relative">
          {!isMeetingMode && (
            <div className="bg-slate-700 border-b border-slate-600 px-4 py-2 overflow-x-auto flex gap-2">
              {currentBoard.workspaces.map((workspace) => (
                <WorkspaceTab
                  key={workspace.id}
                  workspace={workspace}
                  isActive={workspace.id === currentWorkspace?.id}
                  onClick={() => setCurrentWorkspace(workspace)}
                />
              ))}
            </div>
          )}
          <Canvas />
        </div>
      </div>
    </div>
  )
}
