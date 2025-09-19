import { BaseAnimation } from './BaseAnimation'
import { RadialPulseConfig } from '../types'

export class RadialPulseAnimation extends BaseAnimation {
  private ringCount: number
  private dotsPerRing: number
  private maxRadius: number
  private pulseSpeed: number

  constructor(container: HTMLElement, config: RadialPulseConfig = {}) {
    super(container, config)
    
    this.ringCount = config.ringCount || 8
    this.dotsPerRing = config.dotsPerRing || 12
    this.maxRadius = config.maxRadius || 75
    this.pulseSpeed = config.pulseSpeed || 0.35
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Pulse wave effect - creates waves of dots moving outward
    for (let i = 0; i < this.ringCount; i++) {
      // Calculate current radius for this ring
      const pulsePhase = (this.time * this.pulseSpeed + i / this.ringCount) % 1
      const ringRadius = pulsePhase * this.maxRadius
      
      // Skip rings that are just starting (too close to center)
      if (ringRadius < 5) continue
      
      // Opacity decreases as the pulse moves outward
      const opacity = 1 - pulsePhase
      
      // Draw dots around the ring
      for (let j = 0; j < this.dotsPerRing; j++) {
        const angle = (j / this.dotsPerRing) * Math.PI * 2
        const x = centerX + Math.cos(angle) * ringRadius
        const y = centerY + Math.sin(angle) * ringRadius
        
        // Dot size decreases as the pulse moves outward
        const dotSize = 2.5 * (1 - pulsePhase * 0.5)
        
        this.ctx.beginPath()
        this.ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(opacity)
        this.ctx.fill()
      }
    }
  }
}
