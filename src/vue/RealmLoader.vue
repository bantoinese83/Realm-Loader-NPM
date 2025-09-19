<template>
  <div
    ref="containerRef"
    :class="className"
    :style="containerStyle"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { CircleAnimations } from '../CircleAnimations'
import { AnimationPresets } from '../AnimationPresets'
import type { AnimationType, AnimationConfig, CircleAnimationsOptions } from '../types'

export interface Props {
  animation: AnimationType
  config?: AnimationConfig
  preset?: string
  theme?: string
  autoStart?: boolean
  className?: string
  style?: Record<string, any>
}

export interface Emits {
  (e: 'start'): void
  (e: 'stop'): void
  (e: 'destroy'): void
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
  autoStart: true,
  className: '',
  style: () => ({})
})

const emit = defineEmits<Emits>()

const containerRef = ref<HTMLDivElement | null>(null)
const animationRef = ref<CircleAnimations | null>(null)

const containerStyle = computed(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...props.style
}))

const start = () => {
  if (animationRef.value) {
    animationRef.value.start()
    emit('start')
  }
}

const stop = () => {
  if (animationRef.value) {
    animationRef.value.stop()
    emit('stop')
  }
}

const destroy = () => {
  if (animationRef.value) {
    animationRef.value.destroy()
    animationRef.value = null
    emit('destroy')
  }
}

const updateConfig = (newConfig: Partial<AnimationConfig>) => {
  if (animationRef.value) {
    animationRef.value.updateConfig(newConfig)
  }
}

const getAnimation = () => animationRef.value

// Expose methods to parent component
defineExpose({
  start,
  stop,
  destroy,
  updateConfig,
  getAnimation
})

onMounted(() => {
  if (!containerRef.value) return

  // Apply preset if provided
  let finalConfig = { ...props.config }
  if (props.preset) {
    const presetConfig = AnimationPresets.getPreset(props.preset)
    if (presetConfig) {
      finalConfig = AnimationPresets.applyPresetToConfig(finalConfig, props.preset)
    }
  }

  // Apply theme if provided
  if (props.theme) {
    finalConfig = AnimationPresets.applyThemeToConfig(finalConfig, props.theme)
  }

  // Create animation
  const options: CircleAnimationsOptions = {
    container: containerRef.value,
    animation: props.animation,
    config: finalConfig,
    autoStart: props.autoStart
  }

  animationRef.value = new CircleAnimations(options)

  if (props.autoStart) {
    emit('start')
  }
})

onUnmounted(() => {
  if (animationRef.value) {
    animationRef.value.destroy()
    animationRef.value = null
    emit('destroy')
  }
})

// Watch for prop changes
watch(() => [props.config, props.preset, props.theme], () => {
  if (animationRef.value) {
    let finalConfig = { ...props.config }
    if (props.preset) {
      finalConfig = AnimationPresets.applyPresetToConfig(finalConfig, props.preset)
    }
    if (props.theme) {
      finalConfig = AnimationPresets.applyThemeToConfig(finalConfig, props.theme)
    }
    animationRef.value.updateConfig(finalConfig)
  }
}, { deep: true })
</script>
