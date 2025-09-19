import { BaseAnimation } from './BaseAnimation'
import { ConcentricRingsConfig } from '../types'

export class ConcentricRingsAnimation extends BaseAnimation {
  private ringCount: number
  private maxRadius: number

  constructor(container: HTMLElement, config: ConcentricRingsConfig = {}) {
    super(container, config)
    
    this.ringCount = config.ringCount || 5
    this.maxRadius = config.maxRadius || 75
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Draw center dot
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
    this.ctx.fillStyle = this.getColor(0.9)
    this.ctx.fill()

    // Draw concentric rings of dots
    for (let r = 0; r < this.ringCount; r++) {
      const radius = ((r + 1) / this.ringCount) * this.maxRadius
      const dotCount = 6 + r * 6 // More dots in outer rings
      
      // Phase offset for rotation based on ring index
      const phaseOffset = r % 2 === 0 ? this.time * 0.2 : -this.time * 0.2
      
      // Each ring pulses at a different phase
      const ringPhase = this.time + r * 0.7
      
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + phaseOffset
        
        // Add a pulsing effect to the radius (slight)
        const radiusPulse = Math.sin(ringPhase) * 3
        const finalRadius = radius + radiusPulse
        const x = centerX + Math.cos(angle) * finalRadius
        const y = centerY + Math.sin(angle) * finalRadius
        
        // Enhanced dot size pulsing - more pronounced
        const baseSize = 2 + r / (this.ringCount - 1)
        const sizePulse = Math.sin(ringPhase) * baseSize * 0.7 + baseSize
        
        // Enhanced opacity pulsing
        const opacityPulse = 0.6 + Math.sin(ringPhase) * 0.4
        
        this.ctx.beginPath()
        this.ctx.arc(x, y, sizePulse, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(opacityPulse)
        this.ctx.fill()
      }
    }
  }
}
