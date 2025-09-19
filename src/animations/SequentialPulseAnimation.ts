import { BaseAnimation } from './BaseAnimation'
import { SequentialPulseConfig } from '../types'

export class SequentialPulseAnimation extends BaseAnimation {
  private radius: number
  private dotCount: number

  constructor(container: HTMLElement, config: SequentialPulseConfig = {}) {
    super(container, config)
    
    this.radius = config.radius || 70
    this.dotCount = config.dotCount || 16
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw reference circle (very faint)
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2)
    this.ctx.strokeStyle = this.getColor(0.05)
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    // Draw dots with sequential pulsing
    for (let i = 0; i < this.dotCount; i++) {
      const angle = (i / this.dotCount) * Math.PI * 2
      
      // Sequential pulsing - wave moves around the circle
      const pulsePhase = (this.time * 0.5 + i / this.dotCount) % 1
      const pulseFactor = Math.sin(pulsePhase * Math.PI * 2)
      
      // Apply pulse to size and radius
      const size = 2 + pulseFactor * 2
      const finalRadius = this.radius + pulseFactor * 5
      const x = centerX + Math.cos(angle) * finalRadius
      const y = centerY + Math.sin(angle) * finalRadius
      
      // Draw connecting line to center
      this.ctx.beginPath()
      this.ctx.moveTo(centerX, centerY)
      this.ctx.lineTo(x, y)
      this.ctx.strokeStyle = this.getColor(0.1 + pulseFactor * 0.2)
      this.ctx.lineWidth = 1
      this.ctx.stroke()
      
      // Draw dot
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(0.9)
      this.ctx.fill()
    }
  }
}
