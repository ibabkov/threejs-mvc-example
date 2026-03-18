import Stats from 'stats.js';

export type BenchmarkHandle = {
  destroy: () => void;
  update: () => void;
};

export function createBenchmark(): BenchmarkHandle {
  const store = createStore();
  const stats = createStatsPanel();

  const destroyPointerSampler = createPointerSampler(store);
  const destroyMemorySampler = createMemorySampler(store);
  const updateFpsSampler = createFpsSampler(store);

  const update = () => {
    stats.update();
    updateFpsSampler();
    store.rafTimestamps.push(performance.now());
  };

  const destroy = () => {
    destroyPointerSampler();
    destroyMemorySampler();
    stats.destroy();
  };

  return { destroy, update };
}

function createStore() {
  if (!window.__performance) {
    window.__performance = {
      fps: [],
      rafTimestamps: [],
      inputTimestamps: [],
      memorySamples: [],
      reset() {
        this.fps = [];
        this.rafTimestamps = [];
        this.inputTimestamps = [];
        this.memorySamples = [];
      }
    };
  }

  return window.__performance;
}

function createStatsPanel() {
  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  return {
    update: () => stats.update(),
    destroy: () => stats.dom .remove()
  };
}


// SAMPLERS
function createPointerSampler(store: any) {
  const handler = () => {
    store.inputTimestamps.push(performance.now());
  };

  window.addEventListener('pointermove', handler);

  return () => {
    window.removeEventListener('pointermove', handler);
  };
}

function createMemorySampler(store: any) {
  async function sample() {
    try {
      if ('measureUserAgentSpecificMemory' in performance) {
        const { bytes } = await (performance as any).measureUserAgentSpecificMemory();
        store.memorySamples.push(bytes);
      } else if ((performance as any).memory) {
        store.memorySamples.push((performance as any).memory.usedJSHeapSize);
      }
    } catch {}
  }

  const id = setInterval(sample, 1000);

  return () => {
    clearInterval(id);
  };
}

function createFpsSampler(store: any) {
  let frames = 0;
  let last = performance.now();

  return () => {
    const now = performance.now();

    frames++;

    if (now - last >= 1000) {
      store.fps.push(Math.min(frames, 120));
      frames = 0;
      last = now;
    }
  };
}