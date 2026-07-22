import { useState, useEffect } from "react";
import { Box, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { quizDetailData } from "../../data/quiz/QuizData";
import QuizPlayView from "../../components/Quiz/QuizPlay/QuizPlayView";
import { QuizResultView } from "../../components/Quiz/QuizPlay/QuizResultView";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

const answerData = [1, 3, 4, 2, 1];

const QuizPlayPage = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState("playing");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCnt, setCorrectCnt] = useState(0);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const animatedPoint = useAnimatedNumber(correctCnt * 50, 400);

  const currentQuestion = quizDetailData.questions[currentIdx];
  const correctAnswerId = answerData[currentIdx];

  const handleAnswer = (answerId: number) => {
    if (selectedAnswerId !== null) return;

    setSelectedAnswerId(answerId);
    setUserAnswers((prev) => [...prev, answerId]);

    if (answerId === correctAnswerId) {
      setCorrectCnt((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIdx === quizDetailData.totalQuestions - 1) {
        setStage("result");
      } else {
        setCurrentIdx((prev) => prev + 1);
      }
      setSelectedAnswerId(null);
    }, 1000);
  };

  const handleComplete = (callback: () => void) => {
    callback();
    
    setTimeout(() => {
      setCurrentIdx(0);
      setCorrectCnt(0);
      setSelectedAnswerId(null);
      setUserAnswers([]);
    }, 200);
  };

  const getHeaderProps = () => {
    switch (stage) {
      case "playing":
        return {
          title: quizDetailData.title,
          customBack: () => setStage("start"),
        };
      case "result":
        return {
          title: "퀴즈 완료 및 결과",
          customBack: () => handleComplete(() => setStage("start")),
        };
      default:
        return { title: "" };
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#F7F5EE",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "500px" }}>
        <PageHeader {...getHeaderProps()} />
      </Box>

      <Box sx={{ width: "100%", maxWidth: "500px", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box", px: 2, pb: 3, overflow: "hidden" }}>
        
        {/* 퀴즈 풀이 화면 */}
        {stage === "playing" && (
          <Fade in={stage === "playing"}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, height: "100%", pb: 11 }}>
              <QuizPlayView 
                currentIdx={currentIdx}
                correctCnt={correctCnt}
                animatedPoint={animatedPoint}
                currentQuestion={currentQuestion}
                selectedAnswerId={selectedAnswerId}
                correctAnswerId={correctAnswerId}
                userAnswers={userAnswers}
                handleAnswer={handleAnswer}
              />
            </Box>
          </Fade>
        )}

        {/* 퀴즈 완료 및 통합 결과/리뷰 화면 */}
        {stage === "result" && (
          <Fade in={stage === "result"}>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, height: "100%", pb: 11 }} >
                <QuizResultView
                  correctCnt={correctCnt}
                  userAnswers={userAnswers}
                  answerData={answerData}
                  onRetry={() => handleComplete(() => setStage("playing"))}
                  onGoToList={() => handleComplete(() => navigate("/quiz"))}
                />
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default QuizPlayPage;