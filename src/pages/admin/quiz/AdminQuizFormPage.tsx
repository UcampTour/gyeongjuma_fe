import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizBasicInfoForm from "../../../components/admin/quiz/QuizBasicInfoForm";

export interface QuizInfo {
  placeId: string,
  placeName: string,
  title: string,
  description: string,
  difficulty: string,
  points: number,
  isActive: boolean
}

export interface QuizQuestion {
  questionTitle: string;
  options: string[];
  answerIdx: number;
}

const AdminQuizFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // 1. 퀴즈 기본 정보 상태
  const [quizInfo, setQuizInfo] = useState<QuizInfo>({
    placeId: "",
    placeName: "",
    title: "",
    description: "",
    difficulty: "MEDIUM",
    points: 100,
    isActive: true,
  });

  // 2. 퀴즈 문제 목록 상태
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      questionTitle: "",
      options: ["", "", "", ""],
      answerIdx: 0,
    },
  ]);

  // 기본 정보 입력 핸들러
  const handleQuizInfoChange = (field: string, value: any) => {
    setQuizInfo((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { questionTitle: "", options: ["", "", "", ""], answerIdx: 0 },
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionTitleChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, questionTitle: value } : q))
    );
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, qi) => {
        if (qi !== qIndex) return q;
        const newOptions = [...q.options];
        newOptions[oIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  };

  const handleAnswerChange = (qIndex: number, oIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, qi) => (qi === qIndex ? { ...q, answerIdx: oIndex } : q))
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const finalData = { ...quizInfo, questions };
    console.log("제출될 데이터:", finalData);
    alert(isEditMode ? "퀴즈가 성공적으로 수정되었습니다!" : "퀴즈가 성공적으로 등록되었습니다!");
    navigate("/admin/quizzes");
  };

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      
      {/* 상단 타이틀 및 뒤로가기 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          gap: 1,
          maxWidth: "1050px",
          mx: "auto",
        }}
      >
        <IconButton
          size="small"
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "#F3F4F6", borderRadius: "8px" }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          퀴즈 등록
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: "1050px",
          mx: "auto",
        }}
      >

        {/* 퀴즈 기본 정보 섹션*/}
        <QuizBasicInfoForm 
          quizInfo={quizInfo}
          handleQuizInfoChange={handleQuizInfoChange}
        />

        {/* 세션 2: 퀴즈 문제 목록 및 동적 추가 박스 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}
          >
            퀴즈 문제 구성 ({questions.length}문항)
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            sx={{ bgcolor: "#AC8E61", "&:hover": { bgcolor: "#8f734a" } }}
          >
            문제 추가하기
          </Button>
        </Box>

        {questions.map((q, qIndex) => (
          <Paper
            key={qIndex}
            sx={{
              p: 3,
              borderRadius: "12px",
              border: "1px solid #E0E0E0",
              boxShadow: "none",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#FAFAFA",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#AC8E61" }}
              >
                문제 {qIndex + 1}
              </Typography>
              {questions.length > 1 && (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleRemoveQuestion(qIndex)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            <TextField
              label="문제 제목"
              size="small"
              fullWidth
              placeholder="문제를 입력하세요 (예: 다보탑의 층수는 몇 층인가요?)"
              value={q.questionTitle}
              onChange={(e) =>
                handleQuestionTitleChange(qIndex, e.target.value)
              }
            />

            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}
            >
              보기 입력 및 정답 체크 (버튼을 눌러 정답을 지정하세요)
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {q.options.map((option, oIndex) => (
                <Box
                  key={oIndex}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <Button
                    variant={q.answerIdx === oIndex ? "contained" : "outlined"}
                    size="small"
                    onClick={() => handleAnswerChange(qIndex, oIndex)}
                    sx={{
                      minWidth: "80px",
                      bgcolor:
                        q.answerIdx === oIndex ? "#2E7D32 !important" : "transparent",
                      color: q.answerIdx === oIndex ? "#fff" : "text.secondary",
                      borderColor:
                        q.answerIdx === oIndex ? "#2E7D32" : "#D1D5DB",
                    }}
                  >
                    {q.answerIdx === oIndex ? "정답 ✓" : `보기 ${oIndex + 1}`}
                  </Button>

                  <TextField
                    size="small"
                    fullWidth
                    placeholder={`보기 ${oIndex + 1} 내용을 입력하세요`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        ))}

        {/* 하단 최종 제출 버튼 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ color: "#374151", borderColor: "#D1D5DB" }}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#AC8E61",
              "&:hover": { bgcolor: "#8f734a" },
              px: 4,
            }}
          >
            저장하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminQuizFormPage;