import { BaseAnimation } from './BaseAnimation'
import { OscillatingDotsConfig } from '../types'

export class OscillatingDotsAnimation extends BaseAnimation {
  private dotCount: number
  private rowCount: number
  private spacing: number

  constructor(container: HTMLElement, config: OscillatingDotsConfig = {}) {
    super(container, config)
    
    this.dotCount = config.dotCount || 20
    this.rowCount = config.rowCount || 5
    this.spacing = config.spacing || 15
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Draw oscillating dots in rows
    for (let row = 0; row < this.rowCount; row++) {
      const y = centerY - ((this.rowCount - 1) / 2) * this.spacing + row * this.spacing
      
      for (let i = 0; i < this.dotCount; i++) {
        // Calculate x-position with sine wave offset
        const baseX = centerX - ((this.dotCount - 1) / 2) * 8 + i * 8
        
        // Wave parameters vary by row
        const amplitude = 4 + row * 2
        const frequency = 1 + row * 0.2
        const phaseOffset = row * 0.5
        
        // Calculate offset
        const offset = Math.sin(this.time * frequency + i * 0.2 + phaseOffset) * amplitude
        const x = baseX
        const finalY = y + offset
        
        // Draw dot
        this.ctx.beginPath()
        this.ctx.arc(x, finalY, 2, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(0.9)
        this.ctx.fill()
      }
    }
  }
}
