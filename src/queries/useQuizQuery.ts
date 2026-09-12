import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchQuizDetail, fetchQuizList, fetchQuizResult, submitQuizAnswer } from "../api/quizApi"
import type { QuizSubmitRequest } from "../models/QuizModel";

// 1. 퀴즈 리스트 쿼리
export const useQuizListQuery = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizList,
  });
};

// 2. 퀴즈 상세 정보 쿼리
export const useQuizDetailQuery = (quizId: number | string) => {
  return useQuery({
    queryKey: ["quizDetail", quizId],
    queryFn: () => fetchQuizDetail(quizId),
    enabled: !!quizId,
  });
};

// 3. 퀴즈 결과 조회 쿼리
export const useQuizResultQuery = (
  quizId: number | string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["quizResult", quizId],
    queryFn: () => fetchQuizResult(quizId),
    enabled: options?.enabled ?? !!quizId
  });
};