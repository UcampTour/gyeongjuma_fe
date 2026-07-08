/* -------- Interface -------- */

/**
 * API 서버로부터 받아오는 퀴즈 리스트 데이터 인터페이스
 */
export interface QuizListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  totalQuestions: number;
  solvedQuestions: number;
  quizStatus: QuizStatus
}

/* -------- ENUM -------- */

/**
 * Quiz Status Enum
 */
export const enum QuizStatus {
  LOCKED = "LOCKED",
  AVAILABLE = "AVAILABLE",
  PROGRESS = "PROGRESS",
  COMPLETED = "COMPLETED",
}

/**
 * Quiz 카테고리 Enum
 */
export const enum QuizCategory {
  All = "ALL",
  LOCKED = "LOCKED",
  AVAILABLE = "AVAILABLE",
  PROGRESS = "PROGRESS",
  COMPLETED = "COMPLETED",
}