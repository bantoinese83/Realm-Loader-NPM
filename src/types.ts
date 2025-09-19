export interface AnimationConfig {
  width?: number
  height?: number
  speed?: number
  color?: string
  backgroundColor?: string
  opacity?: number
}

export interface RadialPulseConfig extends AnimationConfig {
  ringCount?: number
  dotsPerRing?: number
  maxRadius?: number
  pulseSpeed?: number
}

export interface OrbitalPulseConfig extends AnimationConfig {
  orbits?: Array<{
    radius: number
    dotCount: number
  }>
  pulseFrequency?: number
  pulseAmplitude?: number
}

export interface PendulumWaveConfig extends AnimationConfig {
  pendulumCount?: number
  baseFrequency?: number
  pendulumLength?: number
  maxAngle?: number
}

export interface PulseWaveConfig extends AnimationConfig {
  dotRings?: Array<{
    radius: number
    count: number
  }>
}

export interface ConcentricRingsConfig extends AnimationConfig {
  ringCount?: number
  maxRadius?: number
}

export interface SequentialPulseConfig extends AnimationConfig {
  radius?: number
  dotCount?: number
}

export interface OscillatingDotsConfig extends AnimationConfig {
  dotCount?: number
  rowCount?: number
  spacing?: number
}

export interface PulsingGridConfig extends AnimationConfig {
  gridSize?: number
  spacing?: number
  breathingSpeed?: number
  waveSpeed?: number
  colorPulseSpeed?: number
}

export interface SpiralGalaxyConfig extends AnimationConfig {
  particleCount?: number
  maxRadius?: number
  spiralArms?: number
  rotationSpeed?: number
}

export type AnimationType = 
  | 'radial-pulse'
  | 'orbital-pulse'
  | 'pendulum-wave'
  | 'pulse-wave'
  | 'concentric-rings'
  | 'sequential-pulse'
  | 'oscillating-dots'
  | 'pulsing-grid'
  | 'spiral-galaxy'
  | 'wave-ripple'
  | 'orbital-dance'
  | 'spiral-vortex'
  | 'quantum-field'
  | 'neural-network'

export interface CircleAnimationsOptions {
  container: string | HTMLElement
  animation: AnimationType
  config?: AnimationConfig
  autoStart?: boolean
}

export interface AnimationInstance {
  start(): void
  stop(): void
  destroy(): void
  updateConfig(config: Partial<AnimationConfig>): void
}
