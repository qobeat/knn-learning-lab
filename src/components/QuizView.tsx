import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KNNCanvas } from './KNNCanvas';
import { useKNNPlayground } from '@/hooks/useKNNPlayground';
import { quizQuestions } from '@/data/quiz';
import { Check, X, Eye, ChevronRight, RotateCcw, Trophy } from 'lucide-react';

export function QuizView() {
  const [questionOrder, setQuestionOrder] = useState<number[]>(() =>
    [...Array(quizQuestions.length).keys()].sort(() => Math.random() - 0.5)
  );
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [previewOption, setPreviewOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quizQuestions[questionOrder[currentQuestionIdx]];
  const playground = useKNNPlayground(currentQuestion.options[0].settings);

  const isCorrect = selectedAnswer === currentQuestion.correctOptionId;

  const handlePreview = (optionId: string) => {
    const option = currentQuestion.options.find((o) => o.id === optionId);
    if (option) {
      playground.applySettings(option.settings);
      setPreviewOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.correctOptionId) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setPreviewOption(null);
      playground.applySettings(quizQuestions[questionOrder[nextIdx]].options[0].settings);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    setQuestionOrder([...Array(quizQuestions.length).keys()].sort(() => Math.random() - 0.5));
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setPreviewOption(null);
    setScore(0);
    setIsComplete(false);
    playground.applySettings(quizQuestions[questionOrder[0]].options[0].settings);
  };

  if (isComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="gradient-card border-border p-8 text-center max-w-md">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
          <p className="text-5xl font-mono font-bold text-primary mb-2">
            {score}/{quizQuestions.length}
          </p>
          <p className="text-muted-foreground mb-6">{percentage}% correct</p>
          <Button onClick={handleRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Retry Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIdx + 1} of {quizQuestions.length}
        </div>
        <div className="text-sm font-mono text-primary">
          Score: {score}/{currentQuestionIdx + (isSubmitted ? 1 : 0)}
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((currentQuestionIdx + (isSubmitted ? 1 : 0)) / quizQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card className="gradient-card border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {currentQuestion.stem}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isPreviewing = previewOption === option.id;
            const showCorrect = isSubmitted && option.id === currentQuestion.correctOptionId;
            const showIncorrect = isSubmitted && isSelected && !isCorrect;

            return (
              <div
                key={option.id}
                className={`relative rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/10'
                    : showIncorrect
                    ? 'border-destructive bg-destructive/10'
                    : isSelected
                    ? 'border-primary bg-primary/10'
                    : isPreviewing
                    ? 'border-secondary bg-secondary/10'
                    : 'border-border bg-muted/30 hover:border-muted-foreground'
                }`}
              >
                <button
                  className="w-full p-4 text-left disabled:cursor-not-allowed"
                  onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
                  disabled={isSubmitted}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-lg text-muted-foreground">
                      {option.id}
                    </span>
                    <span className="text-foreground">{option.text}</span>
                    {showCorrect && <Check className="h-5 w-5 text-green-500 ml-auto" />}
                    {showIncorrect && <X className="h-5 w-5 text-destructive ml-auto" />}
                  </div>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 bottom-2 gap-1 text-xs"
                  onClick={() => handlePreview(option.id)}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Explanation (shown after submit) */}
      {isSubmitted && (
        <Card className={`p-4 ${isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <X className="h-5 w-5 text-destructive" />
            )}
            <span className="font-semibold text-foreground">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className="text-muted-foreground">{currentQuestion.explanation}</p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="gap-2"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            {currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Canvas Preview */}
      <Card className="gradient-card border-border shadow-card p-4 h-[400px]">
        <KNNCanvas
          data={playground.data}
          k={playground.k}
          weights={playground.weights}
          metricP={playground.metricP}
          inspectIndex={playground.inspectIndex}
          onPointClick={playground.setInspectIndex}
        />
      </Card>
    </div>
  );
}
