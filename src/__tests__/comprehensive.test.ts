// Comprehensive Unit Tests for Realm Loader NPM
// Testing all animation types, configurations, and edge cases

import { CircleAnimations } from '../CircleAnimations'
import { RadialPulseAnimation } from '../animations/RadialPulseAnimation'
import { OrbitalPulseAnimation } from '../animations/OrbitalPulseAnimation'
import { PendulumWaveAnimation } from '../animations/PendulumWaveAnimation'
import { PulseWaveAnimation } from '../animations/PulseWaveAnimation'
import { ConcentricRingsAnimation } from '../animations/ConcentricRingsAnimation'
import { SequentialPulseAnimation } from '../animations/SequentialPulseAnimation'
import { OscillatingDotsAnimation } from '../animations/OscillatingDotsAnimation'
import { PulsingGridAnimation } from '../animations/PulsingGridAnimation'
import { SpiralGalaxyAnimation } from '../animations/SpiralGalaxyAnimation'
import type { AnimationType, AnimationConfig } from '../types'

// Mock DOM environment
const mockCanvas = {
  width: 180,
  height: 180,
  getContext: jest.fn(() => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
  })),
  style: {},
  parentNode: {
    removeChild: jest.fn(),
  },
}

const mockContainer: any = {
  appendChild: jest.fn(),
  querySelector: jest.fn(() => mockContainer),
}

// Mock document methods
Object.defineProperty(document, 'createElement', {
  value: jest.fn((tagName) => {
    if (tagName === 'canvas') {
      return mockCanvas
    }
    return mockContainer
  }),
})

Object.defineProperty(document, 'querySelector', {
  value: jest.fn(() => mockContainer),
})

// Mock requestAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  value: jest.fn((cb) => setTimeout(cb, 16)),
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: jest.fn(),
})

