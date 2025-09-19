import { BaseAnimation } from './BaseAnimation'
import { AnimationConfig } from '../types'

export class OrbitalDanceAnimation extends BaseAnimation {
  private orbitCount: number
  private dancersPerOrbit: number
  private danceSpeed: number
  private maxRadius: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    super(container, config)
    
    this.orbitCount = (config as any).orbitCount || 4
    this.dancersPerOrbit = (config as any).dancersPerOrbit || 8
    this.danceSpeed = (config as any).danceSpeed || 0.6
    this.maxRadius = (config as any).maxRadius || 70
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw orbital dancers
    for (let orbit = 0; orbit < this.orbitCount; orbit++) {
      const orbitRadius = ((orbit + 1) / this.orbitCount) * this.maxRadius
      const orbitSpeed = this.danceSpeed * (1 + orbit * 0.2)
      const baseAngle = this.time * orbitSpeed
      
      for (let i = 0; i < this.dancersPerOrbit; i++) {
        const angle = (i / this.dancersPerOrbit) * Math.PI * 2 + baseAngle
        
        // Dance movement - dancers move in and out
        const dancePhase = (this.time * 2 + i * 0.5 + orbit * 0.3) % 1
        const danceRadius = orbitRadius + Math.sin(dancePhase * Math.PI * 2) * 15
        
        const x = centerX + Math.cos(angle) * danceRadius
        const y = centerY + Math.sin(angle) * danceRadius
        
        // Draw dancer
        this.ctx.beginPath()
        this.ctx.arc(x, y, 2 + Math.sin(dancePhase * Math.PI * 2) * 1, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(0.8 - orbit * 0.1)
        this.ctx.fill()
        
        // Draw trail
        const trailLength = 8
        const trailAngle = angle - 0.1
        const trailX = centerX + Math.cos(trailAngle) * (danceRadius - trailLength)
        const trailY = centerY + Math.sin(trailAngle) * (danceRadius - trailLength)
        
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(trailX, trailY)
        this.ctx.strokeStyle = this.getColor(0.3)
        this.ctx.lineWidth = 1
        this.ctx.stroke()
      }
    }
  }
}
