import { test, type Page, type Locator } from '@playwright/test';
import { MathUtils } from 'three';

test('Performance test', async ({ page }) => {
  try {
    await page.goto('http://localhost:1234', { waitUntil: 'networkidle' });
  } catch {
    console.error('Run `npm start` first.');
    return;
  }
  const canvas = await page.locator('#app canvas').boundingBox();

  if (!canvas) throw new Error('Canvas not found');

  await page.waitForTimeout(3000);
  await page.evaluate(() => window.__performance.reset());
  await performRandomMoves(page, canvas, 10);

  const perf = await getStats(page);
  const fpsStats = computeFpsStats(perf.fps);
  const latencyStats = computeLatencyStats(perf.input, perf.raf);
  const memAvg = computeMemoryStats(perf.memory);

  console.table({
    'FPS avg': Number(fpsStats.avg.toFixed()),
    'FPS min': Number(fpsStats.min.toFixed()),
    'FPS max': Number(fpsStats.max.toFixed()),
    'Input > Render latency avg (ms)': Number(latencyStats.avg.toFixed(2)),
    'Input > Render latency max (ms)': Number(latencyStats.max.toFixed(2)),
    'Memory footprint avg (MB)': Number(memAvg.toFixed())
  });
});

async function getStats(page: Page) {
  return page.evaluate(() => ({
    fps: window.__performance.fps,
    raf: window.__performance.rafTimestamps,
    input: window.__performance.inputTimestamps,
    memory: window.__performance.memorySamples
  }));
}

function computeFpsStats(values: number[]) {
  if (!values.length) {
    return { avg: 0, min: 0, max: 0 };
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const avg = MathUtils.clamp(sum / values.length, 0, 120);
  const min = MathUtils.clamp(Math.min(...values), 0, 120);
  const max = MathUtils.clamp(Math.max(...values), 0, 120);

  return { avg, min, max };
}

function computeLatencyStats(inputs: number[], rafs: number[]) {
  const latencies = [];

  for (const ts of inputs) {
    const frame = rafs.find(v => v >= ts);
    if (frame !== undefined) {
      latencies.push(frame - ts);
    }
  }

  if (!latencies.length) {
    return { avg: 0, max: 0 };
  }

  const sum = latencies.reduce((a, b) => a + b, 0);
  return {
    avg: sum / latencies.length,
    max: Math.max(...latencies)
  };
}

function computeMemoryStats(samples: number[]) {
  if (!samples.length) return 0;
  const sum = samples.reduce((a, b) => a + b, 0);

  return sum / samples.length / 1048576;
}

async function performRandomMoves(
  page: Page,
  canvas: NonNullable<Awaited<ReturnType<Locator['boundingBox']>>>,
  count: number
) {
  const randomPointInCanvas = (canvas: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): [number, number] => {
    const margin = 20;
    const x = canvas.x + margin + Math.random() * (canvas.width - margin * 2);
    const y = canvas.y + margin + Math.random() * (canvas.height - margin * 2);

    return [x, y];
  }
  const interpolate = (start: [number, number], end: [number, number], t: number) => {
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;

    return [x, y] as const;
  }
  const performSmoothMove = async (page: Page, from: [number, number], to: [number, number], duration = 1000, steps = 120) => {
    const stepDelay = duration / steps;

    for (let i = 0; i < steps; i++) {
      const pos = interpolate(from, to, i / steps);
      await page.mouse.move(pos[0], pos[1]);
      await page.waitForTimeout(stepDelay);
    }
  }

  for (let i = 0; i < count; i++) {
    const from = randomPointInCanvas(canvas);
    const to = randomPointInCanvas(canvas);

    await performSmoothMove(page, from, to);
  }
}