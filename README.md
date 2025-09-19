# Realm Loader NPM

[![npm version](https://badge.fury.io/js/realm-loader-npm.svg)](https://badge.fury.io/js/realm-loader-npm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/realm-loader-npm)](https://bundlephobia.com/package/realm-loader-npm)

A comprehensive collection of **14 beautiful circle animations** with performance optimization, presets, themes, and React/Vue components. Perfect for loading states, decorative elements, and interactive UI components.

## ✨ Features

- 🎨 **14 Unique Animations** - From simple pulses to complex quantum fields
- ⚡ **Performance Optimized** - Mobile-friendly with adaptive frame rates
- 🎭 **Presets & Themes** - Pre-configured styles for different use cases
- ⚛️ **React Components** - Ready-to-use components with TypeScript
- 🖖 **Vue Components** - Vue 3 Composition API support
- 📱 **Mobile Optimized** - Battery-aware performance scaling
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 📦 **Tree Shakeable** - Import only what you need
- 🚀 **Zero Dependencies** - Lightweight and fast

## 🎬 Animation Gallery

| Animation | Description | Use Case |
|-----------|-------------|----------|
| **Radial Pulse** | Expanding rings from center | Loading states |
| **Orbital Pulse** | Rotating orbital particles | Scientific visualizations |
| **Pendulum Wave** | Synchronized pendulum motion | Physics demonstrations |
| **Pulse Wave** | Wave-like pulse propagation | Data visualization |
| **Concentric Rings** | Multiple rotating rings | Decorative elements |
| **Sequential Pulse** | Sequential dot activation | Progress indicators |
| **Oscillating Dots** | Grid of oscillating particles | Interactive backgrounds |
| **Pulsing Grid** | Breathing grid pattern | Modern UI elements |
| **Spiral Galaxy** | Galaxy-like spiral motion | Space themes |
| **Wave Ripple** | Water-like ripple effects | Fluid animations |
| **Orbital Dance** | Dynamic orbital dancers | Creative expressions |
| **Spiral Vortex** | Mesmerizing vortex particles | Hypnotic effects |
| **Quantum Field** | Quantum physics visualization | Scientific themes |
| **Neural Network** | AI-inspired network connections | Machine learning UIs |

## 🚀 Quick Start

### Installation

```bash
npm install realm-loader-npm
```

### Basic Usage

```typescript
import { CircleAnimations } from 'realm-loader-npm'

// Create animation
const animation = new CircleAnimations({
  container: '#my-container',
  animation: 'radial-pulse',
  config: {
    color: '#4ecdc4',
    speed: 1.5,
    width: 200,
    height: 200
  }
})

// Start animation
animation.start()
```

### React Usage

```tsx
import { RadialPulse, useRealmLoader } from 'realm-loader-npm/react'

function App() {
  const { start, stop } = useRealmLoader('radial-pulse', {
    color: '#ff6b6b',
    speed: 2.0
  })

  return (
    <div>
      <RadialPulse 
        preset="loading-fast"
        theme="ocean"
        onStart={() => console.log('Started!')}
      />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

### Vue Usage

```vue
<template>
  <div>
    <RadialPulse 
      :preset="'loading-fast'"
      :theme="'ocean'"
      @start="onStart"
    />
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
  </div>
</template>

<script setup>
import { RadialPulse, useRealmLoader } from 'realm-loader-npm/vue'

const { start, stop } = useRealmLoader('radial-pulse', {
  color: '#ff6b6b',
  speed: 2.0
})

const onStart = () => console.log('Started!')
</script>
```

## 🎭 Presets & Themes

### Using Presets

```typescript
import { AnimationPresets } from 'realm-loader-npm'

// Apply preset
const config = AnimationPresets.applyPresetToConfig({}, 'loading-fast')

// Available presets
const presets = AnimationPresets.getAllPresets()
// ['loading-fast', 'loading-smooth', 'decorative-elegant', ...]
```

### Using Themes

```typescript
import { AnimationPresets } from 'realm-loader-npm'

// Apply theme
const config = AnimationPresets.applyThemeToConfig({}, 'ocean')

// Available themes
const themes = AnimationPresets.getAllThemes()
// ['ocean', 'sunset', 'forest', 'cosmic', 'monochrome', 'neon']
```

## ⚡ Performance Optimization

The package automatically optimizes performance based on device capabilities:

```typescript
import { PerformanceOptimizer } from 'realm-loader-npm'

const optimizer = PerformanceOptimizer.getInstance()

// Get device info
const deviceInfo = optimizer.getDeviceInfo()
console.log(deviceInfo) // { isMobile: true, isLowEnd: false, ... }

// Get optimized config
const optimizedConfig = optimizer.getOptimizedConfig('spiral-galaxy')
```

## 🎨 Customization

### Animation Configuration

```typescript
const config = {
  // Basic settings
  width: 300,
  height: 300,
  color: '#ff6b6b',
  speed: 1.5,
  opacity: 0.8,
  
  // Animation-specific settings
  ringCount: 8,           // For radial-pulse
  particleCount: 200,     // For spiral-galaxy
  gridSize: 5,            // For pulsing-grid
  // ... and more
}
```

### Factory Methods

```typescript
import { CircleAnimations } from 'realm-loader-npm'

// Create specific animations
const radialPulse = CircleAnimations.createRadialPulse('#container')
const spiralGalaxy = CircleAnimations.createSpiralGalaxy('#container', {
  particleCount: 300,
  maxRadius: 100
})
const quantumField = CircleAnimations.createQuantumField('#container', {
  fieldSize: 8,
  quantumSpeed: 1.2
})
```

## 📱 Mobile Optimization

The package includes automatic mobile optimization:

- **Adaptive Frame Rate**: 30-60 FPS based on device capabilities
- **Battery Saving**: Reduced performance when battery is low
- **Memory Management**: Optimized particle counts for mobile devices
- **Visibility API**: Pauses animations when tab is not visible

## 🛠️ API Reference

### CircleAnimations Class

```typescript
class CircleAnimations {
  constructor(options: CircleAnimationsOptions)
  start(): void
  stop(): void
  destroy(): void
  updateConfig(config: Partial<AnimationConfig>): void
  
  // Factory methods
  static createRadialPulse(container: string | HTMLElement, config?: any): CircleAnimations
  static createOrbitalPulse(container: string | HTMLElement, config?: any): CircleAnimations
  // ... and more
}
```

### Animation Types

```typescript
type AnimationType = 
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
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Bundle Size

- **Core Library**: ~12KB (minified)
- **CSS**: ~2KB (minified)
- **Type Definitions**: ~6.5KB
- **Total**: ~20KB (excluding React/Vue components)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern UI/UX design patterns
- Built with performance and accessibility in mind
- Community feedback and contributions

## 📞 Support

- 📧 Email: hello@realmloader.dev
- 🐛 Issues: [GitHub Issues](https://github.com/realm-loader/realm-loader-npm/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/realm-loader/realm-loader-npm/discussions)
- 📖 Documentation: [realmloader.dev](https://realmloader.dev)

---

<div align="center">

**Made with ❤️ by the Realm Loader Team**

[Website](https://realmloader.dev) • [Documentation](https://docs.realmloader.dev) • [Examples](https://examples.realmloader.dev) • [GitHub](https://github.com/realm-loader/realm-loader-npm)

</div>