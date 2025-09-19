import { CircleAnimations } from '../CircleAnimations'

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

describe('CircleAnimations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should create animation instance', () => {
    const animation = new CircleAnimations({
      container: '#test-container',
      animation: 'radial-pulse',
    })

    expect(animation).toBeInstanceOf(CircleAnimations)
  })

  test('should create animation with HTMLElement container', () => {
    const animation = new CircleAnimations({
      container: mockContainer as any,
      animation: 'orbital-pulse',
    })

    expect(animation).toBeInstanceOf(CircleAnimations)
  })

  test('should throw error for invalid container selector', () => {
    // Mock document.querySelector to return null
    const mockQuerySelector = jest.fn(() => null)
    jest.spyOn(document, 'querySelector').mockImplementation(mockQuerySelector)

    expect(() => {
      new CircleAnimations({
        container: '#invalid-container',
        animation: 'radial-pulse',
      })
    }).toThrow('Container element not found: #invalid-container')

    // Restore original
    jest.restoreAllMocks()
  })

  test('should throw error for invalid animation type', () => {
    expect(() => {
      new CircleAnimations({
        container: '#test-container',
        animation: 'invalid-animation' as any,
      })
    }).toThrow('Unknown animation type: invalid-animation')
  })

  test('should start and stop animation', () => {
    const animation = new CircleAnimations({
      container: '#test-container',
      animation: 'radial-pulse',
      autoStart: false,
    })

    animation.start()
    animation.stop()

    expect(window.requestAnimationFrame).toHaveBeenCalled()
    expect(window.cancelAnimationFrame).toHaveBeenCalled()
  })

  test('should destroy animation', () => {
    const animation = new CircleAnimations({
      container: '#test-container',
      animation: 'radial-pulse',
    })

    animation.destroy()

    expect(mockCanvas.parentNode.removeChild).toHaveBeenCalledWith(mockCanvas)
  })

  test('should update configuration', () => {
    const animation = new CircleAnimations({
      container: '#test-container',
      animation: 'radial-pulse',
    })

    animation.updateConfig({
      color: '#ff0000',
      speed: 2.0,
    })

    // Configuration update should not throw error
    expect(true).toBe(true)
  })

  describe('Static factory methods', () => {
    test('should create radial pulse animation', () => {
      const animation = CircleAnimations.createRadialPulse('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create orbital pulse animation', () => {
      const animation = CircleAnimations.createOrbitalPulse('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create pendulum wave animation', () => {
      const animation = CircleAnimations.createPendulumWave('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create pulse wave animation', () => {
      const animation = CircleAnimations.createPulseWave('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create concentric rings animation', () => {
      const animation = CircleAnimations.createConcentricRings('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create sequential pulse animation', () => {
      const animation = CircleAnimations.createSequentialPulse('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create oscillating dots animation', () => {
      const animation = CircleAnimations.createOscillatingDots('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create pulsing grid animation', () => {
      const animation = CircleAnimations.createPulsingGrid('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })

    test('should create spiral galaxy animation', () => {
      const animation = CircleAnimations.createSpiralGalaxy('#test-container')
      expect(animation).toBeInstanceOf(CircleAnimations)
    })
  })
})
