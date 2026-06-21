export type VocabularyItem = {
  id: string;
  english: string;
  chinese: string;
  phonetic: string;
  example: string;
};

export type DragQuestion = {
  id: string;
  english: string;
  chinese: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type LearningUnit = {
  unit: string;
  title: string;
  grade: string;
  vocabulary: VocabularyItem[];
  dragQuestions: DragQuestion[];
  quizQuestions: QuizQuestion[];
};

export type ErrorItem = {
  id: string;
  type: "drag" | "quiz";
  title: string;
  prompt: string;
  correctAnswer: string;
  userAnswer?: string;
  createdAt: number;
};
