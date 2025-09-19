import { BaseAnimation } from './BaseAnimation'
import { PendulumWaveConfig } from '../types'

export class PendulumWaveAnimation extends BaseAnimation {
  private pendulumCount: number
  private baseFrequency: number
  private pendulumLength: number
  private maxAngle: number

  constructor(container: HTMLElement, config: PendulumWaveConfig = {}) {
    super(container, config)
    
    this.pendulumCount = config.pendulumCount || 15
    this.baseFrequency = config.baseFrequency || 0.5
    this.pendulumLength = config.pendulumLength || 90
    this.maxAngle = config.maxAngle || Math.PI / 12

    this.createReferenceLine()
  }

  private createReferenceLine(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2
    
    const referenceLine = document.createElement('div')
    referenceLine.style.position = 'absolute'
    referenceLine.style.width = `${this.pendulumCount * 8}px`
    referenceLine.style.height = '1px'
    referenceLine.style.left = `${centerX - (this.pendulumCount * 8) / 2}px`
    referenceLine.style.top = `${centerY - this.pendulumLength}px`
    referenceLine.style.backgroundColor = this.getColor(0.15)
    this.container.appendChild(referenceLine)
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Calculate single angle for all pendulums - simple left-right motion
    const angle = Math.sin(this.time * this.baseFrequency * Math.PI) * this.maxAngle

    // Draw pendulums - all moving in unison
    for (let i = 0; i < this.pendulumCount; i++) {
      // Calculate pendulum position
      const pendulumX = centerX - this.pendulumCount * 4 + i * 8
      const pendulumY = centerY - this.pendulumLength

      // Calculate bob position - all with the same angle
      const bobX = pendulumX + Math.sin(angle) * this.pendulumLength
      const bobY = pendulumY + Math.cos(angle) * this.pendulumLength

      // Draw pendulum line
      this.ctx.beginPath()
      this.ctx.moveTo(pendulumX, pendulumY)
      this.ctx.lineTo(bobX, bobY)
      this.ctx.strokeStyle = this.getColor(0.4)
      this.ctx.lineWidth = 1
      this.ctx.stroke()

      // Draw pendulum bob
      this.ctx.beginPath()
      this.ctx.arc(bobX, bobY, 3, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(0.9)
      this.ctx.fill()

      // Draw center
      this.ctx.beginPath()
      this.ctx.arc(pendulumX, pendulumY, 1, 0, Math.PI * 2)
      this.ctx.fillStyle = this.getColor(0.5)
      this.ctx.fill()
    }
  }
}
