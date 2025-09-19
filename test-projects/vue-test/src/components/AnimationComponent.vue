<template>
  <div class="animation-wrapper">
    <div class="animation-title">{{ type.replace('-', ' ').toUpperCase() }}</div>
    <div ref="containerRef" class="animation-container" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { CircleAnimations } from 'realm-loader-npm'
import type { AnimationType, AnimationConfig } from 'realm-loader-npm'

interface Props {
  type: AnimationType
  color: string
  speed: number
  isRunning: boolean
}

const props = defineProps<Props>()

const containerRef = ref<HTMLDivElement | null>(null)
const animationRef = ref<CircleAnimations | null>(null)

onMounted(() => {
  if (!containerRef.value) return

  const config: AnimationConfig = {
    color: props.color,
    speed: props.speed,
    width: 200,
    height: 200
  }

  animationRef.value = new CircleAnimations({
    container: containerRef.value,
    animation: props.type,
    config,
    autoStart: false
  })

  if (props.isRunning) {
    animationRef.value.start()
  }
})

onUnmounted(() => {
  if (animationRef.value) {
    animationRef.value.destroy()
  }
})

watch(() => props.isRunning, (isRunning) => {
  if (!animationRef.value) return

  if (isRunning) {
    animationRef.value.start()
  } else {
    animationRef.value.stop()
  }
})

watch(() => [props.color, props.speed], ([color, speed]) => {
  if (!animationRef.value) return

  animationRef.value.updateConfig({
    color,
    speed
  })
})
</script>

<style scoped>
.animation-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: border-color 0.3s ease;
}

.animation-wrapper:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.animation-title {
  font-size: 14px;
  margin-bottom: 15px;
  color: #4ecdc4;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.animation-container {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
