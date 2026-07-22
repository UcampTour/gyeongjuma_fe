import { Box, Button, LinearProgress, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { quizDetailData } from "../../../data/quiz/QuizData";

interface QuizPlayViewProps {
  currentIdx: number;
  correctCnt: number;
  animatedPoint: number;
  currentQuestion: any;
  selectedAnswerId: number | null;
  correctAnswerId: number;
  userAnswers: number[];
  handleAnswer: (answerId: number) => void;
}

const QuizPlayView = ({
  currentIdx,
  correctCnt,
  animatedPoint,
  currentQuestion,
  selectedAnswerId,
  correctAnswerId,
  userAnswers,
  handleAnswer,
}: QuizPlayViewProps) => {

  const solvedCount = userAnswers.length;

  const statusItems = [
    { label: "남은 문항", val: `${quizDetailData.totalQuestions - solvedCount}문항` },
    { label: "맞은 문항", val: `${correctCnt}문항` },
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
        value={(solvedCount / quizDetailData.totalQuestions) * 100}
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
        {currentQuestion?.options.map((option, index) => {
          const isSelected = selectedAnswerId === option.answerId;
          const isCorrectOption = option.answerId === correctAnswerId;
          const hasAnswered = selectedAnswerId !== null;

          let borderColor = "rgba(160, 142, 115, 0.15)";
          let badgeBgColor = "#F2F0E9";
          let badgeColor = "#7A7265";
          let badgeContent: React.ReactNode = index + 1;

          if (hasAnswered) {
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

          return (
            <Button
              key={`${currentIdx}-${option.answerId}`}
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
                bgcolor: "#FFFFFF",
                color: "#1F1F1F",
                border: `2px solid ${borderColor}`,
                boxShadow: "0 4px 10px rgba(160, 142, 115, 0.05)",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                transition: "all 0.2s ease",
                "&.Mui-disabled": {
                  bgcolor: "#FFFFFF",
                  color: "#1F1F1F",
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
  )
};

export default QuizPlayView;