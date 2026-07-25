import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import type { QuizItem } from "../../../models/QuizModel";
import type { QuizPlayState } from "../../../hooks/useQuizPlay";

interface QuizPlayViewProps {
  quizState: QuizPlayState;
  animatedPoint: number;
  currentQuestion: any;
  quizData: QuizItem;
  handleAnswer: (answerId: number) => void;
}

const QuizPlayView = ({
  quizState,
  animatedPoint,
  currentQuestion,
  handleAnswer,
  quizData,
}: QuizPlayViewProps) => {

  const totalQuestions = quizData?.questions ? quizData.questions.length : 0;

  const statusItems = [
    { label: "남은 문항", val: `${totalQuestions - quizState.solvedCount}문항` },
    { label: "맞은 문항", val: `${quizState.correctCnt}문항` },
    { label: "현재 포인트", val: `${animatedPoint}p` },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-around", p: 2, bgcolor: "#FFFFFF", borderRadius: "20px", mt: 1.5, mb: 3, border: "1px solid rgba(160, 142, 115, 0.2)" }}>
        {statusItems.map((item, i) => (
          <Box key={i} sx={{ textAlign: "center", flex: 1 }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#7A7265" }}>
              {item.label}
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>
              {item.val}
            </Typography>
          </Box>
        ))}
      </Box>

      <LinearProgress
        variant="determinate"
        value={(quizState.solvedCount / totalQuestions) * 100}
        sx={{
          height: 8,
          borderRadius: 5,
          bgcolor: "#EBE6D9",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#A08E73",
            transition: "transform 0.4s ease",
          },
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.5,
            wordBreak: "keep-all",
          }}
        >
          {currentQuestion?.question}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.8,
          mb: 1,
        }}
      >
        {currentQuestion?.options.map((option: any, index: number) => {
          const isSelected = quizState.selectedAnswerId === option.answerId;
          const isCorrectOption = quizState.correctAnswerId !== null && option.answerId === quizState.correctAnswerId;
          const hasAnswered = quizState.selectedAnswerId !== null;

          let borderColor = "rgba(160, 142, 115, 0.15)";
          let badgeBgColor = "#F2F0E9";
          let badgeColor = "#7A7265";
          let badgeContent: React.ReactNode = index + 1;
          let buttonBgColor = "#FFFFFF";

          if (hasAnswered) {
            if (isSelected) {
              buttonBgColor = "#F9F8F6";
            }

            if (quizState.correctAnswerId !== null) {
              if (isCorrectOption) {
                borderColor = "#2E7D32";
                badgeBgColor = "#E8F5E9";
                badgeColor = "#2E7D32";
                badgeContent = <CheckIcon sx={{ fontSize: "1.1rem" }} />;
              } else if (isSelected) {
                borderColor = "#D32F2F";
                badgeBgColor = "#FFEBEE";
                badgeColor = "#D32F2F";
                badgeContent = <CloseIcon sx={{ fontSize: "1.1rem" }} />;
              }
            }
          }

          return (
            <Button
              key={`${quizState.currentIdx}-${option.answerId}`}
              variant="contained"
              fullWidth
              disabled={hasAnswered}
              onClick={() => handleAnswer(option.answerId)}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                py: 2,
                px: 2.5,
                borderRadius: "20px",
                bgcolor: buttonBgColor,
                color: "#1F1F1F",
                border: `2px solid ${borderColor}`,
                boxShadow: isSelected ? "inset 0 2px 4px rgba(0,0,0,0.05)" : "0 4px 10px rgba(160, 142, 115, 0.05)",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.2s ease",
                "&.Mui-disabled": {
                  bgcolor: buttonBgColor,
                  color: "#1F1F1F",
                  border: `2px solid ${borderColor}`,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  bgcolor: badgeBgColor,
                  color: badgeColor,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  mr: 2,
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                {badgeContent}
              </Box>
              <Box component="span">{option.content}</Box>
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default QuizPlayView;