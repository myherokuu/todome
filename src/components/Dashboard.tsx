import React, { useState } from 'react'
import { useBoardStore } from '@/store/boardStore'
import { Board } from '@/types'
import Button from './common/Button'
import BoardCard from './common/BoardCard'
import CreateBoardModal from './modals/CreateBoardModal'
import { Plus } from 'lucide-react'
import { generateId, createMockBoards } from '@/utils/mockData'

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { boards, setCurrentBoard, addBoard, toggleFavorite } = useBoardStore()

  React.useEffect(() => {
    if (boards.length === 0) {
      const mockBoards = createMockBoards()
      mockBoards.forEach((board) => addBoard(board))
    }
  }, [])

  const handleCreateBoard = (title: string, description: string, template: string) => {
    const newBoard: Board = {
      id: generateId(),
      title,
      description,
      template,
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false,
      isShared: false,
      owner: 'user-1',
      sharedWith: [],
      workspaces: [],
    }
    addBoard(newBoard)
    setShowCreateModal(false)
  }

  const favoriteBoards = boards.filter((b) => b.isFavorite)
  const recentBoards = [...boards].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  const sharedBoards = boards.filter((b) => b.isShared)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Boley Board</h1>
              <p className="text-slate-600 mt-1">Your visual workspace for meetings and collaboration</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Create Board
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Favorites Section */}
        {favoriteBoards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">⭐ Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteBoards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onClick={() => setCurrentBoard(board)}
                  onToggleFavorite={() => toggleFavorite(board.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Boards Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📋 Recent Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBoards.slice(0, 6).map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => setCurrentBoard(board)}
                onToggleFavorite={() => toggleFavorite(board.id)}
              />
            ))}
          </div>
        </section>

        {/* Shared Boards Section */}
        {sharedBoards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">👥 Shared With Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sharedBoards.slice(0, 3).map((board) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onClick={() => setCurrentBoard(board)}
                  onToggleFavorite={() => toggleFavorite(board.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Boards Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">📚 All Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => setCurrentBoard(board)}
                onToggleFavorite={() => toggleFavorite(board.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Create Board Modal */}
      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreateBoard={handleCreateBoard}
        />
      )}
    </div>
  )
}
