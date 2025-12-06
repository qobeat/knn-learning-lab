import { QuizQuestion } from '@/lib/knn';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    stem: "Which k value will produce the SMOOTHEST decision boundary?",
    options: [
      { id: "A", text: "k = 1", settings: { k: 1, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 100, seed: 42 } },
      { id: "B", text: "k = 5", settings: { k: 5, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 100, seed: 42 } },
      { id: "C", text: "k = 15", settings: { k: 15, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 100, seed: 42 } },
      { id: "D", text: "k = 25", settings: { k: 25, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 100, seed: 42 } }
    ],
    correctOptionId: "D",
    explanation: "Higher k values create smoother boundaries because predictions are based on more neighbors, averaging out individual point influences. k=25 produces the smoothest boundary among these options."
  },
  {
    id: 2,
    stem: "Which configuration is most likely to OVERFIT the training data?",
    options: [
      { id: "A", text: "k=1, high noise", settings: { k: 1, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.35, sampleSize: 80, seed: 12 } },
      { id: "B", text: "k=15, low noise", settings: { k: 15, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.1, sampleSize: 80, seed: 12 } },
      { id: "C", text: "k=10, medium noise", settings: { k: 10, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.2, sampleSize: 80, seed: 12 } },
      { id: "D", text: "k=20, high noise", settings: { k: 20, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.35, sampleSize: 80, seed: 12 } }
    ],
    correctOptionId: "A",
    explanation: "k=1 with high noise is the classic overfitting scenario. Every single point, including noisy outliers, creates its own classification region, memorizing the noise rather than learning the pattern."
  },
  {
    id: 3,
    stem: "For the CIRCLES dataset, which distance metric typically works better?",
    options: [
      { id: "A", text: "Euclidean (L2)", settings: { k: 5, weights: "uniform", metricP: 2, dataset: "circles", noise: 0.1, sampleSize: 100, seed: 33 } },
      { id: "B", text: "Manhattan (L1)", settings: { k: 5, weights: "uniform", metricP: 1, dataset: "circles", noise: 0.1, sampleSize: 100, seed: 33 } },
      { id: "C", text: "Both work equally", settings: { k: 5, weights: "uniform", metricP: 2, dataset: "circles", noise: 0.1, sampleSize: 100, seed: 33 } },
      { id: "D", text: "Neither works well", settings: { k: 5, weights: "uniform", metricP: 2, dataset: "circles", noise: 0.1, sampleSize: 100, seed: 33 } }
    ],
    correctOptionId: "A",
    explanation: "Euclidean distance creates circular neighborhoods, which naturally align with the concentric circles pattern. Manhattan distance creates diamond-shaped neighborhoods that don't match the circular structure as well."
  },
  {
    id: 4,
    stem: "When classes overlap significantly, which weight scheme helps more?",
    options: [
      { id: "A", text: "Uniform weights", settings: { k: 9, weights: "uniform", metricP: 2, dataset: "blobs", noise: 0.35, sampleSize: 100, seed: 88 } },
      { id: "B", text: "Distance weights", settings: { k: 9, weights: "distance", metricP: 2, dataset: "blobs", noise: 0.35, sampleSize: 100, seed: 88 } },
      { id: "C", text: "Neither helps", settings: { k: 9, weights: "uniform", metricP: 2, dataset: "blobs", noise: 0.35, sampleSize: 100, seed: 88 } },
      { id: "D", text: "Both work the same", settings: { k: 9, weights: "uniform", metricP: 2, dataset: "blobs", noise: 0.35, sampleSize: 100, seed: 88 } }
    ],
    correctOptionId: "B",
    explanation: "Distance weighting gives closer neighbors more influence. In overlapping regions, this helps because the closest points are more likely to share the same class as the query point."
  },
  {
    id: 5,
    stem: "What happens to accuracy as you INCREASE noise from 0.05 to 0.4?",
    options: [
      { id: "A", text: "Accuracy increases", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.4, sampleSize: 100, seed: 55 } },
      { id: "B", text: "Accuracy stays the same", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.2, sampleSize: 100, seed: 55 } },
      { id: "C", text: "Accuracy decreases", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.4, sampleSize: 100, seed: 55 } },
      { id: "D", text: "Accuracy fluctuates randomly", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.3, sampleSize: 100, seed: 55 } }
    ],
    correctOptionId: "C",
    explanation: "More noise means more overlap between classes and more outliers, making it harder for KNN to find the correct class boundaries. Accuracy consistently decreases as noise increases."
  },
  {
    id: 6,
    stem: "With only 30 samples, which k value is TOO HIGH and will underfit?",
    options: [
      { id: "A", text: "k = 3", settings: { k: 3, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 30, seed: 77 } },
      { id: "B", text: "k = 7", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 30, seed: 77 } },
      { id: "C", text: "k = 15", settings: { k: 15, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 30, seed: 77 } },
      { id: "D", text: "k = 25", settings: { k: 25, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.15, sampleSize: 30, seed: 77 } }
    ],
    correctOptionId: "D",
    explanation: "k=25 uses 25 out of 30 points for each prediction - almost the entire dataset! This makes the boundary nearly straight and misses the moon pattern entirely. A good rule: k should be much smaller than n."
  },
  {
    id: 7,
    stem: "Which configuration gives the HIGHEST accuracy on well-separated blobs?",
    options: [
      { id: "A", text: "k=1, uniform", settings: { k: 1, weights: "uniform", metricP: 2, dataset: "blobs", noise: 0.1, sampleSize: 100, seed: 42 } },
      { id: "B", text: "k=5, distance", settings: { k: 5, weights: "distance", metricP: 2, dataset: "blobs", noise: 0.1, sampleSize: 100, seed: 42 } },
      { id: "C", text: "k=30, uniform", settings: { k: 30, weights: "uniform", metricP: 2, dataset: "blobs", noise: 0.1, sampleSize: 100, seed: 42 } },
      { id: "D", text: "k=15, distance", settings: { k: 15, weights: "distance", metricP: 2, dataset: "blobs", noise: 0.1, sampleSize: 100, seed: 42 } }
    ],
    correctOptionId: "B",
    explanation: "With well-separated blobs and low noise, k=5 with distance weighting gives excellent accuracy. k=1 might be slightly sensitive to outliers, while k=30 is unnecessarily large for this simple pattern."
  },
  {
    id: 8,
    stem: "Looking at the confusion matrix, what does a high FP (False Positive) count indicate?",
    options: [
      { id: "A", text: "Model predicts Class B when it's actually Class A", settings: { k: 3, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.3, sampleSize: 80, seed: 99 } },
      { id: "B", text: "Model predicts Class A when it's actually Class B", settings: { k: 3, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.3, sampleSize: 80, seed: 99 } },
      { id: "C", text: "Model correctly classifies Class A", settings: { k: 3, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.3, sampleSize: 80, seed: 99 } },
      { id: "D", text: "Model correctly classifies Class B", settings: { k: 3, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.3, sampleSize: 80, seed: 99 } }
    ],
    correctOptionId: "A",
    explanation: "False Positive means predicting positive (Class B/magenta) when the true label is negative (Class A/cyan). The model is incorrectly assigning Class A points to Class B."
  },
  {
    id: 9,
    stem: "When you click on a point and see neighbor lines, what do longer lines indicate?",
    options: [
      { id: "A", text: "Stronger influence on prediction", settings: { k: 5, weights: "distance", metricP: 2, dataset: "circles", noise: 0.15, sampleSize: 80, seed: 66 } },
      { id: "B", text: "Weaker influence on prediction (with distance weights)", settings: { k: 5, weights: "distance", metricP: 2, dataset: "circles", noise: 0.15, sampleSize: 80, seed: 66 } },
      { id: "C", text: "Points of the same class", settings: { k: 5, weights: "distance", metricP: 2, dataset: "circles", noise: 0.15, sampleSize: 80, seed: 66 } },
      { id: "D", text: "Points of opposite class", settings: { k: 5, weights: "distance", metricP: 2, dataset: "circles", noise: 0.15, sampleSize: 80, seed: 66 } }
    ],
    correctOptionId: "B",
    explanation: "Longer lines mean greater distance. With distance weighting, farther neighbors have less influence (weight = 1/distance). With uniform weights, all k neighbors have equal influence regardless of distance."
  },
  {
    id: 10,
    stem: "To achieve ~90% accuracy on noisy moons (noise=0.25), what's the best k range?",
    options: [
      { id: "A", text: "k = 1-3 (very low)", settings: { k: 2, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.25, sampleSize: 100, seed: 42 } },
      { id: "B", text: "k = 5-10 (moderate)", settings: { k: 7, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.25, sampleSize: 100, seed: 42 } },
      { id: "C", text: "k = 20-30 (high)", settings: { k: 25, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.25, sampleSize: 100, seed: 42 } },
      { id: "D", text: "k = 40+ (very high)", settings: { k: 40, weights: "uniform", metricP: 2, dataset: "moons", noise: 0.25, sampleSize: 100, seed: 42 } }
    ],
    correctOptionId: "B",
    explanation: "k=5-10 balances flexibility and generalization. Too low (1-3) overfits to noise; too high (20+) oversimplifies and misses the moon shape. The 'sweet spot' depends on dataset complexity and noise level."
  }
];
