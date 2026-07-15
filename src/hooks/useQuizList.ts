import { useMemo, useState } from "react"
import { QuizCategory, type QuizListItem } from "../models/QuizModel"
import { dummyQuizListData } from "../data/quiz/QuizData";

export const useQuizList = () => {

  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(QuizCategory.ALL);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizListItem | null>(null);

  const filteredQuizList = useMemo(() => {

    return dummyQuizListData.filter((quiz) => {
      return selectedCategory === QuizCategory.ALL || quiz.quizStatus === selectedCategory;
    });
  }, [selectedCategory]);

  const handleQuizClick = (quiz: QuizListItem) => {
    setSelectedQuiz(quiz);
    setDrawerOpen(true);
  }

  const drawerClose = () => {
    setDrawerOpen(false);
    setSelectedQuiz(null);
  }

  return {
    selectedCategory,
    setSelectedCategory,
    quizList: filteredQuizList,
    drawerOpen,
    selectedQuiz,
    handleQuizClick,
    drawerClose,
  }
}

