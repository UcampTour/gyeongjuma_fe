import { memo, useState } from 'react';
import { Box, Typography, Card, CardMedia, Button, LinearProgress } from '@mui/material';
import { QuizCategory, QuizStatus } from '../../models/QuizModel';
import QuizCategoryFilter from '../../components/Quiz/QuizCategoryFilter';
import { dummyQuizListData } from '../../data/quiz/QuizData';
import QuizProgressCard from '../../components/Quiz/QuizProgressCard';
import QuizList from '../../components/Quiz/QuizList';

const QuizListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(QuizCategory.All);

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
      <QuizList quizList={dummyQuizListData} />

      
    </Box>
  );
};

export default memo(QuizListPage);