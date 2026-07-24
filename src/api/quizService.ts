import type { QuizListResponse } from "../models/QuizModel";
import { apiClient } from "./apiClient";

// 1. 퀴즈 리스트
export const fetchQuizList = async (): Promise<QuizListResponse> => {
  const response = await apiClient.get("quizzes");

  return response.data.data;
}