import { BaseAnimation } from './BaseAnimation'
import { PulsingGridConfig } from '../types'

export class PulsingGridAnimation extends BaseAnimation {
  private gridSize: number
  private spacing: number
  private breathingSpeed: number
  private waveSpeed: number
  private colorPulseSpeed: number

  constructor(container: HTMLElement, config: PulsingGridConfig = {}) {
    super(container, config)
    
    this.gridSize = config.gridSize || 5
    this.spacing = config.spacing || 15
    this.breathingSpeed = config.breathingSpeed || 0.5
    this.waveSpeed = config.waveSpeed || 1.2
    this.colorPulseSpeed = config.colorPulseSpeed || 1.0
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Calculate breathing effect - grid expands and contracts
    const breathingFactor = Math.sin(this.time * this.breathingSpeed) * 0.2 + 1.0

    // Draw center dot
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
    this.ctx.fillStyle = this.getColor(0.9)
    this.ctx.fill()

    // Draw pulsing grid pattern
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        // Skip center point
        if (row === Math.floor(this.gridSize / 2) && col === Math.floor(this.gridSize / 2)) continue

        // Calculate base position
        const baseX = (col - (this.gridSize - 1) / 2) * this.spacing
        const baseY = (row - (this.gridSize - 1) / 2) * this.spacing

        // Calculate distance and angle from center for effects
        const distance = Math.sqrt(baseX * baseX + baseY * baseY)
        const maxDistance = (this.spacing * Math.sqrt(2) * (this.gridSize - 1)) / 2
        const normalizedDistance = distance / maxDistance
        const angle = Math.atan2(baseY, baseX)

        // Apply complex wave effects
        const radialPhase = (this.time - normalizedDistance) % 1
        const radialWave = Math.sin(radialPhase * Math.PI * 2) * 4

        const spiralPhase = (angle / (Math.PI * 2) + this.time * 0.3) % 1
        const spiralWave = Math.sin(spiralPhase * Math.PI * 2) * 3

        const breathingX = baseX * breathingFactor
        const breathingY = baseY * breathingFactor

        const waveX = centerX + breathingX + Math.cos(angle) * radialWave
        const waveY = centerY + breathingY + Math.sin(angle) * radialWave

        const baseSize = 1.5 + (1 - normalizedDistance) * 1.5
        const pulseFactor = Math.sin(this.time * 2 + normalizedDistance * 5) * 0.6 + 1
        const size = baseSize * pulseFactor

        // Color effects - subtle gradient between white and light blue
        const blueAmount = Math.sin(this.time * this.colorPulseSpeed + normalizedDistance * 3) * 0.3 + 0.3
        const whiteness = 1 - blueAmount

        const r = Math.floor(255 * whiteness + 200 * blueAmount)
        const g = Math.floor(255 * whiteness + 220 * blueAmount)
        const b = 255

        const opacity = 0.5 + Math.sin(this.time * 1.5 + angle * 3) * 0.2 + normalizedDistance * 0.3

        // Draw connecting lines
        if (row > 0 && col > 0 && row < this.gridSize - 1 && col < this.gridSize - 1) {
          const neighbors = [
            { r: row - 1, c: col },
            { r: row, c: col + 1 },
            { r: row + 1, c: col },
            { r: row, c: col - 1 }
          ]

          for (const neighbor of neighbors) {
            const nBaseX = (neighbor.c - (this.gridSize - 1) / 2) * this.spacing
            const nBaseY = (neighbor.r - (this.gridSize - 1) / 2) * this.spacing

            const nBreathingX = nBaseX * breathingFactor
            const nBreathingY = nBaseY * breathingFactor

            if (neighbor.r === Math.floor(this.gridSize / 2) && neighbor.c === Math.floor(this.gridSize / 2)) continue

            const lineDistance = Math.sqrt(Math.pow(col - neighbor.c, 2) + Math.pow(row - neighbor.r, 2))
            const lineOpacity = 0.1 + Math.sin(this.time * 1.5 + lineDistance * 2) * 0.05

            this.ctx.beginPath()
            this.ctx.moveTo(waveX, waveY)
            this.ctx.lineTo(centerX + nBreathingX, centerY + nBreathingY)
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`
            this.ctx.lineWidth = 0.5
            this.ctx.stroke()
          }
        }

        // Draw dot
        this.ctx.beginPath()
        this.ctx.arc(waveX, waveY, size, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        this.ctx.fill()
      }
    }
  }
}
