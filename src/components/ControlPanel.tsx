import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ControlPanelProps {
  k: number;
  setK: (k: number) => void;
  weights: 'uniform' | 'distance';
  setWeights: (w: 'uniform' | 'distance') => void;
  metricP: number;
  setMetricP: (p: number) => void;
  dataset: string;
  setDataset: (d: string) => void;
  noise: number;
  setNoise: (n: number) => void;
  sampleSize: number;
  setSampleSize: (s: number) => void;
  seed: number;
  setSeed: (s: number) => void;
  inspectIndex: number | null;
  setInspectIndex: (i: number | null) => void;
  maxIndex: number;
  metrics: { accuracy: number; tp: number; tn: number; fp: number; fn: number };
}

export function ControlPanel({
  k, setK,
  weights, setWeights,
  metricP, setMetricP,
  dataset, setDataset,
  noise, setNoise,
  sampleSize, setSampleSize,
  seed, setSeed,
  inspectIndex, setInspectIndex,
  maxIndex,
  metrics,
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* K Neighbors */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-foreground">k (Neighbors)</Label>
          <span className="text-sm font-mono text-primary">{k}</span>
        </div>
        <Slider
          value={[k]}
          onValueChange={([v]) => setK(v)}
          min={1}
          max={40}
          step={1}
          className="w-full"
        />
      </div>

      {/* Weights */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Weights</Label>
        <Select value={weights} onValueChange={(v) => setWeights(v as 'uniform' | 'distance')}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uniform">Uniform</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metric */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Distance Metric</Label>
        <Select value={String(metricP)} onValueChange={(v) => setMetricP(Number(v))}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Euclidean (L2)</SelectItem>
            <SelectItem value="1">Manhattan (L1)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dataset */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Dataset</Label>
        <Select value={dataset} onValueChange={setDataset}>
          <SelectTrigger className="w-full bg-muted border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="moons">Moons</SelectItem>
            <SelectItem value="circles">Circles</SelectItem>
            <SelectItem value="blobs">Blobs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Noise */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-foreground">Noise</Label>
          <span className="text-sm font-mono text-muted-foreground">{noise.toFixed(2)}</span>
        </div>
        <Slider
          value={[noise]}
          onValueChange={([v]) => setNoise(v)}
          min={0}
          max={0.5}
          step={0.01}
          className="w-full"
        />
      </div>

      {/* Sample Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-foreground">Sample Size</Label>
          <span className="text-sm font-mono text-muted-foreground">{sampleSize}</span>
        </div>
        <Slider
          value={[sampleSize]}
          onValueChange={([v]) => setSampleSize(v)}
          min={20}
          max={200}
          step={10}
          className="w-full"
        />
      </div>

      {/* Seed */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-foreground">Random Seed</Label>
          <span className="text-sm font-mono text-muted-foreground">{seed}</span>
        </div>
        <Slider
          value={[seed]}
          onValueChange={([v]) => setSeed(v)}
          min={1}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Inspect Point */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-foreground">Inspect Point</Label>
          <span className="text-sm font-mono text-muted-foreground">
            {inspectIndex !== null ? `#${inspectIndex}` : 'None'}
          </span>
        </div>
        <Slider
          value={[inspectIndex ?? -1]}
          onValueChange={([v]) => setInspectIndex(v < 0 ? null : v)}
          min={-1}
          max={maxIndex - 1}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">-1 = none, or click a point</p>
      </div>

      {/* Metrics */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">Metrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="text-sm font-mono font-semibold text-primary">
              {(metrics.accuracy * 100).toFixed(1)}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-muted/50 rounded p-2">
              <span className="text-muted-foreground">TP:</span>{' '}
              <span className="text-class-a">{metrics.tp}</span>
            </div>
            <div className="bg-muted/50 rounded p-2">
              <span className="text-muted-foreground">TN:</span>{' '}
              <span className="text-class-b">{metrics.tn}</span>
            </div>
            <div className="bg-muted/50 rounded p-2">
              <span className="text-muted-foreground">FP:</span>{' '}
              <span className="text-foreground">{metrics.fp}</span>
            </div>
            <div className="bg-muted/50 rounded p-2">
              <span className="text-muted-foreground">FN:</span>{' '}
              <span className="text-foreground">{metrics.fn}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
