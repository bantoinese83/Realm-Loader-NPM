import { BaseAnimation } from './BaseAnimation'
import { AnimationConfig } from '../types'

export class NeuralNetworkAnimation extends BaseAnimation {
  private nodeCount: number
  private layerCount: number
  private activationSpeed: number
  private maxRadius: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    super(container, config)
    
    this.nodeCount = (config as any).nodeCount || 12
    this.layerCount = (config as any).layerCount || 3
    this.activationSpeed = (config as any).activationSpeed || 0.8
    this.maxRadius = (config as any).maxRadius || 70
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Create neural network nodes
    const nodes: Array<{x: number, y: number, layer: number, activation: number}> = []
    
    for (let layer = 0; layer < this.layerCount; layer++) {
      const layerRadius = ((layer + 1) / this.layerCount) * this.maxRadius
      const nodesInLayer = Math.floor(this.nodeCount / this.layerCount) + (layer === this.layerCount - 1 ? this.nodeCount % this.layerCount : 0)
      
      for (let i = 0; i < nodesInLayer; i++) {
        const angle = (i / nodesInLayer) * Math.PI * 2 + this.time * 0.1
        const x = centerX + Math.cos(angle) * layerRadius
        const y = centerY + Math.sin(angle) * layerRadius
        
        // Neural activation
        const activationPhase = (this.time * this.activationSpeed + i * 0.2 + layer * 0.5) % 1
        const activation = Math.sin(activationPhase * Math.PI * 2) * 0.5 + 0.5
        
        nodes.push({ x, y, layer, activation })
      }
    }

    // Draw connections between layers
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i]
        const node2 = nodes[j]
        
        // Only connect nodes from adjacent layers
        if (Math.abs(node1.layer - node2.layer) === 1) {
          const connectionStrength = (node1.activation + node2.activation) / 2
          
          this.ctx.beginPath()
          this.ctx.moveTo(node1.x, node1.y)
          this.ctx.lineTo(node2.x, node2.y)
          this.ctx.strokeStyle = this.getColor(connectionStrength * 0.3)
          this.ctx.lineWidth = connectionStrength * 2
          this.ctx.stroke()
        }
      }
    }

    // Draw nodes
    nodes.forEach((node, index) => {
      const size = 3 + node.activation * 3
      
      this.ctx.beginPath()
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(0.6 + node.activation * 0.4)
      this.ctx.fill()
      
      // Draw activation ring
      this.ctx.beginPath()
      this.ctx.arc(node.x, node.y, size + 2, 0, Math.PI * 2)
      this.ctx.strokeStyle = this.getColor(node.activation * 0.5)
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    })
  }
}
