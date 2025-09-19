import { BaseAnimation } from './BaseAnimation'
import { SpiralGalaxyConfig } from '../types'

interface Particle {
  distance: number
  angle: number
  armIndex: number
  size: number
  opacity: number
  speedFactor: number
  color: {
    r: number
    g: number
    b: number
  }
}

export class SpiralGalaxyAnimation extends BaseAnimation {
  private particles: Particle[]
  private particleCount: number
  private maxRadius: number
  private spiralArms: number
  private rotationSpeed: number

  constructor(container: HTMLElement, config: SpiralGalaxyConfig = {}) {
    super(container, config)
    
    this.particleCount = config.particleCount || 200
    this.maxRadius = config.maxRadius || 75
    this.spiralArms = config.spiralArms || 3
    this.rotationSpeed = config.rotationSpeed || 0.1

    this.particles = this.createParticles()
  }

  private createParticles(): Particle[] {
    const particles: Particle[] = []
    
    for (let i = 0; i < this.particleCount; i++) {
      const distanceFactor = Math.pow(Math.random(), 0.5)
      const distance = distanceFactor * this.maxRadius
      
      const armIndex = Math.floor(Math.random() * this.spiralArms)
      const armOffset = (armIndex / this.spiralArms) * Math.PI * 2
      
      const spiralTightness = 0.2
      const spiralAngle = Math.log(distance / 5) / spiralTightness
      
      particles.push({
        distance: distance,
        angle: spiralAngle + armOffset,
        armIndex: armIndex,
        size: 1 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.7,
        speedFactor: 0.8 + Math.random() * 0.4,
        color: {
          r: 220 + Math.floor(Math.random() * 35),
          g: 220 + Math.floor(Math.random() * 35),
          b: 255
        }
      })
    }
    
    return particles
  }

  protected draw(): void {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    // Center dot removed for cleaner look

    // Update and draw particles
    for (const particle of this.particles) {
      // Rotation speed decreases with distance (Keplerian rotation)
      const rotationFactor = 1 / Math.sqrt(particle.distance / 10)
      
      // Update angle based on distance from center (closer = faster)
      particle.angle += this.rotationSpeed * rotationFactor * particle.speedFactor * 16.67 // ~60fps
      
      // Calculate position
      const x = centerX + Math.cos(particle.angle) * particle.distance
      const y = centerY + Math.sin(particle.angle) * particle.distance
      
      // Particle size and opacity pulse based on arm position
      const armPhase = (this.time * 0.5 + particle.armIndex / this.spiralArms) % 1
      const pulseFactor = Math.sin(armPhase * Math.PI * 2) * 0.3 + 0.7
      
      // Draw particle
      this.ctx.beginPath()
      this.ctx.arc(x, y, particle.size * pulseFactor, 0, Math.PI * 2)
      
      const finalOpacity = particle.opacity * pulseFactor
      this.ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${finalOpacity})`
      this.ctx.fill()
      
      // Draw trail for some particles
      if (particle.size > 1.8) {
        const trailLength = particle.distance * 0.15
        const trailAngle = particle.angle - 0.1 * rotationFactor
        const trailX = centerX + Math.cos(trailAngle) * (particle.distance - trailLength)
        const trailY = centerY + Math.sin(trailAngle) * (particle.distance - trailLength)
        
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(trailX, trailY)
        this.ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${finalOpacity * 0.3})`
        this.ctx.lineWidth = particle.size * 0.5
        this.ctx.stroke()
      }
    }
  }
}
