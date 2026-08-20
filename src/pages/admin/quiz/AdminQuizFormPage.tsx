import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AdminQuizFormPage = () => {
  // 1. 퀴즈 기본 정보 상태
  const [quizInfo, setQuizInfo] = useState({
    place_id: "",
    place_name: "",
    title: "",
    description: "",
    difficulty: "MEDIUM",
    points: 10,
    is_active: true,
  });

  // 2. 퀴즈 문제 목록 상태 (동적으로 추가/삭제)
  const [questions, setQuestions] = useState([
    {
      question_title: "",
      options: ["", "", "", ""],
      answer_index: 0,
    },
  ]);

  // 기본 정보 입력 핸들러
  const handleQuizInfoChange = (field: any, value: any) => {
    setQuizInfo((prev) => ({ ...prev, [field]: value }));
  };

  // 문제 추가하기 버튼 클릭
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question_title: "",
        options: ["", "", "", ""],
        answer_index: 0,
      },
    ]);
  };

  // 문제 삭제하기 버튼 클릭
  const handleRemoveQuestion = (index: any) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  // 문제 제목 변경
  const handleQuestionTitleChange = (index: any, value: any) => {
    const updated = [...questions];
    updated[index].question_title = value;
    setQuestions(updated);
  };

  // 보기 내용 변경
  const handleOptionChange = (qIndex: any, oIndex: any, value: any) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // 정답 보기 선택 변경
  const handleAnswerChange = (qIndex: any, oIndex: any) => {
    const updated = [...questions];
    updated[qIndex].answer_index = oIndex;
    setQuestions(updated);
  };

  // 최종 등록 제출
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const finalData = {
      ...quizInfo,
      questions,
    };
    console.log("최종 등록 데이터:", finalData);
    alert("퀴즈가 성공적으로 등록되었습니다! (콘솔창 확인)");
  };

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      {/* 상단 타이틀 및 뒤로가기 (왼쪽 정렬 고정) */}
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
          sx={{ bgcolor: "#F3F4F6", borderRadius: "8px" }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          퀴즈 등록
        </Typography>
      </Box>

      {/* 나머지 입력 폼 요소들만 중앙(mx: "auto")으로 배치 */}
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
        {/* 세션 1: 퀴즈 기본 정보 입력 박스 */}
        <Paper
          sx={{
            p: 3,
            borderRadius: "12px",
            border: "1px solid #E0E0E0",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}
          >
            퀴즈 기본 정보
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="관광지 ID"
              size="small"
              fullWidth
              placeholder="예: 101"
              value={quizInfo.place_id}
              onChange={(e) => handleQuizInfoChange("place_id", e.target.value)}
            />
            <TextField
              label="관광지명"
              size="small"
              fullWidth
              placeholder="예: 불국사"
              value={quizInfo.place_name}
              onChange={(e) =>
                handleQuizInfoChange("place_name", e.target.value)
              }
            />
          </Box>

          <TextField
            label="퀴즈 세트 제목"
            size="small"
            fullWidth
            placeholder="예: 불국사 다보탑의 비밀 탐구"
            value={quizInfo.title}
            onChange={(e) => handleQuizInfoChange("title", e.target.value)}
          />

          <TextField
            label="퀴즈 설명"
            size="small"
            multiline
            rows={3}
            fullWidth
            placeholder="퀴즈에 대한 설명을 입력하세요."
            value={quizInfo.description}
            onChange={(e) =>
              handleQuizInfoChange("description", e.target.value)
            }
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>난이도</InputLabel>
              <Select
                value={quizInfo.difficulty}
                label="난이도"
                onChange={(e) =>
                  handleQuizInfoChange("difficulty", e.target.value)
                }
              >
                <MenuItem value="HIGH">상</MenuItem>
                <MenuItem value="MEDIUM">중</MenuItem>
                <MenuItem value="LOW">하</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="문제당 포인트"
              type="number"
              size="small"
              fullWidth
              value={quizInfo.points}
              onChange={(e) => handleQuizInfoChange("points", e.target.value)}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={quizInfo.is_active}
                onChange={(e) =>
                  handleQuizInfoChange("is_active", e.target.checked)
                }
                color="success"
              />
            }
            label={`사용 여부: ${quizInfo.is_active ? "사용중 (Y)" : "미사용 (N)"}`}
          />
        </Paper>

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
            {/* 문제 번호 및 삭제 버튼 */}
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
              value={q.question_title}
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

            {/* 보기 4개 동적 렌더링 */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {q.options.map((option, oIndex) => (
                <Box
                  key={oIndex}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  <Button
                    variant={
                      q.answer_index === oIndex ? "contained" : "outlined"
                    }
                    size="small"
                    onClick={() => handleAnswerChange(qIndex, oIndex)}
                    sx={{
                      minWidth: "80px",
                      bgcolor:
                        q.answer_index === oIndex
                          ? "#2E7D32 !important"
                          : "transparent",
                      color:
                        q.answer_index === oIndex ? "#fff" : "text.secondary",
                      borderColor:
                        q.answer_index === oIndex ? "#2E7D32" : "#D1D5DB",
                    }}
                  >
                    {q.answer_index === oIndex
                      ? "정답 ✓"
                      : `보기 ${oIndex + 1}`}
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
