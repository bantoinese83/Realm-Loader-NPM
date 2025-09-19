import { AnimationType, CircleAnimationsOptions, AnimationInstance } from './types'
import { RadialPulseAnimation } from './animations/RadialPulseAnimation'
import { OrbitalPulseAnimation } from './animations/OrbitalPulseAnimation'
import { PendulumWaveAnimation } from './animations/PendulumWaveAnimation'
import { PulseWaveAnimation } from './animations/PulseWaveAnimation'
import { ConcentricRingsAnimation } from './animations/ConcentricRingsAnimation'
import { SequentialPulseAnimation } from './animations/SequentialPulseAnimation'
import { OscillatingDotsAnimation } from './animations/OscillatingDotsAnimation'
import { PulsingGridAnimation } from './animations/PulsingGridAnimation'
import { SpiralGalaxyAnimation } from './animations/SpiralGalaxyAnimation'
import { WaveRippleAnimation } from './animations/WaveRippleAnimation'
import { OrbitalDanceAnimation } from './animations/OrbitalDanceAnimation'
import { SpiralVortexAnimation } from './animations/SpiralVortexAnimation'
import { QuantumFieldAnimation } from './animations/QuantumFieldAnimation'
import { NeuralNetworkAnimation } from './animations/NeuralNetworkAnimation'

export class CircleAnimations {
  private animation: AnimationInstance | null = null

  constructor(options: CircleAnimationsOptions) {
    const container = this.getContainer(options.container)
    const animationType = options.animation
    const config = options.config || {}

    this.animation = this.createAnimation(container, animationType, config)

    if (options.autoStart !== false) {
      this.animation.start()
    }
  }

  private getContainer(container: string | HTMLElement): HTMLElement {
    if (typeof container === 'string') {
      const element = document.querySelector(container)
      if (!element) {
        throw new Error(`Container element not found: ${container}`)
      }
      return element as HTMLElement
    }
    return container
  }

  private createAnimation(container: HTMLElement, type: AnimationType, config: any): AnimationInstance {
    switch (type) {
      case 'radial-pulse':
        return new RadialPulseAnimation(container, config)
      case 'orbital-pulse':
        return new OrbitalPulseAnimation(container, config)
      case 'pendulum-wave':
        return new PendulumWaveAnimation(container, config)
      case 'pulse-wave':
        return new PulseWaveAnimation(container, config)
      case 'concentric-rings':
        return new ConcentricRingsAnimation(container, config)
      case 'sequential-pulse':
        return new SequentialPulseAnimation(container, config)
      case 'oscillating-dots':
        return new OscillatingDotsAnimation(container, config)
      case 'pulsing-grid':
        return new PulsingGridAnimation(container, config)
      case 'spiral-galaxy':
        return new SpiralGalaxyAnimation(container, config)
      case 'wave-ripple':
        return new WaveRippleAnimation(container, config)
      case 'orbital-dance':
        return new OrbitalDanceAnimation(container, config)
      case 'spiral-vortex':
        return new SpiralVortexAnimation(container, config)
      case 'quantum-field':
        return new QuantumFieldAnimation(container, config)
      case 'neural-network':
        return new NeuralNetworkAnimation(container, config)
      default:
        throw new Error(`Unknown animation type: ${type}`)
    }
  }

  public start(): void {
    if (this.animation) {
      this.animation.start()
    }
  }

  public stop(): void {
    if (this.animation) {
      this.animation.stop()
    }
  }

  public destroy(): void {
    if (this.animation) {
      this.animation.destroy()
      this.animation = null
    }
  }

  public updateConfig(config: any): void {
    if (this.animation) {
      this.animation.updateConfig(config)
    }
  }

  // Static factory methods for easy creation
  public static createRadialPulse(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'radial-pulse', config })
  }

  public static createOrbitalPulse(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'orbital-pulse', config })
  }

  public static createPendulumWave(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'pendulum-wave', config })
  }

  public static createPulseWave(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'pulse-wave', config })
  }

  public static createConcentricRings(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'concentric-rings', config })
  }

  public static createSequentialPulse(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'sequential-pulse', config })
  }

  public static createOscillatingDots(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'oscillating-dots', config })
  }

  public static createPulsingGrid(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'pulsing-grid', config })
  }

  public static createSpiralGalaxy(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'spiral-galaxy', config })
  }

  public static createWaveRipple(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'wave-ripple', config })
  }

  public static createOrbitalDance(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'orbital-dance', config })
  }

  public static createSpiralVortex(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'spiral-vortex', config })
  }

  public static createQuantumField(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'quantum-field', config })
  }

  public static createNeuralNetwork(container: string | HTMLElement, config?: any): CircleAnimations {
    return new CircleAnimations({ container, animation: 'neural-network', config })
  }
}
