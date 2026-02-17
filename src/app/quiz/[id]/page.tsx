
"use client";

import { use, useState } from "react";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizResult } from "@/components/quiz/QuizResult";
import { getQuiz } from "@/utils/quiz-data";
import { Button } from "@/components/base/buttons/button";
import Link from "next/link";

interface QuizPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = use(params);
  const quizData = getQuiz(id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!quizData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-secondary">
        <h1 className="text-2xl font-bold mb-4 text-primary">Quiz Topilmadi</h1>
        <Link href="/">
          <Button>Bosh Sahifaga qaytish</Button>
        </Link>
      </div>
    );
  }

  const { title, questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsFinished(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const score = Object.keys(answers).reduce((acc, index) => {
    const qIndex = parseInt(index);
    const userAnswer = answers[qIndex];
    if (userAnswer === questions[qIndex].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-bg-secondary dark:bg-gray-900 py-12 px-4 flex items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none blur-3xl" />

        <QuizResult
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-secondary dark:bg-gray-900 flex flex-col relative">
      {/* Background Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pointer-events-none" />

      {/* Header */}
      <header className="bg-bg-primary/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-border-secondary px-4 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-sm md:text-base font-semibold text-primary truncate max-w-[200px] md:max-w-none opacity-90">
            {title}
          </h1>
          <Link href="/" className="text-xs md:text-sm font-medium text-tertiary hover:text-brand-600 dark:hover:text-brand-400 transition-colors uppercase tracking-wide">
            Chiqish
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 z-10 w-full">
        <QuizCard
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLastQuestion={isLastQuestion}
        />
      </main>
    </div>
  );
}
