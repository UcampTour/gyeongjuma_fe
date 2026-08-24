import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizBasicInfoForm from "../../../components/admin/quiz/QuizBasicInfoForm";
import QuestionFormCard from "../../../components/admin/quiz/QuestionFormCard";
import { useAdminQuizForm, SUPPORTED_LANGUAGES } from "../../../hooks/admin/useAdminQuizForm";

const AdminQuizFormPage = () => {
  const navigate = useNavigate();
  const {
    quizInfo,
    questions,
    isEditMode,
    currentLanguage,
    setCurrentLanguage,
    handleQuizInfoChange,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleOptionChange,
    handleAnswerChange,
    handleSubmit,
    handleDelete,
  } = useAdminQuizForm();

  const commonButtonStyle = {
    px: 3,
    py: 1,
    minWidth: "90px",
    borderRadius: "8px",
    fontWeight: 600,
  };

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      {/* 상단 타이틀 및 뒤로가기 */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1, maxWidth: "1050px", mx: "auto" }}>
        <IconButton size="small" onClick={() => navigate(-1)} sx={{ bgcolor: "#F3F4F6", borderRadius: "8px" }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          퀴즈 {isEditMode ? "수정" : "등록"}
        </Typography>
      </Box>

      {/* 🌐 다국어 탭 바 */}
      <Box sx={{ maxWidth: "1050px", mx: "auto", mb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentLanguage}
          onChange={(_, newVal) => setCurrentLanguage(newVal)}
          sx={{
            "& .MuiTab-root": { fontWeight: 700, fontSize: "0.95rem" },
            "& .Mui-selected": { color: "#AC8E61 !important" },
            "& .MuiTabs-indicator": { backgroundColor: "#AC8E61" },
          }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <Tab key={lang.code} label={lang.label} value={lang.code} />
          ))}
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: "1050px", mx: "auto" }}>
        {/* 퀴즈 기본 정보 섹션 */}
        <QuizBasicInfoForm 
          quizInfo={quizInfo}
          currentLanguage={currentLanguage}
          handleQuizInfoChange={handleQuizInfoChange}
          isEditMode={isEditMode}
        />

        {/* 세션 제목 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>
            퀴즈 문제 구성 ({questions.length}문항) - [{currentLanguage.toUpperCase()} 모드]
          </Typography>
        </Box>

        {/* 퀴즈 문제 목록 카드 */}
        {questions.map((question, qIndex) => (
          <QuestionFormCard 
            key={qIndex}
            question={question}
            qIndex={qIndex}
            currentLanguage={currentLanguage}
            totalQuestions={questions.length}
            isEditMode={isEditMode}
            handleAnswerChange={handleAnswerChange}
            handleOptionChange={handleOptionChange}
            handleRemove={handleRemoveQuestion}
            handleTitleChange={handleQuestionTitleChange}
          />
        ))}

        {/* 문제 추가하기 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddQuestion}
            fullWidth
            sx={{ 
              py: 1.5, 
              borderColor: "#AC8E61", 
              color: "#AC8E61",
              bgcolor: "#FAFAFA",
              "&:hover": { bgcolor: "#FAF7F2", borderColor: "#8f734a" } 
            }}
          >
            문제 추가
          </Button>
        </Box>

        {/* 하단 최종 버튼 그룹 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1.5, mt: 2, mb: 4 }}>
          {isEditMode && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ ...commonButtonStyle, borderColor: "#EF4444", color: "#EF4444", "&:hover": { bgcolor: "#FEF2F2" } }}
            >
              삭제하기
            </Button>
          )}
          <Button type="submit" variant="contained" sx={{ ...commonButtonStyle, bgcolor: "#AC8E61", color: "#FFFFFF", "&:hover": { bgcolor: "#8f734a" } }}>
            {isEditMode ? "수정" : "저장"}하기
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ ...commonButtonStyle, color: "#374151", borderColor: "#D1D5DB" }}>
            취소
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminQuizFormPage;