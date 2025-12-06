// Seeded random number generator
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  gaussian(): number {
    const u1 = this.next();
    const u2 = this.next();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}

export interface Point {
  x: number;
  y: number;
  label: number;
}

// Generate moon-shaped dataset
export function generateMoons(n: number, noise: number, rng: SeededRandom): Point[] {
  const points: Point[] = [];
  const halfN = Math.floor(n / 2);

  for (let i = 0; i < halfN; i++) {
    const angle = Math.PI * i / halfN;
    points.push({
      x: Math.cos(angle) + rng.gaussian() * noise,
      y: Math.sin(angle) + rng.gaussian() * noise,
      label: 0,
    });
  }

  for (let i = 0; i < n - halfN; i++) {
    const angle = Math.PI * i / (n - halfN);
    points.push({
      x: 1 - Math.cos(angle) + rng.gaussian() * noise,
      y: 0.5 - Math.sin(angle) + rng.gaussian() * noise,
      label: 1,
    });
  }

  return points;
}

// Generate concentric circles dataset
export function generateCircles(n: number, noise: number, rng: SeededRandom): Point[] {
  const points: Point[] = [];
  const halfN = Math.floor(n / 2);

  for (let i = 0; i < halfN; i++) {
    const angle = 2 * Math.PI * rng.next();
    const r = 0.4 + rng.gaussian() * noise;
    points.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
      label: 0,
    });
  }

  for (let i = 0; i < n - halfN; i++) {
    const angle = 2 * Math.PI * rng.next();
    const r = 1.0 + rng.gaussian() * noise;
    points.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
      label: 1,
    });
  }

  return points;
}

// Generate blob clusters dataset
export function generateBlobs(n: number, noise: number, rng: SeededRandom): Point[] {
  const points: Point[] = [];
  const centers = [
    { x: -0.5, y: -0.5 },
    { x: 0.5, y: 0.5 },
  ];

  const halfN = Math.floor(n / 2);

  for (let i = 0; i < halfN; i++) {
    points.push({
      x: centers[0].x + rng.gaussian() * (0.3 + noise),
      y: centers[0].y + rng.gaussian() * (0.3 + noise),
      label: 0,
    });
  }

  for (let i = 0; i < n - halfN; i++) {
    points.push({
      x: centers[1].x + rng.gaussian() * (0.3 + noise),
      y: centers[1].y + rng.gaussian() * (0.3 + noise),
      label: 1,
    });
  }

  return points;
}

// Minkowski distance
export function distance(p1: Point, p2: { x: number; y: number }, p: number): number {
  if (p === 1) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// KNN prediction
export function knnPredict(
  trainData: Point[],
  queryPoint: { x: number; y: number },
  k: number,
  weights: 'uniform' | 'distance',
  metricP: number
): { prediction: number; neighbors: { point: Point; dist: number }[] } {
  const distances = trainData.map((point) => ({
    point,
    dist: distance(point, queryPoint, metricP),
  }));

  distances.sort((a, b) => a.dist - b.dist);
  const neighbors = distances.slice(0, k);

  if (weights === 'uniform') {
    const votes: Record<number, number> = {};
    neighbors.forEach(({ point }) => {
      votes[point.label] = (votes[point.label] || 0) + 1;
    });

    let maxVotes = 0;
    let prediction = 0;
    Object.entries(votes).forEach(([label, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        prediction = parseInt(label);
      }
    });

    return { prediction, neighbors };
  } else {
    const weightMap: Record<number, number> = {};
    neighbors.forEach(({ point, dist }) => {
      const w = dist === 0 ? 1e10 : 1 / dist;
      weightMap[point.label] = (weightMap[point.label] || 0) + w;
    });

    let maxWeight = 0;
    let prediction = 0;
    Object.entries(weightMap).forEach(([label, weight]) => {
      if (weight > maxWeight) {
        maxWeight = weight;
        prediction = parseInt(label);
      }
    });

    return { prediction, neighbors };
  }
}

// Calculate accuracy and confusion matrix
export function calculateMetrics(
  trainData: Point[],
  k: number,
  weights: 'uniform' | 'distance',
  metricP: number
): { accuracy: number; tp: number; tn: number; fp: number; fn: number } {
  let tp = 0, tn = 0, fp = 0, fn = 0;

  trainData.forEach((point, i) => {
    // Leave-one-out cross validation
    const others = trainData.filter((_, j) => j !== i);
    const { prediction } = knnPredict(others, point, Math.min(k, others.length), weights, metricP);

    if (point.label === 1 && prediction === 1) tp++;
    else if (point.label === 0 && prediction === 0) tn++;
    else if (point.label === 0 && prediction === 1) fp++;
    else fn++;
  });

  const accuracy = (tp + tn) / trainData.length;
  return { accuracy, tp, tn, fp, fn };
}

// Normalize points to [0, 1] range with padding
export function normalizePoints(points: Point[], padding = 0.1): { points: Point[]; minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  points.forEach((p) => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  });

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  minX -= rangeX * padding;
  maxX += rangeX * padding;
  minY -= rangeY * padding;
  maxY += rangeY * padding;

  return { points, minX, maxX, minY, maxY };
}

// Types for Examples and Quiz
export interface ExampleSettings {
  k: number;
  weights: 'uniform' | 'distance';
  metricP: number;
  dataset: string;
  noise: number;
  sampleSize: number;
  seed: number;
}

export interface Example {
  id: number;
  title: string;
  goal: string;
  settings: ExampleSettings;
  observation: string;
}

export interface QuizOption {
  id: string;
  text: string;
  settings: ExampleSettings;
}

export interface QuizQuestion {
  id: number;
  stem: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}
