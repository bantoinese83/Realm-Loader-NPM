import { AnimationConfig, AnimationInstance } from '../types'
import { PerformanceOptimizer } from '../PerformanceOptimizer'

export abstract class BaseAnimation implements AnimationInstance {
  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D
  protected container: HTMLElement
  protected config: AnimationConfig
  protected animationId: number | null = null
  protected isRunning = false
  protected time = 0
  protected lastTime = 0
  protected performanceOptimizer: PerformanceOptimizer
  protected targetFPS: number
  protected frameInterval: number

  constructor(container: HTMLElement, config: AnimationConfig = {}) {
    this.container = container
    this.config = {
      width: 180,
      height: 180,
      speed: 1,
      color: '#ffffff',
      backgroundColor: 'transparent',
      opacity: 0.9,
      ...config
    }
    
    this.canvas = this.createCanvas()
    this.ctx = this.canvas.getContext('2d')!
    this.container.appendChild(this.canvas)
    
    // Initialize performance optimization
    this.performanceOptimizer = PerformanceOptimizer.getInstance()
    this.targetFPS = this.performanceOptimizer.getOptimalFrameRate()
    this.frameInterval = 1000 / this.targetFPS
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = this.config.width!
    canvas.height = this.config.height!
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.pointerEvents = 'none'
    return canvas
  }

  protected animate = (timestamp: number): void => {
    if (!this.lastTime) this.lastTime = timestamp
    const deltaTime = timestamp - this.lastTime
    
    // Performance optimization: skip frames if needed
    if (deltaTime < this.frameInterval) {
      if (this.isRunning) {
        this.animationId = requestAnimationFrame(this.animate)
      }
      return
    }
    
    this.lastTime = timestamp
    this.time += deltaTime * 0.001 * this.config.speed!

    this.clearCanvas()
    this.draw()

    if (this.isRunning) {
      this.animationId = requestAnimationFrame(this.animate)
    }
  }

  protected clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  protected abstract draw(): void

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true
      this.lastTime = 0
      this.time = 0
      this.animationId = requestAnimationFrame(this.animate)
    }
  }

  public stop(): void {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  public destroy(): void {
    this.stop()
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
  }

  public updateConfig(newConfig: Partial<AnimationConfig>): void {
    this.config = { ...this.config, ...newConfig }
    
    if (newConfig.width || newConfig.height) {
      this.canvas.width = this.config.width!
      this.canvas.height = this.config.height!
    }
  }

  protected getColor(alpha: number = 1): string {
    const color = this.config.color!
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha * this.config.opacity!})`
    }
    return color
  }
}
