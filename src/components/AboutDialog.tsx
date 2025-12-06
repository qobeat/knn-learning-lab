import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">About Explainable KNN</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-foreground">
          <p className="text-muted-foreground">
            An interactive educational tool for understanding K-Nearest Neighbors classification algorithm.
          </p>

          <section>
            <h3 className="font-semibold text-primary mb-1">Project</h3>
            <p className="text-muted-foreground">Explainable KNN Playground v2</p>
          </section>

          <section>
            <h3 className="font-semibold text-primary mb-1">Author</h3>
            <p className="text-muted-foreground">Yana Evteeva</p>
          </section>

          <section>
            <h3 className="font-semibold text-primary mb-1">Program</h3>
            <p className="text-muted-foreground">
              MIT Beaver Works Summer Institute (BWSI) 2025
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-primary mb-1">Description</h3>
            <p className="text-muted-foreground">
              This playground allows you to explore how the KNN algorithm works through interactive visualization. 
              Adjust parameters like k, distance metrics, and weighting schemes to see how they affect 
              classification decisions. Use the Examples mode for guided learning and Quiz mode to test your understanding.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-primary mb-1">Features</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Real-time decision boundary visualization</li>
              <li>Multiple datasets (Moons, Circles, Blobs)</li>
              <li>Point inspection with neighbor highlighting</li>
              <li>Confusion matrix and accuracy metrics</li>
              <li>6 guided examples with observations</li>
              <li>10-question quiz with explanations</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
