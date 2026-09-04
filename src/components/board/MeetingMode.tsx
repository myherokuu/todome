import React, { useState } from 'react'
import { useBoardStore } from '@/store/boardStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MeetingMode() {
  const { currentBoard, currentWorkspace } = useBoardStore()
  const [currentWorkspaceIndex, setCurrentWorkspaceIndex] = useState(0)

  if (!currentBoard) return null

  const workspaces = currentBoard.workspaces
  const activeWorkspace = workspaces[currentWorkspaceIndex]

  const handlePrev = () => {
    setCurrentWorkspaceIndex((i) => (i - 1 + workspaces.length) % workspaces.length)
  }

  const handleNext = () => {
    setCurrentWorkspaceIndex((i) => (i + 1) % workspaces.length)
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col">
      {/* Meeting Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-8 py-6 text-white">
        <h1 className="text-4xl font-bold mb-2">{currentBoard.title}</h1>
        <div className="flex items-center gap-4 text-sm text-blue-200">
          <span>📅 {new Date().toLocaleDateString()}</span>
          <span>⏰ {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto px-8 py-8 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{activeWorkspace.title}</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Display workspace content based on type */}
          <div className="bg-slate-800 rounded-xl p-8 min-h-96 text-white">
            {activeWorkspace.type === 'meeting' && (
              <div className="space-y-6">
                <pre className="font-sans text-sm whitespace-pre-wrap text-slate-100 leading-relaxed">
                  {activeWorkspace.objects[0]?.content || 'No meeting notes'}
                </pre>
              </div>
            )}

            {activeWorkspace.type === 'checklist' && (
              <div className="space-y-3">
                {activeWorkspace.objects[0]?.data?.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                      className="w-6 h-6"
                    />
                    <span className={item.completed ? 'line-through text-slate-500' : ''}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeWorkspace.type === 'kanban' && (
              <div className="flex gap-6 overflow-x-auto pb-4">
                {activeWorkspace.objects[0]?.data?.columns?.map((column: any) => (
                  <div key={column.id} className="flex-0 w-64 bg-slate-700 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3">{column.title}</h3>
                    <div className="space-y-2">
                      {column.cards?.slice(0, 3).map((card: any) => (
                        <div key={card.id} className="bg-slate-600 p-3 rounded text-sm">
                          {card.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeWorkspace.type === 'whiteboard' && (
              <div className="text-center text-slate-400">
                <p>Canvas with {activeWorkspace.objects.length} objects</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {activeWorkspace.objects.map((obj) => (
                    <div
                      key={obj.id}
                      className="bg-slate-700 p-4 rounded text-xs overflow-hidden"
                    >
                      {obj.content || `${obj.type} object`}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeWorkspace.type === 'mindmap' && (
              <div className="text-center text-slate-400">
                <p className="text-lg font-semibold mb-4">
                  {activeWorkspace.objects[0]?.data?.root || 'Mind Map'}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {activeWorkspace.objects[0]?.data?.nodes?.map((node: any, i: number) => (
                    <div key={i} className="bg-slate-700 p-4 rounded">
                      <p className="font-bold text-white">{node.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-slate-800 border-t border-slate-700 px-8 py-4 flex justify-between items-center">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <div className="flex gap-2">
          {workspaces.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentWorkspaceIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentWorkspaceIndex ? 'bg-blue-500 w-8' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
