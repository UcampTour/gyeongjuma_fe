import { useState } from "react";
import { quizDetailData } from "../data/quiz/QuizData";

export const useQuizPlay = () => {

  const [stage, setStage] = useState("playing"); 
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCnt, setCorrectCnt] = useState(0);

  // 사용자가 방금 선택한 답
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  // 사용자가 선택한 전체 답 배열
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswer = (answerId: number) => {
    if (selectedAnswerId !== null) return;

    setSelectedAnswerId(answerId);
    setUserAnswers((prev) => [...prev, answerId]);

    if (answerId === correctAnswerId) {
      setCorrectCnt((prev) => prev + 1);
    }

    // setProgressIdx((prev) => prev + 1);

    setTimeout(() => {
      if (currentIdx === quizDetailData.totalQuestions - 1) {
        setStage("result");
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
      setSelectedAnswerId(null);
    }, 1000);
  };
}