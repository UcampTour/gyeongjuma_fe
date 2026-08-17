import { Box, CircularProgress, Fade } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import QuizPlayView from "../../components/Quiz/QuizPlay/QuizPlayView";
import { QuizResultView } from "../../components/Quiz/QuizPlay/QuizResultView";
import { useQuizPlay } from "../../hooks/quiz/useQuizPlay";

const QuizPlayPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const {
    quizData,
    isLoading,
    quizResultData,
    resultLoading,
    animatedPoint,
    setStage,
    handleAnswer,
    handleComplete,
    quizState,
  } = useQuizPlay(quizId);

  if (isLoading || !quizData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#F7F5EE",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = quizData.questions[quizState.currentIdx];

  const getHeaderProps = () => {
    switch (quizState.stage) {
      case "playing":
        return { title: quizData.title };
      case "result":
        return { title: "퀴즈 완료 및 결과" };
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

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          px: 2,
          pb: 3,
          overflow: "hidden",
        }}
      >
        {/* 퀴즈 풀이 화면 */}
        {quizState.stage === "playing" && (
          <Fade in={quizState.stage === "playing"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
                pb: 11,
              }}
            >
              <QuizPlayView
                quizState={quizState}
                animatedPoint={animatedPoint}
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
                quizData={quizData}
              />
            </Box>
          </Fade>
        )}

        {/* 퀴즈 완료 및 통합 결과/리뷰 화면 */}
        {quizState.stage === "result" && (
          <Fade in={quizState.stage === "result"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
                pb: 11,
              }}
            >
              <QuizResultView
                quizData={quizData}
                quizResultData={quizResultData!}
                resultLoading={resultLoading}
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
