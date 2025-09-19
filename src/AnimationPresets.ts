// Animation Presets and Themes
// Pre-configured animation settings for different use cases

import { AnimationConfig, AnimationType } from './types'

export interface AnimationPreset {
  name: string
  description: string
  config: AnimationConfig
  category: 'loading' | 'decorative' | 'scientific' | 'artistic' | 'minimal'
  tags: string[]
}

export interface Theme {
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  opacity: number
  speed: number
}

export class AnimationPresets {
  private static presets: Map<string, AnimationPreset> = new Map()
  private static themes: Map<string, Theme> = new Map()

  static {
    // Initialize presets
    this.initializePresets()
    this.initializeThemes()
  }

  private static initializePresets(): void {
    // Loading Presets
    this.presets.set('loading-fast', {
      name: 'Fast Loading',
      description: 'Quick, energetic loading animation',
      config: {
        speed: 2.0,
        color: '#4ecdc4',
        opacity: 0.9
      },
      category: 'loading',
      tags: ['fast', 'loading', 'energetic']
    })

    this.presets.set('loading-smooth', {
      name: 'Smooth Loading',
      description: 'Gentle, smooth loading animation',
      config: {
        speed: 0.8,
        color: '#96ceb4',
        opacity: 0.7
      },
      category: 'loading',
      tags: ['smooth', 'loading', 'gentle']
    })

    this.presets.set('loading-minimal', {
      name: 'Minimal Loading',
      description: 'Simple, minimal loading animation',
      config: {
        speed: 1.0,
        color: '#ffffff',
        opacity: 0.5
      },
      category: 'loading',
      tags: ['minimal', 'loading', 'simple']
    })

    // Decorative Presets
    this.presets.set('decorative-elegant', {
      name: 'Elegant Decoration',
      description: 'Sophisticated decorative animation',
      config: {
        speed: 0.6,
        color: '#d4af37',
        opacity: 0.8
      },
      category: 'decorative',
      tags: ['elegant', 'decorative', 'sophisticated']
    })

    this.presets.set('decorative-playful', {
      name: 'Playful Decoration',
      description: 'Fun, colorful decorative animation',
      config: {
        speed: 1.5,
        color: '#ff6b6b',
        opacity: 0.9
      },
      category: 'decorative',
      tags: ['playful', 'decorative', 'colorful']
    })

    // Scientific Presets
    this.presets.set('scientific-precise', {
      name: 'Precise Scientific',
      description: 'Accurate, scientific visualization',
      config: {
        speed: 1.0,
        color: '#00d2d3',
        opacity: 0.8
      },
      category: 'scientific',
      tags: ['scientific', 'precise', 'data']
    })

    this.presets.set('scientific-quantum', {
      name: 'Quantum Field',
      description: 'Quantum physics visualization',
      config: {
        speed: 1.2,
        color: '#9b59b6',
        opacity: 0.7
      },
      category: 'scientific',
      tags: ['quantum', 'scientific', 'physics']
    })

    // Artistic Presets
    this.presets.set('artistic-abstract', {
      name: 'Abstract Art',
      description: 'Abstract artistic expression',
      config: {
        speed: 0.4,
        color: '#e74c3c',
        opacity: 0.6
      },
      category: 'artistic',
      tags: ['abstract', 'artistic', 'creative']
    })

    this.presets.set('artistic-organic', {
      name: 'Organic Flow',
      description: 'Natural, organic movement',
      config: {
        speed: 0.8,
        color: '#2ecc71',
        opacity: 0.8
      },
      category: 'artistic',
      tags: ['organic', 'artistic', 'natural']
    })

    // Minimal Presets
    this.presets.set('minimal-subtle', {
      name: 'Subtle Minimal',
      description: 'Very subtle, minimal animation',
      config: {
        speed: 0.5,
        color: '#bdc3c7',
        opacity: 0.3
      },
      category: 'minimal',
      tags: ['minimal', 'subtle', 'quiet']
    })

    this.presets.set('minimal-clean', {
      name: 'Clean Minimal',
      description: 'Clean, simple minimal animation',
      config: {
        speed: 1.0,
        color: '#34495e',
        opacity: 0.5
      },
      category: 'minimal',
      tags: ['minimal', 'clean', 'simple']
    })
  }

