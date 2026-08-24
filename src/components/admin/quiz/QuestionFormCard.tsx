import { Box, IconButton, Paper, TextField, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { QuizQuestion } from "../../../hooks/admin/useAdminQuizForm";

interface QuestionFormCardInterface {
  question: QuizQuestion;
  qIndex: number;
  currentLanguage: string;
  totalQuestions: number;
  isEditMode: boolean;
  handleRemove: (qIndex: number) => void;
  handleTitleChange: (qIndex: number, value: string) => void;
  handleOptionChange: (qIndex: number, oIndex: number, value: string) => void;
  handleAnswerChange: (qIndex: number, oIndex: number) => void;
}

const QuestionFormCard = ({
  question,
  qIndex,
  currentLanguage,
  totalQuestions,
  handleRemove,
  handleTitleChange,
  handleOptionChange,
  handleAnswerChange,
}: QuestionFormCardInterface) => {
  // 현재 언어에 해당하는 보기 배열 가져오기 (없으면 빈 배열 4개)
  const currentOptions = question.options[currentLanguage] || ["", "", "", ""];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "#FAFAFA",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#AC8E61" }}>
          문제 {qIndex + 1} ({currentLanguage.toUpperCase()})
        </Typography>
        {totalQuestions > 1 && (
          <IconButton color="error" size="small" onClick={() => handleRemove(qIndex)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* 문제 제목 입력 */}
      <TextField
        label={`문제 제목 (${currentLanguage.toUpperCase()})`}
        size="small"
        fullWidth
        placeholder="문제를 입력하세요"
        value={question.questionTitle[currentLanguage] || ""}
        onChange={(e) => handleTitleChange(qIndex, e.target.value)}
      />

      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}>
        보기 입력 및 정답 체크 (모든 언어 공통 정답 인덱스 유지)
      </Typography>

      {/* 보기 입력 목록 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {currentOptions.map((option, oIndex) => (
          <Box key={oIndex} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              variant={question.answerIdx === oIndex ? "contained" : "outlined"}
              size="small"
              onClick={() => handleAnswerChange(qIndex, oIndex)}
              sx={{
                minWidth: "80px",
                bgcolor: question.answerIdx === oIndex ? "#2E7D32 !important" : "transparent",
                color: question.answerIdx === oIndex ? "#fff" : "text.secondary",
                borderColor: question.answerIdx === oIndex ? "#2E7D32" : "#D1D5DB",
              }}
            >
              {question.answerIdx === oIndex ? "정답 ✓" : `보기 ${oIndex + 1}`}
            </Button>

            <TextField
              size="small"
              fullWidth
              placeholder={`보기 ${oIndex + 1} 내용을 입력하세요`}
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default QuestionFormCard;