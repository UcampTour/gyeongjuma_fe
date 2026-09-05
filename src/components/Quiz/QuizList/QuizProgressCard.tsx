// QuizProgressCard.tsx
import { Box, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QuizStatus, type QuizListItem } from "../../../models/QuizModel";

interface QuizProgressCardProps {
  quizData: QuizListItem[];
}

const QuizProgressCard = ({ quizData }: QuizProgressCardProps) => {
  const { t } = useTranslation("quiz");

  const totalQuizCount = quizData.length;

  const completedCount = quizData.filter(
    (quiz) => quiz.quizStatus === QuizStatus.COMPLETED
  ).length;

  const progressPercent =
    totalQuizCount > 0 ? Math.round((completedCount / totalQuizCount) * 100) : 0;

  return (
    <Box
      sx={{
        mb: 3,
        bgcolor: "#FFFFFF",
        borderRadius: "24px",
        height: "46px",
        boxShadow: "0 2px 6px rgba(142,114,73,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: 2,
        pr: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          color: "#5D574E",
          fontWeight: 800,
          flexShrink: 0,
          mr: 1.5,
        }}
      >
        {t("quizprogress")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1.5 }}>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            flex: 1,
            height: 8,
            borderRadius: "10px",
            bgcolor: "#EBE6D9",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#A68656",
              borderRadius: "10px",
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 900,
            color: "#A68656",
            flexShrink: 0,
          }}
        >
          {progressPercent}%
        </Typography>
      </Box>
    </Box>
  );
};

export default QuizProgressCard;