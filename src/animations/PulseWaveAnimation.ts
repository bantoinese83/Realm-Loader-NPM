import { BaseAnimation } from './BaseAnimation'
import { PulseWaveConfig } from '../types'

export class PulseWaveAnimation extends BaseAnimation {
  private dotRings: Array<{ radius: number; count: number }>

  constructor(container: HTMLElement, config: PulseWaveConfig = {}) {
    super(container, config)
    
    this.dotRings = config.dotRings || [
      { radius: 15, count: 6 },
      { radius: 30, count: 12 },
      { radius: 45, count: 18 },
      { radius: 60, count: 24 },
      { radius: 75, count: 30 }
    ]
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw dots in concentric circles with wave effect
    this.dotRings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2
        
        // Calculate position with pulsing radius
        const radiusPulse = Math.sin(this.time * 2 - ringIndex * 0.4) * 3
        const x = centerX + Math.cos(angle) * (ring.radius + radiusPulse)
        const y = centerY + Math.sin(angle) * (ring.radius + radiusPulse)
        
        // Calculate opacity with wave effect
        const opacityWave = 0.4 + Math.sin(this.time * 2 - ringIndex * 0.4 + i * 0.2) * 0.6
        
        // Draw dot
        this.ctx.beginPath()
        this.ctx.arc(x, y, 2, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(opacityWave)
        this.ctx.fill()
      }
    })
  }
}
