import { apiClient } from "../apiClient";

// 1. 퀴즈 목록 리스트
export const fetchAdminQuizList = async (): Promise<any> => {

  const response = await apiClient.get("admin/quizzes");

  return response.data.data;
}