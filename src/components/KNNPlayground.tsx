import { KNNCanvas } from './KNNCanvas';
import { ControlPanel } from './ControlPanel';
import { Card } from '@/components/ui/card';
import { useKNNPlayground } from '@/hooks/useKNNPlayground';
import { ExampleSettings } from '@/lib/knn';

interface KNNPlaygroundProps {
  initialSettings?: Partial<ExampleSettings>;
  onSettingsChange?: (settings: ExampleSettings) => void;
  externalSettings?: ExampleSettings | null;
}

export function KNNPlayground({ initialSettings, externalSettings }: KNNPlaygroundProps) {
  const playground = useKNNPlayground(initialSettings);

  // Apply external settings when they change
  if (externalSettings) {
    playground.applySettings(externalSettings);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 h-full">
      {/* Canvas */}
      <Card className="gradient-card border-border shadow-card p-4 min-h-[400px] lg:min-h-[500px]">
        <KNNCanvas
          data={playground.data}
          k={playground.k}
          weights={playground.weights}
          metricP={playground.metricP}
          inspectIndex={playground.inspectIndex}
          onPointClick={playground.setInspectIndex}
        />
      </Card>

      {/* Controls */}
      <Card className="gradient-card border-border shadow-card p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <ControlPanel
          k={playground.k}
          setK={playground.setK}
          weights={playground.weights}
          setWeights={playground.setWeights}
          metricP={playground.metricP}
          setMetricP={playground.setMetricP}
          dataset={playground.dataset}
          setDataset={playground.setDataset}
          noise={playground.noise}
          setNoise={playground.setNoise}
          sampleSize={playground.sampleSize}
          setSampleSize={playground.setSampleSize}
          seed={playground.seed}
          setSeed={playground.setSeed}
          inspectIndex={playground.inspectIndex}
          setInspectIndex={playground.setInspectIndex}
          maxIndex={playground.data.length}
          metrics={playground.metrics}
        />
      </Card>
    </div>
  );
}
