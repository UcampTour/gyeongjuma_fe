import { Box } from '@mui/material';
import QuizProgressCard from '../../components/Quiz/QuizList/QuizProgressCard';
import QuizList from '../../components/Quiz/QuizList/QuizList';
import PageHeader from '../../components/common/PageHeader';
import QuizCategoryFilter from '../../components/Quiz/QuizList/QuizCategoryFilter';
import { useQuizList } from '../../hooks/useQuizList';
import QuizBottomSheet from '../../components/Quiz/QuizList/QuizBottomSheet';

const QuizListPage = () => {

  const { 
    selectedCategory, 
    setSelectedCategory, 
    quizList,
    drawerOpen,
    selectedQuiz,
    handleQuizClick,
    drawerClose,
  } = useQuizList();
  
  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      <PageHeader title="경주의 유적지 퀴즈" />

      <Box sx={{ px: 2 }}>
        <QuizCategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <QuizProgressCard />
        <QuizList quizList={quizList} handleQuizClick={handleQuizClick} />
      </Box>

      <QuizBottomSheet 
        quiz={selectedQuiz}
        drawerOpen={drawerOpen}
        drawerClose={drawerClose}
      />
    </Box>
  );
};

export default QuizListPage;