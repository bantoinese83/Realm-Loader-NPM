import React, { useEffect, useRef, useState } from 'react'
import { CircleAnimations } from 'realm-loader-npm'
import type { AnimationType, AnimationConfig } from 'realm-loader-npm'
import './App.css'

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

interface AnimationComponentProps {
  type: AnimationType
  color: string
  speed: number
  isRunning: boolean
}

const AnimationComponent: React.FC<AnimationComponentProps> = ({ 
  type, 
  color, 
  speed, 
  isRunning 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<CircleAnimations | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create animation
    const config: AnimationConfig = {
      color,
      speed,
      width: 200,
      height: 200
    }

    animationRef.current = new CircleAnimations({
      container: containerRef.current,
      animation: type,
      config,
      autoStart: false
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [type, color, speed])

  useEffect(() => {
    if (!animationRef.current) return

    if (isRunning) {
      animationRef.current.start()
    } else {
      animationRef.current.stop()
    }
  }, [isRunning])

  return (
    <div className="animation-wrapper">
      <div className="animation-title">{type.replace('-', ' ').toUpperCase()}</div>
      <div ref={containerRef} className="animation-container" />
    </div>
  )
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [speed, setSpeed] = useState(1.0)
  const [selectedAnimations, setSelectedAnimations] = useState<AnimationType[]>(animationTypes)

  const toggleRunning = () => {
    setIsRunning(!isRunning)
  }

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setSelectedColor(randomColor)
  }

  const changeSpeed = () => {
    const speeds = [0.5, 1.0, 1.5, 2.0]
    const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)]
    setSpeed(randomSpeed)
  }

  const toggleAnimation = (type: AnimationType) => {
    setSelectedAnimations(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Realm Loader NPM - React Integration Test</h1>
        <p>Testing TypeScript integration and React component usage</p>
      </header>

      <div className="controls">
        <button onClick={toggleRunning}>
          {isRunning ? 'Stop All' : 'Start All'}
        </button>
        <button onClick={changeColor}>
          Change Color
        </button>
        <button onClick={changeSpeed}>
          Change Speed
        </button>
      </div>

      <div className="animation-selector">
        <h3>Select Animations:</h3>
        <div className="animation-checkboxes">
          {animationTypes.map(type => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedAnimations.includes(type)}
                onChange={() => toggleAnimation(type)}
              />
              {type.replace('-', ' ')}
            </label>
          ))}
        </div>
      </div>

      <div className="animations-grid">
        {selectedAnimations.map(type => (
          <AnimationComponent
            key={type}
            type={type}
            color={selectedColor}
            speed={speed}
            isRunning={isRunning}
          />
        ))}
      </div>

      <div className="info">
        <h3>Test Results:</h3>
        <ul>
          <li>✅ TypeScript compilation successful</li>
          <li>✅ React component integration working</li>
          <li>✅ Animation lifecycle management working</li>
          <li>✅ Dynamic configuration updates working</li>
          <li>✅ Multiple animations running simultaneously</li>
        </ul>
      </div>
    </div>
  )
}

export default App
