import { Box, Typography } from '@mui/material';
import QuizCategoryFilter from '../../components/Quiz/QuizCategoryFilter';
import QuizProgressCard from '../../components/Quiz/QuizProgressCard';
import QuizList from '../../components/Quiz/QuizList';
import { useQuizList } from '../../hooks/useQuizList';

const QuizListPage = () => {
  
  const {
    selectedCategory,
    setSelectedCategory,
    quizList,
  } = useQuizList();

  return (
    <Box sx={{ p: 2, bgcolor: "#F7F5EE", minHeight: "100vh", pb: 12 }}>
      
      {/* 상단 타이틀 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 1, height: "36px" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "22px", color: "#111111", lineHeight: "36px" }}>
          경주의 유적지 퀴즈 풀기
        </Typography>
      </Box>

      {/* 카테고리 탭 가로 스크롤 영역 */}
      <QuizCategoryFilter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
      />

      {/* 진척도 영역 */}
      <QuizProgressCard />

      {/* 퀴즈 목록 */}
      <QuizList quizList={quizList} />

      
    </Box>
  );
};

export default QuizListPage;