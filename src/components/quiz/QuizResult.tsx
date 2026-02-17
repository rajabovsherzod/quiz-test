"use client";

import { motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import Link from "next/link";
import { cx } from "@/utils/cx";
import { RefreshCw, Home, CheckCircle2, XCircle, Award } from "lucide-react";

interface QuizResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export const QuizResult = ({ score, total, onRestart }: QuizResultProps) => {
  const percentage = Math.round((score / total) * 100);
  const incorrect = total - score;

  // Determine color and message based on score
  let colorClass = "text-brand-500";
  let message = "Yaxshi natija!";
  let subMessage = "Bilimingizni mustahkamlashda davom eting.";

  if (percentage >= 80) {
    colorClass = "text-success-600 dark:text-success-400";
    message = "Ajoyib natija!";
    subMessage = "Siz bu mavzuni hammadan yaxshi bilasiz!";
  } else if (percentage < 50) {
    colorClass = "text-error-600 dark:text-error-400";
    message = "Ko'proq mashq qiling!";
    subMessage = "Xatolaringiz ustida ishlab, qayta urinib ko'ring.";
  }

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-lg mx-auto p-6 md:p-8 flex flex-col items-center justify-center text-center bg-bg-primary dark:bg-gray-800 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-black/50 border border-border-secondary relative overflow-hidden">

      {/* Decorative background blur */}
      <div className={cx("absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-current to-transparent opacity-10 pointer-events-none", colorClass)} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative mb-8 mt-4"
      >
        {/* Progress Circle */}
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              className="text-gray-100 dark:text-gray-700"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="96"
              cy="96"
            />
            <circle
              className={colorClass + " drop-shadow-md"}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="96"
              cy="96"
              style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cx("text-5xl font-bold tracking-tight", colorClass)}>{percentage}%</span>
          </div>

          {/* Badge Icon if score is high */}
          {percentage >= 80 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg border-4 border-white dark:border-gray-800"
            >
              <Award className="w-6 h-6" />
            </motion.div>
          )}
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold text-primary mb-2 tracking-tight">{message}</h2>
      <p className="text-tertiary mb-8 text-base leading-relaxed max-w-xs mx-auto">
        {subMessage}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-2xl border border-success-100 dark:border-success-800/30 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 text-success-700 dark:text-success-400 font-semibold text-sm uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4" />
            <span>To'g'ri</span>
          </div>
          <span className="text-2xl font-bold text-success-600 dark:text-success-400">{score}</span>
        </div>
        <div className="bg-error-50 dark:bg-error-900/20 p-4 rounded-2xl border border-error-100 dark:border-error-800/30 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1 text-error-700 dark:text-error-400 font-semibold text-sm uppercase tracking-wide">
            <XCircle className="w-4 h-4" />
            <span>Noto'g'ri</span>
          </div>
          <span className="text-2xl font-bold text-error-600 dark:text-error-400">{incorrect}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={onRestart}
          size="xl"
          className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white border-transparent shadow-lg shadow-brand-500/30 font-semibold h-14"
          iconLeading={<RefreshCw className="w-5 h-5" />}
        >
          Qayta Boshlash
        </Button>
        <Link href="/" className="w-full">
          <Button
            size="lg"
            color="secondary"
            className="w-full bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 border border-border-secondary text-primary font-medium h-12"
            iconLeading={<Home className="w-4 h-4" />}
          >
            Bosh Sahifa
          </Button>
        </Link>
      </div>
    </div>
  );
};
