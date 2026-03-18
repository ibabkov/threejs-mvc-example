declare global {
  interface Window {
    __performance: {
      fps: number[]
      inputTimestamps: number[]
      rafTimestamps: number[]
      memorySamples: number[]
      reset: () => void
    }
  }
}

export {}