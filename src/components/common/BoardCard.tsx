import React from 'react'
import { Board } from '@/types'
import { Star, MoreVertical, Calendar, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface BoardCardProps {
  board: Board
  onClick: () => void
  onToggleFavorite: () => void
}

export default function BoardCard({ board, onClick, onToggleFavorite }: BoardCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {board.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{board.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Star
            size={20}
            className={board.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
          />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Calendar size={14} />
          <span>Updated {formatDistanceToNow(board.updatedAt, { addSuffix: true })}</span>
        </div>
        {board.isShared && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Users size={14} />
            <span>Shared with {board.sharedWith.length} people</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {board.workspaces.map((ws) => (
          <span
            key={ws.id}
            className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full"
          >
            {ws.type}
          </span>
        ))}
      </div>
    </div>
  )
}
