import { BaseAnimation } from './BaseAnimation'
import { AnimationConfig } from '../types'

export class QuantumFieldAnimation extends BaseAnimation {
  private fieldSize: number
  private particleCount: number
  private quantumSpeed: number
  private fieldIntensity: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    super(container, config)
    
    this.fieldSize = (config as any).fieldSize || 6
    this.particleCount = (config as any).particleCount || 200
    this.quantumSpeed = (config as any).quantumSpeed || 1.2
    this.fieldIntensity = (config as any).fieldIntensity || 0.8
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Draw quantum field particles
    for (let i = 0; i < this.particleCount; i++) {
      // Quantum position calculation
      const quantumPhase = (this.time * this.quantumSpeed + i * 0.1) % 1
      const fieldX = (i % this.fieldSize) - this.fieldSize / 2
      const fieldY = Math.floor(i / this.fieldSize) - this.fieldSize / 2
      
      // Quantum uncertainty - particles appear/disappear
      const uncertainty = Math.sin(quantumPhase * Math.PI * 2 + i * 0.3)
      if (uncertainty < 0.3) continue
      
      // Position with quantum fluctuations
      const quantumX = centerX + fieldX * 20 + Math.sin(this.time * 3 + i) * 8
      const quantumY = centerY + fieldY * 20 + Math.cos(this.time * 2 + i) * 6
      
      // Quantum tunneling effect
      const tunnelEffect = Math.sin(quantumPhase * Math.PI * 4) * 0.5 + 0.5
      const size = 1 + tunnelEffect * 2
      const opacity = tunnelEffect * this.fieldIntensity
      
      this.ctx.beginPath()
      this.ctx.arc(quantumX, quantumY, size, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(opacity)
      this.ctx.fill()
      
      // Quantum field connections
      if (i % 4 === 0 && uncertainty > 0.7) {
        const nextParticle = (i + 1) % this.particleCount
        const nextFieldX = (nextParticle % this.fieldSize) - this.fieldSize / 2
        const nextFieldY = Math.floor(nextParticle / this.fieldSize) - this.fieldSize / 2
        const nextX = centerX + nextFieldX * 20 + Math.sin(this.time * 3 + nextParticle) * 8
        const nextY = centerY + nextFieldY * 20 + Math.cos(this.time * 2 + nextParticle) * 6
        
        this.ctx.beginPath()
        this.ctx.moveTo(quantumX, quantumY)
        this.ctx.lineTo(nextX, nextY)
        this.ctx.strokeStyle = this.getColor(0.2)
        this.ctx.lineWidth = 0.5
        this.ctx.stroke()
      }
    }
  }
}
