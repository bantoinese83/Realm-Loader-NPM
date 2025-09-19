// React Component Wrapper for Realm Loader NPM
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { CircleAnimations } from '../CircleAnimations'
import { AnimationPresets, AnimationPresets as Presets } from '../AnimationPresets'
import type { AnimationType, AnimationConfig, CircleAnimationsOptions } from '../types'

export interface RealmLoaderProps {
  animation: AnimationType
  config?: AnimationConfig
  preset?: string
  theme?: string
  autoStart?: boolean
  className?: string
  style?: React.CSSProperties
  onStart?: () => void
  onStop?: () => void
  onDestroy?: () => void
}

export interface RealmLoaderRef {
  start: () => void
  stop: () => void
  destroy: () => void
  updateConfig: (config: Partial<AnimationConfig>) => void
  getAnimation: () => CircleAnimations | null
}

export const RealmLoader = forwardRef<RealmLoaderRef, RealmLoaderProps>(
  ({
    animation,
    config = {},
    preset,
    theme,
    autoStart = true,
    className,
    style,
    onStart,
    onStop,
    onDestroy
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<CircleAnimations | null>(null)

    useImperativeHandle(ref, () => ({
      start: () => {
        if (animationRef.current) {
          animationRef.current.start()
          onStart?.()
        }
      },
      stop: () => {
        if (animationRef.current) {
          animationRef.current.stop()
          onStop?.()
        }
      },
      destroy: () => {
        if (animationRef.current) {
          animationRef.current.destroy()
          animationRef.current = null
          onDestroy?.()
        }
      },
      updateConfig: (newConfig: Partial<AnimationConfig>) => {
        if (animationRef.current) {
          animationRef.current.updateConfig(newConfig)
        }
      },
      getAnimation: () => animationRef.current
    }))

    useEffect(() => {
      if (!containerRef.current) return

      // Apply preset if provided
      let finalConfig = { ...config }
      if (preset) {
        const presetConfig = Presets.getPreset(preset)
        if (presetConfig) {
          finalConfig = Presets.applyPresetToConfig(finalConfig, preset)
        }
      }

      // Apply theme if provided
      if (theme) {
        finalConfig = Presets.applyThemeToConfig(finalConfig, theme)
      }

      // Create animation
      const options: CircleAnimationsOptions = {
        container: containerRef.current,
        animation,
        config: finalConfig,
        autoStart
      }

      animationRef.current = new CircleAnimations(options)

      if (autoStart) {
        onStart?.()
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy()
          animationRef.current = null
          onDestroy?.()
        }
      }
    }, [animation, preset, theme, autoStart])

    // Update config when props change
    useEffect(() => {
      if (animationRef.current && config) {
        let finalConfig = { ...config }
        if (preset) {
          finalConfig = Presets.applyPresetToConfig(finalConfig, preset)
        }
        if (theme) {
          finalConfig = Presets.applyThemeToConfig(finalConfig, theme)
        }
        animationRef.current.updateConfig(finalConfig)
      }
    }, [config, preset, theme])

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      />
    )
  }
)

RealmLoader.displayName = 'RealmLoader'

// Convenience components for each animation type
export const RadialPulse = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="radial-pulse" ref={ref} />
)

export const OrbitalPulse = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="orbital-pulse" ref={ref} />
)

export const PendulumWave = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="pendulum-wave" ref={ref} />
)

export const PulseWave = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="pulse-wave" ref={ref} />
)

export const ConcentricRings = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="concentric-rings" ref={ref} />
)

export const SequentialPulse = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="sequential-pulse" ref={ref} />
)

export const OscillatingDots = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="oscillating-dots" ref={ref} />
)

export const PulsingGrid = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="pulsing-grid" ref={ref} />
)

export const SpiralGalaxy = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="spiral-galaxy" ref={ref} />
)

export const WaveRipple = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="wave-ripple" ref={ref} />
)

export const OrbitalDance = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="orbital-dance" ref={ref} />
)

export const SpiralVortex = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="spiral-vortex" ref={ref} />
)

export const QuantumField = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="quantum-field" ref={ref} />
)

export const NeuralNetwork = forwardRef<RealmLoaderRef, Omit<RealmLoaderProps, 'animation'>>(
  (props, ref) => <RealmLoader {...props} animation="neural-network" ref={ref} />
)

// Hook for easy animation control
export const useRealmLoader = (animation: AnimationType, config?: AnimationConfig) => {
  const ref = useRef<RealmLoaderRef>(null)

  const start = () => ref.current?.start()
  const stop = () => ref.current?.stop()
  const destroy = () => ref.current?.destroy()
  const updateConfig = (newConfig: Partial<AnimationConfig>) => ref.current?.updateConfig(newConfig)

  return {
    ref,
    start,
    stop,
    destroy,
    updateConfig
  }
}

// Preset and theme utilities
export { AnimationPresets } from '../AnimationPresets'
export type { AnimationType, AnimationConfig } from '../types'
