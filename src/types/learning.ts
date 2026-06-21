export type VocabularyItem = {
  id: string;
  english: string;
  chinese: string;
  phonetic: string;
  example: string;
};

export type KnowledgePoint = {
  id: string;
  title: string;
  explanation: string;
  example: string;
  tip: string;
};

export type SentencePattern = {
  id: string;
  english: string;
  chinese: string;
  example: string;
};

export type GrammarFocus = {
  id: string;
  rule: string;
  example: string;
  commonMistake: string;
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
  id: string;
  unitNumber: number;
  title: string;
  theme: string;
  summary: string;
  learningGoal: string;
  knowledgePoints: KnowledgePoint[];
  vocabulary: VocabularyItem[];
  sentencePatterns: SentencePattern[];
  grammarFocus: GrammarFocus[];
  dragQuestions: DragQuestion[];
  quizQuestions: QuizQuestion[];
};

export type LearningModule = {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  units: LearningUnit[];
};

export type CourseData = {
  course: string;
  publisher: string;
  grade: string;
  semester: string;
  note: string;
  modules: LearningModule[];
};

export type FollowUpQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type ErrorItem = {
  id: string;
  type: "drag" | "quiz";
  title: string;
  prompt: string;
  correctAnswer: string;
  userAnswer?: string;
  followUps?: FollowUpQuestion[];
  createdAt: number;
};
