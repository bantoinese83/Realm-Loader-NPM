import { BaseAnimation } from './BaseAnimation'
import { OrbitalPulseConfig } from '../types'

export class OrbitalPulseAnimation extends BaseAnimation {
  private orbits: Array<{ radius: number; dotCount: number }>
  private pulseFrequency: number
  private pulseAmplitude: number
  private maxRadius: number

  constructor(container: HTMLElement, config: OrbitalPulseConfig = {}) {
    super(container, config)
    
    this.orbits = config.orbits || [
      { radius: 15, dotCount: 6 },
      { radius: 25, dotCount: 10 },
      { radius: 35, dotCount: 14 },
      { radius: 45, dotCount: 18 },
      { radius: 55, dotCount: 22 },
      { radius: 65, dotCount: 26 }
    ]
    this.pulseFrequency = config.pulseFrequency || 0.5
    this.pulseAmplitude = config.pulseAmplitude || 2
    this.maxRadius = 75
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Draw orbit circles (very faint)
    this.orbits.forEach((orbit) => {
      this.ctx.beginPath()
      this.ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2)
      this.ctx.strokeStyle = this.getColor(0.05)
      this.ctx.lineWidth = 1
      this.ctx.stroke()

      // Calculate smooth pulse animation
      const normalizedRadius = orbit.radius / this.maxRadius
      const pulseDelay = normalizedRadius * 1.5
      const pulsePhase = (this.time * this.pulseFrequency - pulseDelay) % 1
      const pulseEffect = Math.sin(pulsePhase * Math.PI) * this.pulseAmplitude
      const finalPulseEffect = pulseEffect > 0 ? pulseEffect : 0

      // Draw dots around the orbit
      for (let i = 0; i < orbit.dotCount; i++) {
        const angle = (i / orbit.dotCount) * Math.PI * 2
        const pulsedRadius = orbit.radius + finalPulseEffect
        const x = centerX + Math.cos(angle) * pulsedRadius
        const y = centerY + Math.sin(angle) * pulsedRadius
        
        const dotSize = 2 + (finalPulseEffect / this.pulseAmplitude) * 1.5
        const opacity = 0.7 + (finalPulseEffect / this.pulseAmplitude) * 0.3

        this.ctx.beginPath()
        this.ctx.arc(x, y, dotSize, 0, Math.PI * 2)
        this.ctx.fillStyle = this.getColor(opacity)
        this.ctx.fill()
      }
    })
  }
}
