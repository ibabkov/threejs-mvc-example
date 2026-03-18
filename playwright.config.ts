import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/benchmark',
  timeout: 60_000,

  use: {
    headless: true,

    launchOptions: {
      args: [
        '--ignore-gpu-blocklist',
        '--enable-gpu',
        '--use-angle=metal',
        '--disable-software-rasterizer',
        '--disable-features=CPUCompositing',
      ]
    },

    viewport: { width: 1280, height: 800 }
  },

  projects: [
    { name: 'chromium', use: { channel: 'chromium' } }
  ]
})