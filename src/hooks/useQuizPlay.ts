import { useEffect, useState } from "react"
import { QuizStatus, type QuizItem, type QuizResultResponse } from "../models/QuizModel";
import { fetchQuizDetail, fetchQuizResult, submitQuizAnswer } from "../api/quizService";
import { useAnimatedNumber } from "./useAnimatedNumber";

export interface QuizPlayState {
  stage: string;
  currentIdx: number;
  correctCnt: number;
  solvedCount: number;
  selectedAnswerId: number | null;
  correctAnswerId: number | null;
}

export const useQuizPlay = (quizId: string | undefined) => {

  const [quizData, setQuizData] = useState<QuizItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [quizResultData, setQuizResultData] = useState<QuizResultResponse | null>(null);
  const [resultLoading, setResultLoading] = useState(true);

  const [quizState, setQuizState] = useState<QuizPlayState>({
    stage: "playing",
    currentIdx: 0,
    correctCnt: 0,
    solvedCount: 0,
    selectedAnswerId: null,
    correctAnswerId: null,
  });

  const animatedPoint = useAnimatedNumber(quizState.correctCnt * 50, 400);

  // 1. 퀴즈 상세 정보 가져오기
  useEffect(() => {
    const getQuizDetail = async () => {
      if (!quizId) return;
      try {
        setLoading(true);
        const data = await fetchQuizDetail(quizId);
        setQuizData(data);
        
        if (data.quizStatus === QuizStatus.PROGRESS) {
          setQuizState((prev) => ({ ...prev, currentIdx: data.lastQuestionIndex }));
        }
      } catch (error) {
        console.error("퀴즈 데이터 불러오기 실패.", error);
      } finally {
        setLoading(false);
      }
    };
    getQuizDetail();
  }, [quizId]);

  // 2. 퀴즈 결과 패치
  useEffect(() => {
    if (quizState.stage !== "result" || !quizId) return;
    
    const getQuizResult = async () => {
      try {
        setResultLoading(true);
        const responseData = await fetchQuizResult(quizId);
        setQuizResultData(responseData);
      } catch (error) {
        console.error("퀴즈 결과 불러오기 실패: ", error);
      } finally {
        setResultLoading(false);
      }
    };
    getQuizResult();
  }, [quizState.stage, quizId]);

  // 3. 정답 제출 핸들러
  const handleAnswer = async (selectedOptionId: number) => {
    if (quizState.selectedAnswerId !== null || !quizId || !quizData) return;

    // 선택된 답안과 해결한 문제 수 우선 반영
    setQuizState((prev) => ({
      ...prev,
      selectedAnswerId: selectedOptionId,
      solvedCount: prev.solvedCount + 1,
    }));

    const currentQuestion = quizData.questions[quizState.currentIdx];
    const request = { questionId: currentQuestion.quizId, selectedOptionId };

    try {
      const responseData = await submitQuizAnswer(quizId, request);

      setQuizState((prev) => ({
        ...prev,
        correctAnswerId: responseData.correctAnswerId,
        correctCnt: responseData.isCorrect ? prev.correctCnt + 1 : prev.correctCnt,
      }));

      setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          stage: responseData.isLastQuestion ? "result" : prev.stage,
          currentIdx: responseData.isLastQuestion ? prev.currentIdx : prev.currentIdx + 1,
          selectedAnswerId: null,
          correctAnswerId: null,
        }));
      }, 1000);
    } catch (error) {
      console.error("정답 제출 실패: ", error);
    }
  };

  // 4. 초기화 핸들러
  const handleComplete = (callback: () => void) => {
    callback();
    setTimeout(() => {
      setQuizState({
        stage: "playing",
        currentIdx: 0,
        correctCnt: 0,
        solvedCount: 0,
        selectedAnswerId: null,
        correctAnswerId: null,
      });
    }, 200);
  };

  // stage 변경을 위한 헬퍼 함수
  const setStage = (stage: string) => {
    setQuizState((prev) => ({ ...prev, stage }));
  };

  return {
    quizData,
    loading,
    quizResultData,
    resultLoading,
    animatedPoint,
    setStage,
    handleAnswer,
    handleComplete,
    quizState,
  };

}