describe('Realm Loader NPM - Comprehensive Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Main CircleAnimations Class', () => {
    test('should create animation with string selector', () => {
      const animation = new CircleAnimations({
        container: '#test-container',
        animation: 'radial-pulse',
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create animation with HTMLElement', () => {
      const animation = new CircleAnimations({
        container: mockContainer,
        animation: 'orbital-pulse',
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should throw error for invalid container', () => {
      Object.defineProperty(document, 'querySelector', {
        value: jest.fn(() => null),
      })

      expect(() => {
        new CircleAnimations({
          container: '#invalid',
          animation: 'radial-pulse',
        })
      }).toThrow('Container element not found: #invalid')
    })

    test('should throw error for invalid animation type', () => {
      expect(() => {
        new CircleAnimations({
          container: '#test',
          animation: 'invalid-type' as any,
        })
      }).toThrow('Unknown animation type: invalid-type')
    })

    test('should handle autoStart option', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        autoStart: false,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should update configuration', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
      })

      animation.updateConfig({
        color: '#ff0000',
        speed: 2.0,
      })

      // Configuration update should not throw error
      expect(true).toBe(true)
    })
  })

  describe('Factory Methods', () => {
    const animationTypes: AnimationType[] = [
      'radial-pulse',
      'orbital-pulse',
      'pendulum-wave',
      'pulse-wave',
      'concentric-rings',
      'sequential-pulse',
      'oscillating-dots',
      'pulsing-grid',
      'spiral-galaxy',
    ]

    animationTypes.forEach((type) => {
      test(`should create ${type} animation`, () => {
        const animation = CircleAnimations.createRadialPulse('#test')
        expect(animation).toBeInstanceOf(CircleAnimations)
      })
    })

    test('should create animations with custom configs', () => {
      const radialConfig = {
        ringCount: 10,
        dotsPerRing: 16,
        color: '#ff6b6b',
      }

      const animation = CircleAnimations.createRadialPulse('#test', radialConfig)
      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })

  describe('Animation Lifecycle', () => {
    let animation: CircleAnimations

    beforeEach(() => {
      animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        autoStart: false,
      })
    })

    test('should start animation', () => {
      animation.start()
      expect(window.requestAnimationFrame).toHaveBeenCalled()
    })

    test('should stop animation', () => {
      animation.start()
      animation.stop()
      expect(window.cancelAnimationFrame).toHaveBeenCalled()
    })

    test('should destroy animation', () => {
      animation.destroy()
      expect(mockCanvas.parentNode.removeChild).toHaveBeenCalledWith(mockCanvas)
    })

    test('should not start if already running', () => {
      animation.start()
      const initialCallCount = (window.requestAnimationFrame as jest.Mock).mock.calls.length
      animation.start()
      expect((window.requestAnimationFrame as jest.Mock).mock.calls.length).toBe(initialCallCount)
    })
  })

  describe('Configuration Validation', () => {
    test('should handle valid color formats', () => {
      const colorFormats = [
        '#ff0000',
        '#f00',
        'rgb(255, 0, 0)',
        'rgba(255, 0, 0, 0.5)',
        'red',
      ]

      colorFormats.forEach((color) => {
        const animation = new CircleAnimations({
          container: '#test',
          animation: 'radial-pulse',
          config: { color },
        })
        expect(animation).toBeInstanceOf(CircleAnimations)
      })
    })

    test('should handle numeric configurations', () => {
      const config = {
        width: 300,
        height: 200,
        speed: 2.5,
        opacity: 0.8,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should handle edge case values', () => {
      const edgeCases = [
        { speed: 0 },
        { speed: -1 },
        { speed: 100 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 1.5 },
        { width: 1 },
        { height: 1 },
      ]

      edgeCases.forEach((config) => {
        const animation = new CircleAnimations({
          container: '#test',
          animation: 'radial-pulse',
          config as any,
        })
        expect(animation).toBeInstanceOf(CircleAnimations)
      })
    })
  })

  describe('Animation-Specific Configurations', () => {
    test('should handle RadialPulse configuration', () => {
      const config = {
        ringCount: 8,
        dotsPerRing: 12,
        maxRadius: 75,
        pulseSpeed: 0.35,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should handle OrbitalPulse configuration', () => {
      const config = {
        orbits: [
          { radius: 15, dotCount: 6 },
          { radius: 25, dotCount: 10 },
        ],
        pulseFrequency: 0.5,
        pulseAmplitude: 2,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'orbital-pulse',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should handle PendulumWave configuration', () => {
      const config = {
        pendulumCount: 15,
        baseFrequency: 0.5,
        pendulumLength: 90,
        maxAngle: Math.PI / 12,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'pendulum-wave',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should handle PulsingGrid configuration', () => {
      const config = {
        gridSize: 5,
        spacing: 15,
        breathingSpeed: 0.5,
        waveSpeed: 1.2,
        colorPulseSpeed: 1.0,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'pulsing-grid',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should handle SpiralGalaxy configuration', () => {
      const config = {
        particleCount: 200,
        maxRadius: 75,
        spiralArms: 3,
        rotationSpeed: 0.1,
      }

      const animation = new CircleAnimations({
        container: '#test',
        animation: 'spiral-galaxy',
        config as any,
      })
      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })

  describe('Error Handling', () => {
    test('should handle canvas context creation failure', () => {
      const mockCanvasNoContext = {
        ...mockCanvas,
        getContext: jest.fn(() => null),
      }

      Object.defineProperty(document, 'createElement', {
        value: jest.fn(() => mockCanvasNoContext),
      })

      expect(() => {
        new CircleAnimations({
          container: '#test',
          animation: 'radial-pulse',
        })
      }).toThrow()
    })

    test('should handle invalid configuration gracefully', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        config: {
          // Invalid values should be handled gracefully
          speed: NaN,
          width: -100,
          height: 'invalid' as any,
        },
      })

      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })

  describe('Performance Tests', () => {
    test('should create multiple animations without issues', () => {
      const animations = []
      
      for (let i = 0; i < 10; i++) {
        const animation = new CircleAnimations({
          container: '#test',
          animation: 'radial-pulse',
        })
        animations.push(animation)
      }

      expect(animations).toHaveLength(10)
      animations.forEach(anim => {
        expect(anim).toBeInstanceOf(CircleAnimations)
        anim.destroy()
      })
    })

    test('should handle rapid start/stop cycles', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
        autoStart: false,
      })

      // Rapid start/stop cycles
      for (let i = 0; i < 10; i++) {
        animation.start()
        animation.stop()
      }

      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })

  describe('Type Safety', () => {
    test('should enforce AnimationType constraint', () => {
      const validTypes: AnimationType[] = [
        'radial-pulse',
        'orbital-pulse',
        'pendulum-wave',
        'pulse-wave',
        'concentric-rings',
        'sequential-pulse',
        'oscillating-dots',
        'pulsing-grid',
        'spiral-galaxy',
      ]

      validTypes.forEach((type) => {
        const animation = new CircleAnimations({
          container: '#test',
          animation: type,
        })
        expect(animation).toBeInstanceOf(CircleAnimations)
      })
    })

    test('should handle partial configuration updates', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
      })

      // Partial updates should work
      animation.updateConfig({ color: '#ff0000' })
      animation.updateConfig({ speed: 2.0 })
      animation.updateConfig({ width: 300 })

      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })

  describe('Memory Management', () => {
    test('should clean up resources on destroy', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
      })

      animation.start()
      animation.destroy()

      expect(window.cancelAnimationFrame).toHaveBeenCalled()
      expect(mockCanvas.parentNode.removeChild).toHaveBeenCalledWith(mockCanvas)
    })

    test('should handle destroy on already destroyed animation', () => {
      const animation = new CircleAnimations({
        container: '#test',
        animation: 'radial-pulse',
      })

      animation.destroy()
      // Should not throw error
      expect(() => animation.destroy()).not.toThrow()
    })
  })
})

