import React, { useState } from 'react'
import { Workspace } from '@/types'

interface MeetingCanvasProps {
  workspace: Workspace
}

export default function MeetingCanvas({ workspace }: MeetingCanvasProps) {
  const meetingObj = workspace.objects[0]
  const content = meetingObj?.content || ''
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 overflow-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
            <h2 className="text-3xl font-bold">{workspace.title}</h2>
            <p className="text-sm text-purple-200 mt-2">Meeting Notes & Discussion</p>
          </div>

          {/* Content */}
          <div className="p-6 min-h-96">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-slate-700 text-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <pre className="text-slate-100 font-sans whitespace-pre-wrap text-sm leading-relaxed">
                {content}
              </pre>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-700/50 px-6 py-4 border-t border-slate-600 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setEditedContent(editedContent)
                    setIsEditing(false)
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Edit Notes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
