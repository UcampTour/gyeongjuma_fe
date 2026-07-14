import { Box } from '@mui/material'; // Typography는 PageHeader 내부로 이동하므로 제거해도 됩니다.
import QuizProgressCard from '../../components/Quiz/QuizList/QuizProgressCard';
import QuizList from '../../components/Quiz/QuizList/QuizList';
import PageHeader from '../../components/common/PageHeader'; // 작성하신 컴포넌트 import
import { useQuizList } from '../../hooks/useQuizList';
import QuizCategoryFilter from '../../components/Quiz/QuizList/QuizCategoryFilter';

const QuizListPage = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    quizList,
  } = useQuizList();

  return (
    <Box sx={{ bgcolor: "#F7F5EE", minHeight: "100vh", pb: 16 }}>
      
      {/* 1. PageHeader 영역 */}
      <PageHeader title="경주의 유적지 퀴즈" />

      <Box sx={{ px: 2 }}> 
        
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
      
    </Box>
  );
};

export default QuizListPage;