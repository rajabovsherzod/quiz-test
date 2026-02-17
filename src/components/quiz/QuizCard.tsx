"use client";

import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { QuizQuestion } from "@/types/quiz";
import { cx } from "@/utils/cx";
import { ChevronLeft, ChevronRight } from "@untitledui/icons";

interface QuizCardProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastQuestion: boolean;
}

export const QuizCard = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isLastQuestion,
}: QuizCardProps) => {
  const isAnswered = selectedAnswer !== null;

  // Circular Progress Calculation
  const percentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);
  const radius = 24; // Increased radius
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;


  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 md:gap-5"> {/* Reduced gap from gap-6/8 */}
      {/* Header / Progress */}
      <div className="flex justify-between items-center bg-bg-primary dark:bg-gray-800/50 p-4 rounded-xl border border-border-secondary shadow-sm backdrop-blur-sm h-20"> {/* Fixed height for consistency */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] md:text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-0.5">SAVOL</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-bold text-primary leading-none">
              {questionIndex + 1}
            </span>
            <span className="text-tertiary text-lg font-medium">/ {totalQuestions}</span>
          </div>
        </div>

        {/* Mini Circular Progress */}
        <div className="relative w-16 h-16 flex items-center justify-center"> {/* Increased container size */}
          <svg className="w-full h-full transform -rotate-90 text-gray-100 dark:text-gray-700">
            <circle
              className="currentColor"
              strokeWidth="5" /* Thicker stroke */
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
            <circle
              className="text-brand-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
              strokeWidth="5" /* Thicker stroke */
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
              style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
            />
          </svg>
          <span className="absolute text-xs font-bold text-primary">{percentage}%</span>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={question.question}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-bg-primary dark:bg-gray-800 rounded-2xl p-5 md:p-8 shadow-lg shadow-gray-100/50 dark:shadow-black/20 border border-border-secondary flex-1"
      >
        <h2 className="text-lg md:text-2xl font-semibold text-primary mb-6 md:mb-8 leading-relaxed">
          {question.question}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;

            // Determine styles based on state
            let buttonClass = "justify-start text-left h-auto py-3.5 px-6 text-base font-normal transition-all duration-200 border-2";

            if (isAnswered) {
              if (isCorrect) {
                // Solid Green for Correct Answer
                buttonClass += " bg-success-solid border-success-600 !text-white shadow-md scale-[1.01]";
              } else if (isSelected) {
                // Solid Red for Incorrect Selection
                buttonClass += " bg-error-solid border-error-600 !text-white shadow-md scale-[1.01]";
              } else {
                // Fade out other options
                buttonClass += " opacity-40 bg-bg-primary text-primary border-transparent grayscale";
              }
            } else {
              // Default state
              buttonClass += " bg-bg-primary border-border-secondary hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 text-primary hover:shadow-sm";
            }

            return (
              <Button
                key={idx}
                className={cx("w-full whitespace-normal relative group", buttonClass)}
                onClick={() => !isAnswered && onAnswer(option)}
                isDisabled={isAnswered}
                color="secondary"
              >
                <div className="flex items-start w-full">
                  <span className={cx(
                    "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border mr-4 text-sm font-bold transition-all duration-200",
                    isAnswered && (isCorrect || isSelected)
                      ? "border-white/40 bg-white/20 text-white"
                      : "border-border-secondary bg-bg-secondary text-brand-600 dark:text-brand-400 group-hover:border-brand-300 dark:group-hover:border-brand-700"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="mt-1 flex-1">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-2">
        <Button
          onClick={onPrevious}
          isDisabled={questionIndex === 0}
          color="secondary"
          className={cx(
            "px-5 h-10 border-border-secondary text-tertiary hover:text-primary transition-all",
            questionIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          iconLeading={<ChevronLeft className="w-4 h-4" />}
        >
          OLDINGI
        </Button>

        {isAnswered ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={onNext}
              color="primary"
              className="px-6 h-10 bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20 border-transparent min-w-[140px]"
              iconTrailing={!isLastQuestion ? <ChevronRight className="w-4 h-4" /> : undefined}
            >
              {isLastQuestion ? "YAKUNLASH" : "KEYINGI"}
            </Button>
          </motion.div>
        ) : (
          <div className="h-10" /> /* Spacer to keep layout stable */
        )}
      </div>
    </div>
  );
};
