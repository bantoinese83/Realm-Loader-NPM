// Vue Convenience Components for each animation type
// Note: These components require Vue to be installed as a peer dependency
import { CircleAnimations } from '../CircleAnimations'
import { AnimationPresets } from '../AnimationPresets'
import type { AnimationType, AnimationConfig, CircleAnimationsOptions } from '../types'

// Dynamic Vue imports to avoid build errors when Vue is not available
let Vue: any = null
try {
  Vue = require('vue')
} catch (e) {
  // Vue not available
}

const createAnimationComponent = (animationType: AnimationType) => {
  if (!Vue) {
    return null
  }

  const { defineComponent, ref, onMounted, onUnmounted, watch, h } = Vue

  return defineComponent({
    name: animationType.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Loader',
    props: {
      config: {
        type: Object,
        default: () => ({})
      },
      preset: {
        type: String,
        default: undefined
      },
      theme: {
        type: String,
        default: undefined
      },
      autoStart: {
        type: Boolean,
        default: true
      },
      className: {
        type: String,
        default: ''
      },
      style: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props: any, { expose }: any) {
      const containerRef = ref(null)
      let animationInstance: CircleAnimations | null = null

      const initializeAnimation = () => {
        if (containerRef.value) {
          let finalConfig = { ...props.config }
          
          if (props.preset) {
            const presetConfig = AnimationPresets.getPreset(props.preset)
            if (presetConfig) {
              finalConfig = AnimationPresets.applyPresetToConfig(finalConfig, props.preset)
            }
          }

          if (props.theme) {
            finalConfig = AnimationPresets.applyThemeToConfig(finalConfig, props.theme)
          }

          const options: CircleAnimationsOptions = {
            container: containerRef.value,
            animation: animationType,
            config: finalConfig,
            autoStart: props.autoStart
          }

          animationInstance = new CircleAnimations(options)
        }
      }

      onMounted(() => {
        initializeAnimation()
      })

      onUnmounted(() => {
        animationInstance?.destroy()
        animationInstance = null
      })

      watch([() => props.config, () => props.preset, () => props.theme], () => {
        if (animationInstance) {
          animationInstance.destroy()
          initializeAnimation()
        }
      }, { deep: true })

      expose({
        start: () => animationInstance?.start(),
        stop: () => animationInstance?.stop(),
        destroy: () => {
          animationInstance?.destroy()
          animationInstance = null
        },
        updateConfig: (newConfig: Partial<AnimationConfig>) => animationInstance?.updateConfig(newConfig),
        getAnimation: () => animationInstance
      })

      return () => h('div', {
        ref: containerRef,
        class: ['realm-loader-container', props.className],
        style: {
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          ...props.style
        }
      })
    }
  })
}

// Export components (null if Vue not available)
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
export const useRealmLoader = (animation: AnimationType, config?: AnimationConfig) => {
  if (!Vue) {
    return {
      ref: { value: null },
      start: () => {},
      stop: () => {},
      destroy: () => {},
      updateConfig: () => {}
    }
  }

  const { ref } = Vue
  const animationRef = ref(null)

  const start = () => animationRef.value?.start()
  const stop = () => animationRef.value?.stop()
  const destroy = () => {
    animationRef.value?.destroy()
    animationRef.value = null
  }
  const updateConfig = (newConfig: Partial<AnimationConfig>) => animationRef.value?.updateConfig(newConfig)

  return {
    ref: animationRef,
    start,
    stop,
    destroy,
    updateConfig
  }
}

// Export main component and utilities
export { AnimationPresets } from '../AnimationPresets'
export type { AnimationType, AnimationConfig } from '../types'