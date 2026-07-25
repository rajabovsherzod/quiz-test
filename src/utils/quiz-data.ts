
import jismoniy from "@/data/quiz-jismoniy-tarbiya.json";
import metodologiya from "@/data/quiz-metodologiya.json";
import pedagogika from "@/data/quiz-pedagogika.json";
import togarak from "@/data/quiz-togarak.json";
import sportBayramlari from "@/data/quiz-sport-bayramlari.json";
import tanlanganSport from "@/data/quiz-tanlangan-sport.json";
import taraqqiyotStrategiyasi from "@/data/quiz-taraqqiyot-strategiyasi.json";
import { QuizData } from "@/types/quiz";

export const quizzes: Record<string, QuizData> = {
  "pedagogika": pedagogika as QuizData,
  "togarak": togarak as QuizData,
  "jismoniy-tarbiya": jismoniy as QuizData,
  "metodologiya": metodologiya as QuizData,
  "sport-bayramlari": sportBayramlari as QuizData,
  "tanlangan-sport": tanlanganSport as QuizData,
  "taraqqiyot-strategiyasi": taraqqiyotStrategiyasi as QuizData,
};

export const getQuiz = (id: string): QuizData | undefined => {
  return quizzes[id];
};
