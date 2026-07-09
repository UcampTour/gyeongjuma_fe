import { Box } from "@mui/material";
import { type QuizListItem } from "../../models/QuizModel";
import QuizCard from "./QuizCard";

interface QuizListProps {
  quizList: QuizListItem[];
}

const QuizList = ({ quizList }: QuizListProps) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {quizList.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </Box>
  )
}

export default QuizList;