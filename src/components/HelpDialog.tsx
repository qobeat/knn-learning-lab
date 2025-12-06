import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Use the KNN Playground</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-foreground">
          <section>
            <h3 className="text-lg font-semibold text-primary mb-2">Playground Mode</h3>
            <p className="text-muted-foreground mb-2">
              The main interactive visualization where you can experiment with KNN parameters:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>k (Neighbors)</strong> - Number of nearest neighbors to consider</li>
              <li><strong>Weights</strong> - Uniform (all votes equal) or Distance (closer = more weight)</li>
              <li><strong>Distance Metric</strong> - Euclidean (L2) for circular, Manhattan (L1) for diamond neighborhoods</li>
              <li><strong>Dataset</strong> - Choose Moons, Circles, or Blobs patterns</li>
              <li><strong>Noise</strong> - Add randomness to make classification harder</li>
              <li><strong>Sample Size</strong> - Number of training points</li>
              <li><strong>Seed</strong> - Reproducible random generation</li>
              <li><strong>Inspect Point</strong> - Click points or use slider to see neighbors</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary mb-2">Examples Mode</h3>
            <p className="text-muted-foreground mb-2">
              Guided learning scenarios with pre-configured settings:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Load</strong> - Apply the example's settings to the playground</li>
              <li><strong>Reset</strong> - Return to the example's original settings</li>
              <li>Read the "What to Observe" panel for insights</li>
              <li>Modify settings to explore variations</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary mb-2">Quiz Mode</h3>
            <p className="text-muted-foreground mb-2">
              Test your understanding with 10 questions:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Preview</strong> - See what each option looks like before answering</li>
              <li><strong>Submit</strong> - Lock in your answer and see if you're correct</li>
              <li>Read the explanation to understand why</li>
              <li>Questions are shuffled each attempt</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary mb-2">Visualization Guide</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><span className="text-class-a">Cyan points</span> = Class A (label 0)</li>
              <li><span className="text-class-b">Magenta points</span> = Class B (label 1)</li>
              <li>Background colors show predicted regions</li>
              <li>Dashed lines show connections to k nearest neighbors</li>
              <li>Highlighted points are being inspected</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-primary mb-2">Metrics</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Accuracy</strong> - Percentage of correct predictions (leave-one-out)</li>
              <li><strong>TP</strong> - True Positives (correctly predicted Class B)</li>
              <li><strong>TN</strong> - True Negatives (correctly predicted Class A)</li>
              <li><strong>FP</strong> - False Positives (wrongly predicted Class B)</li>
              <li><strong>FN</strong> - False Negatives (wrongly predicted Class A)</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
