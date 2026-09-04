import React, { useEffect } from 'react'
import { useBoardStore } from '@/store/boardStore'
import Dashboard from '@/components/Dashboard'
import Board from '@/components/Board'

export default function App() {
  const currentBoard = useBoardStore((state) => state.currentBoard)
  const { setCurrentWorkspace } = useBoardStore()

  useEffect(() => {
    // Initialize with first workspace if a board is selected
    if (currentBoard && currentBoard.workspaces.length > 0 && !useBoardStore.getState().currentWorkspace) {
      setCurrentWorkspace(currentBoard.workspaces[0])
    }
  }, [currentBoard])

  return currentBoard ? <Board /> : <Dashboard />
}
