
import jismoniy from "@/data/quiz-jismoniy-tarbiya.json";
import pedagogika from "@/data/quiz-pedagogika.json";
import togarak from "@/data/quiz-togarak.json";
import { QuizData } from "@/types/quiz";

export const quizzes: Record<string, QuizData> = {
  "pedagogika": pedagogika as QuizData,
  "togarak": togarak as QuizData,
  "jismoniy-tarbiya": jismoniy as QuizData,
};

export const getQuiz = (id: string): QuizData | undefined => {
  return quizzes[id];
};
