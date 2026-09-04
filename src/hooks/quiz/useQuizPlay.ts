import { useState, useEffect } from "react";
import { submitQuizAnswer } from "../../api/quizApi";
import { useAnimatedNumber } from "../common/useAnimatedNumber";
import { useQuizDetailQuery, useQuizResultQuery } from "../../queries/useQuizQuery";

export interface QuizPlayState {
  stage: string;
  currentIdx: number;
  correctCnt: number;
  solvedCount: number;
  selectedAnswerId: number | null;
  correctAnswerId: number | null;
}

export const useQuizPlay = (quizId: string | undefined) => {
  // 퀴즈 상세 정보 가져오기
  const { data: quizData = null, isLoading } = useQuizDetailQuery(quizId ?? "");

  const [quizState, setQuizState] = useState<QuizPlayState>({
    stage: "playing",
    currentIdx: 0,
    correctCnt: 0,
    solvedCount: 0,
    selectedAnswerId: null,
    correctAnswerId: null,
  });

  // 💡 서버에서 받아온 퀴즈 데이터(이어하기 / 새로풀기)를 바탕으로 초기 상태 동기화
  useEffect(() => {
    if (!quizData) return;

    // 이미 풀던 퀴즈이거나 완료된 퀴즈인 경우 데이터 반영
    // 예: lastQuestionIndex가 있거나 quizStatus가 PROGRESS인 경우
    const initialIdx = quizData.lastQuestionIndex ?? 0;
    const initialCorrectCnt = quizData.correctQuestions ?? 0;
    
    // 만약 이미 완료된(COMPLETED) 퀴즈라면 결과 화면으로 바로 보낼 수도 있음
    const initialStage = quizData.quizStatus === "COMPLETED" ? "result" : "playing";

    setQuizState((prev) => ({
      ...prev,
      stage: initialStage,
      currentIdx: initialIdx,
      correctCnt: initialCorrectCnt,
      solvedCount: initialIdx, // 지금까지 푼 개수 반영
    }));
  }, [quizData]);

  // 퀴즈 결과 정보 가져오기
  const { data: quizResultData = null, isLoading: resultLoading } = useQuizResultQuery(quizId ?? "", {
    enabled: quizState.stage === "result" && !!quizId
  });

  const animatedPoint = useAnimatedNumber(quizState.correctCnt * 50, 400);

  // 정답 제출 핸들러
  const handleAnswer = async (selectedOptionId: number) => {
    if (quizState.selectedAnswerId !== null || !quizId || !quizData) return;

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
        correctCnt: responseData.isCorrect
          ? prev.correctCnt + 1
          : prev.correctCnt,
      }));

      setTimeout(() => {
        setQuizState((prev) => ({
          ...prev,
          stage: responseData.isLastQuestion ? "result" : prev.stage,
          currentIdx: responseData.isLastQuestion
            ? prev.currentIdx
            : prev.currentIdx + 1,
          selectedAnswerId: null,
          correctAnswerId: null,
        }));
      }, 1000);
    } catch (error) {
      console.error("정답 제출 실패: ", error);
    }
  };

  // 초기화 핸들러
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
    isLoading,
    quizResultData,
    resultLoading,
    animatedPoint,
    setStage,
    handleAnswer,
    handleComplete,
    quizState,
  };
};