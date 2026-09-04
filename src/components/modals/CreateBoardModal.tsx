import React, { useState } from 'react'
import Button from '../common/Button'
import { X } from 'lucide-react'

interface CreateBoardModalProps {
  onClose: () => void
  onCreateBoard: (title: string, description: string, template: string) => void
}

const templates = [
  { id: 'blank', name: 'Blank Whiteboard', icon: '📝' },
  { id: 'meeting', name: 'Meeting', icon: '📅' },
  { id: 'project-planning', name: 'Project Planning', icon: '📊' },
  { id: 'kanban', name: 'Kanban', icon: '📋' },
  { id: 'brainstorming', name: 'Brainstorming', icon: '💡' },
  { id: 'checklist', name: 'Checklist', icon: '✓' },
  { id: 'mindmap', name: 'Mind Map', icon: '🧠' },
]

export default function CreateBoardModal({ onClose, onCreateBoard }: CreateBoardModalProps) {
  const [step, setStep] = useState<'details' | 'template'>('details')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('blank')

  const handleCreate = () => {
    if (title.trim()) {
      onCreateBoard(title, description, selectedTemplate)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {step === 'details' ? 'Create New Board' : 'Choose Template'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Board Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Q4 Product Roadmap"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this board..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-slate-600 mb-4">Select a template to get started:</p>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTemplate === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{template.icon}</div>
                    <div className="font-medium text-slate-900">{template.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {step === 'details' ? (
            <Button
              variant="primary"
              onClick={() => setStep('template')}
              disabled={!title.trim()}
            >
              Next
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('details')}>
                Back
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create Board
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
