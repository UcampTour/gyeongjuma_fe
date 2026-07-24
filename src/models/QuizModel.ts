/* -------- Interface -------- */

/**
 * 퀴즈 리스트 데이터 인터페이스
 */
export interface QuizListResponse {
  quizList: QuizListItem[];
}

export interface QuizListItem {
  quizId: number;
  quizTitle: string;
  description: string;
  imageUrl: string;
  totalQuestions: number;
  solvedQuestions: number;
  quizStatus: QuizStatus;
}

/**
 * 퀴즈 상세 정보 인터페이스 목록
 */
export interface QuizItem {
  placeId: number;
  title: string;
  description: string;
  imageUrl: string;
  totalQuestions: number;
  correctQuestions: number;
  progressRate: number;
  isCorrect: boolean;
  lastQuestionIndex?: number;
  quizStatus: QuizStatus;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  quizId: number;
  question: string;
  options: QuizOption[];
  isCorrect?: boolean | null;          
  isSolved?: boolean;
}

interface QuizOption {
  answerId: number;
  content: string;
}

/**
 * Constants & Types
 */
export const QuizStatus = {
  LOCKED: "LOCKED",
  AVAILABLE: "AVAILABLE",
  PROGRESS: "PROGRESS",
  COMPLETED: "COMPLETED",
} as const;
export type QuizStatus = typeof QuizStatus[keyof typeof QuizStatus];

export const QuizCategory = {
  ...QuizStatus,
  ALL: "ALL",
} as const;
export type QuizCategory = typeof QuizCategory[keyof typeof QuizCategory];

