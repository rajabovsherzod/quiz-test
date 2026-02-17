
export interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: { [questionIndex: number]: string }; // Map question index to selected answer
  isFinished: boolean;
}
