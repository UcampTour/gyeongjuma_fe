import { Box, CircularProgress } from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import QuizBottomSheet from "../../components/Quiz/QuizList/QuizBottomSheet";
import QuizCategoryFilter from "../../components/Quiz/QuizList/QuizCategoryFilter";
import QuizList from "../../components/Quiz/QuizList/QuizList";
import QuizProgressCard from "../../components/Quiz/QuizList/QuizProgressCard";
import { useQuizList } from "../../hooks/quiz/useQuizList";
import { useTranslation } from "react-i18next";

const QuizListPage = () => {
  const {
    quizData, 
    selectedCategory,
    setSelectedCategory,
    quizList,
    drawerOpen,
    selectedQuiz,
    handleQuizClick,
    drawerClose,
    isLoading,
  } = useQuizList();

  const { t } = useTranslation("quiz");

  if (isLoading || !quizList) {
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

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title={t("title")} />

      <Box sx={{ px: 2 }}>
        <QuizCategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <QuizProgressCard quizData={quizData} />
        <QuizList quizList={quizList} handleQuizClick={handleQuizClick} />
      </Box>

      {selectedQuiz && (
        <QuizBottomSheet
          quiz={selectedQuiz}
          drawerOpen={drawerOpen}
          drawerClose={drawerClose}
        />
      )}
    </Box>
  );
};

export default QuizListPage;