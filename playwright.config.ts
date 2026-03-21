import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/benchmark',
  timeout: 120_000,
  use: {
    headless: false,
    launchOptions: {
      args: [
        '--ignore-gpu-blocklist',
        '--enable-gpu',
        '--disable-software-rasterizer',
        '--disable-features=CPUCompositing',
        '--no-sandbox',
        '--disable-gpu-sandbox',
        '--disable-setuid-sandbox'
      ]
    },
    viewport: { width: 1280, height: 800 }
  },
  projects: [
    { name: 'chromium', use: { channel: 'chromium' } }
  ]
})
