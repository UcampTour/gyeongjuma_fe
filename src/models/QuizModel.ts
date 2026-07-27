/* -------- Interface -------- */

/**
 * 퀴즈 리스트 데이터 인터페이스
 */
export interface QuizListResponse {
  quizList: QuizListItem[];
}

export interface QuizListItem {
  placeQuizInfoId: number;
  placeId: number;
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
  placeQuizInfoId: number;
  placeId: number;
  title: string;
  description: string;
  imageUrl: string;
  totalQuestions: number;
  correctQuestions: number;
  lastQuestionIndex: number;
  quizStatus: QuizStatus;
  questions: QuizQuestion[];
  quizTitle?: string;
  solvedQuestions?: number;
}

interface QuizQuestion {
  quizId: number; // 나중에 바꾸자
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
 * 퀴즈 정답 제출 인터페이스
 */
export interface QuizSubmitRequest {
  questionId: number;
  selectedOptionId: number;
}

export interface QuizSubmitResponse {
  isCorrect: boolean;
  isLastQuestion: boolean;
  correctAnswerId: number;
}

/**
 *  퀴즈 결과 인터페이스
 */
export interface QuizResultResponse {
  placeQuizInfoId: number;
  totalQuestions: number;
  correctQuestions: number;
  points: number;
  questions: QuestionResult[];
}

interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  userSelectedId: number;
  correctOptionId: number;
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
export type QuizStatus = (typeof QuizStatus)[keyof typeof QuizStatus];

export const QuizCategory = {
  ...QuizStatus,
  ALL: "ALL",
} as const;
export type QuizCategory = (typeof QuizCategory)[keyof typeof QuizCategory];
