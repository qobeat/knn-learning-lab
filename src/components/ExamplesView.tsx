import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KNNCanvas } from './KNNCanvas';
import { ControlPanel } from './ControlPanel';
import { useKNNPlayground } from '@/hooks/useKNNPlayground';
import { examples } from '@/data/examples';
import { ChevronLeft, ChevronRight, RotateCcw, Eye } from 'lucide-react';

export function ExamplesView() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const currentExample = examples[currentExampleIndex];
  const playground = useKNNPlayground(currentExample.settings);

  const handleLoadExample = () => {
    playground.applySettings(currentExample.settings);
  };

  const handleNext = () => {
    const nextIndex = (currentExampleIndex + 1) % examples.length;
    setCurrentExampleIndex(nextIndex);
    playground.applySettings(examples[nextIndex].settings);
  };

  const handlePrevious = () => {
    const prevIndex = (currentExampleIndex - 1 + examples.length) % examples.length;
    setCurrentExampleIndex(prevIndex);
    playground.applySettings(examples[prevIndex].settings);
  };

  const handleSelectExample = (index: number) => {
    setCurrentExampleIndex(index);
    playground.applySettings(examples[index].settings);
  };

  return (
    <div className="space-y-6">
      {/* Example Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {examples.map((example, index) => (
          <Card
            key={example.id}
            className={`p-3 cursor-pointer transition-all hover:glow-cyan ${
              index === currentExampleIndex
                ? 'border-primary glow-cyan'
                : 'border-border gradient-card'
            }`}
            onClick={() => handleSelectExample(index)}
          >
            <div className="text-xs font-medium text-muted-foreground mb-1">
              Example {example.id}
            </div>
            <div className="text-sm font-semibold text-foreground line-clamp-2">
              {example.title}
            </div>
          </Card>
        ))}
      </div>

      {/* Current Example Header */}
      <Card className="gradient-card border-border p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {currentExample.title}
            </h2>
            <p className="text-muted-foreground mb-3">{currentExample.goal}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadExample}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Loaded
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Observation Panel */}
      <Card className="border-primary/50 bg-primary/5 p-4">
        <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
          What to Observe
        </h3>
        <p className="text-foreground">{currentExample.observation}</p>
      </Card>

      {/* Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
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

        <Card className="gradient-card border-border shadow-card p-6 overflow-y-auto max-h-[calc(100vh-400px)]">
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
    </div>
  );
}