  private static initializeThemes(): void {
    // Color Themes
    this.themes.set('ocean', {
      name: 'Ocean',
      description: 'Cool ocean-inspired colors',
      colors: {
        primary: '#4ecdc4',
        secondary: '#45b7d1',
        accent: '#96ceb4',
        background: '#2c3e50'
      },
      opacity: 0.8,
      speed: 1.0
    })

    this.themes.set('sunset', {
      name: 'Sunset',
      description: 'Warm sunset colors',
      colors: {
        primary: '#ff6b6b',
        secondary: '#feca57',
        accent: '#ff9ff3',
        background: '#2c2c54'
      },
      opacity: 0.9,
      speed: 1.2
    })

    this.themes.set('forest', {
      name: 'Forest',
      description: 'Natural forest colors',
      colors: {
        primary: '#2ecc71',
        secondary: '#27ae60',
        accent: '#96ceb4',
        background: '#1e3a8a'
      },
      opacity: 0.7,
      speed: 0.8
    })

    this.themes.set('cosmic', {
      name: 'Cosmic',
      description: 'Space and cosmic colors',
      colors: {
        primary: '#9b59b6',
        secondary: '#8e44ad',
        accent: '#00d2d3',
        background: '#000000'
      },
      opacity: 0.9,
      speed: 1.5
    })

    this.themes.set('monochrome', {
      name: 'Monochrome',
      description: 'Black and white theme',
      colors: {
        primary: '#ffffff',
        secondary: '#bdc3c7',
        accent: '#95a5a6',
        background: '#2c3e50'
      },
      opacity: 0.8,
      speed: 1.0
    })

    this.themes.set('neon', {
      name: 'Neon',
      description: 'Bright neon colors',
      colors: {
        primary: '#00ff00',
        secondary: '#ff00ff',
        accent: '#00ffff',
        background: '#000000'
      },
      opacity: 1.0,
      speed: 2.0
    })
  }

  public static getPreset(name: string): AnimationPreset | undefined {
    return this.presets.get(name)
  }

  public static getAllPresets(): AnimationPreset[] {
    return Array.from(this.presets.values())
  }

  public static getPresetsByCategory(category: string): AnimationPreset[] {
    return Array.from(this.presets.values()).filter(preset => preset.category === category)
  }

  public static getPresetsByTag(tag: string): AnimationPreset[] {
    return Array.from(this.presets.values()).filter(preset => preset.tags.includes(tag))
  }

  public static getTheme(name: string): Theme | undefined {
    return this.themes.get(name)
  }

  public static getAllThemes(): Theme[] {
    return Array.from(this.themes.values())
  }

  public static applyThemeToConfig(config: AnimationConfig, themeName: string): AnimationConfig {
    const theme = this.getTheme(themeName)
    if (!theme) return config

    return {
      ...config,
      color: theme.colors.primary,
      backgroundColor: theme.colors.background,
      opacity: theme.opacity,
      speed: theme.speed
    }
  }

  public static applyPresetToConfig(config: AnimationConfig, presetName: string): AnimationConfig {
    const preset = this.getPreset(presetName)
    if (!preset) return config

    return {
      ...config,
      ...preset.config
    }
  }

  public static getRecommendedPreset(animationType: AnimationType, useCase: string): string | null {
    const recommendations: Record<string, Record<string, string>> = {
      'radial-pulse': {
        'loading': 'loading-fast',
        'decorative': 'decorative-elegant',
        'minimal': 'minimal-subtle'
      },
      'spiral-galaxy': {
        'scientific': 'scientific-quantum',
        'artistic': 'artistic-abstract',
        'decorative': 'decorative-playful'
      },
      'neural-network': {
        'scientific': 'scientific-precise',
        'artistic': 'artistic-abstract',
        'minimal': 'minimal-clean'
      },
      'quantum-field': {
        'scientific': 'scientific-quantum',
        'artistic': 'artistic-abstract',
        'decorative': 'decorative-playful'
      }
    }

    return recommendations[animationType]?.[useCase] || null
  }

  public static createCustomPreset(
    name: string,
    description: string,
    config: AnimationConfig,
    category: string,
    tags: string[]
  ): void {
    this.presets.set(name, {
      name,
      description,
      config,
      category: category as any,
      tags
    })
  }

  public static createCustomTheme(
    name: string,
    description: string,
    colors: { primary: string; secondary: string; accent: string; background: string },
    opacity: number,
    speed: number
  ): void {
    this.themes.set(name, {
      name,
      description,
      colors,
      opacity,
      speed
    })
  }
}
