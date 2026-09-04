import React, { useState } from 'react'
import { Workspace, KanbanColumn, KanbanCard as KanbanCardType } from '@/types'
import { Plus, MoreVertical } from 'lucide-react'

interface KanbanCanvasProps {
  workspace: Workspace
}

export default function KanbanCanvas({ workspace }: KanbanCanvasProps) {
  const kanbanObj = workspace.objects[0]
  const columns: KanbanColumn[] = (kanbanObj?.data?.columns as KanbanColumn[]) || []
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const priorityColors = {
    high: 'border-red-500 bg-red-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-green-500 bg-green-50',
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 overflow-auto p-6">
      <div className="flex gap-6">
        {columns.map((column) => (
          <div key={column.id} className="flex-0 w-80">
            <div className="bg-slate-700/50 rounded-xl overflow-hidden flex flex-col h-screen">
              {/* Column Header */}
              <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{column.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{column.cards.length} cards</p>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {column.cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                    className={`bg-white rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all border-l-4 ${
                      priorityColors[card.priority]
                    }`}
                  >
                    <h4 className="font-medium text-slate-900 mb-2">{card.title}</h4>
                    {expandedCard === card.id && card.description && (
                      <p className="text-xs text-slate-600 mb-2">{card.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {card.assignee && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                            {card.assignee[0]}
                          </div>
                        )}
                        {card.checklist && card.checklist.length > 0 && (
                          <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {card.checklist.filter((i) => i.completed).length}/{card.checklist.length}
                          </div>
                        )}
                      </div>
                      {card.dueDate && (
                        <div className="text-xs text-slate-500">
                          {new Date(card.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Card Button */}
              <div className="p-3 border-t border-slate-600">
                <button className="w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                  <Plus size={16} />
                  Add Card
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
