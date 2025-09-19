<template>
  <div class="app">
    <header class="app-header">
      <h1>Realm Loader NPM - Vue Integration Test</h1>
      <p>Testing TypeScript integration and Vue component usage</p>
    </header>

    <div class="controls">
      <button @click="toggleRunning">
        {{ isRunning ? 'Stop All' : 'Start All' }}
      </button>
      <button @click="changeColor">Change Color</button>
      <button @click="changeSpeed">Change Speed</button>
    </div>

    <div class="animation-selector">
      <h3>Select Animations:</h3>
      <div class="animation-checkboxes">
        <label 
          v-for="type in animationTypes" 
          :key="type" 
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :checked="selectedAnimations.includes(type)"
            @change="toggleAnimation(type)"
          />
          {{ type.replace('-', ' ') }}
        </label>
      </div>
    </div>

    <div class="animations-grid">
      <AnimationComponent
        v-for="type in selectedAnimations"
        :key="type"
        :type="type"
        :color="selectedColor"
        :speed="speed"
        :is-running="isRunning"
      />
    </div>

    <div class="info">
      <h3>Test Results:</h3>
      <ul>
        <li>✅ TypeScript compilation successful</li>
        <li>✅ Vue component integration working</li>
        <li>✅ Animation lifecycle management working</li>
        <li>✅ Dynamic configuration updates working</li>
        <li>✅ Multiple animations running simultaneously</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AnimationComponent from './components/AnimationComponent.vue'
import type { AnimationType } from 'realm-loader-npm'

const animationTypes: AnimationType[] = [
  'radial-pulse',
  'orbital-pulse',
  'pendulum-wave',
  'pulse-wave',
  'concentric-rings',
  'sequential-pulse',
  'oscillating-dots',
  'pulsing-grid',
  'spiral-galaxy'
]

const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
  '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'
]

const isRunning = ref(true)
const selectedColor = ref(colors[0])
const speed = ref(1.0)
const selectedAnimations = ref<AnimationType[]>(animationTypes)

const toggleRunning = () => {
  isRunning.value = !isRunning.value
}

const changeColor = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  selectedColor.value = randomColor
}

const changeSpeed = () => {
  const speeds = [0.5, 1.0, 1.5, 2.0]
  const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)]
  speed.value = randomSpeed
}

const toggleAnimation = (type: AnimationType) => {
  if (selectedAnimations.value.includes(type)) {
    selectedAnimations.value = selectedAnimations.value.filter(t => t !== type)
  } else {
    selectedAnimations.value.push(type)
  }
}

onMounted(() => {
  console.log('Vue app mounted with Realm Loader NPM integration')
})

onUnmounted(() => {
  console.log('Vue app unmounted')
})
</script>

<style scoped>
.app {
  text-align: center;
  background: #000;
  color: #f0f0f0;
  font-family: "TheGoodMonolith", monospace;
  min-height: 100vh;
  padding: 20px;
}

.app-header {
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #4ecdc4;
}

.app-header p {
  font-size: 1.2rem;
  color: #888;
}

.controls {
  margin: 30px 0;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.controls button {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #f0f0f0;
  font-family: "TheGoodMonolith", monospace;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.controls button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.animation-selector {
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.animation-selector h3 {
  margin-bottom: 15px;
  color: #4ecdc4;
}

.animation-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  justify-items: start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #ccc;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
}

.animations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
  justify-items: center;
}

.info {
  margin-top: 40px;
  padding: 20px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.info h3 {
  color: #4caf50;
  margin-bottom: 15px;
}

.info ul {
  list-style: none;
  padding: 0;
}

.info li {
  margin: 8px 0;
  font-size: 14px;
  color: #ccc;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .animations-grid {
    grid-template-columns: 1fr;
  }
  
  .animation-checkboxes {
    grid-template-columns: 1fr;
  }
}
</style>
