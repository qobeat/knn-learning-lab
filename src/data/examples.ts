import { Example } from '@/lib/knn';

export const examples: Example[] = [
  {
    id: 1,
    title: "Effect of k on Decision Boundary",
    goal: "Observe how increasing k smooths the decision boundary",
    settings: {
      k: 3,
      weights: "uniform",
      metricP: 2,
      dataset: "moons",
      noise: 0.15,
      sampleSize: 100,
      seed: 42
    },
    observation: "With k=3, the boundary is jagged and follows individual points. Try increasing k to 15 or 25 to see how the boundary becomes smoother and more generalized."
  },
  {
    id: 2,
    title: "Uniform vs Distance Weights",
    goal: "Compare how weighting schemes affect predictions near class boundaries",
    settings: {
      k: 7,
      weights: "uniform",
      metricP: 2,
      dataset: "blobs",
      noise: 0.25,
      sampleSize: 80,
      seed: 17
    },
    observation: "Start with uniform weights - all 7 neighbors vote equally. Switch to distance weighting to see how closer neighbors have more influence, especially useful when classes overlap."
  },
  {
    id: 3,
    title: "Manhattan vs Euclidean Distance",
    goal: "See how different distance metrics change the decision boundary shape",
    settings: {
      k: 5,
      weights: "uniform",
      metricP: 2,
      dataset: "circles",
      noise: 0.1,
      sampleSize: 100,
      seed: 33
    },
    observation: "Euclidean (L2) creates circular neighborhoods. Switch to Manhattan (L1) to see diamond-shaped neighborhoods, which can better separate the concentric circles pattern."
  },
  {
    id: 4,
    title: "Overfitting with Small k",
    goal: "Understand why k=1 leads to overfitting",
    settings: {
      k: 1,
      weights: "uniform",
      metricP: 2,
      dataset: "moons",
      noise: 0.3,
      sampleSize: 60,
      seed: 7
    },
    observation: "With k=1 and high noise, every point creates its own classification region, including noisy outliers. This is overfitting - the model memorizes noise rather than learning the true pattern."
  },
  {
    id: 5,
    title: "Underfitting with Large k",
    goal: "See how too large k leads to underfitting",
    settings: {
      k: 35,
      weights: "uniform",
      metricP: 2,
      dataset: "moons",
      noise: 0.1,
      sampleSize: 80,
      seed: 22
    },
    observation: "With k=35 (nearly half the dataset), the boundary becomes too simple and misses the moon pattern. This is underfitting - the model is too simple to capture the true structure."
  },
  {
    id: 6,
    title: "Noise Sensitivity",
    goal: "Explore how noise affects classification accuracy",
    settings: {
      k: 5,
      weights: "distance",
      metricP: 2,
      dataset: "circles",
      noise: 0.05,
      sampleSize: 100,
      seed: 55
    },
    observation: "At low noise, classes are well-separated and accuracy is high. Gradually increase noise to 0.3+ and watch how the decision boundary becomes uncertain and accuracy drops."
  }
];
