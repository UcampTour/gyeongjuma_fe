import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import ListIcon from "@mui/icons-material/List";
import { quizDetailData } from "../../../data/quiz/QuizData";

interface QuizResultViewProps {
  correctCnt: number;
  userAnswers: number[];
  answerData: number[];
  onRetry: () => void;
  onGoToList: () => void;
}

export const QuizResultView = ({
  correctCnt,
  userAnswers,
  answerData,
  onRetry,
  onGoToList,
}: QuizResultViewProps) => {
  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2.5,
        pb: 1.5,
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          color: "#1F1F1F",
          fontSize: "1.05rem",
          fontWeight: 700,
          mb: 1.2,
          textAlign: "center",
        }}
      >
        총 {quizDetailData.totalQuestions}문제 중{" "}
        <Box component="span" sx={{ color: "#A08E73", fontWeight: 800 }}>
          {correctCnt}문제
        </Box>
        를 맞혔습니다.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(160, 142, 115, 0.15)",
          borderRadius: "20px",
          px: 3,
          py: 1.2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EmojiEventsIcon sx={{ color: "#A08E73", fontSize: "1.1rem" }} />
        <Typography sx={{ fontWeight: 800, color: "#1F1F1F", fontSize: "0.98rem" }}>
          +{correctCnt * 50} Point
        </Typography>
      </Paper>
    </Box>

    <Divider sx={{ my: 1, borderColor: "rgba(160, 142, 115, 0.2)" }} />

    {/* 리뷰 리스트 헤더 */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
        mt: 0.5,
        px: 0.5,
        flexShrink: 0,
      }}
    >
      <Typography variant="subtitle2" sx={{ color: "#A08E73", fontWeight: 700 }}>
        내 정답 확인하기
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", color: "#7A7265", fontWeight: 600 }}>
        정답률 {Math.round((correctCnt / quizDetailData.totalQuestions) * 100)}%
      </Typography>
    </Box>

    {/* 리뷰 카드 컨테이너 */}
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
        flexGrow: 1,
        overflowY: "auto",
        pr: 0.5,
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "rgba(160, 142, 115, 0.2)",
          borderRadius: "4px",
        },
      }}
    >
      {quizDetailData.questions.map((q, idx) => {
        const uAnsId = userAnswers[idx];
        const cAnsId = answerData[idx];
        const isCorrect = uAnsId === cAnsId;

        return (
          <Box
            key={q.quizId}
            sx={{
              bgcolor: "#FFFFFF",
              borderRadius: "18px",
              p: 2,
              border: `1px solid ${isCorrect ? "rgba(46, 125, 50, 0.2)" : "rgba(211, 47, 47, 0.2)"}`,
              boxShadow: "0 4px 12px rgba(160, 142, 115, 0.03)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.5 }}>
              <Box
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  px: 1,
                  py: 0.3,
                  borderRadius: "6px",
                  flexShrink: 0,
                  bgcolor: isCorrect ? "#E8F5E9" : "#FFEBEE",
                  color: isCorrect ? "#2E7D32" : "#D32F2F",
                }}
              >
                Q {idx + 1}
              </Box>
              <Typography
                sx={{
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "#1F1F1F",
                  lineHeight: 1.45,
                  wordBreak: "keep-all",
                }}
              >
                {q.question}
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: "#F2F0E9" }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, pt: 0.5 }}>
              {q.options.map((option, oIdx) => {
                const isUserPicked = option.answerId === uAnsId;
                const isRightAnswer = option.answerId === cAnsId;

                let optionColor = "#4F4F4F";
                let optionWeight = 500;
                let checkIconElement: React.ReactNode = null;

                if (isRightAnswer) {
                  optionColor = "#2E7D32";
                  optionWeight = 700;
                  checkIconElement = <CheckIcon sx={{ fontSize: "0.95rem", color: "#2E7D32", mr: 0.5 }} />;
                } else if (isUserPicked && !isCorrect) {
                  optionColor = "#D32F2F";
                  optionWeight = 700;
                  checkIconElement = <CloseIcon sx={{ fontSize: "0.95rem", color: "#D32F2F", mr: 0.5 }} />;
                }

                return (
                  <Box
                    key={option.answerId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 1,
                      py: 0.5,
                      borderRadius: "8px",
                      bgcolor: isRightAnswer
                        ? "rgba(46, 125, 50, 0.04)"
                        : isUserPicked
                        ? "rgba(211, 47, 47, 0.04)"
                        : "transparent",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", width: "22px", flexShrink: 0 }}>
                      {checkIconElement}
                    </Box>
                    <Typography sx={{ fontSize: "0.85rem", color: optionColor, fontWeight: optionWeight, wordBreak: "keep-all" }}>
                      {oIdx + 1}. {option.content}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>

    {/* 하단 버튼 */}
    <Box sx={{ display: "flex", gap: 1.5, mt: "auto", pt: 1, flexShrink: 0 }}>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<ReplayIcon />}
        onClick={onRetry}
        sx={{
          borderRadius: "16px",
          py: 1.4,
          color: "#A08E73",
          borderColor: "#A08E73",
          fontWeight: 700,
          fontSize: "0.9rem",
        }}
      >
        다시 도전하기
      </Button>
      <Button
        variant="contained"
        fullWidth
        startIcon={<ListIcon />}
        onClick={onGoToList}
        sx={{
          borderRadius: "16px",
          py: 1.4,
          bgcolor: "#A08E73",
          fontWeight: 700,
          fontSize: "0.9rem",
          boxShadow: "none",
        }}
      >
        돌아가기
      </Button>
    </Box>
   </>
  );
};