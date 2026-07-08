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
  quizStatus: QuizStatusType
}

/**
 * 
 */
export const QuizStatus = {
  LOCKED: "LOCKED",
  AVAILABLE: "AVAILABLE",
  PROGRESS: "PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export const QuizFilter = {
  ...QuizStatus,
  ALL: "ALL",
} as const;

export type QuizStatusType = typeof QuizStatus[keyof typeof QuizStatus];
export type QuizFilterType = typeof QuizFilter[keyof typeof QuizFilter];