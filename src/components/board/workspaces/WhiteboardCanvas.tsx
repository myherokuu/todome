import React, { useRef, useEffect, useState } from 'react'
import { Workspace, CanvasObject } from '@/types'
import { useBoardStore } from '@/store/boardStore'

interface WhiteboardCanvasProps {
  workspace: Workspace
}

export default function WhiteboardCanvas({ workspace }: WhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { selectedObject, setSelectedObject } = useBoardStore()
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw background
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 0.5
    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw objects
    workspace.objects.forEach((obj) => {
      drawObject(ctx, obj, scale, pan, selectedObject?.id === obj.id)
    })
  }, [workspace.objects, selectedObject, scale, pan])

  function drawObject(
    ctx: CanvasRenderingContext2D,
    obj: CanvasObject,
    scale: number,
    pan: { x: number; y: number },
    isSelected: boolean
  ) {
    const x = (obj.x + pan.x) * scale
    const y = (obj.y + pan.y) * scale
    const w = obj.width * scale
    const h = obj.height * scale

    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate((obj.rotation * Math.PI) / 180)
    ctx.translate(-(x + w / 2), -(y + h / 2))

    switch (obj.type) {
      case 'sticky':
        ctx.fillStyle = obj.color || '#fef08a'
        ctx.fillRect(x, y, w, h)
        ctx.fillStyle = '#000'
        ctx.font = 'bold 14px Arial'
        ctx.fillText(obj.content || '', x + 10, y + 25)
        break

      case 'text':
        ctx.fillStyle = '#fff'
        ctx.font = '14px Arial'
        const lines = (obj.content || '').split('\n')
        lines.forEach((line, i) => {
          ctx.fillText(line, x + 10, y + 20 + i * 20)
        })
        break

      case 'rectangle':
        ctx.strokeStyle = obj.strokeColor || '#3b82f6'
        ctx.lineWidth = obj.strokeWidth || 2
        ctx.strokeRect(x, y, w, h)
        break

      case 'circle':
        ctx.strokeStyle = obj.strokeColor || '#3b82f6'
        ctx.lineWidth = obj.strokeWidth || 2
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2)
        ctx.stroke()
        break

      default:
        ctx.fillStyle = 'rgba(255,255,255,0.1)'
        ctx.fillRect(x, y, w, h)
    }

    // Draw selection border
    if (isSelected) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.strokeRect(x, y, w, h)
      ctx.setLineDash([])
    }

    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = (e.clientX - rect.left) / scale - pan.x
    const clickY = (e.clientY - rect.top) / scale - pan.y

    const clicked = workspace.objects.find(
      (obj) =>
        clickX >= obj.x &&
        clickX <= obj.x + obj.width &&
        clickY >= obj.y &&
        clickY <= obj.y + obj.height
    )

    setSelectedObject(clicked || null)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale((s) => Math.max(0.1, Math.min(3, s * delta)))
  }

  return (
    <div className="flex-1 bg-slate-900 overflow-hidden cursor-crosshair">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={handleCanvasClick}
        onWheel={handleWheel}
      />
      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 bg-slate-800 text-white p-3 rounded-lg text-xs">
        <div>Scale: {Math.round(scale * 100)}%</div>
        <div>Objects: {workspace.objects.length}</div>
      </div>
    </div>
  )
}
