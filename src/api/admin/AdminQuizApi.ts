import { apiClient } from "../apiClient";

// 1. 퀴즈 목록 리스트
export const fetchAdminQuizList = async (): Promise<any> => {

  const response = await apiClient.get("admin/quizzes");

  return response.data.data;
}

export const fetchAdiminQuizDetail = async (placeQuizInfoId: number): Promise<any> => {
  const response = await apiClient.get(`admin/quizzes/${placeQuizInfoId}`);

  return response.data.data;
}

export const fetchAdminQuizTranslations = async (placeQuizInfoId: number): Promise<any> => {
  const response = await apiClient.get(`admin/quizzes/${placeQuizInfoId}/translations`);

  return response.data.data;
}

// 4. 퀴즈 등록 (원본 - 주로 ko)
export const createAdminQuiz = async (requestData: any): Promise<any> => {
  const response = await apiClient.post("admin/quizzes", requestData);
  return response.data.data;
};

// 5. 퀴즈 번역본 등록 (en, ja, zh 등)
export const createAdminQuizTranslation = async ({
  placeQuizInfoId,
  requestData,
}: {
  placeQuizInfoId: number;
  requestData: any;
}): Promise<any> => {
  const response = await apiClient.post(`admin/quizzes/${placeQuizInfoId}/translations`, requestData);
  return response.data.data;
};