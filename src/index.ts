// Main exports
export { CircleAnimations } from './CircleAnimations'
export { BaseAnimation } from './animations/BaseAnimation'

// Animation classes
export { RadialPulseAnimation } from './animations/RadialPulseAnimation'
export { OrbitalPulseAnimation } from './animations/OrbitalPulseAnimation'
export { PendulumWaveAnimation } from './animations/PendulumWaveAnimation'
export { PulseWaveAnimation } from './animations/PulseWaveAnimation'
export { ConcentricRingsAnimation } from './animations/ConcentricRingsAnimation'
export { SequentialPulseAnimation } from './animations/SequentialPulseAnimation'
export { OscillatingDotsAnimation } from './animations/OscillatingDotsAnimation'
export { PulsingGridAnimation } from './animations/PulsingGridAnimation'
export { SpiralGalaxyAnimation } from './animations/SpiralGalaxyAnimation'
export { WaveRippleAnimation } from './animations/WaveRippleAnimation'
export { OrbitalDanceAnimation } from './animations/OrbitalDanceAnimation'
export { SpiralVortexAnimation } from './animations/SpiralVortexAnimation'
export { QuantumFieldAnimation } from './animations/QuantumFieldAnimation'
export { NeuralNetworkAnimation } from './animations/NeuralNetworkAnimation'

// Types
export type {
  AnimationConfig,
  RadialPulseConfig,
  OrbitalPulseConfig,
  PendulumWaveConfig,
  PulseWaveConfig,
  ConcentricRingsConfig,
  SequentialPulseConfig,
  OscillatingDotsConfig,
  PulsingGridConfig,
  SpiralGalaxyConfig,
  AnimationType,
  CircleAnimationsOptions,
  AnimationInstance
} from './types'

// Performance optimization
export { PerformanceOptimizer } from './PerformanceOptimizer'

// Animation presets and themes
export { AnimationPresets } from './AnimationPresets'

// React components (separate entry point)
export * from './react/RealmLoader'

// Vue components (separate entry point) - use namespace to avoid conflicts
export * as VueComponents from './vue/components'

// CSS styles
import './styles.css'