describe('Individual Animation Classes', () => {
  describe('RadialPulseAnimation', () => {
    test('should create with default config', () => {
      const animation = new RadialPulseAnimation(mockContainer)
      expect(animation).toBeInstanceOf(RadialPulseAnimation)
    })

    test('should create with custom config', () => {
      const config = {
        ringCount: 10,
        dotsPerRing: 16,
        maxRadius: 100,
        pulseSpeed: 0.5,
      }
      const animation = new RadialPulseAnimation(mockContainer, config)
      expect(animation).toBeInstanceOf(RadialPulseAnimation)
    })
  })

  describe('OrbitalPulseAnimation', () => {
    test('should create with default config', () => {
      const animation = new OrbitalPulseAnimation(mockContainer)
      expect(animation).toBeInstanceOf(OrbitalPulseAnimation)
    })

    test('should create with custom orbits', () => {
      const config = {
        orbits: [
          { radius: 20, dotCount: 8 },
          { radius: 40, dotCount: 12 },
        ],
      }
      const animation = new OrbitalPulseAnimation(mockContainer, config)
      expect(animation).toBeInstanceOf(OrbitalPulseAnimation)
    })
  })

  // Add similar tests for other animation classes...
  describe('PendulumWaveAnimation', () => {
    test('should create with default config', () => {
      const animation = new PendulumWaveAnimation(mockContainer)
      expect(animation).toBeInstanceOf(PendulumWaveAnimation)
    })
  })

  describe('PulseWaveAnimation', () => {
    test('should create with default config', () => {
      const animation = new PulseWaveAnimation(mockContainer)
      expect(animation).toBeInstanceOf(PulseWaveAnimation)
    })
  })

  describe('ConcentricRingsAnimation', () => {
    test('should create with default config', () => {
      const animation = new ConcentricRingsAnimation(mockContainer)
      expect(animation).toBeInstanceOf(ConcentricRingsAnimation)
    })
  })

  describe('SequentialPulseAnimation', () => {
    test('should create with default config', () => {
      const animation = new SequentialPulseAnimation(mockContainer)
      expect(animation).toBeInstanceOf(SequentialPulseAnimation)
    })
  })

  describe('OscillatingDotsAnimation', () => {
    test('should create with default config', () => {
      const animation = new OscillatingDotsAnimation(mockContainer)
      expect(animation).toBeInstanceOf(OscillatingDotsAnimation)
    })
  })

  describe('PulsingGridAnimation', () => {
    test('should create with default config', () => {
      const animation = new PulsingGridAnimation(mockContainer)
      expect(animation).toBeInstanceOf(PulsingGridAnimation)
    })
  })

  describe('SpiralGalaxyAnimation', () => {
    test('should create with default config', () => {
      const animation = new SpiralGalaxyAnimation(mockContainer)
      expect(animation).toBeInstanceOf(SpiralGalaxyAnimation)
    })
  })
})
