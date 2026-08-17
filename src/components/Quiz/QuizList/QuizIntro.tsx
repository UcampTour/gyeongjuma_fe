import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import QuizIcon from "@mui/icons-material/Quiz";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import {
  QuizStatus,
  type QuizItem,
  type QuizListItem,
} from "../../../models/QuizModel";

interface QuizDetailContentProps {
  quiz: QuizItem | QuizListItem | undefined;
  showImage?: boolean;
}

const QuizIntro = ({ quiz, showImage = true }: QuizDetailContentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isLocked = quiz?.quizStatus === QuizStatus.LOCKED;
  const isCompleted = quiz?.quizStatus === QuizStatus.COMPLETED;
  const isProgress = quiz?.quizStatus === QuizStatus.PROGRESS;

  const label = isLocked
    ? "방문 인증 후 이용 가능"
    : isCompleted
      ? "다시 도전하기"
      : isProgress
        ? "이어 도전하기"
        : "도전 시작하기";

  const bgColor = isCompleted ? "#5F7464" : isProgress ? "#D4A373" : "#A08E73";

  const getQuizMessage = (status: QuizStatus) => {
    switch (status) {
      case QuizStatus.AVAILABLE:
        return {
          severity: "success" as const,
          message: t("quiz:intro.message.available"),
        };

      case QuizStatus.LOCKED:
        return {
          severity: "warning" as const,
          message: t("quiz:intro.message.locked"),
        };

      case QuizStatus.COMPLETED:
        return {
          severity: "success" as const,
          message: t("quiz:intro.message.completed"),
        };

      case QuizStatus.PROGRESS:
        return {
          severity: "info" as const,
          message: t("quiz:intro.message.progress"),
        };

      default:
        return null;
    }
  };

  const quizMessage = quiz ? getQuizMessage(quiz.quizStatus) : null;

  return (
    <>
      {!quiz ? (
        <Box
          sx={{
            mt: 2,
            p: 4,
            borderRadius: "24px",
            bgcolor: "#FCFBF8",
            border: "1px dashed #D9CDBD",
            textAlign: "center",
          }}
        >
          <QuizIcon
            sx={{
              fontSize: 64,
              color: "#C7B8A3",
              mb: 2,
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "#5A534A",
              mb: 0.5,
            }}
          >
            아직 준비된 퀴즈가 없어요
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: "0.875rem",
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            추후 업데이트될 예정이니 기대해 주세요! 😊
          </Typography>
        </Box>
      ) : (
        <>
          {quizMessage && (
            <Box
              sx={{
                mt: 1.5,
                mb: 2,
              }}
            >
              <Alert severity={quizMessage?.severity}>
                {quizMessage?.message}
              </Alert>
            </Box>
          )}

          <Box
            sx={{
              maxWidth: "500px",
              mx: "auto",
              width: "100%",
              px: showImage ? 3 : 0,
              pt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {showImage && (
              <Box
                sx={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={quiz?.imageUrl}
                  alt={quiz?.quizTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#1F1F1F",
                }}
              >
                {quiz?.quizTitle}
              </Typography>

              <Typography
                sx={{
                  color: "#7A7265",
                  fontSize: "0.9rem",
                  mt: 1,
                }}
              >
                {quiz?.description}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "#F9F7F2",
                p: 1.5,
                borderRadius: "20px",
              }}
            >
              {[
                {
                  icon: <QuizIcon fontSize="small" />,
                  label: "문항",
                  val: `${quiz?.totalQuestions}문항`,
                },
                {
                  icon: <MilitaryTechIcon fontSize="small" />,
                  label: "난이도",
                  val: "일반",
                },
                {
                  icon: <EmojiEventsIcon fontSize="small" />,
                  label: "포인트",
                  val: "50p",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Box sx={{ color: "#A08E73" }}>{item.icon}</Box>

                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      color: "#888",
                      fontWeight: 700,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: "#1F1F1F",
                    }}
                  >
                    {item.val}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCompleted && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#888",
                    fontWeight: 500,
                  }}
                >
                  * 이미 완료한 퀴즈는 포인트가 지급되지 않습니다.
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(`/quiz/${quiz?.placeQuizInfoId}`)}
              disabled={isLocked}
              sx={{
                py: 1.5,
                borderRadius: "16px",
                fontWeight: 800,
                fontSize: "1rem",
                bgcolor: bgColor,
                boxShadow: "none",
              }}
            >
              {label}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default QuizIntro;
