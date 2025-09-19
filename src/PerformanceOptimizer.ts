// Performance Optimizer for Mobile Devices
// Provides adaptive performance settings based on device capabilities

export interface PerformanceConfig {
  maxFPS: number
  particleCount: number
  quality: 'low' | 'medium' | 'high'
  enableReducedMotion: boolean
  enableBatterySaving: boolean
}

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer
  private config: PerformanceConfig
  private isMobile: boolean
  private isLowEndDevice: boolean
  private batteryLevel: number | null = null

  private constructor() {
    this.isMobile = this.detectMobile()
    this.isLowEndDevice = this.detectLowEndDevice()
    this.config = this.getDefaultConfig()
    this.optimizeForDevice()
  }

  public static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer()
    }
    return PerformanceOptimizer.instance
  }

  private detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0)
  }

  private detectLowEndDevice(): boolean {
    // Detect low-end devices based on hardware concurrency and memory
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 4
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    return cores <= 2 || memory <= 2 || prefersReducedMotion
  }

  private getDefaultConfig(): PerformanceConfig {
    return {
      maxFPS: 60,
      particleCount: 100,
      quality: 'high',
      enableReducedMotion: false,
      enableBatterySaving: false
    }
  }

  private optimizeForDevice(): void {
    if (this.isLowEndDevice) {
      this.config.quality = 'low'
      this.config.maxFPS = 30
      this.config.particleCount = 50
      this.config.enableReducedMotion = true
      this.config.enableBatterySaving = true
    } else if (this.isMobile) {
      this.config.quality = 'medium'
      this.config.maxFPS = 45
      this.config.particleCount = 75
      this.config.enableBatterySaving = true
    }

    // Check for battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.batteryLevel = battery.level
        if (battery.level < 0.2) {
          this.config.enableBatterySaving = true
          this.config.maxFPS = Math.min(this.config.maxFPS, 30)
          this.config.particleCount = Math.floor(this.config.particleCount * 0.5)
        }
      })
    }

    // Listen for visibility changes to pause when not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.config.maxFPS = 10 // Reduce FPS when not visible
      } else {
        this.optimizeForDevice() // Restore normal settings
      }
    })
  }

  public getOptimizedConfig(animationType: string): Partial<PerformanceConfig> {
    const baseConfig = { ...this.config }

    // Animation-specific optimizations
    switch (animationType) {
      case 'spiral-galaxy':
      case 'quantum-field':
        // Particle-heavy animations
        if (this.isLowEndDevice) {
          baseConfig.particleCount = 30
        } else if (this.isMobile) {
          baseConfig.particleCount = 60
        }
        break

      case 'pulsing-grid':
      case 'neural-network':
        // Complex grid animations
        if (this.isLowEndDevice) {
          baseConfig.quality = 'low'
          baseConfig.maxFPS = 20
        }
        break

      case 'wave-ripple':
      case 'spiral-vortex':
        // Wave-based animations
        if (this.isLowEndDevice) {
          baseConfig.maxFPS = 25
        }
        break

      default:
        // Standard optimizations for other animations
        break
    }

    return baseConfig
  }

  public shouldReduceMotion(): boolean {
    return this.config.enableReducedMotion || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  public getOptimalFrameRate(): number {
    return this.config.maxFPS
  }

  public getOptimalParticleCount(baseCount: number): number {
    return Math.min(baseCount, this.config.particleCount)
  }

  public isBatterySavingMode(): boolean {
    return this.config.enableBatterySaving
  }

  public updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  public getDeviceInfo(): {
    isMobile: boolean
    isLowEnd: boolean
    batteryLevel: number | null
    cores: number
    memory: number
  } {
    return {
      isMobile: this.isMobile,
      isLowEnd: this.isLowEndDevice,
      batteryLevel: this.batteryLevel,
      cores: navigator.hardwareConcurrency || 2,
      memory: (navigator as any).deviceMemory || 4
    }
  }
}
