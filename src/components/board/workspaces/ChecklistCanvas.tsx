import React, { useState } from 'react'
import { Workspace, ChecklistItem } from '@/types'
import { Plus, Trash2, Check } from 'lucide-react'

interface ChecklistCanvasProps {
  workspace: Workspace
}

export default function ChecklistCanvas({ workspace }: ChecklistCanvasProps) {
  const checklistObj = workspace.objects[0]
  const items: ChecklistItem[] = (checklistObj?.data?.items as ChecklistItem[]) || []
  const [newItem, setNewItem] = useState('')

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  const completedCount = items.filter((i) => i.completed).length
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 overflow-auto p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{workspace.title}</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                {completedCount} of {items.length} completed
              </div>
              <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden max-w-xs">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-slate-700">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-slate-700/50 transition-colors flex items-start gap-4"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  className="mt-1 w-5 h-5 cursor-pointer"
                />
                <div className="flex-1">
                  <div
                    className={`font-medium ${
                      item.completed ? 'text-slate-400 line-through' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </div>
                  {item.dueDate && (
                    <div className="text-xs text-slate-400 mt-1">
                      Due: {item.dueDate.toLocaleDateString()}
                    </div>
                  )}
                  {item.assignee && (
                    <div className="text-xs text-slate-400 mt-1">Assigned to: {item.assignee}</div>
                  )}
                </div>
                {item.priority && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[item.priority]}`}>
                    {item.priority}
                  </span>
                )}
                <button className="text-slate-400 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Item */}
          <div className="p-4 bg-slate-700/50 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item..."
                className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
