// Vue Convenience Components for each animation type
import { defineComponent } from 'vue'
import RealmLoader from './RealmLoader.vue'

// Create convenience components for each animation type
const createAnimationComponent = (animationType: string) => {
  return defineComponent({
    name: `RealmLoader${animationType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')}`,
    extends: RealmLoader,
    props: {
      config: Object,
      preset: String,
      theme: String,
      autoStart: {
        type: Boolean,
        default: true
      },
      className: String,
      style: Object
    },
    setup(props: any, context: any) {
      return {
        animation: animationType,
        ...props
      }
    }
  })
}

export const RadialPulse = createAnimationComponent('radial-pulse')
export const OrbitalPulse = createAnimationComponent('orbital-pulse')
export const PendulumWave = createAnimationComponent('pendulum-wave')
export const PulseWave = createAnimationComponent('pulse-wave')
export const ConcentricRings = createAnimationComponent('concentric-rings')
export const SequentialPulse = createAnimationComponent('sequential-pulse')
export const OscillatingDots = createAnimationComponent('oscillating-dots')
export const PulsingGrid = createAnimationComponent('pulsing-grid')
export const SpiralGalaxy = createAnimationComponent('spiral-galaxy')
export const WaveRipple = createAnimationComponent('wave-ripple')
export const OrbitalDance = createAnimationComponent('orbital-dance')
export const SpiralVortex = createAnimationComponent('spiral-vortex')
export const QuantumField = createAnimationComponent('quantum-field')
export const NeuralNetwork = createAnimationComponent('neural-network')

// Composable for easy animation control
export const useRealmLoader = (animation: string, config?: any) => {
  const animationRef = ref<InstanceType<typeof RealmLoader> | null>(null)

  const start = () => animationRef.value?.start()
  const stop = () => animationRef.value?.stop()
  const destroy = () => animationRef.value?.destroy()
  const updateConfig = (newConfig: any) => animationRef.value?.updateConfig(newConfig)

  return {
    ref: animationRef,
    start,
    stop,
    destroy,
    updateConfig
  }
}

// Export main component
export { default as RealmLoader } from './RealmLoader.vue'
export { AnimationPresets } from '../AnimationPresets'
export type { AnimationType, AnimationConfig } from '../types'
