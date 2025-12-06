import { useState, useMemo } from 'react';
import {
  Point,
  SeededRandom,
  generateMoons,
  generateCircles,
  generateBlobs,
  calculateMetrics,
  ExampleSettings
} from '@/lib/knn';

export function useKNNPlayground(initialSettings?: Partial<ExampleSettings>) {
  const [k, setK] = useState(initialSettings?.k ?? 5);
  const [weights, setWeights] = useState<'uniform' | 'distance'>(initialSettings?.weights ?? 'uniform');
  const [metricP, setMetricP] = useState(initialSettings?.metricP ?? 2);
  const [dataset, setDataset] = useState(initialSettings?.dataset ?? 'moons');
  const [noise, setNoise] = useState(initialSettings?.noise ?? 0.15);
  const [sampleSize, setSampleSize] = useState(initialSettings?.sampleSize ?? 100);
  const [seed, setSeed] = useState(initialSettings?.seed ?? 42);
  const [inspectIndex, setInspectIndex] = useState<number | null>(null);

  const data: Point[] = useMemo(() => {
    const rng = new SeededRandom(seed);
    switch (dataset) {
      case 'circles':
        return generateCircles(sampleSize, noise, rng);
      case 'blobs':
        return generateBlobs(sampleSize, noise, rng);
      case 'moons':
      default:
        return generateMoons(sampleSize, noise, rng);
    }
  }, [dataset, sampleSize, noise, seed]);

  const metrics = useMemo(() => {
    if (data.length === 0) return { accuracy: 0, tp: 0, tn: 0, fp: 0, fn: 0 };
    return calculateMetrics(data, k, weights, metricP);
  }, [data, k, weights, metricP]);

  const applySettings = (settings: ExampleSettings) => {
    setK(settings.k);
    setWeights(settings.weights);
    setMetricP(settings.metricP);
    setDataset(settings.dataset);
    setNoise(settings.noise);
    setSampleSize(settings.sampleSize);
    setSeed(settings.seed);
    setInspectIndex(null);
  };

  const currentSettings: ExampleSettings = {
    k,
    weights,
    metricP,
    dataset,
    noise,
    sampleSize,
    seed
  };

  return {
    // State
    k, setK,
    weights, setWeights,
    metricP, setMetricP,
    dataset, setDataset,
    noise, setNoise,
    sampleSize, setSampleSize,
    seed, setSeed,
    inspectIndex, setInspectIndex,
    // Computed
    data,
    metrics,
    currentSettings,
    // Actions
    applySettings
  };
}
