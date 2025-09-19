// Jest setup file for global test configuration
import { jest } from '@jest/globals'

// Make Jest globals available
global.jest = jest
global.describe = describe
global.it = it
global.test = test
global.expect = expect
global.beforeEach = beforeEach
global.afterEach = afterEach
global.beforeAll = beforeAll
global.afterAll = afterAll

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock navigator.hardwareConcurrency
Object.defineProperty(navigator, 'hardwareConcurrency', {
  writable: true,
  value: 4,
})

// Mock navigator.deviceMemory
Object.defineProperty(navigator, 'deviceMemory', {
  writable: true,
  value: 8,
})

// Mock document.createElement to return elements with style property
const originalCreateElement = document.createElement
document.createElement = jest.fn((tagName) => {
  const element = originalCreateElement.call(document, tagName)
  if (!element.style) {
    element.style = {}
  }
  return element
})

// Mock document.querySelector to return mock elements for test containers
const originalQuerySelector = document.querySelector
document.querySelector = jest.fn((selector) => {
  // Return mock elements for test selectors
  if (selector === '#test' || 
      selector === '#test-container' || 
      selector.startsWith('#animation-container') ||
      selector === '#invalid-container' ||
      selector === '#invalid') {
    return {
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      querySelector: jest.fn(() => null),
      style: {}
    }
  }
  return originalQuerySelector.call(document, selector)
})
