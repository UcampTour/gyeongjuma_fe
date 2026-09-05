import type {
  QuizItem,
  QuizListResponse,
  QuizResultResponse,
  QuizSubmitRequest,
  QuizSubmitResponse,
} from "../models/QuizModel";
import { apiClient } from "./apiClient";

// 1. 퀴즈 리스트
export const fetchQuizList = async (): Promise<QuizListResponse> => {
  const response = await apiClient.get("quizzes");

  return response.data.data;
};

// 2. 퀴즈 상세 정보
export const fetchQuizDetail = async (
  quizId: number | string,
): Promise<QuizItem> => {
  const response = await apiClient.get(`quizzes/${quizId}`);

  return response.data.data;
};

// 3. 퀴즈 정답 제출
export const submitQuizAnswer = async (
  quizId: number | string,
  request: QuizSubmitRequest,
): Promise<QuizSubmitResponse> => {
  const response = await apiClient.post(`quizzes/${quizId}/submit`, request);

  return response.data.data;
};

// 4. 퀴즈 결과 조회
export const fetchQuizResult = async (
  quizId: number | string,
): Promise<QuizResultResponse> => {
  const response = await apiClient.get(`quizzes/${quizId}/result`);

  return response.data.data;
};
