import { BaseAnimation } from './BaseAnimation'
import { AnimationConfig } from '../types'

export class SpiralVortexAnimation extends BaseAnimation {
  private particleCount: number
  private vortexSpeed: number
  private spiralTightness: number
  private maxRadius: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    super(container, config)
    
    this.particleCount = (config as any).particleCount || 150
    this.vortexSpeed = (config as any).vortexSpeed || 0.3
    this.spiralTightness = (config as any).spiralTightness || 0.15
    this.maxRadius = (config as any).maxRadius || 80
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw spiral vortex particles
    for (let i = 0; i < this.particleCount; i++) {
      const t = (i / this.particleCount) * 4 * Math.PI
      const radius = (t / (4 * Math.PI)) * this.maxRadius
      
      // Spiral equation
      const angle = t * this.spiralTightness + this.time * this.vortexSpeed
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      // Particle size based on distance from center
      const size = 1 + (1 - radius / this.maxRadius) * 2
      
      // Opacity based on distance and time
      const opacity = (1 - radius / this.maxRadius) * 0.8
      
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(opacity)
      this.ctx.fill()
      
      // Draw particle trail
      if (i % 3 === 0) {
        const trailLength = 5
        const trailAngle = angle - 0.2
        const trailX = centerX + Math.cos(trailAngle) * (radius - trailLength)
        const trailY = centerY + Math.sin(trailAngle) * (radius - trailLength)
        
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(trailX, trailY)
        this.ctx.strokeStyle = this.getColor(opacity * 0.5)
        this.ctx.lineWidth = size * 0.5
        this.ctx.stroke()
      }
    }
  }
}
