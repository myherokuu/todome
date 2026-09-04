import React, { useRef, useEffect } from 'react'
import { Workspace } from '@/types'

interface MindMapCanvasProps {
  workspace: Workspace
}

interface MindMapNode {
  text: string
  children?: MindMapNode[]
  x?: number
  y?: number
  color?: string
}

export default function MindMapCanvas({ workspace }: MindMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mindmapObj = workspace.objects[0]
  const mindmapData = mindmapObj?.data as { root: string; nodes: any[] } | undefined

  const nodes: MindMapNode = {
    text: mindmapData?.root || 'Root',
    children: mindmapData?.nodes || [],
  }

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

    // Draw mind map
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const levelSpacing = 150
    const nodeSpacing = 80

    ctx.fillStyle = '#3b82f6'
    ctx.strokeStyle = '#3b82f6'

    // Draw root
    drawNode(ctx, centerX, centerY, nodes.text, '#3b82f6')

    // Draw children
    if (nodes.children && nodes.children.length > 0) {
      nodes.children.forEach((child, index) => {
        const angle = (index / nodes.children!.length) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * levelSpacing * 1.5
        const y = centerY + Math.sin(angle) * levelSpacing * 1.5

        // Draw line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw node
        drawNode(ctx, x, y, child.text, '#10b981')
      })
    }
  }, [nodes])

  function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
    const width = Math.max(120, text.length * 8)
    const height = 40

    // Draw rounded rectangle
    ctx.fillStyle = color
    ctx.globalAlpha = 0.2
    ctx.beginPath()
    ctx.roundRect(x - width / 2, y - height / 2, width, height, 8)
    ctx.fill()

    ctx.globalAlpha = 1
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(x - width / 2, y - height / 2, width, height, 8)
    ctx.stroke()

    // Draw text
    ctx.fillStyle = '#fff'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x, y)
  }

  return (
    <div className="flex-1 bg-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-slate-800 text-white p-3 rounded-lg text-sm">
        <div className="font-bold mb-2">{workspace.title}</div>
        <div className="text-xs text-slate-400">Central topic: {nodes.text}</div>
        <div className="text-xs text-slate-400">Branches: {nodes.children?.length || 0}</div>
      </div>
    </div>
  )
}
