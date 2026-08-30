import { Box } from "@mui/material";
import { type QuizListItem } from "../../../models/QuizModel";
import QuizCard from "./QuizCard";

interface QuizListProps {
  quizList: QuizListItem[];
  handleQuizClick: (quiz: QuizListItem) => void;
}

const QuizList = ({ quizList, handleQuizClick }: QuizListProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {quizList.map((quiz) => (
        <QuizCard
          key={quiz.placeQuizInfoId}
          quiz={quiz}
          onClick={() => handleQuizClick(quiz)} 
        />
      ))}
    </Box>
  );
};

export default QuizList;
