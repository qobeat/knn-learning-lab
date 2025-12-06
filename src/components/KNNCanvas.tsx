import { useEffect, useRef, useMemo } from 'react';
import { Point, knnPredict, normalizePoints } from '@/lib/knn';

interface KNNCanvasProps {
  data: Point[];
  k: number;
  weights: 'uniform' | 'distance';
  metricP: number;
  inspectIndex: number | null;
  onPointClick?: (index: number) => void;
}

const CLASS_A_COLOR = '#00D9FF';
const CLASS_B_COLOR = '#FF00D9';
const CLASS_A_SOFT = 'rgba(0, 217, 255, 0.4)';
const CLASS_B_SOFT = 'rgba(255, 0, 217, 0.4)';

export function KNNCanvas({ data, k, weights, metricP, inspectIndex, onPointClick }: KNNCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { minX, maxX, minY, maxY } = useMemo(() => normalizePoints(data), [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Transform functions
    const toCanvasX = (x: number) => ((x - minX) / (maxX - minX)) * width;
    const toCanvasY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    // Draw decision boundary heatmap
    const resolution = 60;
    const cellW = width / resolution;
    const cellH = height / resolution;

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i + 0.5) * cellW / width * (maxX - minX) + minX;
        const y = (1 - (j + 0.5) * cellH / height) * (maxY - minY) + minY;

        const { prediction } = knnPredict(data, { x, y }, k, weights, metricP);

        ctx.fillStyle = prediction === 0 ? CLASS_A_SOFT : CLASS_B_SOFT;
        ctx.fillRect(i * cellW, j * cellH, cellW + 1, cellH + 1);
      }
    }

    // Draw neighbor lines if inspecting
    if (inspectIndex !== null && inspectIndex >= 0 && inspectIndex < data.length) {
      const inspectedPoint = data[inspectIndex];
      const { neighbors } = knnPredict(
        data.filter((_, i) => i !== inspectIndex),
        inspectedPoint,
        k,
        weights,
        metricP
      );

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      neighbors.forEach(({ point }) => {
        ctx.beginPath();
        ctx.moveTo(toCanvasX(inspectedPoint.x), toCanvasY(inspectedPoint.y));
        ctx.lineTo(toCanvasX(point.x), toCanvasY(point.y));
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Highlight neighbor points
      neighbors.forEach(({ point }) => {
        ctx.beginPath();
        ctx.arc(toCanvasX(point.x), toCanvasY(point.y), 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Draw training points
    data.forEach((point, index) => {
      const cx = toCanvasX(point.x);
      const cy = toCanvasY(point.y);
      const isInspected = index === inspectIndex;
      const radius = isInspected ? 10 : 6;

      // Outer glow for inspected point
      if (isInspected) {
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      }

      // Point fill
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = point.label === 0 ? CLASS_A_COLOR : CLASS_B_COLOR;
      ctx.fill();

      // Point border
      ctx.strokeStyle = isInspected ? '#ffffff' : 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = isInspected ? 3 : 1.5;
      ctx.stroke();
    });

  }, [data, k, weights, metricP, inspectIndex, minX, maxX, minY, maxY]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onPointClick || data.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const dataX = (x / width) * (maxX - minX) + minX;
    const dataY = (1 - y / height) * (maxY - minY) + minY;

    // Find closest point
    let minDist = Infinity;
    let closestIndex = -1;

    data.forEach((point, index) => {
      const dist = Math.sqrt(Math.pow(point.x - dataX, 2) + Math.pow(point.y - dataY, 2));
      if (dist < minDist) {
        minDist = dist;
        closestIndex = index;
      }
    });

    const threshold = (maxX - minX) * 0.05;
    if (minDist < threshold && closestIndex >= 0) {
      onPointClick(closestIndex);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full h-full cursor-crosshair rounded-lg"
      />
    </div>
  );
}
