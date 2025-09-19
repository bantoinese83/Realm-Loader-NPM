import { BaseAnimation } from './BaseAnimation'
import { AnimationConfig } from '../types'

export class WaveRippleAnimation extends BaseAnimation {
  private waveCount: number
  private rippleSpeed: number
  private waveAmplitude: number
  private maxRadius: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    super(container, config)
    
    this.waveCount = (config as any).waveCount || 5
    this.rippleSpeed = (config as any).rippleSpeed || 0.8
    this.waveAmplitude = (config as any).waveAmplitude || 20
    this.maxRadius = (config as any).maxRadius || 80
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw wave ripples
    for (let i = 0; i < this.waveCount; i++) {
      const wavePhase = (this.time * this.rippleSpeed + i / this.waveCount) % 1
      const radius = wavePhase * this.maxRadius
      
      if (radius < 5) continue

      // Create wave effect with multiple points
      const points = 64
      const waveOffset = Math.sin(this.time * 2 + i) * this.waveAmplitude
      
      this.ctx.beginPath()
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2
        const waveRadius = radius + Math.sin(angle * 3 + this.time * 3) * (this.waveAmplitude * 0.3)
        const x = centerX + Math.cos(angle) * waveRadius
        const y = centerY + Math.sin(angle) * waveRadius + waveOffset
        
        if (j === 0) {
          this.ctx.moveTo(x, y)
        } else {
          this.ctx.lineTo(x, y)
        }
      }
      
      this.ctx.strokeStyle = this.getColor(1 - wavePhase)
      this.ctx.lineWidth = 2
      this.ctx.stroke()
    }
  }
}
